import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import Modal from 'react-native-modal'
import { Rating, AirbnbRating } from 'react-native-ratings'
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-community/async-storage'
import { launchCamera } from 'react-native-image-picker'
import { ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import { Picker } from '@react-native-community/picker'
import RatingPicker from './RatingPicker'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const ratingValues = [1, 2, 3, 4, 5]

const reviews = ({ navigation }) => {
  const [Locations, setLocations] = useState([])
  const [like, setLike] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [typeModalVisible, setTypeModalVisible] = useState(false)

  const [search, setSearch] = useState('')
  const [quality_rating, setQualityRating] = useState()
  const [clenliness_rating, setCleanlinessRating] = useState()
  const [price_rating, setPriceRating] = useState()
  const [overall_rating, setOverAllRating] = useState()

  const [toggleFilters, setToggleFilters] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const [review_body, setReiewBody] = useState('')
  const [locID, setLocationID] = useState(0)
  const [avatarSource, setAvatarSource] = useState('')
  const [imageLoader, setImageLoader] = useState(false)
  const [favourites, setFavourites] = useState([])

  const [filters, setFilters] = useState({
    overall_rating: '',
    price_rating: '',
    quality_rating: '',
    clenliness_rating: '',
    search_in: '',
    limit: '',
    offset: ''
  })

  const setFilter = (name, rating) => {
    setFilters(prevState => ({ ...prevState, [name]: rating }))
  }

  useEffect(() => {
    getUserData()
    const unsubscribe = navigation.addListener('tabPress', () => {
      getUserData()
    })

    return unsubscribe
  }, [navigation])

  useFocusEffect(
    React.useCallback(() => {
      getUserData()
    }, [])
  )

  const imageUpload = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('Cancelled Image')
      } else if (response.error) {
        alert('Error : ', response.error)
      } else {
        console.log(response)
        setImageLoader(true)
        setAvatarSource(response)
        setTimeout(() => {
          setImageLoader(false)
        }, 3000)
      }
    })
  }

  const overAllRating = (rating) => {
    setOverAllRating(rating)
  }
  const priceRating = (rating) => {
    console.log('Rating is: ' + rating)
    setPriceRating(rating)
  }
  const qualityRating = (rating) => {
    console.log('Quality Rating is: ' + rating)
    setQualityRating(rating)
  }
  const cleanlinessRating = (rating) => {
    console.log('Cleanliness Rating is: ' + rating)
    setCleanlinessRating(rating)
  }

  const Posts = async (liked) => {
    console.log(liked)
    const token = await AsyncStorage.getItem('token')
    fetch('http://10.0.2.2:3333/api/1.0.0/find', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response)
        const tempArray = response
        if (liked.length > 0) {
          liked.map((item, index) => {
            response.map((data, i) => {
              if (item.location_id === data.location_id) {
                tempArray[i].favorite = true
              } else {
                tempArray[i].favorite = false
              }
            })
          })
          console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', tempArray)
          setLocations(tempArray)
        } else {
          setLocations(response)
        }
      })
      .catch(error => console.log(error))
  }

  const likeLoation = async (locID, fav, item, index) => {
    const token = await AsyncStorage.getItem('token')
    console.log('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/favourtie')
    fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/favourite', {
      method: fav ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      // .then(res => res.json())
      .then(response => {
        console.log('hhhhhhhhhhhhhhh', response)
        let favor = true
        for (let index = 0; index < favourites.length; index++) {
          if (item.location_id === favourites[index].location_id) {
            favor = false
          }
        }
        setTimeout(() => {
          editLocations(favor, item, index)
        }, 2000)
      })
      .catch(error => console.log(error))
  }

  const getUserData = async (review_Body) => {
    const user_id = await AsyncStorage.getItem('userID')
    const token = await AsyncStorage.getItem('token')
    fetch('http://10.0.2.2:3333/api/1.0.0/user/' + user_id, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response)
        setFavourites(response.favourite_locations)
        Posts(response.favourite_locations)
        if (avatarSource !== '') {
          response.reviews.map((data, index) => {
            if (data.review.review_body === review_Body) {
              addPhoto(data.review.review_id)
              console.log('hello add photo called')
            }
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const editLocations = (fav, item, index) => {
    if (fav !== false) {
      const a = Object.assign([], Locations)
      a[index] = {
        location_id: item.location_id,
        location_name: item.location_name,
        location_town: item.location_town,
        photo_path: item.photo_path,
        latitude: item.latitude,
        favorite: true,
        longitude: item.longitude,
        avg_overall_rating: item.avg_overall_rating,
        avg_price_rating: item.avg_price_rating,
        avg_quality_rating: item.avg_quality_rating,
        avg_clenliness_rating: item.avg_clenliness_rating,
        location_reviews: item.location_reviews
      }
      alert('Added to favorites')
      setLocations(a)
    } else {
      alert('Already Added')
    }
  }

  const addReview = async () => {
    const profanity = ['cake', 'tea', 'pastries']

    let isValidReview = true

    for (const word of profanity) {
      if (review_body.toLowerCase().includes(word)) {
        isValidReview = false
      }
    }

    if (!isValidReview) {
      ToastAndroid.show('You cannot use cake, tea or pastries in your review!', ToastAndroid.SHORT, ['UIAlertController'])
      return
    }

    const token = await AsyncStorage.getItem('token')
    const data = JSON.stringify({
      overall_rating: overall_rating,
      price_rating: price_rating,
      quality_rating: quality_rating,
      clenliness_rating: clenliness_rating,
      review_body: review_body
    })
    console.log(data)
    fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: data
    })
      .then(response => {
        console.log(response)
        setTypeModalVisible(false)
        getUserData(review_body)
        ToastAndroid.show('Review added', ToastAndroid.SHORT, ['UIAlertController'])
      })
      .catch(eror => console.log(eror))
  }

  const addPhoto = async (reviewID) => {
    // alert(reviewID +"           "+locID)
    const token = await AsyncStorage.getItem('token')
    fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID + '/photo', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
        'X-Authorization': token
      },
      body: avatarSource
    })
      .then(response => {
        console.log(response)
        setAvatarSource('')
        setTypeModalVisible(false)
        console.log('add photo response')
        getUserData()
        ToastAndroid.show('Review added', ToastAndroid.SHORT, ['UIAlertController'])
      })
      .catch(eror => console.log(eror))
  }

  const searchRequest = async () => {
    setIsSearching(true)

    const token = await AsyncStorage.getItem('token')

    let searchQuery = `q=${search}`

    for (const param of Object.keys(filters)) {
      if (filters[param]) { // add only if a value is in there
        searchQuery = `${searchQuery}&${param}=${filters[param]}`
      }
    }

    fetch(`http://10.0.2.2:3333/api/1.0.0/find?${searchQuery}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then(response => response.json())
      .then(json => {
        setLocations(json)
        setIsSearching(false)
        console.log(json)
      }).catch(e => {
        console.error(e)
        setIsSearching(false)
      })
  }

  return (
    <View style={styles.MainView}>
      <Modal
        onBackdropPress={() => {
          setTypeModalVisible(false)
        }}
        isVisible={typeModalVisible}
        animationType='slide'
        animationInTiming={500}
        style={styles.modal}
        onRequestClose={() => {
          setTypeModalVisible(false)
        }}
      >
        <View style={styles.modalContainer1}>
          <ScrollView>
            <View style={{ paddingHorizontal: 15 }}>
              {
                imageLoader
                  ? <ActivityIndicator size={30} color='red' />
                  : avatarSource !== ''
                    ? <Image style={{ height: 150, width: '100%' }} source={avatarSource} />
                    : null
              }
              <View style={{ paddingTop: 15 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Overall Rating</Text>
                <Rating
                  type='star'
                  ratingCount={5}
                  imageSize={30}
                  showRating
                  onFinishRating={overAllRating}
                />
              </View>
              <View style={{ paddingVertical: 15 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Price Rating</Text>
                <Rating
                  type='star'
                  ratingCount={5}
                  imageSize={30}
                  showRating
                  onFinishRating={priceRating}
                />
              </View>
              <View style={{ paddingVertical: 15 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Quality Rating</Text>
                <Rating
                  type='star'
                  ratingCount={5}
                  imageSize={30}
                  showRating
                  onFinishRating={qualityRating}
                />
              </View>
              <View style={{ paddingVertical: 15 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Claenliness Rating</Text>
                <Rating
                  type='star'
                  ratingCount={5}
                  imageSize={30}
                  showRating
                  onFinishRating={cleanlinessRating}
                />
              </View>
              <View style={{ paddingVertical: 15 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Review The Place</Text>
                <TextInput placeholder='Type here...' onChangeText={val => setReiewBody(val)} style={{ fontSize: 16, color: 'black' }} />
              </View>
              <TouchableOpacity onPress={() => imageUpload()} style={{ borderWidth: 1, borderColor: 'red', width: '100%', paddingVertical: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'red' }}>Add Photo</Text>
              </TouchableOpacity>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => {
                    setAvatarSource('')
                    setTypeModalVisible(false)
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      marginRight: 5
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => addReview(locID)}
                  style={styles.doneBtn}
                >
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center'
                    }}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <View style={{ backgroundColor: '#321637', height: '8%', width: '100%', justifyConetent: 'center', alignItems: 'center' }}>
        <Text style={styles.Header}>Coffee Shop Review</Text>
      </View>
      <TextInput onChangeText={(text) => setSearch(text)} placeholder='Search' />
      {
        toggleFilters &&
          <View>
            <RatingPicker label='Overall rating' setValue={(value) => setFilter('overall_rating', value)} rating={filters.overall_rating} />
            <RatingPicker label='Price rating' setValue={(value) => setFilter('price_rating', value)} rating={filters.price_rating} />
            <RatingPicker label='Quality rating' setValue={(value) => setFilter('quality_rating', value)} rating={filters.quality_rating} />
            <RatingPicker label='Clenliness rating' setValue={(value) => setFilter('clenliness_rating', value)} rating={filters.clenliness_rating} />
            <TextInput keyboardType='numeric' onChangeText={(num) => setFilter('limit', num)} placeholder='Limit' />
            <TextInput keyboardType='numeric' onChangeText={(num) => setFilter('offset', num)} placeholder='Offset' />
          </View>
      }
      <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
        <TouchableOpacity
          disabled={isSearching}
          style={{
            backgroundColor: 'blue',
            paddingVertical: hp(1.5),
            width: wp(30),
            borderRadius: 5
          }}
          onPress={() => searchRequest()}
        >
          {
                  isSearching
                    ? <ActivityIndicator color='white' size={20} />
                    : <Text
                        style={{
                          fontSize: 16,
                          color: 'white',
                          alignSelf: 'center'
                        }}
                      >
                      Search
                    </Text>
              }
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isSearching}
          style={{
            backgroundColor: 'grey',
            paddingVertical: hp(1.5),
            width: wp(30),
            borderRadius: 5
          }}
          onPress={() => setToggleFilters(!toggleFilters)}
        >
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              alignSelf: 'center'
            }}
          >
            {toggleFilters ? 'Close Filters' : 'Show Filters'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={Locations}
        refreshing={isSearching}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('PostDetails', { locID: item.location_id })}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              paddingHorizontal: 15,
              marginTop: 20
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.location_name}</Text>
            <Image style={{ height: 290, width: '100%', marginTop: 10 }} source={{ uri: 'https://media3.s-nbcnews.com/j/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p_67dfb6820f7d3898b5486975903c2e51.fit-1240w.jpg' }} />
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: 'lightgrey', borderTopColor: 'lightgrey', paddingVertical: 15, paddingHorizontal: 10 }}>
              <TouchableOpacity onPress={() => likeLoation(item.location_id, item.favorite, item, index)}>
                {/* <Icon name='heart' color={item.favorite ? 'red' : 'grey'} size={25} /> */}
                <Text>Add to Favorite</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setLocationID(item.location_id), setTypeModalVisible(true) }}>
                <Text style={{ fontSize: 18 }}>Review</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  MainView: {
    flex: 1
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'orange'

  },

  Header: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center'

  },
  modal: {
    justifyContent: 'flex-end',
    width: '100%',
    marginLeft: -1,
    marginBottom: -1
  },
  modalContainer1: {
    width: '100%',
    // height: 250,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 15
  },
  btnContainer: {
    marginTop: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    alignItems: 'center'
  },
  cancelBtn: {
    height: 42,
    width: 100,
    alignContent: 'center',
    justifyContent: 'center'
  },
  doneBtn: {
    backgroundColor: 'red',
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 21
  }
})

export default reviews
