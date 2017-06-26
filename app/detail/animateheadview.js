/**
 * Created by zhujiaming on 2017/6/16.
 */
'use strict';
import React, {PureComponent} from 'react';
import {View, Animated,StyleSheet,Easing,InteractionManager} from 'react-native';

class AnimateHeadView extends PureComponent {

    static defaultProps = {
        h:0,
    };

    constructor(props) {
        super(props);
        this.state = {
            _abs_y: new Animated.Value(0),          // 透明度初始值设为0
        };
        this.close = this.close.bind(this);
        this.expand = this.expand.bind(this);
    }

    close(){
        //向上滚动的动画
        Animated.timing(
            this.state._abs_y,
            {
                toValue: 0-this.props.h,
                duration:100,
                easing:Easing.linear,
            }
        ).start((result)=>{
        });

    }

    expand(){
           //向下滚动的动画
            Animated.timing(
                this.state._abs_y,
                {
                    toValue: 0,
                    duration: 100,
                    easing: Easing.linear,
                }
            ).start((result)=>{
            });
    }

    render() {
        return (
            <Animated.View
                style={{
                    ...this.props.style,
                    top: this.state._abs_y,
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }

}

export default AnimateHeadView;