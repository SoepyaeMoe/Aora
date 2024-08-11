import { Text, TouchableOpacity } from 'react-native'

const CustomButton = ({ title, containerStyles, handlePress, isLoading, textStyles }) => {
    return (
        <TouchableOpacity
            className={`bg-secondary-200 rounded-2xl py-4 ${containerStyles}
            ${isLoading ? 'opacity-50' : ''}`}
            activeOpacity={0.7}
            disabled={isLoading}
            onPress={handlePress}>
            <Text className={`text-primary text-center font-pregular font-bold text-base ${textStyles}`}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton