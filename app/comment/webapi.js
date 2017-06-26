/**
 * Created by zhujiaming on 2017/6/8.
 */
'use strict';
import {Fetch} from 'kit';

export function getLongComments(newsId) {
    return Fetch(`http://news-at.zhihu.com/api/4/story/${newsId}/long-comments`);
}
export function getShortComments(newsId) {
    return Fetch(`http://news-at.zhihu.com/api/4/story/${newsId}/short-comments`)
}