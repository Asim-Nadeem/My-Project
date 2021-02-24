import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, TextInput, ToastAndroid, ScrollView, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import { Rating, AirbnbRating } from 'react-native-ratings'
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-community/async-storage'
// import Icon from 'react-native-vector-icons/AntDesign'

const PostDetails = (props) => {
  const [Locations, setLocations] = useState([])
  const [like, setLike] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [typeModalVisible, setTypeModalVisible] = useState(false)
  const [quality_rating, setQualityRating] = useState(0)
  const [clenliness_rating, setCleanlinessRating] = useState(0)
  const [price_rating, setProceRating] = useState(0)
  const [overall_rating, setOverAllRating] = useState(0)
  const [review_body, setReiewBody] = useState('')
  const [locID, setLocationID] = useState(0)
  const [item, setItem] = useState(props.route.params.item)
  const [user_IDD, setUserID] = useState(0)
  const [loader, setLoader] = useState(false)
  const [obj, setObj] = useState({})
  const [objIndex, setObjIndex] = useState(-1)
  const [review_IDDD, setReviewIDD] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [imageModal, setImageModal] = useState(false)
  const [revImage, setRevImage] = useState('')

  useEffect(() => {
    async function tokenData () {
      const userID = await AsyncStorage.getItem('userID')
      if (userID) {
        setUserID(userID)
      }
    }
    tokenData()
  }, [])
  const overAllRating = (rating) => {
    setOverAllRating(rating)
  }
  const priceRating = (rating) => {
    console.log('Rating is: ' + rating)
    setProceRating(rating)
  }
  const qualityRating = (rating) => {
    console.log('Quality Rating is: ' + rating)
    setQualityRating(rating)
  }
  const cleanlinessRating = (rating) => {
    console.log('Cleanliness Rating is: ' + rating)
    setCleanlinessRating(rating)
  }

  const deleteReview = (val) => {

  }

  const onDeleteClick = async (reviewID, locID) => {
    const token = await AsyncStorage.getItem('token')
    console.log('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID)
    fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      // .then(res => res.json())
      .then(response => {
        console.log('hhhhhhhhhhhhhhh', response)
        props.route.params.setData(props.route.params.index)
        props.navigation.goBack()
      })
      .catch(error => console.log(error))
  }

  const onLike = async (i, val, reviewID, locID) => {
    const token = await AsyncStorage.getItem('token')
    console.log('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID + '/like')
    fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID + '/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      // .then(res => res.json())
      .then(response => {
        console.log('hhhhhhhhhhhhhhh', response)
        const a = Object.assign([], item.location_reviews)
        const b = item
        a[i] = {
          likes: val.likes + 1,
          review_body: val.review_body,
          review_clenlinessrating: val.review_clenlinessrating,
          review_id: val.review_id,
          review_location_id: val.review_location_id,
          review_overallrating: val.review_overallrating,
          review_pricerating: val.review_pricerating,
          review_qualityrating: val.review_qualityrating,
          review_user_id: val.review_user_id
        }
        b.location_reviews = a
        setItem(b)
        setTimeout(() => {
          console.log(b)
          setLoader(false)
        }, 2000)
      })
      .catch(error => console.log(error))
  }

  const updateRviewTemp = (val, index) => {
    let a = val
    const b = item
    a = {
      likes: val.likes,
      review_body: review_body == '' ? val.review_body : review_body,
      clenliness_rating: clenliness_rating == 0 ? val.clenliness_rating : clenliness_rating,
      review_id: val.review_id,
      overall_rating: overall_rating == 0 ? val.overall_rating : overall_rating,
      price_rating: price_rating == 0 ? val.price_rating : price_rating,
      quality_rating: quality_rating == 0 ? val.quality_rating : quality_rating
    }

    b.review = a
    setItem(b)
    setTimeout(() => {
      setLoader(false)
    }, 2000)
  }

  const updateReview = async (val, index, locID, reviewID) => {
    const token = await AsyncStorage.getItem('token')
    setLoader(true)
    const data = {
      overall_rating: overall_rating == 0 ? val.overall_rating : overall_rating,
      price_rating: price_rating == 0 ? val.price_rating : price_rating,
      quality_rating: quality_rating == 0 ? val.quality_rating : quality_rating,
      clenliness_rating: clenliness_rating == 0 ? val.clenliness_rating : clenliness_rating,
      review_body: review_body == '' ? val.review_body : review_body
    }
    console.log('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID, data)
    fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: JSON.stringify(data)
    })
      // .then(res => res.json())
      .then(response => {
        console.log('hhhhhhhhhhhhhhh', response)
        updateRviewTemp(obj, objIndex)
      })
      .catch(error => console.log(error))
  }

  const showImage = async (locationID, revID) => {
    const token = await AsyncStorage.getItem('token')
    console.log('http://10.0.2.2:3333/api/1.0.0/location/' + locationID + '/review/' + revID + '/photo')
    fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationID + '/review/' + revID + '/photo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then(response => {
        console.log('hhhhhhhhhhhhhhh', response)
        if (response.status == 200 || response.status == 201) {
          setRevImage('http://10.0.2.2:3333/api/1.0.0/location/' + locationID + '/review/' + revID + '/photo')
        }
        setImageModal(true)
      })
      .catch(error => {
        console.log(error)
        setImageModal(true)
      })
  }

  const removePhoto = async (locID, reviewID) => {
    // alert(reviewID +"           "+locID)
    const token = await AsyncStorage.getItem('token')
    fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID + '/photo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'image/jpeg',
        'X-Authorization': token
      }
    })
      .then(response => {
        ToastAndroid.show('Photo removed', ToastAndroid.SHORT, ['UIAlertController'])
      })
      .catch(eror => console.log(eror))
  }

  return (
    <View style={styles.MainView}>
      <Modal
        onBackdropPress={() => {
          setRevImage(''); setImageModal(false)
        }}
        isVisible={imageModal}
        animationType='slide'
        animationInTiming={500}
        style={styles.modal}
        onBackButtonPress={() => { setRevImage(''); setImageModal(false) }}
        onRequestClose={() => {
          setRevImage(''); setImageModal(false)
        }}
      >
        <View style={styles.modalContainer1}>
          <View style={{ paddingHorizontal: 15 }}>
            {
              revImage != ''
                ? <Image style={{ width: '100%', height: 350 }} source={{ uri: revImage }} />
                : <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>No Image found</Text>
            }
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setRevImage(''); setImageModal(false)
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
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        onBackdropPress={() => {
          setTypeModalVisible(false)
        }}
        isVisible={typeModalVisible}
        animationType='slide'
        animationInTiming={500}
        style={styles.modal}
        onBackButtonPress={() => setTypeModalVisible(false)}
        onRequestClose={() => {
          setTypeModalVisible(false)
        }}
      >
        <View style={styles.modalContainer1}>
          <View style={{ paddingHorizontal: 15 }}>
            <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Overall Rating</Text>
              <Rating
                type='star'
                ratingCount={5}
                imageSize={30}
                onFinishRating={overAllRating}
                startingValue={obj.overall_rating}
              />
            </View>
            <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Price Rating</Text>
              <Rating
                type='star'
                ratingCount={5}
                imageSize={30}
                onFinishRating={priceRating}
                startingValue={obj.price_rating}
              />
            </View>
            <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Quality Rating</Text>
              <Rating
                type='star'
                ratingCount={5}
                imageSize={30}
                onFinishRating={qualityRating}
                startingValue={obj.quality_rating}
              />
            </View>
            <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Claenliness Rating</Text>
              <Rating
                type='star'
                ratingCount={5}
                imageSize={30}
                onFinishRating={cleanlinessRating}
                startingValue={obj.clenliness_rating}
              />
            </View>
            <View style={{ paddingVertical: 15 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Review The Place</Text>
              <TextInput placeholder='Type here...' onChangeText={val => setReiewBody(val)} style={{ fontSize: 16, color: 'black' }} />
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
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
                onPress={() => { setTypeModalVisible(false); updateReview(obj, objIndex, locID, review_IDDD) }}
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
        </View>
      </Modal>
      <View style={{ backgroundColor: '#321637', height: '8%', width: '100%', justifyConetent: 'center', alignItems: 'center' }}>
        <Text style={styles.Header}>Coffee Shop Review</Text>
      </View>
      {
        loader
          ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={30} color='red' />
            </View>
          : <ScrollView>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                paddingHorizontal: 15,
                marginTop: 20
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.location.location_name}</Text>
              <Image style={{ height: 290, width: '100%', marginTop: 10 }} source={{ uri: 'https://media3.s-nbcnews.com/j/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p_67dfb6820f7d3898b5486975903c2e51.fit-1240w.jpg' }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Post Reviews</Text>
              {/* {
                  item.location_reviews.map((data, index) => {
                    return ( */}
              {
                    item.review
                      ? <TouchableOpacity style={{ paddingVertical: 5 }} onPress={() => { setObj(item.review); setLocationID(item.location.location_id); setReviewIDD(item.review.review_id); setTypeModalVisible(true) }}>
                        {/* {
                          user_IDD == data.review_user_id
                            ?  */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                          <Text style={{ fontSize: 16, color: 'grey' }}>Delete</Text>
                          <TouchableOpacity onPress={() => { onDeleteClick(item.review.review_id, item.location.location_id) }}>
                            <Icon name='delete' size={25} color='red' />
                          </TouchableOpacity>
                        </View>
                        <View style={{ paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 15 }}>Overall Rating</Text>
                          <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={20}
                // showRating
                            isDisabled
                            startingValue={item.review.overall_rating}
                          />
                        </View>
                        <View style={{ paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 15 }}>Quality Rating</Text>
                          <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={20}
                // showRating
                            isDisabled
                            startingValue={item.review.quality_rating}
                          />
                        </View>
                        <View style={{ paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 15 }}>Price Rating</Text>
                          <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={20}
                // showRating
                            isDisabled
                            startingValue={item.review.price_rating}
                          />
                        </View>
                        <View style={{ paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 15 }}>Cleanliness Rating</Text>
                          <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={20}
                // showRating
                            isDisabled
                            startingValue={item.review.clenliness_rating}
                          />
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: 'lightgrey', borderTopColor: 'lightgrey', paddingVertical: 15, paddingHorizontal: 10 }}>
                          <TouchableOpacity onPress={() => showImage(item.location.location_id, item.review.review_id)}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Click to see image</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => removePhoto(item.location.location_id, item.review.review_id)}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Delete Image</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: 'lightgrey', borderTopColor: 'lightgrey', paddingVertical: 15, paddingHorizontal: 10 }}>
                          <Text>{item.review.review_body}</Text>
                          <View>
                            <TouchableOpacity onPress={() => { setLoader(true); onLike(item.review, item.review.review_id, item.location.location_id) }}>
                              <Icon name='heart' color={like ? 'red' : 'grey'} size={20} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 10, textAlign: 'center' }}>{item.review.likes}</Text>
                          </View>
                        </View>
                        </TouchableOpacity>
                      : null
                }
              {/* )
                  })
              } */}
            </View>
            </ScrollView>
      }
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

export default PostDetails
