var dateTimeObj = function(p){
    var getNow = function(){
        setTime();
        return params.dateObj;
    };
    var getFormatNow = function(){
        setTime();
        return params.dateObj.getHours()+':'+params.dateObj.getMinutes()+':'+params.dateObj.getSeconds()+' '+params.dateObj.getDate()+'/'+(params.dateObj.getMonth()+1)+'/'+params.dateObj.getFullYear();
    };
    var getFormatNowArr = function(){
        setTime();
        return [
                ((parseInt(params.dateObj.getHours())<10)? '0'+params.dateObj.getHours(): params.dateObj.getHours()),
                ((parseInt(params.dateObj.getMinutes())<10)? '0'+params.dateObj.getMinutes(): params.dateObj.getMinutes()),
                ((parseInt(params.dateObj.getSeconds())<10)? '0'+params.dateObj.getSeconds(): params.dateObj.getSeconds()),
                ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"][params.dateObj.getDay()],
                ((parseInt(params.dateObj.getDate())<10)? '0'+params.dateObj.getDate(): params.dateObj.getDate()),
                ((parseInt(params.dateObj.getMonth())+1<10)? '0'+(parseInt(params.dateObj.getMonth())+1): parseInt(params.dateObj.getMonth())+1),
                params.dateObj.getFullYear()
               ];
    };
    var getDateNow = function(){
        setTime();
        return params.dateObj.getDate()+'-'+(parseInt(params.dateObj.getMonth())+1)+'-'+params.dateObj.getFullYear();
    };
    var getDate = function(){
        setTime();
        return ((params.dateObj.getDate()<10)? '0'+params.dateObj.getDate(): params.dateObj.getDate())+' - '+((params.dateObj.getMonth()+1<10)? '0'+parseInt(params.dateObj.getMonth()+1): params.dateObj.getMonth()+1)+' - '+params.dateObj.getFullYear();
    };
    var getNowString = function(){
        setTime();
        return String(params.dateObj.getHours())+String(params.dateObj.getMinutes())+String(params.dateObj.getSeconds())+String(params.dateObj.getDate())+String((params.dateObj.getMonth()+1))+String(params.dateObj.getFullYear());
    };
    var nowStringEY = function(now, delay){
        setTime();
        if(now==undefined)
            return String(params.dateObj.getSeconds())+'-'+String(params.dateObj.getHours())+String(params.dateObj.getMinutes())+String(params.dateObj.getDate())+String((params.dateObj.getMonth()+1));
        delay = (delay==undefined)? 6: delay;
        if(now.split("-")[0]>((params.dateObj.getSeconds()+delay>59)?(params.dateObj.getSeconds()+delay)-59: params.dateObj.getSeconds()+delay) || now.split("-")[0]<((params.dateObj.getSeconds()-delay<0)?(params.dateObj.getSeconds()-delay)+59: params.dateObj.getSeconds()-delay))
            return false;
        switch(now.split("-")[1])
        {
            case String(params.dateObj.getHours())+String(params.dateObj.getMinutes())+String(params.dateObj.getDate())+String((params.dateObj.getMonth()+1)):
                return String(params.dateObj.getSeconds())+'-'+String(params.dateObj.getHours())+String(params.dateObj.getMinutes())+String(params.dateObj.getDate())+String((params.dateObj.getMonth()+1));
                break;
            default:
                return false;
                break;
        }
    };
    var getParams = function(){
        return params;
    };
    var params = {
        dateObj: new Date(),
        time: 0
    };
    var setTime = function(){
        params.dateObj = new Date();
        params.dateObj.setTime(params.dateObj.getTime() + (parseInt(params.time)*60*60*1000));
    };
    params = $.extend({}, params, p);
    return {
        getNow: getNow,
        getDateNow: getDateNow,
        getDate: getDate,
        getFormatNow: getFormatNow,
        getFormatNowArr: getFormatNowArr,
        getNowString: getNowString,
        nowStringEY: nowStringEY,
        getParams: getParams
    };
};
if(typeof(exports)!='undefined')
    exports.dateTimeObj = dateTimeObj;
else
    dateTimeObj = new dateTimeObj();