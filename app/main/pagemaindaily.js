/**
 * Created by zhujiaming on 17/6/18.
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList
} from 'react-native';
import Svg, {Rect,} from 'react-native-svg';
import {Header, CommonStyles} from 'kit';
import ListItem from './listItem';
const screenWidth = Dimensions.get('window').width;
const listHeadHeight = 225;
const ITEM_HEIGHT = 107;

class PageMainDaily extends PureComponent {

    static defaultProps = {
        themeData: null,
        isRefreshing: false,
        nightMode:false,
    }

    constructor(props) {
        super(props);
        this.calculateTopIconPosition = this.calculateTopIconPosition.bind(this);
        this.renderTopBarLeft = this.renderTopBarLeft.bind(this);
        this.renderTopBarRight = this.renderTopBarRight.bind(this);
        this.renderListHeader = this.renderListHeader.bind(this);
        this.renderAuthors = this.renderAuthors.bind(this);
        this.state = {
            isAdd:false,
        };
    }
    _onRefresh() {

    }
    render() {
        return (<View style={[styles.container,{backgroundColor:this.props.nightMode?'#343434':'#F3F3F3'}]}>
            <Header
                nightMode={this.props.nightMode}
                renderLeft={this.renderTopBarLeft}
                renderRight={this.renderTopBarRight}
            />
            { this.renderContent()}
        </View>)
    }

    renderContent() {
        let dataSource = this.props.themeData.stories;
        let nightMode = this.props.nightMode;
        if (dataSource) {
            return (
                <FlatList
                    ListHeaderComponent={this.renderListHeader}
                    onRefresh={this._onRefresh}
                    refreshing={this.props.isRefreshing}
                    renderItem={({item}) => <ListItem data={item} navigation={this.props.navigation} nightMode={nightMode}/>}
                    getItemLayout={(data, index) => (
                        {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                    )}
                    data={dataSource}
                    keyExtractor={(item, index) => "index" + index + item}
                />
            )
        } else {
            return (<Text>正在初始化...</Text>)
        }
    }

    renderTopBarLeft() {
        let themeName = this.props.themeData.name;

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
            < Text key={'l2'}
                   style={[CommonStyles.topBarTextStyle, {
                       margin: 20,
                       fontWeight: 'normal',
                   }]}>{themeName ? themeName : '...'}</Text >
        ]);
    }

    renderTopBarRight() {
        return ([
            <TouchableOpacity key={'r1'} onPress={() => {
                this.setState({
                    isAdd:!this.state.isAdd,
                });
            }}>
                <Image style={[CommonStyles.topBarIconStyle, {width: 28, height: 28}]}
                       source={this.state.isAdd?require('../imgs/theme_remove.png'):require('../imgs/theme_add.png')}/>
            </TouchableOpacity>
        ]);
    }

    renderListHeader() {
        let headImgUri = this.props.themeData.image;
        let headTitle = this.props.themeData.description;
        let nightMode = this.props.nightMode;
        return (<View style={styles.listHeadStyle}>
            <View style={{backgroundColor: '#4A4A4A'}}>
                <Image style={{width: screenWidth, height: listHeadHeight}}
                       source={{uri: headImgUri}}/>
                <View style={{...StyleSheet.absoluteFillObject, flex: 1, justifyContent: 'flex-end'}}>
                    <Text style={{color: '#fff', fontSize: 18, marginLeft: 15, marginBottom: 20}}>{headTitle}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{
                    marginLeft: 10,
                    marginTop: 15,
                    marginBottom: 15,
                    fontSize: 15,
                    color:nightMode?'#BEBEBE':'#707070'
                }}>主编</Text>
                <TouchableOpacity style={{flexDirection: 'row'}} activeOpacity={0.9} onPress={() => {
                    this.props.navigation.navigate('PageEditList', {editors: this.props.themeData.editors});
                }}>
                    {this.renderAuthors()}
                </TouchableOpacity>
            </View>
        </View>);
    }

    renderAuthors() {
        let editors = this.props.themeData.editors;
        return editors.map((item, index) => {
            return <Image key={index} style={{width: 27, height: 27, marginLeft: 10, borderRadius: 25}}
                          source={{uri: item.avatar}}/>;
        });
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
    listHeadStyle: {}
});

export default PageMainDaily;