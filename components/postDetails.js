import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import Modal from 'react-native-modal'
import { Rating, AirbnbRating } from 'react-native-ratings'
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler'

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

  useEffect(() => {
    console.log(props.route.params.data)
  })
  const overAllRating = (rating) => {
    setOverAllRating(rating)
  }
  const priceRating = (rating) => {
    console.log('Rating is: ' + rating)
  }
  const qualityRating = (rating) => {
    console.log('Quality Rating is: ' + rating)
    setQualityRating(rating)
  }
  const cleanlinessRating = (rating) => {
    console.log('Cleanliness Rating is: ' + rating)
    setCleanlinessRating(rating)
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
          <View style={{ paddingHorizontal: 15 }}>
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
        </View>
      </Modal>
      <View style={{ backgroundColor: '#321637', height: '8%', width: '100%', justifyConetent: 'center', alignItems: 'center' }}>
        <Text style={styles.Header}>Coffee Shop Review</Text>
      </View>
      <ScrollView>
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
                    return (
                      <View style={{ paddingVertical: 5 }}>
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
                      </View>
                    )
                  })
              }
        </View>
      </ScrollView>
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
