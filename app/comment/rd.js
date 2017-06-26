'use strict';
/**
 * Created by zhujiaming on 2017/6/8.
 */
import {getLongComments, getShortComments} from './webapi'

const initalState = {
    dataSource: [],
    newsId: '',
    isLoading:false,
    totalComments:0
};

export function commentsReducer(state = initalState, action) {
    switch (action.type) {
        case actionTypes.ACTION_GET_LONG_COMMENTS:
            // let commentsLong = action.data.comments;
            let longComments = action.data.longComment.comments;
            let shortComments = action.data.shortComment.comments;
            let longCommentsLen = longComments.length;
            let shortCommentsLen = shortComments.length;
            if(longComments.length===0) {
                longComments.push({emptyholder:true});
            }
            let _dataSource = [];
            let _newsId = '';
            _dataSource.push({data: longComments, key: 0,text:longCommentsLen + ' 条长评论'});
            _dataSource.push({data: shortComments, key: 1,text:shortCommentsLen + ' 条短评论'});
            _newsId=action.data.newsId;
            return {
                ...state,
                dataSource: _dataSource,
                newsId: _newsId,
                totalComments: (longCommentsLen + shortCommentsLen),
            };
        // case actionTypes.ACTION_GET_SHORT_COMMENTS:
        //     let commentsShort = action.data.comments;
        //     state.dataSource.push({data: commentsShort, key: commentsShort.length + ' 条短评论'});
        //     return {
        //         ...state
        //     }
        case actionTypes.ACTION_COMMENT_LOADING_START:
            return {
                ...state,
                isLoading:true
            }
        case actionTypes.ACTION_COMMENT_LOADING_END:
            return {
                ...state,
                isLoading:false
            }
        default:
            return {...state}
    }
}


export const actionTypes = {
    ACTION_GET_LONG_COMMENTS: "action_get_longcomments",
    ACTION_GET_SHORT_COMMENTS: 'action_get_shortcomments',
    ACTION_COMMENT_LOADING_START: 'comment:loading_start',
    ACTION_COMMENT_LOADING_END: 'comment:loading_end',
}

export function action_getLongComments(newsId) {
    return async (dispatch) => {
        dispatch({type:actionTypes.ACTION_COMMENT_LOADING_START});
        let long = await  getLongComments(newsId);
        let short = await  getShortComments(newsId);
        dispatch({type:actionTypes.ACTION_COMMENT_LOADING_END});
        dispatch({type: actionTypes.ACTION_GET_LONG_COMMENTS, data: {longComment: long, shortComment: short,newsId}});
    };
}

export function action_getShortComments() {
    return async (dispatch) => {
        let responseJson = await  getShortComments(newsId);
        dispatch({type: actionTypes.ACTION_GET_SHORT_COMMENTS, data: responseJson});
    };
}

