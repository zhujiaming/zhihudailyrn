/**
 * Created by zhujiaming on 17/5/20.
 */
'use strict';
import {Platform, StyleSheet} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56; //topBar的高度
const APPBAR_BACKGROUND_COLOR = 'rgb(27,163,234)';   //topBar的背景色
const APPBAR_BACKGROUND_COLOR_NIGHT = '#212121';   //topBar的背景色
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : ExtraDimensions.get('STATUS_BAR_HEIGHT');

const CommonStyles = {

    appBarHeight:APPBAR_HEIGHT,

    statusBar_height:STATUSBAR_HEIGHT,

    SOFT_MENU_BAR_HEIGHT : Platform.OS === 'ios' ?0:ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT'),//虚拟按键高度

    appColor: APPBAR_BACKGROUND_COLOR,

    appColorNight: APPBAR_BACKGROUND_COLOR_NIGHT,

    topBarIconStyle: {
        width: 30,
        height: 30,
        margin:10,
    },

    topBarTextStyle: {
        fontSize: 17,
        color: '#fff',
        margin: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center'
    },

    modalWith:ExtraDimensions.get('REAL_WINDOW_WIDTH') - 80,

}
export default CommonStyles;