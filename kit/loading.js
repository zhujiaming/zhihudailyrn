/**
 * Created by zhujiaming on 2017/6/15.
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {StyleSheet,ActivityIndicator} from 'react-native';
class Loading extends PureComponent {
    render() {
        if (!this.props.showLoading) {
            return null;
        }
        return (<ActivityIndicator
            animating={true}
            style={styles.centering}
            size="large"/>);
    }
}
const styles = StyleSheet.create({
    centering: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
});
// export default connect((state) => {
//         const {showLoading} = state.appStore;
//         return {
//             showLoading
//         }
//     }
// )(Loading);
export default Loading;