/**
 * Created by zhujiaming on 17/5/20.
 */
'use strict';
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ToastAndroid,
    ScrollView,
    RefreshControl,
    SectionList,
    DeviceEventEmitter
} from 'react-native';
import {Header, CommonStyles, ViewPager} from 'kit';
import {connect} from 'react-redux';
import {action_getLastedNews, action_getBeforeNews} from './rd';
import {action_getTheme} from '../draw/rd';
import Svg, {Rect,} from 'react-native-svg';
import ListItem from './listItem';
import PageMainDaily from './pagemaindaily';
import {Utils} from 'kit';
let lastPosition = 0;
let isPullUp = false;
class PageMain extends PureComponent {

    constructor(props) {
        super(props);
        this.onHeadMessageBtnPress = this.onHeadMessageBtnPress.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this.calculateTopIconPosition = this.calculateTopIconPosition.bind(this);
        this.renderTopBarLeft = this.renderTopBarLeft.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.renderTopBarRight = this.renderTopBarRight.bind(this);
        this.renderTopBarLeft = this.renderTopBarLeft.bind(this);
        this.renderShowMore = this.renderShowMore.bind(this);
        this.state = {
            headTitle: '首页',
            drawOpen: false,
            showMore: false,
        }
        this.menuItems =[{
            text: '夜间模式',
            click: () => {
                ToastAndroid.show('暂不支持', ToastAndroid.SHORT);
            }
        }, {
            text: '设置选项',
            click: () => {
                ToastAndroid.show('', ToastAndroid.SHORT);
            }
        }];
    }

    componentDidMount() {
        this._onRefresh();
        this.props.dispatch(action_getTheme());
    }

    onHeadMessageBtnPress() {
        ToastAndroid.show("点击了message", ToastAndroid.SHORT);
    }

    _onRefresh() {
        if (__DEV__)
        console.log("====>刷新首页内容");
        if (!this.props.mainStore.isRefreshing)
            this.props.dispatch(action_getLastedNews());
    }

    loadNextPage(date) {
        if (__DEV__)
        console.log("===>加载下一页数据--->date:" + date);
        this.props.dispatch(action_getBeforeNews(date));
    }

    onScroll(e) {
        let offsetY = e.nativeEvent.contentOffset.y;
        // console.log("onScroll:" + offsetY + "  lastPosition:" + lastPosition);
        isPullUp = (offsetY - lastPosition) > 10;
        lastPosition = e.nativeEvent.contentOffset.y;
    }

    render() {
        let renderType = this.props.mainStore.renderType;
        switch (renderType) {
            case 'theme':
                return <PageMainDaily themeData={this.props.mainStore.themeData} navigation={this.props.navigation}/>;
            default:
                return (<View style={styles.container}>
                    <Header
                        renderLeft={this.renderTopBarLeft}
                        renderRight={this.renderTopBarRight}
                    />
                    {this.renderContent()}
                   {/* {this.renderShowMore()}*/}
                </View>)
        }

    }

    renderShowMore() {
        if (this.state.showMore)
            return <TouchableOpacity style={styles.popupStyle} onPress={() => {
                this.setState({
                    showMore: !this.state.showMore,
                });
            }}>
                <View style={styles.popChildStyle}></View>
            </TouchableOpacity>
        else {
            return null;
        }

    }

