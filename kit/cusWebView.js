/**
 * Created by zhujiaming on 17/6/4.
 */
'use strict';
import React, {Component, PropTypes} from 'React';
import {requireNativeComponent, View} from 'react-native';
var cusWebView = {
    name: 'CusWebView',
    propTypes: {
        html: PropTypes.string,
        ...View.propTypes // 包含默认的View的属性
    }
}


// module.exports =requireNativeComponent('MyTextView',myTextView);
var RCTCusWebView = requireNativeComponent('CusWebView', cusWebView);
class CusWebView extends Component {
    static propTypes = {
        onScroll: React.PropTypes.func,
    }

    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
    }

    _onChange(event: Event) {
        if (!this.props.onScroll) {
            return;
        }
        if (event.nativeEvent.message === 'scrollListener') {
            this.props.onScroll(event.nativeEvent.dy);
            return;
        }
    }

    render() {
        return <RCTCusWebView
            {...this.props}
            onChange={this._onChange}
        />
    }

}

export default CusWebView;
