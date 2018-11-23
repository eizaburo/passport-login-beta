import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Card, Button, FormLabel, FormInput, Divider } from "react-native-elements";
import axios from 'axios';

import { onLogout, isLogined } from '../auth.js';

class Home extends React.Component {

    state = {
        id: '',
        name: '',
        email: '',
    }

    componentDidMount() {
        this.getMyData();
    }

    render() {
        return (
            <View style={{ paddingVertical: 60 }}>
                <Card>
                    <Text>Home(Logined)</Text>
                    <Divider style={{ margin: 10 }} />
                    <Text>ID: {this.state.id}</Text>
                    <Text>Name: {this.state.name}</Text>
                    <Text>Email: {this.state.email}</Text>
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
                    this.setState({
                        id: res.data.id,
                        name: res.data.name,
                        email: res.data.email,
                    });
                    // alert(JSON.stringify(res.data));
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
