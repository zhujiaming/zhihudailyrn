/**
 * Created by zhujiaming on 2017/6/8.
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
    SectionList,
    InteractionManager
} from 'react-native';
import {Header, CommonStyles, Loading} from 'kit';
import ListItem from './listItem';
import {action_getLongComments, action_getShortComments} from './rd';
/**
 * 新闻评论页
 */
class NewsComments extends PureComponent {
    static defaultProps = {
        // newsId:9467709
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(action_getLongComments(this.props.navigation.state.params.newsId));
            // this.props.dispatch(action_getLongComments(this.props.newsId));
        });
    }

    render() {
        let dataSource =  this.props.commentsStore.dataSource;
        let isLoading = this.props.commentsStore.isLoading;
        let hasCache =this.props.commentsStore.newsId === this.props.navigation.state.params.newsId;
        return <View style={styles.container}>
            {this.renderHeader(dataSource)}
            {isLoading&&!hasCache ? <Loading showLoading={true}/> : this.renderContent(dataSource)}
        </View>
    }

    renderContent(dataSource) {
        return dataSource && dataSource.length > 0 ? <SectionList
            refreshing={false}
            renderItem={({item}) => <ListItem data={item} navigation={this.props.navigation}/>}
            renderSectionHeader={({section}) => {
                return <View style={{
                    flex: 1,
                    height: 45,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E3E3E3',
                    flexDirection: 'row'
                }}>
                    <Text style={{fontSize: 14, margin: 13, color: 'black'}}>{section.text}</Text>
                    <View style={{flex: 1}}/>
                    {section.key == 1 ? <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={{height: 15, width: 15, margin: 13}}
                               source={require('../imgs/comment_icon_fold.png')}/>
                    </View> : null}
                </View>
            }}
            SectionSeparatorComponent={() => <View style={{flex: 1, backgroundColor: '#E3E3E3', height: 1}}/>}
            ItemSeparatorComponent={() => <View style={{flex: 1, backgroundColor: '#E3E3E3', height: 1}}/>}
            sections={dataSource}
            keyExtractor={(item, index) => "index" + item + "-" + index}
            /*   onScroll={this.onScroll}*/
            scrollEventThrottle={100}
            /*IOS有效 配合属性scrollEventThrottle 来使用，当scrollEventThrottle属性值设置比较低时，对位置比较敏感，会多次触发onScroll*/
        /> : null;
    }

    renderHeader(dataSource) {
        let count = dataSource && dataSource.length == 2 ? dataSource[0].data.length + dataSource[1].data.length : 0;
        return <Header
            renderLeft={() => [<TouchableOpacity key={'l1'} onPress={() => {
                this.props.navigation.goBack();
            }}>
                <Image style={CommonStyles.topBarIconStyle} source={require('../imgs/back.png')}/>
            </TouchableOpacity>,
                < Text key={'l2'} style={[CommonStyles.topBarTextStyle, {margin: 20}]}>{count} 条点评</Text >]}
            renderRight={() => [<TouchableOpacity key={'r1'} style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10
            }}
                                                  onPress={() => {
                                                      this.props.navigation.navigate('PageLogin');
                                                  }}>
                <Image style={CommonStyles.topBarIconStyle} source={require('../imgs/comment_write.png')}/>
            </TouchableOpacity>]}
        />
    }

}
const styles = StyleSheet.create({
    container: {flex: 1}
});
export default connect((state) => {
    return {
        commentsStore: state.commentsStore,
    }
})(NewsComments);
