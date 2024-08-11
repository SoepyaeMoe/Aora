import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Bookmark = () => {
    return (
        <SafeAreaView className="bg-primary h-full px-4">
            <View className="h-[100%] items-center justify-center">
                <Text className="text-3xl text-gray-100">Comming Soon</Text>
            </View>
        </SafeAreaView>
    )
}

export default Bookmark

const styles = StyleSheet.create({})