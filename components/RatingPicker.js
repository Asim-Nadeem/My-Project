import { Picker } from '@react-native-community/picker'
import React from 'react'
import { View, Text } from 'react-native'

const ratingValues = [1, 2, 3, 4, 5]

const RatingPicker = ({ label, setValue, rating }) => {
    return (
        <View>
            <Text>{label}</Text>
            <Picker
                selectedValue={rating}
                style={{ height: 50, width: '100%' }}
                onValueChange={(value) => setValue(value)}>
                {ratingValues.map((ratingValue) => <Picker.Item value={ratingValue.toString()} label={ratingValue.toString()} key={ratingValue}>{ratingValue}</Picker.Item>)}
            </Picker>
        </View>
    )
}

export default RatingPicker
