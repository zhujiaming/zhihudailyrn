/**
 * Created by zhujiaming on 17/6/11.
 */
'use strict';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import {Header, CommonStyles} from 'kit';

class Login extends PureComponent {
    render() {
        return (<View style={styles.container}>
            <Header
                renderLeft={() => [<TouchableOpacity key={'l1'} onPress={() => {
                    this.props.navigation.goBack();
                }}>
                    <Image style={CommonStyles.topBarIconStyle} source={require('../imgs/back.png')}/>
                </TouchableOpacity>,
                    < Text key={'l2'} style={[CommonStyles.topBarTextStyle, {margin: 20}]}>登录</Text >]}
            />
            {this.renderContent()}
            <View style={{...StyleSheet.absoluteFillObject, flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                <Text style={{color: '#50BAE7', marginBottom: 16, fontSize: 14}}>create by zjm</Text>
            </View>
        </View>);
    }

    renderContent() {
        return <View style={{backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../imgs/bg_blue_sky2.png')} style={{...StyleSheet.absoluteFillObject, flex: 1}}/>
            <Image source={require('../imgs/splash_logo.png') } style={{width: 180, height: 50}}
                   resizeMode={'contain'}/>
            <Text style={{color: '#D0F1FF', marginTop: 80, marginBottom: 30, fontSize: 18}}>使用微博登录</Text>

            <TouchableOpacity onPress={() => {
                ToastAndroid.show('新浪微博登录', ToastAndroid.SHORT);
            }}>
                <View style={styles.btnStyle}>
                    <Image resizeMode={'stretch'} style={{width: 20, height: 20, marginRight: 10}}
                           source={require('../imgs/account_sina.png')}/>
                    <Text style={{color: '#000000', fontSize: 18}}>新浪微博</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                ToastAndroid.show('腾讯微博登录', ToastAndroid.SHORT);
            }}>
                <View style={[styles.btnStyle, {marginTop: 20}]}>
                    <Image resizeMode={'stretch'} style={{width: 20, height: 20, marginRight: 10}}
                           source={require('../imgs/account_tencent.png')}/>
                    <Text style={{color: '#000000', fontSize: 18}}>腾讯微博</Text>
                </View>
            </TouchableOpacity>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnStyle: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        width: 270,
        height: 47,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Login;