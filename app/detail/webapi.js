/**
 * Created by zhujiaming on 2017/5/25.
 */
'use strict';
import {Fetch} from 'kit';

export function getDetailNews(newsId) {
    return Fetch(`http://news-at.zhihu.com/api/4/news/${newsId}`);
}

export function getDetailNewsExtras(newsId) {
    return Fetch(`http://news-at.zhihu.com/api/4/story-extra/${newsId}`);
}