    renderContent() {
        let topDataSource = this.props.mainStore.topDataSource;
        let dataSource = this.props.mainStore.dataSource;
        if (true) {
            return (
                <SectionList
                    ListHeaderComponent={() => <ViewPager imageDataArray={topDataSource} onItemPress={(item) => {
                        this.props.navigation.navigate('PageNewsDetail', {data: item});
                    }
                    }/>}
                    onRefresh={this._onRefresh}
                    refreshing={this.props.mainStore.isRefreshing}
                    renderItem={({item}) => <ListItem data={item} navigation={this.props.navigation}/>}
                    renderSectionHeader={({section}) => {
                        return <Text style={styles.itemSectionStyle}>{section.key}</Text>
                    }}
                    sections={dataSource}
                    keyExtractor={(item, index) => "index" + index + item}
                    onViewableItemsChanged={({viewableItems, changed}) => {
                        if (!(viewableItems && viewableItems.length > 0))return;
                        //改变topBar中的title
                        this.setState({
                            headTitle: null === viewableItems[0].index && lastPosition < 100 ? '首页' : viewableItems[0].section.key,
                        });
                        let childLastDataList = dataSource[dataSource.length - 1].data;
                        if (viewableItems[viewableItems.length - 1].item.id === childLastDataList[childLastDataList.length - 1].id && isPullUp && !this.props.mainStore.isLoadMore) {
                            // 加载下一页数据
                            this.loadNextPage(dataSource[dataSource.length - 1].date);
                        }
                    }}
                    onScroll={this.onScroll}
                    scrollEventThrottle={100}
                />
            )
        } else {
            return (<Text>正在初始化...</Text>)
        }
    }

    renderTopBarLeft() {
        let iw = 18;
        let ih = 2;
        let space = 3;
        let positions = this.calculateTopIconPosition(CommonStyles.topBarIconStyle.width, CommonStyles.topBarIconStyle.height, iw, ih, space);
        return ([<TouchableOpacity key={'l1'} onPress={() => {
            this.props.navigation.navigate('DrawerOpen'); // open drawer
        }}>
            <Svg
                width={CommonStyles.topBarIconStyle.width}
                height={CommonStyles.topBarIconStyle.height}
            >
                <Rect
                    x={positions[0].x}
                    y={positions[0].y}
                    width={iw}
                    height={ih}
                    fill="#fff"
                />
                <Rect
                    x={positions[1].x}
                    y={positions[1].y}
                    width={iw}
                    height={ih}
                    fill="#fff"
                />
                <Rect
                    x={positions[2].x}
                    y={positions[2].y}
                    width={iw}
                    height={ih}
                    fill="#fff"
                />
            </Svg>
        </TouchableOpacity>,
            < Text key={'l2'} style={[CommonStyles.topBarTextStyle, {margin: 20}]}>{this.state.headTitle}</Text >
        ]);
    }

    renderTopBarRight() {
        return ([
            <TouchableOpacity key={'r1'} onPress={() => {
                this.props.navigation.navigate('PageLogin');
            }}>
                <Image style={[CommonStyles.topBarIconStyle]}
                       source={require('../imgs/message_main.png')}/>
            </TouchableOpacity>,
            <TouchableOpacity key={'r2'} onPress={() => {
                DeviceEventEmitter.emit('modalDidChanged',{visible:true,menuItems:this.menuItems});
                this.setState({
                    showMore: !this.state.showMore,
                });
            }}>
                <Image style={[CommonStyles.topBarIconStyle, {width: 50, height: 50}]}
                       source={require('../imgs/showmore.png')}/>
            </TouchableOpacity>,
        ]);
    }

    calculateTopIconPosition(x, y, iwidth, iheight, space) {
        let positions = [];
        let px = (y - (iwidth / 2)) / 2;
        let p1y = (x - 2 * space - 3 * iheight) / 2;
        let p2y = p1y + iheight + space;
        let p3y = p2y + iheight + space;
        positions[0] = {x: px, y: p1y};
        positions[1] = {x: px, y: p2y};
        positions[2] = {x: px, y: p3y};
        return positions;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3'
    },
    contentStyle: {
        flex: 1,
    },
    itemSectionStyle: {
        marginLeft: 15,
        marginTop: 12,
        marginBottom: 12,
        fontSize: 15
    },
    popupStyle: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        alignItems: 'flex-end'
    },
    popChildStyle: {
        width: 180,
        height: 80,
        backgroundColor: 'green',
        borderRadius: 10,
        elevation: 4
    }

});


export default connect((state) => {
    return {
        mainStore: state.mainStore,
    }
})(PageMain);