/**
 * Created by zhujiaming on 17/5/21.
 */
'use strict';
import {Fetch} from 'kit';

export function getThemes() {
    return Fetch('http://news-at.zhihu.com/api/4/themes');
}

