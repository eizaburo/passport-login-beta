import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import axios from 'axios';

import { onLogin} from '../auth.js';

class Login extends React.Component {

    state = {
        email: 'user1@test.com',
        password: 'testtest',
        logined: false,
    }

    render() {
        return (
            <View style={{ paddingVertical: 60 }}>
                <Card>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        autoCapitalize='none'
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        autoCapitalize='none'
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                        secureTextEntry
                    />
                    <Button
                        title='Login'
                        onPress={() => this.handleLogin()}
                        buttonStyle={{ marginTop: 20 }}
                    />
                </Card>
            </View>
        );
    }

    handleLogin = () => {

        const email = this.state.email;
        const password = this.state.password;

        axios
            .post('http://localhost:8000/oauth/token', {
                grant_type: 'password',
                client_id: '1',
                client_secret: 'WS4gIuHbwyaOC8DHFfBMFpdiDZqL9j2W6CRTl0OY',
                username: email,
                password: password
            })
            .then((res) => {
                const access_token = res.data.access_token;
                onLogin(access_token).then(()=>this.props.navigation.navigate('Logined'));
                // alert(access_token);
            })
            .catch(error => {
                console.log(error);
                alert("ログインに失敗しました。");
            });
    }

    setAuthData = async (access_token) => {
        try{
            await AsyncStorage.setItem('access_token', access_token);
        }catch(error){
            console.log('tokenの保存に失敗しました。');
        }
    }
}

export default Login;