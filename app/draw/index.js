/**
 * Created by zhujiaming on 2017/5/23.
 */
'use strict';
import React, {PureComponent} from 'react';
import {connect} from'react-redux';
import {NavigationActions} from 'react-navigation';
import {action_getThemeData} from '../main/rd';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native';
import {CommonStyles} from 'kit';

let timeOut;

class MainDraw extends PureComponent {
    constructor(props) {
        super(props);
        this._renderTopView = this._renderTopView.bind(this);
        this._closeAndChangeTheme = this._closeAndChangeTheme.bind(this);
        this._renderItem = this._renderItem.bind(this);
    }

    render() {
        return (<View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <View>{this._renderTopView()}{this._renderMiddleView()}</View>}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => "index" + index + item}
                data={this.props.data.themesData.others}
            />
        </View>);
    }

    _renderItem(item) {
        let selectedItems = [13,12,3];
        let isContains = false;
        let nightMode = this.props.nightMode;
        selectedItems.map((j,index)=>{if(j===item.item.id ){isContains=true;}
        });
        return (<TouchableOpacity style={{height: 50, alignItems: 'center', flexDirection: 'row',backgroundColor:nightMode?'#343434':'#fff'}} activeOpacity={0.9}
                                  onPress={() => {
                                      this._closeAndChangeTheme(item.item.id);
                                  }}>
            <Text style={{color: nightMode?'#999999':'#000', fontSize: 16, margin: 13}}>{item.item.name}</Text>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Image style={{width: 15, height: 15, marginRight: 45}} source={isContains?require('../imgs/menu_arrow.png'):require('../imgs/menu_follow.png')}
                       resizeMode='stretch'/>
            </View>
        </TouchableOpacity>);
    }

    _renderTopView() {
        let nightMode = this.props.nightMode;
        return (<View style={[styles.topView,{backgroundColor:nightMode?CommonStyles.appColorNight:CommonStyles.appColor}]}>
            <TouchableOpacity style={[styles.topView_item, {height: 52, alignItems: 'center'}]} activeOpacity={0.7}
                              onPress={() => {
                                  this.props.navigation.navigate('PageLogin');
                              }}>
                <Image style={{width: 34, height: 34, margin: 15}} source={require('../imgs/menu_avatar.png')}/>
                <Text style={{fontSize: 17, color: nightMode?'#999999':'#fff'}}>请登录</Text>
            </TouchableOpacity>
            <View style={[styles.topView_item, {
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
            }]}>
                <TouchableOpacity style={{flex: 1, flexDirection: 'row', height: 45, alignItems: 'center'}}
                                  activeOpacity={0.7}
                                  onPress={() => {
                                      this.props.navigation.navigate('PageLogin');
                                  }}>
                    <Image style={{width: 30, height: 30, margin: 13}} resizeMode='cover'
                           source={require('../imgs/favorites.png')}/>
                    <Text style={{fontSize: 15, color: nightMode?'#666666':'#fff', fontWeight: 'bold'}}>我的收藏</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, flexDirection: 'row', height: 40, alignItems: 'center'}}
                                  activeOpacity={0.7}
                                  onPress={() => {
                                      this.props.navigation.navigate('PageLogin');
                                  }}>
                    <Image style={{width: 30, height: 30, margin: 13}} resizeMode='cover'
                           source={require('../imgs/download.png')}/>
                    <Text style={{fontSize: 15, color: nightMode?'#666666':'#fff', fontWeight: 'bold'}}>离线下载</Text>
                </TouchableOpacity>
            </View>
        </View>);
    }

    _renderMiddleView() {
        let nightMode = this.props.nightMode;
        return (<TouchableOpacity style={[styles.middleView,{backgroundColor:nightMode?'#2C2C2C':'#f0f0f0'} ]} activeOpacity={0.7} onPress={() => {
            this._closeAndChangeTheme('home');
        }}>
            <Image style={{width: 38, height: 38, marginLeft: 15, marginRight: 10}} resizeMode='cover'
                   source={require('../imgs/home.png')}/>
            <Text style={{fontSize: 16, color: CommonStyles.appColor}}>首页</Text>
        </TouchableOpacity>);
    }

    _closeAndChangeTheme(themeId) {
        timeOut = setTimeout(() => {
            this.props.dispatch(action_getThemeData(themeId));
        }, 500);
        this.props.navigation.navigate('DrawerClose');
    }

    componentWillUnmount() {
        timeOut && clearTimeout(timeOut);
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topView: {
        height: 108,
        backgroundColor: CommonStyles.appColor,

    },
    topView_item: {
        flexDirection: 'row',
    },
    middleView: {
        height: 54,
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomView: {
        backgroundColor: "#fff",
        flex: 1
    }
});
export default connect((state) => {
    return {
        data: state.mainDrawStore,
        nightMode:state.mainStore.nightMode
    }
})(MainDraw);