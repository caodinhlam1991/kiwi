var dem_tab_num, time_tab = Array(), a_auto = Array(), auto = Array(), num_auto=0;
function add_tab(a,b,c,d,e,f)
{
    $("."+c+"").css("display","none");
    $("."+c+":eq(0)").css("display","block");
    num_tab[dem_tab_num]=0,time_tab[dem_tab_num]=1;
    var g=dem_tab_num;
    $("."+a).each(function(e){
        $(this).click(function(){
            tab(a,b,c,e,g,d,f,$(this))
        })
    });
    0!=e&&(a_auto[6*dem_tab_num+dem_tab_num]=a,
        a_auto[6*dem_tab_num+dem_tab_num+1]=b,
        a_auto[6*dem_tab_num+dem_tab_num+2]=c,
        a_auto[6*dem_tab_num+dem_tab_num+3]=1,
        a_auto[6*dem_tab_num+dem_tab_num+4]=g,
        a_auto[6*dem_tab_num+dem_tab_num+5]=d,
        a_auto[6*dem_tab_num+dem_tab_num+6]=f,
        automatic("tab(a["+(6*dem_tab_num+dem_tab_num)+"], a["+(6*dem_tab_num+dem_tab_num+1)+"], a["+(6*dem_tab_num+dem_tab_num+2)+"], a["+(6*dem_tab_num+dem_tab_num+3)+"], a["+(6*dem_tab_num+dem_tab_num+4)+"], a["+(6*dem_tab_num+dem_tab_num+4)+"], a["+(6*dem_tab_num+dem_tab_num+5)+"], a["+(6*dem_tab_num+dem_tab_num+6)+"]);",e,a_auto)),dem_tab_num++
}

var num_tab = Array();
function tab(tit,ac,obj,n,index,delay,f,me)
{
    if(num_tab[index]!=n&&1==time_tab[index]&&($("."+tit+":eq("+num_tab[index]+")").removeClass(ac)) && $('body').attr('control')!=0)
    {
        $("."+tit+":eq("+n+")").addClass(ac);
        time_tab[index]=0;
        if(""==$("."+obj+":eq("+n+")").html())
        {
            (typeof(f)=='function')? f(n, me.parent().attr("term"), function(cb){
                $("."+obj+":eq("+num_tab[index]+")").fadeOut(delay, function(){
                    $("."+obj+":eq("+n+")").fadeIn(delay,function(){
                        a_auto[6*index+index+3]=num_tab[index]=n;var a=a_auto[6*index+index+3]++;
                        a==$("."+tit).length-1&&(a_auto[6*index+index+3]=0),
                            setTimeout(function(){time_tab[index]++},2*delay);
                    })
                });
            }): '';
        }
        else
            $("."+obj+":eq("+num_tab[index]+")").fadeOut(delay, function(){
                $("."+obj+":eq("+n+")").fadeIn(delay,function(){
                    a_auto[6*index+index+3]=num_tab[index]=n;var a=a_auto[6*index+index+3]++;
                    a==$("."+tit).length-1&&(a_auto[6*index+index+3]=0),
                        setTimeout(function(){time_tab[index]++},2*delay)
                })
            });
    }
}

function automatic(f,delay,a){
    auto[num_auto]=setInterval(function(){
        eval(f)},delay),num_auto++
}

function ver_center(a,b,c,d)
{
    switch(b)
    {
        case "top":a.animate({marginTop:-a.height()/2+"px",top:"50%"},c);
            break;
        case "left":a.animate({marginLeft:-a.width()/2+"px",left:"50%"},c);
            break;
        default:
            a.animate({margin:-a.height()/2+"px 0 0 "+-a.width()/2+"px",top:"50%",left:"50%"},c);
    }
    a.fadeTo(c,d)
}

var Align = function(p){
    var top = function(obj, frame, delay, duration, alpha, callback){
        obj.animate({top: (frame.height()-obj.height())/2+'px'}, delay, function(){
            obj.fadeTo(duration, alpha, function(){
                if(typeof(callback)=='function')
                    callback(obj);
            });
        });
    };
    var right = function(obj, frame, delay, duration, alpha, callback){
        obj.animate({right: (frame.outerWidth()-obj.width())/2+'px'}, delay, function(){
            obj.fadeTo(duration, alpha, function(){
                if(typeof(callback)=='function')
                    callback(obj);
            });
        });
    };
    var bottom = function(obj, frame, delay, duration, alpha, callback){
        obj.animate({bottom: (frame.outerHeight()-obj.height())/2+'px'}, delay, function(){
            obj.fadeTo(duration, alpha, function(){
                if(typeof(callback)=='function')
                    callback(obj);
            });
        });
    };
    var left = function(obj, frame, delay, duration, alpha, callback){
        obj.animate({left: (frame.outerWidth()-obj.width())/2+'px'}, delay, function(){
            obj.fadeTo(duration, alpha, function(){
                if(typeof(callback)=='function')
                    callback(obj);
            });
        });
    };
    var topleft = function(obj, frame, delay, duration, alpha, callback){
        obj.animate({top: (frame.outerHeight()-obj.height())/2+'px', left: (frame.outerWidth()-obj.width())/2+'px'}, delay, function(){
            obj.fadeTo(duration, alpha, function(){
                if(typeof(callback)=='function')
                    callback(obj);
            });
        });
    };
    var rightbottom = function(obj, frame, delay, duration, alpha, callback){
        obj.animate({right: (frame.outerWidth()-obj.width())/2+'px', bottom: (frame.height()-obj.height())/2+'px'}, delay, function(){
            obj.fadeTo(duration, alpha, function(){
                if(typeof(callback)=='function')
                    callback(obj);
            });
        });
    };
    var params = {
        delay: 300,
        duration: 300,
        alpha: 1
    };
    params = $.extend({}, params, p);
    return {
        top: top,
        right: right,
        bottom: bottom,
        left: left,
        topleft: topleft,
        rightbottom: rightbottom
    };
};

function text_html(a,b){
    $("."+a).html(b)
}

//Slide
var Slide = function(p){
    var ready = function(){
//        params.controls.items.css({width: params.controls.frameHidden.css('width')});
        params.controls.frameItem.css('width', (params.controls.items.width()*params.controls.items.length)+'px');
        params.controls.frameHidden.css('height', params.controls.items.height()+'px');
        params.controls.frameSlide.attr('control', '1');
//        if(params.pages.show==false)
//            params.pages.page.css('display', 'none');
        params.pages.num = 1;
        loadPage();
    };
    var run = function(){
        params.controls.next.click(function(){
            next();
        });
        params.controls.prev.click(function(){
            prev();
        });
        scroll();
    };
    var next = function(){
        if(params.controls.frameSlide.attr('control')=='1')
        {
            params.controls.frameSlide.attr('control', '0');
            if(params.controls.frameScroll.scrollLeft()==params.controls.frameItem.width()-params.controls.frameSlide.width())
                TweenMax.to(params.controls.frameScroll, params.delay*(params.controls.items.length-1),{scrollLeft: 0, onComplete: function(){
                    params.controls.frameSlide.attr('control', '1');
                }});
            else
                TweenMax.to(params.controls.frameScroll, params.delay, {scrollLeft: '+=' + params.controls.items.width(), onComplete: function () {
                    params.controls.frameSlide.attr('control', '1');
                }});
            if(typeof(params.pages.data.callback)=='function')
            {
                params.pages.num = Math.floor(params.controls.frameScroll.scrollLeft()/params.controls.frameScroll.width());
                params.pages.data.callback(params.pages.num, (params.pages.num==params.controls.items.length-1)? 0 : params.pages.num+1);
            }
        }
    };
    var prev = function(){
        if(params.controls.frameSlide.attr('control')=='1')
        {
            params.controls.frameSlide.attr('control', '0');
            if(params.controls.frameScroll.scrollLeft()==0)
                TweenMax.to(params.controls.frameScroll, params.delay*(params.controls.items.length-1),{scrollLeft: (params.controls.frameItem.width()-params.controls.frameSlide.width()), onComplete: function(){
                    params.controls.frameSlide.attr('control', '1');
                }});
            else
                TweenMax.to(params.controls.frameScroll, params.delay,{scrollLeft: '-='+params.controls.items.width(), onComplete: function(){
                    params.controls.frameSlide.attr('control', '1');
                }});
            if(typeof(params.pages.data.callback)=='function')
            {
                params.pages.num = Math.floor(params.controls.frameScroll.scrollLeft()/params.controls.frameScroll.width());
                params.pages.data.callback(params.pages.num, (params.pages.num==0)? params.controls.items.length-1: params.pages.num-1);
            }
        }
    };
    var jump = function(n){
        if(params.controls.frameSlide.attr('control')=='1')
        {
            params.controls.frameSlide.attr('control', '0');
            TweenMax.to(params.controls.frameScroll, params.delay*Math.abs((n-1)-params.controls.frameScroll.scrollLeft()/params.controls.frameScroll.width()),{scrollLeft: (n-1)*params.controls.frameScroll.width(), onComplete: function(){
                params.controls.frameSlide.attr('control', '1');
            }});
            params.pages.num = n+1;
        }
    };
    var loadPage = function(){
        $("body").attr("control","0").css('cursor', 'progress');
        switch(params.pages.type)
        {
            case 'wsup3':
                web.iReq({action: params.pages.data.action, _id: params.controls.frameSlide.attr('term'), items: params.pages.data.items, number: params.pages.data.number}, function(dt){
                    if(typeof(params.pages.data.success)=='function')
                        params.pages.data.success(params, dt);
                });
                break;
            case 'ajax':
                $.ajax({
                    url: params.pages.data.url,
                    type: 'post',
                    data: {items: params.pages.data.items, page: params.pages.num, term: params.pages.data.term, contentid: params.pages.data.contentid},
                    success: function(dt){
                        if(dt!='')
                        {
                            params.controls.frameItem.append(dt);
                            params.controls.items = params.controls.frameSlide.find('.dItems');
                            params.controls.items.css({width: params.controls.frameHidden.css('width'), float: 'left'});
                            params.controls.frameItem.css('width', (params.controls.items.width()*params.controls.items.length)+'px');
                            if(params.pages.num==1)
                            {
                                params.controls.frameHidden.css('height', params.controls.frameHidden.height()+'px');
                                params.controls.frameSlide.attr('control', '1');
                                params.pages.page.append('<a class="aActive" title="'+params.pages.num+'" onClick="'+params.controls.var+'.jump('+params.pages.num+')">'+params.pages.num+'</a>');
                            }
                            else
                                params.pages.page.append('<a title="'+params.pages.num+'" onClick="'+params.controls.var+'.jump('+params.pages.num+')">'+params.pages.num+'</a>');
                            if(typeof(params.pages.data.success)=='function')
                                params.pages.data.success(params.pages.num);
                            if(params.pages.num<params.pages.data.number)
                            {
                                params.pages.num++;
                                loadPage();
                            }
                        }
                    }
                });
                break;
            case 'default':
                if(typeof(params.pages.data.success)=='function')
                    params.pages.data.success(params);
                break;
        }
        $("body").attr("control","1").css('cursor', 'default');
    };
    var active = function(){
        params.pages.page.find('> .aActive').removeClass('aActive');
        params.pages.page.find('> a:eq('+Math.floor(params.controls.frameScroll.scrollLeft()/params.controls.frameScroll.width())+')').addClass('aActive');
    };
    var scroll = function(){
        params.controls.frameScroll.scroll(function(){
            active();
        });
    };
    var params = {
        delay: 0.3,
        pages: {
            page: $('.dPages'),
            type: 'none',//default|ajax|none
            show: true,
            data: {//ajax
                items: 6,
                number: 5,
                url: BASEURL+((LANG!='')? '/LANG': '')+'/xu-ly/get-tours/',
                action: 'iGetCourses',
                callback: function(){},
                success: function(){}
            }
        },
        controls: {
            frameSlide: $('.dFrameSlide'),
            frameHidden: $('.dFrameHidden'),
            frameScroll: $('.dFrameScroll'),
            frameItem: $('.dFrameItem'),
            items: $('.dItems'),
            item: $('.dItem'),
            next: $('.aNext'),
            prev: $('.aPrev'),
            pages: $('.aPageSlide'),
            var: 'varName'
        }
    };
    params = $.extend({}, params, p);
    return {
        ready: ready,
        run: run,
        next: next,
        prev: prev,
        jump: jump
    };
};
//var frameSlide = $('.dFrameSlide:eq(0)');
//slideProm = Slide({
//    delay: 0.3,
//    pages: {
//        type: 'default',//default|ajax|none
//        page: $('.dPages'),
//        items: 6,
//        number: 5,
//        callback: function(){},
//    },
//    controls: {
//        frameSlide: frameSlide,
//        frameHidden: frameSlide.find('.dFrameHidden'),
//        frameScroll: frameSlide.find('.dFrameScroll'),
//        frameItem: frameSlide.find('.dFrameItem'),
//        item: frameSlide.find('.dItem'),
//        next: frameSlide.find('.aNext'),
//        prev: frameSlide.find('.aPrev'),
//        pages: frameSlide.find('.aPageSlide'),
//        var: 'varName',
//    },
//});
//End Slide

//banner auto
var Banner = function(p){
    var ready = function(){
        params.controls.item.css('display', 'none');
        params.controls.item.first().fadeTo(300, 1);
        params.controls.frameBanner.attr({index: 0, time: 1});
        if(params.auto>0)
            auto();
    };
    var run = function(){
        params.controls.next.click(function(){
            next();
        });
        params.controls.prev.click(function(){
            prev();
        });
        scroll();
    };
    var auto = function(){
        setInterval(function(){
            next();
        }, params.auto);
    };
    var next = function(){
        if(params.controls.frameBanner.attr('time')==1)
        {
            if(parseInt(params.controls.frameBanner.attr('index'))+1==params.controls.item.length)
                params.controls.frameBanner.attr('index', 0);
            else
                params.controls.frameBanner.attr('index', parseInt(params.controls.frameBanner.attr('index'))+1);
            jump(params.controls.frameBanner.attr('index'));
        }
    };
    var prev = function(){
        if(params.controls.frameBanner.attr('time')==1)
        {
            if(parseInt(params.controls.frameBanner.attr('index'))-1<0)
                params.controls.frameBanner.attr('index', params.controls.item.length-1);
            else
                params.controls.frameBanner.attr('index', parseInt(params.controls.frameBanner.attr('index'))-1);
            jump(params.controls.frameBanner.attr('index'));
        }
    };
    var jump = function(number){
        if(params.controls.frameBanner.attr('time')==1)
        {
            params.controls.frameBanner.attr('time', 0);
            if (typeof(params.controls.page) != 'undefined') {
                params.controls.page.item.removeClass(params.controls.page.active);
                params.controls.page.item.eq(number).addClass(params.controls.page.active);
            }
            params.controls.item.eq(number).fadeTo(params.delay, 1, function () {
                params.controls.item.not(params.controls.item.eq(number)).fadeOut(params.delay, function () {
                    params.callback();
                });
            });
            setTimeout(function(){
                params.controls.frameBanner.attr('time', 1);
            }, 1000);
        }
    };
    var scroll = function(){

    };
    var params = {
        delay: 300,
        auto: 0,
        callback: function(){},
        controls: {
            frameBanner: $('.frameSlide'),
            item: $('.item'),
            next: $('.next'),
            prev: $('.prev'),
            page: {
                frame: $('.framePage'),
                item: $('.itemPage'),
                active: 'activeBanner'
            }
        }
    };
    params = $.extend({}, params, p);
    return {
        ready: ready,
        run: run,
        next: next,
        prev: prev,
        jump: jump
    };
};

//audio
var AudiObj = function(p){
    var sing = function(num){
        params.controls.frameAudio.attr('playing', num);
        if(params.controls.frameAudio.attr('time')=='1') {
            stop();
            params.controls.timingObj.html(0);
            if(params.controls.frameAudio.attr('ready') == '1')
                params.player.currentTime = params.playlist[num].space;
            else
                params.src = ((BASEURL=='http://localhost')? BASEURL: params.playlist[num].site)+'/multimedia/'+params.playlist[num].mediaid+'?access=';
            params.player.volume = params.controls.volumeObj.find('div').width() / $('.dVolume').width();
            params.controls.playObj.removeClass('fa-pause').removeClass('fa-play').addClass('fa-play');
            play();
        }
    };
    var setPlaylist = function(playlist, file, index){
        params.playlist = playlist;
        if(index!=undefined && index!=-1)
            params.controls.frameAudio.attr('playing', index);
        params.player = ((typeof(params.player)!='undefined')? params.player: new Audio());
        params.player.preload = "auto";
        params.src = file+'?access=';
        params.player.src = params.src;
        params.player.load();
        params.controls.frameAudio.attr('time', 1);
        if(params.controls.frameAudio.attr('playing')!='-1')
        {
            params.controls.timingObj.html(0);
            params.player.currentTime = parseInt(params.controls.timingObj.html()) + params.playlist[params.controls.frameAudio.attr('playing')].space;
            play();
        }
        else
            params.controls.frameAudio.attr('playing', 0);
    };
    var setPlaylists = function(playlist, cb, index){
        if(typeof(cb)=='function')
            cb(params);
        params.playlist = playlist;
        params.player = ((typeof(params.player)!='undefined')? params.player: new Audio());
        params.player.volume = params.controls.volumeObj.find('div').width()/$('.dVolume').width();
        params.player.preload = "auto";
        params.src = ((BASEURL=='http://localhost')? BASEURL: params.playlist[params.controls.frameAudio.attr('playing')].site)+'/multimedia/'+params.playlist[params.controls.frameAudio.attr('playing')].mediaid+'?access=';
        if(index!=undefined && index!=-1)
        {
            params.controls.frameAudio.attr('playing', index);
            params.src = ((BASEURL=='http://localhost')? BASEURL: params.playlist[params.controls.frameAudio.attr('playing')].site)+'/multimedia/'+params.playlist[params.controls.frameAudio.attr('playing')].mediaid+'?access=';
            play();
        }
    };
    var play = function(){
        if(params.controls.frameAudio.attr('time')=='1')
        {
            params.controls.frameAudio.attr('time', 0);
            params.player.pause();
            (typeof(params.valPlay) != 'undefined')? clearInterval(params.valPlay): '';
            (typeof(params.valSeek) != 'undefined')? clearInterval(params.valSeek): '';
            params.controls.titleObj.val(params.playlist[params.controls.frameAudio.attr('playing')].name);
            params.controls.dateObj.val(params.playlist[params.controls.frameAudio.attr('playing')].dateVN);
            params.controls.lengthObj.val(params.playlist[params.controls.frameAudio.attr('playing')].params.duration);
            if(params.controls.playObj.hasClass('fa-play')==true)
            {
                params.controls.playObj.removeClass('fa-play').addClass('fa-pause');
                if(params.player.src != params.src)
                {
                    params.player.src = params.src;
                    params.player.load();
                    valPlay();
                }
                else
                    valPlay();
            }
            else
                params.controls.playObj.removeClass('fa-pause').addClass('fa-play');
            setTimeout(function(){
                params.controls.frameAudio.attr('time', 1);
            }, 500);
        }
    };
    var valPlay =function(){
        params.valPlay = setInterval(function () {
            params.player.play();
            if((params.player.buffered.length == 1 && params.player.readyState) || isNaN(params.player.duration) == false) {
                if(typeof(params.playFn)=='function')
                    params.playFn();
                params.player.play();
                params.player.currentTime = parseInt(params.controls.timingObj.html()) + params.playlist[params.controls.frameAudio.attr('playing')].space;
                params.valSeek = setInterval(function(){
                    if(parseInt(params.controls.timingObj.html())>=params.controls.lengthObj.val())
                    {
                        if(params.controls.frameAudio.attr('ready') != '1')
                        {
                            next();
                            return;
                        }
                        if(params.controls.frameAudio.attr('playing')==params.playlist.length-1)
                        {
                            k=0;
                            params.player.currentTime = 0;
                        }
                        else
                            k=parseInt(params.controls.frameAudio.attr('playing'))+1;
                        params.controls.frameAudio.attr('playing', k);
                        params.controls.lengthObj.val(params.playlist[k].params.duration);
                        params.controls.titleObj.val(params.playlist[k].name);
                        params.controls.dateObj.val(params.playlist[k].dateVN);
                    }
                    if(typeof(params.timingFn)=='function')
                        params.timingFn(params);
                    if(params.controls.frameAudio.attr('ready') == '1')
                    {
                        if(parseInt(params.player.currentTime)-params.playlist[params.controls.frameAudio.attr('playing')].space<0)
                            params.controls.timingObj.html((parseInt(params.controls.timingObj.html()) + params.playlist[params.controls.frameAudio.attr('playing')].space)-params.playlist[params.controls.frameAudio.attr('playing')].space);
                        else
                            params.controls.timingObj.html(parseInt(params.player.currentTime)-params.playlist[params.controls.frameAudio.attr('playing')].space);
                        TweenMax.to(params.controls.seekObj.find('div'), 0.39,{width: 100/(params.playlist[params.controls.frameAudio.attr('playing')].params.duration/(params.player.currentTime-params.playlist[params.controls.frameAudio.attr('playing')].space))+'%'});
                    }
                    else
                    {
                        params.controls.timingObj.html(parseInt(params.player.currentTime)+1);
                        TweenMax.to(params.controls.seekObj.find('div'), 0.39,{width: 100/(params.playlist[params.controls.frameAudio.attr('playing')].params.duration/(parseInt(params.player.currentTime)+1))+'%'});
                    }
                }, 1000);
                clearInterval(params.valPlay);
            }
        }, 500);
    };
    var stop = function(){
        params.player.pause();
        (typeof(params.valSeek) != 'undefined')? clearInterval(params.valSeek): '';
        (typeof(params.valPlay) != 'undefined')? clearInterval(params.valPlay): '';
        params.controls.playObj.removeClass('fa-pause').addClass('fa-play');
        if(typeof(params.stopFn)=='function')
            params.stopFn(params.controls.frameAudio.attr('playing'));
    };
    var prev = function(){
        if(params.controls.frameAudio.attr('time')=='1')
        {
            params.controls.frameAudio.attr('time', 0);
            if(params.controls.frameAudio.attr('playing')!='0')
                params.controls.frameAudio.attr('playing', parseInt(params.controls.frameAudio.attr('playing'))-1);
            else
                params.controls.frameAudio.attr('playing', params.playlist.length-1);
            params.controls.titleObj.val(params.playlist[params.controls.frameAudio.attr('playing')].name);
            params.controls.dateObj.val(params.playlist[params.controls.frameAudio.attr('playing')].dateVN);
            params.controls.lengthObj.val(params.playlist[params.controls.frameAudio.attr('playing')].params.duration);
            params.controls.timingObj.html(0);
            if(params.controls.frameAudio.attr('ready') == '1')
            {
                if(params.player.src != params.src)
                    params.player.src = params.src;
                params.player.currentTime = params.playlist[params.controls.frameAudio.attr('playing')].space;
            }
            else
            {
                params.player.src = ((BASEURL=='http://localhost')? BASEURL: params.playlist[params.controls.frameAudio.attr('playing')].site)+'/multimedia/'+params.playlist[params.controls.frameAudio.attr('playing')].mediaid+'?access=';
                params.player.play();
            }
            if(typeof(params.prevFn)=='function')
                params.prevFn(params.controls.frameAudio.attr('playing'));
            setTimeout(function(){
                params.controls.frameAudio.attr('time', 1);
            }, 500);
        }
    };
    var next = function(){
        if(params.controls.frameAudio.attr('time')=='1')
        {
            params.controls.frameAudio.attr('time', 0);
            if(params.controls.frameAudio.attr('playing')!=params.playlist.length-1)
                params.controls.frameAudio.attr('playing', parseInt(params.controls.frameAudio.attr('playing'))+1);
            else
                params.controls.frameAudio.attr('playing', 0);
            params.controls.titleObj.val(params.playlist[params.controls.frameAudio.attr('playing')].name);
            params.controls.dateObj.val(params.playlist[params.controls.frameAudio.attr('playing')].dateVN);
            params.controls.lengthObj.val(params.playlist[params.controls.frameAudio.attr('playing')].params.duration);
            params.controls.timingObj.html(0);
            if(params.controls.frameAudio.attr('ready') == '1') {
                if (params.player.src != params.src)
                    params.player.src = params.src;
                params.player.currentTime = params.playlist[params.controls.frameAudio.attr('playing')].space;
            }
            else
            {
                params.player.src = ((BASEURL=='http://localhost')? BASEURL: params.playlist[params.controls.frameAudio.attr('playing')].site)+'/multimedia/'+params.playlist[params.controls.frameAudio.attr('playing')].mediaid+'?access=';
                params.player.play();
            }
            if(typeof(params.nextFn)=='function')
                params.nextFn(params.controls.frameAudio.attr('playing'));
            setTimeout(function(){
                params.controls.frameAudio.attr('time', 1);
            }, 500);
        }
    };
    var src = function(str){
        params.player.src = str;
        params.player.load();
    };
    var getPlaylist = function(){
        return params;
    };
    var params = {
        player: undefined,
        playlist: [],
        src: undefined,
        valPlay: undefined,
        valSeek: undefined,
        valList: undefined,
        controls: {
            frameAudio: $('.dPlayer'),
            playObj: $('.aPlayList'),
            nextObj: $('.aNextList'),
            prevObj: $('.aPrevList'),
            titleObj: $('.tSongTitle'),
            dateObj: $('.iCreatedSong'),
            timingObj: $('#fSongInfo > div label'),
            lengthObj: $('.iSongTime'),
            seekObj: $('.dSeek'),
            volumeObj: $('.dVolume')
        },
        playFn: function(index){},
        stopFn: function(index){},
        nextFn: function(index){},
        prevFn: function(index){},
        timingFn: function(index){},
        seekFn: function(index){},
        volumeFn: function(index){}
    };
    params = $.extend({}, params, p);
    params.player = ((typeof(params.player)!='undefined')? params.player: new Audio());
    new handEvent({
        obj: params.controls.seekObj,
        tapFn: function(me, x, y){
            params.player.currentTime = params.controls.lengthObj.val()*(((x/me.width())*100)/100)+params.playlist[params.controls.frameAudio.attr('playing')].space;
            params.controls.timingObj.html(Math.floor(params.controls.lengthObj.val()*(((x/me.width())*100)/100)));
            params.controls.seekObj.find('div').css('width', ((x/me.width())*100)+'%');
        },
        downFn: function(me, x, y){//down
            params.player.currentTime = params.controls.lengthObj.val()*(((x/me.width())*100)/100)+params.playlist[params.controls.frameAudio.attr('playing')].space;
            params.controls.timingObj.html(Math.floor(params.controls.lengthObj.val()*(((x/me.width())*100)/100)));
            params.controls.seekObj.find('div').css('width', ((x/me.width())*100)+'%');
            if(typeof(params.seekFn)=='function')
                params.seekFn(params.controls.frameAudio.attr('playing'));
        },
        moveFn: function(me, x, y, x2, y2, x3, y3){//move
            params.player.currentTime = params.controls.lengthObj.val()*(((x3/me.width())*100)/100)+params.playlist[params.controls.frameAudio.attr('playing')].space;
            params.controls.timingObj.html(Math.floor(params.controls.lengthObj.val()*(((x3/me.width())*100)/100)));
            params.controls.seekObj.find('div').css('width', ((x3/me.width())*100)+'%');
        },
        upFn: function(me, x, y){},
        lMoveFn: function(me, x, y, x2, y2, x3, y3){},
        rMoveFn: function(me, x, y, x2, y2, x3, y3){},
        uMoveFn: function(me, x, y, x2, y2, x3, y3){},
        dMoveFn: function(me, x, y, x2, y2, x3, y3){}
    });
    new handEvent({
        obj: params.controls.volumeObj,
        tapFn: function(me, x, y){
            params.controls.volumeObj.find('div').css('width', ((x/me.width())*100)+'%');
            params.player.volume = x/me.width();
        },
        downFn: function(me, x, y){
            params.controls.volumeObj.find('div').css('width', ((x/me.width())*100)+'%');
            params.player.volume = x/me.width();
            if(typeof(params.volumeFn)=='function')
                params.volumeFn(params.controls.frameAudio.attr('playing'));
        },
        moveFn: function(me, x, y, x2, y2, x3, y3){
            params.controls.volumeObj.find('div').css('width', ((x3/me.width())*100)+'%');
            params.player.volume = x3/me.width();
        },
        upFn: function(me, x, y){},
        lMoveFn: function(me, x, y, x2, y2, x3, y3){},
        rMoveFn: function(me, x, y, x2, y2, x3, y3){},
        uMoveFn: function(me, x, y, x2, y2, x3, y3){},
        dMoveFn: function(me, x, y, x2, y2, x3, y3){}
    });
    params.controls.playObj.live('click', function(){
        play();
    });
    params.controls.nextObj.live('click', function(){
        next();
    });
    params.controls.prevObj.live('click', function(){
        prev();
    });
    return {
        play: play,
        sing: sing,
        setPlaylist: setPlaylist,
        stop: stop,
        prev: prev,
        next: next,
        src: src,
        getPlaylist: getPlaylist,
        setPlaylists: setPlaylists
    };
};

