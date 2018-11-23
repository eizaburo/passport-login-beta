import { AsyncStorage } from "react-native";

//認証用keyの名前
export const ACCESS_TOKEN = 'access_token';

//ログイン
export const onLogin = (access_key) => AsyncStorage.setItem(ACCESS_TOKEN, access_key);

//ログアウト
export const onLogout = () => AsyncStorage.removeItem(ACCESS_TOKEN);

//状態確認
export const isLogined = async () => {
    try {
        const access_token = await AsyncStorage.getItem(ACCESS_TOKEN);
        if (access_token !== null) {
            //ログインの状態とtokenを返す
            return { logined: true, access_token: access_token };
        } else {
            return { logined: false, access_token: '' }
        }
    } catch (error) {
        console.log(error);
    }
}