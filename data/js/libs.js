var dem_tab_num=0, time_tab = Array(), a_auto = Array(), auto = Array(), num_auto=0;
//sự kiện tab: tit(đối tượng click), ac(tên class active), obj(đối tượng fade), t(thời gian auto)
function add_tab(a,b,c,d,e,f){num_tab[dem_tab_num]=0,time_tab[dem_tab_num]=1;var g=dem_tab_num;$("."+a).each(function(e){$(this).click(function(){tab(a,b,c,e,g,d,f)})}),$("."+c).css({opacity:1,display:"none"}),$("."+c+":eq(0)").fadeIn(d),0!=e&&(a_auto[5*dem_tab_num+dem_tab_num]=a,a_auto[5*dem_tab_num+dem_tab_num+1]=b,a_auto[5*dem_tab_num+dem_tab_num+2]=c,a_auto[5*dem_tab_num+dem_tab_num+3]=1,a_auto[5*dem_tab_num+dem_tab_num+4]=g,a_auto[5*dem_tab_num+dem_tab_num+5]=d,automatic("tab(a["+(5*dem_tab_num+dem_tab_num)+"], a["+(5*dem_tab_num+dem_tab_num+1)+"], a["+(5*dem_tab_num+dem_tab_num+2)+"], a["+(5*dem_tab_num+dem_tab_num+3)+"], a["+(5*dem_tab_num+dem_tab_num+4)+"], a["+(5*dem_tab_num+dem_tab_num+4)+"], a["+(5*dem_tab_num+dem_tab_num+5)+"]);",e,a_auto)),dem_tab_num++}function tab(tit,ac,obj,n,index,delay,f){num_tab[index]!=n&&1==time_tab[index]&&($("."+tit+":eq("+num_tab[index]+")").removeClass(ac),$("."+tit+":eq("+n+")").addClass(ac),time_tab[index]=0,$("."+obj+":eq("+n+")").fadeIn(delay,function(){$("."+obj+":eq("+num_tab[index]+")").fadeOut(delay),a_auto[5*index+index+3]=num_tab[index]=n;var a=a_auto[5*index+index+3]++;a==$("."+tit).length-1&&(a_auto[5*index+index+3]=0),setTimeout(function(){time_tab[index]++},2*delay)}),eval(f))}

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

//canh giữa đối tượng: obj(đối tượng), position(canh giữa phía: top, left, all), delay(1000 = 1 giây)
function ver_center(a,b,c,d,e){switch("undefined"===typeof d&&(d=1),b){case"top":a.animate({marginTop:-a.height()/2+"px"},c).fadeTo(c,d);break;case"left":a.animate({marginLeft:-a.width()/2+"px"},c).fadeTo(c,d);break;default:a.animate({margin:-a.height()/2+"px 0 0 "+-a.width()/2+"px",top:"50%",left:"50%"},c).fadeTo(c,d)}setTimeout(function(){"undefined"!==typeof e&&e()},c)}
//kết thúc function canh giữa

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

