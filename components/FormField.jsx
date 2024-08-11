import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { icons } from '../constants';
import { useState } from 'react';

const FormField = ({ title, value, placeholder, handleOnChangeText, otherStyles }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-gray-200 text-[16px] font-pmedium">{title}</Text>
            <View className="bg-black-100 rounded-2xl h-16 px-4 border-2 w-full
            border-black-200 focus:border-secondary-200 flex flex-row justify-between items-center">
                <TextInput
                    className={`flex-1 text-white font-psemibold text-base`}
                    value={value}
                    placeholder={placeholder}
                    onChangeText={handleOnChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                    placeholderTextColor='#7B7B8B' />

                {title === 'Password' && (<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image
                        className="w-6 h-6"
                        resizeMode='contain'
                        source={showPassword ? icons.eye : icons.eyeHide} />
                </TouchableOpacity>)}
            </View>
        </View>
    )
}

export default FormField