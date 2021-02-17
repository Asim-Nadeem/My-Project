import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, TextInput, ToastAndroid, ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import { Rating, AirbnbRating } from 'react-native-ratings'
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-community/async-storage'
import { ActivityIndicator } from 'react-native-paper'
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
  const [item, setItem] = useState(props.route.params.data)
  const [user_IDD, setUserID] = useState(0)
  const [loader, setLoader] = useState(false)
  const [obj, setObj] = useState({})
  const [objIndex, setObjIndex] = useState(-1)
  const [review_IDDD, setReviewIDD] = useState(0)

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
    const a = Object.assign([], item.location_reviews)
    const b = item
    a.splice(val, 1)
    b.location_reviews = a
    setItem(b)
    setTimeout(() => {
      setLoader(false)
    }, 2000)
  }

  const onDeleteClick = async (i, reviewID, locID) => {
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
        deleteReview(i)
      })
      .catch(error => console.log(error))
  }

  const updateRviewTemp = (val, index) => {
    const a = Object.assign([], item.location_reviews)
    const b = item
    a[index] = {
      likes: val.likes,
      review_body: review_body == '' ? val.review_body : review_body,
      review_clenlinessrating: clenliness_rating == 0 ? val.review_clenlinessrating : clenliness_rating,
      review_id: val.review_id,
      review_location_id: val.review_location_id,
      review_overallrating: overall_rating == 0 ? val.review_overallrating : overall_rating,
      review_pricerating: price_rating == 0 ? val.review_pricerating : price_rating,
      review_qualityrating: quality_rating == 0 ? val.review_qualityrating : quality_rating,
      review_user_id: val.review_user_id
    }

    b.location_reviews = a
    setItem(b)
    setTimeout(() => {
      setLoader(false)
    }, 2000)
  }

  const updateReview = async (val, index, locID, reviewID) => {
    const token = await AsyncStorage.getItem('token')
    setLoader(true)
    console.log('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID)
    fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      // .then(res => res.json())
      .then(response => {
        console.log('hhhhhhhhhhhhhhh', response)
        updateRviewTemp(obj, objIndex)
      })
      .catch(error => console.log(error))
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
                startingValue={obj.review_overallrating}
              />
            </View>
            <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Price Rating</Text>
              <Rating
                type='star'
                ratingCount={5}
                imageSize={30}
                onFinishRating={priceRating}
                startingValue={obj.review_pricerating}
              />
            </View>
            <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Quality Rating</Text>
              <Rating
                type='star'
                ratingCount={5}
                imageSize={30}
                onFinishRating={qualityRating}
                startingValue={obj.review_qualityrating}
              />
            </View>
            <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Claenliness Rating</Text>
              <Rating
                type='star'
                ratingCount={5}
                imageSize={30}
                onFinishRating={cleanlinessRating}
                startingValue={obj.review_clenlinessrating}
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
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.location_name}</Text>
              <Image style={{ height: 290, width: '100%', marginTop: 10 }} source={{ uri: 'https://media3.s-nbcnews.com/j/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p_67dfb6820f7d3898b5486975903c2e51.fit-1240w.jpg' }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Post Reviews</Text>
              {
                  item.location_reviews.map((data, index) => {
                    console.log(data)
                    console.log(user_IDD + '                   ' + data.review_user_id)
                    return (
                      <TouchableOpacity disabled={user_IDD != data.review_user_id} style={{ paddingVertical: 5 }} onPress={() => { setObj(data); setLocationID(data.review_location_id); setObjIndex(index); setReviewIDD(data.review_id); setTypeModalVisible(true) }}>
                        {
                          user_IDD == data.review_user_id
                            ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                              <Text style={{ fontSize: 16, color: 'grey' }}>Delete</Text>
                              <TouchableOpacity onPress={() => { setLoader(true); onDeleteClick(index, data.review_id, data.review_location_id) }}>
                                <Icon name='delete' size={25} color='red' />
                              </TouchableOpacity>
                            </View>
                            : null
                        }
                        <View style={{ paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 15 }}>Overall Rating</Text>
                          <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={20}
                // showRating
                            isDisabled
                            startingValue={data.review_overallrating}
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
                            startingValue={data.review_qualityrating}
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
                            startingValue={data.review_pricerating}
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
                            startingValue={data.review_clenlinessrating}
                          />
                        </View>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: 'lightgrey', borderTopColor: 'lightgrey', paddingVertical: 15, paddingHorizontal: 10 }}>
                          <Text>{data.review_body}</Text>
                          <View>
                            <TouchableOpacity onPress={() => setLike(true)}>
                              <Icon name='heart' color={like ? 'red' : 'grey'} size={20} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 10, textAlign: 'center' }}>{data.likes}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  })
              }
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
