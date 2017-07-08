/**
 * Created by zhujiaming on 2017/5/25.
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
    Dimensions,
    ToastAndroid,
    PixelRatio,
    InteractionManager,
    DeviceEventEmitter,
} from 'react-native';
import Svg, {LinearGradient, Rect, Defs, Stop} from 'react-native-svg';
import {Header, CommonStyles, CusWebView,Loading} from 'kit';
import {aciton_getDetailNewsData, aciton_getDetailNewsExtra} from './rd';
import  AnimateHeadView from './animateheadview';

let headImgHeight = 0;
let o_headCoverHeight = 256;
let o_topMargin = CommonStyles.appBarHeight;

let headCoverHeight = o_headCoverHeight;
let topMargin = o_topMargin;
let lasty = 0;
class NewsDetail extends PureComponent {
    static defaultProps = {
        newsId: 0,
    };

    constructor(props) {
        super(props);
        headImgHeight = o_headCoverHeight - CommonStyles.appBarHeight;
        this.state = {
            collect: false,
        }
    }

    componentDidMount() {
        // this.props.dispatch(aciton_getDetailNewsData());
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(aciton_getDetailNewsData(this.props.navigation.state.params.data.id,this.props.nightMode));
            this.props.dispatch(aciton_getDetailNewsExtra(this.props.navigation.state.params.data.id));
        });
    }

    onScroll(dy) {
        // console.log("dy", dy);
        if (dy >= PixelRatio.getPixelSizeForLayoutSize(o_headCoverHeight)) {
            this.refs.coverParentView && this.refs.coverParentView.setNativeProps({
                style: {
                    height: 0,
                }
            });
            this.refs.headView && this.refs.headView.close();
        } else {
            let _headCoverHeight = (PixelRatio.getPixelSizeForLayoutSize(o_headCoverHeight) - dy) / PixelRatio.get();
            let _topMargin = (PixelRatio.getPixelSizeForLayoutSize(o_topMargin) - dy / 2) / PixelRatio.get();
            // let _alpha = (_topMargin<=0?0:_topMargin/o_topMargin)*255;
            this.refs.coverParentView && this.refs.coverParentView.setNativeProps({
                style: {
                    height: _headCoverHeight,
                }
            });
            this.refs.coverChildView && this.refs.coverChildView.setNativeProps({
                style: {
                    marginTop: _topMargin,
                }
            });
        }
        if (dy - lasty < 0) {
            this.refs.headView && this.refs.headView.expand();
        }
        lasty = dy;
    }

    render() {
        let targetId = this.props.navigation.state.params.data.id;
        let storeId = this.props.newDetailStore.newsData.id;
        let isSameNews = targetId === storeId;
        return (<View style={styles.container}>
            {isSameNews ? this.renderContent() : <Loading showLoading={true}/>}
            {isSameNews && this.props.newDetailStore.newsData.image ? this.renderCoverHeader() : null}
            {this.renderHeader(isSameNews)}
        </View>);
        //    DeviceEventEmitter.emit('modalDidChanged', {visible: true, renderCusChild:this._renderShareDialog()});
    }

    _renderShareDialog() {
        let itemStyle = {justifyContent: 'center', alignItems: 'center', width: (CommonStyles.modalWith / 3.3)};
        let imgIconStyle = {width: 50, height: 50};
        let iconTitleStyle = {fontSize: 13, marginTop: 5, marginBottom: 10};
        return <View>
            <Text style={{fontSize: 17, margin: 10, color: 'black'}}>分享</Text>
            <View
                style={{alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
                <View style={itemStyle}>
                    <Image source={require('../imgs/share_sina.png')} style={imgIconStyle}/>
                    <Text style={iconTitleStyle}>新浪微博</Text>
                </View>
                <View style={itemStyle}>
                    <Image source={require('../imgs/share_wechat.png')} style={imgIconStyle}/>
                    <Text style={iconTitleStyle}>微信</Text>
                </View>
                <View style={itemStyle}>
                    <Image source={require('../imgs/share_friends.png')} style={imgIconStyle}/>
                    <Text style={iconTitleStyle}>朋友圈</Text>
                </View>
                <View style={itemStyle}>
                    <Image source={require('../imgs/share_evernote.png')} style={imgIconStyle}/>
                    <Text style={iconTitleStyle}>印象笔记</Text>
                </View>
                <View style={itemStyle}>
                    <Image source={require('../imgs/share_youdao.png')} style={imgIconStyle}/>
                    <Text style={iconTitleStyle}>有道云</Text>
                </View><View style={itemStyle}>
                <Image source={require('../imgs/share_qq.png')} style={imgIconStyle}/>
                <Text style={iconTitleStyle}>QQ</Text>
            </View>
                <View style={itemStyle}>
                    <Image source={require('../imgs/share_more.png')} style={imgIconStyle}/>
                    <Text style={iconTitleStyle}>更多平台</Text>
                </View>
            </View>
        </View>
    }

    renderCoverHeader() {
        let imgUrl = this.props.newDetailStore.newsData.image;
        let title = this.props.newDetailStore.newsData.title;
        let image_source = this.props.newDetailStore.newsData.image_source;
        // console.log("图片地址：", imgUrl);
        return <View
            ref="coverParentView"
            style={{...StyleSheet.absoluteFillObject, height: headCoverHeight, backgroundColor: '#fff'}}>
            <View
                ref="coverChildView"
                style={{
                    marginTop: topMargin,
                    width: Dimensions.get('window').width,
                    height: headImgHeight
                }}>
                <Image
                    style={{width: Dimensions.get('window').width, height: headImgHeight}}
                    resizeMode='cover'
                    source={{uri: imgUrl}}
                />
                {/*{this.renderCoverView(imgItem.title)}*/}

                <View style={[StyleSheet.absoluteFillObject]}>
                    <Svg
                        width={Dimensions.get('window').width}
                        height={headCoverHeight}
                    >
                        <Defs>
                            <LinearGradient id="grad" x1="0" y1={headCoverHeight / 3} x2="0" y2={headCoverHeight}>
                                <Stop offset="0" stopColor="#555555" stopOpacity="0"/>
                                <Stop offset="1" stopColor="#000000" stopOpacity="1"/>
                            </LinearGradient>
                        </Defs>
                        <Rect
                            x="0"
                            y="0"
                            width={Dimensions.get('window').width}
                            height={headCoverHeight}
                            fill="url(#grad)"
                        />
                    </Svg>
                </View>
                <View style={[StyleSheet.absoluteFillObject, {flex: 1, justifyContent: 'flex-end'}]}>
                    <Text style={styles.coverTextStyle}>{title}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text style={{color: '#AEA29E', fontSize: 14, margin: 10, marginTop: 0}}>{image_source}</Text>
                    </View>

                </View>
            </View>
        </View>
    }

    renderContent() {
        let htmlContent = this.props.newDetailStore.newsData.body;
        return htmlContent ? (<View style={{flex: 1}}>
            <CusWebView
                html={htmlContent}
                onScroll={(dy) => this.onScroll(dy)}
                style={styles.webView}
            />
        </View>) : null;
    }

    renderHeader(isSame) {
        let extrasData = this.props.newDetailStore.extrasData;
        let comments = extrasData.comments;
        let popularity = extrasData.popularity;
        let nightMode= this.props.nightMode;

        return (<AnimateHeadView h={CommonStyles.appBarHeight} ref='headView'
                                 style={{...StyleSheet.absoluteFillObject}}><View ><Header
            nightMode = {nightMode}
            renderLeft={() => [<TouchableOpacity key={'l1'} onPress={() => {
                this.props.navigation.goBack();
            }}>
                <Image style={CommonStyles.topBarIconStyle} source={require('../imgs/back.png')}/>
            </TouchableOpacity>,]}

            renderRight={() => [<TouchableOpacity key={'r4'} style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10
            }}
                                                  onPress={() => {
                                                      DeviceEventEmitter.emit('modalDidChanged', {
                                                          visible: true,
                                                          renderCusChild: () => this._renderShareDialog()
                                                      });
                                                  }}>
                <Image style={[CommonStyles.topBarIconStyle, {margin: 0}]} source={require('../imgs/share.png')}/>

            </TouchableOpacity>,

                <TouchableOpacity key={'r3'} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10
                }}
                                  onPress={() => {
                                      this.setState({
                                          collect: !this.state.collect,
                                      });
                                  }}>
                    <Image style={[CommonStyles.topBarIconStyle, {margin: 0}]}
                           source={this.state.collect ? require('../imgs/collected.png') : require('../imgs/collect.png')}/>

                </TouchableOpacity>,

                <TouchableOpacity key={'r2'} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 5
                }}
                                  onPress={() => {
                                      this.props.navigation.navigate('PageNewsComments', {newsId: this.props.navigation.state.params.data.id});
                                  }}>
                    <Image style={[CommonStyles.topBarIconStyle, {margin: 0}]} source={require('../imgs/comment.png')}/>
                    <Text style={{color: '#fff', fontSize: 15}}>{comments && isSame ? comments : '...'}</Text>
                </TouchableOpacity>,

                <TouchableOpacity key={'r1'} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10
                }}
                                  onPress={() => {
                                      ToastAndroid.show("+1", ToastAndroid.SHORT);
                                  }}>
                    <Image style={[CommonStyles.topBarIconStyle, {margin: 0}]} source={require('../imgs/praise.png')}/>
                    <Text style={{color: '#fff', fontSize: 15}}>{popularity && isSame ? popularity : '...'}</Text>
                </TouchableOpacity>,
            ]}
        /></View></AnimateHeadView>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webView: {
        flex: 1,
        paddingTop: CommonStyles.appBarHeight,
    },
    coverTextStyle: {
        color: '#fff',
        fontSize: 22,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
    }
});


export default connect((state) => {
    return {
        newDetailStore: state.newDetailStore,
        nightMode:state.mainStore.nightMode,
    }
})(NewsDetail);