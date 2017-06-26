'use strict';
/**
 * Created by zhujiaming on 2017/6/8.
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    PixelRatio,
    ToastAndroid,
    Dimensions, TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
import {CommonStyles} from 'kit';
let sigleHight = 0;
const maxLine = 20;
const minLine = 2;
class ListItem extends PureComponent {
    static defaultProps = {
        data: null,
        navigation: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            replynums: maxLine,
            totalHeight: 0,
            isFirst: true,
            isExpandMode: false,
            expandText: '展开',
        };
        this.onAuthorTextLayout = this.onAuthorTextLayout.bind(this);
        this.onReplyTextLayout = this.onReplyTextLayout.bind(this);
        this.expandToggle = this.expandToggle.bind(this);
        this.menuItems = [{
            text: '赞同',
            click: () => {
                ToastAndroid.show('赞同+1', ToastAndroid.SHORT);
            }
        }, {
            text: '举报',
            click: () => {
                ToastAndroid.show('感谢举报', ToastAndroid.SHORT);
            }
        }, {
            text: '复制',
            click: () => {
                ToastAndroid.show('复制成功', ToastAndroid.SHORT);
            }
        }, {
            text: '回复',
            click: () => {
                this.props.navigation.navigate('PageLogin');
            }
        },];
    }

    onItemPress(item) {
        DeviceEventEmitter.emit('modalDidChanged', {visible: true, menuItems: this.menuItems});
    }

    onAuthorTextLayout({nativeEvent: e}) {
        sigleHight = e.layout.height;
    }

    onReplyTextLayout({nativeEvent: e}) {
        if (!this.state.isFirst) return;
        // let totalHeight = e.layout.height + 5;
        //
        // console.log('totalHeight:', totalHeight);
        // console.log('sigleHight:', sigleHight);
        // let lines = totalHeight / sigleHight;
        // console.log('lines:', lines);

        if ((e.layout.height) / sigleHight > 2) {
            if (__DEV__)
                console.log('需要设置为两行');
            this.setState({
                replynums: minLine,
                isExpandMode: true,
            });
        }
        this.setState({
            isFirst: false
        })
    }

    expandToggle() {
        if (this.state.replynums == 2) {
            this.setState({
                replynums: maxLine,
                expandText: '收起'
            });
        }
        else {
            this.setState({
                replynums: minLine,
                expandText: '展开'
            });
        }
    }

    render() {
        if (this.props.data.emptyholder) {
            let height = Dimensions.get('window').height - (45 * 2) - CommonStyles.appBarHeight - CommonStyles.statusBar_height;
            let widthImage = Dimensions.get('window').width / 3;

            return <View style={{
                flex: 1,
                height: height,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white'
            }}>
                <Image style={{width: widthImage, height: widthImage}} source={require('../imgs/comment_empty.png')}/>
                <Text style={{fontSize: 14, color: '#E9E9E9'}}>深度长评虚位以待</Text>
            </View>
        }

        let date = new Date(this.props.data.time * 1000);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minu = date.getMinutes();
        let dateFormat = this.format(month) + '-' + this.format(day) + ' ' + this.format(hours) + ':' + this.format(minu);

        let reply_to = this.props.data.reply_to;

        return (<TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={this.onItemPress.bind(this)}>

                <Image style={{width: 35, height: 35, marginLeft: 10, marginRight: 5, borderRadius: 25}}
                       source={{uri: this.props.data.avatar}}/>
                <View style={{flex: 1}}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 10
                    }}>
                        <Text ref='text_author'
                              onLayout={this.onAuthorTextLayout}
                              style={{
                                  fontSize: 15,
                                  fontWeight: 'bold',
                                  flex: 1,
                                  color: '#000'
                              }}>{this.props.data.author}</Text>

                        <Image style={{width: 10, height: 10, marginRight: 3}}
                               source={require('../imgs/comment_vote.png')}/>
                        <Text style={{fontSize: 12, color: '#B8B8B8'}}>{this.props.data.likes}</Text>
                    </View>

                    <Text style={{fontSize: 15, color: '#000'}}>{this.props.data.content}</Text>
                    {reply_to ?
                        <Text
                            ref='text_reply'
                            numberOfLines={this.state.replynums}
                            style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#000'
                            }}

                            onLayout={this.onReplyTextLayout}
                        >//{reply_to.author}:<Text
                            ref='text_reply_child'
                            style={{
                                fontSize: 15,
                                fontWeight: 'normal',
                                color: '#8B8B8B'
                            }}>{reply_to.content}</Text></Text> : null}
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#B8B8B8',
                                marginTop: 10,
                                marginBottom: 10
                            }}>{dateFormat}</Text>
                        <View style={{flex: 1}}/>{this.state.isExpandMode ?
                        <TouchableOpacity onPress={this.expandToggle}>
                            <Text
                                style={{
                                    backgroundColor: '#D7E4F5',
                                    fontSize: 14,
                                    color: '#8B8B8B',
                                    paddingLeft: 3,
                                    paddingRight: 3
                                }}>{this.state.expandText}</Text>
                        </TouchableOpacity> : null}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    format(num) {
        if (num < 10) {
            return '0' + num;
        } else {
            return num + '';
        }
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingTop: 10,
        paddingRight: 10
    }
});

export  default ListItem;