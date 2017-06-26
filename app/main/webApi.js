/**
 * Created by zhujiaming on 17/5/21.
 */
'use strict';
import {Fetch} from 'kit';

export function getLastedNews() {
    return Fetch('http://news-at.zhihu.com/api/4/news/latest');
}
/*
 *   若果需要查询 11 月 18 日的消息，before 后的数字应为 20131119
 * 知乎日报的生日为 2013 年 5 月 19 日，若 before 后数字小于 20130520 ，只会接收到空消息
 */
export function getBeforeNews(date) {
    return Fetch(`http://news-at.zhihu.com/api/4/news/before/${date}`);
}

export function getThemeData(themeId) {
    return Fetch(`http://news-at.zhihu.com/api/4/theme/${themeId}`);
}
