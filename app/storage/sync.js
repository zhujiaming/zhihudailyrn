/**
 * Created by zhujiaming on 17/6/18.
 */
import {getLastedNews, getBeforeNews, getThemeData} from '../main/webApi';
import {getThemes} from '../draw/webApi';

storage.sync = {

    //首页缓存
    async home(params){
        let {id, syncParams, resolve, reject} = params;
        let res;
        try {
            switch (id) {
                case 'lasted':
                    res = await getLastedNews();
                    break;
                default :
                    res = await getBeforeNews(syncParams.date);
                    break;

            }
            storage.save({
                key: 'home',
                id,
                data: res,
            });
            resolve && resolve(res);
        } catch (err) {
            reject && reject(err);
        }
    },

    //抽屉页列表数据缓存
    async  draw(params){
        let {syncParams, resolve, reject} = params;
        let res ={};
        try {
            res = await getThemes();
            storage.save({
                key: 'draw',
                data: res,
            });
            resolve && resolve(res);
        } catch (err) {
            reject && reject(err);
        }
    }
}