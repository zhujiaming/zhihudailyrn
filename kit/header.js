/**
 * Created by zhujiaming on 17/5/20.
 */
'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, ToastAndroid, Platform,StatusBar} from 'react-native';
import {CommonStyles} from './index';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56; //topBar的高度
const APPBAR_BACKGROUND_COLOR = 'rgb(27,163,234)';   //topBar的背景色
const APPBAR_BACKGROUND_COLOR_NIGHT = '#212121';   //topBar的背景色
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

class Header extends Component {

    static defaultProps = {
        renderLeft: null,
        renderRight: null,
        elevation:4,
        nightMode:false,
    };

    constructor(props) {
        super(props);
    }

    render() {
        let nightMode = this.props.nightMode;
        return (<View style={[styles.headContainerStyle,{backgroundColor:this.props.nightMode?APPBAR_BACKGROUND_COLOR_NIGHT:APPBAR_BACKGROUND_COLOR,elevation:this.props.elevation}]}>
            <View style={styles.headViewLeft}>
                {this.props.renderLeft && this.props.renderLeft()}
            </View>
            <View style={styles.headViewRight}>
                {this.props.renderRight && this.props.renderRight()}
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    headContainerStyle: {
        flexDirection: 'row',
        height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
        shadowColor: 'black',//shadow只用在ios上
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: StyleSheet.hairlineWidth,
        },
        elevation: 4,//安卓端阴影效果//http://www.jianshu.com/p/7da2d6393a9f
        justifyContent: 'center',
        alignItems: 'center',
    },
    headViewLeft: {
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headViewRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headChildStyle: {
        margin: 10,
    }
});

export default Header;