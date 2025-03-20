import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function Header () {

    const {user} = useUser();

  return (
    <View>
      <Text>Header</Text>
      <Text>{user?.fullName}</Text>
    </View>
  )
}