//slide
function slide(class_item, class_next, class_prev, class_frame_slide, far_item, delay, time_auto)
{
    set_slide(class_item, class_frame_slide, far_item, delay);
    if(time_auto>0)
    {
        set_auto_slide(class_item, class_frame_slide, far_item, delay, time_auto);
        $('.'+class_frame_slide).hover(function(){
            clearInterval(auto[$(this).attr('index')]);
        }, function(){
            auto[$(this).attr('index')] = setInterval(function(){
                next_slide(class_item, class_frame_slide, far_item, delay);
            }, time_auto);
        });
    }
    $('.'+class_next).click(function(){
        next_slide(class_item, class_frame_slide, far_item, delay);
    });
    $('.'+class_prev).click(function(){
        prev_slide(class_item, class_frame_slide, far_item, delay);
    });
}
function set_slide(class_item, class_frame_slide, far_item, delay)
{
    var item_obj = $('.'+class_item);
    item_obj.css('position', 'absolute').parent().css('position', 'relative');
    var parent_slide = $('.'+class_frame_slide);
    parent_slide.attr({'item_width': $('.'+class_item+':eq(0)').width(), 'time_slide': 0, 'item_length': item_obj.length-1, 'pass_item': -1}).attr({'item_per_slide':Math.floor(item_obj.parent().width()/get_width_item_slide(class_frame_slide))});
    var width_item_slide = get_width_item_slide(class_frame_slide);
    for(var i=0; i<item_obj.length; i++)
        $('.'+class_item+':eq('+i+')').animate({'left':((width_item_slide+far_item)*i)+'px'}, delay);
    setTimeout(function(){
        parent_slide.attr({'time_slide': 1, 'left_end_item': (($('.'+class_item+':eq('+get_item_length_slide(class_frame_slide)+')').length<1)? 0: $('.'+class_item+':eq('+get_item_length_slide(class_frame_slide)+')').position().left)});
    }, delay*2);
}
function next_slide(class_item, class_frame_slide, far_item, delay)
{
    if(get_time_slide(class_frame_slide)==1 && get_item_length_slide(class_frame_slide)>=get_item_per_slide(class_frame_slide))
    {
        $('.'+class_frame_slide).attr({'time_slide': 0});
        var pass_item = get_item_pass_slide(class_frame_slide), parent_slide = $('.'+class_frame_slide);
        pass_item++;
        if(pass_item==get_item_length_slide(class_frame_slide)+1)
            pass_item=0;
        parent_slide.attr({'pass_item': pass_item});
        $('.'+class_item).animate({'left':'-='+(get_width_item_slide(class_frame_slide)+far_item)+'px'}, delay, function(){
            $('.'+class_item+':eq('+pass_item+')').css('left',get_item_left_slide(class_frame_slide)+'px');
        });
        setTimeout(function(){
            parent_slide.attr({'time_slide': 1});
        }, delay+10);
    }
}
function prev_slide(class_item, class_frame_slide, far_item, delay)
{
    if(get_time_slide(class_frame_slide)==1 && get_item_length_slide(class_frame_slide)>=get_item_per_slide(class_frame_slide))
    {
        $('.'+class_frame_slide).attr({'time_slide': 0});
        var pass_item = get_item_pass_slide(class_frame_slide), parent_slide = $('.'+class_frame_slide);
        if(pass_item==-1)
            pass_item = get_item_length_slide(class_frame_slide);
        $('.'+class_item+':eq('+pass_item+')').css('left', -(get_width_item_slide(class_frame_slide)+far_item)+'px');
        pass_item--;
        parent_slide.attr({'pass_item': pass_item});
        $('.'+class_item).animate({'left':'+='+(get_width_item_slide(class_frame_slide)+far_item)+'px'}, delay);
        setTimeout(function(){
            parent_slide.attr({'time_slide': 1});
        }, delay+10);
    }
}
function set_auto_slide(class_item, class_frame_slide, far_item, delay, time_auto)
{
    $('.'+class_frame_slide).attr({'index': num_auto});
    auto[num_auto] = setInterval(function(){
        next_slide(class_item, class_frame_slide, far_item, delay);
    }, time_auto);
    num_auto++;
}
function get_width_item_slide(class_frame_slide)
{
    return parseInt($('.'+class_frame_slide).attr('item_width'));
}
function get_time_slide(class_frame_slide)
{
    return parseInt($('.'+class_frame_slide).attr('time_slide'));
}
function get_item_length_slide(class_frame_slide)
{
    return parseInt($('.'+class_frame_slide).attr('item_length'));
}
function get_item_pass_slide(class_frame_slide)
{
    return parseInt($('.'+class_frame_slide).attr('pass_item'));
}
function get_item_left_slide(class_frame_slide)
{
    return parseInt($('.'+class_frame_slide).attr('left_end_item'));
}
function get_item_per_slide(class_frame_slide)
{
    return parseInt($('.'+class_frame_slide).attr('item_per_slide'));
}
//end slide
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
            console.log(params.playlist);
            if(params.controls.frameAudio.attr('ready') == '1')
                params.player.currentTime = params.playlist[num].space;
            else
                params.src = params.playlist[num].site+'/multimedia/'+params.playlist[num].mediaid+'?access=';
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
    var setPlaylists = function (playlist, cb, index) {
        if (typeof (cb) == 'function')
            cb(params);
        params.playlist = playlist;
        if (params.playlist.length==0) {
            params.player = ((typeof (params.player) != 'undefined') ? params.player : new Audio());
            params.player.volume = params.controls.volumeObj.find('div').width() / $('.dVolume').width();
            params.player.preload = "auto";
            params.src = params.playlist[params.controls.frameAudio.attr('playing')].site + '/multimedia/' + params.playlist[params.controls.frameAudio.attr('playing')].mediaid + '?access=';
        }
        if(index!=undefined && index!=-1)
        {
            params.controls.frameAudio.attr('playing', index);
            params.src = params.playlist[params.controls.frameAudio.attr('playing')].site+'/multimedia/'+params.playlist[params.controls.frameAudio.attr('playing')].mediaid+'?access=';
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
                params.player.src = params.playlist[params.controls.frameAudio.attr('playing')].site+'/multimedia/'+params.playlist[params.controls.frameAudio.attr('playing')].mediaid+'?access=';
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
                params.player.src = params.playlist[params.controls.frameAudio.attr('playing')].site+'/multimedia/'+params.playlist[params.controls.frameAudio.attr('playing')].mediaid+'?access=';
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
        return params.playlist;
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
        case"people":
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

//Cart
function add_to_cart(obj_add)
{
    $("body").append('<span email_cus="Email" name_cus="T\xean kh\xe1ch h\xe0ng" address_cus="\u0110\u1ecba ch\u1ec9" require_cus="N\u1ed9i dung" phone_cus="S\u1ed1 \u0111i\u1ec7n tho\u1ea1i" info_cus="TH\xd4NG TIN KH\xc1CH H\xc0NG" back="Quay l\u1ea1i" class="cart_support" total="T\u1ed5ng c\u1ed9ng" ask="Li\xean h\u1ec7 mua h\xe0ng" payment="GI\u1ece H\xc0NG" del_pro="B\u1ecf ch\u1ecdn" img_pro="\u1ea2nh s\u1ea3n ph\u1ea9m" name_pro="T\xean s\u1ea3n ph\u1ea9m" num_pro="S\u1ed1 l\u01b0\u1ee3ng s\u1ea3n ph\u1ea9m" price_pro="Th\xe0nh ti\u1ec1n"></span>');
    var support = $('.cart_support');
    count_product();
    obj_add.live('click', function(){
        obj = $(this);
        cart = (window.localStorage.getItem('cart')!=null)? JSON.parse(window.localStorage.getItem('cart')): {};
        cart[obj.attr('id_pro')] = {
            id_pro: obj.attr('id_pro'),
            name_pro: obj.attr('name_pro'),
            price_pro: obj.attr('price_pro'),
            img_pro: obj.attr('img_pro'),
            number: (typeof(cart[obj.attr('id_pro')])!='undefined')? cart[obj.attr('id_pro')].number+1: 1
        };
        window.localStorage.setItem('cart', JSON.stringify(cart));
        obj.html(obj.parent().attr('request_string1')).addClass('a_payment');
        $('.a_payment').html($('.a_payment').parent().attr('request_string2')).removeClass().addClass('a_buy');
        count_product();
    });
    $('.i_num_pro').live('change', function(){
        cart = (window.localStorage.getItem('cart')!=null)? JSON.parse(window.localStorage.getItem('cart')): {};
        cart[$(this).parent().prev().find('.a_del_pro').attr('id_pro')].number = parseInt($(this).val());
        window.localStorage.setItem('cart', JSON.stringify(cart));
    });
    $('.a_buy').live('click', function(){
        obj = $(this);
        cart = (window.localStorage.getItem('cart')!=null)? JSON.parse(window.localStorage.getItem('cart')): {};
        tb = '<div class="d_step1"><div style="text-align: center"><h3 class="payment">'+support.attr('payment')+'</h3><div class="d_tb"><table class="t_cart">\n\
                        <tr><th>STT</th><th>'+support.attr('img_pro')+'</th><th>'+support.attr('name_pro')+'</th><th>'+support.attr('num_pro')+'</th><th>'+support.attr('price_pro')+'</th></tr>';
        $.each(cart, function(i ,v){
            tb += '<tr><td></td><td><img class="i_pro" src="'+cart[i].img_pro+'"/></td><td>'+cart[i].name_pro+'<br/><a class="a_del_pro" id_pro="'+cart[i].id_pro+'">'+support.attr('del_pro')+'</a></td><td><input class="i_num_pro" type="text" value="'+cart[i].number+'"/></td><td><span class="s_price" price="'+cart[i].price_pro+'">'+sep_price(cart[i].price_pro)+' VN\u0110</span></td></tr>';
        });
        tb += '</table></div></div><div class="d_total"><span class="s_total1"></span>: <span class="s_total2"></span></div></div>\n\
                        <div class="d_step2"><form id="fCus" method="post"><fieldset><legend>'+support.attr('info_cus')+'</legend><div class="d_line_info"><label><span>'+support.attr("name_cus")+'</span><input name="name" class="i_name_cus" type="text"/></label></div>\n                        <div class="d_line_info"><label><span>'+support.attr("email_cus")+'</span><input name="email" class="i_email_cus" type="text"/></label></div><div class="d_line_info"><label><span>'+support.attr("phone_cus")+'</span><input name="phone" class="i_phone_cus" type="text"/></label></div>\n                        <div class="d_line_info"><label><span>'+support.attr("address_cus")+'</span><textarea class="t_address_cus"></textarea></label></div><div class="d_line_info"><label><span>'+support.attr("require_cus")+'</span><textarea class="t_req_cus"></textarea></label></div></fieldset></form>\n\
                        <fieldset class="f_payments"><legend>'+support.attr('payments')+'</legend><label><input name="payments" type="radio" value="0"/>'+support.attr('pay_val1')+'</label><label><input checked="checked" name="payments" type="radio" value="1"/>'+support.attr('pay_val2')+'</label></fieldset></div>\n\
                        <div class="d_step3"><fieldset class="f_pays"><legend>'+support.attr('pays')+'</legend><div class="d_tabs_pay">\n\
                        <a class="a_tab_pay a_active_pay">'+support.attr('tab_pay1')+'</a><a class="a_tab_pay">'+support.attr('tab_pay2')+'</a><a class="a_tab_pay">'+support.attr('tab_pay3')+'</a>\n\
                        <div class="d_tab_pay d_pay1"><p>'+support.attr('name_acc_pay')+': CÔNG TY HTBC NHA TRANG</p><p><input type="button" value="'+support.attr('passed')+'"/> '+support.attr('number_acc_pay')+':  1020 10000 425533 - <span>NH: TMCP CÔNG THƯƠNG VIỆT NAM – CN KHÁNH HÒA</span></p><p><input type="button" value="'+support.attr('passed')+'"/> '+support.attr('number_acc_pay')+': 11324319 - <span>NH: TMCP Á CHÂU – CN KHÁNH HÒA</span></p><p><input type="button" value="'+support.attr('passed')+'"/> '+support.attr('number_acc_pay')+': 471020 1000090 - <span>NH: NN&PTNT VĨNH HIỆP</span></p></div>\n\
                        <div class="d_tab_pay d_pay2"><p>'+support.attr('redirect_pay')+'</p></div>\n\
                        <div class="d_tab_pay d_pay3"><p>'+support.attr('online_pay')+'</p></div></div></fieldset>\n\
                        <field><label>'+support.attr('message_pay')+'<textarea class="t_message_pay"></textarea></label>\n\
                        </field></div><a class="a_payment2">'+support.attr('ask')+'</a>';
        $('body').append('<div class="d_content_pop" time="1"><a class="a_close_pop">x</a>\n\
                                    '+tb+'</div>\n\
                <div class="d_bg_pop"></div>');
        $('.d_bg_pop').fadeTo(300, 0.6);
        $('.d_content_pop').fadeTo(300, 1, function(){
            total_price();
            $('.s_total1').text(support.attr('total'));
        });
        $('.a_payment2').css('marginLeft', -$('.a_payment2').width()/2+'px').css("display","block");
        $('.d_tab_pay:eq(0)').css('display', 'block');
        $("#fCus").validate({
            rules:{
                name:{required:true},
                email:{required:true,email:true},
                phone:{required:true,number:true}},
            messages:{
                name:{required:tran("M\u1eddi b\u1ea1n nh\u1eadp t\xean|Enter your name, please|\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0430|\u8bf7\u8f93\u5165\u4ea7\u54c1\u540d\u79f0|\u88fd\u54c1\u540d\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044")},
                email:{required:tran("M\u1eddi b\u1ea1n nh\u1eadp email|Please enter your email|\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 emai|\u8bf7\u8f93\u5165\u60a8\u7684\u7535\u5b50\u90ae\u4ef6|\u3042\u306a\u305f\u306e\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044"),email:tran("\u0110\u1ecba ch\u1ec9 email kh\xf4ng h\u1ee3p l\u1ec7|Please enter your email|\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 e-mail|\u8bf7\u8f93\u5165\u60a8\u7684\u7535\u5b50\u90ae\u4ef6|\u3042\u306a\u305f\u306e\u30e1\u30fc\u30eb \u30a2\u30c9\u30ec\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002")},
                phone:{required:tran("M\u1eddi b\u1ea1n nh\u1eadp s\u1ed1 \u0111i\u1ec7n tho\u1ea1i|Please enter phone number|\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 emai|\u8bf7\u8f93\u5165\u60a8\u7684\u7535\u5b50\u90ae\u4ef6|\u3042\u306a\u305f\u306e\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044"),number:tran("M\u1eddi b\u1ea1n nh\u1eadp s\u1ed1|Please enter the number|\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440|\u8bf7\u8f93\u5165\u53f7\u7801|\u756a\u53f7\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044")}
            },
            submitHandler:function(){
                cart = JSON.parse(window.localStorage.getItem('cart'));
                $.ajax({
                    url: BASEURL+'/dat-hang/infoBuy',
                    type: 'POST',
                    data: {
                        cart: cart,
                        people_name: $('.i_name_cus').val(),
                        u_temail: $('.i_email_cus').val(),
                        people_phone: $('.i_phone_cus').val(),
                        people_address: $('.t_address_cus').val(),
                        people_require: $('.t_req_cus').val()
                    },
                    dataType: 'json',
                    success: function(dt){
                        window.localStorage.setItem('cart', JSON.stringify({}));
                        count_product();
                    }
                });
                alert('Cảm ơn bạn đã mua hàng tại Nội Thất Anh Khôi, chúng tôi sẽ liên hệ đến bạn sớm nhất');
                $('.a_close_pop').trigger('click');
            }
        });
    });
    $('.d_bg_pop, .a_close_pop').live('click', function(){
        $('.d_content_pop, .d_bg_pop').fadeTo(300, 0, function(){
            $(this).remove();
        });
    });
    $('.i_num_pro').live('keyup', function(){
        total_price();
    });
    $('.a_payment2').live('click', function(){
        if($('.d_content_pop').attr('time')==1)
        {
            $('.d_content_pop').attr('time', '0');
            setTimeout("$('.d_content_pop').attr('time', '1');", 1000);
            if($('td .s_price').length==0)
            {
                $('.d_content_pop, .d_bg_pop').fadeTo(300, 0, function(){
                    $(this).remove();
                });
                return;
            }
            $(this).attr('class', 'a_payment3');
            $('.d_step1').fadeOut(300, function(){
                $('.d_step2').fadeIn(300);
                $('.a_payment3').before('<a class="a_back1">'+support.attr('back')+'</a>');
            });
        }
    });
    $('.a_back1').live('click', function(){
        if($('.d_content_pop').attr('time')==1)
        {
            $('.d_content_pop').attr('time', '0');
            setTimeout("$('.d_content_pop').attr('time', '1');", 1000);
            $('.a_payment3').attr('class', 'a_payment2');
            $('.d_step2').fadeOut(300, function(){
                $('.d_step1').fadeIn(300);
                $('.a_back1').remove();
            });
        }
    });
    $('.a_payment3').live('click', function(){
        1==$(".d_content_pop").attr("time")&&($(".d_content_pop").attr("time","0"),setTimeout("$('.d_content_pop').attr('time', '1');",1e3),$("#fCus").submit())
    });
    $('.a_back2').live('click', function(){
        if($('.d_content_pop').attr('time')==1)
        {
            $('.d_content_pop').attr('time', '0');
            setTimeout("$('.d_content_pop').attr('time', '1');", 1000);
            $('.a_payment4').attr('class', 'a_payment3');
            $('.a_back2').attr('class', 'a_back1');
            $('.d_step3').fadeOut(300, function(){
                $('.d_step2').fadeIn(300);
            });
        }
    });
    $('.a_payment4').live('click', function(){
        if($('.d_content_pop').attr('time')==1)
        {
            $('.d_content_pop').attr('time', '0');
            setTimeout("$('.d_content_pop').attr('time', '1');", 1000);
            if($('.t_message_pay').val()=='')
            {
                alert(support.attr('alert'));
                return;
            }
            $(this).addClass('a_payment5').removeClass('a_payment4');
            $('.a_back2').remove();
            $.ajax({
                url:TEMPLATE_URL+"/includes/controller/ajax/get_cart.php", type:"POST", dataType:'json',
                success: function(dt){
                    $.ajax({
                        url:TEMPLATE_URL+"/includes/controller/ajax/add_cart_info.php",type:"POST",data:{'wid': '', 'fullname': $('.i_name_cus').val(), 'phone': $('.i_phone_cus').val(), 'address': $('.t_address_cus').val(), 'payments': $('.f_payments input:checked').val(), 'message': $('.t_message_pay').val()},
                        success: function(dt2){
                            finish = support.attr('finish');
                            for(i=0; i<dt.length; i++)
                            {
                                $.ajax({
                                    url:TEMPLATE_URL+"/includes/controller/ajax/add_cart_detail.php",type:"POST",data:{'id_pro':dt[i].id_pro, 'number_pro': $('.i_num_pro:eq('+i+')').val(), 'code': dt2},
                                    success: function(){
                                        $('.d_content_pop, .d_bg_pop').fadeTo(300, 0, function(){
                                            $(this).remove();
                                            if(finish!='')
                                            {
                                                $.ajax({
                                                    url:TEMPLATE_URL+"/includes/controller/ajax/del_carts.php",type:"POST",
                                                    success: function(){
                                                        total_price();
                                                        count_product();
                                                    }
                                                });
                                                alert(finish);
                                            }
                                            finish = '';
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    });
    $('.a_del_pro').live('click', function(){
        obj = $(this);
        cart = (window.localStorage.getItem('cart')!=null)? JSON.parse(window.localStorage.getItem('cart')): {};
        delete cart[obj.attr('id_pro')];
        window.localStorage.setItem('cart', JSON.stringify(cart));
        obj.parent().parent().remove();
        total_price();
        count_product();
    });
    $('.d_tab_pay input').live('click', function(){
        $('.t_message_pay').val(support.attr('passed')+' '+$(this).parent().find('span').text());
    });
    function count_product()
    {
        cart = (window.localStorage.getItem('cart')!=null)? JSON.parse(window.localStorage.getItem('cart')): {};
        $('.s_num_pro').text(Object.keys(cart).length);
    }
    function total_price()
    {
        total=0;
        for(i=0; i<$('td .s_price').length; i++)
        {
            $('td .s_price:eq('+i+')').parent().parent().find('td:eq(0)').text(i+1);
            total += (parseInt($('td .s_price:eq('+i+')').attr('price'))*$('.i_num_pro:eq('+i+')').val());
        }
        $('.s_total2').text(sep_price(String(total))+' VNĐ');
    }
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

function createPath(Text){ return Text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-'); }

function sep_price(a){
    var b=new Array,c="",d=1;
    for(c="",d=1,b=a.slice(),i=b.length-1;i>=0;i--)
        c=3==d||6==d||9==d||12==d?0==i?b[i]+c:","+b[i]+c:b[i]+c,d++;
    return c;
};

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

var checkFolow = true, topFolow = new Array();
function folow(obj, callback1, callback2)// folow
{
    if(obj.length==0)
        return;
    obj.attr('index', topFolow.length);
    topFolow[obj.attr('index')] = obj.offset().top;
    subFolow(obj, callback1, callback2);
    $(window).scroll(function(){
        subFolow(obj, callback1, callback2);
    });
}
function subFolow(obj, callback1, callback2)
{
    if(checkFolow)
    {
        if($(window).scrollTop()>=topFolow[obj.attr('index')])
        {
            checkFolow = false;
            obj.css({'position': 'fixed'});
            if(typeof(callback1==='function'))
                callback1();
        }
    }
    else
    if($(window).scrollTop()<topFolow[obj.attr('index')])
    {
        checkFolow = true;
        obj.css({position: 'relative'});
        if(typeof(callback2==='function'))
            callback2();
    }
}//End folow

var id_feild=new Array,search_auto,lang,map=["vi","en","ru","ch","ja"],sep="|",lang_i=0,checkFolow=!0,topFolow=new Array;

//Sự kiện weel
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
    d.text('Ngày '+date[2]+'/'+date[1]+'/'+date[0]+' lúc '+time[0]+':'+time[1]);
    return;
    switch(day.getDay())
    {
        case 0:
            day = tran('Chủ nhật|Sunday|Воскресенье|星期日|日曜日');
            break;
        case 1:
            day = tran('Thứ hai|Monday|Понедельник|星期一|月曜日');
            break;
        case 2:
            day = tran('Thứ ba|Tuesday|Вторник|星期二|火曜日');
            break;
        case 3:
            day = tran('Thứ tư|Wednesday|Среда|（星期三）|水曜日');
            break;
        case 4:
            day = tran('Thứ năm|Thursday|Четверг|星期四|木曜日');
            break;
        case 5:
            day = tran('Thứ sáu|Friday|Пятница|星期五|金曜日');
            break;
        case 6:
            day = tran('Thứ bảy|Saturday|Суббота|星期六|土曜日');
            break;
    }
    d.text(day+' ngày '+date[2]+'/'+date[1]+'/'+date[0]+' lúc '+time);
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
        }
        if(params.sub_params.body_width>=800+params.sub_params.trap_width && params.sub_params.body_width<=1000+params.sub_params.trap_width)
        {
            if(typeof(params.w_800_1000_f)==='function')
                params.w_800_1000_f(params);
        }
        if(params.sub_params.body_width>=768+params.sub_params.trap_width && params.sub_params.body_width<=800+params.sub_params.trap_width)
        {
            if(typeof(params.w_768_800_f)==='function')
                params.w_768_800_f(params);
        }
        if(params.sub_params.body_width>=590+params.sub_params.trap_width && params.sub_params.body_width<=768+params.sub_params.trap_width)//phone
        {
            if(typeof(params.w_590_768_f)==='function')
                params.w_590_768_f(params);
        }
        if(params.sub_params.body_width>=480+params.sub_params.trap_width && params.sub_params.body_width<=590+params.sub_params.trap_width)
        {
            if(typeof(params.w_480_590_f)==='function')
                params.w_480_590_f(params);
        }
        if(params.sub_params.body_width>=200+params.sub_params.trap_width && params.sub_params.body_width<=480+params.sub_params.trap_width)
        {
            if(typeof(params.w_320_480_f)==='function')
                params.w_320_480_f(params);
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
            marker: 'https://www.wsup3.cf/data/media/marker_57a57281e7e90.png'
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
                align.topleft($(this), $(this).parent(), 0, 300, 1);
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
        obj.fadeTo(time, 1, function(){
            if(typeof(callback)=='function')
                callback(obj);
        });
    };
    var hidezoomout = function(obj, time, callback){
        obj.fadeTo(time, 0, function(){
            obj.css({display: 'none', opacity: 1});
            if(typeof(callback)=='function')
                callback(obj);
        });
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
                params.thing.title = tran('Sản phẩm|Product||');
                break;
            case 'dBoardAddProduct':
                params.thing.title = tran('Thêm sản phẩm|Add product||');
                break;
            case 'dBoardAddProductImg':
                params.thing.title = tran('Thêm ảnh sản phẩm|Add product image||');
                break;
            case 'dBoardEditProduct':
                params.thing.title = tran('Chỉnh sửa sản phẩm|Edit product||');
                break;
            case 'dBoardProducts':
                params.thing.title = tran('Danh sách sản phẩm|List product||');
                break;
            case 'dBoardAddCategory':
                params.thing.title = tran('Thêm chuyên mục|Add category||');
                break;
            case 'dBoardAddCategoryImg':
                params.thing.title = tran('Thêm ảnh chuyên mục|Add category image||');
                break;
            case 'dBoardEditCategory':
                params.thing.title = tran('Chỉnh sửa chuyên mục|Edit category||');
                break;
            case 'dBoardCategories':
                params.thing.title = tran('Danh sách chuyên mục|List categories||');
                break;
            case 'dBoardAddPage':
                params.thing.title = tran('Thêm chuyên trang|Add page||');
                break;
            case 'dBoardAddPageImg':
                params.thing.title = tran('Thêm ảnh chuyên trang|Add page image||');
                break;
            case 'dBoardEditPage':
                params.thing.title = tran('Chỉnh sửa chuyên trang|Edit page||');
                break;
            case 'dBoardPages':
                params.thing.title = tran('Danh sách chuyên trang|List pages||');
                break;
            case 'dBoardRecording':
                params.thing.title = tran('Quay video|Recording||');
                break;
            case 'dBoardImages':
                params.thing.title = tran('Ảnh|Photos||');
                break;
            case 'dBoardReportImport':
                params.thing.title = tran('Báo cáo nhập hàng|Import report||');
                break;
            case 'dBoardBillImport':
                params.thing.title = tran('Chi tiết báo cáo nhập hàng|Detail import report||');
                break;
            case 'dBoardDateReport':
                params.thing.title = tran('Báo cáo doanh thu theo ngày|Date report||');
                break;
            case 'dBoardBillDetail':
                params.thing.title = tran('Chi tiết báo cáo doanh thu theo ngày|Detail date report||');
                break;
            case 'dBoardLogin':
                params.thing.title = tran('Đăng nhập|Login||');
                break;
            case 'dBoardUser':
                params.thing.title = tran('Người dùng|User||');
                break;
            case 'dBoardRegister':
                params.thing.title = tran('Đăng ký|Register||');
                break;
            case 'dBoardForgot':
                params.thing.title = tran('Quên mật khẩu|Forgot password||');
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
                params.thing.title = 'Đuổi Hình Bắt Chữ';
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
            title: tran('Danh sách ứng dụng|List application||'),
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
                animate.showzoomout(page, 288, function(){
                    page.addClass(cls);
                    if(typeof(callBack.fn)=='function')
                        callBack.fn(callBack.params);
                });
            });
        else
            animate.hidezoomout($('.'+cls), 288, function(){
                $('.'+cls).removeClass(cls);
                animate.showzoomout(page, 288, function(){
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

var Cazs = function(p){
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
                        people: JSON.parse((web.done(window.localStorage.getItem('people'), null))),
                        flags: JSON.parse((web.done(window.localStorage.getItem('flags'), null))),
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
        if(params.ip!= '')
        {
            jobs[0].then(function (itm) {
                //socket.io.on("close", tryReconnect);
                if(params.disconnected == true)
                    socket = io.connect(BASEURL, {reconnect: true});
                itm.reqData.ip = params.ip;
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
        }
    };
    var tryReconnect = function(){
        setTimeout(function(){
            socket.io.open(function(err){
                if(err)
                  tryReconnect();
            });
        });
    };
    var jobs = [], jobs2 = [];
    var callEnd = function(fn){
        if(fn)
            callEnd = fn;
    };
    var callEnd2 = function(fn){
        if(fn)
            callEnd2 = fn;
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
//    var socket = io({
//        reconnection: true,
//        transports: ["websocket", "polling"]
//    });
    var socket = io.connect(BASEURL, {reconnect: true});
    var params = {
        page: PAGE,
        path: PATH,
        ip: '',
        secure: '',
        lReq: null,
        lHome: null,
        dateObj: new Date(),
        disconnected: false,
        code: '',
        wpReadyFn: false
    };
    socket.on('setIp', function(ips){
        if(params.ip=='')// || params.secure!=ips.secure)
        {
            console.log(params);
            console.log(ips);
            params.ip = ips.ip;
            if(params.wpReadyFn != false)
            {
                socket.removeListener(params.ip+params.secure);
                params.secure = ips.secure;
                wpReady(params.wpReadyFn);
            }
            else
                params.secure = ips.secure;
            if(params.lReq!=null)
            {
                jobs[0] = params.lReq;
                iReq(false);
            }
        }
    });
    var wReady = function(people, fn){
        socket.on(people.pead, function(md){
            if(typeof(fn)=='function')
                fn(md);
        });
    };
    var wHome = function(path, fn){
        socket.on(path, function(md){
            if(typeof(fn)=='function')
                fn(md);
        });
    };
    var iHome = function(ques, callback){
        socket.emit('req', {
            params: ques,
            ip: params.ip,
            key: String(Math.round(Math.random()*666666)),
            history: backmap.getHistories(),
            people: JSON.parse((web.done(window.localStorage.getItem('people'), null))),
            flags: JSON.parse((web.done(window.localStorage.getItem('flags'), null))),
            BASEURL: BASEURL,
            page: params.page,
            now: dateTimeObj.getNow()
        });
    };
    var wpReady = function(fn){
        params.wpReadyFn = fn;
        socket.on(params.ip+params.secure, function(md){
            if(typeof(fn)=='function')
                fn(md);
        });
    };
    var wpRes = function(reqData){
        socket.emit(params.ip+params.secure, reqData);
    };
//    socket.on('reload', function(){
//        var xmlHttp = new XMLHttpRequest();
//        xmlHttp.onreadystatechange = function() {
//            if (this.readyState == 4 && this.status == 200 && params.lReq != null) {
//                jobs[0] = params.lReq;
//                iReq(false);
//            }
//        };
//        xmlHttp.open( "GET", BASEURL+'/'+PATH, false);
//        console.log(BASEURL+'/'+PATH);
//        xmlHttp.send({});
//    });
    params = $.extend({}, params, p);
    return {
        iReq: iReq,
        iHome: iHome,
        wReady: wReady,
        wHome: wHome,
        wpReady: wpReady,
        wpRes: wpRes,
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

var wChat = function(web, people){
    web.iReq({ action: 'iGetAppData' }, function (dt) {
        chats = dt.chats;
        if (chats.length > 0)
        {
            $('.dAppFriends .dNotify .sNumber').text(chats.length);
            $('.dAppFriends .dNotify').fadeIn(300);
        }
        else
        {
            $('.dAppFriends .dNotify').fadeOut(300,function(){
                $('.dAppFriends .dNotify .sNumber').text(chats.length);
            });
            $('.dBoardFriends .sBtnMore').attr('type', 'mfriend');
        }
    });
    web.wReady(people, function (md) {
        switch (md.type) {
            case 'tranfer':
                if (md.pead != people.pead) {
                    $('.sTalk:eq(' + md.index + ')').trigger('click');
                    temp = $.extend({}, JSON.parse((($('.iChatRers').val()=='')? '{}': $('.iChatRers').val())), JSON.parse(md.rers));
                    if (Object.keys(temp).length == Object.keys(JSON.parse(md.rers)).length) {
                        $('.dTalkDetail > div').append('<div>' +
                            '<div class="dChatBg"></div>' +
                            '<div class="dChat">' +
                            '<a class="aVatar"><img src="' + ((people.image != '') ? people.image : SKIN + '/logo.png') + '" alt="wsup3"/></a><img src="' + md.info + '" alt="wsup3"/>' +
                            '<a class="aChatOpt">.</a></div>' +
                            '</div>');
                        $('.dTalkDetail').animate({ scrollTop: $('.dTalkDetail > div').height() + 43 }, 200);
                    }
                }
                break;
            case 'talk':
                temp = $.extend({}, JSON.parse((($('.iChatRers').val()=='')? '{}': $('.iChatRers').val())), JSON.parse(md.rers));
                if (Object.keys(temp).length == Object.keys(JSON.parse(md.rers)).length) {
                    $('.dChatText').html(md.chat.detail);
                    if (md.pead != people.pead)
                    {
                        switch(backmap.see().page) {
                            case 'dBoardTalk':
                                console.log(md.chat.detail);
                                $('.dTalkDetail > div').append('<div>' +
                                    '<div class="dChatBg"></div>' +
                                    '<div class="dChat' + ((md.pead == people.pead) ? ' dMe' : '') + '">' +
                                    '<a class="aVatar"><img src="' + ((people.image != '') ? people.image : SKIN + '/logo.png') + '" alt="wsup3"/></a>' + $('.dChatText').text() +
                                    '<a class="aChatOpt">.</a></div>' +
                                    '</div>');
                                web.iReq({ action: 'iReaded', chat: md.chat, pead: people.pead }, function () {
                                    web.iReq({ action: 'iGetAppData' }, function (dt) {
                                        chats = dt.chats;
                                        if (chats.length > 0)
                                        {
                                            $('.dAppFriends .dNotify .sNumber').text(chats.length);
                                            $('.dAppFriends .dNotify').fadeIn(300);
                                        }
                                        else
                                        {
                                            $('.dAppFriends .dNotify').fadeOut(300,function(){
                                                $('.dAppFriends .dNotify .sNumber').text(chats.length);
                                            });
                                        }
                                        $('#fFriends').html('');
                                        $('.dBoardFriends .sBtnMore').attr('type', 'messenges');
                                    });
                                });
                                break;
                            case 'dBoardFriends':
                                $('#fFriends').html('');
                                $('.dBoardFriends .sBtnMore').attr('type', 'messenges').fadeIn(300, function(){
                                    $(this).trigger('click');
                                });
                                break;
                            default:
                                web.iReq({ action: 'iGetAppData' }, function (dt) {
                                    chats = dt.chats;
                                    if (chats.length > 0) {
                                        $('.dAppFriends .dNotify .sNumber').text(chats.length);
                                        $('.dAppFriends .dNotify').fadeIn(300);
                                    }
                                    $('#fFriends').html('');
                                    $('.dBoardFriends .sBtnMore').attr('type', 'messenges');
                                });
                                break;
                        }
                    }
                    else
                        $('.dTalkDetail > div').append('<div>' +
                            '<div class="dChatBg"></div>' +
                            '<div class="dChat' + ((md.pead == people.pead) ? ' dMe' : '') + '">' +
                            '<a class="aVatar"><img src="' + ((people.image != '') ? people.image : SKIN + '/logo.png') + '" alt="wsup3"/></a>' + $('.dChatText').text() +
                            '<a class="aChatOpt">.</a></div>' +
                            '</div>');
                    $('.dTalkDetail').animate({ scrollTop: $('.dTalkDetail > div').height() + 33 + 10 }, 200);
                }
                break;
            case 'accessScreen':
                if (md.pead != people.pead) {
                    location.hash = people._id + "¬accessScreen";
                    (typeof (iGetScreen) != 'undefined') ? clearInterval(iGetScreen) : '';
                    iGetScreen = setInterval(function () {
                        temp = decodeURIComponent(location.hash).split('#');
                        temp = temp[1].split('¬');
                        if (temp[1] == 'screen64') {
                            clearInterval(iGetScreen);
                            iGetScreen = undefined;
                            web.iReq({ action: 'wTranfer', rers: md.rers, info: 'data:image/jpeg;base64,' + temp[2], index: md.index }, function () { });
                        }
                    }, 1600);
                }
                break;
            case 'accessScreens':
                if (md.pead != people.pead) {
                    location.hash = people._id + "¬accessScreens";
                    (typeof (iGetScreen) != 'undefined') ? clearInterval(iGetScreen) : '';
                    iGetScreen = setInterval(function () {
                        if (location.hash.split('#')[1].split('¬')[1] == 'screen64') {
                            web.iReq({ action: 'wTranfer', rers: md.rers, info: 'data:image/jpeg;base64,' + location.hash.split('#')[1].split('¬')[2], index: md.index }, function () { });
                            location.hash = people._id + "¬accessScreens";
                        }
                    }, 600);
                }
                break;
            case 'accessUpdate':
                if (md.pead != people.pead) {
                    location.hash = people._id + "¬accessUpdate";
                }
                break;
            case 'done':
                if (md.pead != people.pead) {
                    if (typeof (iGetScreen) != 'undefined') {
                        clearInterval(iGetScreen);
                        iGetScreen = undefined;
                    }
                    location.hash = people._id + "¬done";
                }
                break;
        }
    });
}

var cAvr = ['i', 'ii', 'is', 'it', 'iz', 'j', 'jj', 's', 'si', 'ss', 'st', 'sz', 't', 'ts', 'tt', 'tz', 'z', 'zi', 'zs', 'zt', 'zz'];

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
            $(me).html($(me).html().replace("&gt;:)",'<img src="'+FRONTEND+'/images/emo1/19.gif" alt="private" title="Yêu tinh|Demon"/>'));
        while($(me).html().indexOf(":))")>-1)
            $(me).html($(me).html().replace(":))",'<img src="'+FRONTEND+'/images/emo1/21.gif" alt="private" title="Cười lớn|Laughs"/>'));
        while($(me).html().indexOf("/:)")>-1)
            $(me).html($(me).html().replace("/:)",'<img src="'+FRONTEND+'/images/emo1/23.gif" alt="private" title="Nhíu mày|Frowned"/>'));
        while($(me).html().indexOf(":)")>-1)
            $(me).html($(me).html().replace(":)",'<img src="'+FRONTEND+'/images/emo1/1.gif" alt="private" title="Vui vẻ|Fun"/>'));
        while($(me).html().indexOf(":((")>-1)
            $(me).html($(me).html().replace(":((",'<img src="'+FRONTEND+'/images/emo1/20.gif" alt="private" title="Khóc|Cries"/>'));
        while($(me).html().indexOf(":(")>-1)
            $(me).html($(me).html().replace(":(",'<img src="'+FRONTEND+'/images/emo1/2.gif" alt="private" title="Buồn|Sad"/>'));
        while($(me).html().indexOf(";;)")>-1)
            $(me).html($(me).html().replace(";;)",'<img src="'+FRONTEND+'/images/emo1/5.gif" alt="private" title="Đá lông nheo|Signal"/>'));
        while($(me).html().indexOf(";)")>-1)
            $(me).html($(me).html().replace(";)",'<img src="'+FRONTEND+'/images/emo1/3.gif" alt="private" title="Nháy mắt|blink"/>'));
        while($(me).html().indexOf("&gt;:D&lt;")>-1)
            $(me).html($(me).html().replace("&gt;:D&lt;",'<img src="'+FRONTEND+'/images/emo1/6.gif" alt="private" title="Ôm|Hug"/>'));
        while($(me).html().indexOf(":D")>-1)
            $(me).html($(me).html().replace(":D",'<img src="'+FRONTEND+'/images/emo1/4.gif" alt="private" title="Cười nhe răng|Laugh"/>'));
        while($(me).html().indexOf(":-/")>-1)
            $(me).html($(me).html().replace(":-/",'<img src="'+FRONTEND+'/images/emo1/7.gif" alt="private" title="Bối rối|Confused"/>'));
        while($(me).html().indexOf(":x")>-1)
            $(me).html($(me).html().replace(":x",'<img src="'+FRONTEND+'/images/emo1/8.gif" alt="private" title="Yêu rồi|Love"/>'));
        while($(me).html().indexOf(':"&gt;')>-1)
            $(me).html($(me).html().replace(':"&gt;','<img src="'+FRONTEND+'/images/emo1/9.gif" alt="private" title="Thẹn thùng|Shy"/>'));
        while($(me).html().indexOf("&lt;:-P")>-1)
            $(me).html($(me).html().replace("&lt;:-P",'<img src="'+FRONTEND+'/images/emo1/36.gif" alt="private" title="Cổ vũ|Cheerleader"/>'));
        while($(me).html().indexOf(":P")>-1)
            $(me).html($(me).html().replace(":P",'<img src="'+FRONTEND+'/images/emo1/10.gif" alt="private loll" title="Lè lưỡi|tongue loll"/>'));
        while($(me).html().indexOf(":-*")>-1)
            $(me).html($(me).html().replace(":-*",'<img src="'+FRONTEND+'/images/emo1/11.gif" alt="private" title="Hôn|Kiss"/>'));
        while($(me).html().indexOf("=((")>-1)
            $(me).html($(me).html().replace("=((",'<img src="'+FRONTEND+'/images/emo1/12.gif" alt="private" title="Thất tình|Lost love"/>'));
        while($(me).html().indexOf(":-O")>-1)
            $(me).html($(me).html().replace(":-O",'<img src="'+FRONTEND+'/images/emo1/13.gif" alt="private" title="Ngạc nhiên|Suprise"/>'));
        while($(me).html().indexOf("X-(")>-1)
            $(me).html($(me).html().replace("X-(",'<img src="'+FRONTEND+'/images/emo1/14.gif" alt="private" title="Giận dữ|Angry"/>'));
        while($(me).html().indexOf(":&gt;")>-1)
            $(me).html($(me).html().replace(":&gt;",'<img src="'+FRONTEND+'/images/emo1/15.gif" alt="private" title="Vênh mặt|Challenges"/>'));
        while($(me).html().indexOf("B-)")>-1)
            $(me).html($(me).html().replace("B-)",'<img src="'+FRONTEND+'/images/emo1/16.gif" alt="private" title="Ngầu|Cool"/>'));
        while($(me).html().indexOf("#:-S")>-1)
            $(me).html($(me).html().replace("#:-S",'<img src="'+FRONTEND+'/images/emo1/18.gif" alt="private" title="Nhẹ nhõm|Relief"/>'));
        while($(me).html().indexOf(":-S")>-1)
            $(me).html($(me).html().replace(":-S",'<img src="'+FRONTEND+'/images/emo1/17.gif" alt="private" title="Lo lắng|Worry"/>'));
        while($(me).html().indexOf("(:|")>-1)
            $(me).html($(me).html().replace("(:|",'<img src="'+FRONTEND+'/images/emo1/37.gif" alt="private" title="Buồn ngủ|Sleepy"/>'));
        while($(me).html().indexOf(":|")>-1)
            $(me).html($(me).html().replace(":|",'<img src="'+FRONTEND+'/images/emo1/22.gif" alt="private" title="Chịu|Bear"/>'));
        while($(me).html().indexOf("=))")>-1)
            $(me).html($(me).html().replace("=))",'<img src="'+FRONTEND+'/images/emo1/24.gif" alt="private" title="Cười đau bụng|Laugh abdominal pain"/>'));
        while($(me).html().indexOf("O:-)")>-1)
            $(me).html($(me).html().replace("O:-)",'<img src="'+FRONTEND+'/images/emo1/25.gif" alt="private" title="Thiên thần|Angel"/>'));
        while($(me).html().indexOf(":-B")>-1)
            $(me).html($(me).html().replace(":-B",'<img src="'+FRONTEND+'/images/emo1/26.gif" alt="private" title="Mọt sách|bookworm"/>'));
        while($(me).html().indexOf("=;")>-1)
            $(me).html($(me).html().replace("=;",'<img src="'+FRONTEND+'/images/emo1/27.gif" alt="private" title="Đủ rồi|Enough"/>'));
        while($(me).html().indexOf("|-)")>-1)
            $(me).html($(me).html().replace("|-)",'<img src="'+FRONTEND+'/images/emo1/28.gif" alt="private" title="Ngủ|Sleep"/>'));
        while($(me).html().indexOf("8-|")>-1)
            $(me).html($(me).html().replace("8-|",'<img src="'+FRONTEND+'/images/emo1/29.gif" alt="private" title="Tròn mắt|Goggle"/>'));
        while($(me).html().indexOf("L-)")>-1)
            $(me).html($(me).html().replace("L-)",'<img src="'+FRONTEND+'/images/emo1/30.gif" alt="private" title="Yếu mà ra gió|Contempt"/>'));
        while($(me).html().indexOf(":-&amp;")>-1)
            $(me).html($(me).html().replace(":-&amp;",'<img src="'+FRONTEND+'/images/emo1/31.gif" alt="private" title="Tái mặt|Pale"/>'));
        while($(me).html().indexOf(":-$")>-1)
            $(me).html($(me).html().replace(":-$",'<img src="'+FRONTEND+'/images/emo1/32.gif" alt="private" title="Im lặng|Silent"/>'));
        while($(me).html().indexOf("[-(")>-1)
            $(me).html($(me).html().replace("[-(",'<img src="'+FRONTEND+'/images/emo1/33.gif" alt="private" title="Không thèm nói|Arms crossed"/>'));
        while($(me).html().indexOf(":O)")>-1)
            $(me).html($(me).html().replace(":O)",'<img src="'+FRONTEND+'/images/emo1/34.gif" alt="private" title="Con heo|Pig"/>'));
        while($(me).html().indexOf("8-}")>-1)
            $(me).html($(me).html().replace("8-}",'<img src="'+FRONTEND+'/images/emo1/35.gif" alt="private" title="Điên cuồng|Crazy"/>'));
        while($(me).html().indexOf("=P~")>-1)
            $(me).html($(me).html().replace("=P~",'<img src="'+FRONTEND+'/images/emo1/38.gif" alt="private" title="Thèm|Cravings"/>'));
        while($(me).html().indexOf(":-?")>-1)
            $(me).html($(me).html().replace(":-?",'<img src="'+FRONTEND+'/images/emo1/39.gif" alt="private" title="Suy nghỉ|pensive"/>'));
        while($(me).html().indexOf("#-o")>-1)
            $(me).html($(me).html().replace("#-o",'<img src="'+FRONTEND+'/images/emo1/40.gif" alt="private" title="Trời ơi|God"/>'));
        while($(me).html().indexOf(":v")>-1)
            $(me).html($(me).html().replace(":v",'<img src="'+FRONTEND+'/images/emo1/41.png" alt="private" title="Cười há hốc mồm|Laughs"/>'));
        while($(me).html().indexOf(":'(")>-1)
            $(me).html($(me).html().replace(":'(",'<img src="'+FRONTEND+'/images/emo1/42.png" alt="private" title="Khóc|Cries"/>'));
        while($(me).html().indexOf("^_^")>-1)
            $(me).html($(me).html().replace("^_^",'<img src="'+FRONTEND+'/images/emo1/43.png" alt="private" title="Vui vẻ|Fun"/>'));
        while($(me).html().indexOf("-_-")>-1)
            $(me).html($(me).html().replace("-_-",'<img src="'+FRONTEND+'/images/emo1/44.png" alt="private" title="Không quan tâm|Arms crossed"/>'));
        while($(me).html().indexOf("&gt;:o")>-1)
            $(me).html($(me).html().replace("&gt;:o",'<img src="'+FRONTEND+'/images/emo1/45.png" alt="private" title="Nham hiểm|sneaking"/>'));
        while($(me).html().indexOf(":3")>-1)
            $(me).html($(me).html().replace(":3",'<img src="'+FRONTEND+'/images/emo1/46.png" alt="private" title="Thăng hoa|sublimation"/>'));
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
                            thisUser = dt.people;
                            window.localStorage.setItem('people', JSON.stringify(dt.people));
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
                    thisUser = dt.people;
                    window.localStorage.setItem('people', JSON.stringify(dt.people));
                    window.localStorage.setItem('languages', JSON.stringify(dt.languages));
                    $('.dHasUser .dSubMenu a').attr('title', dt.people.displayname);
                    $('.dNoUser').fadeOut(200, function(){
                        $('.dHasUser').fadeIn(200, function(){
                            $('.dSubMenu > a:eq(0) img').attr('src', dt.people.image).load(function(){
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
        p += '<a class="aArowStyle" page="1" title="'+tran('Trang đầu|First page|||')+'">&laquo;</a>';
    if(pageQuery-1>0)
        p += '<a class="aArowStyle" page="'+(pageQuery-1)+'" title="'+tran('Trang|Page|||')+' '+(pageQuery-1)+'">&lsaquo;</a>';
    for(var page = pageQuery-4; page <= pageQuery+4; page++)
        if(page>0 && page<=totalPages)
            p += '<a '+((page == pageQuery)? 'class="aPageAct"': '')+' page="'+page+'" title="'+tran('Trang|Page|||')+' '+page+'">'+page+'</a>';
    if(pageQuery+1<=totalPages)
        p += '<a class="aArowStyle" page="'+(pageQuery+1)+'" title="'+tran('Trang|Page|||')+' '+(pageQuery+1)+'">&rsaquo;</a>';
    if(pageQuery+2<=totalPages)
        p += '<a class="aArowStyle" page="'+totalPages+'" title="'+tran('Trang cuối|Last page|||')+'">&raquo;</a></div>';
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

function ofGroup(obj)
{
    switch (obj.group) {
        case 1:
            return tran('Quản lý|Admin|Администратор|管理员|管理者');
            break;
        case 2:
            return tran('Khách hàng|Customer|Клиента|顾客|顧客');
            break;
        case 3:
            return tran('Nhân viên|Staff|Сотрудников|员工|スタッフ');
            break;
        case 5:
            return tran('Người dùng|User|Администратор|管理员|管理者');
            break;
        case 6:
            return tran('Siêu quản lý|Super Admin|Супер администратор|超级管理员|スーパー管理者');
            break;
    }
}
function selectLocation(district, city)
{
    locations = {
        'An Giang': [
            'An Phú',
            'Châu Đốc',
            'Châu Phú',
            'Châu Thành',
            'Chợ Mới',
            'Long Xuyên',
            'Phú Tân',
            'Tân Châu',
            'Thoại Sơn',
            'Tịnh Biên',
            'Tri Tôn'
        ],
        'Bà Rịa - Vũng Tàu': [
            'Bà Rịa',
            'Châu Đức',
            'Côn Đảo',
            'Đất Đỏ',
            'Long Điền',
            'Tân Thành',
            'Vũng Tàu',
            'Xuyên Mộc'
        ],
        'Bạc Liêu': [
            'Bạc Liêu',
            'Đông Hải',
            'Giá Rai',
            'Hòa Bình',
            'Hồng Dân',
            'Phước Long',
            'Vĩnh Lợi'
        ],
        'Bắc Kạn': [
            'Ba Bể',
            'Bạch Thông',
            'Bắc Kạn',
            'Chợ Đồn',
            'Chợ Mới',
            'Na Rì',
            'Ngân Sơn',
            'Pác Nặm'
        ],
        'Bắc Giang': [
            'Bắc Giang',
            'Hiệp Hòa',
            'Lạng Giang',
            'Lục Nam',
            'Lục Ngạn',
            'Sơn Động',
            'Tân Yên',
            'Việt Yên',
            'Yên Dũng',
            'Yên Thế'
        ],
        'Bắc Ninh': [
            'Bắc Ninh',
            'Gia Bình',
            'Lương Tài',
            'Quế Võ',
            'Thuận Thành',
            'Tiên Du',
            'Từ Sơn',
            'Yên Phong'
        ],
        'Bến Tre': [
            'Ba Tri',
            'Bến Tre',
            'Bình Đại',
            'Châu Thành',
            'Chợ Lách',
            'Giồng Trôm',
            'Mỏ Cày Bắc',
            'Mỏ Cày Nam',
            'Thạnh Phú'
        ],
        'Bình Dương': [
            'Bàu Bàng',
            'Bắc Tân Uyên',
            'Bến Cát',
            'Dầu Tiếng',
            'Dĩ An',
            'Phú Giáo',
            'Tân Uyên',
            'Thủ Dầu Một',
            'Thuận An'
        ],
        'Bình Định': [
            'An Lão',
            'An Nhơn',
            'Hoài Ân',
            'Hoài Nhơn',
            'Phù Cát',
            'Phù Mỹ',
            'Quy Nhơn',
            'Tây Sơn',
            'Tuy Phước',
            'Vân Canh',
            'Vĩnh Thạnh'
        ],
        'Bình Phước': [
            'Bình Long',
            'Bù Đăng',
            'Bù Đốp',
            'Bù Gia Mập',
            'Chơn Thành',
            'Đồng Phú',
            'Đồng Xoài',
            'Hớn Quản',
            'Lộc Ninh',
            'Phú Riềng',
            'Phước Long'
        ],
        'Bình Thuận': [
            'Bắc Bình',
            'Đức Linh',
            'Hàm Tân',
            'Hàm Thuận Bắc',
            'Hàm Thuận Nam',
            'La Gi',
            'Phan Thiết',
            'Phú Quý',
            'Tánh Linh',
            'Tuy Phong'
        ],
        'Cà Mau': [
            'Cà Mau',
            'Cái Nước',
            'Đầm Dơi',
            'Năm Căn',
            'Ngọc Hiển',
            'Phú Tân',
            'Thới Bình',
            'Trần Văn Thời',
            'U Minh'
        ],
        'Cao Bằng': [
            'Bảo Lạc',
            'Bảo Lâm',
            'Cao Bằng',
            'Hà Quảng',
            'Hạ Lang',
            'Hòa An',
            'Nguyên Bình',
            'Phục Hòa',
            'Quảng Uyên',
            'Thạch An',
            'Thông Nông',
            'Trà Lĩnh',
            'Trùng Khánh'
        ],
        'Cần Thơ': [
            'Bình Thủy',
            'Cái Răng',
            'Cờ Đỏ',
            'Ninh Kiều',
            'Ô Môn',
            'Thốt Nốt',
            'Thới Lai',
            'Vĩnh Thạnh'
        ],
        'Đà Nẵng': [
            'Cẩm Lệ',
            'Hải Châu',
            'Hòa Vang',
            'Hoàng Sa',
            'Liên Chiểu',
            'Ngũ Hành Sơn',
            'Sơn Trà',
            'Thanh Khê'
        ],
        'Đắk Lắk': [
            'Buôn Đôn',
            'Buôn Hồ',
            'Buôn Ma Thuột',
            'Cư Kuin',
            "Cư M'gar",
            "Ea H'leo",
            'Ea Kar',
            'Krông Ana',
            'Krông Bông',
            'Krông Búk',
            'Krông Năng',
            'Krông Pắk',
            'Lắk',
            "M'Đrăk"
        ],
        'Đắk Nông': [
            'Cư Jút',
            'Đắk Glong',
            'Đắk Mil',
            "Đắk R'lấp",
            'Đăk Song',
            'Gia Nghĩa',
            'Krông Nô',
            'Tuy Đức'
        ],
        'Đồng Nai': [
            'Biên Hòa',
            'Cẩm Mỹ',
            'Định Quán',
            'Long Khánh',
            'Long Thành',
            'Nhơn Trạch',
            'Tân Phú',
            'Thống Nhất',
            'Trảng Bom',
            'Vĩnh Cửu',
            'Xuân Lộc'
        ],
        'Đồng Tháp': [
            'Cao Lãnh',
            'Châu Thành',
            'Hồng Ngự',
            'Lai Vung',
            'Lấp Vò',
            'Sa Đéc',
            'Tam Nông',
            'Tân Hồng',
            'Thanh Bình',
            'Tháp Mười'
        ],
        'Điện Biên': [
            'Điện Biên',
            'Điện Biên Đông',
            'Điện Biên Phủ',
            'Mường Ảng',
            'Mường Chà',
            'Mường Lay',
            'Mường Nhé',
            'Nậm Pồ',
            'Tủa Chùa',
            'Tuần Giáo'
        ],
        'Gia Lai': [
            'An Khê',
            'Ayun Pa',
            'Chư Păh',
            'Chư Prông',
            'Chư Pưh',
            'Chư Sê',
            'Đắk Đoa',
            'Đak Pơ',
            'Đức Cơ',
            'Ia Grai',
            'Ia Pa',
            'KBang',
            'Kông Chro',
            'Krông Pa',
            'Mang Yang',
            'Phú Thiện',
            'Pleiku'
        ],
        'Hà Giang': [
            'Bắc Mê',
            'Bắc Quang',
            'Đồng Văn',
            'Hà Giang',
            'Hoàng Su Phì',
            'Mèo Vạc',
            'Quản Bạ',
            'Quang Bình',
            'Vị Xuyên',
            'Xín Mần',
            'Yên Minh'
        ],
        'Hà Nam': [
            'Bình Lục',
            'Duy Tiên',
            'Kim Bảng',
            'Lý Nhân',
            'Phủ Lý',
            'Thanh Liêm'
        ],
        'Hà Nội': [
            'Ba Đình',
            'Ba Vì',
            'Bắc Từ Liêm',
            'Cầu Giấy',
            'Chương Mỹ',
            'Đan Phượng',
            'Đông Anh',
            'Đống Đa',
            'Gia Lâm',
            'Hà Đông',
            'Hai Bà Trưng',
            'Hoài Đức',
            'Hoàn Kiếm',
            'Hoàng Mai',
            'Long Biên',
            'Mê Linh',
            'Mỹ Đức',
            'Nam Từ Liêm',
            'Phú Xuyên',
            'Phúc Thọ',
            'Quốc Oai',
            'Sóc Sơn',
            'Sơn Tây',
            'Tây Hồ',
            'Thạch Thất',
            'Thanh Oai',
            'Thanh Trì',
            'Thanh Xuân',
            'Thường Tín',
            'Ứng Hòa'
        ],
        'Hà Tĩnh': [
            'Can Lộc',
            'Cẩm Xuyên',
            'Đức Thọ',
            'Hà Tĩnh',
            'Hồng Lĩnh',
            'Hương Khê',
            'Hương Sơn',
            'Kỳ Anh',
            'Lộc Hà',
            'Nghi Xuân',
            'Thạch Hà',
            'Vũ Quang'
        ],
        'Hải Dương': [
            'Bình Giang',
            'Cẩm Giàng',
            'Chí Linh',
            'Gia Lộc',
            'Hải Dương',
            'Kim Thành',
            'Kinh Môn',
            'Nam Sách',
            'Ninh Giang',
            'Thanh Hà',
            'Thanh Miện',
            'Tứ Kỳ'
        ],
        'Hải Phòng': [
            'An Dương',
            'An Lão',
            'Bạch Long Vĩ',
            'Cát Hải',
            'Dương Kinh',
            'Đồ Sơn',
            'Hải An',
            'Hồng Bàng',
            'Kiến An',
            'Kiến Thụy',
            'Lê Chân',
            'Ngô Quyền',
            'Thuỷ Nguyên',
            'Tiên Lãng',
            'Vĩnh Bảo'
        ],
        'Hòa Bình': [
            'Cao Phong',
            'Đà Bắc',
            'Hòa Bình',
            'Kim Bôi',
            'Kỳ Sơn',
            'Lạc Sơn',
            'Lạc Thủy',
            'Lương Sơn',
            'Mai Châu',
            'Tân Lạc',
            'Yên Thủy'
        ],
        'Hậu Giang': [
            'Châu Thành',
            'Châu Thành A',
            'Long Mỹ',
            'Ngã Bảy',
            'Phụng Hiệp',
            'Vị Thanh',
            'Vị Thủy'
        ],
        'Hưng Yên': [
            'Ân Thi',
            'Hưng Yên',
            'Khoái Châu',
            'Kim Động',
            'Mỹ Hào',
            'Phù Cừ',
            'Tiên Lữ',
            'Văn Giang',
            'Văn Lâm',
            'Yên Mỹ'
        ],
        'Tp. Hồ Chí Minh': [
            'Bình Chánh',
            'Bình Tân',
            'Bình Thạnh',
            'Cần Giờ',
            'Củ Chi',
            'Gò Vấp',
            'Hóc Môn',
            'Nhà Bè',
            'Phú Nhuận',
            'Quận 1',
            'Quận 2',
            'Quận 3',
            'Quận 4',
            'Quận 5',
            'Quận 6',
            'Quận 7',
            'Quận 8',
            'Quận 9',
            'Quận 10',
            'Quận 11',
            'Quận 12',
            'Tân Bình',
            'Tân Phú',
            'Thủ Đức'
        ],
        'Khánh Hòa': [
            'Cam Lâm',
            'Cam Ranh',
            'Diên Khánh',
            'Khánh Sơn',
            'Khánh Vĩnh',
            'Nha Trang',
            'Ninh Hòa',
            'Trường Sa',
            'Vạn Ninh'
        ],
        'Kiên Giang': [
            'An Biên',
            'An Minh',
            'Châu Thành',
            'Giang Thành',
            'Giồng Riềng',
            'Gò Quao',
            'Hà Tiên',
            'Hòn Đất',
            'Kiên Hải',
            'Kiên Lương',
            'Phú Quốc',
            'Tân Hiệp',
            'U Minh Thượng',
            'Vĩnh Thuận'
        ],
        'Kon Tum': [
            'Đắk Glei',
            'Đắk Hà',
            'Đăk Tô',
            "Ia H'Drai",
            'Kon Plông',
            'Kon Rẫy',
            'Kon Tum',
            'Ngọc Hồi',
            'Sa Thầy',
            'Tu Mơ Rông'
        ],
        'Lai Châu': [
            'Lai Châu',
            'Mường Tè',
            'Nậm Nhùn',
            'Phong Thổ',
            'Sìn Hồ',
            'Tam Đường',
            'Tân Uyên',
            'Than Uyên'
        ],
        'Lào Cai': [
            'Bảo Thắng',
            'Bảo Yên',
            'Bát Xát',
            'Bắc Hà',
            'Lào Cai',
            'Mường Khương',
            'Sa Pa',
            'Si Ma Cai',
            'Văn Bàn'
        ],
        'Lạng Sơn': [
            'Bắc Sơn',
            'Bình Gia',
            'Cao Lộc',
            'Chi Lăng',
            'Đình Lập',
            'Hữu Lũng',
            'Lạng Sơn',
            'Lộc Bình',
            'Tràng Định',
            'Vãn Lãng',
            'Văn Quan'
        ],
        'Lâm Đồng': [
            'Bảo Lâm',
            'Bảo Lộc',
            'Cát Tiên',
            'Di Linh',
            'Đà Lạt',
            'Đạ Huoai',
            'Đạ Tẻh',
            'Đam Rông',
            'Đơn Dương',
            'Đức Trọng',
            'Lạc Dương',
            'Lâm Hà'
        ],
        'Long An': [
            'Bến Lức',
            'Cần Đước',
            'Cần Giuộc',
            'Châu Thành',
            'Đức Hòa',
            'Đức Huệ',
            'Kiến Tường',
            'Mộc Hóa',
            'Tân An',
            'Tân Hưng',
            'Tân Thạnh',
            'Tân Trụ',
            'Thạnh Hóa',
            'Thủ Thừa',
            'Vĩnh Hưng'
        ],
        'Nam Định': [
            'Giao Thủy',
            'Hải Hậu',
            'Mỹ Lộc',
            'Nam Định',
            'Nam Trực',
            'Nghĩa Hưng',
            'Trực Ninh',
            'Vụ Bản',
            'Xuân Trường',
            'Ý Yên'
        ],
        'Nghệ An': [
            'Anh Sơn',
            'Con Cuông',
            'Cửa Lò',
            'Diễn Châu',
            'Đô Lương',
            'Hoàng Mai',
            'Hưng Nguyên',
            'Kỳ Sơn',
            'Nam Đàn',
            'Nghi Lộc',
            'Nghĩa Đàn',
            'Quế Phong',
            'Quỳ Châu',
            'Quỳ Hợp',
            'Quỳnh Lưu',
            'Tân Kỳ',
            'Thái Hòa',
            'Thanh Chương',
            'Tương Dương',
            'Vinh',
            'Yên Thành'
        ],
        'Ninh Bình': [
            'Gia Viễn',
            'Hoa Lư',
            'Kim Sơn',
            'Nho Quan',
            'Ninh Bình',
            'Tam Điệp',
            'Yên Khánh',
            'Yên Mô'
        ],
        'Ninh Thuận': [
            'Bác Ái',
            'Ninh Hải',
            'Ninh Phước',
            'Ninh Sơn',
            'Phan Rang-Tháp Chàm',
            'Thuận Bắc',
            'Thuận Nam'
        ],
        'Phú Thọ': [
            'Cẩm Khê',
            'Đoan Hùng',
            'Hạ Hòa',
            'Lâm Thao',
            'Phú Thọ',
            'Phù Ninh',
            'Tam Nông',
            'Tân Sơn',
            'Thanh Ba',
            'Thanh Sơn',
            'Thanh Thủy',
            'Việt Trì',
            'Yên Lập'
        ],
        'Phú Yên': [
            'Đông Hòa',
            'Đồng Xuân',
            'Phú Hòa',
            'Sông Cầu',
            'Sông Hinh',
            'Sơn Hòa',
            'Tây Hòa',
            'Tuy An',
            'Tuy Hòa'
        ],
        'Quảng Bình': [
            'Ba Đồn',
            'Bố Trạch',
            'Đồng Hới',
            'Lệ Thủy',
            'Minh Hóa',
            'Quảng Ninh',
            'Quảng Trạch',
            'Tuyên Hóa'
        ],
        'Quảng Nam': [
            'Bắc Trà My',
            'Duy Xuyên',
            'Đại Lộc',
            'Điện Bàn',
            'Đông Giang',
            'Hiệp Đức',
            'Hội An',
            'Nam Giang',
            'Nam Trà My',
            'Nông Sơn',
            'Núi Thành',
            'Phú Ninh',
            'Phước Sơn',
            'Quế Sơn',
            'Tam Kỳ',
            'Tây Giang',
            'Thăng Bình',
            'Tiên Phước'
        ],
        'Quảng Ngãi': [
            'Ba Tơ',
            'Bình Sơn',
            'Đức Phổ',
            'Lý Sơn',
            'Minh Long',
            'Mộ Đức',
            'Nghĩa Hành',
            'Quảng Ngãi',
            'Sơn Hà',
            'Sơn Tây',
            'Sơn Tịnh',
            'Tây Trà',
            'Trà Bồng',
            'Tư Nghĩa'
        ],
        'Quảng Ninh': [
            'Ba Chẽ',
            'Bình Liêu',
            'Cẩm Phả',
            'Cô Tô',
            'Đầm Hà',
            'Đông Triều',
            'Hạ Long',
            'Hải Hà',
            'Hoành Bồ',
            'Móng Cái',
            'Quảng Yên',
            'Tiên Yên',
            'Uông Bí',
            'Vân Đồn'
        ],
        'Quảng Trị': [
            'Cam Lộ',
            'Cồn Cỏ',
            'Đa Krông',
            'Đông Hà',
            'Gio Linh',
            'Hải Lăng',
            'Hướng Hóa',
            'Quảng Trị',
            'Triệu Phong',
            'Vĩnh Linh'
        ],
        'Sóc Trăng': [
            'Châu Thành',
            'Cù Lao Dung',
            'Kế Sách',
            'Long Phú',
            'Mỹ Tú',
            'Mỹ Xuyên',
            'Ngã Năm',
            'Sóc Trăng',
            'Thạnh Trị',
            'Trần Đề',
            'Vĩnh Châu'
        ],
        'Sơn La': [
            'Bắc Yên',
            'Mai Sơn',
            'Mộc Châu',
            'Mường La',
            'Phù Yên',
            'Quỳnh Nhai',
            'Sông Mã',
            'Sốp Cộp',
            'Sơn La',
            'Thuận Châu',
            'Vân Hồ',
            'Yên Châu'
        ],
        'Tây Ninh': [
            'Bến Cầu',
            'Châu Thành',
            'Dương Minh Châu',
            'Gò Dầu',
            'Hòa Thành',
            'Tân Biên',
            'Tân Châu',
            'Tây Ninh',
            'Trảng Bàng'
        ],
        'Thái Bình': [
            'Đông Hưng',
            'Hưng Hà',
            'Kiến Xương',
            'Quỳnh Phụ',
            'Thái Bình',
            'Thái Thụy',
            'Tiền Hải',
            'Vũ Thư'
        ],
        'Thái Nguyên': [
            'Đại Từ',
            'Định Hóa',
            'Đồng Hỷ',
            'Phổ Yên',
            'Phú Bình',
            'Phú Lương',
            'Sông Công',
            'Thái Nguyên',
            'Võ Nhai'
        ],
        'Thanh Hóa': [
            'Bá Thước',
            'Bỉm Sơn',
            'Cẩm Thủy',
            'Đông Sơn',
            'Hà Trung',
            'Hậu Lộc',
            'Hoằng Hóa',
            'Lang Chánh',
            'Mường Lát',
            'Nga Sơn',
            'Ngọc Lặc',
            'Như Thanh',
            'Như Xuân',
            'Nông Cống',
            'Quan Hóa',
            'Quan Sơn',
            'Quảng Xương',
            'Sầm Sơn',
            'Thạch Thành',
            'Thanh Hóa',
            'Thiệu Hóa',
            'Thọ Xuân',
            'Thường Xuân',
            'Tĩnh Gia',
            'Triệu Sơn',
            'Vĩnh Lộc',
            'Yên Định'
        ],
        'Thừa Thiên - Huế': [
            'A Lưới',
            'Huế',
            'Hương Thủy',
            'Hương Trà',
            'Nam Đông',
            'Phong Điền',
            'Phú Lộc',
            'Phú Vang',
            'Quảng Điền'
        ],
        'Tiền Giang': [
            'Cai Lậy',
            'Cái Bè',
            'Châu Thành',
            'Chợ Gạo',
            'Gò Công',
            'Gò Công Đông',
            'Gò Công Tây',
            'Mỹ Tho',
            'Tân Phú Đông',
            'Tân Phước'
        ],
        'Trà Vinh': [
            'Càng Long',
            'Cầu Kè',
            'Cầu Ngang',
            'Châu Thành',
            'Duyên Hải',
            'Tiểu Cần',
            'Trà Cú',
            'Trà Vinh'
        ],
        'Tuyên Quang': [
            'Chiêm Hóa',
            'Hàm Yên',
            'Lâm Bình',
            'Na Hang',
            'Sơn Dương',
            'Tuyên Quang',
            'Yên Sơn'
        ],
        'Vĩnh Long': [
            'Bình Minh',
            'Bình Tân',
            'Long Hồ',
            'Mang Thít',
            'Tam Bình',
            'Trà Ôn',
            'Vĩnh Long',
            'Vũng Liêm'
        ],
        'Vĩnh Phúc': [
            'Bình Xuyên',
            'Lập Thạch',
            'Phúc Yên',
            'Sông Lô',
            'Tam Dương',
            'Tam Đảo',
            'Vĩnh Tường',
            'Vĩnh Yên',
            'Yên Lạc'
        ],
        'Yên Bái': [
            'Lục Yên',
            'Mù Căng Chải',
            'Nghĩa Lộ',
            'Trạm Tấu',
            'Trấn Yên',
            'Văn Chấn',
            'Văn Yên',
            'Yên Bái',
            'Yên Bình'
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
    district.val('Hà Nội').trigger('change');
}

function resultBank(code)
{
    result = {
        msg: 'Giao dịch không thành công',
        isSuccess: false
    }
    if(code == '00')
        result.isSuccess = true;
    switch(code)
    {
        case '00':
            result.msg = 'Giao dịch thành công';
            break;
        case '01':
            result.msg += ': Ngân hàng từ chối thanh toán: thẻ/tài khoản bị khóa';
            break;
        case '02':
            result.msg += ': Thông tin thẻ không hợp lệ';
            break;
        case '03':
            result.msg += ': Thẻ hết hạn';
            break;
        case '04':
            result.msg += ': Lỗi người mua hàng: Quá số lần cho phép. (Sai OTP, quá hạn mức trong ngày)';
            break;
        case '05':
            result.msg += ': Không có trả lời của Ngân hàng';
            break;
        case '06':
            result.msg += ': Lỗi giao tiếp với Ngân hàng';
            break;
        case '07':
            result.msg += ': Tài khoản không đủ tiền';
            break;
        case '08':
            result.msg += ': Lỗi dữ liệu';
            break;
        case '09':
            result.msg += ': Kiểu giao dịch không được hỗ trợ';
            break;
        case '10':
            result.msg = 'Giao dịch không thành công';
            break;
        case '11':
            result.msg += ': Giao dịch chưa xác thực OTP';
            break;
        case '12':
            result.msg += ': Giao dịch không thành công, số tiền giao dịch vượt hạn mức ngày';
            break;
        case '13':
            result.msg += ': Thẻ chưa đăng ký Internet Banking';
            break;
        case '14':
            result.msg += ': Khách hàng nhập sai OTP';
            break;
        case '15':
            result.msg += ': Khách hàng nhập sai thông tin xác thực';
            break;
        case '16':
            result.msg += ': Khách hàng nhập sai tên chủ thẻ';
            break;
        case '17':
            result.msg += ': Khách hàng nhập sai số thẻ';
            break;
        case '18':
            result.msg += ': Khách hàng nhập sai ngày phát hành thẻ';
            break;
        case '19':
            result.msg += ': Khách hàng nhập sai ngày hết hạn thẻ';
            break;
        case '20':
            result.msg += ': OTP hết thời gian hiệu lực';
            break;
        case '21':
            result.msg += ': Quá thời gian thực hiện request (7 phút) hoặc OTP timeout';
            break;
        case '22':
            result.msg += ': Khách hàng chưa xác thực thông tin thẻ';
            break;
        case '23':
            result.msg += ': Thẻ không đủ điều kiện thanh toán (Thẻ/Tài khoản không hợp lệ hoặc TK không đủ số dư)';
            break;
        case '24':
            result.msg += ': Giao dịch vượt quá hạn mức một lần thanh toán của ngân hàng';
            break;
        case '25':
            result.msg += ': Giao dịch vượt quá hạn mức của ngân hàng';
            break;
        case '26':
            result.msg += ': Giao dịch chờ xác nhận từ Ngân hàng';
            break;
        case '27':
            result.msg += ': Khách hàng nhập sai thông tin bảo mật thẻ';
            break;
        case '28':
            result.msg += ': Giao dịch không thành công do quá thời gian quy định';
            break;
        case '29':
            result.msg += ': Lỗi xử lý giao dịch tại hệ thống Ngân hàng';
            break;
        case '99':
            result.msg += ': Không xác định';
            break;
        default:
            result.msg = 'Giao dịch không thành công';
            break;
    }
    return result;
}