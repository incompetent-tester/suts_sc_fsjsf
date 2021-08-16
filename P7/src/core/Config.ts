import AsyncStorage from '@react-native-async-storage/async-storage';

const storeApiKey = async (key : string) => {
    try {
        await AsyncStorage.setItem('api_key', key)
    } catch (e) {
        console.error(e)
    }
}

const getApiKey = async () : Promise<string | null | undefined> => {
    let value = undefined

    try {
        value = await AsyncStorage.getItem('api_key')
    } catch (e) {
        console.error(e)
    } finally{
        return value
    }
}

const Config = {
    getApiKey : getApiKey,
    storeApiKey : storeApiKey
}

export default Config