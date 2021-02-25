import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import { Rating } from 'react-native-ratings'
import { color } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

const Location = ({ navigation }) => {
  const [Locations, setLocations] = useState([])
  const [like, setLike] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [typeModalVisible, setTypeModalVisible] = useState(false)

  useEffect(() => {
    getUserData()
    const unsubscribe = navigation.addListener('tabPress', () => {
      getUserData()
    })

    return unsubscribe
  }, [navigation])

  const ratingCompleted = (rating) => {
    console.log('Rating is: ' + rating)
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
      .then(response => {
        console.log('hhhhhhhhhhhhhhh', response)
        editLocations(fav, item, index)
      })
      .catch(error => console.log(error))
  }

  const getUserData = async () => {
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
        const tempArray = response.favourite_locations
        tempArray.map((data, i) => {
          tempArray[i].favorite = true
        })
        setLocations(tempArray)
        // Posts(response.favourite_locations)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const editLocations = (fav, item, index) => {
    const a = Object.assign([], Locations)
    a.splice(index, 1)
    setLocations(a)
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
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Review this post</Text>
            <View style={{ paddingVertical: 15 }}>
              <Rating
                type='star'
                ratingCount={5}
                imageSize={45}
                showRating
                onFinishRating={ratingCompleted}
              />
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
                onPress={() => {
                  setTypeModalVisible(false)
                }}
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
      <FlatList
        data={Locations}
        renderItem={({ item, index }) => (
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
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: 'lightgrey', borderTopColor: 'lightgrey', paddingVertical: 15, paddingHorizontal: 10 }}>
              <TouchableOpacity onPress={() => likeLoation(item.location_id, item.favorite, item, index)}>
                <Icon name='heart' color={item.favorite ? 'red' : 'grey'} size={25} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setTypeModalVisible(true)}>
                <Text style={{ fontSize: 18 }}>Review</Text>
              </TouchableOpacity>
            </View>
          </View>
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

export default Location
