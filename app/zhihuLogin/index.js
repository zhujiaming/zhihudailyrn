/**
 * Created by xdrt81y on 17/8/8.
 */
'use strict';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import {Header, CommonStyles} from 'kit';

class ZhihuLogin extends PureComponent {
    render() {
        return (
        	<View style={styles.container}>
        		 <Header 
                renderLeft={() => [<TouchableOpacity key={'l1'} onPress={() => {
                    this.props.navigation.goBack();
                }}>
                    <Image style={CommonStyles.topBarIconStyle} source={require('../imgs/back.png')}/>
                </TouchableOpacity>,
                  ]}
            	/>
            	{this.renderContent()}
        	</View>);
    }

    renderContent() {
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../imgs/splash_logo.png') } style={{width: 180, height: 50}}
                   resizeMode={'contain'}/>
            <Text style={{color: '#CBCBD6', marginTop: 35, marginBottom: 0, fontSize: 12}}>与世界分享</Text>
            <Text style={{color: '#CBCBD6', marginTop: 5, marginBottom: 0, fontSize: 12}}>你的知识、经验和见解</Text>
            <TextInput style={[styles.textInputStyle, {marginTop:35}]}
            			underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果  
            		   	placeholder='注册手机号或邮箱'
            		   	placeholderColor='#CBCBD6'>
            </TextInput>
            <TextInput style={[styles.textInputStyle, {marginTop:10}]}
            			underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果  
            		   	placeholder='密码'
            		   	placeholderColor='#CBCBD6'>
            </TextInput>
            <TextInput style={[styles.textInputStyle, {marginTop:10}]}
            			underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果  
            		   	placeholder='验证码'
            		   	placeholderColor='#CBCBD6'>
            </TextInput>
            <TouchableOpacity onPress={() => {
                ToastAndroid.show('登录授权', ToastAndroid.SHORT);
            }}>
                <View style={[styles.btnStyle, {marginTop: 20}]}>
                    <Text style={{color: '#FFF', fontSize: 18}}>登录授权</Text>
                </View>
            </TouchableOpacity>
            <Text style={{color: '#CBCBD6', marginTop: 10, marginBottom: 0, fontSize: 12}}>暂不支持QQ等第三方登录</Text>
            <TouchableOpacity onPress={() => {
                ToastAndroid.show('注册知乎帐号', ToastAndroid.SHORT);
            }}>
                <Text style={{marginTop: 15, color: '#1787F8', fontSize: 18, textDecorationLine: 'underline'}}>注册知乎帐号</Text>
            </TouchableOpacity>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeff5',
    },
    btnStyle: {
        flexDirection: 'row',
        backgroundColor: '#1787F8',
        width: 270,
        height: 47,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputStyle: {
    	backgroundColor: '#FFF',
    	width: 270,
    	height: 49, 
    	paddingLeft: 24,
    	fontSize: 16,
    	borderColor: '#D3D3D3', 
    	borderWidth: 1,
    	borderRadius: 5
    }
});

export default ZhihuLogin;
