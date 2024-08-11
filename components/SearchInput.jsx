import { TextInput, View, TouchableOpacity, Image } from 'react-native';
import { icons } from '../constants';

const SearchInput = () => {
    return (
        <View className="bg-black-100 rounded-2xl h-16 px-4 border-2 w-full
            border-black-200 focus:border-secondary-200 flex flex-row justify-between items-center">
            <TextInput
                className={`flex-1 text-white font-psemibold text-base`}
                // value={value}
                placeholder="Search for a video topic"
                // onChangeText={handleOnChangeText}
                placeholderTextColor='#7B7B8B' />

            <TouchableOpacity>
                <Image
                    className="w-6 h-6"
                    resizeMode='contain'
                    source={icons.search} />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput