/**
 * Created by zhujiaming on 17/5/21.
 */
'use strict';
import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Image, Dimensions, Text, TouchableOpacity} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const viewPagerHeight = 225;
import Svg, {
    LinearGradient,
    Rect,
    Defs,
    Stop
} from 'react-native-svg';

class ViewPager extends PureComponent {

    static defaultProps = {
        duration: 3000,
        // 所有的image对象数组
        imageDataArray: [],
    }

    constructor() {
        super();
        this.state = {
            currentPage: 0,
        }
        this.renderAllImage = this.renderAllImage.bind(this);
    }

    componentDidMount() {
        //开启定时器
        this.props.imageDataArray.length && this.startTimer();
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    onAnimationEnd(e) {
        // console.log("onAnimationEnd");
        // console.log('onAnimationEnd');
        //1.求出水平方向的偏移量
        var offsetX = e.nativeEvent.contentOffset.x;

        //2.求出当前的页数
        var currentPage = Math.floor(offsetX / screenWidth);
        // console.log('currentPage:' + currentPage);

        //3.更新状态机
        this.setState({
            currentPage: currentPage,
        });
    }

    onScrollEndDrag() {
        // console.log("onScrollEndDrag");
        this.startTimer();
    }

    onScrollBeginDrag() {
        // console.log("onScrollBeginDrag");
        clearInterval(this.timer);
    }

    startTimer() {
        let scrollViewRef = this.refs.scrollView;
        let imgCount = this.props.imageDataArray.length;
        this.timer = setInterval(() => {
            var activePage = 0;
            if ((this.state.currentPage + 1) >= imgCount) {
                activePage = 0;
            } else {
                activePage = this.state.currentPage + 1;
            }
            //更新状态机
            this.setState({
                currentPage: activePage,
            });
            var offSetX = activePage * screenWidth;
            scrollViewRef.scrollResponderScrollTo({
                x: offSetX,
                y: 0,
                animated: true
            });
        }, this.props.duration);
    }

    render() {
        return (<View style={styles.container}>
            <ScrollView ref="scrollView"
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        onScrollBeginDrag={this.onScrollBeginDrag.bind(this)}
                        onScrollEndDrag={this.onScrollEndDrag.bind(this)}
                        onMomentumScrollEnd={this.onAnimationEnd.bind(this)}>
                {this.renderAllImage()}
            </ScrollView>
            {this.renderIndicator()}
        </View>);
    }

    renderCoverView(title) {
        return (<View style={styles.itemCoverView}>
            <Svg
                width={screenWidth}
                height={viewPagerHeight}
            >
                <Defs>
                    <LinearGradient id="grad" x1="0" y1='0'  x2="0" y2={viewPagerHeight}>
                        <Stop offset="0" stopColor="#555555" stopOpacity="0"/>
                        <Stop offset="1" stopColor="#000000" stopOpacity="1"/>
                    </LinearGradient>
                </Defs>
                <Rect
                    x="0"
                    y="0"
                    width={screenWidth}
                    height={viewPagerHeight}
                    fill="url(#grad)"
                />
            </Svg>
            <View style={[StyleSheet.absoluteFillObject, {flex: 1, justifyContent: 'flex-end'}]}>
                <Text style={styles.coverTextStyle}>{title}</Text>
            </View>
        </View>);
    }

    renderIndicator() {
        //指示器数组
        let indicatorArr = [], style;
        let len = this.props.imageDataArray.length;
        for (let i = 0; i < len; i++) {
            //设置圆点样式
            style = (i === this.state.currentPage) ? {color: '#fff'} : {color: '#888'};
            indicatorArr.push(<Text style={[style, {fontSize: 27, margin: 1}]} key={i}>&bull;</Text>)
        }
        return (
            <View style={[StyleSheet.absoluteFillObject, {flex: 1, justifyContent: 'flex-end'}]}>
                <View style={{
                    height: 30,
                    width: screenWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>{indicatorArr}</View>
            </View>
        );
    }

    renderAllImage() {
        let allImage = [];
        let imgArr = this.props.imageDataArray;
        for (let i = 0; i < imgArr.length; i++) {
            let imgItem = imgArr[i];
            allImage.push(<TouchableOpacity activeOpacity={1} key={i} style={styles.itemContainer} onPress={() => {
                this.props.onItemPress && this.props.onItemPress(imgItem);
            }}>
                <Image
                    style={styles.itemImgStyle}
                    resizeMode='cover'
                    source={{uri: imgItem.image}}
                />
                {this.renderCoverView(imgItem.title)}
            </TouchableOpacity>)
        }
        return allImage;
    }
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: viewPagerHeight,
    },
    itemContainer: {
        flex: 1,
    },
    itemImgStyle: {
        width: screenWidth,
        height: viewPagerHeight,
    },
    itemCoverView: {
        ...StyleSheet.absoluteFillObject,
    },
    coverTextStyle: {
        color: '#fff',
        fontSize: 22,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 30,
    }
});

export default ViewPager;