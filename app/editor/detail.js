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
    FlatList,
    WebView, Platform
} from 'react-native';
import {Header, CommonStyles,CusWebView} from 'kit';


class PageEditorDetail extends PureComponent {
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
                                        }]}>主编资料</Text >]}/>
    }

    renderContent() {
        let editorId = this.props.navigation.state.params.editorId;
        let url = Platform==='ios'?`http://news-at.zhihu.com/api/4/editor/${editorId}/profile-page/ios`:`http://news-at.zhihu.com/api/4/editor/${editorId}/profile-page/android`;
        return <CusWebView
            html={url}
            style={{flex:1}}
        />
    }
}

export default PageEditorDetail;