/**
 * Created by zhujiaming on 2017/5/23.
 */
'use strict';
import {getThemes} from './webApi';
const initialState = {themesData: {}};
export function mainDrawReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ACTION_FINISH_MENU_LIST_UPDATE:
            return {
                ...state,
                themesData: action.data,
            };
        default:
            return {
                ...state,
            }
    }
}


export const actionTypes = {
    ACTION_FINISH_MENU_LIST_UPDATE: 'finish_menu_list_update',
}

export function action_getTheme() {
    return async (dispatch) => {
        let res={};
        try {
             res = await getThemes();
            storage.save({
                key: 'draw',
                data: res,
            });
        } catch (err) {
            res =await storage.load({
                key: 'draw',
                syncParams: {},
            });
        }finally {
            dispatch({type: actionTypes.ACTION_FINISH_MENU_LIST_UPDATE, data: res});
        }
    };
}