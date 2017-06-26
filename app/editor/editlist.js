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
import {Header, CommonStyles} from 'kit';

class PageEditList extends PureComponent {
    static defaultProps = {
        editors: [],
    }

    render() {
        return <View style={{flex: 1, backgroundColor: '#fff'}}>
            {this.renderHeader()}
            {this.renderContent()}
        </View>;
    }

    renderHeader() {
        return <Header
            renderLeft={() => [<TouchableOpacity key={'l1'} onPress={() => {
                this.props.navigation.goBack();
            }}>
                <Image style={CommonStyles.topBarIconStyle} source={require('../imgs/back.png')}/>
            </TouchableOpacity>, < Text key={'l2'}
                                        style={[CommonStyles.topBarTextStyle, {
                                            margin: 20,
                                            fontWeight: 'normal',
                                        }]}>主编</Text >]}/>
    }

    renderContent() {
        let editors = this.props.navigation.state.params.editors;
        if (editors) {
            let items = editors.map((item, index) => {
                return <TouchableOpacity key={index} activeOpacity={0.9} onPress={()=>{
                    this.props.navigation.navigate('PageEditorDetail',{editorId:item.id});
                }}>
                    <View style={{height: 80, flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={{width: 40, height: 40, marginLeft: 15, marginRight: 15, borderRadius: 25}}
                               source={{uri: item.avatar}}/>
                        <View>
                            <Text style={{color: '#000', fontSize: 16}}>{item.name}</Text>
                            <View style={{height: 10}}/>
                            <Text style={{color: '#9C9C9C', fontSize: 13}}>{item.bio}</Text>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: "#DFDFDF",
                        height: 1,
                        width: Dimensions.get('window').width,
                        marginLeft: 15,
                        marginRight: 15
                    }}/>
                </TouchableOpacity>
            });
            return <View>
                {items}
            </View>
        } else {
            return null;
        }

    }
}

export default PageEditList;