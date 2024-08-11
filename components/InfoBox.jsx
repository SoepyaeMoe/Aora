import { Text, View } from 'react-native'

const InfoBox = ({ containerStyles, title, subtitle, titleStyles }) => {
    return (
        <View className={containerStyles}>
            <Text className={`text-white font-psemibold text-center ${titleStyles}`}>
                {title}
            </Text>
            <Text className={`text-gray-100 font-pregular text-center`}>
                {subtitle}
            </Text>
        </View>
    )
}

export default InfoBox