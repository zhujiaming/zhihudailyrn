/**
 * Created by zhujiaming on 17/5/20.
 */
import {StackNavigator, DrawerNavigator, NavigationActions} from 'react-navigation';
import React, {Component} from 'react';
import {View, Modal, Text, DeviceEventEmitter,StatusBar} from 'react-native';
import {CusModal,CommonStyles} from 'kit';
import PageMain from './main/index';
import MainDraw  from './draw/index';
import NewsDetail  from './detail/index';
import NewsComments from './comment/index';
import Login from './login/index';
import PageEditList from './editor/editlist';
import PageEditorDetail from './editor/detail';
/*首页带抽屉的Navigator*/
const MainWithDraw = DrawerNavigator({
    main: {screen: PageMain},
    holdView: {screen: View},
}, {
    contentComponent: props => <MainDraw {...props}/>
});


/*路由栈注册*/
const stackRouteConfigs = {
    PageMain: {screen: MainWithDraw},
    PageNewsDetail: {screen: NewsDetail},
    PageNewsComments: {screen: NewsComments},
    PageLogin: {screen: Login},
    PageEditList: {screen: PageEditList},
    PageEditorDetail: {screen: PageEditorDetail},
};

const stackNavigatorConfig = {
    initialRouteName: 'PageMain',//初始的页面
    // initialRouteParams//初始页面的传参数
    // navigationOptions //navigation默认配置，作用于所有navigator中的页面
    navigationOptions: {
        header: null,
    }
    //...https://reactnavigation.org/docs/navigators/stack#StackNavigatorConfig
};


const Navigator = StackNavigator(stackRouteConfigs, stackNavigatorConfig);
const defaultGetStateForAction = Navigator.router.getStateForAction;
Navigator.router.getStateForAction = (action, state) => {
    if (__DEV__)
        console.log('Navigator State to Action (getStateForAction):', action, state);
    if (state && action.type === NavigationActions.NAVIGATE) {
        let routes = state.routes;
        if (action.routeName === routes[routes.length - 1].routeName) {
            //防止重复打开相同页面
            return;
        }
    }
    return defaultGetStateForAction(action, state);
};


class AppRoute extends Component {
    constructor() {
        super();
        this.state = {
            modalProps: {menuItems: [], visible: false},
        }
    }

    render() {
        return (<View style={{flex: 1}}>
            <StatusBar
                backgroundColor={CommonStyles.appColor}
                barStyle="light-content"
                networkActivityIndicatorVisible={true}
            />
            <Navigator onNavigationStateChange={(prevState, newState, action) => {
                if (__DEV__) {
                    console.log('******************************');
                    console.log('prevState:', prevState);
                    console.log('newState:', newState);
                    console.log('action:', action);
                    console.log('******************************');
                }
            }}/>
            <CusModal visible={this.state.modalProps.visible}
                      menuItems={this.state.modalProps.menuItems}
                      renderCusChild={this.state.modalProps.renderCusChild}
                      animationType={this.state.modalProps.animationType}/>
        </View>);
    }

    componentDidMount() {
        this.modalDidChangedListenner = DeviceEventEmitter.addListener('modalDidChanged', (modalProps) => {
            this.setState({
                modalProps: modalProps,
            });
        });
        this.statusBarNightModeListenner = DeviceEventEmitter.addListener('statusBarDidChanged',(nightMode)=>{
            StatusBar.setBackgroundColor(nightMode?'#212121':'rgb(27,163,234)');
        })
    }

    componentWillUnmount() {
        this.modalDidChangedListenner.remove();
        this.statusBarNightModeListenner.remove();
    }
}

export default AppRoute;