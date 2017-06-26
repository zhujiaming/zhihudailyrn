/**
 * Created by zhujiaming on 17/5/20.
 */
'use strict';
import {combineReducers} from 'redux';
import {mainReducer as mainStore} from './main/rd';
import {mainDrawReducer as mainDrawStore} from './draw/rd';
import {newsDetailReducer as newDetailStore} from './detail/rd';
import {commentsReducer as commentsStore} from './comment/rd'

export default combineReducers({
    mainStore,
    mainDrawStore,
    newDetailStore,
    commentsStore
});