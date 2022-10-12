exports.CountDown = function(p){
    var setCountDown = function(){
        params.seconds = params.seconds - params.now.getSeconds();
        params.dates = Math.ceil((new Date(params.years, parseInt(params.months)-1, params.days) - new Date(params.now.getFullYear(), params.now.getMonth(), params.now.getDate())) / (1000 * 60 * 60 * 24));
        if(params.minutes<params.now.getMinutes())
        {
            params.minutes = (params.minutes+59)-params.now.getMinutes();
            if(params.hours<params.now.getHours())
            {
                params.hours = (params.hours+23)-params.now.getHours();
                params.dates-=1;
            }
            else
                params.hours = (params.hours-1)-params.now.getHours();
        }
        else
        {
            params.minutes=(params.minutes-1)-params.now.getMinutes();
            if(params.hours<params.now.getHours())
            {
                params.hours = (params.hours+24)-params.now.getHours();
                params.dates-=1;
            }
            else
                params.hours = params.hours-params.now.getHours();
        }
    };
    var checkCountDown = function(){
        setCountDown();
        if(params.checkCountDown==null)
        {
            params.checkCountDown = true;
            if(parseInt(params.dates)<=0)
                if(parseInt(params.dates)<0)
                    params.checkCountDown = false;
                else
                if(parseInt(params.hours)<=0)
                    if(parseInt(params.hours)<0)
                        params.checkCountDown = false;
                    else
                    if(parseInt(params.minutes)<0)
                        params.checkCountDown = false;
        }
        return params.checkCountDown;
    };
    var params = {
        BASEURL: (typeof BASEURL == 'undefined')? '': BASEURL,
        now: null,
        dates: null,
        dateObj: null,
        days: null,
        months: null,
        years: null,
        hours: null,
        hourObj: null,
        minutes: null,
        minuteObj: null,
        seconds: 60,
        secondObj: null,
        interval: null,
        checkCountDown: null,
        timeout: function(){}
    };
    params = $.extend({}, params, p);
    return {
        checkCountDown: checkCountDown
    };
};