/**
 * Created by zhujiaming on 2017/5/25.
 */
'use strict';
import {getDetailNews,getDetailNewsExtras} from './webapi';
import {detailNewsData} from '../../data/detailnews';
import {Utils} from'kit';
const initalState = {
    isLoading: false,
    newsData: {},
    extrasData:{},
};
export function newsDetailReducer(state = initalState, action) {
    switch (action.type) {
        case actionTypes.ACTION_START_REFRESH:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.ACTION_END_REFRESH:
            action.data.body = Utils.getHtml(action.data.body,action.data.css,action.nightMode);//html处理
            return {
                ...state,
                isLoading: false,
                newsData: action.data,
            }
        case actionTypes.ACTION_GET_EXTRAS:
            return {
                ...state,
                extrasData:action.data,
            }
        default :
            return {
                ...state,
            }
    }
}
export const actionTypes = {
    ACTION_START_REFRESH: 'detailNews:start_refresh',
    ACTION_END_REFRESH: 'detailNews:end_refresh',
    ACTION_GET_EXTRAS:'detailNews:get_extras',
}

export function aciton_getDetailNewsData(newsId,nightMode = false) {
    return async (dispatch) => {
        dispatch({type: actionTypes.ACTION_START_REFRESH});
        let responseJson = await  getDetailNews(newsId);
        dispatch({type: actionTypes.ACTION_END_REFRESH, data: /*detailNewsData*/responseJson,nightMode:nightMode});
    };

}export function aciton_getDetailNewsExtra(newsId) {
    return async (dispatch) => {
        let responseJson = await  getDetailNewsExtras(newsId);
        dispatch({type: actionTypes.ACTION_GET_EXTRAS, data: /*detailNewsData*/responseJson});
    };
}