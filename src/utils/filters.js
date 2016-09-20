/**
 * Created by jialao on 2016/9/20.
 */
export const formatDate1 = (time) => {
    let tmpDate = new Date(time);
    
    let month = tmpDate.getMonth() + 1;

    let date = tmpDate.getDate();
    
    let str1 = month + ' 月 ' + date + ' 日 ';
   
    
    return str1
}

export const formatDate2 = (time) => {
    let tmpDate = new Date(time);

    let day = tmpDate.getDay();
    let hours = tmpDate.getHours();
    let minutes = tmpDate.getMinutes();

    let weekday = [];
    weekday[0]="星期日";
    weekday[1]="星期一";
    weekday[2]="星期二";
    weekday[3]="星期三";
    weekday[4]="星期四";
    weekday[5]="星期五";
    weekday[6]="星期六";
    
    let str2 = hours + ':' + minutes + '  ' + weekday[day]

    return str2
}

export const formatDate3 = (time) => {
    if(time){
        let timeArray = time.split('-');

        return timeArray[1] + '月' + timeArray[2] + '日'
    }else{
        return ''
    }

}