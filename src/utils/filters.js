import Vue from 'vue';
import moment from 'moment';

Vue.filter('formatDate',(timeStamp,format)=>{
    if (!Number(timeStamp)) {
        return timeStamp;
    } else {
        format = format || 'YYYY/MM/DD HH:mm';
        return moment(timeStamp,'x').format(format);
    }
});


Vue.filter('formatDates',(timeStamp,format)=>{
    if (!Number(timeStamp)) {
        return timeStamp;
    } else {
        format = format || 'YYYY/MM/DD HH:mm:ss';
        return moment(timeStamp,'x').format(format);
    }
});
Vue.filter('formatDates2',(timeStamp,format)=>{
    if (!Number(timeStamp)) {
        return timeStamp;
    } else {
        format = format || 'MM/DD HH:mm:ss';
        return moment(timeStamp,'x').format(format);
    }
});

// 年月日
Vue.filter('formatDateYYMMdd',(timeStamp,format)=>{
    if (!Number(timeStamp)) {
        return timeStamp;
    } else {
        format = format || 'YYYY/MM/DD';
        return moment(timeStamp,'x').format(format);
    }
});

// 日月
Vue.filter('formatDateMMdd',(timeStamp,format)=>{
    if (!Number(timeStamp)) {
        return timeStamp;
    } else {
        format = format || 'DD/MM';
        return moment(timeStamp,'x').format(format);
    }
});

// 年
Vue.filter('formatDateYear',(timeStamp,format)=>{
    if (!Number(timeStamp)) {
        return timeStamp;
    } else {
        format = format || 'YYYY';
        return moment(timeStamp,'x').format(format);
    }
});

Vue.filter('formatNumber',(num, precision, separator)=>{
    var parts;
    let output = num;
    // 判断是否为数字
    if (!isNaN(parseFloat(output)) && isFinite(output)) {
        // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
        // 不在判断中直接写 if (!isNaN(output = parseFloat(output)) && isFinite(output))
        // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
        // 的值变成了 12312312.123456713
        output = Number(output);
        if(output > 1000000000) {
            return Number(output/1000000000).toFixed(precision || 2) + 'B';
        } else if (output > 1000000) {
            return Number(output/1000000).toFixed(precision || 2) + 'M';
        } else {
            // 处理小数点位数
            output = (typeof precision !== 'undefined' ? output.toFixed(precision) : output.toFixed(2)).toString();
            // 分离数字的小数部分和整数部分
            parts = output.split('.');
            // 整数部分加[separator]分隔, 借用一个著名的正则表达式
            parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));
            if(parts[1] !== '00') {
                return parts.join('.');
            }else {
                return parts[0];
            }
        }
    }
    return '-';
});

Vue.filter('formatPercent',(num)=>{
    // 判断是否为数字
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
        return Number(num * 100).toFixed(2) + '%';
    }
    return '-';
});

Vue.filter('formatArray',(array)=>{
    // 判断是否为数组
    if (Array.isArray(array)) {
        return array.join(' , ');
    }
    return array;
});

// 提取html的文本
Vue.filter('removeHtml',(html)=>{
    let str = html || '';
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    return str;
});

// 过滤html的文本的img标签
Vue.filter('removeImg',(html)=>{
    let str = html || '';
    str = str.replace(/<img[^>]*>/g,''); //去除HTML img
    return str;
});

// 截断字符串
Vue.filter('cutString',(str, len, endStr)=>{
    endStr = endStr || '...';
    len = len || 120;
    return str.length > len ? `${str.substr(0, len)}${endStr}` : str;
});
