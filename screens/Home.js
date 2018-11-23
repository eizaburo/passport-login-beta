import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import axios from 'axios';

import { onLogout, isLogined } from '../auth.js';

class Home extends React.Component {

    render() {
        return (
            <View style={{ paddingVertical: 60 }}>
                <Card>
                    <Text>Home(Logined)</Text>
                    <Button
                        title='Get My Data'
                        onPress={() => this.getMyData()}
                        buttonStyle={{ marginTop: 20 }}
                    />
                    <Button
                        title='Logout'
                        onPress={() => onLogout().then(() => this.props.navigation.navigate('Logout'))}
                        buttonStyle={{ marginTop: 20 }}
                    />
                </Card>
            </View>
        );
    }

    getMyData = () => {
        isLogined().then(res => {
            const AuthStr = 'Bearer ' + res.access_token;
            axios
                .get('http://localhost:8000/api/user', { 'headers': { 'Authorization': AuthStr } })
                .then(res => {
                    alert(JSON.stringify(res.data));
                })
                .catch(error => {
                    alert("サーバからの情報の取得に失敗しました。一度ログアウトしてから再度お試しください。")
                });
        })
        .catch(error => {
            alert('ローカルからの情報の取得に失敗しました。');
        });
    }
}

export default Home;