var MoveObj = function(p){
    var ready = function(){
        params.controls.posObj.each(function(index){
            $(this).css({
                width: params.controls.posObj.eq(index).width(),
                height: params.controls.posObj.eq(index).height()
            });
        });
        params.controls.frameObj.css({
            width: params.controls.frameObj.width(),
            height: params.controls.frameObj.height()
        });
        params.controls.itemObj.on('mousedown touchstart', function(e){
            params.posTop = e.pageY-$(this).offset().top;
            params.posLeft = e.pageX-$(this).offset().left;
        });
        params.controls.posObj.on('mouseup touchend touchcancel', function(){
            if(params.controls.objFc!=null) {
                $('body').css('overflow', 'auto');
                params.controls.frameObj.css('cursor', 'default');
                params.controls.itemObj.css('pointer-events', 'all');
                params.controls.objFc.css({
                    position: 'relative',
                    top: 'unset',
                    left: 'unset',
                    zIndex: 1
                });
                params.controls.posObj.css('box-shadow', '0 0 0 0px #fff');
                params.controls.objFc = null;
                params.posIndex2 = $(this).index();
                temp = params.controls.posObj.eq(params.posIndex2).html();
                params.controls.posObj.eq(params.posIndex2).html(params.controls.posObj.eq(params.posIndex1).html());
                params.controls.posObj.eq(params.posIndex1).html(temp);
                if(typeof(params.changeCB)=='function')
                    params.changeCB(params);
            }
        });
        params.controls.handleObj.on('mousedown touchstart', function(e){
            params.controls.objFc = $(this).parent().parent().parent();
            params.posIndex1 = params.controls.objFc.parent().index();
            params.controls.posObj.css('box-shadow', '0 0 3px 0px #fff');
            $('body').css('overflow', 'hidden');
        }).live('mouseup touchend touchcancel', function(){
            if(params.controls.objFc!=null) {
                $('body').css('overflow', 'auto');
                params.controls.frameObj.css('cursor', 'default');
                params.controls.itemObj.css('pointer-events', 'all');
                params.controls.objFc.css({
                    position: 'relative',
                    top: 'unset',
                    left: 'unset',
                    zIndex: 1
                });
                params.controls.posObj.css('box-shadow', '0 0 0 0px #fff');
                params.controls.objFc = null;
            }
        });
        params.controls.frameObj.on('mousemove touchmove', function(e){
            if(params.controls.objFc!=null)
            {
                params.controls.frameObj.css('cursor', 'grab');
                params.controls.itemObj.css('pointer-events', 'none');
                params.controls.objFc.css({
                    position: 'absolute',
                    top: (e.pageY-$(this).offset().top)-params.posTop,
                    left: (e.pageX-$(this).offset().left)-params.posLeft,
                    zIndex: 2
                });
            }
        });
    };
    var clearEvents = function(){
        params.controls.itemObj.off('mousedown touchstart');
        params.controls.posObj.off('mouseup touchend touchcancel');
        params.controls.handleObj.off('mousedown touchstart mouseup touchend touchcancel');
        params.controls.frameObj.off('mousemove touchmove');
    };
    var params = {
        posTop: 0,
        posLeft: 0,
        posIndex1: -1,
        posIndex2: -1,
        controls: {
            frameObj: $('.dMoveFrame'),
            posObj: $('.dMovePos'),
            itemObj: $('.dAudioItem'),
            objFc: null,
            handleObj: $('.dAudioItem .fa-arrows-alt')
        },
        changeCB: function(index){}
    };
    params = $.extend({}, params, p);
    ready();
    return {
        ready: ready,
        clearEvents: clearEvents
    };
};

function banner(class_item, class_next, class_prev, class_frame_banner, delay, time_auto, show_button, function_call_back)
{
    $('.'+class_item).css('display', 'none');
    $('.'+class_item+':eq(0)').addClass('active_banner').fadeTo(delay, 1);
    if(time_auto>0)
    {
        set_auto_banner(class_item, class_frame_banner, delay, time_auto, function_call_back);
        $('.'+class_frame_banner).hover(function(){
            //clearInterval(auto[$(this).attr('index')]);
            $(this).find('> a:not(.aItem)').stop().animate({'opacity':'0.6'});
            $('.d_page_banner a').stop().animate({'opacity':'0.6'});
        }, function(){
            //auto[$(this).attr('index')] = setInterval(function(){
            //next_banner(class_item, class_frame_banner, delay, function_call_back);
            //}, time_auto);
            $(this).find('> a').stop().animate({'opacity':'1'});
            $('.d_page_banner a').stop().animate({'opacity':'1'});
        });
    }
    $('.'+class_next).click(function(){
        next_banner(class_item, class_frame_banner, delay, function_call_back);
    }).hover(function(){
        $(this).stop().animate({'opacity':'1'});
    }, function(){
        $(this).stop().animate({'opacity':'0.6'});
    });
    $('.'+class_prev).click(function(){
        prev_banner(class_item, class_frame_banner, delay, function_call_back);
    }).hover(function(){
        $(this).stop().animate({'opacity':'1'});
    }, function(){
        $(this).stop().animate({'opacity':'0.6'});
    });
    if(show_button!=0 && show_button!=undefined)
    {
        $('.'+class_frame_banner).append('<div class="d_page_banner"></div>');
        $('.'+class_item).each(function(index){
            $('.'+class_frame_banner + ' .d_page_banner').append('<a onClick="jump_banner('+index+', \''+class_item+'\', \''+class_frame_banner+'\', '+delay+', \''+function_call_back+'\');"></a>');
        });
        $('.'+class_frame_banner + ' .d_page_banner a:eq(0)').addClass('a_active_page');
    }
}
function change_banner(class_item, class_frame_banner, delay, function_call_back)
{
    $('.active_banner').removeClass('active_banner');
    index = $('.'+class_frame_banner).attr('banner_number');
    if(typeof(function_call_back)==='function')
        function_call_back(class_item, index);
    $('.'+class_item+':eq('+index+')').addClass('active_banner').fadeIn(delay, function(){
        $('.'+class_item+':not(.active_banner)').fadeOut(delay, function(){
            $('.a_active_page').removeClass();
            $('.d_page_banner a:eq('+$('.'+class_frame_banner).attr('banner_number')+')').addClass('a_active_page');
        });
    });
}
function jump_banner(index, class_item, class_frame_banner, delay, function_call_back)
{
    if($('.'+class_item+':eq('+index+')').hasClass('active_banner'))
        return;
    var parent_item = $('.'+class_frame_banner);
    if(parent_item.attr('time')==1)
    {
        parent_item.attr('time', 0);
        $('.'+class_item+'.active_banner').removeClass('active_banner');
        $('.'+class_item+':eq('+index+')').addClass('active_banner').animate({'opacity':'toggle'}, delay, function(){
            $('.'+class_item+':not(.active_banner)').fadeOut(delay, function(){
                if(typeof(function_call_back)==='function')
                    function_call_back(class_item, index);
            });
        });
        $('.'+class_frame_banner).attr('banner_number', index);
        $('.'+class_frame_banner+' .a_active_page').removeClass();
        $('.'+class_frame_banner+' .d_page_banner a:eq('+index+')').addClass('a_active_page');
        setTimeout(function(){
            $('.'+class_frame_banner).attr('time', 1);
        }, 1000);
    }

}
function next_banner(class_item, class_frame_banner, delay, function_call_back)
{
    var parent_item = $('.'+class_frame_banner), banner_number = parseInt(parent_item.attr('banner_number'));
    if(parent_item.attr('time')==1)
    {
        parent_item.attr('time', 0);
        banner_number++;
        if(banner_number==$('.'+class_item).length)
            banner_number=0;
        parent_item.attr('banner_number', banner_number);
        change_banner(class_item, class_frame_banner, delay, function_call_back);
        setTimeout(function(){
            $('.'+class_frame_banner).attr('time', 1);
        }, 1000);
    }
}
function prev_banner(class_item, class_frame_banner, delay, function_call_back)
{
    var parent_item = $('.'+class_frame_banner), banner_number = parseInt(parent_item.attr('banner_number'));
    if(parent_item.attr('time')==1)
    {
        parent_item.attr('time', 0);
        banner_number--;
        if(banner_number==-1)
            banner_number=$('.'+class_item).length-1;
        parent_item.attr('banner_number', banner_number);
        change_banner(class_item, class_frame_banner, delay, function_call_back);
        setTimeout(function(){
            $('.'+class_frame_banner).attr('time', 1);
        }, 1000);
    }
}
function set_auto_banner(class_item, class_frame_banner, delay, time_auto, function_call_back)
{
    $('.'+class_frame_banner).attr({'index': num_auto, 'banner_number': 0, 'time': 1});
    auto[num_auto] = setInterval(function(){
        next_banner(class_item, class_frame_banner, delay, function_call_back);
    }, time_auto);
    num_auto++;
}
function item_banner_click(class_item, class_frame_banner, banner_number, delay)
{
    $('.'+class_frame_banner).attr('banner_number', banner_number);
    change_banner(class_item, class_frame_banner, delay, function_call_back);
}
//end banner

function validate(id,min_length,data_type,id_button_submit,function_delay)
{
    id_feild[id_feild.length]=id,
        $("#"+id).die().live("blur",function(e){
            $("#"+id).die(),
                setTimeout(function(){
                    valid_general(id,min_length,data_type,e,id_button_submit,function_delay)&&($("#"+id).die(),
                        validate(id,min_length,data_type,id_button_submit,function_delay)),eval(function_delay)
                },200)
        }),
        $("#"+id_button_submit).die().live("click",function(a){
            for(i=0;i<id_feild.length;i++)
                if(valid_general(id_feild[i],min_length,data_type,a,id_button_submit,function_delay))
                {
                    $("#"+id_button_submit).die(),
                        validate(id,min_length,data_type,id_button_submit,function_delay);
                    break;
                }
        })
}

function valid_general(a,b,c,d,e,f)
{
    if(empty_valid(a,d)||min_length_valid(a,b,d))
        return valid_basic(a,b,c,e,f),!0;
    switch(c)
    {
        case"text":break;
        case"number":break;
        case"date":break;
        case"email":break;
        case"user":
    }
}

function valid_basic(a,b,c,d,e)
{
    $("html, body").animate({scrollTop:$("#"+a).offset().top-50},300),
        validate(a,b,c,d,e);
}
function empty_valid(a,b)
{
    var c=$("#"+a);
    return""==c.val()?(c.addClass("error"),
        alert("B\u1ea1n vui l\xf2ng nh\u1eadp d\u1eef li\u1ec7u!"),
        b.preventDefault(),!0):void 0
}

function min_length_valid(a,b,c)
{
    var d=$("#"+a);
    return d.val().length<b?(d.addClass("error"),
        alert("S\u1ed1 k\xfd t\u1ef1 ph\u1ea3i t\u1eeb "+b+" tr\u1edf l\xean!"),
        c.preventDefault(),!0):void d.removeClass("error")
}

function search(a,b)
{
    var c=$("#"+a),d=$("#"+b);
    c.live("keyup",function(){
        d.val("");
        var a=$(this).val();
        ""!=a&&($(".u_list_com").remove(),clearTimeout(search_auto),
            search_auto=setTimeout(function(){
                $.ajax({
                    url:"../wp-content/themes/twentythirteen/includes/controller/ajax/search_com.php",
                    type:"POST",
                    data:{str:a},
                    success:function(b){
                        if(""!=b)
                            for(c.parent().css("position","relative"),
                                    c.after('<ul style="padding: 0 10px; background: none repeat scroll 0 0 #FFFFFF; border: 1px solid #E3E3E3; border-radius: 5px 5px 5px 5px; box-shadow: 0 3px 5px 1px #E3E3E3; left: 125px; position: absolute; top: 30px; width: 180px; z-index: 2;" class="u_list_com"></ul>'),
                                    i=0;
                                i<b.length;
                                i++){
                                var e=b[i].company_name;
                                e.toLowerCase()==a.toLowerCase()&&d.val(b[i].id),
                                    $(".u_list_com").append('<li style="background: none repeat scroll 0 0 #E4E4E4; border-radius: 5px 5px 5px 5px; margin: 3px 0; padding: 0 5px;" idcom="'+b[i].id+'"><a style="display: block;" class="a_item_search">'+e+"</a></li>")
                            }
                    }
                })
            },500))
    }).live("blur",function(){
        setTimeout(function(){
            $(".u_list_com").remove()
        },300)
    }),
        $(".a_item_search").live("click",function(){
            c.val($(this).text()),
                $("#"+b).val($(this).parent().attr("idcom")),
                $(".u_list_com").remove()
        })
}

function run_focus_menu(a,b,c,d,e,f,g,h)
{
    function l()
    {
        clearTimeout(k),
            i=$(this),
            j=setTimeout(function(){
                menu_hover(b,i,d,e,f)
            },g)
    }
    function m()
    {
        clearTimeout(j),
            k=setTimeout(function(){
                menu_focus(b,c,d,e)
            },g)
    }
    0==c.length&&(c=b.first()),
        $("html").append('<span class="s_bg_focus_menu"></span>'),
        menu_focus(b,c,d,e),
        setTimeout("$('.s_bg_focus_menu').fadeTo(300, 0.7);",200);
    var i,j,k;b.stop().hover(l,m),h.stop().hover(l,m);
}

function menu_focus(a,b,c,d,e)
{
    $(".s_bg_focus_menu").stop().animate({top:b.position().top+"px",left:b.offset().left+"px",width:b.css("width"),height:b.css("height")},e),
        a.find(">a").stop().animate({color:d},e),b.find(">a").stop().animate({color:c},e);
}

function menu_hover(a,b,c,d,e)
{
    $(".s_bg_focus_menu").stop().animate({top:b.position().top+"px",left:b.offset().left+"px",width:b.css("width"),height:b.css("height")},e),
        a.find(">a").stop().animate({color:d},e),b.find(">a").stop().animate({color:c},e);
}

// Translate
var sep='|', lang_i=0;
function tran(v){
    if(lang_i==0)
        if(LANG!=null)
            for(lang_i=0; lang_i<map.length; lang_i++)
                if(LANG==map[lang_i])
                    break;
    if(v)return v.split(sep)[lang_i];
    else{
        $('tran').each(function(){$(this).before($(this).html().split(sep)[lang_i]).remove();});
        $('.tran_val').each(function() {$(this).val($(this).val().split(sep)[lang_i]);});
        $(".tran_title").each(function(){$(this).attr("title",$(this).attr("title").split(sep)[lang_i])});
        $('.tran_place').each(function() {$(this).attr('placeholder', $(this).attr('placeholder').split(sep)[lang_i]);});
        $('.tran_text').each(function() {$(this).text($(this).text().split(sep)[lang_i]);});}}
//End translate

function changeLang()
{
    $(".u_menu").append($(".qtrans_language_chooser").html()).attr("id",$(".qtrans_language_chooser").attr("id")).addClass($(".qtrans_language_chooser").attr("class")),
        $(".widget_qtranslate").remove(),
        $(".u_menu a").removeClass(),
        $(".lang-vi a").html('<img src="'+SKIN+'/vi.gif" alt="tieng-viet"/>'),
        $(".lang-en a").html('<img src="'+SKIN+'/en.gif" alt="tieng-anh"/>'),
        $(".lang-ru a").html('<img src="'+SKIN+'/ru.gif" alt="tieng-nga"/>'),
        $(".lang-ru").css("display","none");
}

