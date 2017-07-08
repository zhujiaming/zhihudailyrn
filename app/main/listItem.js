/**
 * Created by zhujiaming on 2017/5/22.
 */
'use strict';
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions, TouchableOpacity
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const contentHeight = 80;
const itemHight = 107;
class ListItem extends PureComponent {
    static defaultProps = {
        data: null,
        navigation: null,
        nightMode:false,
    }

    constructor(props) {
        super(props);
    }

    render() {
        let imgUri = this.props.data.images ? this.props.data.images[0] : null;
        return (<TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={() => {
            this.props.navigation.navigate('PageNewsDetail', {data: this.props.data});
        }}>
            <View style={[styles.innerContainer,{backgroundColor:this.props.nightMode?'#404040':'#fff'}]}>
                <View style={{flex: 1, height: contentHeight}}>
                    <Text style={[styles.itemTitleStyle,{color:this.props.nightMode?'#F3F3F3':'#000'}]}>{this.props.data.title}</Text>
                </View>
                {imgUri ? <Image style={styles.itemImgStyle} resizeMode='cover'
                                 source={{uri: imgUri}}/> : null}
            </View>
        </TouchableOpacity>)
    }

}
const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        width: screenWidth - 14,
        height: itemHight,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 5,
        marginTop: 5,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: StyleSheet.hairlineWidth,
        },
        elevation: 1,
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    itemImgStyle: {
        width: 90,
        height: contentHeight,
        marginRight: 10,
    },
    itemTitleStyle: {
        color: '#000',
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
    }
});

export  default ListItem;