var bank = '';
function carts2(a,b,c)
{
    function d()
    {
        $.ajax({
            url:BASEURL+"/dat-hang/count-cart/",
            type:"POST",
            success:function(a){
                $(".s_num_pro").text(a)
            }
        })
    }
    d(),
        a.length>0&&(a.append(tran("?????T H??NG|BOOK NOW|???????????????????????? ????????????|????????????|???????????????")),
        a.live("click",function(){
            obj=$(this),
                $.ajax({
                    url:BASEURL+"/dat-hang/add-cart/",
                    type:"POST",
                    data:{id_pro:obj.attr("id_pro"),name_pro:obj.attr("name_pro"),price_pro:obj.attr("price_pro"),img_pro:obj.attr("img_pro"),attr_pro:obj.attr("attr_pro"),book_type:0},
                    success:function(){
                        obj.html(tran("???? ?????T|BOOKED|??????????????????????????|???|????????????")).addClass("a_payment"),
                            setTimeout(function(){
                                $(".a_payment").html(tran("THANH TO??N|PAYMENT|????????????|??????|?????????")).removeClass(obj.attr("class")).addClass("a_buy a_added")},1500),d()
                    }
                })
        })),
        b.length>0&&(b.append("<t>"+tran("?????T TOUR|BOOK NOW|???????????????????????? ????????????|????????????|???????????????")+"</t>"),
        b.live("click",function(){
            obj=$(this),
                $.ajax({
                    url:BASEURL+"/dat-hang/add-cart/",
                    type:"POST",
                    data:{id_pro:obj.attr("id_pro"),name_pro:obj.attr("name_pro"),price_pro:obj.attr("price_pro"),img_pro:obj.attr("img_pro"),attr_pro:obj.attr("attr_pro"),book_type:1},
                    success:function(){
                        obj.addClass("a_payment").find("t").html(tran("???? ?????T|BOOKED|??????????????????????????|???|????????????")),
                            setTimeout(function(){
                                $(".a_payment").removeClass(obj.attr("class")).addClass("a_buy a_added").find("t").html(tran("THANH TO??N|PAYMENT|????????????|??????|?????????"))
                            },1500),
                            d();
                    }
                })
        })),
        c.length>0&&(c.append(tran("?????T Ph??ng|BOOK NOW|???????????????????????? ????????????|????????????|???????????????")),
        c.live("click",function(){
            obj=$(this),$.ajax({
                url:BASEURL+"/dat-hang/add-cart/",
                type:"POST",data:{id_pro:obj.attr("id_pro"),name_pro:obj.attr("name_pro"),price_pro:obj.attr("price_pro"),img_pro:obj.attr("img_pro"),attr_pro:obj.attr("attr_pro"),book_type:2},
                success:function(){
                    obj.html(tran("???? ?????T|BOOKED|??????????????????????????|???|????????????")).addClass("a_payment"),setTimeout(function(){
                        $(".a_payment").html(tran("THANH TO??N|PAYMENT|????????????|??????|?????????")).removeClass(obj.attr("class")).addClass("a_buy a_added")},1e3),d()
                }
            })
        })),
        $(".a_buy").live("click",function(){
            obj=$(this),
                $.ajax({
                    url:BASEURL+"/dat-hang/get-cart/",
                    type:"POST",
                    dataType:"json",
                    success:function(d){
                        for(k=0; k<BANKS.length; k++)
                            bank+="<p><tran>T??N T??I KHO???N|ACCOUNT NAME|?????? ?????????????? ????????????|?????????|??????????????????</tran>: "+BANKS[k].accountName+'</p><p><input class="tran_val" type="button" value="???? CHUY???N|TRANSFERED|?????????????????? ????????????????????|??????|??????"/> <tran>S??? T??I KHO???N|ACCOUNT NUMBER|?????????? ??????????|??????|????????????</tran>: '+BANKS[k].accountNumber+" - <span>NG\xc2N H\xc0NG "+BANKS[k].bankName+"</span></p><br/>";
                        if(tab_cart="",a.length>0?(tab_cart+='<a class="a_active_carts"><tran>S\u1ea3n Ph\u1ea9m|Product|\u041f\u0440\u043e\u0434\u0443\u043a\u0442</tran></a>',
                            b.length>0&&(tab_cart+="<a><tran>Tour|Tour|\u0422\u0443\u0440</tran></a>"),
                            c.length>0&&(tab_cart+="<a><tran>Kh\xe1ch S\u1ea1n|Hotel|\u041e\u0442\u0435\u043b\u0438</tran></a>")):b.length>0?(tab_cart+='<a class="a_active_carts"><tran>Tour|Tour|\u0422\u0443\u0440</tran></a>',
                            c.length>0&&(tab_cart+="<a><tran>Kh\xe1ch S\u1ea1n|Hotel|\u041e\u0442\u0435\u043b\u0438</tran></a>")):tab_cart+='<a class="a_active_carts"><tran>Kh\xe1ch S\u1ea1n|Hotel|\u041e\u0442\u0435\u043b\u0438</tran></a>',
                            tb='<div class="d_step1"><h3 class="payment"><tran>THANH TO\xc1N|PAYMENT|\u041e\u041f\u041b\u0410\u0422\u0410</tran></h3><div class="d_tab_carts">'+tab_cart+'</div><div class="d_tabs_cart">',
                            a.length>0)
                        {
                            for(j=0,tb+='<div class="d_tb"><table cellpadding="20" class="t_cart">\n                        <tr><th><tran>Stt|Stt|\u041d\u043e\u043c\u0435\u0440</tran></th><th><tran>\u1ea2nh s\u1ea3n ph\u1ea9m|Product image|\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0430</tran></th><th><tran>T\xean s\u1ea3n ph\u1ea9m|Name product|\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0430</tran></th><th><tran>S\u1ed1 l\u01b0\u1ee3ng|Number|\u041a\u043e\u043b. \u0447\u0435\u043b\u043e\u0432\u0435\u043a</tran></th><th><tran>\u0110\u01a1n gi\xe1|Unit price|\u0426\u0435\u043d\u0430 \u0437\u0430 \u0435\u0434\u0438\u043d\u0438\u0446\u0443</tran></th></tr>',
                                    i=0;i<d.length;i++)
                                0==d[i].book_type&&(tb+='<tr><td></td><td><img class="i_pro" src="'+d[i].img_pro+'"/></td><td><span class="s_np">'+d[i].name_pro+'</span><br/><a class="a_del_pro" id_pro="'+d[i].id_pro+'"><b><tran>X\xf3a|Delete|\u0423\u0434\u0430\u043b\u0438\u0442\u044c</tran></b></a></td><td class="t_input"><input class="i_num_pro" type="text" value="1"/></td><td class="t_price">'+d[i].price_pro+"</td></tr>",j++);
                            tb+="</table></div>"
                        }
                        if(b.length>0)
                        {
                            for(j=0,tb+='<div class="d_tb"><table cellpadding="20" class="t_cart">\n                        <tr><th><tran>T\xean s\u1ea3n ph\u1ea9m|Name product|\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0430</tran></th><th><tran>Chi ti\u1ebft tour|Tours detail|\u0422\u0443\u0440\u044b \u043f\u043e\u0434\u0440\u043e\u0431\u043d\u043e</tran></th></tr>',i=0;i<d.length;i++)
                                1==d[i].book_type&&(tb+='<tr><td><span class="s_np"><img class="i_pro" src="'+d[i].img_pro+'"/><br/>'+d[i].name_pro+'</span><br/><span class="s_price"><span price="'+d[i].price_pro+'">'+d[i].price_text_pro+'</span> <a>\u0110</a></span><br/><a class="a_del_pro" id_pro="'+d[i].id_pro+'"><b><tran>X\xf3a|Delete|\u0423\u0434\u0430\u043b\u0438\u0442\u044c</tran></b></a></td><td class="t_input"><label for="i_num_adults_t'+j+'"><tran>Ng\u01b0\u1eddi l\u1edbn|Adults|\u0412\u0437\u0440\u043e\u0441\u043b\u044b\u0435</tran>:</label></span><input id="i_num_adults_t'+j+'" class="i_num_adults_t" type="text" onkeypress="if (window.event.keyCode < 48 || 57 < window.event.keyCode) return false;" value="1"/><br/><span><label for="i_num_kids_t'+j+'"><tran>Tr\u1ebb em|Kids|\u0414\u0435\u0442\u0438</tran>:</label></span><input id="i_num_kids_t'+j+'" class="i_num_kids_t" type="text" onkeypress="if (window.event.keyCode < 48 || 57 < window.event.keyCode) return false;" value="0"/><br/><label for="i_num_infants_t'+j+'"><tran>Tr\u1ebb nh\u1ecf|Infants|M\u043b\u0430\u0434\u0435\u043d\u0435\u0446</tran>:</label><input id="i_num_infants_t'+j+'" class="i_num_infants_t" type="text" onkeypress="if (window.event.keyCode < 48 || 57 < window.event.keyCode) return false;" value="0"/><br/><label for="i_start_date'+j+'"><tran>Ng\xe0y \u0111i|Start date|\u0414\u0430\u0442\u0430 \u043d\u0430\u0447\u0430\u043b\u0430</tran>:</label><input type="text" readonly id="i_start_date'+j+'" class="date i_start_date"/><br/></td></tr>',j++);tb+="</table></div>"}if(c.length>0){for(j=0,tb+='<div class="d_tb"><table cellpadding="20" class="t_cart">\n                        <tr><th><tran>T\xean s\u1ea3n ph\u1ea9m|Name product|\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0430</tran></th><th><tran>Chi ti\u1ebft ph\xf2ng|Rooms detail|\u041d\u043e\u043c\u0435\u0440\u0430 \u0434\u0435\u0442\u0430\u043b\u0435\u0439</tran></th></tr>',i=0;i<d.length;i++)if(2==d[i].book_type){for(attr_pro=d[i].attr_pro,attr_pro=attr_pro.split("|"),price_pro=d[i].price_pro,price_pro=price_pro.split("|"),tb+='<tr><td><span class="s_np"><img class="i_pro" src="'+d[i].img_pro+'"/><br/>'+d[i].name_pro+'</span><br/><span class="s_price"><span price=""></span> <a>\u0110</a></span><br/><a class="a_del_pro" id_pro="'+d[i].id_pro+'"><b><tran>X\xf3a|Delete|\u0423\u0434\u0430\u043b\u0438\u0442\u044c</tran></b></a></td><td class="t_input t_ht"><label class="l_fix" for="i_num_room'+j+'"><tran>S\u1ed1 l\u01b0\u1ee3ng ph\xf2ng|Number of rooms|\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043d\u043e\u043c\u0435\u0440\u043e\u0432</tran>:</label> <input id="i_num_room'+j+'" class="i_num_room" type="text" onkeypress="if (window.event.keyCode < 48 || 57 < window.event.keyCode) return false;" value="1"/><label for="s_room_type'+j+'"><tran>Lo\u1ea1i ph\xf2ng|Type of room|\u0422\u0438\u043f \u043d\u043e\u043c\u0435\u0440\u0430</tran>:</label><select id="s_room_type'+j+'" class="s_room_type">',f=0;f<attr_pro.length;f++)tb+='<option value="'+price_pro[f]+'">'+attr_pro[f]+"</option>";tb+='</select><br/><label for="i_num_adults_h'+j+'"><tran>Ng\u01b0\u1eddi l\u1edbn|Adults|\u0412\u0437\u0440\u043e\u0441\u043b\u044b\u0435</tran>:</label><input id="i_num_adults_h'+j+'" class="i_num_adults_h" type="text" onkeypress="if (window.event.keyCode < 48 || 57 < window.event.keyCode) return false;" value="1"/><label for="i_num_kids_h'+j+'"><tran>Tr\u1ebb em (d\u01b0\u1edbi 9 tu\u1ed5i)|Kids (under 9 years old)|\u0414\u0435\u0442\u0438 (\u043f\u043e\u0434 9 \u043b\u0435\u0442)</tran>:</label><input id="i_num_kids_h'+j+'" class="i_num_kids_h" type="text" onkeypress="if (window.event.keyCode < 48 || 57 < window.event.keyCode) window.event.keyCode = 0" value="0"/><br/><label for="i_check_date'+j+'"><tran>Ng\xe0y nh\u1eadn ph\xf2ng|Check-in date|\u0414\u0430\u0442\u0430 \u0437\u0430\u0435\u0437\u0434\u0430</tran>: </label><input type="text" id="i_check_date'+j+'" class="date i_check_date"/><label for="i_day_out'+j+'"><tran>Ng\xe0y tr\u1ea3 ph\xf2ng|Check-out date|\u0414\u0430\u0442\u0430 \u0432\u044b\u0435\u0437\u0434\u0430</tran>:</label><input type="hidden" id="i_day_number'+j+'" class="i_day_number" value="1"/><input type="text" id="i_day_out'+j+'" class="date i_day_out"/><br/></td></tr>',j++}tb+="</table></div>"}tb+='</div><div class="d_total"><span class="s_total1"><tran>T\u1ed5ng c\u1ed9ng|Total|\u0418\u0442\u043e\u0433\u043e</tran></span>: <span class="s_total2"></span></div></div>\n                        <div class="d_step2"><fieldset><legend><tran>TH\xd4NG TIN KH\xc1CH H\xc0NG|CUSTOMER INFORMATION|\u0418\u041d\u0424\u041e\u0420\u041c\u0410\u0426\u0418\u042f \u041a\u041b\u0418\u0415\u041d\u0422\u0410</tran></legend><div class="d_info_cus"><form id="fInfoCus" name="fInfoCus"><div class="d_line_info"><label><span><tran>H\u1ecd t\xean*|Full name*|\u0424\u0418\u041e*</tran></span><input class="i_name_cus" name="i_name_cus" type="text" '+(" "!=NAME?"disabled":"")+' value="'+NAME+'"/></label></div>\n                        <div class="d_line_info"><label><span><tran>Email*|Email*|E-mail*</tran></span><input class="i_mail_cus" name="i_mail_cus" type="email" '+(""!=CODEC2?"disabled":"")+' value="'+CODEC2+'"/></label></div>\n                        <div class="d_line_info"><label><span><tran>S\u1ed1 \u0111i\u1ec7n tho\u1ea1i*|Phone number*|\u041d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430*</tran></span><input class="i_phone_cus" name="i_phone_cus" type="text" '+(""!=PHONE?"disabled":"")+' value="'+PHONE+'" onkeypress="if (window.event.keyCode < 48 || 57 < window.event.keyCode) return false;"/></label></div>\n                        <div class="d_line_info"><label><span><tran>\u0110\u1ecba ch\u1ec9|Address|\u0410\u0434\u0440\u0435\u0441</tran></span><textarea class="t_address_cus" '+(""!=ADDRESS?"disabled":"")+">"+ADDRESS+'</textarea></label></div>\n                        <div class="d_line_info"><label><span><tran>Y\xeau c\u1ea7u|Request|\u0417\u0430\u043f\u0440\u043e\u0441</tran></span><textarea class="t_req_cus"></textarea></label></div></form></div></fieldset>\n                        <fieldset class="f_payments"><legend><tran>H\xccNH TH\u1ee8C THANH TO\xc1N|FORMS OF PAYMENT|\u0424\u041e\u0420\u041c\u042b \u041e\u041f\u041b\u0410\u0422\u042b</tran></legend><label><input name="payments" type="radio" value="0"/><tran>\u0110\u1ebfn nh\u1eadn s\u1ea3n ph\u1ea9m t\u1ea1i c\u1eeda h\xe0ng|To receive the product at the store|\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u043f\u0440\u043e\u0434\u0443\u043a\u0442 \u0432 \u043c\u0430\u0433\u0430\u0437\u0438\u043d\u0435</tran></label><label><input checked="checked" name="payments" type="radio" value="1"/><tran>Chuy\u1ec3n s\u1ea3n ph\u1ea9m \u0111\u1ebfn \u0111\u1ecba ch\u1ec9 c\u1ee7a b\u1ea1n|Move products to your address|\u041f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d\u0438\u0435 \u0442\u043e\u0432\u0430\u0440\u043e\u0432 \u043d\u0430 \u0432\u0430\u0448 \u0430\u0434\u0440\u0435\u0441</tran></label></fieldset></div>\n                        <div class="d_step3"><h3 class="payment"><tran>C\xc1CH TH\u1ee8C THANH TO\xc1N|PAYMENT METHOD|\u0421\u041f\u041e\u0421\u041e\u0411 \u041e\u041f\u041b\u0410\u0422\u042b</tran></h3><div class="d_tabs_pay">\n                        <a class="a_tab_pay a_active_pay"><tran>Thanh to\xe1n tr\u1ef1c tuy\u1ebfn|Payment online|\u041e\u043f\u043b\u0430\u0442\u0430 \u043e\u043d\u043b\u0430\u0439\u043d</tran></a><a class="a_tab_pay"><tran>Chuy\u1ec3n kho\u1ea3n qua ng\xe2n h\xe0ng|Bank transfer|\u0411\u0430\u043d\u043a\u043e\u0432\u0441\u043a\u0438\u0439 \u043f\u0435\u0440\u0435\u0432\u043e\u0434</tran></a><a class="a_tab_pay"><tran>Tr\u1ea3 ti\u1ec1n tr\u1ef1c ti\u1ebfp t\u1ea1i c\xf4ng ty|Payment direct at company|\u041e\u043f\u043b\u0430\u0442\u0430 \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0441\u044f \u043d\u0435\u043f\u043e\u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0435\u043d\u043d\u043e \u0432 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438</tran></a>\n                        <div class="d_tab_pay d_pay1"><p><tran>1. Ch\u1ecdn c\u1ed5ng thanh to\xe1n|Choose payment gateways|\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u043f\u043b\u0430\u0442\u0435\u0436\u043d\u044b\u0435 \u0448\u043b\u044e\u0437\u044b</tran></p><label><input name="paymentgw" type="radio" value="" checked="checked"><span><img border="0" src="'+SKIN+'/2.gif" alt="PayPal"></span></label><label><input name="paymentgw" type="radio" value=""><span><img id="previewImage" src="'+SKIN+'/1.png" border="0" alt="Preview Image"></span></label><p><tran>2. Ch\u1ecdn lo\u1ea1i ti\u1ec1n b\u1ea1n mu\u1ed1n thanh to\xe1n|Select the currency you wish to pay|\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u043b\u044e\u0442\u0443, \u043a\u043e\u0442\u043e\u0440\u0443\u044e \u0432\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u043e\u043f\u043b\u0430\u0442\u0438\u0442\u044c</tran></p><div class="d_nl" style="display:none"><label><input name="paymentbk" type="radio" value=""><span></span> <a>\u0110</a></label><label><input name="paymentbk" type="radio" value=""><span></span></label></div><div class="d_pp"><label><input name="paymentbk" type="radio" value=""><span></span></label><label><input name="paymentbk" type="radio" value=""><span></span></label></div></div>\n                        <div class="d_tab_pay d_pay2">'+bank+'</div>\n                        <div class="d_tab_pay d_pay3"><p><tran>Ph\u01b0\u01a1ng th\u1ee9c n\xe0y ch\u1ec9 \xe1p d\u1ee5ng v\u1edbi c\xe1c kh\xe1ch h\xe0ng \u0111\u1ee7 \u0111i\u1ec1u ki\u1ec7n nh\u1eadn h\xe0ng tr\u1ef1c ti\u1ebfp t\u1eeb nh\xe2n vi\xean c\u1ee7a c\u1eeda h\xe0ng.|This method applies only to the eligible direct from the store\'s staff.|\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u0434\u043b\u044f \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f \u0437\u0430\u043a\u0430\u0437\u0430.</tran></p></div></div>\n                        <fieldset><label><tran>Qu\xfd kh\xe1ch c\xf3 th\u1ec3 cung c\u1ea5p th\xf4ng tin h\u01b0\u1edbng d\u1eabn ch\xfang t\xf4i x\u1eed l\xfd \u0111\u01a1n h\xe0ng b\u1eb1ng c\xe1ch \u0111i\u1ec1n v\xe0o \xf4 d\u01b0\u1edbi \u0111\xe2y|You may provide the information we process an order by filling in the box below|\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u0434\u043b\u044f \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f \u0437\u0430\u043a\u0430\u0437\u0430.</tran><textarea class="t_message_pay"></textarea></label>\n                        </fieldset></div><a class="a_payment2"><tran>\u0110\u1ed3ng \xfd|Confirm|\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435</tran></a>',$("body").append('<div class="d_content_pop" time="1"><a class="a_close_pop">x</a>'+tb+'</div><div class="d_bg_pop"></div>').css("overflow","hidden"),add_tab("d_tab_carts a","a_active_carts","d_tb",100,999e4,""),$(".d_tb:not(.d_tb:eq(0))").css("display","none"),$(".d_bg_pop").fadeTo(300,.6),tran(),$(".d_content_pop").fadeTo(300,1,function(){total_price(a,b,c),$(".d_tb").each(function(){})}),$(".a_payment2").css("marginLeft",-$(".a_payment2").outerWidth()/2+"px"),$(".d_tab_pay:eq(0)").css("display","block"),$(".date").datepicker({minDate:0,dateFormat:"dd-mm-yy",numberOfMonths:2}),$("#fInfoCus").validate({rules:{i_name_cus:{required:!0},i_mail_cus:{required:!0,email:!0},i_phone_cus:{required:!0,number:!0}},messages:{i_name_cus:tran("Vui l\xf2ng nh\u1eadp h\u1ecd t\xean|Please enter your name|\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0438\u043c\u044f"),i_mail_cus:{required:tran("Vui l\xf2ng nh\u1eadp email|Please enter email|\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 email"),email:tran("\u0110\u1ecba ch\u1ec9 email kh\xf4ng h\u1ee3p l\u1ec7|The email address is not valid|\u0410\u0434\u0440\u0435\u0441 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b \u043d\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u0435\u043d")},i_phone_cus:{required:tran("B\u1ea1n ph\u1ea3i nh\u1eadp s\u1ed1 \u0111i\u1ec7n tho\u1ea1i|Please enter phone number|\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430"),number:tran("B\u1ea1n ph\u1ea3i nh\u1eadp s\u1ed1|Please enter number|\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440||")}}})
                    }
                })
        }),
        $(".d_bg_pop, .a_close_pop").live("click",function(){
            $(".d_content_pop, .d_bg_pop").fadeTo(300,0,function(){
                $(this).remove(),
                    $("body").css("overflow","auto")
            })
        }),
        $(".i_num_pro, .i_num_adults_t, .i_num_kids_t, .i_num_room").live("keyup",function(){
            total_price(a,b,c)
        }),
        $(".i_day_out, .i_check_date").live("change",function(){
            ""!=$(".i_check_date").val()&&""!=$(".i_day_out").val()&&(day1=$(".i_check_date").val().split("-"),
                day2=$(".i_day_out").val().split("-"),
                    day2[0]<day1[0]?day2[1]<=day1[1]?day2[2]<=day1[2]?(alert(tran("l\u1ed7i ng\xe0y tr\u1ea3 ph\xf2ng tr\u01b0\u1edbc ng\xe0y nh\u1eadn ph\xf2ng, vui l\xf2ng ch\u1ecdn l\u1ea1i ng\xe0y|Errors days before check-in check-out, please choose the date|\u041e\u0448\u0438\u0431\u043a\u0438 \u0434\u043d\u0435\u0439 \u0434\u043e \u0437\u0430\u0435\u0437\u0434\u0430 \u0432 \u0432\u044b\u0435\u0437\u0434\u0435, \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0430\u0442\u0443")),
                $(this).parent().find(".i_day_number").val(1),
                $(this).val("")):(year=day2[2]-day1[2],
                month=day2[1]+12*year-day1[1],
                day=day2[0]+day2[1]*(1==month||3==month||4==month||5==month||6==month||10==month||12==month?31:day1[2]/400==0&&2==month?28:30)-day1[0],
                $(this).parent().find(".i_day_number").val(day)):(month=day2[1]-day1[1],
                day=parseInt(day2[0])+month*(1==day1[1]||3==day1[1]||4==day1[1]||5==day1[1]||6==day1[1]||10==day1[1]||12==day1[1]?31:day1[2]/400==0&&2==day1[1]?28:30)-day1[0],
                $(this).parent().find(".i_day_number").val(day)):(day=day2[0]-day1[0],
                $(this).parent().find(".i_day_number").val(day)),
                total_price(a,b,c))
        }),
        $(".s_room_type").live("change",function(){
            $(this).parent().prev().find(".s_price span").attr("price",$(this).val()),
                $(this).parent().prev().find(".s_price span").text("price",$(this).val()),
                total_price(a,b,c)
        }),
        $(".a_payment2").live("click",function(){
            if(1==$(".d_content_pop").attr("time"))
            {
                if($(".d_content_pop").attr("time","0"),
                    setTimeout("$('.d_content_pop').attr('time', '1');",1e3),
                    1==$(".t_cart tr").length)
                    return void $(".d_content_pop, .d_bg_pop").fadeTo(300,0,function(){
                        $(this).remove(),
                            $("body").css("overflow","auto")
                    });
                $(this).attr("class","a_payment3"),
                    $(".d_step1").fadeOut(300,function(){
                        $(".d_step2").fadeIn(300),
                            $(".a_payment3").before('<a class="a_back1"><tran>Quay l\u1ea1i|Back|\u041d\u0430\u0437\u0430\u0434</tran></a>'),tran()
                    })
            }
        }),
        $(".a_back1").live("click",function(){
            1==$(".d_content_pop").attr("time")&&($(".d_content_pop").attr("time","0"),
                setTimeout("$('.d_content_pop').attr('time', '1');",1e3),
                $(".a_payment3").attr("class","a_payment2"),
                $(".d_step2").fadeOut(300,function(){
                    $(".d_step1").fadeIn(300),
                        $(".a_back1").remove()
                }))
        }),
        $(".a_payment3").live("click",function(){
            1==$(".d_content_pop").attr("time")&&$("#fInfoCus").valid()&&($(".d_content_pop").attr("time","0"),
                setTimeout("$('.d_content_pop').attr('time', '1');",1e3),
                $(".a_payment3").attr("class","a_payment4"),
                $(".a_back1").attr("class","a_back2"),
                $(".d_step2").fadeOut(300,function(){
                    $(".d_step3").fadeIn(300,function(){
                        add_tab("a_tab_pay","a_active_pay","d_tab_pay",200,0,'$(".t_message_pay").val(""); $(".f_payment4").remove();$(".a_payment6").attr("class", "a_payment4");');
                    });
                }));
        }),
        $(".a_back2").live("click",function(){
            1==$(".d_content_pop").attr("time")&&($(".d_content_pop").attr("time","0"),
                setTimeout("$('.d_content_pop').attr('time', '1');",1e3),
                $(".a_payment6").attr("class","a_payment4"),
                $(".a_payment4").attr("class","a_payment3"),
                $(".a_back2").attr("class","a_back1"),
                $(".f_payment4").remove(),$(".d_step3").fadeOut(300,function(){
                $(".d_step2").fadeIn(300)
            }))
        }),
        $(".a_payment4").live("click",function(){
            if(1==$(".d_content_pop").attr("time"))
            {
                if($(".d_content_pop").attr("time","0"),
                    setTimeout("$('.d_content_pop').attr('time', '1');",1e3),
                    ""==$(".t_message_pay").val())
                    return void alert(tran("B???n vui l??ng nh???p ?????y ????? th??ng tin|Please enter all infomation|????????????????????, ?????????????? ?????? ????????????????????|?????????????????????|????????????????????????????????????????????????"));
                if($(".a_tab_pay:eq(0)").hasClass("a_active_pay"))
                {
                    var e="";$(".t_cart").each(function(){
                    $(this).find(".s_np").each(function(a){e+=a+1+". "+$(this).text()+". "})
                }),
                    "block"==$(".d_nl").css("display")&&$(this).attr($(".d_nl input:checked").val()==$(".d_pay1 input:eq(4)").val()?{
                    target:"_blank",
                    href:"https://www.nganluong.vn/button_payment.php?receiver=info@vietnamcharm.vn&product_name="+Math.random()+"&price="+$(".d_nl input:checked").val()+"&return_url="+BASEURL+"&comments="+e+"&currency=usd&lang=en"}:
                {
                    target:"_blank",
                    href:"https://www.nganluong.vn/button_payment.php?receiver=info@vietnamcharm.vn&product_name="+Math.random()+"&price="+$(".d_nl input:checked").val()+"&return_url="+BASEURL+"&comments="+e
                })
                }
                $(this).addClass("a_payment5").removeClass("a_payment4").text(tran("Vui l??ng ch??? ...|Please wait ...|?????????????????? ...|????????? ...|????????????????????? ...")),
                    $(".a_back2").remove(),
                    $.ajax({
                        url:BASEURL+"/dat-hang/get-cart/",
                        type:"POST",
                        dataType:"json",
                        success:function(e){
                            $.ajax(""==CODEC2?{
                                url:BASEURL+"/dat-hang/get-user-by-mail/",
                                type:"POST",
                                data:{email:$(".i_mail_cus").val()},
                                success:function(f){
                                    return""==f?void $.ajax({
                                        url:BASEURL+"/dat-hang/add-user/",
                                        type:"POST",
                                        data:{user_email:$(".i_mail_cus").val(),user_name:$(".i_name_cus").val(),user_phone:$(".i_phone_cus").val(),user_address:$(".t_address_cus").val(),security:$("body").attr("security")},
                                        success:function(f){
                                            CODEC2=f,
                                                $.ajax({
                                                    url:BASEURL+"/dat-hang/sent-mail/",
                                                    type:"POST",
                                                    data:{
                                                        u_tname:$(".i_name_cus").val(),
                                                        u_temail:$(".i_mail_cus").val(),
                                                        title:"\u0110\u1eb7t m\u1eadt kh\u1ea9u cho t\xe0i kho\u1ea3n c\u1ee7a b\u1ea1n t\u1ea1i SmilingSun",
                                                        template:"createPassword"}
                                                }),
                                                $.ajax({
                                                    url:BASEURL+"/dat-hang/add-cart-info/",
                                                    type:"POST",
                                                    data:{email:$(".i_mail_cus").val(),request:$(".t_req_cus").val(),payments:$(".f_payments input:checked").val(),message:$(".t_message_pay").val()},
                                                    success:function(f){
                                                        for(finish=tran("Ch\xfang t\xf4i \u0111\xe3 nh\u1eadn \u0111\u01b0\u1ee3c \u0111\u01a1n h\xe0ng c\u1ee7a b\u1ea1n. Ch\xfang t\xf4i s\u1ebd li\xean h\u1ec7 v\u1edbi b\u1ea1n trong th\u1eddi gian s\u1edbm nh\u1ea5t|We have received your order. We will contact you as soon as possible|\u041c\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043b\u0438 \u0432\u0430\u0448 \u0437\u0430\u043a\u0430\u0437. \u041c\u044b \u0441\u0432\u044f\u0436\u0435\u043c\u0441\u044f \u0441 \u0432\u0430\u043c\u0438 \u043a\u0430\u043a \u043c\u043e\u0436\u043d\u043e \u0441\u043a\u043e\u0440\u0435\u0435"),i=0;i<e.length;i++)
                                                            $(".t_cart").each(function(){
                                                                $(this).find(".a_del_pro").each(function(g){
                                                                    if(e[i].id_pro==$(this).attr("id_pro"))
                                                                    {
                                                                        for(type="",j=0;j<$(".t_cart:eq(1) tr").length-1;j++)$(".t_cart:eq(1) #s_room_type"+j+" option").each(function(){
                                                                            $(".t_cart:eq(1) #s_room_type"+j).val()==$(this).attr("value")&&(type=$(this).text())
                                                                        });
                                                                        $.ajax({
                                                                            url:BASEURL+"/dat-hang/add-cart-detail/",
                                                                            type:"POST",
                                                                            dataType:"json",
                                                                            data:{cartid:f,id_pro:e[i].id_pro,manufacture:1==e[i].book_type?$(this).parent().next().find(".i_start_date").val():$(this).parent().next().find(".i_check_date").val(),expiration:1==e[i].book_type?"":$(this).parent().next().find(".i_day_out").val(),book_type:e[i].book_type,number_pro:0==e[i].book_type?$(".i_num_pro:eq("+g+")").val():1==e[i].book_type?$(".i_num_adults_t:eq("+g+")").val():parseInt($(".i_num_room:eq("+g+")").val())+parseInt($(".i_num_adults_h:eq("+g+")").val()),number_kids:1==e[i].book_type?$(".i_num_kids_t:eq("+g+")").val():2==e[i].book_type?$(".i_num_kids_h:eq("+g+")").val():"",number_infants:1==e[i].book_type?$(".i_num_infants_t:eq("+g+")").val():"",price_pro:$(this).prev().prev().find("span").attr("price"),attr_pro:type},
                                                                            success:function(){
                                                                                if(""!=finish)
                                                                                {
                                                                                    if($(".t_cart:eq(0) tr").length>1&&$.ajax({
                                                                                        url:BASEURL+"/dat-hang/sent-mail/",
                                                                                        type:"POST",
                                                                                        data:{
                                                                                            u_temail:$(".i_mail_cus").val(),
                                                                                            cartid:f,
                                                                                            user_name:$(".i_name_cus").val(),
                                                                                            user_phone:$(".i_phone_cus").val(),
                                                                                            user_address:$(".t_address_cus").val(),
                                                                                            title:"SmilingSun Travel k\xednh g\u1eedi "+$(".i_name_cus").val()+" n\u1ed9i dung tour",
                                                                                            template:"infoTour"}
                                                                                    }),$(".t_cart:eq(1) tr").length>1)
                                                                                    {
                                                                                        for(mail='<html><head><meta charset="utf-8"></head><body><table style="font-family:arial;font-size:14px;line-height:1.6em;background:#7f96c8" border="0" cellspacing="0" cellpadding="0" width="660" align="center"><tbody><tr><td width="660" style="padding:20px 20px 0px 20px"><table border="0" bgcolor="#ffffff" cellspacing="0" cellpadding="0"><tbody><tr><td width="510" style="padding-left:20px;padding-top:20px"><a rel="nofollow" href="http://vietnamcharm.vn/" target="_blank"><img src="http://vietnamcharm.vn/wp-content/themes/twentyfourteen/images/logo.png" height="100" width="auto"></a></td><td width="30" style="padding-top:30px"><a rel="nofollow" href="https://www.facebook.com/pages/Smiling-Sun-Travel/952434568116280" target="_blank"><img src="http://vietnamcharm.vn/wp-content/themes/twentyfourteen/images/FB1.jpg" height="23" width="23"></a></td><td width="30" style="padding-top:30px"><a rel="nofollow" href="https://plus.google.com/?hl=vi" target="_blank"><img src="http://vietnamcharm.vn/wp-content/themes/twentyfourteen/images/GG1.jpg" height="23" width="21"></a></td><td width="40" style="padding-top:30px"><a rel="nofollow" href="https://twitter.com/SmilingSun999" target="_blank"><img src="http://vietnamcharm.vn/wp-content/themes/twentyfourteen/images/TT1.jpg" height="23" width="23"></a></td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table border="0" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0"><tbody><tr><td width="620" style="font-family:arial;font-size:22px;padding:0px 10px;text-transform:uppercase;line-height:1.6em;text-align:center;color:#3a5eaa">th\xf4ng tin \u0111\u1eb7t ph\xf2ng</td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table border="0" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0"><tbody><tr><td width="660" style="padding:0px 10px">\n                                                                                            <div style="margin:14px 0 14px 0">Ch\xe0o <b>'+$(".i_name_cus").val()+'</b>,</div><div style="margin:14px 0 14px 0">Xin c\u1ea3m \u01a1n Qu\xfd Kh\xe1ch \u0111\xe3 l\u1ef1a ch\u1ecdn d\u1ecbch v\u1ee5 c\u1ee7a SmilingSun cho chuy\u1ebfn \u0111i c\u1ee7a m\xecnh.</div>\n                                                                                            <div style="margin:14px 0 14px 0">\u0110\u01a1n \u0111\u1eb7t ph\xf2ng c\u1ee7a Qu\xfd Kh\xe1ch \u0111\xe3 \u0111\u01b0\u1ee3c ho\xe0n th\xe0nh. Nh\xe2n vi\xean t\u01b0 v\u1ea5n: <b>Huy Nguy\u1ec5n</b>  s\u1ebd li\xean l\u1ea1c v\u1edbi Qu\xfd Kh\xe1ch trong v\xf2ng 1 gi\u1edd k\u1ec3 t\u1eeb khi \u0111\u01a1n \u0111\u1eb7t ph\xf2ng c\u1ee7a Qu\xfd Kh\xe1ch \u0111\u01b0\u1ee3c g\u1eedi t\u1edbi SmilingSun. <i>Vi\u1ec7c thanh to\xe1n s\u1ebd \u0111\u01b0\u1ee3c ti\u1ebfn h\xe0nh sau khi Qu\xfd Kh\xe1ch nh\u1eadn \u0111\u01b0\u1ee3c x\xe1c nh\u1eadn d\u1ecbch v\u1ee5 t\u1eeb SmilingSun.</i></div>\n                                                                                            <div style="margin:14px 0 14px 0">Th\xf4ng tin \u0111\u1eb7t ph\xf2ng c\u1ee7a Qu\xfd kh\xe1ch nh\u01b0 sau:</div></td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table style="font-family:arial;font-size:14px;line-height:2em;background:rgb(229,247,253)" border="0"><tbody><tr><td style="padding:0px 10px"><table><tbody><tr><td width="170">M\xe3 \u0111\u01a1n h\xe0ng:</td>\n                                                                                            <td colspan="2"><b>'+f+'</b></td></tr><tr><td>Kh\xe1ch h\xe0ng:</td><td colspan="2">'+$(".i_name_cus").val()+'</td></tr><tr><td>\u0110i\u1ec7n tho\u1ea1i:</td><td colspan="2">'+$(".i_phone_cus").val()+'</td></tr><tr><td>Email:</td><td colspan="2"><a href="mailto:'+$(".i_mail_cus").val()+'" target="_blank">'+$(".i_mail_cus").val()+'</a></td></tr><tr><td>\u0110\u1ecba ch\u1ec9:</td><td colspan="2">'+$(".t_address_cus").val()+'</td></tr><tr><td style="padding-top:20px">Th\xf4ng tin ph\xf2ng:</td></tr><tr><td colspan="2" style="padding:10px 0px">',tb1='<table style="font-family:arial;font-size:14px;border:1px solid rgb(204,204,204);border-collapse:collapse;background:rgb(229,247,253)" class="t_cart"><tbody><tr><th>Stt</th><th>\u1ea2nh s\u1ea3n ph\u1ea9m</th><th>T\xean s\u1ea3n ph\u1ea9m</th><th>Chi ti\u1ebft kh\xe1ch s\u1ea1n</th><th>S\u1ed1 l\u01b0\u1ee3ng ph\xf2ng</th><th>\u0110\u01a1n gi\xe1</th></tr>',i=0;i<$(".t_cart:eq(1) tr").length-1;i++)
                                                                                            $(".t_cart:eq(1) #s_room_type"+i+" option").each(function(){
                                                                                                $(".t_cart:eq(1) #s_room_type"+i).val()==$(this).attr("value")&&(type=$(this).text())
                                                                                            }),
                                                                                                tb1+='<tr><td style="border:1px solid #cccccc;text-align:center">'+(i+1)+'</td><td style="border:1px solid #cccccc;text-align:center"><img style="vertical-align: middle; width: 100px" src="'+$(".t_cart:eq(1) .i_pro:eq("+i+")").attr("src")+'"></td><td style="border:1px solid #cccccc;text-align:center"><span>'+$(".t_cart:eq(1) .s_np:eq("+i+")").text()+'</span></td><td style="border:1px solid #cccccc;text-align:center; width: 200px">Lo\u1ea1i ph\xf2ng: '+type+"<br/>"+(0==$(".t_cart:eq(1) #i_num_adults_h"+i).val()?"":$(".t_cart:eq(1) #i_num_adults_h"+i).val()+" Ng\u01b0\u1eddi l\u1edbn<br>")+(0==$(".t_cart:eq(1) #i_num_kids_h"+i).val()?"":$(".t_cart:eq(1) #i_num_kids_h"+i).val()+" Tr\u1ebb em (d\u01b0\u1edbi 9 tu\u1ed5i)<br>")+(""==$(".t_cart:eq(1) #i_check_date"+i).val()?"":"Ng\xe0y nh\u1eadn ph\xf2ng: "+$(".t_cart:eq(1) #i_check_date"+i).val()+"<br>")+(""==$(".t_cart:eq(1) #i_day_out"+i).val()?"":"Ng\xe0y tr\u1ea3 ph\xf2ng: "+$(".t_cart:eq(1) #i_day_out"+i).val()+"<br>")+'</td><td style="border:1px solid #cccccc;text-align:center">'+$(".t_cart:eq(1) #i_num_room"+i).val()+'</td><td style="border:1px solid #cccccc;text-align:center" class="t_price">'+$(".t_cart:eq(1) .s_price:eq("+i+")").text()+"</td></tr>";
                                                                                        tb1+="</tbody></table><center><h3>T\u1ed5ng gi\xe1: "+sep_price2(String(total_pr(0,[],[],c,1)))+" \u0110</h3></center>",mail+=tb1+'</td></tr><tr><td valign="top">Ph\u01b0\u01a1ng th\u1ee9c thanh to\xe1n:</td><td> Nh\xe2n vi\xean SmilingSun s\u1ebd t\u01b0 v\u1ea5n cho Qu\xfd Kh\xe1ch.</td></tr><tr><td valign="top">Ghi ch\xfa:</td><td>M\u1ecdi y\xeau c\u1ea7u s\u1ebd \u0111\u01b0\u1ee3c \u0111\xe1p \u1ee9ng t\xf9y thu\u1ed9c v\xe0o \u0111i\u1ec1u ki\u1ec7n c\u1ee7a kh\xe1ch s\u1ea1n khi nh\u1eadn ph\xf2ng.</td></tr><tr><td valign="top">\u0110i\u1ec1u ki\u1ec7n xu\u1ea5t h\xf3a \u0111\u01a1n:</td><td><div>\u2022  Qu\xfd kh\xe1ch h\xe0ng c\u1ea7n cung c\u1ea5p th\xf4ng tin v\xe0 \u0111\u1ecba ch\u1ec9 xu\u1ea5t h\xf3a \u0111\u01a1n tr\u01b0\u1edbc ho\u1eb7c ngay khi thanh to\xe1n \u0111\u01a1n ph\xf2ng.</div><div>\u2022  SmilingSun s\u1ebd kh\xf4ng th\u1ec3 xu\u1ea5t h\xf3a \u0111\u01a1n n\u1ebfu Qu\xfd kh\xe1ch g\u1eedi th\xf4ng tin ch\u1eadm h\u01a1n th\u1eddi gian tr\xean.</div><div>\u2022  SmilingSun s\u1ebd g\u1eedi h\xf3a \u0111\u01a1n \u0111\u1ebfn Qu\xfd kh\xe1ch trong v\xf2ng m\u1ed9t tu\u1ea7n sau ng\xe0y tr\u1ea3 ph\xf2ng.</div></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table border="0" bgcolor="#ffffff" cellspacing="0" cellpadding="0"><tbody><tr><td width="660" style="padding:0px 10px"><div style="margin:14px 0 14px 0">Nh\xe2n vi\xean t\u01b0 v\u1ea5n: <b>Huy Nguy\u1ec5n</b></div><div style="margin:14px 0 14px 0">\u0110i\u1ec7n tho\u1ea1i b\xe0n: <b>0583.824.423</b><br/>Di \u0111\u1ed9ng: <b>0919512568 - 0903.121.405</b></div><div style="margin:14px 0 14px 0">Email: <b><a href="mailto:info@vietnamcharm.vn" target="_blank">info@vietnamcharm.vn</a></b></div></td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table border="0" bgcolor="#ffffff" cellspacing="0" cellpadding="0"><tbody><tr><td width="660" style="padding:0px 10px 15px 10px">SmilingSun ch\xe2n th\xe0nh c\u1ea3m \u01a1n!</td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table border="0" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td style="width:620px;text-align:center"><a rel="nofollow" href="http://vietnamcharm.vn/" target="_blank"><img width="620" height="auto" src="http://vietnamcharm.vn/wp-content/uploads/2014/09/Huy1.jpg" style="display:block;width:100%;min-width:620px" alt="airporttaxi"></a></td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px 20px 20px"><table border="0" bgcolor="#ffffff" cellspacing="0" cellpadding="0" style="text-align:center;font-style:italic;line-height:1em;font-size:12px"><tbody><tr><td width="660" style="padding:0px 10px"><div style="margin:12px 0 12px 0"><b>C\xf4ng ty TNHH Th\u01b0\u01a1ng M\u1ea1i D\u1ecbch V\u1ee5 Du L\u1ecbch M\u1eb7t Tr\u1eddi C\u01b0\u1eddi</b></div><div style="margin:12px 0 12px 0"><b>VP Nha Trang:</b> 75 Nguy\u1ec5n B\u1ec9nh Khi\xeam, Nha trang, Vi\u1ec7t Nam.</div></td></tr></tbody></table></td></tr></tbody></table></body></html>',
                                                                                            $.ajax({
                                                                                                url:TEMPLATEURL+"/includes/controller/ajax/sent_mail.php",type:"POST",
                                                                                                data:{
                                                                                                    u_nmail:U_MAIL_NAME,
                                                                                                    u_fmail:U_MAIL,
                                                                                                    u_p_fmail:CODEC,
                                                                                                    u_temail:$(".i_mail_cus").val()+"|"+U_MAIL_TO,
                                                                                                    u_rmail:U_MAIL_REPLY,
                                                                                                    title:"SmilingSun Travel k\xednh g\u1eedi "+$(".i_name_cus").val()+" n\u1ed9i dung \u0111\u1eb7t ph\xf2ng",
                                                                                                    body:mail
                                                                                                }
                                                                                            })
                                                                                    }
                                                                                    $(".d_content_pop, .d_bg_pop").fadeTo(300,0,function(){
                                                                                        $(this).remove(),$("body").css("overflow","auto")
                                                                                    }),
                                                                                        $.ajax({
                                                                                            url:BASEURL+"/dat-hang/del-carts/",
                                                                                            type:"POST",
                                                                                            success:function(){
                                                                                                total_price(a,b,c),d();
                                                                                            }
                                                                                        }),
                                                                                        $(".a_tab_pay:eq(0)").hasClass("a_active_pay")||alert(finish)}finish=""
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            })
                                                    }
                                                })
                                        }
                                    }):(CODEC2=f[0].ID,
                                        void $.ajax({
                                            url:BASEURL+"/dat-hang/add-cart-info/",
                                            type:"POST",
                                            data:{email:$(".i_mail_cus").val(),request:$(".t_req_cus").val(),payments:$(".f_payments input:checked").val(),message:$(".t_message_pay").val()},
                                            success:function(f){
                                                for(finish=tran("Ch\xfang t\xf4i \u0111\xe3 nh\u1eadn \u0111\u01b0\u1ee3c \u0111\u01a1n h\xe0ng c\u1ee7a b\u1ea1n. Ch\xfang t\xf4i s\u1ebd li\xean h\u1ec7 v\u1edbi b\u1ea1n trong th\u1eddi gian s\u1edbm nh\u1ea5t|We have received your order. We will contact you as soon as possible|\u041c\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043b\u0438 \u0432\u0430\u0448 \u0437\u0430\u043a\u0430\u0437. \u041c\u044b \u0441\u0432\u044f\u0436\u0435\u043c\u0441\u044f \u0441 \u0432\u0430\u043c\u0438 \u043a\u0430\u043a \u043c\u043e\u0436\u043d\u043e \u0441\u043a\u043e\u0440\u0435\u0435"),i=0;i<e.length;i++)
                                                    $(".t_cart").each(function(){
                                                        $(this).find(".a_del_pro").each(function(g){
                                                            if(e[i].id_pro==$(this).attr("id_pro")){
                                                                for(type="",j=0;j<$(".t_cart:eq(1) tr").length-1;j++)
                                                                    $(".t_cart:eq(1) #s_room_type"+j+" option").each(function(){
                                                                        $(".t_cart:eq(1) #s_room_type"+j).val()==$(this).attr("value")&&(type=$(this).text())
                                                                    });
                                                                $.ajax({
                                                                    url:BASEURL+"/dat-hang/add-cart-detail/",
                                                                    type:"POST",
                                                                    data:{
                                                                        cartid:f,id_pro:e[i].id_pro,
                                                                        manufacture:1==e[i].book_type?$(this).parent().next().find(".i_start_date").val():$(this).parent().next().find(".i_check_date").val(),
                                                                        expiration:1==e[i].book_type?"":$(this).parent().next().find(".i_day_out").val(),
                                                                        book_type:e[i].book_type,
                                                                        number_pro:0==e[i].book_type?$(".i_num_pro:eq("+g+")").val():1==e[i].book_type?$(".i_num_adults_t:eq("+g+")").val():parseInt($(".i_num_room:eq("+g+")").val())+parseInt($(".i_num_adults_h:eq("+g+")").val()),
                                                                        number_kids:1==e[i].book_type?$(".i_num_kids_t:eq("+g+")").val():2==e[i].book_type?$(".i_num_kids_h:eq("+g+")").val():"",number_infants:1==e[i].book_type?$(".i_num_infants_t:eq("+g+")").val():"",
                                                                        price_pro:$(this).prev().prev().find("span").attr("price"),attr_pro:type
                                                                    },
                                                                    success:function(){
                                                                        if(""!=finish){
                                                                            if($(".t_cart:eq(0) tr").length>1&&$.ajax({
                                                                                url:BASEURL+"/dat-hang/sent-mail/",
                                                                                type:"POST",
                                                                                data:{
                                                                                    u_temail:$(".i_mail_cus").val(),
                                                                                    cartid:f,
                                                                                    user_name:$(".i_name_cus").val(),
                                                                                    user_phone:$(".i_phone_cus").val(),
                                                                                    user_address:$(".t_address_cus").val(),
                                                                                    title:"SmilingSun Travel k\xednh g\u1eedi "+$(".i_name_cus").val()+" n\u1ed9i dung tour",
                                                                                    template:"infoTour"
                                                                                }
                                                                            }),
                                                                                $(".t_cart:eq(1) tr").length>1)
                                                                            {
                                                                                for(mail='<html><head><meta charset="utf-8"></head><body><table style="font-family:arial;font-size:14px;line-height:1.6em;background:#7f96c8" border="0" cellspacing="0" cellpadding="0" width="660" align="center"><tbody><tr><td width="660" style="padding:20px 20px 0px 20px"><table border="0" bgcolor="#ffffff" cellspacing="0" cellpadding="0"><tbody><tr><td width="510" style="padding-left:20px;padding-top:20px"><a rel="nofollow" href="http://vietnamcharm.vn/" target="_blank"><img src="http://vietnamcharm.vn/wp-content/themes/twentyfourteen/images/logo.png" height="100" width="auto"></a></td><td width="30" style="padding-top:30px"><a rel="nofollow" href="https://www.facebook.com/pages/Smiling-Sun-Travel/952434568116280" target="_blank"><img src="http://vietnamcharm.vn/wp-content/themes/twentyfourteen/images/FB1.jpg" height="23" width="23"></a></td><td width="30" style="padding-top:30px"><a rel="nofollow" href="https://plus.google.com/?hl=vi" target="_blank"><img src="http://vietnamcharm.vn/wp-content/themes/twentyfourteen/images/GG1.jpg" height="23" width="21"></a></td><td width="40" style="padding-top:30px"><a rel="nofollow" href="https://twitter.com/SmilingSun999" target="_blank"><img src="http://vietnamcharm.vn/wp-content/themes/twentyfourteen/images/TT1.jpg" height="23" width="23"></a></td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table border="0" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0"><tbody><tr><td width="620" style="font-family:arial;font-size:22px;padding:0px 10px;text-transform:uppercase;line-height:1.6em;text-align:center;color:#3a5eaa">th\xf4ng tin \u0111\u1eb7t ph\xf2ng</td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table border="0" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0"><tbody><tr><td width="660" style="padding:0px 10px">\n                                                                                <div style="margin:14px 0 14px 0">Ch\xe0o <b>'+$(".i_name_cus").val()+'</b>,</div><div style="margin:14px 0 14px 0">Xin c\u1ea3m \u01a1n Qu\xfd Kh\xe1ch \u0111\xe3 l\u1ef1a ch\u1ecdn d\u1ecbch v\u1ee5 c\u1ee7a SmilingSun cho chuy\u1ebfn \u0111i c\u1ee7a m\xecnh.</div>\n                                                                                <div style="margin:14px 0 14px 0">\u0110\u01a1n \u0111\u1eb7t ph\xf2ng c\u1ee7a Qu\xfd Kh\xe1ch \u0111\xe3 \u0111\u01b0\u1ee3c ho\xe0n th\xe0nh. Nh\xe2n vi\xean t\u01b0 v\u1ea5n: <b>Huy Nguy\u1ec5n</b>  s\u1ebd li\xean l\u1ea1c v\u1edbi Qu\xfd Kh\xe1ch trong v\xf2ng 1 gi\u1edd k\u1ec3 t\u1eeb khi \u0111\u01a1n \u0111\u1eb7t ph\xf2ng c\u1ee7a Qu\xfd Kh\xe1ch \u0111\u01b0\u1ee3c g\u1eedi t\u1edbi SmilingSun. <i>Vi\u1ec7c thanh to\xe1n s\u1ebd \u0111\u01b0\u1ee3c ti\u1ebfn h\xe0nh sau khi Qu\xfd Kh\xe1ch nh\u1eadn \u0111\u01b0\u1ee3c x\xe1c nh\u1eadn d\u1ecbch v\u1ee5 t\u1eeb SmilingSun.</i></div>\n                                                                                <div style="margin:14px 0 14px 0">Th\xf4ng tin \u0111\u1eb7t ph\xf2ng c\u1ee7a Qu\xfd kh\xe1ch nh\u01b0 sau:</div></td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table style="font-family:arial;font-size:14px;line-height:2em;background:rgb(229,247,253)" border="0"><tbody><tr><td style="padding:0px 10px"><table><tbody><tr><td width="170">M\xe3 \u0111\u01a1n h\xe0ng:</td>\n                                                                                <td colspan="2"><b>'+f+'</b></td></tr><tr><td>Kh\xe1ch h\xe0ng:</td><td colspan="2">'+$(".i_name_cus").val()+'</td></tr><tr><td>\u0110i\u1ec7n tho\u1ea1i:</td><td colspan="2">'+$(".i_phone_cus").val()+'</td></tr><tr><td>Email:</td><td colspan="2"><a href="mailto:'+$(".i_mail_cus").val()+'" target="_blank">'+$(".i_mail_cus").val()+'</a></td></tr><tr><td>\u0110\u1ecba ch\u1ec9:</td><td colspan="2">'+$(".t_address_cus").val()+'</td></tr><tr><td style="padding-top:20px">Th\xf4ng tin ph\xf2ng:</td></tr><tr><td colspan="2" style="padding:10px 0px">',tb1='<table style="font-family:arial;font-size:14px;border:1px solid rgb(204,204,204);border-collapse:collapse;background:rgb(229,247,253)" class="t_cart"><tbody><tr><th>Stt</th><th>\u1ea2nh s\u1ea3n ph\u1ea9m</th><th>T\xean s\u1ea3n ph\u1ea9m</th><th>Chi ti\u1ebft kh\xe1ch s\u1ea1n</th><th>S\u1ed1 l\u01b0\u1ee3ng ph\xf2ng</th><th>\u0110\u01a1n gi\xe1</th></tr>',i=0;i<$(".t_cart:eq(1) tr").length-1;i++)
                                                                                    $(".t_cart:eq(1) #s_room_type"+i+" option").each(function(){
                                                                                        $(".t_cart:eq(1) #s_room_type"+i).val()==$(this).attr("value")&&(type=$(this).text())
                                                                                    }),
                                                                                        tb1+='<tr><td style="border:1px solid #cccccc;text-align:center">'+(i+1)+'</td><td style="border:1px solid #cccccc;text-align:center"><img style="vertical-align: middle; width: 100px" src="'+$(".t_cart:eq(1) .i_pro:eq("+i+")").attr("src")+'"></td><td style="border:1px solid #cccccc;text-align:center"><span>'+$(".t_cart:eq(1) .s_np:eq("+i+")").text()+'</span></td><td style="border:1px solid #cccccc;text-align:center; width: 200px">Lo\u1ea1i ph\xf2ng: '+type+"<br/>"+(0==$(".t_cart:eq(1) #i_num_adults_h"+i).val()?"":$(".t_cart:eq(1) #i_num_adults_h"+i).val()+" Ng\u01b0\u1eddi l\u1edbn<br>")+(0==$(".t_cart:eq(1) #i_num_kids_h"+i).val()?"":$(".t_cart:eq(1) #i_num_kids_h"+i).val()+" Tr\u1ebb em (d\u01b0\u1edbi 9 tu\u1ed5i)<br>")+(""==$(".t_cart:eq(1) #i_check_date"+i).val()?"":"Ng\xe0y nh\u1eadn ph\xf2ng: "+$(".t_cart:eq(1) #i_check_date"+i).val()+"<br>")+(""==$(".t_cart:eq(1) #i_day_out"+i).val()?"":"Ng\xe0y tr\u1ea3 ph\xf2ng: "+$(".t_cart:eq(1) #i_day_out"+i).val()+"<br>")+'</td><td style="border:1px solid #cccccc;text-align:center">'+$(".t_cart:eq(1) #i_num_room"+i).val()+'</td><td style="border:1px solid #cccccc;text-align:center" class="t_price">'+$(".t_cart:eq(1) .s_price:eq("+i+")").text()+"</td></tr>";
                                                                                tb1+="</tbody></table><center><h3>T\u1ed5ng gi\xe1: "+sep_price2(String(total_pr(0,[],[],c,1)))+" \u0110</h3></center>",mail+=tb1+'</td></tr><tr><td valign="top">Ph\u01b0\u01a1ng th\u1ee9c thanh to\xe1n:</td><td> Nh\xe2n vi\xean SmilingSun s\u1ebd t\u01b0 v\u1ea5n cho Qu\xfd Kh\xe1ch.</td></tr><tr><td valign="top">Ghi ch\xfa:</td><td>M\u1ecdi y\xeau c\u1ea7u s\u1ebd \u0111\u01b0\u1ee3c \u0111\xe1p \u1ee9ng t\xf9y thu\u1ed9c v\xe0o \u0111i\u1ec1u ki\u1ec7n c\u1ee7a kh\xe1ch s\u1ea1n khi nh\u1eadn ph\xf2ng.</td></tr><tr><td valign="top">\u0110i\u1ec1u ki\u1ec7n xu\u1ea5t h\xf3a \u0111\u01a1n:</td><td><div>\u2022  Qu\xfd kh\xe1ch h\xe0ng c\u1ea7n cung c\u1ea5p th\xf4ng tin v\xe0 \u0111\u1ecba ch\u1ec9 xu\u1ea5t h\xf3a \u0111\u01a1n tr\u01b0\u1edbc ho\u1eb7c ngay khi thanh to\xe1n \u0111\u01a1n ph\xf2ng.</div><div>\u2022  SmilingSun s\u1ebd kh\xf4ng th\u1ec3 xu\u1ea5t h\xf3a \u0111\u01a1n n\u1ebfu Qu\xfd kh\xe1ch g\u1eedi th\xf4ng tin ch\u1eadm h\u01a1n th\u1eddi gian tr\xean.</div><div>\u2022  SmilingSun s\u1ebd g\u1eedi h\xf3a \u0111\u01a1n \u0111\u1ebfn Qu\xfd kh\xe1ch trong v\xf2ng m\u1ed9t tu\u1ea7n sau ng\xe0y tr\u1ea3 ph\xf2ng.</div></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table border="0" bgcolor="#ffffff" cellspacing="0" cellpadding="0"><tbody><tr><td width="660" style="padding:0px 10px"><div style="margin:14px 0 14px 0">Nh\xe2n vi\xean t\u01b0 v\u1ea5n: <b>Huy Nguy\u1ec5n</b></div><div style="margin:14px 0 14px 0">\u0110i\u1ec7n tho\u1ea1i b\xe0n: <b>0583.824.423</b><br/>Di \u0111\u1ed9ng: <b>0919512568 - 0903.121.405</b></div><div style="margin:14px 0 14px 0">Email: <b><a href="mailto:info@vietnamcharm.vn" target="_blank">info@vietnamcharm.vn</a></b></div></td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table border="0" bgcolor="#ffffff" cellspacing="0" cellpadding="0"><tbody><tr><td width="660" style="padding:0px 10px 15px 10px">SmilingSun ch\xe2n th\xe0nh c\u1ea3m \u01a1n!</td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table border="0" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td style="width:620px;text-align:center"><a rel="nofollow" href="http://vietnamcharm.vn/" target="_blank"><img width="620" height="auto" src="http://vietnamcharm.vn/wp-content/uploads/2014/09/Huy1.jpg" style="display:block;width:100%;min-width:620px" alt="airporttaxi"></a></td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px 20px 20px"><table border="0" bgcolor="#ffffff" cellspacing="0" cellpadding="0" style="text-align:center;font-style:italic;line-height:1em;font-size:12px"><tbody><tr><td width="660" style="padding:0px 10px"><div style="margin:12px 0 12px 0"><b>C\xf4ng ty TNHH Th\u01b0\u01a1ng M\u1ea1i D\u1ecbch V\u1ee5 Du L\u1ecbch M\u1eb7t Tr\u1eddi C\u01b0\u1eddi</b></div><div style="margin:12px 0 12px 0"><b>VP Nha Trang:</b> 75 Nguy\u1ec5n B\u1ec9nh Khi\xeam, Nha trang, Vi\u1ec7t Nam.</div></td></tr></tbody></table></td></tr></tbody></table></body></html>',
                                                                                    $.ajax({
                                                                                        url:TEMPLATEURL+"/includes/controller/ajax/sent_mail.php",
                                                                                        type:"POST",
                                                                                        data:{
                                                                                            u_nemail:U_MAIL_NAME,
                                                                                            u_femail:U_MAIL,
                                                                                            u_p_femail:CODEC,
                                                                                            u_temail:$(".i_mail_cus").val()+"|"+U_MAIL_TO,
                                                                                            u_remail:U_MAIL_REPLY,
                                                                                            title:"SmilingSun Travel k\xednh g\u1eedi "+$(".i_name_cus").val()+" n\u1ed9i dung \u0111\u1eb7t ph\xf2ng",
                                                                                            body:mail
                                                                                        }
                                                                                    })
                                                                            }
                                                                            $(".d_content_pop, .d_bg_pop").fadeTo(300,0,function(){
                                                                                $(this).remove(),$("body").css("overflow","auto")}),
                                                                                $.ajax({
                                                                                    url:BASEURL+"/dat-hang/del-carts/",
                                                                                    type:"POST",
                                                                                    success:function(){
                                                                                        total_price(a,b,c),
                                                                                            d()
                                                                                    }
                                                                                }),
                                                                                $(".a_tab_pay:eq(0)").hasClass("a_active_pay")||alert(finish)
                                                                        }
                                                                        finish="";
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    })
                                            }
                                        }))
                                }
                            }:{
                                url:BASEURL+"/dat-hang/add-cart-info/",
                                type:"POST",
                                data:{
                                    email:CODEC2,
                                    request:$(".t_req_cus").val(),
                                    payments:$(".f_payments input:checked").val(),
                                    message:$(".t_message_pay").val()
                                },
                                success:function(f){
                                    for(finish=tran("Ch\xfang t\xf4i \u0111\xe3 nh\u1eadn \u0111\u01b0\u1ee3c \u0111\u01a1n h\xe0ng c\u1ee7a b\u1ea1n. Ch\xfang t\xf4i s\u1ebd li\xean h\u1ec7 v\u1edbi b\u1ea1n trong th\u1eddi gian s\u1edbm nh\u1ea5t|We have received your order. We will contact you as soon as possible|\u041c\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043b\u0438 \u0432\u0430\u0448 \u0437\u0430\u043a\u0430\u0437. \u041c\u044b \u0441\u0432\u044f\u0436\u0435\u043c\u0441\u044f \u0441 \u0432\u0430\u043c\u0438 \u043a\u0430\u043a \u043c\u043e\u0436\u043d\u043e \u0441\u043a\u043e\u0440\u0435\u0435"),i=0;i<e.length;i++)$(".t_cart").each(function(){
                                        $(this).find(".a_del_pro").each(function(g){
                                            if(e[i].id_pro==$(this).attr("id_pro"))
                                            {
                                                for(type="",j=0;j<$(".t_cart:eq(1) tr").length-1;j++)
                                                    $(".t_cart:eq(1) #s_room_type"+j+" option").each(function(){
                                                        $(".t_cart:eq(1) #s_room_type"+j).val()==$(this).attr("value")&&(type=$(this).text())
                                                    });
                                                $.ajax({
                                                    url:BASEURL+"/dat-hang/add-cart-detail/",
                                                    type:"POST",
                                                    data:{
                                                        cartid:f,
                                                        id_pro:e[i].id_pro,
                                                        manufacture:1==e[i].book_type?$(this).parent().next().find(".i_start_date").val():$(this).parent().next().find(".i_check_date").val(),
                                                        expiration:1==e[i].book_type?"":$(this).parent().next().find(".i_day_out").val(),
                                                        book_type:e[i].book_type,
                                                        number_pro:0==e[i].book_type?$(".i_num_pro:eq("+g+")").val():1==e[i].book_type?$(".i_num_adults_t:eq("+g+")").val():parseInt($(".i_num_room:eq("+g+")").val())+parseInt($(".i_num_adults_h:eq("+g+")").val()),
                                                        number_kids:1==e[i].book_type?$(".i_num_kids_t:eq("+g+")").val():2==e[i].book_type?$(".i_num_kids_h:eq("+g+")").val():"",
                                                        number_infants:1==e[i].book_type?$(".i_num_infants_t:eq("+g+")").val():"",
                                                        price_pro:$(this).prev().prev().find("span").attr("price"),
                                                        attr_pro:type
                                                    },
                                                    success:function(){
                                                        if(""!=finish){
                                                            if($(".t_cart:eq(0) tr").length>1&&$.ajax({
                                                                url:BASEURL+"/dat-hang/sent-mail/",
                                                                type:"POST",
                                                                data:{
                                                                    u_temail:CODEC2,
                                                                    cartid:f,
                                                                    user_name:$(".i_name_cus").val(),
                                                                    user_phone:$(".i_phone_cus").val(),
                                                                    user_address:$(".t_address_cus").val(),
                                                                    title:"SmilingSun Travel k\xednh g\u1eedi "+$(".i_name_cus").val()+" n\u1ed9i dung tour",
                                                                    template:"infoTour"
                                                                }
                                                            }),
                                                                $(".t_cart:eq(1) tr").length>1){
                                                                for(mail='<html><head><meta charset="utf-8"></head><body><table style="font-family:arial;font-size:14px;line-height:1.6em;background:#7f96c8" border="0" cellspacing="0" cellpadding="0" width="660" align="center"><tbody><tr><td width="660" style="padding:20px 20px 0px 20px"><table border="0" bgcolor="#ffffff" cellspacing="0" cellpadding="0"><tbody><tr><td width="510" style="padding-left:20px;padding-top:20px"><a rel="nofollow" href="http://vietnamcharm.vn/" target="_blank"><img src="http://vietnamcharm.vn/wp-content/themes/twentyfourteen/images/logo.png" height="100" width="auto"></a></td><td width="30" style="padding-top:30px"><a rel="nofollow" href="https://www.facebook.com/pages/Smiling-Sun-Travel/952434568116280" target="_blank"><img src="http://vietnamcharm.vn/wp-content/themes/twentyfourteen/images/FB1.jpg" height="23" width="23"></a></td><td width="30" style="padding-top:30px"><a rel="nofollow" href="https://plus.google.com/?hl=vi" target="_blank"><img src="http://vietnamcharm.vn/wp-content/themes/twentyfourteen/images/GG1.jpg" height="23" width="21"></a></td><td width="40" style="padding-top:30px"><a rel="nofollow" href="https://twitter.com/SmilingSun999" target="_blank"><img src="http://vietnamcharm.vn/wp-content/themes/twentyfourteen/images/TT1.jpg" height="23" width="23"></a></td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table border="0" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0"><tbody><tr><td width="620" style="font-family:arial;font-size:22px;padding:0px 10px;text-transform:uppercase;line-height:1.6em;text-align:center;color:#3a5eaa">th\xf4ng tin \u0111\u1eb7t ph\xf2ng</td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table border="0" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0"><tbody><tr><td width="660" style="padding:0px 10px">\n                                                                        <div style="margin:14px 0 14px 0">Ch\xe0o <b>'+$(".i_name_cus").val()+'</b>,</div><div style="margin:14px 0 14px 0">Xin c\u1ea3m \u01a1n Qu\xfd Kh\xe1ch \u0111\xe3 l\u1ef1a ch\u1ecdn d\u1ecbch v\u1ee5 c\u1ee7a SmilingSun cho chuy\u1ebfn \u0111i c\u1ee7a m\xecnh.</div>\n                                                                        <div style="margin:14px 0 14px 0">\u0110\u01a1n \u0111\u1eb7t ph\xf2ng c\u1ee7a Qu\xfd Kh\xe1ch \u0111\xe3 \u0111\u01b0\u1ee3c ho\xe0n th\xe0nh. Nh\xe2n vi\xean t\u01b0 v\u1ea5n: <b>Huy Nguy\u1ec5n</b>  s\u1ebd li\xean l\u1ea1c v\u1edbi Qu\xfd Kh\xe1ch trong v\xf2ng 1 gi\u1edd k\u1ec3 t\u1eeb khi \u0111\u01a1n \u0111\u1eb7t ph\xf2ng c\u1ee7a Qu\xfd Kh\xe1ch \u0111\u01b0\u1ee3c g\u1eedi t\u1edbi SmilingSun. <i>Vi\u1ec7c thanh to\xe1n s\u1ebd \u0111\u01b0\u1ee3c ti\u1ebfn h\xe0nh sau khi Qu\xfd Kh\xe1ch nh\u1eadn \u0111\u01b0\u1ee3c x\xe1c nh\u1eadn d\u1ecbch v\u1ee5 t\u1eeb SmilingSun.</i></div>\n                                                                        <div style="margin:14px 0 14px 0">Th\xf4ng tin \u0111\u1eb7t ph\xf2ng c\u1ee7a Qu\xfd kh\xe1ch nh\u01b0 sau:</div></td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table style="font-family:arial;font-size:14px;line-height:2em;background:rgb(229,247,253)" border="0"><tbody><tr><td style="padding:0px 10px"><table><tbody><tr><td width="170">M\xe3 \u0111\u01a1n h\xe0ng:</td>\n                                                                        <td colspan="2"><b>'+f+'</b></td></tr><tr><td>Kh\xe1ch h\xe0ng:</td><td colspan="2">'+$(".i_name_cus").val()+'</td></tr><tr><td>\u0110i\u1ec7n tho\u1ea1i:</td><td colspan="2">'+$(".i_phone_cus").val()+'</td></tr><tr><td>Email:</td><td colspan="2"><a href="mailto:'+$(".i_mail_cus").val()+'" target="_blank">'+$(".i_mail_cus").val()+'</a></td></tr><tr><td>\u0110\u1ecba ch\u1ec9:</td><td colspan="2">'+$(".t_address_cus").val()+'</td></tr><tr><td style="padding-top:20px">Th\xf4ng tin ph\xf2ng:</td></tr><tr><td colspan="2" style="padding:10px 0px">',tb1='<table style="font-family:arial;font-size:14px;border:1px solid rgb(204,204,204);border-collapse:collapse;background:rgb(229,247,253)" class="t_cart"><tbody><tr><th>Stt</th><th>\u1ea2nh s\u1ea3n ph\u1ea9m</th><th>T\xean s\u1ea3n ph\u1ea9m</th><th>Chi ti\u1ebft kh\xe1ch s\u1ea1n</th><th>S\u1ed1 l\u01b0\u1ee3ng ph\xf2ng</th><th>\u0110\u01a1n gi\xe1</th></tr>',i=0;i<$(".t_cart:eq(1) tr").length-1;i++)
                                                                    $(".t_cart:eq(1) #s_room_type"+i+" option").each(function(){
                                                                        $(".t_cart:eq(1) #s_room_type"+i).val()==$(this).attr("value")&&(type=$(this).text())
                                                                    }),
                                                                        tb1+='<tr><td style="border:1px solid #cccccc;text-align:center">'+(i+1)+'</td><td style="border:1px solid #cccccc;text-align:center"><img style="vertical-align: middle; width: 100px" src="'+$(".t_cart:eq(1) .i_pro:eq("+i+")").attr("src")+'"></td><td style="border:1px solid #cccccc;text-align:center"><span>'+$(".t_cart:eq(1) .s_np:eq("+i+")").text()+'</span></td><td style="border:1px solid #cccccc;text-align:center; width: 200px">Lo\u1ea1i ph\xf2ng: '+type+"<br/>"+(0==$(".t_cart:eq(1) #i_num_adults_h"+i).val()?"":$(".t_cart:eq(1) #i_num_adults_h"+i).val()+" Ng\u01b0\u1eddi l\u1edbn<br>")+(0==$(".t_cart:eq(1) #i_num_kids_h"+i).val()?"":$(".t_cart:eq(1) #i_num_kids_h"+i).val()+" Tr\u1ebb em (d\u01b0\u1edbi 9 tu\u1ed5i)<br>")+(""==$(".t_cart:eq(1) #i_check_date"+i).val()?"":"Ng\xe0y nh\u1eadn ph\xf2ng: "+$(".t_cart:eq(1) #i_check_date"+i).val()+"<br>")+(""==$(".t_cart:eq(1) #i_day_out"+i).val()?"":"Ng\xe0y tr\u1ea3 ph\xf2ng: "+$(".t_cart:eq(1) #i_day_out"+i).val()+"<br>")+'</td><td style="border:1px solid #cccccc;text-align:center">'+$(".t_cart:eq(1) #i_num_room"+i).val()+'</td><td style="border:1px solid #cccccc;text-align:center" class="t_price">'+$(".t_cart:eq(1) .s_price:eq("+i+")").text()+"</td></tr>";
                                                                tb1+="</tbody></table><center><h3>T\u1ed5ng gi\xe1: "+sep_price2(String(total_pr(0,[],[],c,1)))+" \u0110</h3></center>",mail+=tb1+'</td></tr><tr><td valign="top">Ph\u01b0\u01a1ng th\u1ee9c thanh to\xe1n:</td><td> Nh\xe2n vi\xean SmilingSun s\u1ebd t\u01b0 v\u1ea5n cho Qu\xfd Kh\xe1ch.</td></tr><tr><td valign="top">Ghi ch\xfa:</td><td>M\u1ecdi y\xeau c\u1ea7u s\u1ebd \u0111\u01b0\u1ee3c \u0111\xe1p \u1ee9ng t\xf9y thu\u1ed9c v\xe0o \u0111i\u1ec1u ki\u1ec7n c\u1ee7a kh\xe1ch s\u1ea1n khi nh\u1eadn ph\xf2ng.</td></tr><tr><td valign="top">\u0110i\u1ec1u ki\u1ec7n xu\u1ea5t h\xf3a \u0111\u01a1n:</td><td><div>\u2022  Qu\xfd kh\xe1ch h\xe0ng c\u1ea7n cung c\u1ea5p th\xf4ng tin v\xe0 \u0111\u1ecba ch\u1ec9 xu\u1ea5t h\xf3a \u0111\u01a1n tr\u01b0\u1edbc ho\u1eb7c ngay khi thanh to\xe1n \u0111\u01a1n ph\xf2ng.</div><div>\u2022  SmilingSun s\u1ebd kh\xf4ng th\u1ec3 xu\u1ea5t h\xf3a \u0111\u01a1n n\u1ebfu Qu\xfd kh\xe1ch g\u1eedi th\xf4ng tin ch\u1eadm h\u01a1n th\u1eddi gian tr\xean.</div><div>\u2022  SmilingSun s\u1ebd g\u1eedi h\xf3a \u0111\u01a1n \u0111\u1ebfn Qu\xfd kh\xe1ch trong v\xf2ng m\u1ed9t tu\u1ea7n sau ng\xe0y tr\u1ea3 ph\xf2ng.</div></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table border="0" bgcolor="#ffffff" cellspacing="0" cellpadding="0"><tbody><tr><td width="660" style="padding:0px 10px"><div style="margin:14px 0 14px 0">Nh\xe2n vi\xean t\u01b0 v\u1ea5n: <b>Huy Nguy\u1ec5n</b></div><div style="margin:14px 0 14px 0">\u0110i\u1ec7n tho\u1ea1i b\xe0n: <b>0583.824.423</b><br/>Di \u0111\u1ed9ng: <b>0919512568 - 0903.121.405</b></div><div style="margin:14px 0 14px 0">Email: <b><a href="mailto:info@vietnamcharm.vn" target="_blank">info@vietnamcharm.vn</a></b></div></td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table border="0" bgcolor="#ffffff" cellspacing="0" cellpadding="0"><tbody><tr><td width="660" style="padding:0px 10px 15px 10px">SmilingSun ch\xe2n th\xe0nh c\u1ea3m \u01a1n!</td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px"><table border="0" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td style="width:620px;text-align:center"><a rel="nofollow" href="http://vietnamcharm.vn/" target="_blank"><img width="620" height="auto" src="http://vietnamcharm.vn/wp-content/uploads/2014/09/Huy1.jpg" style="display:block;width:100%;min-width:620px" alt="airporttaxi"></a></td></tr></tbody></table></td></tr><tr><td width="660" style="padding:0px 20px 20px 20px"><table border="0" bgcolor="#ffffff" cellspacing="0" cellpadding="0" style="text-align:center;font-style:italic;line-height:1em;font-size:12px"><tbody><tr><td width="660" style="padding:0px 10px"><div style="margin:12px 0 12px 0"><b>C\xf4ng ty TNHH Th\u01b0\u01a1ng M\u1ea1i D\u1ecbch V\u1ee5 Du L\u1ecbch M\u1eb7t Tr\u1eddi C\u01b0\u1eddi</b></div><div style="margin:12px 0 12px 0"><b>VP Nha Trang:</b> 75 Nguy\u1ec5n B\u1ec9nh Khi\xeam, Nha trang, Vi\u1ec7t Nam.</div></td></tr></tbody></table></td></tr></tbody></table></body></html>',
                                                                    $.ajax({
                                                                        url:TEMPLATEURL+"/includes/controller/ajax/sent_mail.php",
                                                                        type:"POST",
                                                                        data:{
                                                                            u_nemail:U_MAIL_NAME,
                                                                            u_femail:U_MAIL,
                                                                            u_p_femail:CODEC,
                                                                            u_temail:$(".i_mail_cus").val()+"|"+U_MAIL_TO,
                                                                            u_rmail:U_MAIL_REPLY,
                                                                            title:"SmilingSun Travel k\xednh g\u1eedi "+$(".i_name_cus").val()+" n\u1ed9i dung \u0111\u1eb7t ph\xf2ng",
                                                                            body:mail
                                                                        }
                                                                    })
                                                            };
                                                            $(".d_content_pop, .d_bg_pop").fadeTo(300,0,function(){
                                                                $(this).remove(),$("body").css("overflow","auto")
                                                            }),
                                                                $.ajax({
                                                                    url:BASEURL+"/dat-hang/del-carts/",
                                                                    type:"POST",success:function(){var dem_tab_num, time_tab = Array(), a_auto = Array(), auto = Array(), num_auto=0;
                                                                        total_price(a,b,c),d()
                                                                    }
                                                                }),
                                                                $(".a_tab_pay:eq(0)").hasClass("a_active_pay")||alert(finish)}finish=""
                                                    }
                                                })
                                            }
                                        })
                                    })
                                }
                            })
                        }
                    })
            }
        }),
        $(".a_del_pro").live("click",function(){
            obj=$(this),
                $.ajax({
                    url:BASEURL+"/dat-hang/del-cart/",
                    type:"POST",
                    data:{id_pro:obj.attr("id_pro")},
                    success:function(){
                        obj.parent().parent().remove(),total_price(a,b,c),d()
                    }
                })
        }),
        $(".d_pay2 input").live("click",function(){
            $(".t_message_pay").val(tran("\u0110\xc3 CHUY\u1ec2N|TRANSFERED|\u041f\u0415\u0420\u0415\u0412\u041e\u0414")+" "+$(".s_total2").text()+" \u0110\u1ebeN "+$(this).parent().find("span").text())
        }),
        $(".d_pay1 input:eq(0)").live("click",function(){
            $(".d_nl").css("display","none"),
                $(".d_pp").css("display","block"),
                $(".t_message_pay").val(""),
                $(".d_nl input").each(function(){
                    $(this).attr("checked","")
                })
        }),
        $(".d_pay1 input:eq(1)").live("click",function(){
            $(".d_pp").css("display","none"),
                $(".d_nl").css("display","block"),
                $(".t_message_pay").val(""),
                $(".d_pp input").each(function(){
                    $(this).attr("checked","")
                }),
                $(".f_payment4").remove(),
                $(".a_payment6").attr("class","a_payment4").removeClass(".a_payment6")
        }),
        $(".d_pay1 input:eq(2), .d_pay1 input:eq(3)").live("click",function(){
            $(".t_message_pay").val(tran("\u0110\xc3 CHUY\u1ec2N|TRANSFERED|\u041f\u0415\u0420\u0415\u0412\u041e\u0414")+" "+$(this).parent().text()+" "+tran("\u0111\u1ebfn t\xe0i kho\u1ea3n Ng\xe2n l\u01b0\u1ee3ng|to Ngan luong account|\u043d\u0430 \u0441\u0447\u0435\u0442 Ngan Luong")),
                $(".f_payment4").remove(),
                $(".a_payment6").attr("class","a_payment4")
        }),
        $(".d_pay1 input:eq(4), .d_pay1 input:eq(5)").live("click",function(){
            $(".t_message_pay").val(tran("\u0110\xc3 CHUY\u1ec2N|TRANSFERED|\u041f\u0415\u0420\u0415\u0412\u041e\u0414")+" "+$(this).parent().find("span").text()+" "+tran("\u0111\u1ebfn t\xe0i kho\u1ea3n Paypal|to Paypal account|\u043d\u0430 \u0441\u0447\u0435\u0442 Paypal"));
            var a="";
            $(".t_cart").each(function(){
                for(t=1;t<$(this).find("tr").length;t++)a+=t+". "+$(this).find("tr:eq("+i+") td:eq(2) .s_np").text()+". "}),1==$(".d_content_pop").attr("time")&&($(".a_payment4").addClass("a_payment5").removeClass("a_payment4").text(tran("Vui l\xf2ng ch\u1edd ...|Please wait ...|\u041f\u043e\u0434\u043e\u0436\u0434\u0438\u0442\u0435 ...")),
                $(".a_back2").remove(),
                $.ajax({
                    url:BASEURL+"/dat-hang/get-cart/",
                    type:"POST",
                    dataType:"json",
                    success:function(b){
                        $.ajax(""==CODEC2?{
                            url:BASEURL+"/dat-hang/get-user-by-mail/",
                            type:"POST",
                            data:{email:$(".i_mail_cus").val()},
                            success:function(c){
                                return""==c?void $.ajax({
                                    url:BASEURL+"/dat-hang/add-user/",
                                    type:"POST",
                                    data:{
                                        user_email:$(".i_mail_cus").val(),
                                        user_name:$(".i_name_cus").val(),
                                        user_phone:$(".i_phone_cus").val(),
                                        user_address:$(".t_address_cus").val(),security:$("body").attr("security")
                                    },
                                    success:function(c){
                                        CODEC2=c,
                                            $.ajax({
                                                url:BASEURL+"/dat-hang/sent-mail/",
                                                type:"POST",
                                                data:{
                                                    u_tname:$(".i_name_cus").val(),
                                                    u_temail:$(".i_mail_cus").val(),
                                                    title:"\u0110\u1eb7t m\u1eadt kh\u1ea9u cho t\xe0i kho\u1ea3n c\u1ee7a b\u1ea1n t\u1ea1i SmilingSun",
                                                    template:"createPassword"
                                                }
                                            }),
                                            $.ajax({
                                                url:BASEURL+"/dat-hang/add-cart-info/",
                                                type:"POST",
                                                data:{
                                                    email:$(".i_mail_cus").val(),
                                                    request:$(".t_req_cus").val(),
                                                    payments:$(".f_payments input:checked").val(),
                                                    message:$(".t_message_pay").val()
                                                },
                                                success:function(c){
                                                    for(finish=tran("Ch\xfang t\xf4i \u0111\xe3 nh\u1eadn \u0111\u01b0\u1ee3c \u0111\u01a1n h\xe0ng c\u1ee7a b\u1ea1n. Ch\xfang t\xf4i s\u1ebd li\xean h\u1ec7 v\u1edbi b\u1ea1n trong th\u1eddi gian s\u1edbm nh\u1ea5t|We have received your order. We will contact you as soon as possible|\u041c\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043b\u0438 \u0432\u0430\u0448 \u0437\u0430\u043a\u0430\u0437. \u041c\u044b \u0441\u0432\u044f\u0436\u0435\u043c\u0441\u044f \u0441 \u0432\u0430\u043c\u0438 \u043a\u0430\u043a \u043c\u043e\u0436\u043d\u043e \u0441\u043a\u043e\u0440\u0435\u0435"),i=0;i<b.length;i++)$(".t_cart").each(function(){
                                                        $(this).find(".a_del_pro").each(function(d){
                                                            if(b[i].id_pro==$(this).attr("id_pro"))
                                                            {
                                                                for(type="",j=0;j<$(".t_cart:eq(1) tr").length-1;j++)$(".t_cart:eq(1) #s_room_type"+j+" option").each(function(){
                                                                    $(".t_cart:eq(1) #s_room_type"+j).val()==$(this).attr("value")&&(type=$(this).text())
                                                                });
                                                                $.ajax({
                                                                    url:BASEURL+"/dat-hang/add-cart-detail/",
                                                                    type:"POST",
                                                                    dataType:"json",
                                                                    data:{
                                                                        cartid:c,id_pro:b[i].id_pro,
                                                                        manufacture:1==b[i].book_type?$(this).parent().next().find(".i_start_date").val():$(this).parent().next().find(".i_check_date").val(),
                                                                        expiration:1==b[i].book_type?"":$(this).parent().next().find(".i_day_out").val(),
                                                                        book_type:b[i].book_type,
                                                                        number_pro:0==b[i].book_type?$(".i_num_pro:eq("+d+")").val():1==b[i].book_type?$(".i_num_adults_t:eq("+d+")").val():parseInt($(".i_num_room:eq("+d+")").val())+parseInt($(".i_num_adults_h:eq("+d+")").val()),
                                                                        number_kids:1==b[i].book_type?$(".i_num_kids_t:eq("+d+")").val():2==b[i].book_type?$(".i_num_kids_h:eq("+d+")").val():"",number_infants:1==b[i].book_type?$(".i_num_infants_t:eq("+d+")").val():"",
                                                                        price_pro:$(this).prev().prev().find("span").attr("price"),
                                                                        attr_pro:type
                                                                    },
                                                                    success:function(){
                                                                        $(".f_payment4").remove(),
                                                                            $(".a_payment5").attr("class","a_payment4"),
                                                                                $(".d_pp input:checked").val()==$(".d_pay1 input:eq(4)").val()?$(".a_payment4").before('<form class="f_payment4" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="smilingsuntravel.999@gmail.com"><input type="hidden" name="lc" value="EN"><input type="hidden" name="item_name" value="'+("en"==lang?a:"Products")+'"><input type="hidden" name="item_number" value="1"><input type="hidden" name="amount" value="'+$(".d_pp input:checked").val()+'"><input type="hidden" name="currency_code" value="USD"><input type="hidden" name="button_subtype" value="services"><input type="hidden" name="no_note" value="0"><input type="hidden" name="bn" value="PP-BuyNowBF:btn_paynowCC_LG.gif:NonHostedGuest"><input class="i_payment4" style="margin-left: -43px" type="image" border="0" name="submit" alt="'+tran("\u0110\u1ed3ng \xfd|Confirm|\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435")+'"></form>').attr("class","a_payment6"):$(".a_payment4").before('<form class="f_payment4" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="smilingsuntravel.999@gmail.com"><input type="hidden" name="lc" value="RU"><input type="hidden" name="item_name" value="'+("en"==lang?a:"Products")+'"><input type="hidden" name="item_number" value="1"><input type="hidden" name="amount" value="'+$(".d_pp input:checked").val()+'"><input type="hidden" name="currency_code" value="RUB"><input type="hidden" name="button_subtype" value="services"><input type="hidden" name="no_note" value="0"><input type="hidden" name="bn" button="PP-BuyNowBF:btn_paynowCC_LG.gif:NonHostedGuest"><input class="i_payment4" style="margin-left: -43px" type="image" border="0" name="submit" alt="'+tran("\u0110\u1ed3ng \xfd|Confirm|\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435")+'"></form>').attr("class","a_payment6")
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    })
                                                }
                                            })
                                    }
                                }):(CODEC2=c[0].ID,void $.ajax({
                                    url:BASEURL+"/dat-hang/add-cart-info/",
                                    type:"POST",
                                    data:{
                                        email:$(".i_mail_cus").val(),
                                        request:$(".t_req_cus").val(),
                                        payments:$(".f_payments input:checked").val(),
                                        message:$(".t_message_pay").val()
                                    },
                                    success:function(c){
                                        for(finish=tran("Ch\xfang t\xf4i \u0111\xe3 nh\u1eadn \u0111\u01b0\u1ee3c \u0111\u01a1n h\xe0ng c\u1ee7a b\u1ea1n. Ch\xfang t\xf4i s\u1ebd li\xean h\u1ec7 v\u1edbi b\u1ea1n trong th\u1eddi gian s\u1edbm nh\u1ea5t|We have received your order. We will contact you as soon as possible|\u041c\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043b\u0438 \u0432\u0430\u0448 \u0437\u0430\u043a\u0430\u0437. \u041c\u044b \u0441\u0432\u044f\u0436\u0435\u043c\u0441\u044f \u0441 \u0432\u0430\u043c\u0438 \u043a\u0430\u043a \u043c\u043e\u0436\u043d\u043e \u0441\u043a\u043e\u0440\u0435\u0435"),i=0;i<b.length;i++)
                                            $(".t_cart").each(function(){
                                                $(this).find(".a_del_pro").each(function(d){
                                                    if(b[i].id_pro==$(this).attr("id_pro")){
                                                        for(type="",j=0;j<$(".t_cart:eq(1) tr").length-1;j++)
                                                            $(".t_cart:eq(1) #s_room_type"+j+" option").each(function(){
                                                                $(".t_cart:eq(1) #s_room_type"+j).val()==$(this).attr("value")&&(type=$(this).text())
                                                            });
                                                        $.ajax({
                                                            url:BASEURL+"/dat-hang/add-cart-detail/",
                                                            type:"POST",
                                                            dataType:"json",
                                                            data:{
                                                                cartid:c,id_pro:b[i].id_pro,
                                                                manufacture:1==b[i].book_type?$(this).parent().next().find(".i_start_date").val():$(this).parent().next().find(".i_check_date").val(),
                                                                expiration:1==b[i].book_type?"":$(this).parent().next().find(".i_day_out").val(),
                                                                book_type:b[i].book_type,
                                                                number_pro:0==b[i].book_type?$(".i_num_pro:eq("+d+")").val():1==b[i].book_type?$(".i_num_adults_t:eq("+d+")").val():parseInt($(".i_num_room:eq("+d+")").val())+parseInt($(".i_num_adults_h:eq("+d+")").val()),
                                                                number_kids:1==b[i].book_type?$(".i_num_kids_t:eq("+d+")").val():2==b[i].book_type?$(".i_num_kids_h:eq("+d+")").val():"",
                                                                number_infants:1==b[i].book_type?$(".i_num_infants_t:eq("+d+")").val():"",
                                                                price_pro:$(this).prev().prev().find("span").attr("price"),attr_pro:type},
                                                            success:function(){
                                                                $(".f_payment4").remove(),
                                                                    $(".a_payment5").attr("class","a_payment4"),$(".d_pp input:checked").val()==$(".d_pay1 input:eq(4)").val()?$(".a_payment4").before('<form class="f_payment4" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="smilingsuntravel.999@gmail.com"><input type="hidden" name="lc" value="EN"><input type="hidden" name="item_name" value="'+("en"==lang?a:"Products")+'"><input type="hidden" name="item_number" value="1"><input type="hidden" name="amount" value="'+$(".d_pp input:checked").val()+'"><input type="hidden" name="currency_code" value="USD"><input type="hidden" name="button_subtype" value="services"><input type="hidden" name="no_note" value="0"><input type="hidden" name="bn" value="PP-BuyNowBF:btn_paynowCC_LG.gif:NonHostedGuest"><input class="i_payment4" style="margin-left: -43px" type="image" border="0" name="submit" alt="'+tran("\u0110\u1ed3ng \xfd|Confirm|\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435")+'"></form>').attr("class","a_payment6"):$(".a_payment4").before('<form class="f_payment4" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="smilingsuntravel.999@gmail.com"><input type="hidden" name="lc" value="RU"><input type="hidden" name="item_name" value="'+("en"==lang?a:"Products")+'"><input type="hidden" name="item_number" value="1"><input type="hidden" name="amount" value="'+$(".d_pp input:checked").val()+'"><input type="hidden" name="currency_code" value="RUB"><input type="hidden" name="button_subtype" value="services"><input type="hidden" name="no_note" value="0"><input type="hidden" name="bn" button="PP-BuyNowBF:btn_paynowCC_LG.gif:NonHostedGuest"><input class="i_payment4" style="margin-left: -43px" type="image" border="0" name="submit" alt="'+tran("\u0110\u1ed3ng \xfd|Confirm|\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435")+'"></form>').attr("class","a_payment6")
                                                            }
                                                        })
                                                    }
                                                })
                                            })
                                    }
                                }))
                            }
                        }:{
                            url:BASEURL+"/dat-hang/add-cart-info/",
                            type:"POST",
                            data:{
                                email:$(".i_mail_cus").val(),
                                request:$(".t_req_cus").val(),
                                payments:$(".f_payments input:checked").val(),
                                message:$(".t_message_pay").val()
                            },
                            success:function(c){
                                for(finish=tran("Ch\xfang t\xf4i \u0111\xe3 nh\u1eadn \u0111\u01b0\u1ee3c \u0111\u01a1n h\xe0ng c\u1ee7a b\u1ea1n. Ch\xfang t\xf4i s\u1ebd li\xean h\u1ec7 v\u1edbi b\u1ea1n trong th\u1eddi gian s\u1edbm nh\u1ea5t|We have received your order. We will contact you as soon as possible|\u041c\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043b\u0438 \u0432\u0430\u0448 \u0437\u0430\u043a\u0430\u0437. \u041c\u044b \u0441\u0432\u044f\u0436\u0435\u043c\u0441\u044f \u0441 \u0432\u0430\u043c\u0438 \u043a\u0430\u043a \u043c\u043e\u0436\u043d\u043e \u0441\u043a\u043e\u0440\u0435\u0435"),i=0;i<b.length;i++)
                                    $(".t_cart").each(function(){
                                        $(this).find(".a_del_pro").each(function(d){
                                            if(b[i].id_pro==$(this).attr("id_pro")){
                                                for(type="",j=0;j<$(".t_cart:eq(1) tr").length-1;j++)
                                                    $(".t_cart:eq(1) #s_room_type"+j+" option").each(function(){
                                                        $(".t_cart:eq(1) #s_room_type"+j).val()==$(this).attr("value")&&(type=$(this).text())
                                                    });
                                                $.ajax({
                                                    url:BASEURL+"/dat-hang/add-cart-detail/",
                                                    type:"POST",
                                                    dataType:"json",
                                                    data:{
                                                        cartid:c,
                                                        id_pro:b[i].id_pro,
                                                        manufacture:1==b[i].book_type?$(this).parent().next().find(".i_start_date").val():$(this).parent().next().find(".i_check_date").val(),
                                                        expiration:1==b[i].book_type?"":$(this).parent().next().find(".i_day_out").val(),
                                                        book_type:b[i].book_type,
                                                        number_pro:0==b[i].book_type?$(".i_num_pro:eq("+d+")").val():1==b[i].book_type?$(".i_num_adults_t:eq("+d+")").val():parseInt($(".i_num_room:eq("+d+")").val())+parseInt($(".i_num_adults_h:eq("+d+")").val()),number_kids:1==b[i].book_type?$(".i_num_kids_t:eq("+d+")").val():2==b[i].book_type?$(".i_num_kids_h:eq("+d+")").val():"",
                                                        number_infants:1==b[i].book_type?$(".i_num_infants_t:eq("+d+")").val():"",
                                                        price_pro:$(this).prev().prev().find("span").attr("price"),
                                                        attr_pro:type
                                                    },
                                                    success:function(){
                                                        $(".f_payment4").remove(),
                                                            $(".a_payment5").attr("class","a_payment4"),
                                                                $(".d_pp input:checked").val()==$(".d_pay1 input:eq(4)").val()?$(".a_payment4").before('<form class="f_payment4" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="smilingsuntravel.999@gmail.com"><input type="hidden" name="lc" value="EN"><input type="hidden" name="item_name" value="'+("en"==lang?a:"Products")+'"><input type="hidden" name="item_number" value="1"><input type="hidden" name="amount" value="'+$(".d_pp input:checked").val()+'"><input type="hidden" name="currency_code" value="USD"><input type="hidden" name="button_subtype" value="services"><input type="hidden" name="no_note" value="0"><input type="hidden" name="bn" value="PP-BuyNowBF:btn_paynowCC_LG.gif:NonHostedGuest"><input class="i_payment4" style="margin-left: -43px" type="image" border="0" name="submit" alt="'+tran("\u0110\u1ed3ng \xfd|Confirm|\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435")+'"></form>').attr("class","a_payment6"):$(".a_payment4").before('<form class="f_payment4" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="smilingsuntravel.999@gmail.com"><input type="hidden" name="lc" value="RU"><input type="hidden" name="item_name" value="'+("en"==lang?a:"Products")+'"><input type="hidden" name="item_number" value="1"><input type="hidden" name="amount" value="'+$(".d_pp input:checked").val()+'"><input type="hidden" name="currency_code" value="RUB"><input type="hidden" name="button_subtype" value="services"><input type="hidden" name="no_note" value="0"><input type="hidden" name="bn" button="PP-BuyNowBF:btn_paynowCC_LG.gif:NonHostedGuest"><input class="i_payment4" style="margin-left: -43px" type="image" border="0" name="submit" alt="'+tran("\u0110\u1ed3ng \xfd|Confirm|\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435")+'"></form>').attr("class","a_payment6")
                                                    }
                                                })
                                            }
                                        })
                                    })
                            }
                        })
                    }
                }))
        })
}

function changePrice(a,b,c,d)
{
    $(".s_price span:not(.t_cart .s_price span)").each(function(){
        $(this).text(Math.round(Math.ceil($(this).attr("price")/a.attr("price")*100)/100))
    }),
        $(".t_cart").each(function(){
            $(this).find(".s_price span").each(function(){
                $(this).text(Math.ceil($(this).attr("price")/a.attr("price")*100)/100)
            })
        }),
        $(".s_price a").text(a.attr("prices")),
        $(".a_active_price").removeClass("a_active_price"),
        a.addClass("a_active_price"),
        total_price(b,c,d),
        sep_price($(".s_price a span"));
}

function total_price(a,b,c){
    if(total=0,t=0,a.length>0)
    {
        for(i=0;i<$(".t_cart:eq("+t+") td .s_price").length;i++)
            total+=$(".t_cart:eq("+t+") td .s_price:eq("+i+") span").attr("price")*$(".i_num_pro:eq("+i+")").val();t++
    }
    if(b.length>0)
    {
        for(i=0;i<$(".t_cart:eq("+t+") td .s_price").length;i++)
            total+=$(".t_cart:eq("+t+") td .s_price:eq("+i+") span").attr("price")*(parseInt($(".i_num_adults_t:eq("+i+")").val())+parseInt($(".i_num_kids_t:eq("+i+")").val()));
        t++
    }
    if(c.length>0)
    {
        for(i=0;i<$(".t_cart:eq("+t+") td .s_price").length;i++)
            $(".t_cart:eq("+t+") td .s_price:eq("+i+") span").attr("price",$(".s_room_type:eq("+i+")").val()),$(".t_cart:eq("+t+") td .s_price:eq("+i+") span").text($(".s_room_type:eq("+i+")").val());
        for(i=0;i<$(".t_cart:eq("+t+") td .s_price").length;i++)
            total+=$(".t_cart:eq("+t+") td .s_price:eq("+i+") span").text()*parseInt($(".i_num_room:eq("+i+")").val())*parseInt($(".i_day_number:eq("+i+")").val());
        t++;
    }
    $(".s_total2").html('<span class="s_tl">'+Math.ceil(100*total)/100+'</span><span class="s_price"> <a>'+$(".s_price:eq(0) > a").text()+"</a></span>"),
        $(".d_pay1 label:eq(2) span").html(total_pr(0,a,b,c)),
        $(".d_pay1 input:eq(2)").val(total_pr(0,a,b,c)),
        $(".d_pay1 label:eq(3) span, .d_pay1 label:eq(4) span").text(Math.ceil(100*total_pr(5,a,b,c))/100+" USD"),
        $(".d_pay1 input:eq(3), .d_pay1 input:eq(4)").val(Math.ceil(100*total_pr(5,a,b,c))/100),
        $(".d_pay1 label:eq(5) span").text(Math.ceil(100*total_pr(6,a,b,c))/100+" RUB"),
        $(".d_pay1 input:eq(5)").val(Math.ceil(100*total_pr(6,a,b,c))/100),
        sep_price($(".s_tl, .d_nl span:eq(0)"))
}

function total_pr(a,b,c,d,e)
{
    if(total=0,e=0!=e&&"undefined"!=typeof e?e:0,b.length>0)
    {
        for(i=0;i<$(".t_cart:eq("+e+") td .s_price").length;i++)
            total+=$(".t_cart:eq("+e+") td .s_price:eq("+i+") span").attr("price")/$(".a_change_price:eq("+a+")").attr("price")*$(".i_num_pro:eq("+i+")").val();e++
    }
    if(c.length>0)
    {
        for(i=0;i<$(".t_cart:eq("+e+") td .s_price").length;i++)
            total+=$(".t_cart:eq("+e+") td .s_price:eq("+i+") span").attr("price")/$(".a_change_price:eq("+a+")").attr("price")*(parseInt($(".i_num_adults_t:eq("+i+")").val())+parseInt($(".i_num_kids_t:eq("+i+")").val()));
        e++;
    }
    if(d.length>0)
    {
        for(i=0;i<$(".t_cart:eq("+e+") td .s_price").length;i++)
            $(".t_cart:eq("+e+") td .s_price:eq("+i+") span").attr("price",$(".s_room_type:eq("+i+")").val()),$(".t_cart:eq("+e+") td .s_price:eq("+i+") span").text($(".s_room_type:eq("+i+")").val());
        for(i=0;i<$(".t_cart:eq("+e+") td .s_price").length;i++)
            total+=$(".t_cart:eq("+e+") td .s_price:eq("+i+") span").attr("price")/$(".a_change_price:eq("+a+")").attr("price")*parseInt($(".i_num_room:eq("+i+")").val())*parseInt($(".i_day_number:eq("+i+")").val());
        e++
    }
    return total;
}

function closePopUp()
{
    $(".d_bg_pop").fadeOut(300,function(){
        $(this).remove()
    }),
        $(".d_content_pop2").fadeOut(300);
}

function createSlug(Text){ return Text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-'); }

function sep_price(a)
{
    var b=new Array,c="",d=1;
    a.each(function(){
        for(c="",d=1,b=$(this).text().substr(0, a.indexOf('.')).slice(),i=b.length-1;i>=0;i--)
            c=3==d||6==d||9==d||12==d?0==i?b[i]+c:"."+b[i]+c:b[i]+c,d++;
        $(this).text(c)
    })
}

function sep_price2(a)
{
    var b=new Array,c="",d=1;
    for(c="",d=1,b=a.substr(0, ((a.indexOf('.')==-1)? a.length: a.indexOf('.'))).slice(),i=b.length-1;i>=0;i--)
        c=3==d||6==d||9==d||12==d?0==i?b[i]+c:","+b[i]+c:b[i]+c,d++;
    return c+a.substr(((a.indexOf('.')==-1)? a.length: a.indexOf('.')));
}

function dk_mail(a,b)
{
    a.live("keyup",function(c)
    {
        13==c.keyCode&&$.ajax({
            url:TEMPLATEURL+"/includes/controller/ajax/get_dkmail.php",
            type:"POST",
            data:{
                where:"email = '"+a.val()+"'"
            },
            dataType:"json",
            success:function(c){
                0==c[0].length?$.ajax({
                    url:TEMPLATEURL+"/includes/controller/ajax/add_dkmail.php",
                    type:"POST",
                    data:{
                        email:a.val()
                    },
                    success:b()
                }):b()
            }
        })
    })
}

function folow(a,b,c,d)
{
    0!=a.length&&(a.attr("index",topFolow.length),
        topFolow[a.attr("index")]=a.offset().top,
        $(window).scroll(function(){
            subFolow(a,b,c,d)
        }),
        subFolow(a,b,c,d));
}

function subFolow(a,b,c,d){
    checkFolow?$(window).scrollTop()>=topFolow[a.attr("index")]&&(checkFolow=!1,
        a.css({position:"fixed"}),
        d(),
        (typeof v == 'function')? b(): ''):$(window).scrollTop()<topFolow[a.attr("index")]&&(checkFolow=!0,
        a.css({position:"static"}),
        c())
}

var id_feild=new Array,search_auto,lang,map=["vi","en","ru","ch","ja"],sep="|",lang_i=0,checkFolow=!0,topFolow=new Array;

//S??? ki???n weel
function weelFrame(obj, setup, weelup, weeldown)
{
    if(typeof setup !== 'undefined')
        setup();
    handFrame = new handEvent({
        obj: obj,
        tapFn: function(me, x, y){},
        downFn: function(me, x, y){},
        moveFn: function(me, x, y, x2, y2, x3, y3){},
        upFn: function(me, x, y){},
        lMoveFn: function(me, x, y, x2, y2, x3, y3){},
        rMoveFn: function(me, x, y, x2, y2, x3, y3){},
        uMoveFn: function(me, x, y, x2, y2, x3, y3){
            weeldown();
        },
        dMoveFn: function(me, x, y, x2, y2, x3, y3){
            weelup();
        }
    });
    obj.mousewheel(function(event, delta){
        if (delta > 0) {
            event.stopPropagation();
            weelup();
        } else {
            event.stopPropagation();
            weeldown();
        }
    });
}//End weel

//Get numToDay
function convertToDay(d)
{
    if(d.text()=='')
        return;
    date = d.text().split(' ');
    time = date[1].split(':');
    date = date[0].split('-');
    var day = new Date(2014, 6, 14);
    d.text('Ng??y '+date[2]+'/'+date[1]+'/'+date[0]+' l??c '+time[0]+':'+time[1]);
    return;
    switch(day.getDay())
    {
        case 0:
            day = tran('Ch??? nh???t|Sunday|??????????????????????|?????????|?????????');
            break;
        case 1:
            day = tran('Th??? hai|Monday|??????????????????????|?????????|?????????');
            break;
        case 2:
            day = tran('Th??? ba|Tuesday|??????????????|?????????|?????????');
            break;
        case 3:
            day = tran('Th??? t??|Wednesday|??????????|???????????????|?????????');
            break;
        case 4:
            day = tran('Th??? n??m|Thursday|??????????????|?????????|?????????');
            break;
        case 5:
            day = tran('Th??? s??u|Friday|??????????????|?????????|?????????');
            break;
        case 6:
            day = tran('Th??? b???y|Saturday|??????????????|?????????|?????????');
            break;
    }
    d.text(day+' ng??y '+date[2]+'/'+date[1]+'/'+date[0]+' l??c '+time);
}//End numToDay

var Devices = function(){//devices object
    var obj = this;
    obj.execute = function(params){
        var df_params = {
            sub_params: {
                body_width: $(window).width(),
                trap_width: 0,
                time: 0,
                p2: $(window).width()*2/100
            },
            w_1000_f: function(params){},
            w_800_1000_f: function(params){},
            w_768_800_f: function(params){},
            w_590_768_f: function(params){},
            w_480_590_f: function(params){},
            w_320_480_f: function(params){/*Phone*/},
            callBack: function(params){}
        };
        params = $.extend(true, df_params, params);
        if(typeof(params.callBack)==='function')
            params.callBack(params);
        if(params.sub_params.body_width>=1000+params.sub_params.trap_width)
        {
            if(typeof(params.w_1000_f)==='function')
                params.w_1000_f(params);
            return;
        }
        if(params.sub_params.body_width>=800+params.sub_params.trap_width && params.sub_params.body_width<=1000+params.sub_params.trap_width)
        {
            if(typeof(params.w_800_1000_f)==='function')
                params.w_800_1000_f(params);
            return;
        }
        if(params.sub_params.body_width>=768+params.sub_params.trap_width && params.sub_params.body_width<=800+params.sub_params.trap_width)
        {
            if(typeof(params.w_768_800_f)==='function')
                params.w_768_800_f(params);
            return;
        }
        if(params.sub_params.body_width>=590+params.sub_params.trap_width && params.sub_params.body_width<=768+params.sub_params.trap_width)//phone
        {
            if(typeof(params.w_590_768_f)==='function')
                params.w_590_768_f(params);
            return;
        }
        if(params.sub_params.body_width>0+params.sub_params.trap_width && params.sub_params.body_width<=590+params.sub_params.trap_width)
        {
            if(typeof(params.w_0_590_f)==='function')
                params.w_0_590_f(params);
            return;
        }
    };
    obj.phone = function(params){
        var df_params = {
            sub_params: {
                body_width: $(window).width(),
                trap_width: 0,
                time: 0,
                p2: $(window).width()*2/100,
            },
            phone_f: function(params){},
            other_f: function(params){},
            callBack: function(params){}
        };
        params = $.extend(true, df_params, params);
        if(params.sub_params.body_width>643+params.sub_params.trap_width)
        {
            if(typeof(params.other_f)==='function')
                params.other_f(params);
        }
        else
        if(typeof(params.phone_f)==='function')
            params.phone_f(params);
        if(typeof(params.callBack)==='function')
            params.callBack(params);
    };
    return obj;
}//End device

var handEvent = function(p){
    var getNow = function(){

    };
    var params = {
        obj: $('.dObj'),
        tapFn: function(me, x, y){},
        downFn: function(me, x, y){},
        moveFn: function(me, x, y, x2, y2, x3, y3){},
        upFn: function(me, x, y){},
        lMoveFn: function(me, x, y, x2, y2, x3, y3){},
        rMoveFn: function(me, x, y, x2, y2, x3, y3){},
        uMoveFn: function(me, x, y, x2, y2, x3, y3){},
        dMoveFn: function(me, x, y, x2, y2, x3, y3){},
        cachedX: false, cachedY: false, tempX: false, tempY: false, currX: false, currY: false, touchStarted: false
    };
    params = $.extend({}, params, p);
    params.obj.on('touchstart mousedown',function (e){
        if(typeof(e.originalEvent.targetTouches)=='object')
            e = e.originalEvent.targetTouches[0];
        params.cachedX = e.clientX-params.obj.offset().left;
        params.cachedY = e.clientY-params.obj.offset().top;
        params.touchStarted = true;
        (typeof params.downFn == 'function')? params.downFn(params.obj, params.cachedX, params.cachedY): console.log('Down');
        setTimeout(function(){
            if((params.cachedX == e.pageX) && !params.touchStarted && (params.cachedY == e.pageY))
                (typeof params.tapFn == 'function')? params.tapFn(params.obj, params.cachedX, params.cachedY): console.log('Tap');
        },200);
    });
    $(window).on('touchend mouseup touchcancel',function (e){
        if(params.touchStarted)
        {
            params.touchStarted = false;
            (typeof params.upFn == 'function') ? params.upFn(params.obj, params.cachedX, params.cachedY) : console.log('Up');
            if ((params.cachedX > params.currX) && params.currX != false)
                (typeof params.lMoveFn == 'function') ? params.lMoveFn(params.obj, params.cachedX, params.cachedY, params.tempX, params.tempY, params.currX, params.currY) : console.log('Move left');
            if ((params.cachedX < params.currX) && params.currX != false)
                (typeof params.rMoveFn == 'function') ? params.rMoveFn(params.obj, params.cachedX, params.cachedY, params.tempX, params.tempY, params.currX, params.currY) : console.log('Move right');
            if ((params.cachedY > params.currY) && params.currY != false)
                (typeof params.uMoveFn == 'function') ? params.uMoveFn(params.obj, params.cachedX, params.cachedY, params.tempX, params.tempY, params.currX, params.currY) : console.log('Move up');
            if ((params.cachedY < params.currY) && params.currY != false)
                (typeof params.dMoveFn == 'function') ? params.dMoveFn(params.obj, params.cachedX, params.cachedY, params.tempX, params.tempY, params.currX, params.currY) : console.log('Move down');
            params.cachedX = 0; params.cachedY = 0; params.tempX = 0; params.tempY = 0; params.currX = 0; params.currY = 0;
        }
    });
    $(window).on('touchmove mousemove',function (e){
        if(params.touchStarted)
        {
            if(typeof(e.originalEvent.targetTouches)=='object')
                e = e.originalEvent.targetTouches[0];
            params.tempX = (params.currX==0)? params.cachedX: params.currX;
            params.tempY = (params.currY==0)? params.cachedY: params.currY;
            params.currX = (e.clientX-params.obj.offset().left<0)? 0: (e.clientX-params.obj.offset().left>params.obj.width())? params.obj.width(): e.clientX-params.obj.offset().left;
            params.currY = (e.clientY-params.obj.offset().top<0)? 0: (e.clientY-params.obj.offset().top>params.obj.height())? params.obj.height(): e.clientY-params.obj.offset().top;
            (typeof params.moveFn == 'function')? params.moveFn(params.obj, params.cachedX, params.cachedY, params.tempX, params.tempY, params.currX, params.currY): console.log('Move');
        }
    });
    return {
        getNow: getNow
    };
};

var Gmap = function(){//Gmap object
    var obj = this;
    obj.execute = function(params){
        console.log('abc123');
        var df_params = {
            obj: $('.map'),
            lat: -33.890,
            lng: 151.274,
            zoom: 4,
            marker: 'http://wsup3.com/data/media/marker_57a57281e7e90.png'
        };
        params = $.extend(true, df_params, params);
        params.map = new google.maps.Map(params.obj, {
            zoom: params.zoom,
            center: {lat: params.lat, lng: params.lng}
        });
        var beachMarker = new google.maps.Marker({
            position: {lat: params.lat, lng: params.lng},
            map: map,
            icon: params.marker
        });
    }
};

// Metro interface
var Metro = function(p){
    var construct = function(){
        params.itemNum = $('.'+params.classFrame+' > div').length;
        var rd;
        while(params.itemNum>0)
            if(params.sharps!=false)
            {
                $.each(params.sharps, function(k , v){
                    $('.'+params.classFrame).append(group(v));
                    params.itemNum -= v;
                });
                params.sharps = false;
            }
            else
            {
                rd = Math.ceil(Math.random()*((params.itemNum>params.sharp)? params.sharp: params.itemNum));
                $('.'+params.classFrame).append(group(rd));
                params.itemNum -= rd;
            }
        $('.'+params.classFrame+' .'+params.classItem).css({width: params.width+'px', height: params.height+'px'});
        style();
        $('.'+params.classFrame+' .dItem div').each(function(index){
            $('.'+params.classFrame+' .dItem div:eq('+index+') > img').load(function(){
                if($(this).height() > $(this).parent().height())
                {
                    $(this).css({height: $(this).parent().height()+'px'});
                    if($(this).width() > $(this).parent().width())
                        $(this).css({height: 'auto', width: $(this).parent().width()+'px'});
                }
                if($(this).width() > $(this).parent().width())
                    $(this).css({width: $(this).parent().width()+'px'});
                align.topleft($(this), $(this).parent(), 0, 200, 1);
            });
            $('.'+params.classFrame+' .dItem div:eq('+index+') .sImg img').load(function(){
                if($(this).height() > $(this).parent().height())
                {
                    $(this).css({height: $(this).parent().height()+'px'});
                    if($(this).width() > $(this).parent().width())
                        $(this).css({height: 'auto', width: $(this).parent().width()+'px'});
                }
                if($(this).width() > $(this).parent().width())
                    $(this).css({width: $(this).parent().width()+'px'});
                align.topleft($(this), $(this).parent(), 0, 200, 1, function(obj){
                    obj.parent().css('height', (obj.parent().height()-obj.parent().next().height())+'px');
                });
            });
        });
        this.checkInit = true;
    };
    var group = function(index){
        var block='<div class="'+params.classItem+' '+params.classItem+index+'">';
        for(var i = 0; i< index; i++)
        {
            block += '<div>' + $('.'+params.classFrame+' > div:eq(0)').html() + '</div>';
            $('.'+params.classFrame+' > div:eq(0)').remove();
        }
        return block+'</div>';
    };
    var style = function(){
        $('.'+params.classFrame+' .'+params.classItem+'2 > div').css({width: $('.'+params.classFrame+' .'+params.classItem).width()+'px', height: ($('.'+params.classFrame+' .'+params.classItem).height()/2)-2.5+'px'});
        $('.'+params.classFrame+' .'+params.classItem+'2').each(function(){
            $(this).find('> div:eq(0)').css('margin-bottom', '5px');
        });
        var e;
        $('.'+params.classFrame+' .'+params.classItem+'3').each(function(index){
            e = Math.ceil(Math.random()*2);
            if(e==1)
            {
                $(this).find('> div:eq(0)').css({width: $('.'+params.classFrame+' .'+params.classItem).width() + 'px', height: ($('.'+params.classFrame+' .'+params.classItem).height() / 2) - 2.5 + 'px', 'margin-bottom': '5px'}).addClass('dItem5');
                $(this).find('> div:eq(1), > div:eq(2)').css({width: ($('.'+params.classFrame+' .'+params.classItem).width()/2)-2.5 + 'px', height: ($('.'+params.classFrame+' .'+params.classItem).width() / 2) - 2.5 + 'px'}).addClass('dItem6');
                $(this).find('> div:eq(1)').css('margin-right', '5px');
            }
            else
            {
                $(this).find('> div:eq(0), > div:eq(1)').css({width: ($('.'+params.classFrame+' .'+params.classItem).width()/2)-2.5 + 'px', height: ($('.'+params.classFrame+' .'+params.classItem).height() / 2) - 2.5 + 'px'}).addClass('dItem6');
                $(this).find('> div:eq(2)').css({width: $('.'+params.classFrame+' .'+params.classItem).width() + 'px', height: ($('.'+params.classFrame+' .'+params.classItem).width() / 2) - 2.5 + 'px', 'margin-top': '5px'}).addClass('dItem5');
                $(this).find('> div:eq(0)').css('margin-right', '5px');
            }
        });
        $('.'+params.classFrame+' .'+params.classItem+'4').each(function(index){
            $(this).find('> div').css({width: ($('.'+params.classFrame+' .'+params.classItem).width()/2)-2.5 + 'px', height: ($('.'+params.classFrame+' .'+params.classItem).height() / 2) - 2.5 + 'px'}).addClass('dItem6');
            $(this).find('> div:eq(0), > div:eq(2)').css('margin-right', '5px');
            $(this).find('> div:eq(0), > div:eq(1)').css('margin-bottom', '5px');
        });
        $('.'+params.classFrame+' .'+params.classItem+' > div').hover(function(){
            TweenMax.to($(this).find('img'), 0.3,{scale: 1.2});
        }, function(){
            TweenMax.to($(this).find('img'), 0.3,{scale: 1});
        });
    };
    var addItems = function(obj, type){
        obj.each(function(i){
            $(this).attr('class', params.classItem+' '+params.classItem+'1 dNewItem1').html('<div>'+$(this).html()+'</div>').css({
                width: params.width+'px', height: params.height+'px'});
        }).hover(function(){
            TweenMax.to($(this).find('img'), 0.3,{scale: 1.2});
        }, function(){
            TweenMax.to($(this).find('img'), 0.3,{scale: 1});
        }).find('img').each(function(){
            $(this).load(function(){
                if($(this).height()< $(this).parent().height())
                    $(this).css({height: $(this).parent().height()+ 'px', width: 'auto'});
                align.topleft($(this), $(this).parent(), 0, 300, 1, function(obj){
                    if(obj.parent().hasClass('sImg'))
                        obj.parent().animate({'height': (obj.parent().height()-obj.parent().next().height())+'px'}, 100);
                });
            });
        });
    };
    var loaded = function(){

    };
    var checkInit = false;
    var params = {
        BASEURL: (typeof BASEURL == 'undefined')? '': BASEURL,
        classFrame: 'dMetro1',
        classItem: 'dItem',
        height: 400,
        width: 400,
        classBlur: 'sBlurItem',
        sharp: 4,//total of sharp type
        sharps: {//pos, sharp
            1: 2,
            2: 1,
            3: 2,
            4: 1
        }//false
    };
    params = $.extend({}, params, p);
    return {
        construct: construct,
        loaded: loaded,
        checkInit: checkInit,
        addItems: addItems
    };
};
// End metro interface

// Animation Zoom out
var Animation = function(p){
    var showzoomout = function(obj, time, callback){
        obj.css({opacity: 0, display: 'block'});
        TweenMax.to(obj, 0, {scale: '1.1'});
        TweenMax.to(obj, time, {scale: '1', alpha: 1, onComplete: function(){
            if(typeof(callback)=='function')
                callback(obj);
        }});
    };
    var hidezoomout = function(obj, time, callback){
        TweenMax.to(obj, time, {scale: '0.9', alpha: 0, onComplete: function(){
            obj.css({display: 'none', opacity: 1});
            if(typeof(callback)=='function')
                callback(obj);
        }});
    };
    return {
        showzoomout: showzoomout,
        hidezoomout: hidezoomout
    };
};
// End animation Zoom out

// BackMap
var BackMap = function(){
    var add = function(thing){
        $('.aBack').attr('time', parseInt($('.aBack').attr('time'))+1);
        params.time = $('.aBack').attr('time');
        checkPage(thing);
        params.history[params.time] = params.thing;
    };
    var set = function(thing){
        params.history[params.time] = $.extend({}, params.history[params.time], thing);
    };
    var setTime = function(time){
        params.time = time;
        $('.aBack').attr('time', params.time);
    };
    var see = function(time){
        time = (typeof(time)=='undefined')? params.time: time;
        return params.history[time];
    };
    var getHistories = function(){
        return params.history;
    };
    var checkPage = function(thing) {
        if (typeof(thing) == 'undefined')
        {
            thing = {};
            thing.page = 'dMainBoard';
        }
        params.thing = thing;
        switch(thing.page)
        {
            case 'dBoardProductChild':
                params.thing.title = tran('S???n ph???m|Product||');
                break;
            case 'dBoardAddProduct':
                params.thing.title = tran('Th??m s???n ph???m|Add product||');
                break;
            case 'dBoardAddProductImg':
                params.thing.title = tran('Th??m ???nh s???n ph???m|Add product image||');
                break;
            case 'dBoardEditProduct':
                params.thing.title = tran('Ch???nh s???a s???n ph???m|Edit product||');
                break;
            case 'dBoardProducts':
                params.thing.title = tran('Danh s??ch s???n ph???m|List product||');
                break;
            case 'dBoardAddCategory':
                params.thing.title = tran('Th??m chuy??n m???c|Add category||');
                break;
            case 'dBoardAddCategoryImg':
                params.thing.title = tran('Th??m ???nh chuy??n m???c|Add category image||');
                break;
            case 'dBoardEditCategory':
                params.thing.title = tran('Ch???nh s???a chuy??n m???c|Edit category||');
                break;
            case 'dBoardCategories':
                params.thing.title = tran('Danh s??ch chuy??n m???c|List categories||');
                break;
            case 'dBoardAddPage':
                params.thing.title = tran('Th??m chuy??n trang|Add page||');
                break;
            case 'dBoardAddPageImg':
                params.thing.title = tran('Th??m ???nh chuy??n trang|Add page image||');
                break;
            case 'dBoardEditPage':
                params.thing.title = tran('Ch???nh s???a chuy??n trang|Edit page||');
                break;
            case 'dBoardPages':
                params.thing.title = tran('Danh s??ch chuy??n trang|List pages||');
                break;
            case 'dBoardRecording':
                params.thing.title = tran('Quay video|Recording||');
                break;
            case 'dBoardImages':
                params.thing.title = tran('???nh|Photos||');
                break;
            case 'dBoardReportImport':
                params.thing.title = tran('B??o c??o nh???p h??ng|Import report||');
                break;
            case 'dBoardBillImport':
                params.thing.title = tran('Chi ti???t b??o c??o nh???p h??ng|Detail import report||');
                break;
            case 'dBoardDateReport':
                params.thing.title = tran('B??o c??o doanh thu theo ng??y|Date report||');
                break;
            case 'dBoardBillDetail':
                params.thing.title = tran('Chi ti???t b??o c??o doanh thu theo ng??y|Detail date report||');
                break;
            case 'dBoardLogin':
                params.thing.title = tran('????ng nh???p|Login||');
                break;
            case 'dBoardUser':
                params.thing.title = tran('Ng?????i d??ng|User||');
                break;
            case 'dBoardRegister':
                params.thing.title = tran('????ng k??|Register||');
                break;
            case 'dBoardForgot':
                params.thing.title = tran('Qu??n m???t kh???u|Forgot password||');
                break;
            case 'dBoardSlither':
                params.thing.title = 'Slither.io';
                break;
            case 'dBoardHdonline':
                params.thing.title = 'HDOnline';
                break;
            case 'dBoardZalo':
                params.thing.title = 'Zalo';
                break;
            case 'dBoardMiTrans':
                params.thing.title = 'Microsoft Translator';
                break;
            case 'dBoardBatchu':
                params.thing.title = '??u???i H??nh B???t Ch???';
                break;
            case 'dBoardResizer':
                params.thing.title = 'Photo Resizer';
                break;
            case 'dBoardKeeng':
                params.thing.title = 'Keeng';
                break;
        }
        if(typeof(params.thing.action)!='undefined' && typeof(params.thing.action.fn)=='function')
            params.thing.action.fn(params.thing.action.params);
        $('title').html(params.thing.title+' - '+SITENAME);
    };
    var time = function(){
        return params.time;
    };
    var params = {
        history: {},
        time: 0,
        thing: {
            page: 'dMainBoard',
            title: tran('Danh s??ch ???ng d???ng|List application||'),
            obj: $(this),
            name: 'Add img',
            action: {fn: function(){}, params: {}}
        },
        BASEURL: (typeof BASEURL == 'undefined')? '': BASEURL,
        callback: function(){}
    };
//    params = $.extend({}, params, p);
    params.history[params.time] = params.thing;
    return {
        add: add,
        set: set,
        setTime: setTime,
        see: see,
        time: time,
        getHistories: getHistories
    };
}; // End BackMap

var busy = 0;
function changePage(page, cls, callBack)
{
    if(busy==0)
    {
        busy = 1;
        if($('.'+cls).hasClass('dBoardImages'))
            $('.'+cls).fadeTo(300, 0, function(){
                $('.'+cls).removeClass(cls);
                animate.showzoomout(page, 0.3, function(){
                    page.addClass(cls);
                    if(typeof(callBack.fn)=='function')
                        callBack.fn(callBack.params);
                });
            });
        else
            animate.hidezoomout($('.'+cls), 0.3, function(){
                $('.'+cls).removeClass(cls);
                animate.showzoomout(page, 0.3, function(){
                    page.addClass(cls);
                    if(typeof(callBack.fn)=='function')
                        callBack.fn(callBack.params);
                });
            });
        setTimeout(function(){
            busy = 0;
        }, 350);
    }
}

//Fullscreen
function launchIntoFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
function exitFullscreen() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
//End Fullscreen

var dateTimeObj = function(p){
    var getNow = function(){
        return params.dateObj.getFullYear()+'/'+(params.dateObj.getMonth()+1)+'/'+params.dateObj.getDate()+' '+params.dateObj.getHours()+':'+params.dateObj.getMinutes()+':'+params.dateObj.getSeconds();
    };
    var getFormatNow = function(){
        return params.dateObj.getHours()+':'+params.dateObj.getMinutes()+':'+params.dateObj.getSeconds()+' '+params.dateObj.getDate()+'/'+(params.dateObj.getMonth()+1)+'/'+params.dateObj.getFullYear();
    };
    var getDate = function(){
        return ((params.dateObj.getDate()<10)? '0'+params.dateObj.getDate(): params.dateObj.getDate())+' - '+((params.dateObj.getMonth()+1<10)? '0'+parseInt(params.dateObj.getMonth()+1): params.dateObj.getMonth()+1)+' - '+params.dateObj.getFullYear();
    };
    var getNowString = function(){
        return String(params.dateObj.getHours())+String(params.dateObj.getMinutes())+String(params.dateObj.getSeconds())+String(params.dateObj.getDate())+String((params.dateObj.getMonth()+1))+String(params.dateObj.getFullYear());
    };
    var nowStringEY = function(now, delay){
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
    var setTime = function(time){
        params.time = (time==undefined)? params.time: time;
        params.dateObj.setTime(params.dateObj.getTime() + (parseInt(params.time)*60*60*1000));
    };
    var params = {
        dateObj: null,
        time: 0
    };
    params.dateObj = new Date();
    params = $.extend({}, params, p);
    return {
        getNow: getNow,
        getDate: getDate,
        getFormatNow: getFormatNow,
        getNowString: getNowString,
        nowStringEY: nowStringEY,
        setTime: setTime,
        getParams: getParams
    };
};
if(typeof(exports)!='undefined')
{
    exports.dateTimeObj = dateTimeObj;
}
else
{
    dateTimeObj = new dateTimeObj();
    console.log(dateTimeObj.getNow());
}

var Wsup3 = function(p){
    var iReq = function(ques, callback){
        if(ques)
        {
            jobs.push(new Promise(function (resolve, reject) {
                resolve({
                    reqData: {
                        params: ques,
                        ip: params.ip,
                        key: String(Math.round(Math.random()*666666)),
                        history: backmap.getHistories(),
                        user: JSON.parse((web.done(window.localStorage.getItem('user'), null))),
                        languages: JSON.parse((web.done(window.localStorage.getItem('languages'), null))),
                        BASEURL: BASEURL,
                        page: params.page,
                        now: dateTimeObj.getNow()
                    },
                    callback: callback,
                    new: true
                });
            }));
        }
        params.lReq = jobs[0];
        jobs[0].then(function (itm) {
            if(params.disconnected == true)
                socket = io.connect(BASEURL, {reconnect: true});
            socket.emit('req', itm.reqData);
            params.disconnected = true;
            socket.on(itm.reqData.ip+itm.reqData.now+itm.reqData.key, function(d){
                if(itm.new)
                {
                    itm.new = false;
                    params.disconnected = false;
                    itm.callback(d);
                    if(jobs.length>0)
                        iReq(false);
                    else
                    {
                        callEnd();
                        socket.removeListener(itm.reqData.ip+itm.reqData.now+itm.reqData.key);
                        callEnd = function(fn){
                            if(fn)
                                callEnd = fn;
                        };
                    }
                }
            });

        });
        jobs.shift();
    };
    var jobs = [];
    var callEnd = function(fn){
        if(fn)
            callEnd = fn;
    };
    var done = function (dt, opt){return ((typeof(dt)!='undefined' && dt != null && dt != 'undefined')? dt: ((typeof(opt)=='undefined' && opt != null && opt != 'undefined')? '': opt));};
    var getNow = function(){
        params.dateObj = new Date();
        params.dateObj.setTime(params.dateObj.getTime());
        return params.dateObj.getFullYear()+'/'+(params.dateObj.getMonth()+1)+'/'+params.dateObj.getDate()+' '+params.dateObj.getHours()+':'+params.dateObj.getMinutes()+':'+params.dateObj.getSeconds();
    };
    var getNowString = function(){
        params.dateObj = new Date();
        params.dateObj.setTime(params.dateObj.getTime() + (7*60*60*1000));
        return String(params.dateObj.getHours())+String(params.dateObj.getMinutes())+String(params.dateObj.getSeconds())+String(params.dateObj.getDate())+String((params.dateObj.getMonth()+1))+String(params.dateObj.getFullYear());
    };
    var getFormatNow = function(){
        params.dateObj = new Date();
        return params.dateObj.getHours()+':'+params.dateObj.getMinutes()+':'+params.dateObj.getSeconds()+' '+params.dateObj.getDate()+'/'+(params.dateObj.getMonth()+1)+'/'+params.dateObj.getFullYear();
    };
    var getFormatDate = function(sep){
        params.dateObj = new Date();
        return params.dateObj.getDate()+sep+((params.dateObj.getMonth()+1<10)? '0'+(params.dateObj.getMonth()+1): params.dateObj.getMonth()+1)+sep+params.dateObj.getFullYear();
    };
    var makeLink = function(link){
        return link;
    };
    var getCode = function(length){
        params.code = $.md5(Math.floor(Math.random()*10)).slice(0, length).toLocaleUpperCase();
        return params.code;
    };
    var checkCode = function(code){
        return (params.code == code)
    };
    var socket = io.connect(BASEURL, {reconnect: true});
    var params = {
        page: PAGE,
        slug: SLUG,
        ip: '',
        secure: '',
        lReq: null,
        dateObj: new Date(),
        disconnected: false,
        code: ''
    };
    socket.on('setIp', function(ips){
        if(params.ip=='' || params.secure!=ips.secure)
        {
            params.ip = ips.ip;
            params.secure = ips.secure;
            if(params.lReq!=null)
            {
                jobs[0] = params.lReq;
                iReq(false);
            }
        }
    });
    var wReady = function(user, fn){
        socket.on(user.pead, function(md){
            if(typeof(fn)=='function')
                fn(md);
        });
    };
    socket.on('reload', function(){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200 && params.lReq != null) {
                jobs[0] = params.lReq;
                iReq(false);
            }
        };
        xmlHttp.open( "GET", BASEURL+'/'+SLUG, false);
        xmlHttp.send({});
    });
    params = $.extend({}, params, p);
    return {
        iReq: iReq,
        wReady: wReady,
        callEnd: callEnd,
        done: done,
        getFormatNow: getFormatNow,
        getFormatDate: getFormatDate,
        getNow: getNow,
        getNowString: getNowString,
        dateObj: params.dateObj,
        makeLink: makeLink,
        getCode: getCode,
        checkCode: checkCode
    };
};

var Chat = function(p){
    var ready = function(){

    };
    var loaded = function(){
        loadFrame();
    };
    var resize = function(){
        loadFrame();
    };
    var scroll = function(){

    };
    var upload = function(){

    };
    var loadFrame = function(){
        params.body_w = $(window).width(), params.body_h = $(window).height();
        $('.d_chatDetail').css({'height': (params.body_h - 105)+'px'});
        $('.d_chatDetail').scrollTop($('.d_chatDetail')[0].scrollHeight);
        $('.d_bg img').css({width: 'auto', height: '100%'});
        if($('.d_bg img').width()<$('.d_bg').width())
            $('.d_bg img').css({width: '100%', height: 'auto'});
        ver_center($('.d_bg img'), 'all', 0, 1);
    };
    var showAlert = function(html, noClose)
    {
        TweenMax.to($('.d_error'), 0.3, {top: -$('.d_error').outerHeight(), onComplete: function(){
            $('.d_error').html(html);
            TweenMax.to($('.d_error'), 0.3, {top: 0});
            if(!noClose)
                setTimeout(function(){
                    TweenMax.to($('.d_error'), 0.3, {top: -$('.d_error').outerHeight()});
                }, 5000);
        }});
    };
    var closeAlert = function()
    {
        TweenMax.to($('.d_error'), 0.3, {top: -$('.d_error').outerHeight()});
    }
    var rep_img = function(me){
        while($(me).html().indexOf("&gt;:)")>-1)
            $(me).html($(me).html().replace("&gt;:)",'<img src="'+FRONTEND+'/images/emo1/19.gif" alt="private" title="Y??u tinh|Demon"/>'));
        while($(me).html().indexOf(":))")>-1)
            $(me).html($(me).html().replace(":))",'<img src="'+FRONTEND+'/images/emo1/21.gif" alt="private" title="C?????i l???n|Laughs"/>'));
        while($(me).html().indexOf("/:)")>-1)
            $(me).html($(me).html().replace("/:)",'<img src="'+FRONTEND+'/images/emo1/23.gif" alt="private" title="Nh??u m??y|Frowned"/>'));
        while($(me).html().indexOf(":)")>-1)
            $(me).html($(me).html().replace(":)",'<img src="'+FRONTEND+'/images/emo1/1.gif" alt="private" title="Vui v???|Fun"/>'));
        while($(me).html().indexOf(":((")>-1)
            $(me).html($(me).html().replace(":((",'<img src="'+FRONTEND+'/images/emo1/20.gif" alt="private" title="Kh??c|Cries"/>'));
        while($(me).html().indexOf(":(")>-1)
            $(me).html($(me).html().replace(":(",'<img src="'+FRONTEND+'/images/emo1/2.gif" alt="private" title="Bu???n|Sad"/>'));
        while($(me).html().indexOf(";;)")>-1)
            $(me).html($(me).html().replace(";;)",'<img src="'+FRONTEND+'/images/emo1/5.gif" alt="private" title="???? l??ng nheo|Signal"/>'));
        while($(me).html().indexOf(";)")>-1)
            $(me).html($(me).html().replace(";)",'<img src="'+FRONTEND+'/images/emo1/3.gif" alt="private" title="Nh??y m???t|blink"/>'));
        while($(me).html().indexOf("&gt;:D&lt;")>-1)
            $(me).html($(me).html().replace("&gt;:D&lt;",'<img src="'+FRONTEND+'/images/emo1/6.gif" alt="private" title="??m|Hug"/>'));
        while($(me).html().indexOf(":D")>-1)
            $(me).html($(me).html().replace(":D",'<img src="'+FRONTEND+'/images/emo1/4.gif" alt="private" title="C?????i nhe r??ng|Laugh"/>'));
        while($(me).html().indexOf(":-/")>-1)
            $(me).html($(me).html().replace(":-/",'<img src="'+FRONTEND+'/images/emo1/7.gif" alt="private" title="B???i r???i|Confused"/>'));
        while($(me).html().indexOf(":x")>-1)
            $(me).html($(me).html().replace(":x",'<img src="'+FRONTEND+'/images/emo1/8.gif" alt="private" title="Y??u r???i|Love"/>'));
        while($(me).html().indexOf(':"&gt;')>-1)
            $(me).html($(me).html().replace(':"&gt;','<img src="'+FRONTEND+'/images/emo1/9.gif" alt="private" title="Th???n th??ng|Shy"/>'));
        while($(me).html().indexOf("&lt;:-P")>-1)
            $(me).html($(me).html().replace("&lt;:-P",'<img src="'+FRONTEND+'/images/emo1/36.gif" alt="private" title="C??? v??|Cheerleader"/>'));
        while($(me).html().indexOf(":P")>-1)
            $(me).html($(me).html().replace(":P",'<img src="'+FRONTEND+'/images/emo1/10.gif" alt="private loll" title="L?? l?????i|tongue loll"/>'));
        while($(me).html().indexOf(":-*")>-1)
            $(me).html($(me).html().replace(":-*",'<img src="'+FRONTEND+'/images/emo1/11.gif" alt="private" title="H??n|Kiss"/>'));
        while($(me).html().indexOf("=((")>-1)
            $(me).html($(me).html().replace("=((",'<img src="'+FRONTEND+'/images/emo1/12.gif" alt="private" title="Th???t t??nh|Lost love"/>'));
        while($(me).html().indexOf(":-O")>-1)
            $(me).html($(me).html().replace(":-O",'<img src="'+FRONTEND+'/images/emo1/13.gif" alt="private" title="Ng???c nhi??n|Suprise"/>'));
        while($(me).html().indexOf("X-(")>-1)
            $(me).html($(me).html().replace("X-(",'<img src="'+FRONTEND+'/images/emo1/14.gif" alt="private" title="Gi???n d???|Angry"/>'));
        while($(me).html().indexOf(":&gt;")>-1)
            $(me).html($(me).html().replace(":&gt;",'<img src="'+FRONTEND+'/images/emo1/15.gif" alt="private" title="V??nh m???t|Challenges"/>'));
        while($(me).html().indexOf("B-)")>-1)
            $(me).html($(me).html().replace("B-)",'<img src="'+FRONTEND+'/images/emo1/16.gif" alt="private" title="Ng???u|Cool"/>'));
        while($(me).html().indexOf("#:-S")>-1)
            $(me).html($(me).html().replace("#:-S",'<img src="'+FRONTEND+'/images/emo1/18.gif" alt="private" title="Nh??? nh??m|Relief"/>'));
        while($(me).html().indexOf(":-S")>-1)
            $(me).html($(me).html().replace(":-S",'<img src="'+FRONTEND+'/images/emo1/17.gif" alt="private" title="Lo l???ng|Worry"/>'));
        while($(me).html().indexOf("(:|")>-1)
            $(me).html($(me).html().replace("(:|",'<img src="'+FRONTEND+'/images/emo1/37.gif" alt="private" title="Bu???n ng???|Sleepy"/>'));
        while($(me).html().indexOf(":|")>-1)
            $(me).html($(me).html().replace(":|",'<img src="'+FRONTEND+'/images/emo1/22.gif" alt="private" title="Ch???u|Bear"/>'));
        while($(me).html().indexOf("=))")>-1)
            $(me).html($(me).html().replace("=))",'<img src="'+FRONTEND+'/images/emo1/24.gif" alt="private" title="C?????i ??au b???ng|Laugh abdominal pain"/>'));
        while($(me).html().indexOf("O:-)")>-1)
            $(me).html($(me).html().replace("O:-)",'<img src="'+FRONTEND+'/images/emo1/25.gif" alt="private" title="Thi??n th???n|Angel"/>'));
        while($(me).html().indexOf(":-B")>-1)
            $(me).html($(me).html().replace(":-B",'<img src="'+FRONTEND+'/images/emo1/26.gif" alt="private" title="M???t s??ch|bookworm"/>'));
        while($(me).html().indexOf("=;")>-1)
            $(me).html($(me).html().replace("=;",'<img src="'+FRONTEND+'/images/emo1/27.gif" alt="private" title="????? r???i|Enough"/>'));
        while($(me).html().indexOf("|-)")>-1)
            $(me).html($(me).html().replace("|-)",'<img src="'+FRONTEND+'/images/emo1/28.gif" alt="private" title="Ng???|Sleep"/>'));
        while($(me).html().indexOf("8-|")>-1)
            $(me).html($(me).html().replace("8-|",'<img src="'+FRONTEND+'/images/emo1/29.gif" alt="private" title="Tr??n m???t|Goggle"/>'));
        while($(me).html().indexOf("L-)")>-1)
            $(me).html($(me).html().replace("L-)",'<img src="'+FRONTEND+'/images/emo1/30.gif" alt="private" title="Y???u m?? ra gi??|Contempt"/>'));
        while($(me).html().indexOf(":-&amp;")>-1)
            $(me).html($(me).html().replace(":-&amp;",'<img src="'+FRONTEND+'/images/emo1/31.gif" alt="private" title="T??i m???t|Pale"/>'));
        while($(me).html().indexOf(":-$")>-1)
            $(me).html($(me).html().replace(":-$",'<img src="'+FRONTEND+'/images/emo1/32.gif" alt="private" title="Im l???ng|Silent"/>'));
        while($(me).html().indexOf("[-(")>-1)
            $(me).html($(me).html().replace("[-(",'<img src="'+FRONTEND+'/images/emo1/33.gif" alt="private" title="Kh??ng th??m n??i|Arms crossed"/>'));
        while($(me).html().indexOf(":O)")>-1)
            $(me).html($(me).html().replace(":O)",'<img src="'+FRONTEND+'/images/emo1/34.gif" alt="private" title="Con heo|Pig"/>'));
        while($(me).html().indexOf("8-}")>-1)
            $(me).html($(me).html().replace("8-}",'<img src="'+FRONTEND+'/images/emo1/35.gif" alt="private" title="??i??n cu???ng|Crazy"/>'));
        while($(me).html().indexOf("=P~")>-1)
            $(me).html($(me).html().replace("=P~",'<img src="'+FRONTEND+'/images/emo1/38.gif" alt="private" title="Th??m|Cravings"/>'));
        while($(me).html().indexOf(":-?")>-1)
            $(me).html($(me).html().replace(":-?",'<img src="'+FRONTEND+'/images/emo1/39.gif" alt="private" title="Suy ngh???|pensive"/>'));
        while($(me).html().indexOf("#-o")>-1)
            $(me).html($(me).html().replace("#-o",'<img src="'+FRONTEND+'/images/emo1/40.gif" alt="private" title="Tr???i ??i|God"/>'));
        while($(me).html().indexOf(":v")>-1)
            $(me).html($(me).html().replace(":v",'<img src="'+FRONTEND+'/images/emo1/41.png" alt="private" title="C?????i h?? h???c m???m|Laughs"/>'));
        while($(me).html().indexOf(":'(")>-1)
            $(me).html($(me).html().replace(":'(",'<img src="'+FRONTEND+'/images/emo1/42.png" alt="private" title="Kh??c|Cries"/>'));
        while($(me).html().indexOf("^_^")>-1)
            $(me).html($(me).html().replace("^_^",'<img src="'+FRONTEND+'/images/emo1/43.png" alt="private" title="Vui v???|Fun"/>'));
        while($(me).html().indexOf("-_-")>-1)
            $(me).html($(me).html().replace("-_-",'<img src="'+FRONTEND+'/images/emo1/44.png" alt="private" title="Kh??ng quan t??m|Arms crossed"/>'));
        while($(me).html().indexOf("&gt;:o")>-1)
            $(me).html($(me).html().replace("&gt;:o",'<img src="'+FRONTEND+'/images/emo1/45.png" alt="private" title="Nham hi???m|sneaking"/>'));
        while($(me).html().indexOf(":3")>-1)
            $(me).html($(me).html().replace(":3",'<img src="'+FRONTEND+'/images/emo1/46.png" alt="private" title="Th??ng hoa|sublimation"/>'));
        return $(me).html();
    };
    var animate = function(){

    };
    var params = {
        BASE_URL: (typeof BASE_URL == 'undefined')? '': BASE_URL
    };
    params = $.extend({}, params, p);
    return {
        ready: ready,
        loaded: loaded,
        resize: resize,
        scroll: scroll,
        loadFrame: loadFrame,
        unLoad: unLoad,
        animate: animate
    };
};

function addBtnCke(editor, fn){
    editor.addCommand("addVideos", {
        exec: function(edt) {
            backmap.set({name: 'Add videos', editor: edt.name});
            $('.dVideo').live('click', function(){
                $(this).find('.sTitle').toggleClass('sItemChk');
            });
            if($('#fVideos').html()=='')
                $('.dBoardVideos .sBtnMore').trigger('click');
            if(typeof(fn)=='function')
                fn();
            changePage($('.dBoardVideos'), 'dShow', {fn: function(){
                $('.aAccept').fadeOut(300);
                $('#iMedia').attr('accept', '.webm,.ogg,.mp4');
                $('.lUpload').attr('type', 'video').fadeIn(300);
                $('.aAccepts').fadeIn(300);
            }, params: {}});
        }
    });
    editor.ui.addButton('Videos', {
        label: "Videos",
        command: 'addVideos',
        toolbar: 'insert',
        icon: SKIN + '/admin/videoicon.png'
    });
    editor.addCommand("addImages", {
        exec: function(edt) {
            backmap.set({name: 'Add images', editor: edt.name});
            $('.dItem > div').live('click', function(){
                $(this).find('.sTitle').toggleClass('sItemChk');
            });
            if($('#fImages').html()=='')
                $('.dBoardImages .sBtnMore').trigger('click');
            if(typeof(fn)=='function')
                fn();
            changePage($('.dBoardImages'), 'dShow', {fn: function(){
                $('.aAccept').fadeOut(300);
                $('#iMedia').attr('accept', '.jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF');
                $('.lUpload').attr('type', 'image').fadeIn(300);
                $('.aAccepts').fadeIn(300);
            }, params: {}});
        }
    });
    editor.ui.addButton('Images', {
        label: "Images",
        command: 'addImages',
        toolbar: 'insert',
        icon: SKIN + '/admin/imgicon.png'
    });
}

//Connect Facebook
function faceAPI(callback){
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
            appId: '452081948466285',
            version: 'v2.7' // or v2.1, v2.2, v2.3, ...
        });
        FB.getLoginStatus(function(response) {
            if(response.status === 'connected') {
                callback.params.info(response);
            }
            else if(response.status === 'not_authorized')
                callback.params.notAuth(response);
            else
                notFace(response);
        });
        callback.params.login = function(){
            FB.login(function(response) {
                if(response.status === 'connected') {
                    FB.api('/me', {fields: 'id, name, first_name, middle_name, last_name, gender, birthday, email, picture, location'}, function(response) {
                        web.iReq({action: 'iLoginFB', displayname: response.name, fullname: response.last_name+' '+response.first_name, gender: response.gender, address: response.location, email: response.email, image: response.picture.data.url}, function(dt){
                            thisUser = dt.user;
                            window.localStorage.setItem('user', JSON.stringify(dt.user));
                            window.localStorage.setItem('languages', JSON.stringify(dt.languages));
                            window.location.assign(dt.path);
                        });
                    });
                }
                else if(response.status === 'not_authorized')
                    callback.params.notAuth(response);
                else
                    notFace(response)
            }, {scope: 'email', return_scopes: true});
        };
        callback.params.info = function(response){
            FB.api('/me', {fields: 'id, name, first_name, middle_name, last_name, gender, birthday, email, picture, location'}, function(response) {
                web.iReq({action: 'iLoginFB', displayname: response.name, fullname: response.last_name+' '+response.first_name, gender: response.gender, address: response.location, email: response.email, image: response.picture.data.url}, function(dt){
                    thisUser = dt.user;
                    window.localStorage.setItem('user', JSON.stringify(dt.user));
                    window.localStorage.setItem('languages', JSON.stringify(dt.languages));
                    $('.dHasUser .dSubMenu a').attr('title', dt.user.displayname);
                    $('.dNoUser').fadeOut(200, function(){
                        $('.dHasUser').fadeIn(200, function(){
                            $('.dSubMenu > a:eq(0) img').attr('src', dt.user.image).load(function(){
                                align.top($('.dSubMenu > a:eq(0) img'), $('.dSubMenu > a:eq(0)'), 0, 0, 1, function(){});
                            });
                        });
                    });
                });
            });
        };
        callback.params.logout = function(){
            FB.logout(function(response) {
                console.log(response);
            });
        };
        callback.params.notAuth = function(response){
            console.log('not_authorized');
        };
        function notFace(response){
            console.log('Not login into facebook');
        };
        if(typeof(callback.fn)=='function')
            callback.fn(callback.params);
    });
}

// Paginator
function paginator(pageQuery, totalPages)
{
    p = '<div class="dPages">';
    if(pageQuery-2>0)
        p += '<a class="aArowStyle" page="1" title="'+tran('Trang ?????u|First page|||')+'">&laquo;</a>';
    if(pageQuery-1>0)
        p += '<a class="aArowStyle" page="'+(pageQuery-1)+'" title="'+tran('Trang|Page|||')+' '+(pageQuery-1)+'">&lsaquo;</a>';
    for(var page = pageQuery-4; page <= pageQuery+4; page++)
        if(page>0 && page<=totalPages)
            p += '<a '+((page == pageQuery)? 'class="aPageAct"': '')+' page="'+page+'" title="'+tran('Trang|Page|||')+' '+page+'">'+page+'</a>';
    if(pageQuery+1<=totalPages)
        p += '<a class="aArowStyle" page="'+(pageQuery+1)+'" title="'+tran('Trang|Page|||')+' '+(pageQuery+1)+'">&rsaquo;</a>';
    if(pageQuery+2<=totalPages)
        p += '<a class="aArowStyle" page="'+totalPages+'" title="'+tran('Trang cu???i|Last page|||')+'">&raquo;</a></div>';
    return p;
}

var CountDown = function(p){
    var ready = function() {
        if(!checkCountDown())
            if(typeof(params.timeout) == 'function')
                return params.timeout();
        params.dateObj.text((params.dates<9)? '0'+params.dates: params.dates);
        params.hourObj.text((params.hours<9)? '0'+params.hours: params.hours);
        params.minuteObj.text((params.minutes<9)? '0'+params.minutes: params.minutes);
        params.secondObj.text((params.seconds<9)? '0'+params.seconds: params.seconds);
        params.interval = setInterval(function(){
            if(params.secondObj.text()=='00')
                if(params.minuteObj.text()=='00')
                    if(params.hourObj.text()=='00')
                        if(params.dateObj.text()=='00')
                        {
                            clearInterval(params.interval);
                            if(typeof(params.timeout)=='function')
                                params.timeout();
                        }
                        else
                        {
                            if(parseInt(params.dateObj.text())-1<10)
                                params.dateObj.text('0'+(parseInt(params.dateObj.text())-1));
                            else
                                params.dateObj.text(parseInt(params.dateObj.text())-1);
                            params.hourObj.text(23);
                            params.minuteObj.text(59);
                            params.secondObj.text(59);
                        }
                    else
                    {
                        if(parseInt(params.hourObj.text())-1<10)
                            params.hourObj.text('0'+(parseInt(params.hourObj.text())-1));
                        else
                            params.hourObj.text(parseInt(params.hourObj.text())-1);
                        params.minuteObj.text(59);
                        params.secondObj.text(59);
                    }
                else
                {
                    if(parseInt(params.minuteObj.text())-1<10)
                        params.minuteObj.text('0'+(parseInt(params.minuteObj.text())-1));
                    else
                        params.minuteObj.text(parseInt(params.minuteObj.text())-1);
                    params.secondObj.text(59);
                }
            else
            if(parseInt(params.secondObj.text())-1<10)
                params.secondObj.text('0'+(parseInt(params.secondObj.text())-1));
            else
                params.secondObj.text(parseInt(params.secondObj.text())-1);
        }, 1000);
    };
    var setCountDown = function(){
        params.seconds = params.seconds - params.now.getSeconds();
        params.minutes = (params.minutes!=null)? params.minutes: parseInt(params.minuteObj.attr('value'));
        params.hours = (params.hours!=null)? params.hours: parseInt(params.hourObj.attr('value'));
        params.dates = Math.ceil((new Date(((params.years!=null)? params.years: params.dateObj.attr('value').substring(0, 4)), ((params.months!=null)? parseInt(params.months)-1: parseInt(params.dateObj.attr('value').substring(5, 7))-1), ((params.days!=null)? params.days: params.dateObj.attr('value').substring(8, 10))) - new Date(params.now.getFullYear(), params.now.getMonth(), params.now.getDate())) / (1000 * 60 * 60 * 24));
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
        ready: ready,
        checkCountDown: checkCountDown
    };
};

function selectLocation(district, city)
{
    locations = {
        'An Giang': [
            'An Ph??',
            'Ch??u ?????c',
            'Ch??u Ph??',
            'Ch??u Th??nh',
            'Ch??? M???i',
            'Long Xuy??n',
            'Ph?? T??n',
            'T??n Ch??u',
            'Tho???i S??n',
            'T???nh Bi??n',
            'Tri T??n'
        ],
        'B?? R???a - V??ng T??u': [
            'B?? R???a',
            'Ch??u ?????c',
            'C??n ?????o',
            '?????t ?????',
            'Long ??i???n',
            'T??n Th??nh',
            'V??ng T??u',
            'Xuy??n M???c'
        ],
        'B???c Li??u': [
            'B???c Li??u',
            '????ng H???i',
            'Gi?? Rai',
            'H??a B??nh',
            'H???ng D??n',
            'Ph?????c Long',
            'V??nh L???i'
        ],
        'B???c K???n': [
            'Ba B???',
            'B???ch Th??ng',
            'B???c K???n',
            'Ch??? ?????n',
            'Ch??? M???i',
            'Na R??',
            'Ng??n S??n',
            'P??c N???m'
        ],
        'B???c Giang': [
            'B???c Giang',
            'Hi???p H??a',
            'L???ng Giang',
            'L???c Nam',
            'L???c Ng???n',
            'S??n ?????ng',
            'T??n Y??n',
            'Vi???t Y??n',
            'Y??n D??ng',
            'Y??n Th???'
        ],
        'B???c Ninh': [
            'B???c Ninh',
            'Gia B??nh',
            'L????ng T??i',
            'Qu??? V??',
            'Thu???n Th??nh',
            'Ti??n Du',
            'T??? S??n',
            'Y??n Phong'
        ],
        'B???n Tre': [
            'Ba Tri',
            'B???n Tre',
            'B??nh ?????i',
            'Ch??u Th??nh',
            'Ch??? L??ch',
            'Gi???ng Tr??m',
            'M??? C??y B???c',
            'M??? C??y Nam',
            'Th???nh Ph??'
        ],
        'B??nh D????ng': [
            'B??u B??ng',
            'B???c T??n Uy??n',
            'B???n C??t',
            'D???u Ti???ng',
            'D?? An',
            'Ph?? Gi??o',
            'T??n Uy??n',
            'Th??? D???u M???t',
            'Thu???n An'
        ],
        'B??nh ?????nh': [
            'An L??o',
            'An Nh??n',
            'Ho??i ??n',
            'Ho??i Nh??n',
            'Ph?? C??t',
            'Ph?? M???',
            'Quy Nh??n',
            'T??y S??n',
            'Tuy Ph?????c',
            'V??n Canh',
            'V??nh Th???nh'
        ],
        'B??nh Ph?????c': [
            'B??nh Long',
            'B?? ????ng',
            'B?? ?????p',
            'B?? Gia M???p',
            'Ch??n Th??nh',
            '?????ng Ph??',
            '?????ng Xo??i',
            'H???n Qu???n',
            'L???c Ninh',
            'Ph?? Ri???ng',
            'Ph?????c Long'
        ],
        'B??nh Thu???n': [
            'B???c B??nh',
            '?????c Linh',
            'H??m T??n',
            'H??m Thu???n B???c',
            'H??m Thu???n Nam',
            'La Gi',
            'Phan Thi???t',
            'Ph?? Qu??',
            'T??nh Linh',
            'Tuy Phong'
        ],
        'C?? Mau': [
            'C?? Mau',
            'C??i N?????c',
            '?????m D??i',
            'N??m C??n',
            'Ng???c Hi???n',
            'Ph?? T??n',
            'Th???i B??nh',
            'Tr???n V??n Th???i',
            'U Minh'
        ],
        'Cao B???ng': [
            'B???o L???c',
            'B???o L??m',
            'Cao B???ng',
            'H?? Qu???ng',
            'H??? Lang',
            'H??a An',
            'Nguy??n B??nh',
            'Ph???c H??a',
            'Qu???ng Uy??n',
            'Th???ch An',
            'Th??ng N??ng',
            'Tr?? L??nh',
            'Tr??ng Kh??nh'
        ],
        'C???n Th??': [
            'B??nh Th???y',
            'C??i R??ng',
            'C??? ?????',
            'Ninh Ki???u',
            '?? M??n',
            'Th???t N???t',
            'Th???i Lai',
            'V??nh Th???nh'
        ],
        '???? N???ng': [
            'C???m L???',
            'H???i Ch??u',
            'H??a Vang',
            'Ho??ng Sa',
            'Li??n Chi???u',
            'Ng?? H??nh S??n',
            'S??n Tr??',
            'Thanh Kh??'
        ],
        '?????k L???k': [
            'Bu??n ????n',
            'Bu??n H???',
            'Bu??n Ma Thu???t',
            'C?? Kuin',
            "C?? M'gar",
            "Ea H'leo",
            'Ea Kar',
            'Kr??ng Ana',
            'Kr??ng B??ng',
            'Kr??ng B??k',
            'Kr??ng N??ng',
            'Kr??ng P???k',
            'L???k',
            "M'??r??k"
        ],
        '?????k N??ng': [
            'C?? J??t',
            '?????k Glong',
            '?????k Mil',
            "?????k R'l???p",
            '????k Song',
            'Gia Ngh??a',
            'Kr??ng N??',
            'Tuy ?????c'
        ],
        '?????ng Nai': [
            'Bi??n H??a',
            'C???m M???',
            '?????nh Qu??n',
            'Long Kh??nh',
            'Long Th??nh',
            'Nh??n Tr???ch',
            'T??n Ph??',
            'Th???ng Nh???t',
            'Tr???ng Bom',
            'V??nh C???u',
            'Xu??n L???c'
        ],
        '?????ng Th??p': [
            'Cao L??nh',
            'Ch??u Th??nh',
            'H???ng Ng???',
            'Lai Vung',
            'L???p V??',
            'Sa ????c',
            'Tam N??ng',
            'T??n H???ng',
            'Thanh B??nh',
            'Th??p M?????i'
        ],
        '??i???n Bi??n': [
            '??i???n Bi??n',
            '??i???n Bi??n ????ng',
            '??i???n Bi??n Ph???',
            'M?????ng ???ng',
            'M?????ng Ch??',
            'M?????ng Lay',
            'M?????ng Nh??',
            'N???m P???',
            'T???a Ch??a',
            'Tu???n Gi??o'
        ],
        'Gia Lai': [
            'An Kh??',
            'Ayun Pa',
            'Ch?? P??h',
            'Ch?? Pr??ng',
            'Ch?? P??h',
            'Ch?? S??',
            '?????k ??oa',
            '??ak P??',
            '?????c C??',
            'Ia Grai',
            'Ia Pa',
            'KBang',
            'K??ng Chro',
            'Kr??ng Pa',
            'Mang Yang',
            'Ph?? Thi???n',
            'Pleiku'
        ],
        'H?? Giang': [
            'B???c M??',
            'B???c Quang',
            '?????ng V??n',
            'H?? Giang',
            'Ho??ng Su Ph??',
            'M??o V???c',
            'Qu???n B???',
            'Quang B??nh',
            'V??? Xuy??n',
            'X??n M???n',
            'Y??n Minh'
        ],
        'H?? Nam': [
            'B??nh L???c',
            'Duy Ti??n',
            'Kim B???ng',
            'L?? Nh??n',
            'Ph??? L??',
            'Thanh Li??m'
        ],
        'H?? N???i': [
            'Ba ????nh',
            'Ba V??',
            'B???c T??? Li??m',
            'C???u Gi???y',
            'Ch????ng M???',
            '??an Ph?????ng',
            '????ng Anh',
            '?????ng ??a',
            'Gia L??m',
            'H?? ????ng',
            'Hai B?? Tr??ng',
            'Ho??i ?????c',
            'Ho??n Ki???m',
            'Ho??ng Mai',
            'Long Bi??n',
            'M?? Linh',
            'M??? ?????c',
            'Nam T??? Li??m',
            'Ph?? Xuy??n',
            'Ph??c Th???',
            'Qu???c Oai',
            'S??c S??n',
            'S??n T??y',
            'T??y H???',
            'Th???ch Th???t',
            'Thanh Oai',
            'Thanh Tr??',
            'Thanh Xu??n',
            'Th?????ng T??n',
            '???ng H??a'
        ],
        'H?? T??nh': [
            'Can L???c',
            'C???m Xuy??n',
            '?????c Th???',
            'H?? T??nh',
            'H???ng L??nh',
            'H????ng Kh??',
            'H????ng S??n',
            'K??? Anh',
            'L???c H??',
            'Nghi Xu??n',
            'Th???ch H??',
            'V?? Quang'
        ],
        'H???i D????ng': [
            'B??nh Giang',
            'C???m Gi??ng',
            'Ch?? Linh',
            'Gia L???c',
            'H???i D????ng',
            'Kim Th??nh',
            'Kinh M??n',
            'Nam S??ch',
            'Ninh Giang',
            'Thanh H??',
            'Thanh Mi???n',
            'T??? K???'
        ],
        'H???i Ph??ng': [
            'An D????ng',
            'An L??o',
            'B???ch Long V??',
            'C??t H???i',
            'D????ng Kinh',
            '????? S??n',
            'H???i An',
            'H???ng B??ng',
            'Ki???n An',
            'Ki???n Th???y',
            'L?? Ch??n',
            'Ng?? Quy???n',
            'Thu??? Nguy??n',
            'Ti??n L??ng',
            'V??nh B???o'
        ],
        'H??a B??nh': [
            'Cao Phong',
            '???? B???c',
            'H??a B??nh',
            'Kim B??i',
            'K??? S??n',
            'L???c S??n',
            'L???c Th???y',
            'L????ng S??n',
            'Mai Ch??u',
            'T??n L???c',
            'Y??n Th???y'
        ],
        'H???u Giang': [
            'Ch??u Th??nh',
            'Ch??u Th??nh A',
            'Long M???',
            'Ng?? B???y',
            'Ph???ng Hi???p',
            'V??? Thanh',
            'V??? Th???y'
        ],
        'H??ng Y??n': [
            '??n Thi',
            'H??ng Y??n',
            'Kho??i Ch??u',
            'Kim ?????ng',
            'M??? H??o',
            'Ph?? C???',
            'Ti??n L???',
            'V??n Giang',
            'V??n L??m',
            'Y??n M???'
        ],
        'Tp. H??? Ch?? Minh': [
            'B??nh Ch??nh',
            'B??nh T??n',
            'B??nh Th???nh',
            'C???n Gi???',
            'C??? Chi',
            'G?? V???p',
            'H??c M??n',
            'Nh?? B??',
            'Ph?? Nhu???n',
            'Qu???n 1',
            'Qu???n 2',
            'Qu???n 3',
            'Qu???n 4',
            'Qu???n 5',
            'Qu???n 6',
            'Qu???n 7',
            'Qu???n 8',
            'Qu???n 9',
            'Qu???n 10',
            'Qu???n 11',
            'Qu???n 12',
            'T??n B??nh',
            'T??n Ph??',
            'Th??? ?????c'
        ],
        'Kh??nh H??a': [
            'Cam L??m',
            'Cam Ranh',
            'Di??n Kh??nh',
            'Kh??nh S??n',
            'Kh??nh V??nh',
            'Nha Trang',
            'Ninh H??a',
            'Tr?????ng Sa',
            'V???n Ninh'
        ],
        'Ki??n Giang': [
            'An Bi??n',
            'An Minh',
            'Ch??u Th??nh',
            'Giang Th??nh',
            'Gi???ng Ri???ng',
            'G?? Quao',
            'H?? Ti??n',
            'H??n ?????t',
            'Ki??n H???i',
            'Ki??n L????ng',
            'Ph?? Qu???c',
            'T??n Hi???p',
            'U Minh Th?????ng',
            'V??nh Thu???n'
        ],
        'Kon Tum': [
            '?????k Glei',
            '?????k H??',
            '????k T??',
            "Ia H'Drai",
            'Kon Pl??ng',
            'Kon R???y',
            'Kon Tum',
            'Ng???c H???i',
            'Sa Th???y',
            'Tu M?? R??ng'
        ],
        'Lai Ch??u': [
            'Lai Ch??u',
            'M?????ng T??',
            'N???m Nh??n',
            'Phong Th???',
            'S??n H???',
            'Tam ???????ng',
            'T??n Uy??n',
            'Than Uy??n'
        ],
        'L??o Cai': [
            'B???o Th???ng',
            'B???o Y??n',
            'B??t X??t',
            'B???c H??',
            'L??o Cai',
            'M?????ng Kh????ng',
            'Sa Pa',
            'Si Ma Cai',
            'V??n B??n'
        ],
        'L???ng S??n': [
            'B???c S??n',
            'B??nh Gia',
            'Cao L???c',
            'Chi L??ng',
            '????nh L???p',
            'H???u L??ng',
            'L???ng S??n',
            'L???c B??nh',
            'Tr??ng ?????nh',
            'V??n L??ng',
            'V??n Quan'
        ],
        'L??m ?????ng': [
            'B???o L??m',
            'B???o L???c',
            'C??t Ti??n',
            'Di Linh',
            '???? L???t',
            '????? Huoai',
            '????? T???h',
            '??am R??ng',
            '????n D????ng',
            '?????c Tr???ng',
            'L???c D????ng',
            'L??m H??'
        ],
        'Long An': [
            'B???n L???c',
            'C???n ???????c',
            'C???n Giu???c',
            'Ch??u Th??nh',
            '?????c H??a',
            '?????c Hu???',
            'Ki???n T?????ng',
            'M???c H??a',
            'T??n An',
            'T??n H??ng',
            'T??n Th???nh',
            'T??n Tr???',
            'Th???nh H??a',
            'Th??? Th???a',
            'V??nh H??ng'
        ],
        'Nam ?????nh': [
            'Giao Th???y',
            'H???i H???u',
            'M??? L???c',
            'Nam ?????nh',
            'Nam Tr???c',
            'Ngh??a H??ng',
            'Tr???c Ninh',
            'V??? B???n',
            'Xu??n Tr?????ng',
            '?? Y??n'
        ],
        'Ngh??? An': [
            'Anh S??n',
            'Con Cu??ng',
            'C???a L??',
            'Di???n Ch??u',
            '???? L????ng',
            'Ho??ng Mai',
            'H??ng Nguy??n',
            'K??? S??n',
            'Nam ????n',
            'Nghi L???c',
            'Ngh??a ????n',
            'Qu??? Phong',
            'Qu??? Ch??u',
            'Qu??? H???p',
            'Qu???nh L??u',
            'T??n K???',
            'Th??i H??a',
            'Thanh Ch????ng',
            'T????ng D????ng',
            'Vinh',
            'Y??n Th??nh'
        ],
        'Ninh B??nh': [
            'Gia Vi???n',
            'Hoa L??',
            'Kim S??n',
            'Nho Quan',
            'Ninh B??nh',
            'Tam ??i???p',
            'Y??n Kh??nh',
            'Y??n M??'
        ],
        'Ninh Thu???n': [
            'B??c ??i',
            'Ninh H???i',
            'Ninh Ph?????c',
            'Ninh S??n',
            'Phan Rang-Th??p Ch??m',
            'Thu???n B???c',
            'Thu???n Nam'
        ],
        'Ph?? Th???': [
            'C???m Kh??',
            '??oan H??ng',
            'H??? H??a',
            'L??m Thao',
            'Ph?? Th???',
            'Ph?? Ninh',
            'Tam N??ng',
            'T??n S??n',
            'Thanh Ba',
            'Thanh S??n',
            'Thanh Th???y',
            'Vi???t Tr??',
            'Y??n L???p'
        ],
        'Ph?? Y??n': [
            '????ng H??a',
            '?????ng Xu??n',
            'Ph?? H??a',
            'S??ng C???u',
            'S??ng Hinh',
            'S??n H??a',
            'T??y H??a',
            'Tuy An',
            'Tuy H??a'
        ],
        'Qu???ng B??nh': [
            'Ba ?????n',
            'B??? Tr???ch',
            '?????ng H???i',
            'L??? Th???y',
            'Minh H??a',
            'Qu???ng Ninh',
            'Qu???ng Tr???ch',
            'Tuy??n H??a'
        ],
        'Qu???ng Nam': [
            'B???c Tr?? My',
            'Duy Xuy??n',
            '?????i L???c',
            '??i???n B??n',
            '????ng Giang',
            'Hi???p ?????c',
            'H???i An',
            'Nam Giang',
            'Nam Tr?? My',
            'N??ng S??n',
            'N??i Th??nh',
            'Ph?? Ninh',
            'Ph?????c S??n',
            'Qu??? S??n',
            'Tam K???',
            'T??y Giang',
            'Th??ng B??nh',
            'Ti??n Ph?????c'
        ],
        'Qu???ng Ng??i': [
            'Ba T??',
            'B??nh S??n',
            '?????c Ph???',
            'L?? S??n',
            'Minh Long',
            'M??? ?????c',
            'Ngh??a H??nh',
            'Qu???ng Ng??i',
            'S??n H??',
            'S??n T??y',
            'S??n T???nh',
            'T??y Tr??',
            'Tr?? B???ng',
            'T?? Ngh??a'
        ],
        'Qu???ng Ninh': [
            'Ba Ch???',
            'B??nh Li??u',
            'C???m Ph???',
            'C?? T??',
            '?????m H??',
            '????ng Tri???u',
            'H??? Long',
            'H???i H??',
            'Ho??nh B???',
            'M??ng C??i',
            'Qu???ng Y??n',
            'Ti??n Y??n',
            'U??ng B??',
            'V??n ?????n'
        ],
        'Qu???ng Tr???': [
            'Cam L???',
            'C???n C???',
            '??a Kr??ng',
            '????ng H??',
            'Gio Linh',
            'H???i L??ng',
            'H?????ng H??a',
            'Qu???ng Tr???',
            'Tri???u Phong',
            'V??nh Linh'
        ],
        'S??c Tr??ng': [
            'Ch??u Th??nh',
            'C?? Lao Dung',
            'K??? S??ch',
            'Long Ph??',
            'M??? T??',
            'M??? Xuy??n',
            'Ng?? N??m',
            'S??c Tr??ng',
            'Th???nh Tr???',
            'Tr???n ?????',
            'V??nh Ch??u'
        ],
        'S??n La': [
            'B???c Y??n',
            'Mai S??n',
            'M???c Ch??u',
            'M?????ng La',
            'Ph?? Y??n',
            'Qu???nh Nhai',
            'S??ng M??',
            'S???p C???p',
            'S??n La',
            'Thu???n Ch??u',
            'V??n H???',
            'Y??n Ch??u'
        ],
        'T??y Ninh': [
            'B???n C???u',
            'Ch??u Th??nh',
            'D????ng Minh Ch??u',
            'G?? D???u',
            'H??a Th??nh',
            'T??n Bi??n',
            'T??n Ch??u',
            'T??y Ninh',
            'Tr???ng B??ng'
        ],
        'Th??i B??nh': [
            '????ng H??ng',
            'H??ng H??',
            'Ki???n X????ng',
            'Qu???nh Ph???',
            'Th??i B??nh',
            'Th??i Th???y',
            'Ti???n H???i',
            'V?? Th??'
        ],
        'Th??i Nguy??n': [
            '?????i T???',
            '?????nh H??a',
            '?????ng H???',
            'Ph??? Y??n',
            'Ph?? B??nh',
            'Ph?? L????ng',
            'S??ng C??ng',
            'Th??i Nguy??n',
            'V?? Nhai'
        ],
        'Thanh H??a': [
            'B?? Th?????c',
            'B???m S??n',
            'C???m Th???y',
            '????ng S??n',
            'H?? Trung',
            'H???u L???c',
            'Ho???ng H??a',
            'Lang Ch??nh',
            'M?????ng L??t',
            'Nga S??n',
            'Ng???c L???c',
            'Nh?? Thanh',
            'Nh?? Xu??n',
            'N??ng C???ng',
            'Quan H??a',
            'Quan S??n',
            'Qu???ng X????ng',
            'S???m S??n',
            'Th???ch Th??nh',
            'Thanh H??a',
            'Thi???u H??a',
            'Th??? Xu??n',
            'Th?????ng Xu??n',
            'T??nh Gia',
            'Tri???u S??n',
            'V??nh L???c',
            'Y??n ?????nh'
        ],
        'Th???a Thi??n - Hu???': [
            'A L?????i',
            'Hu???',
            'H????ng Th???y',
            'H????ng Tr??',
            'Nam ????ng',
            'Phong ??i???n',
            'Ph?? L???c',
            'Ph?? Vang',
            'Qu???ng ??i???n'
        ],
        'Ti???n Giang': [
            'Cai L???y',
            'C??i B??',
            'Ch??u Th??nh',
            'Ch??? G???o',
            'G?? C??ng',
            'G?? C??ng ????ng',
            'G?? C??ng T??y',
            'M??? Tho',
            'T??n Ph?? ????ng',
            'T??n Ph?????c'
        ],
        'Tr?? Vinh': [
            'C??ng Long',
            'C???u K??',
            'C???u Ngang',
            'Ch??u Th??nh',
            'Duy??n H???i',
            'Ti???u C???n',
            'Tr?? C??',
            'Tr?? Vinh'
        ],
        'Tuy??n Quang': [
            'Chi??m H??a',
            'H??m Y??n',
            'L??m B??nh',
            'Na Hang',
            'S??n D????ng',
            'Tuy??n Quang',
            'Y??n S??n'
        ],
        'V??nh Long': [
            'B??nh Minh',
            'B??nh T??n',
            'Long H???',
            'Mang Th??t',
            'Tam B??nh',
            'Tr?? ??n',
            'V??nh Long',
            'V??ng Li??m'
        ],
        'V??nh Ph??c': [
            'B??nh Xuy??n',
            'L???p Th???ch',
            'Ph??c Y??n',
            'S??ng L??',
            'Tam D????ng',
            'Tam ?????o',
            'V??nh T?????ng',
            'V??nh Y??n',
            'Y??n L???c'
        ],
        'Y??n B??i': [
            'L???c Y??n',
            'M?? C??ng Ch???i',
            'Ngh??a L???',
            'Tr???m T???u',
            'Tr???n Y??n',
            'V??n Ch???n',
            'V??n Y??n',
            'Y??n B??i',
            'Y??n B??nh'
        ]
    };
    $.each(locations, function(k){
        district.append('<option value="'+k+'">'+k+'</option>');
    });
    district.live('change', function(){
        city.html('');
        $.each(locations[$(this).val()], function(k, v){
            city.append('<option value="'+v+'">'+v+'</option>');
        });
    });
    district.val('H?? N???i').trigger('change');
}

function resultBank(code)
{
    result = {
        msg: 'Giao d???ch kh??ng th??nh c??ng',
        isSuccess: false
    }
    if(code == '00')
        result.isSuccess = true;
    switch(code)
    {
        case '00':
            result.msg = 'Giao d???ch th??nh c??ng';
            break;
        case '01':
            result.msg += ': Ng??n h??ng t??? ch???i thanh to??n: th???/t??i kho???n b??? kh??a';
            break;
        case '02':
            result.msg += ': Th??ng tin th??? kh??ng h???p l???';
            break;
        case '03':
            result.msg += ': Th??? h???t h???n';
            break;
        case '04':
            result.msg += ': L???i ng?????i mua h??ng: Qu?? s??? l???n cho ph??p. (Sai OTP, qu?? h???n m???c trong ng??y)';
            break;
        case '05':
            result.msg += ': Kh??ng c?? tr??? l???i c???a Ng??n h??ng';
            break;
        case '06':
            result.msg += ': L???i giao ti???p v???i Ng??n h??ng';
            break;
        case '07':
            result.msg += ': T??i kho???n kh??ng ????? ti???n';
            break;
        case '08':
            result.msg += ': L???i d??? li???u';
            break;
        case '09':
            result.msg += ': Ki???u giao d???ch kh??ng ???????c h??? tr???';
            break;
        case '10':
            result.msg = 'Giao d???ch kh??ng th??nh c??ng';
            break;
        case '11':
            result.msg += ': Giao d???ch ch??a x??c th???c OTP';
            break;
        case '12':
            result.msg += ': Giao d???ch kh??ng th??nh c??ng, s??? ti???n giao d???ch v?????t h???n m???c ng??y';
            break;
        case '13':
            result.msg += ': Th??? ch??a ????ng k?? Internet Banking';
            break;
        case '14':
            result.msg += ': Kh??ch h??ng nh???p sai OTP';
            break;
        case '15':
            result.msg += ': Kh??ch h??ng nh???p sai th??ng tin x??c th???c';
            break;
        case '16':
            result.msg += ': Kh??ch h??ng nh???p sai t??n ch??? th???';
            break;
        case '17':
            result.msg += ': Kh??ch h??ng nh???p sai s??? th???';
            break;
        case '18':
            result.msg += ': Kh??ch h??ng nh???p sai ng??y ph??t h??nh th???';
            break;
        case '19':
            result.msg += ': Kh??ch h??ng nh???p sai ng??y h???t h???n th???';
            break;
        case '20':
            result.msg += ': OTP h???t th???i gian hi???u l???c';
            break;
        case '21':
            result.msg += ': Qu?? th???i gian th???c hi???n request (7 ph??t) ho???c OTP timeout';
            break;
        case '22':
            result.msg += ': Kh??ch h??ng ch??a x??c th???c th??ng tin th???';
            break;
        case '23':
            result.msg += ': Th??? kh??ng ????? ??i???u ki???n thanh to??n (Th???/T??i kho???n kh??ng h???p l??? ho???c TK kh??ng ????? s??? d??)';
            break;
        case '24':
            result.msg += ': Giao d???ch v?????t qu?? h???n m???c m???t l???n thanh to??n c???a ng??n h??ng';
            break;
        case '25':
            result.msg += ': Giao d???ch v?????t qu?? h???n m???c c???a ng??n h??ng';
            break;
        case '26':
            result.msg += ': Giao d???ch ch??? x??c nh???n t??? Ng??n h??ng';
            break;
        case '27':
            result.msg += ': Kh??ch h??ng nh???p sai th??ng tin b???o m???t th???';
            break;
        case '28':
            result.msg += ': Giao d???ch kh??ng th??nh c??ng do qu?? th???i gian quy ?????nh';
            break;
        case '29':
            result.msg += ': L???i x??? l?? giao d???ch t???i h??? th???ng Ng??n h??ng';
            break;
        case '99':
            result.msg += ': Kh??ng x??c ?????nh';
            break;
        default:
            result.msg = 'Giao d???ch kh??ng th??nh c??ng';
            break;
    }
    return result;
}