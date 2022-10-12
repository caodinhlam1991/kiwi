var align, web, backmap = new BackMap();
var Home = function(p){
    var ready = function(){
        $('.d_footer').css('position', 'fixed');
        $('body').css('overflow', 'hidden');
    };
    var loaded = function(){
        video = document.getElementById("vFiml");
        $('.d_frame').each(function(index) {
            while(index>9)
                index-=10;
            tweenFr[index+1] = new TimelineMax({paused: true});
        });
        weelFrame($('body, html'), function(){
        }, function(){
            if(frameIndex > 1 && onScroll == 1 && $('.bgPopup').css('display')=='none')
            {
                onScroll = 0;
                frameIndex--;
                tweenFr[frameIndex].restart();
                var frame = $('.d_frame:eq('+(frameIndex-1)+')');
                if(frameIndex==1)
                    setTimeout(function(){
                        tweenBn[$('.d_banner').attr('banner_number')].restart()
                    }, 600);
                if(frameIndex==3)
                    setTimeout(function(){
                        video.play();
                    }, 1500);
                else
                {
                    video.pause();
                    setTimeout(function(){
                        if(video.played)
                            video.pause();
                    }, 550);
                }
                tl_obj = new TimelineMax();
                tl_obj.to($("html, body"), 1, {scrollTop: frame.offset().top, ease: Power1.easeIn, onComplete: function() {
                    onScroll = 1;
                    $('.a_map_frame').css('textShadow', '0 0 0 #C5CED8');
                    TweenMax.to($('.a_map_frame:eq('+(frameIndex-1)+')'), 0.3, {textShadow: '0 0 10px #C5CED8'});
                }});
            }
        }, function(){
            if(frameIndex < $('.d_frame').length && onScroll == 1 && $('.bgPopup').css('display')=='none')
            {
                onScroll = 0;
                tweenFr[frameIndex+1].restart();
                if(frameIndex==2)
                    setTimeout(function(){
                        video.play();
                    }, 1500);
                else
                {
                    video.pause();
                    setTimeout(function(){
                        if(video.played)
                            video.pause();
                    }, 550);
                }
                var frame = $('.d_frame:eq('+frameIndex+')');
                tl_obj = new TimelineMax();
                tl_obj.to($("html, body"), 1, {scrollTop: frame.offset().top, ease:Power1.easeIn, onComplete: function() {
                    onScroll = 1;
                    frameIndex++;
                    $('.a_map_frame').css('textShadow', '0 0 0 #C5CED8');
                    TweenMax.to($('.a_map_frame:eq('+(frameIndex-1)+')'), 0.3, {textShadow: '0 0 10px #C5CED8'});
                }});
            }
        });
        $('.a_close_frame3').live('click', function(){
            video.play();
            $('.d_text_frame3_1').fadeOut(200, function(){
                setTimeout(function(){
                    $('.d_text_frame3_1').fadeIn(200);
                }, 300000);
            });
            tweenFr[3].restart();
        });
    };
    var params = {
        BASEURL: (typeof BASEURL == 'undefined')? '': BASEURL
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready
    };
};
var Theme = function(p){
    var ready = function(){
        $('html').on('dragstart', function () {
            return false;
        });
        web.iReq({action: 'iCheckBrowser', agent: navigator.peopleAgent}, function(dt){
            if(dt)
                window.location.assign(BASEURL + '/tai-wsup3-homes');
        });
        $('.d_theme:odd').addClass('d_even_theme');
    };
    var loaded = function(){
    };
    var params = {
        BASEURL: (typeof BASEURL == 'undefined')? '': BASEURL
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready
    };
};
var Contact = function(p){
    var ready = function(){
        $('#fContact').validate({
            rules: {
                name: {required: true, maxlength: 255},
                phone: {required: true,number: true},
                email: {required: true, email: true},
                detail: {required: true}
            },
            messages: {
                name: {
                    required: tran('Mời bạn nhập tên|Invites you to enter a name|Приглашает вас ввести имя|邀您输入名称|あなたが名前を入力するに招待します'),
                    maxlength: tran('Tên quá dài, tối đa 255 ký tự|Name is too long, a maximum of 255 characters|Имя слишком длинное, максимум 255 символов|名称太长，最多255个字符|名前は、255文字の最大長すぎます')
                },
                phone: {
                    required: tran('Mời bạn nhập số điện thoại|Please enter your phone number|Пожалуйста, введите ваш номер телефона|请输入您的手机号码|あなたの電話番号を入力'),
                    number: tran('Bạn vui lòng chỉ nhập số|Please only enter numbers|Введите цифры|请只输入数字|数字のみを入力してください。')},
                email: {
                    required: tran("Mời bạn nhập email|Please enter your email|Пожалуйста введите ваш e-mail|请输入您的电子邮件|あなたのメールアドレスを入力してください"),
                    email:tran("Email không hợp lệ|Email is not valid|Электронной почты не действителен|电子邮件无效|メールが有効ではありません")
                },
                detail: {
                    required: tran("Mời bạn nhập nội dung|Please type your content|Пожалуйста, введите ваше содержание|请输入您的内容|あなたのコンテンツを入力してください。")
                }
            },
            submitHandler: function(){
                web.iReq({
                    action: 'iContact',
                    fullname: $('#iName').val(),
                    email: $('#iEmail').val(),
                    phone: $('#iPhone').val(),
                    address: $('#iAddress').val(),
                    detail: $('#iDetail').val(),
                }, function (data) {
                    carts = {};                    
                if($('#iDetail').next('label.error').length==0)
                    $('#iDetail').after('<label for="iDetail" generated="true" class="error">Cảm ơn bạn đã liên hệ, chúng tôi sẽ liên hệ đến bạn sớm</label>').css('display', 'inline');
                else
                    $('#iDetail').next('label.error').html('Cảm ơn bạn đã liên hệ, chúng tôi sẽ liên hệ đến bạn sớm').css('display', 'inline');
                });
            }
        });
        $('.i_submit').click(function(){
            $('#fContact').submit();
        });
        $('.aMin').toggle(function(){
            $('#fContact').fadeOut(200, function(){
                $('.dMin').css({display: 'none'});
                $(this).css({top: 'auto', bottom: '10px', marginTop: '0', left: '50%', marginLeft: '-136px'});
                $('body').css('overflow', 'hidden');
                $(this).fadeIn(200);
                $('.aMin').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
                $('#address').focus();
            });
        }, function(){
            $('#fContact').fadeOut(200, function(){
                $('.dMin').css({display: 'block'});
                $(this).css({top: '50%', bottom: 'auto', marginTop: '-180px', left: '20px', marginLeft: '0'});
                $('body').css('overflow', 'auto');
                $(this).fadeIn(200);
                $('.aMin').removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
                $('#fullname').focus();
            });
        })
    };
    var loaded = function(){
        setTimeout(function(){
            $("#address").attr('style', '').appendTo('.dAddress');
        }, 500);
    };
    var params = {
        BASEURL: (typeof BASEURL == 'undefined')? '': BASEURL
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready
    };
};
var Classes = function(p){
    var ready = function(){
        $('body').css('background', '#e8efff');
        $('.dClassesContrl').fadeIn(250);
        $('.dClass').live('click', function(){
            window.location.assign(BASEURLs + '/meet/'+$(this).attr('path')+'?id='+people._id);
        });
        $('.sAddClass').click(function(){
            web.iReq({action: 'iCreateClass'}, function (cp) {
                var item = { cats: {0: '62496f11e9979707cc4d81d4'} };
                item.position = cp.contents.length+2;
                $.each(flags, function (key, value) {
                    item['title' + key] = 'class';
                    item['except' + key] = '';
                    item['detail' + key] = 'empties';
                    item['imgs' + key] = {};
                    item['params' + key] = {};
                });
                item.path = 'class';
                item.site = LINK;
                item.type = 'post';
                item.opath = '';
                item.live = 'false';
                item.views = 1;
                web.iReq({action: 'iSaveContent', item: item}, function (itm) {
                    people = cp.people;
                    window.location.assign(BASEURLs + '/meet/'+itm.path+'?id='+people._id);
                });
            });
        });
        $('.sRefresh').click(function(){
            window.location.reload();
        });
    };
    var loaded = function(){
        web.wHome($('.iChatRers').val(), function(data){
            switch(data.to)
            {
                case 'chat':
                    $('.dChatText').html(data.text);
                    if (data.people.pead != people.pead)
                    {
                        $('.dTalkDetail > div').append('<div>' +
                            '<div class="dChatBg"></div>' +
                            '<div class="dChat' + ((data.people.pead == people.pead) ? ' dMe' : '') + '">' +
                            '<a class="aVatar" title="'+((data.people.displayname!='')? data.people.displayname: data.people.schoolname)+'"><img src="' + ((data.people.image != '' && data.people.image != null) ? data.people.image : SKIN + '/imgs/light.png') + '" alt="cazs"/></a>' + $('.dChatText').text() +
                            '<a class="aChatOpt">.</a></div>' +
                            '</div>');
                    }
                    else
                    {
                        $('.dTalkDetail > div').append('<div>' +
                            '<div class="dChatBg"></div>' +
                            '<div class="dChat' + ((data.people.pead == people.pead) ? ' dMe' : '') + '">' +
                            '<a class="aVatar" title="'+((data.people.displayname!='')? data.people.displayname: data.people.schoolname)+'"><img src="' + ((data.people.image != '' && data.people.image != null) ? data.people.image : SKIN + '/imgs/light.png') + '" alt="cazs"/></a>' + $('.dChatText').text() +
                            '<a class="aChatOpt">.</a></div>' +
                            '</div>');
                    }
                    $('.dContentWriter').html('');
                    $('.dTalkDetail').animate({ scrollTop: $('.dTalkDetail > div').height() + 33 + 10 }, 200);
                    break;
            }
        });
        $('.aSendMess').click(function(){
            if($('.dContentWriter').html()!='')
                web.iHome({action: 'iGameClass', data: {
                    path: 'classes',
                    to: 'chat',
                    people: people,
                    text: $('.dContentWriter').html(),
                }});
        });
        $('.aGamerAddress').click(function(){
            if(people._id != undefined)
                window.location.assign(BASEURLs + '/address/'+people.pead+'/'+people.pead);
            else
                window.location.assign(BASEURLs + '/admin');
        });
        $('.aWebRegister').click(function(){
            if(people != null && people != {} && people._id != undefined)
                window.location.assign(BASEURLs + '/dang-ky-web?pead='+people.pead);
            else
                window.location.assign(BASEURLs + '/admin');
        });
        $('.aGamerNews').click(function(){
            if(people._id != undefined)
                window.location.assign(BASEURLs + '/game-news/'+people.pead);
            else
                window.location.assign(BASEURLs + '/admin');
        });
        $('.aGamerPlay').click(function(){
            if(people._id != undefined)
                window.location.assign(BASEURLs + '/classes?id='+people._id);
            else
                window.location.assign(BASEURLs + '/admin');
        });
    };
    var params = {
        BASEURL: (typeof BASEURL == 'undefined')? '': BASEURL
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready
    };
};
var Class = function(p){
    var ready = function(){
        $('.dClassContrl').fadeIn(250);
        $('.aToHome').click(function(){
            kPeople = setInterval(function(){
                if(people._id==wId)
                    web.iHome({action: 'iGameClass', data: {
                        path: $('.iChatRers').val(),
                        to: 'kExit',
                        people: people,
                        _id: $('.iChatRers').attr('id'),
                        site: $('.iChatRers').attr('site')
                    }});
                else
                    web.iHome({action: 'iGameClass', data: {
                        path: $('.iChatRers').val(),
                        to: 'cPeopleX',
                        cMAvr: cMAvr,
                        people: people
                    }});
            }, 2888);
            $('body').fadeOut(300);
        });
        $('.aCloseDetl').click(function(){
            cbClick();
            $('.dDetlAction').fadeOut(300);
        });
        $('.aExperiences:not(.aWaiting)').live('click', function(){
            $('.aCloseDetl').click();
            clearTimeout(timeOut);
            $(this).addClass('aWaiting').fadeOut(300, function(){
                pePos[cMAvr].steps = Math.floor(Math.random() * 6) + 1;
                if((pePos[cMAvr].steps==1||pePos[cMAvr].steps-1==5) && iso<0)
                    iso++;
                if(iso>=0)
                {
                    pePos[cMAvr].pos += pePos[cMAvr].steps;
                    web.iHome({action: 'iGameClass', data: {
                        path: $('.iChatRers').val(),
                        to: 'experiences',
                        people: people,
                        pePos: pePos
                    }});
                }
                else
                {
                    worked = checkedPeExps = false;
                    web.iHome({action: 'iGameClass', data: {
                        path: $('.iChatRers').val(),
                        to: 'walk',
                        aPPos: checkPeExps(),
                        people: people,
                        pos: $('a.'+cMAvr).parent().attr('pos'),
                        watts: 0
                    }});
                }
            });
        });
        $('.d2').click(function(){
            if(typeof(btnShop)!='undefined' || $(this).find('.sBoss').length<1)
                btnShop = undefined;
            switch($(this).attr('pos'))
            {
                case '67':
                case '82':
                case '98':
                case '72':
                case '87':
                case '101':
                    showAction('<h2>'+$(this).find('h3 > span:eq(0)').text()+'</h2>', function(){

                    });
                    break;
                case '69':
                    showAction('<h2>'+$(this).find('h3 > span:eq(0)').text()+'</h2><br/><p>Trả chi phí giá trị gia tăng: <span>200 Coin</span></p>', function(){
                        
                    });
                    break;
                case '103':
                    showAction('<h2>'+$(this).find('h3 > span:eq(0)').text()+'</h2><br/><p>Nhận tiền tài trợ: <span>100 Coin</span></p>', function(){
                        
                    });
                    break;
                default:
                    if($(this).attr('pos') == $('a.'+cMAvr).parent().attr('pos') && $(this).find('.sBoss').length<1 && worked == false)
                        btnShop = '<a class="aShop">Sắm đất - '+$('a.'+cMAvr).parent().find('h3 > span:eq(1)').text()+' Coin</a>';
                    web.iHome({action: 'iGameClass', data: {
                        path: $('.iChatRers').val(),
                        to: 'getInfo',
                        people: people,
                        box: $(this).find('h3 > span:eq(0)').text(),
                        pos: parseInt($(this).attr('pos')),
                        cMAvr: cMAvr,
                        myCities: myCities,
                        steps: 0
                    }});
                    break;
            }
        });
        $('.aShop').live('click', function(){
            if($('a.'+cMAvr).parent().find('.sBoss').length<1)
            {
                web.iHome({action: 'iGameClass', data: {
                    path: $('.iChatRers').val(),
                    to: 'shop',
                    people: people,
                    pos: $('a.'+cMAvr).parent().attr('pos'),
                    cMAvr: cMAvr,
                    worked: worked,
                    myCities: myCities,
                    watts: parseInt($('a.'+cMAvr).parent().find('h3 > span:eq(1)').text())
                }});
            }
        });
        $('.aBuil').live('click', function(){
            if($('a.'+cMAvr).parent().find('.sBoss').length>0)
            {
                web.iHome({action: 'iGameClass', data: {
                    path: $('.iChatRers').val(),
                    to: 'buil',
                    people: people,
                    pos: $('a.'+cMAvr).parent().attr('pos'),
                    cMAvr: cMAvr,
                    worked: worked,
                    myCities: myCities,
                    watts: myCities[cMAvr]['buil'+$('a.'+cMAvr).parent().attr('pos')]
                }});
            }
        });
        $('.aSel').live('click', function(){
            web.iHome({action: 'iGameClass', data: {
                path: $('.iChatRers').val(),
                to: 'sel',
                people: people,
                pos: $(this).attr('pos'),
                cMAvr: cMAvr,
                worked: worked,
                myCities: myCities,
                watts: -myCities[cMAvr]['sel'+$(this).attr('pos')]
            }});
        });
        $('.sSellVaccNow').live('click', function(){
            if(iso>0)
                web.iHome({action: 'iGameClass', data: {
                    path: $('.iChatRers').val(),
                    to: 'sellVacc',
                    people: people,
                    pId: $(this).attr('_id')
                }});
        });
        $('.sShopVaccNow').live('click', function(){            
            web.iHome({action: 'iGameClass', data: {
                path: $('.iChatRers').val(),
                to: 'shopVacc',
                people: people,
                pId: $(this).attr('_id')
            }});
        }); 
    };
    var cMAvr = '', worked = false, pPos = 0, aPPos = 0, pAll = 0, iso = 0, salary = 0;
    var pePos = {}, myCities = {};
    var thingExec = function(data){
        if(data.thing.except.hasOwnProperty('excMtr'))
            pePos[data.cMAvr] = {
                steps: 0,
                pos: data.pos
            };
        if(data.thing.except.hasOwnProperty('pos'))
            pePos[data.cMAvr] = {
                steps: 0,
                pos: data.thing.except['pos']
            };
        if(data.thing.except.hasOwnProperty('ePos'))
            pePos[data.cMAvr] = {
                steps: 0,
                pos: data.pos + data.thing.except['ePos']
            };
        $('a.'+data.cMAvr).fadeOut(3900, function(){
            $(this).remove();
            animPePos(pePos, data.people);
            wInfo(pePos[data.cMAvr].pos, pePos[data.cMAvr].pos, pePos[data.cMAvr].steps, data.cMAvr, data.people);
        });
    };
    var animPePos = function(pPs, pe){
        $.each(pPs, function(k, v){
            if($('a.'+k).length>0)
            {
                if(parseInt($('a.'+k).parent().attr('pos')) != v.pos)
                    return walk($('a.'+k), v.pos, v.steps, k, pe);
            }
            else
            {
                $('div[pos='+v.pos+']').append('<a class="aPeops '+k+'" title=""><img src="'+SKIN+'/imgs/avr/'+k+'.jpg" alt="cazs"/></a>');
                $('a.'+k).fadeTo(390, 0.6);
                return 65;
            }
        });
    };
    var walk = function(p, end, steps, cMAvrW, aPe){
        var pos, endfnl = end;
        p.fadeTo(250, 0, function(){
            if(parseInt($(this).parent().attr('pos'))+1<105)
                pos = parseInt($(this).parent().attr('pos'))+1;
            else
            {
                if(aPe._id==people._id)
                    if(salary==0 || salary==200)
                        salary = 200;
                    else
                        salary=0;
                endfnl = 65 + (end - 105);
                pePos[cMAvrW].pos = endfnl
                pos = 65;
            }
            $(this).detach().appendTo($('div[pos='+pos+']'));
            p.fadeTo(250, 0.6, function(){
                if(pos<endfnl)
                    return walk(p, endfnl, steps, cMAvrW, aPe);
                else
                {
                    wInfo(endfnl, pos, steps, cMAvrW, aPe);
                    return endfnl;
                }
            });
        });
    };
    var wInfo = function(endfnl, pos, steps, cMAvrW, aPe){
        if(aPe._id==people._id)
            switch(endfnl)
            {
                case 67:
                case 82:
                case 98:
                    web.iHome({action: 'iGameClass', data: {
                        path: $('.iChatRers').val(),
                        to: 'thing1',
                        people: aPe,
                        aPPos: checkPeExps(),
                        myCities: myCities,
                        cMAvr: cMAvrW,
                        peopleLen: parseInt($('.sPeopleLen > span').html()),
                        pos: pos,
                        steps: steps,
                        salary: salary,
                        watts: 0
                    }});
                    break;
                case 72:
                case 87:
                case 101:
                    web.iHome({action: 'iGameClass', data: {
                        path: $('.iChatRers').val(),
                        to: 'thing2',
                        people: aPe,
                        aPPos: checkPeExps(),
                        myCities: myCities,
                        cMAvr: cMAvrW,
                        peopleLen: parseInt($('.sPeopleLen > span').html()),
                        pos: pos,
                        steps: steps,
                        salary: salary,
                        watts: 0
                    }});
                    break;
                case 69:
                    showAction('<h2>'+$(this).find('h3 > span:eq(0)').text()+'</h2><br/><p>Trả chi phí giá trị gia tăng: <span>200 Coin</span></p>', function(){

                    });
                    web.iHome({action: 'iGameClass', data: {
                        path: $('.iChatRers').val(),
                        to: 'walk',
                        aPPos: checkPeExps(),
                        people: aPe,
                        pos: pos,
                        watts: 0,
                        salary: salary
                    }});
                    break;
                case 103:
                    showAction('<h2>'+$(this).find('h3 > span:eq(0)').text()+'</h2><br/><p>Nhận tiền tài trợ: <span>100 Coin</span></p>', function(){

                    });
                    web.iHome({action: 'iGameClass', data: {
                        path: $('.iChatRers').val(),
                        to: 'walk',
                        aPPos: checkPeExps(),
                        people: aPe,
                        pos: pos,
                        watts: 0,
                        salary: salary
                    }});
                    break;
                case 95:
                    iso--;
                    isSellVacc();
                    web.iHome({action: 'iGameClass', data: {
                        path: $('.iChatRers').val(),
                        to: 'walk',
                        aPPos: checkPeExps(),
                        people: aPe,
                        pos: pos,
                        watts: 0,
                        salary: salary
                    }});
                    break;
                case 65:
                    salary=0;
                case 75:
                case 85:
                    web.iHome({action: 'iGameClass', data: {
                        path: $('.iChatRers').val(),
                        to: 'walk',
                        aPPos: checkPeExps(),
                        people: aPe,
                        pos: pos,
                        watts: 0,
                        salary: salary
                    }});
                    break;
                default:
                    web.iHome({action: 'iGameClass', data: {
                        path: $('.iChatRers').val(),
                        to: 'getInfoPlace',
                        people: aPe,
                        box: $('a.'+cMAvrW).parent().find('h3 > span:eq(0)').text(),
                        pos: pos,
                        cMAvr: cMAvrW,
                        myCities: myCities,
                        steps: steps,
                        aPPos: checkPeExps(),
                        salary: salary,
                        watts: 0
                    }});
                    break;
            }
    };
    var cbClick = function(){};
    var checkedPeExps = false;
    var checkPeExps = function(){
        if(checkedPeExps==false)
        {
            checkedPeExps=true;
            if(aPPos < pAll)
                aPPos++;
            else
                aPPos = 1;
        }
        return aPPos;
    };
    var showAction = function(detail, cb){
        $('.dDetlAction > div').html(detail);
        $('.dDetlAction').fadeIn(300);
        if(typeof(cb)=='function')
            cbClick = cb;
    };
    var isSellVacc = function(){
        //if(parseInt($('.sPeopleLen > span').html())>1)
            if(iso>0)
            {
                $('.sSellVacc span:eq(1)').text('('+iso+')')
                $('.sSellVacc').fadeTo(299, 1, function(){
                    $(this).css('display', 'inline-block');
                });
            }
            else
                $('.sSellVacc').fadeOut(299, function(){
                    $(this).css('opacity', 0);
                });
    }
    var timeOut;
    var isMachine = false;
    var machineExperiences = function(){
        if(isMachine)
            timeOut = setTimeout(function(){
                $('.aExperiences:not(.aWaiting)').click();
            }, 8800);
        else
            timeOut = setTimeout(function(){
                $('.aExperiences:not(.aWaiting)').click();
            }, 28800);
    };
    var loaded = function(){
        if(people._id==wId)
            $('.sStart').css('display', 'inline-block');
        else
            $('.sMachine').css('display', 'inline-block');
        web.wHome($('.iChatRers').val(), function(data){
            switch(data.to)
            {
                case 'walk':
                    if(people._id==data.people._id)
                    {
                        if(data.hasOwnProperty('salary'))
                            salary=data.salary;
                        if(data.pos == 69 || data.pos == 103)
                            $('.sCoin span').html(data.watts);
                    }
                    aPPos = data.aPPos;
                    if(data.aPPos == pPos)
                        $('.aWaiting').fadeIn(300, function(){
                            $(this).removeClass('aWaiting');
                            machineExperiences();
                        });
                    break;
                case 'experiences':
                    worked = checkedPeExps = false;
                    pePos = data.pePos;
                    animPePos(data.pePos, data.people);
                    break;
                case 'chat':
                    $('.dChatText').html(data.text);
                    if (data.people.pead != people.pead)
                    {
                        $('.dTalkDetail > div').append('<div>' +
                            '<div class="dChatBg"></div>' +
                            '<div class="dChat' + ((data.people.pead == people.pead) ? ' dMe' : '') + '">' +
                            '<a class="aVatar" title="'+((data.people.displayname!='')? data.people.displayname: data.people.schoolname)+'"><img src="' + ((data.people.image != '' && data.people.image != null) ? data.people.image : SKIN + '/imgs/avr/' + data.cMAvr + '.jpg') + '" alt="wsup3"/></a>' + $('.dChatText').text() +
                            '<a class="aChatOpt">.</a></div>' +
                            '</div>');
                    }
                    else
                    {
                        $('.dTalkDetail > div').append('<div>' +
                            '<div class="dChatBg"></div>' +
                            '<div class="dChat' + ((data.people.pead == people.pead) ? ' dMe' : '') + '">' +
                            '<a class="aVatar" title="'+((data.people.displayname!='')? data.people.displayname: data.people.schoolname)+'"><img src="' + ((data.people.image != '' && data.people.image != null) ? data.people.image : SKIN + '/imgs/avr/' + data.cMAvr + '.jpg') + '" alt="wsup3"/></a>' + $('.dChatText').text() +
                            '<a class="aChatOpt">.</a></div>' +
                            '</div>');
                    }
                    $('.dContentWriter').html('');
                    $('.dTalkDetail').animate({ scrollTop: $('.dTalkDetail > div').height() + 33 + 10 }, 200);
                    break;
                case 'getInfoPlace':
                    if(people._id!=data.people._id)
                        btnShop = undefined;
                    else
                    {
                        if(data.hasOwnProperty('salary'))
                            salary=data.salary;
                        if(data.hasOwnProperty('watts'))
                            $('.sCoin span').html(data.watts);
                        if($('div[pos='+data.pos+'] .sBoss').length<1 && worked == false)
                            btnShop = '<a class="aShop">Sắm đất - '+$('a.'+cMAvr).parent().find('h3 > span:eq(1)').text()+' Coin</a>';
                    }
                    if(data.pWatts != null)
                        if(people._id==data.pWatts.wid)
                            $('.sCoin span').html(data.pWatts.coin);
                    aPPos = data.aPPos;
                    if(data.aPPos == pPos)
                        $('.aWaiting').fadeIn(300, function(){
                            $(this).removeClass('aWaiting');
                            machineExperiences();
                        });
                case 'getInfo':
                    data.info.except = JSON.parse(data.info.except);
                    switch(data.pos)
                    {
                        case 70:
                        case 80:
                        case 90:
                        case 100:
                            myCities[data.cMAvr]['sel'+data.pos] = data.info.except[-1];
                            if(data.myCities[data.cMAvr][data.pos] >= 1 && $('div[pos='+data.pos+'] span.'+data.cMAvr).length>0)
                                if(typeof(btnShop)=='undefined')
                                    btnShop = '<a class="aSel" pos="'+data.pos+'">Bán - '+data.info.except[-1]+' Coin</a>';
                            if(data.to=='getInfoPlace' || (data.to=='getInfo' && people._id==data.people._id))
                                showAction('<h2>'+data.info.title+'</h2><br/><p>Chi phí tiền bến đỗ xe: <span>'+data.info.except[1]+' Coin</span></p><p>Chi phí tiền 2 bến đỗ xe: <span>'+data.info.except[2]+' Coin</span></p><p>Chi phí tiền 3 bến đỗ xe: <span>'+data.info.except[3]+' Coin</span></p><p>Chi phí tiền tất cả bến đỗ xe: <span>'+data.info.except[5]+' Coin</span></p><br/><p>Giá trị cầm cố: <span>'+data.info.except[-1]+' Coin</span></p>'+((typeof(btnShop)=='undefined')? '': btnShop), function(){
                                    if(typeof(btnShop)!='undefined')
                                        btnShop = undefined;
                                });
                            break;
                        case 77:
                        case 93:
                            myCities[data.cMAvr]['sel'+data.pos] = data.info.except[-1];
                            if(data.myCities[data.cMAvr][data.pos] >= 1 && $('div[pos='+data.pos+'] span.'+data.cMAvr).length>0)
                                if(typeof(btnShop)=='undefined')
                                    btnShop = '<a class="aSel" pos="'+data.pos+'">Bán - '+data.info.except[-1]+' Coin</a>';
                            if(data.to=='getInfoPlace' || (data.to=='getInfo' && people._id==data.people._id))
                                showAction('<h2>'+data.info.title+'</h2><br/><p>Chi phí tiền 1 công ty: <span>'+data.info.except[1]+' lần số ô mới đi - '+(data.info.except[1]*data.steps)+' Coin</span></p><p>Chi phí tiền 2 công ty: <span>'+data.info.except[2]+' lần số ô mới đi - '+(data.info.except[2]*data.steps)+' Coin</span></p><br/><p>Giá trị cầm cố: <span>'+data.info.except[-1]+' Coin</span></p>'+((typeof(btnShop)=='undefined')? '': btnShop), function(){
                                    if(typeof(btnShop)!='undefined')
                                        btnShop = undefined;
                                });
                            break;
                        default:
                            if(people._id==data.people._id && data.myCities[data.cMAvr][data.pos] != undefined && data.myCities[data.cMAvr][data.pos] > 0)
                            {
                                myCities[data.cMAvr]['buil'+data.pos] = data.info.except['mTr1'];
                                myCities[data.cMAvr]['sel'+data.pos] = data.info.except[-1];
                                if(data.myCities[data.cMAvr][data.pos] < 7 && worked == false && data.pos == $('a.'+cMAvr).parent().attr('pos'))
                                {
                                    btnShop = '';
                                    btnShop += '<a class="aBuil">Xây nhà - '+data.info.except['mTr1']+' Coin</a>';
                                }
                                if(data.myCities[data.cMAvr][data.pos] >= 1 && $('div[pos='+data.pos+'] span.'+data.cMAvr).length>0)
                                {
                                    if(typeof(btnShop)=='undefined')
                                        btnShop = '<a class="aSel" pos="'+data.pos+'">Bán 1 bậc - '+data.info.except[-1]+' Coin</a>';
                                    else
                                        btnShop += '<a class="aSel" pos="'+data.pos+'">Bán 1 bậc - '+data.info.except[-1]+' Coin</a>';
                                }
                            }
                            if(data.to=='getInfoPlace')
                                showAction('<h2>'+data.info.title+'</h2><br/><p>Chi phí tiền đất: <span>'+data.info.except[1]+' Coin</span></p><p>Chi phí tiền 1 căn nhà : <span>'+data.info.except[2]+' Coin</span></p><p>Chi phí tiền 2 căn nhà: <span>'+data.info.except[3]+' Coin</span></p><p>Chi phí tiền 3 căn nhà: <span>'+data.info.except[5]+' Coin</span></p><p>Chi phí tiền 5 căn nhà: <span>'+data.info.except[6]+' Coin</span></p><p>Chi phí tiền ở khách sạn: <span>'+data.info.except[7]+' Coin</span></p><br/><p>Giá trị cầm cố: <span>'+data.info.except[-1]+' Coin</span></p><p>Chi phí xây nhà 1 lần: <span>'+data.info.except['mTr1']+' Coin</span></p><p>Chi phí xây khách sạn (phải có sẵn 5 nhà): <span>'+data.info.except['mTr2']+' Coin</span></p>'+((typeof(btnShop)!='undefined' && people._id==data.people._id)? btnShop: ''), function(){
                                    if(typeof(btnShop)!='undefined')
                                        btnShop = undefined;
                                });
                            else
                                if(people._id==data.people._id)
                                    showAction('<h2>'+data.info.title+'</h2><br/><p>Chi phí tiền đất: <span>'+data.info.except[1]+' Coin</span></p><p>Chi phí tiền 1 căn nhà : <span>'+data.info.except[2]+' Coin</span></p><p>Chi phí tiền 2 căn nhà: <span>'+data.info.except[3]+' Coin</span></p><p>Chi phí tiền 3 căn nhà: <span>'+data.info.except[5]+' Coin</span></p><p>Chi phí tiền 5 căn nhà: <span>'+data.info.except[6]+' Coin</span></p><p>Chi phí tiền ở khách sạn: <span>'+data.info.except[7]+' Coin</span></p><br/><p>Giá trị cầm cố: <span>'+data.info.except[-1]+' Coin</span></p><p>Chi phí xây nhà 1 lần: <span>'+data.info.except['mTr1']+' Coin</span></p><p>Chi phí xây khách sạn (phải có sẵn 5 nhà): <span>'+data.info.except['mTr2']+' Coin</span></p>'+((typeof(btnShop)!='undefined')? btnShop: ''), function(){
                                        if(typeof(btnShop)!='undefined')
                                            btnShop = undefined;
                                    });
                            break
                    }
                    break;
                case 'shop':
                    if(worked == false)
                    {
                        worked = true;
                        if(people._id==data.people._id)
                            $('.sCoin span').html(data.watts);
                        $('div[pos='+data.pos+']').append('<span class="sBoss '+data.cMAvr+'"><img src="'+((data.people.image != '' && data.people.image != null) ? data.people.image : SKIN + '/imgs/avr/' + data.cMAvr + '.jpg')+'" alt="cazs"></span>');
                        btnShop = undefined;
                        myCities = data.myCities;
                        myCities[data.cMAvr][$('a.'+data.cMAvr).parent().attr('pos')] = 1;
                        if(people._id==data.people._id)
                            $('.aShop').remove();
                    }
                    break;
                case 'buil':
                    if(worked == false)
                    {
                        worked = true;
                        if(people._id==data.people._id)
                            $('.sCoin span').html(data.watts);
                        myCities = data.myCities;
                        myCities[data.cMAvr][$('a.'+data.cMAvr).parent().attr('pos')] = ((myCities[data.cMAvr][$('a.'+data.cMAvr).parent().attr('pos')]==4)? myCities[data.cMAvr][$('a.'+data.cMAvr).parent().attr('pos')]+2: myCities[data.cMAvr][$('a.'+data.cMAvr).parent().attr('pos')]+1);
                        if(myCities[data.cMAvr][$('a.'+data.cMAvr).parent().attr('pos')]>2)
                        {
                            if(myCities[data.cMAvr][$('a.'+data.cMAvr).parent().attr('pos')]<7)
                                $('div[pos='+data.pos+'] .sFlat span').html((myCities[data.cMAvr][$('a.'+data.cMAvr).parent().attr('pos')]-1));
                            else
                                $('div[pos='+data.pos+'] .sFlat span').html('--');
                        }
                        else
                            $('div[pos='+data.pos+']').append('<span class="sFlat"><img src="' + SKIN + '/imgs/flat.png" alt="cazs"><span>'+(myCities[data.cMAvr][$('a.'+data.cMAvr).parent().attr('pos')]-1)+'</span></span>');
                        btnShop = undefined;
                        if(people._id==data.people._id)
                            $('.aBuil').remove();
                    }
                    break;
                case 'sel':
                    $('.aSel').fadeOut(230, function(){
                        $(this).fadeIn(230);
                    });
                    if(people._id==data.people._id)
                        $('.sCoin span').html(data.watts);
                    myCities = data.myCities;
                    myCities[data.cMAvr][data.pos] = ((myCities[data.cMAvr][data.pos]==6)? myCities[data.cMAvr][data.pos]-2: myCities[data.cMAvr][data.pos]-1);
                    if(myCities[data.cMAvr][data.pos]>0)
                    {
                        if(myCities[data.cMAvr][data.pos]>1)
                            $('div[pos='+data.pos+'] .sFlat span').html((myCities[data.cMAvr][data.pos]-1));
                        else
                            $('div[pos='+data.pos+'] .sFlat').remove();
                    }
                    else
                    {
                        $('div[pos='+data.pos+'] .sBoss').remove();
                        $('.aSel').remove();
                        if(worked==false)
                            $('.aBuil').html('Sắm đất - '+$('a.'+cMAvr).parent().find('h3 > span:eq(1)').text()+' Coin').addClass('aShop').removeClass('aBuil');
                    }
                    btnShop = undefined;
                    break;
                case 'kPeople':
                    clearInterval(kPeople);
                    if(people._id==wId && people._id!=data.people._id)
                    {
                        $('.sPeopleLen > span').html(data.peopleLen);
                        data.cMAvr = cAvr[0];
                        myCities[data.cMAvr] = {pId: data.people._id};
                        if($('.sStart').css('display')!='none')
                        {
                            data.pPos = pPos;
                            pPos++;
                            pAll = pPos;
                            aPPos = Math.floor(Math.random() * pAll) + 1;
                        }
                        cAvr.shift();
                        pePos[data.cMAvr] = {
                            steps: 0,
                            pos: 65
                        };
                        animPePos(pePos, data.people);
                        web.iHome({action: 'iGameClass', data: {
                            path: $('.iChatRers').val(),
                            to: 'cPeople',
                            people: data.people,
                            peopleLen: data.peopleLen,
                            cMAvr: data.cMAvr,
                            pePos: pePos,
                            pPos: data.pPos,
                            aPPos: aPPos,
                            pAll: pAll,
                            myCities: myCities
                        }});
                    }
                    break;
                case 'cPeopleX':
                    clearInterval(kPeople);
                    $('.sPeopleLen > span').html(data.peopleLen);
                    console.log(data.cMAvr);
                    cAvr.push(data.cMAvr);
                    $('a.'+data.cMAvr).remove();
                    $('span.'+data.cMAvr).parent().find('.sBoss, .sFlat').remove();
                    pAll--;
                    aPPos = Math.floor(Math.random() * pAll) + 1;
                    if(people._id==data.people._id)
                    {
                        people = data.people;
                        window.location.assign(BASEURLs + '/classes?id='+people._id);
                    }
                    break;
                case 'cPeople':
                    if(people._id!=wId)
                    {
                        if(people._id==data.people._id)
                            people = data.people;
                        $('.sPeopleLen > span').html(data.peopleLen);
                        cMAvr = data.cMAvr;
                        myCities = data.myCities;
                        $('.sAvatar > img').attr('src', SKIN+'/imgs/avr/'+cMAvr+'.jpg').fadeTo(200, 1);
                        pPos = data.pPos;
                        aPPos = data.aPPos;
                        pePos = data.pePos;
                        pAll = data.pAll;
                        animPePos(pePos, data.people);
                    }
                    break;
                case 'thing1':
                    if(data.people._id==people._id && data.hasOwnProperty('salary'))
                        salary=data.salary;
                case 'thing2':
                    showAction(data.thing.title, function(){
                        
                    });
                    if(data.to=='thing2')
                        switch(data.thing.position)
                        {
                            case 15:
                                if(data.people._id==people._id)
                                    salary = -1;
                            case 3:
                            case 7:
                            case 8:
                            case 9:
                            case 11:
                            case 12:
                            case 16:
                            case 17:
                                thingExec(data);
                                break;
                            default:
                                if(data.thing.except.hasOwnProperty('pPeoples'))
                                    if(data.credits[people._id]!=false)
                                        $('.sCoin span').html(data.credits[people._id]);
                                if(data.thing.except.hasOwnProperty('iso') && data.people._id==people._id)
                                {
                                    iso += data.thing.except['iso'];
                                    isSellVacc();
                                }
                                aPPos = data.aPPos;
                                if(data.aPPos == pPos)
                                    $('.aWaiting').fadeIn(300, function(){
                                        $(this).removeClass('aWaiting');
                                        machineExperiences();
                                    });
                                break;
                        }
                    else
                        switch(data.thing.position)
                        {
                            case 15:
                                if(data.people._id==people._id)
                                    salary = -1;
                            case 17:
                                thingExec(data);
                                break;
                            default:
                                if(data.thing.except.hasOwnProperty('pPeoples'))
                                    if(data.credits[people._id]!=false)
                                        $('.sCoin span').html(data.credits[people._id]);
                                if(data.thing.except.hasOwnProperty('iso') && data.people._id==people._id)
                                {
                                    iso += data.thing.except['iso'];
                                    isSellVacc();
                                }
                                aPPos = data.aPPos;
                                if(data.aPPos == pPos)
                                    $('.aWaiting').fadeIn(300, function(){
                                        $(this).removeClass('aWaiting');
                                        machineExperiences();
                                    });
                                break;
                        }
                    if(people._id==data.people._id)
                        $('.sCoin span').html(data.watts);
                    break;
                case 'searchVaccine':
                    if (data.people.pead != people.pead)
                    {
                        $('.dTalkDetail > div').append('<div>' +
                            '<div class="dChatBg"></div>' +
                            '<div class="dChat' + ((data.people.pead == people.pead) ? ' dMe' : '') + '">' +
                            '<a class="aVatar" title="'+((data.people.displayname!='')? data.people.displayname: data.people.schoolname)+'"><img src="' + ((data.people.image != '' && data.people.image != null) ? data.people.image : SKIN + '/imgs/avr/' + data.cMAvr + '.jpg') + '" alt="wsup3"/></a>Đang cần tìm 1 <span class="sVaccImg"><img src="'+SKIN+'/imgs/vaccine.png" alt="cazs"/></span> để khỏi bị cách ly giá ' + (((parseInt($('.sPeopleLen > span').html())-1>0)? parseInt($('.sPeopleLen > span').html())-1: 1)*39) + ' <span class="sCoinImg"><img src="'+SKIN+'/imgs/Watt.png" alt="cazs"/></span>' + ((iso>0)? ' <span _id="'+data.people._id+'" class="sSellVaccNow">Bán</span>': '') +
                            '<a class="aChatOpt">.</a></div>' +
                            '</div>');
                    }
                    else
                    {
                        $('.dTalkDetail > div').append('<div>' +
                            '<div class="dChatBg"></div>' +
                            '<div class="dChat' + ((data.people.pead == people.pead) ? ' dMe' : '') + '">' +
                            '<a class="aVatar" title="'+((data.people.displayname!='')? data.people.displayname: data.people.schoolname)+'"><img src="' + ((data.people.image != '' && data.people.image != null) ? data.people.image : SKIN + '/imgs/avr/' + data.cMAvr + '.jpg') + '" alt="wsup3"/></a>Đang cần tìm 1 <span class="sVaccImg"><img src="'+SKIN+'/imgs/vaccine.png" alt="cazs"/></span> để khỏi bị cách ly giá ' + (((parseInt($('.sPeopleLen > span').html())-1>0)? parseInt($('.sPeopleLen > span').html())-1: 1)*39) + ' <span class="sCoinImg"><img src="'+SKIN+'/imgs/Watt.png" alt="cazs"/></span>' +
                            '<a class="aChatOpt">.</a></div>' +
                            '</div>');
                    }
                    $('.dTalkDetail').animate({ scrollTop: $('.dTalkDetail > div').height() + 33 + 10 }, 200);
                    break;
                case 'sellVaccine':
                    if (data.people.pead != people.pead)
                    {
                        $('.dTalkDetail > div').append('<div>' +
                            '<div class="dChatBg"></div>' +
                            '<div class="dChat' + ((data.people.pead == people.pead) ? ' dMe' : '') + '">' +
                            '<a class="aVatar" title="'+((data.people.displayname!='')? data.people.displayname: data.people.schoolname)+'"><img src="' + ((data.people.image != '' && data.people.image != null) ? data.people.image : SKIN + '/imgs/avr/' + data.cMAvr + '.jpg') + '" alt="wsup3"/></a>Đang cần bán 1 <span class="sVaccImg"><img src="'+SKIN+'/imgs/vaccine.png" alt="cazs"/></span> tránh cách ly giá ' + (((parseInt($('.sPeopleLen > span').html())-1>0)? parseInt($('.sPeopleLen > span').html())-1: 1)*39) + ' <span class="sCoinImg"><img src="'+SKIN+'/imgs/Watt.png" alt="cazs"/></span> <span _id="'+data.people._id+'" class="sShopVaccNow">Sắm</span>' +
                            '<a class="aChatOpt">.</a></div>' +
                            '</div>');
                    }
                    else
                    {
                        $('.dTalkDetail > div').append('<div>' +
                            '<div class="dChatBg"></div>' +
                            '<div class="dChat' + ((data.people.pead == people.pead) ? ' dMe' : '') + '">' +
                            '<a class="aVatar" title="'+((data.people.displayname!='')? data.people.displayname: data.people.schoolname)+'"><img src="' + ((data.people.image != '' && data.people.image != null) ? data.people.image : SKIN + '/imgs/avr/' + data.cMAvr + '.jpg') + '" alt="wsup3"/></a>Đang cần bán 1 <span class="sVaccImg"><img src="'+SKIN+'/imgs/vaccine.png" alt="cazs"/></span> tránh cách ly giá ' + (((parseInt($('.sPeopleLen > span').html())-1>0)? parseInt($('.sPeopleLen > span').html())-1: 1)*39) + ' <span class="sCoinImg"><img src="'+SKIN+'/imgs/Watt.png" alt="cazs"/></span>' +
                            '<a class="aChatOpt">.</a></div>' +
                            '</div>');
                    }
                    $('.dTalkDetail').animate({ scrollTop: $('.dTalkDetail > div').height() + 33 + 10 }, 200);
                    break;
                case 'sellVacc':
                    $('.sSellVaccNow[_id='+data.pId+']').parent().parent().remove();
                    if(people._id==data.people._id)
                    {
                        iso--;
                        $('.sCoin span').html(data.watts);
                    }
                    else
                        if(people._id==data.pId)
                        {
                            iso++;
                            $('.sCoin span').html(data.watts2);
                        }
                    isSellVacc();
                    break;
                case 'shopVacc':
                    $('.sShopVaccNow[_id='+data.pId+']').parent().parent().remove();
                    if(people._id==data.people._id)
                    {
                        iso++;
                        $('.sCoin span').html(data.watts);
                    }
                    else
                        if(people._id==data.pId)
                        {
                            iso--;
                            $('.sCoin span').html(data.watts2);
                        }
                    isSellVacc();
                    break;
                case 'kExit':
                    clearInterval(kPeople);
                    people.classes['game'] = null;
                    window.location.assign(BASEURLs + '/classes?id='+people._id);
                    break;
                case 'start':
                    $('.sVaccine').css('display', 'inline-block');
                    if(aPPos == pPos)
                    {
                        $('.aWaiting').fadeIn(300, function(){
                            $(this).removeClass('aWaiting');
                            machineExperiences();
                        });
                    }
                    break;
            }
        });
        $('.aSendMess').click(function(){
            if($('.dContentWriter').html()!='')
                web.iHome({action: 'iGameClass', data: {
                    path: $('.iChatRers').val(),
                    to: 'chat',
                    people: people,
                    text: $('.dContentWriter').html(),
                    cMAvr: cMAvr
                }});
        });
        $('.sStart').click(function(){
            if(parseInt($('.sPeopleLen > span').html())>=1)
            {
                $(this).fadeOut(300, function(){
                    $('.sMachine').css('display', 'inline-block');
                });
                web.iHome({action: 'iGameClass', data: {
                    path: $('.iChatRers').val(),
                    to: 'start',
                    playerLen: parseInt($('.sPeopleLen > span').html())
                }});
            }
            else
                alert('Có ít nhất 2 thành viên trong phòng mới có thể khởi hành trò chơi');
        });
        $('.sVaccine').click(function(){
            web.iHome({action: 'iGameClass', data: {
                path: $('.iChatRers').val(),
                to: 'searchVaccine',
                people: people,
                cMAvr: cMAvr
            }});
        });
        $('.sSellVacc').click(function(){
            web.iHome({action: 'iGameClass', data: {
                path: $('.iChatRers').val(),
                to: 'sellVaccine',
                people: people,
                cMAvr: cMAvr
            }});
        });
        $('.sMachine').toggle(function(){
            clearTimeout(timeOut);
            isMachine = true;
            machineExperiences();
            $('.sMachine input').css('fontWeight', 'bold');
        }, function(){
            clearTimeout(timeOut);
            isMachine = false;
            machineExperiences();
            $('.sMachine input').css('fontWeight', 'normal');
        });
        if(people._id==wId)
        {
            cMAvr = cAvr[0];
            myCities[cMAvr] = {pId: people._id};
            pPos = 1;
            pAll = aPPos = pPos;
            cAvr.shift();
            $('.sAvatar > img').attr('src', SKIN+'/imgs/avr/'+cMAvr+'.jpg').fadeTo(200, 1);
            people.classes = {game: $('.iChatRers').val()};
            pePos[cMAvr] = {
                steps: 0,
                pos: 65
            };
            animPePos(pePos, people);
//            setInterval(function(){
//                $('.aPeops:eq()').css('zIndex', 2);
//                $('.aPeops:not(.aPeops:eq())').css('zIndex', 1);
//            }, 1000);
        }
        else
        {
            kPeople = setInterval(function(){
                console.log(cMAvr);
                web.iHome({action: 'iGameClass', data: {
                    path: $('.iChatRers').val(),
                    to: 'kPeople',
                    pePos: {
                        steps: 0,
                        pos: 65
                    },
                    cMAvr: cMAvr,
                    people: people,
                    creater: ((people._id==wId)? true: false),
                    worked: worked,
                    pPos: pPos
                }});
            }, 2888);
        }
    };
    var kPeople;
    var params = {
        BASEURL: (typeof BASEURL == 'undefined')? '': BASEURL
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready
    };
};
var Address = function(p){
    var ready = function(){
        if(people != null && people != {} && adId == people._id)
        {
            $('.dtWrite').html('9000');
            $('.dttWrite').attr('title', $('.dttWrite').attr('title')+'9000 coin');
        }
        else
        {
            $('.dtWrite').html('11000');
            $('.dttWrite').attr('title', $('.dttWrite').attr('title')+'11000');
            $('.dClassesArticle .sCoin, .dClassesArticle .aAddCoin').remove();
        }
        $('.aChangeTexts, .aChangeName, .aChangeAva').css('display', 'inline-block').fadeTo(299, 1);
        $('.dClassesArticle .sCoin, .dClassesArticle .aAddCoin').css('display', 'inline-block !important').fadeTo(299, 1);
        $('.dClassesContrl').fadeIn(250);
        $('.aAddFriend').live('click', function(){
            web.iReq({action: 'iAddFr', id: adId}, function(dt){
                window.localStorage.setItem('people', JSON.stringify(dt));
                people = dt;
                $('.aAddFriend').html('Xóa liên hệ').addClass('aDelFriend').removeClass('aAddFriend');
            });
        });
        $('.aDelFriend').live('click', function(){
            web.iReq({action: 'iDelFr', id: adId}, function(dt){
                window.localStorage.setItem('people', JSON.stringify(dt));
                people = dt;
                $('.aDelFriend').html('Thêm liên hệ').addClass('aAddFriend').removeClass('aDelFriend');
            });
        });
        $('.aChangeName').toggle(function(){
            $('.iDisplayname').attr('readonly', false).addClass('iEditName').focus();
            $(this).addClass('tBtn');
        }, function(){
            $('.iDisplayname').attr('readonly', true).removeClass('iEditName').blur();
            $(this).removeClass('tBtn');
            web.iReq({action: 'iChangeInfo', people: people, displayname: $('.iDisplayname').val(), intro: $('.tTexts').val()}, function (dt) {
                people.displayname = $('.iDisplayname').val();
            });
        });
        $('.aChangeTexts').toggle(function(){
            $('.tTexts').attr('readonly', false).addClass('iEditName').focus();
            $(this).addClass('tBtn');
        }, function(){
            $('.tTexts').attr('readonly', true).removeClass('iEditName').blur();
            $(this).removeClass('tBtn');
            web.iReq({action: 'iChangeInfo', people: people, displayname: $('.iDisplayname').val(), intro: $('.tTexts').val()}, function (dt) {
                people.parameters = [{intro: $('.tTexts').val()}];
            });
        });
        $('#iMedia').live('change', function(e){
            count = 1;
            switch($('.lUpload').attr('type'))
            {
                case 'image':
                    if(this.files.length>0)
                        $.each(this.files, function(k, v) {
                            if(v){
                                var reader = new FileReader();
                                reader.onload = function (e) {
                                    $.ajax({
                                        url: BASEURL + '/' + LANG + '/media/addPic',
                                        type: 'POST',
                                        data: {data: e.target.result, wid: people._id, class: people.class, pead: people.pead, name: v.name, type: 'image'},
                                        dataType: 'json',
                                        success: function (dt) {
                                            if(dt.status == true)
                                            {
                                                $('.fImages').append('<div class="dNewItem">' +
                                                    '<img wid="' + people._id + '" site="' + dt.link + '" _id="' + dt.mediaid + '" src="' + dt.link + '/multimedia/' + dt.mediaid + '" alt="wsup3" title="' + v.name + '"/>' +
                                                    '<div class="dText">' +
                                                    '<span class="sGlass"></span>' +
                                                    '<span class="sTitle">'+v.name+'</span></div></div>');
                                                metroImgs.addItems($('.dNewItem'), 1);
                                            }
                                            else
                                                alert(dt.err);
                                            $('.dProcess').css('display', 'none');
                                            location.hash = LANG + "¬done";
                                        },
                                        xhr: function () {
                                            xhr = new XMLHttpRequest();
                                            xhr.upload.addEventListener('progress', function (evt) {
                                                if (evt.lengthComputable && count == 1) {
                                                    count = 0;
                                                    var percentComplete = evt.loaded / evt.total;
                                                    percentComplete = parseInt(percentComplete * 100);
                                                    $('.dProcess').css('display', 'block').animate({ height: percentComplete + '%'}, 300);
                                                    $('.dProcess span').text(percentComplete + '%');
                                                    setTimeout('count = 1', 300);
                                                }
                                            }, false);
                                            return xhr;
                                        }
                                    });
                                };
                                reader.readAsDataURL(v);
                            }
                        });
                    break;
            }
        });
        $('.aAccepts').live('click', function(){
            if($('.dBoardImages').attr('image')=='write')
            {
                tmp = '';            
                $('.sItemChk').each(function(){
                    tmp += '<img src="'+$(this).parent().parent().find('> img').attr('src')+'" alt="wsup3"/>';
                });
                CKEDITOR.instances['write'].insertHtml(tmp);
                $('.sItemChk').removeClass('sItemChk');
            }
            else
                web.iReq({action: 'iChangeInfo', people: people, image: $('.sItemChk').parent().prev().attr('src'), displayname: $('.iDisplayname').val(), intro: $('.tTexts').val()}, function (dt) {
                    $('.aGamerAva img').attr('src', $('.sItemChk').parent().prev().attr('src'));
                    $('.sItemChk').removeClass('sItemChk');
                    people.image = $('.sItemChk').parent().prev().attr('src');
                });
            $('.dBoardImages').fadeOut(200);
            $('.dItem > div').die('click');
        });
        $('.aWrite:not(.aWriting)').live('click', function(){
            $(this).addClass('aWriting');
            $('.aSGift').addClass('aSGifting');
            var item = { cats: {0: '628d7e78e49a440004efc9ce'} };
            item.wid = people._id;
            $.each(flags, function (key, value) {
                item['title' + key] = 'Game news '+people._id;
                item['except' + key] = '';
                if (CKEDITOR.instances['write'].getData() != '')
                    item['detail' + key] = CKEDITOR.instances['write'].getData();
                item['imgs' + key] = {};
                item['params' + key] = {address: [addr]};
            });
            item.path = 'game-news-'+people._id;
            item.site = LINK;
            item.type = 'post';
            item.opath = '';
            item.live = 'true';
            item.views = 1;
            web.iReq({action: 'iWriteGN', adId: adId, item: item}, function (dt) {
                if(dt.writed)
                {
                    $('.sCoin span').html(dt.coin);
                    $('.dLineStartNews').after('<div><div class="dGameNews dPGameNews dMyNews">\n\
                        <div class="tGameText">\n\
                            <div class="dDetailText"><a class="aPeDName" href="'+BASEURLs+'/address/'+people.pead+'/'+people.pead+'">'+people.displayname+'</a><br/><div>' +item['detailvi']+ '</div></div>\n\
                        </div>\n\
                        <a class="tGameImg aGamerAva aNewAva"><img src="'+((people.image!='')? people.image: SKIN+'/logo.png')+'" alt="cazs"/></a>\n\
                    </div>\n\
                    <div style="display: block" class="dClassesContrl dClassesContrlMenu stARight stChange">\n\
                        <a href="'+BASEURLs+'/article/'+dt.item.path+'/'+dt.item.params.address[0]+'" title="'+BASEURLs+'/article/'+dt.item.path+'/'+dt.item.params.address[0]+'"><i class="fa fa-link"></i></a>\n\
                        <a class="aGNShare" title="'+dt.shared+'/30/tháng"><span>Share</span> (<data class="dtShare">'+dt.shared+'</data>/30)</a>\n\
                        <a class="aGNLike" title="Like"><span>Like</span> <span>(<data class="dtLike">0</data>)</span> - 2 <img src="'+SKIN+'/imgs/Watt.png" alt="cazs"/></a>\n\
                        <a class="aGNVChecked" title="Checked">Checked <span>(0)</span> - 170 <img src="'+SKIN+'/imgs/Watt.png" alt="cazs"/></a>\n\
                        <a class="aGNEdit" contentid="'+dt.item.contentidvi+'" title="Chỉnh lại bài viết - 1100S"><i class="fa fa-edit"></i> - 1100 <img src="'+SKIN+'/imgs/Watt.png" alt="cazs"/></a>\n\
                        <a class="aGNDel">Delete</a>\n\
                    </div>\n\
                    <div style="display: block" class="dClassesContrl"></div></div>');
                    hover($('.aNewAva').first(), {scale: 1.05}, {scale: 1}, 0.3);
                }
                else
                    alert('Cần '+$('.dtWrite').html()+' coin để đăng bài viết');
                $('.aWriting').removeClass('aWriting');
                $('.aSGifting').removeClass('aSGifting');
                CKEDITOR.instances['write'].setData('Viết bài...');
            });
        });
        $('#iSTran').live('click', function(){
            if(people._id!=undefined)
                web.iReq({action: 'iSTran', price: $('#iPTran').val()}, function (dt) {
                    window.location.assign(dt);
                });
            else
                window.location.assign(BASEURLs + '/admin');
        });
        $('.aSGift:not(.aSGifting)').live('click', function(){
            if(parseInt(CKEDITOR.instances['write'].getData())>0)
            {
                $(this).addClass('aSGifting');
                $('.aWrite').addClass('aWriting');
                web.iReq({action: 'iSGift', adId: adId, sGift: parseInt(CKEDITOR.instances['write'].getData())}, function (dt) {
                    if(dt.isGift)
                    {
                        $('.sCoin span').html(dt.coin);
                        $('.aSGift dText').html('Đã tặng '+CKEDITOR.instances['write'].getData()+' ');
                        setTimeout(function(){
                            $('.aSGift dText').html('Tặng');
                            $('.dtSGift').html(dt.gifted);
                        }, 5000);
                    }
                    else
                        alert('Cần '+CKEDITOR.instances['write'].getData()+'S để tặng và cần đăng tối thiểu 15 bài viết, hoặc tổng số S tặng vượt mức');
                    $('.aSGifting').removeClass('aSGifting');
                    $('.aWriting').removeClass('aWriting');
                    CKEDITOR.instances['write'].setData('Viết bài...');
                });
            }
            else
            {
                alert('Mời bạn ghi số S, không chứa ký tự, chỉ bao gồm số');
                CKEDITOR.instances['write'].setData('Ghi số<img src="/public/media/images/skin/admin/watt.png" height="21px" width="auto"/>ở đây, không chứa ký tự, chỉ bao gồm số (xóa toàn bộ dòng này)');
            }
        });
        $('.aCancelEdit').live('click', function(){
            $('.aEditGNews, .aCancelEdit').fadeOut(290, function(){
                CKEDITOR.instances['write'].setData('Viết bài...');
                $('.dShowDefault').fadeIn(290);
            });
        });
        $('.aEditGNews').live('click', function(){
            me = $(this);
            web.iReq({action: 'iSetArticle', detail: CKEDITOR.instances['write'].getData(), contentid: me.attr('contentid')}, function (dt) {
                if(dt.isEdit)
                {
                    $('.sCoin span').html(dt.coin);
                    $('.aGNEdit[contentid='+me.attr('contentid')+']').parent().prev().find('.dDetailText div:eq(0)').html(CKEDITOR.instances['write'].getData());
                }
                else
                    alert('Cần 1100S để chỉnh lại bài viết');
                $("html, body").animate({scrollTop: $('.aGNEdit[contentid='+me.attr('contentid')+']').offset().top-250}, 290);
                $('.aEditGNews, .aCancelEdit').fadeOut(290, function(){
                    CKEDITOR.instances['write'].setData('Viết bài...');
                    $('.dShowDefault').fadeIn(290);
                });
            });
        });
        $('.aGNEdit').live('click', function (){
            if(parseInt($('.sCoin span').html())>1100)
            {
                me = $(this);
                web.iReq({action: 'iGetArticle', contentid: me.attr('contentid')}, function (dt) {
                    CKEDITOR.instances['write'].setData(dt.detail);
                    $('.dShowDefault').fadeOut(290, function(){
                        $('.aEditGNews, .aCancelEdit').css({'display': 'inline-block', opacity: 0}).fadeTo(290, 1);
                        $('.aEditGNews').attr('contentid', me.attr('contentid'));
                    });
                    $("html, body").animate({scrollTop: 290}, 290);
                });
            }
            else
                alert('Cần 1100S để chỉnh lại bài viết');
        });
    };
    var delImg = function(img){
        web.iReq({action: 'iDeleteFile', id: img.attr('_id'), site: img.attr('site')}, function(dt){
            if(dt.status == true)
            {
                img.parent().parent().remove();
                if($('.sItemChk').length>0)
                    delImg($('.sItemChk:eq(0)').parent().prev());
                else
                {
                    $('.iDel').fadeIn(200, function(){
                        $('.iDelY, .aDelete').fadeOut(200);
                    });
                    $('.aDelete').attr('deleting', 0);
                }
            }
        });
    };
    var loaded = function(){
        $('.aChangeAva').click(function(){
            if($('#fImages').html()=='')
                $('.dBoardImages .sBtnMore').trigger('click');
            $('.dBoardImages').attr('image', 'avatar').fadeIn(299);
            $('.dItem > div').live('click', function(){
                $('.sItemChk').removeClass('sItemChk');
                $(this).find('.sTitle').toggleClass('sItemChk');
                $('.aDelete, .iDel').fadeIn(290);
                $('.iDelY').fadeOut(290);
            });
        });
        $('.aCloseImgs').click(function(){
            $('.dBoardImages, .aDelete, .iDelY').fadeOut(290, function(){
                $('.iDel').fadeIn(290);
                $('.sItemChk').removeClass('sItemChk');
            });
            $('.dItem > div').die('click');
        });
        $('.aDelete').click(function(){
            if($('.aDelete').attr('deleting')==0)
            {
                if($('.iDelY').css('display')=='none')
                    $('.iDelY').fadeIn(200, function(){
                        $('.iDel').fadeOut(200);
                    });
                else
                {
                    if($('.sItemChk').length>0)
                    {
                        $('.aDelete').attr('deleting', 1);
                        delImg($('.sItemChk:eq(0)').parent().prev());
                    }
                    else
                    {
                        $('.aDelete, .iDelY').fadeOut(290);
                        $('.iDel').fadeIn(290);
                    }
                }
            }
        });
        $('.aGamerAddress').click(function(){
            if(people != null && people != {} && people._id != undefined)
                window.location.assign(BASEURLs + '/address/'+people.pead+'/'+people.pead);
            else
                window.location.assign(BASEURLs + '/admin');
        });
        $('.aWebRegister').click(function(){
            if(people != null && people != {} && people._id != undefined)
                window.location.assign(BASEURLs + '/dang-ky-web?pead='+people.pead);
            else
                window.location.assign(BASEURLs + '/admin');
        });
        $('.aGamerNews').click(function(){
            if(people != null && people != {} && people._id != undefined)
                window.location.assign(BASEURLs + '/game-news/'+people.pead);
            else
                window.location.assign(BASEURLs + '/admin');
        });
        $('.aGamerPlay').click(function(){
            if(people != null && people != {} && people._id != undefined)
                window.location.assign(BASEURLs + '/classes?id='+people._id);
            else
                window.location.assign(BASEURLs + '/admin');
        });
        $('.aGNShare').live('click', function(){
            me = $(this)
            me.find('> span:eq(0)').text('Sharing');
            var item = { cats: {0: '628d7e78e49a440004efc9ce'} };
            item.wid = people._id;
            $.each(flags, function (key, value) {
                item['title' + key] = 'Game news '+people._id;
                item['except' + key] = '';
                item['detail' + key] = ' ';
                item['imgs' + key] = {};
                item['params' + key] = {address: [people.pead], GNShare: [me.parent().prev().attr('path')]};
            });
            item.path = 'game-news-'+people._id;
            item.site = LINK;
            item.type = 'post';
            item.opath = '';
            item.live = 'true';
            item.views = 1;
            web.iReq({action: 'iWriteGN', adId: null, item: item}, function (dt) {
                if(dt.writed)
                {
                    $('.dtShare').text(dt.shared).parent().attr('title', dt.shared+'/30/tháng');
                    alert('Đã chia sẻ bài viết tại địa chỉ cá nhân');
                }
                else
                    alert('Đã hết 30 lần chia sẻ tháng này');
                $('.aGNShare').find('> span:eq(0)').text('Share');
            });
        });
        $('.aGNChecked').live('click', function(){
            me = $(this);
            me.find('> span:eq(0)').text('I checked');
            me.find('.dtChecked').text(parseInt(me.find('.dtChecked').text())+1);
            me.addClass('aGNIChecked').removeClass('aGNChecked');
            web.iReq({action: 'iSelectGN', select: 'check', _id: ((me.parent().parent().find('.dAGameNews').length>0)? me.parent().parent().find('.dPGameNews').attr('_id'): ((me.parent().parent().find('.dSGameNews').length>0)? me.parent().parent().find('.dSGameNews').attr('_id'): me.parent().parent().find('.dPGameNews').attr('_id'))), path: ((me.parent().parent().find('.dAGameNews').length>0)? me.parent().parent().find('.dPGameNews').attr('path'): ((me.parent().parent().find('.dSGameNews').length>0)? me.parent().parent().find('.dSGameNews').attr('path'): me.parent().parent().find('.dPGameNews').attr('path')))}, function (dt) {
                if(dt.st)
                {
                    $('.sCoin span').html(dt.coin);
                    if(people._id == me.parent().parent().find('.dMyNews:eq(0)').attr('_id'))
                        $('.sCoin span').html(dt.watts);
                }
                else
                    me.find('> span:eq(0)').text('Checked');
            });
        });
        $('.aGNDel').live('click', function(){
            me = $(this);
            if(me.text() == 'Click will delete')
                web.iReq({action: 'iDelArticle', path: me.parent().parent().find('.dMyNews:eq(0)').attr('path')}, function (dt) {
                    me.parent().parent().remove();
                });
            else
                me.text('Click will delete');
        });
        if (typeof (CKEDITOR.instances['write']) == 'undefined' && $('.tWrite').length>0) {
            ck = CKEDITOR.replace('write');
            CKEDITOR.config.height = 100;
            ck.addCommand("addImages", {
                exec: function(edt) {
                    if($('#fImages').html()=='')
                        $('.dBoardImages .sBtnMore').trigger('click');
                    if(typeof(fn)=='function')
                        fn();
                    $('.dItem > div').live('click', function(){
                        $(this).find('.sTitle').toggleClass('sItemChk');
                        if($('.sItemChk').length>0)
                        {
                            $('.aDelete, .iDel').fadeIn(290);
                            $('.iDelY').fadeOut(290);
                        }
                        else
                        {
                            $('.aDelete, .iDelY').fadeOut(290);
                            $('.iDel').fadeIn(290);
                        }
                    });
                    $('.dBoardImages').attr('image', 'write').fadeIn(299);
                }
            });
            ck.ui.addButton('Images', {
                label: "Images",
                command: 'addImages',
                toolbar: 'insert',
                icon: SKIN + '/admin/imgicon.png'
            });
        }
        $('.aGNLike').live('click', function(){
            me = $(this);
            me.find('> span:eq(0)').text('Liked');
            me.find('.dtLike').text(parseInt(me.find('.dtLike').text())+1);
            me.addClass('aGNLiked').removeClass('aGNLike');
            web.iReq({action: 'iSelectGN', select: 'like', _id: ((me.parent().parent().find('.dAGameNews').length>0)? me.parent().parent().find('.dPGameNews').attr('_id'): ((me.parent().parent().find('.dSGameNews').length>0)? me.parent().parent().find('.dSGameNews').attr('_id'): me.parent().parent().find('.dPGameNews').attr('_id'))), path: ((me.parent().parent().find('.dAGameNews').length>0)? me.parent().parent().find('.dPGameNews').attr('path'): ((me.parent().parent().find('.dSGameNews').length>0)? me.parent().parent().find('.dSGameNews').attr('path'): me.parent().parent().find('.dPGameNews').attr('path')))}, function (dt) {
                if(dt.st)
                {
                    $('.sCoin span').html(dt.coin);
                    if(people._id == me.parent().parent().find('.dMyNews:eq(0)').attr('_id'))
                        $('.sCoin span').html(dt.watts);
                }
                else
                    me.find('> span:eq(0)').text('Like');
            });
        });
        $('.aGNLiked').live('click', function(){
            me = $(this);
            me.find('> span:eq(0)').text('Like');
            me.find('.dtLike').text(parseInt(me.find('.dtLike').text())-1);
            me.addClass('aGNLike').removeClass('aGNLiked');
            web.iReq({action: 'iDelSelectGN', select: 'like', _id: ((me.parent().parent().find('.dAGameNews').length>0)? me.parent().parent().find('.dPGameNews').attr('_id'): ((me.parent().parent().find('.dSGameNews').length>0)? me.parent().parent().find('.dSGameNews').attr('_id'): me.parent().parent().find('.dPGameNews').attr('_id'))), path: ((me.parent().parent().find('.dAGameNews').length>0)? me.parent().parent().find('.dPGameNews').attr('path'): ((me.parent().parent().find('.dSGameNews').length>0)? me.parent().parent().find('.dSGameNews').attr('path'): me.parent().parent().find('.dPGameNews').attr('path')))}, function (dt) {
                if(dt.st)
                {
                    if(people._id == me.parent().parent().find('.dMyNews:eq(0)').attr('_id'))
                        $('.sCoin span').html(dt.coin);
                    $('.sCoin span').html(dt.watts);
                }
                else
                    me.find('> span:eq(0)').text('Liked');
            });
        });
        $('.sBtnMore').live('click', function(){
            me = $(this);
            me.fadeOut(250);
            params = {action: 'iGetMores', type: me.attr('type'), from: me.parent().prev().find('.dCategory').length, keys: '', opt: undefined};
            switch(me.attr('type'))
            {
                case 'image':
                    params.from = $('.fImages .dItem > div').length;
                    break;
            }
            web.iReq(params, function (dt) {
                switch(me.attr('type'))
                {
                    case 'image':
                        if(dt.length>0)
                        {
                            $.each(dt, function(k, v){
                                $('.fImages').append('<div class="dNewItem">' +
                                    '<img wid="' + people._id +'" site="'+v.site+'" _id="'+v.mediaid+'" src="'+v.site+'/multimedia/'+v.mediaid + '" alt="wsup3" title="'+v.name+'"/>' +
                                    '<div class="dText">' +
                                    '<span class="sGlass"></span>' +
                                    '<span class="sTitle">'+v.name+'</span></div></div>');
                            });
                            metroImgs.addItems($('.dNewItem'), 1);
                        }
                        break;
                }
                if(dt.length<9 && me.attr('type') != 'mfriend' && me.attr('type') != 'friend')
                    me.fadeOut(250);
                else
                    me.fadeIn(250);
            });
        });
    };
    var metroImgs = new Metro({
        BASEURL: BASEURL,
        classFrame: 'fImages',
        classItem: 'dItem',
        classBlur: 'sBlurItem',
        height: 260,
        width: 260,
        sharp: 4,
        sharps: false
    });
    var OpenPhotos = function (callback) {
        changePage($('.dBoardImages'), 'dShow', {
            fn: function () {
                $('.dBoardImages .sBtnMore').trigger('click');
                if (typeof (callback) == 'function')
                    callback();
            }, params: {}
        });
    };
    var params = {
        BASEURL: (typeof BASEURL == 'undefined')? '': BASEURL
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready
    };
};
var GameXyz = function(p){
    var ready = function(){
        
    };
    var loaded = function(){
        
    };
    var params = {
        BASEURL: (typeof BASEURL == 'undefined')? '': BASEURL
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready
    };
};
var Music = function(p){
    var ready = function(){
        people = JSON.parse((web.done(window.localStorage.getItem('people'), {})));
        if (people._id != undefined)
        {
            $('.iLogin').css('display', 'none');
            $('.lPlaylist').css('display', 'inline-block');
            $('.lPlaylist span').prepend(tran('Nhạc của|Playlists of|||')+' '+people.displayname);
            $('#iNameRequire').val(people.displayname).attr('readonly', 'readonly');
        }
        audio = new AudiObj({
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
            timingFn: function(params){
                $('.fa-pause-circle').removeClass('fa-pause-circle').addClass('fa-play-circle');
                $('a[title="'+params.controls.titleObj.val()+'"] .fa-play-circle').removeClass('fa-play-circle').addClass('fa-pause-circle');
            }
        });
        audio.setPlaylists(audios, function(params){
            if(audios.length<16)
                web.iReq({action: 'iCreateListMusic', list: audios}, function(dt){
                    params.controls.frameAudio.attr('ready', 1);
                    params.src = dt;
                    if(params.player.currentTime>0 || params.src != params.player.src)
                    {
                        audio.stop();
                        audio.play();
                    }
                });
        });
        $('.aSearchsSong').click(function(){
            $('.tSongTitle').select();
            web.iReq({action: 'iFindAudio', keys: (($('.tSongTitle').val().trim()!='')? $('.tSongTitle').val(): '.')}, function(dt){
                if(dt!=null && dt.length>0)
                {
                    $('.dItems > div:not(.dPlayerFrame)').remove();
                    audios = dt;
                    temp = '<div style="display: inline-block; width: 100%;">';
                    $.each(dt, function(k, v){
                        if(k%2==0 && k>0)
                        {
                            temp += '</div>';
                            $('.dItems').append(temp);
                            temp = '<div style="display: inline-block; width: 100%;">';
                        }
                        temp += '<div class="d_theme dChangePlaylist">' +
                            '<a title="'+v.name+'"><img src="'+SKIN+'/logo2.png" alt="wsup3"/></a>' +
                            '<p><a title="'+v.name+'"><i class="far fa-play-circle"></i> '+v.name+'</a></p>' +
                            '<p><i class="far fa-clock"></i> ' + v.params.duration + 's - ' + v.dateVN + '</p></div>';
                    });
                    temp += '</div>';
                    $('.dItems').append(temp);
                    hover($('.dChangePlaylist > a'), {scale: 1.05}, {scale: 1}, 0.3);
                }
            });
        });
        $("#fLoginHead").validate({
            rules: {
                emaillog: {required: true, email: true},
                passlog: {required: true, minlength: 4, maxlength: 32}
            },
            messages: {
                emaillog: {
                    required: tran("Mời bạn nhập email|Please enter your email|Пожалуйста, введите ваш emai|请输入您的电子邮件|あなたのメールアドレスを入力してください"),
                    email:tran("Địa chỉ email không hợp lệ|Please enter your email|Пожалуйста введите ваш e-mail|请输入您的电子邮件|あなたのメール アドレスを入力してください。")
                },
                passlog: {
                    required: tran("Mời bạn nhập Mật khẩu|Please enter your password|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
                    minlength: tran("Mật khẩu quá ngắn, tối thiểu 4 ký tự|Password too short, min 4 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
                    maxlength: tran("Mật khẩu quá dài, tối đa 32 ký tự|Password too long, max 32 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。")
                }
            },
            submitHandler: function(){
                web.iReq({action: 'iLogin', email: $('#iEmailLog').val(), password: $('#iPassLog').val()}, function(data){
                    if(data == null)
                        $('#fLoginHead label[for=iPassLog]').html(tran('Email hoặc mật khẩu không đúng|Email or password is incorrect|||')).css('display', 'block');
                    else
                    {
                        people = data.people;
                        window.localStorage.setItem('people', JSON.stringify(data.people));
                        window.localStorage.setItem('flags', JSON.stringify(data.flags));
                        $('.iLogin').fadeOut(200, function(){
                            $('.lPlaylist').css('display', 'inline-block');
                            $('.lPlaylist span').prepend(tran('Nhạc của|Playlists of|||')+' '+data.people.displayname);
                        });
                        web.iReq({action: 'iGetPlaylists'}, function(md){
                            if(md.length>0)
                                $.each(md, function(k, v){
                                    $('.sInsertPlaylist select option:eq(0)').after('<option date="'+ v.dateVN+'" value="'+ v._id +'">'+ v.params.name +'</option>');
                                });
                        });
                    }
                });
            }
        });
        var c = document.getElementById("cCaptcha");
        var ctx = c.getContext("2d");
        var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
        gradient.addColorStop("0", "#3F5D7D");
        gradient.addColorStop("0.5", "#279B61");
        gradient.addColorStop("1.0", "#008AB8");
        ctx.fillStyle = gradient;
        ctx.font = "16px Arial";
        ctx.fillText(web.getCode(6), 0, 20);
        $("#fRegisterHead").validate({
            rules: {
                emailres: {required: true, email: true},
                passres: {required: true, minlength: 4, maxlength: 32},
                repassres: {equalTo: '#fRegisterHead #iPassRes'},
                nameres: {required: true},
                captcha: {required: true, minlength: 6, maxlength: 6}
            },
            messages: {
                emailres: {
                    required: tran("Mời bạn nhập email|Please enter your email|Пожалуйста, введите ваш emai|请输入您的电子邮件|あなたのメールアドレスを入力してください"),
                    email:tran("Địa chỉ email không hợp lệ|Please enter your email|Пожалуйста введите ваш e-mail|请输入您的电子邮件|あなたのメール アドレスを入力してください。")
                },
                passres: {
                    required: tran("Mời bạn nhập Mật khẩu|Please enter your password|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
                    minlength: tran("Mật khẩu quá ngắn, tối thiểu 4 ký tự|Password too short, min 4 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
                    maxlength: tran("Mật khẩu quá dài, tối đa 32 ký tự|Password too long, max 32 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。")
                },
                repassres: {
                    equalTo: tran("Nhập lại mật khẩu không đúng|Re-enter your password wrong|Пожалуйста, введите ваш пароль|请重新输入您的密码|あなたのパスワードを再入力してください。")
                },
                nameres: {
                    required: tran("Mời bạn nhập tên tài khoản|Please enter your display name|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。")
                },
                captcha: {
                    required: tran("Mời bạn nhập mã xác nhận|Please enter conrfirm code|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
                    minlength: tran("Mã xác nhận quá ngắn, tối thiểu 6 ký tự|conrfirm code too short, min 6 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
                    maxlength: tran("Mã xác nhận quá dài, tối đa 6 ký tự|conrfirm code too long, max 6 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。")
                }
            },
            submitHandler: function(){
                if(web.checkCode($('#iCaptcha').val()))
                {
                    web.iReq({action: 'iRegister', email: $('#fRegisterHead #iEmailRes').val(), password: $('#fRegisterHead #iPassRes').val(), displayname: $('#fRegisterHead #iNameRes').val()}, function(data){
                        if(data.status==false)
                            $('#fRegisterHead label[for=iCaptcha]').html(data.msg).css('display', 'block');
                        else
                        {
                            $('.bLogin').trigger('click');
                            $('#fLoginHead label[for=iPassLog]').html(tran('Mời bạn đăng nhập tài khoản|You can login here, please|||')).css('display', 'block');
                        }
                    });
                }
                else
                    $('label[for=iCaptcha]').html('Mã xác nhận không đúng').css('display', 'block');
            }
        });
        $('.bRegis').click(function(){
            if($('#fRegisterHead').css('display')=='block')
                $("#fRegisterHead").submit();
            else
            {
                $('#fLoginHead').css('display', 'none');
                $('#fRegisterHead').css('display', 'block');
            }
        });
        $('.bLogin').click(function(){
            if($('#fLoginHead').css('display')=='block')
                $("#fLoginHead").submit();
            else
            {
                $('#fRegisterHead').css('display', 'none');
                $('#fLoginHead').css('display', 'block');
            }
        });
        $('.aMusicPage').click(function(){
            $('.tSongTitle').val('.');
            $('.aSearchsSong').trigger('click');
            $('.tSongTitle').val('');
            TweenMax.to($('html, body'), 0.2, {scrollTop: 170});
        });
        $(".dRequireSong form").validate({
            rules: {
                songrequire: {required: true, minlength: 2, maxlength: 600},
                namerequire: {required: true, minlength: 2, maxlength: 60}
            },
            messages: {
                songrequire: {
                    required: tran("Mời bạn nhập tên bài hát và tên nghệ sĩ|Please enter song name and astist name|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
                    minlength: tran("Tên bài hát và tên nghệ sĩ quá ngắn, tối thiểu 2 ký tự|Song name and astist name too short, min 2 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
                    maxlength: tran("Tên bài hát và tên nghệ sĩ quá dài, tối đa 600 ký tự|Song name and astist name too long, max 600 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。")
                },
                namerequire: {
                    required: tran("Mời bạn nhập tên|Please enter your display name|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
                    minlength: tran("Tên quá ngắn, tối thiểu 2 ký tự|Display name too short, min 2 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
                    maxlength: tran("Tên quá dài, tối đa 60 ký tự|Display name too long, max 60 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。")
                }
            },
            submitHandler: function(){
                web.iReq({action: 'iContactsSong', isLogin: ((people._id != undefined)? 1: 0), detail: $('#iSongRequire').val(), displayname: $('#iNameRequire').val()}, function(md){
                    $('.dRequireList').prepend('<p><i class="fas fa-hourglass-half"></i> '+md.detail+' <sub>'+md.fullname+' - '+web.getFormatNow()+'</sub></p>');
                });
                $('#iSongRequire').val('');
            }
        });
        $('.dRequireSong button').click(function(){
            $(".dRequireSong form").submit();
        });
    };
    var loaded = function(){
        if (people._id != undefined)
            web.iReq({action: 'iGetPlaylists'}, function(md){
                if(md.length>0)
                    $.each(md, function(k, v){
                        $('.sInsertPlaylist select option:eq(0)').after('<option date="'+ v.dateVN+ '" value="'+ v._id +'">'+ v.params.name +'</option>');
                    });
            });
        $('.sInsertPlaylist select').live('change', function(){
            if ($(this).val()!=-1)
                if (people._id == undefined)
                {
                    alert('Mời bạn đăng nhập để tạo danh sách nhạc');
                    $(this).val(-1);
                }
                else
                {
                    me = $(this);
                    if($(this).val()==0)
                    {
                        web.iReq({action: 'iAddPlaylist', name: tran('Danh sách nhạc|Playlist|||')}, function(md){
                            $('.sInsertPlaylist select option').last().before('<option date="'+ web.getFormatNow() +'" value="'+ md._id +'">'+ md.params.name +'</option>');
                            web.iReq({action: 'iAddToPlaylist', cartid: md._id, contentid: audio.getPlaylist()[$('.dPlayer').attr('playing')]._id}, function(md2){
                                alert(md2.msg + ' ' + tran('trong|on|||') +' '+ md.params.name);
                                me.val(-1);
                            });
                        });
                    }
                    else
                        web.iReq({action: 'iAddToPlaylist', cartid: me.val(), contentid: audio.getPlaylist()[$('.dPlayer').attr('playing')]._id}, function(md){
                            alert(md.msg + ' '+tran('trong|on|||')+' '+ me.find('option[value='+me.val()+']').text());
                            me.val(-1);
                        });
                }
        });
        $('.dNews > a').live('click', function(){
            $(this).next().find('a').trigger('click');
        });
        $('.dNews > p a').live('click', function(){
            audio.sing($(this).parent().parent().index()+(($(this).parent().parent().parent().index()-1)*2));
            $(this).find('i').removeClass('fa-play-circle').addClass('fa-pause-circle');
        });
        $('.dChangePlaylist > a').live('click', function(){
            $(this).next().find('a').trigger('click');
        });
        $('.dChangePlaylist > p a').live('click', function(){
            audio.stop();
            me = $(this);
            audio.setPlaylists(audios, function(params){
                if(audios.length<16)
                    web.iReq({action: 'iCreateListMusic', list: audios}, function(dt){
                        params.controls.frameAudio.attr('ready', 1);
                        params.src = dt;
                        if(params.player.currentTime>0 || params.src != params.player.src)
                        {
                            audio.stop();
                            audio.play();
                        }
                    });
            }, me.parent().parent().index()+((me.parent().parent().parent().index()-1)*2));
//            web.iReq({action: 'iCreateListMusic', list: audios}, function(dt){
//                audio.setPlaylist(audios, dt, me.parent().parent().index()+((me.parent().parent().parent().index()-1)*2));
//            });
            $(this).find('i').removeClass('fa-play-circle').addClass('fa-pause-circle');
            $('.dChangePlaylist').removeClass('dChangePlaylist').addClass('dNews');
        });
        $('.dAudioItem > a').live('click', function(){
            $(this).next().find('a').trigger('click');
        });
        $('.dAudioItem > p a').live('click', function(){
            audio.stop();
            me = $(this);
            audio.setPlaylists(audios, function(params){
                if(audios.length<16)
                    web.iReq({action: 'iCreateListMusic', list: audios}, function(dt){
                        params.controls.frameAudio.attr('ready', 1);
                        params.src = dt;
                        if(params.player.currentTime>0 || params.src != params.player.src)
                        {
                            audio.stop();
                            audio.play();
                        }
                    });
            }, me.parent().parent().parent().index());
//            web.iReq({action: 'iCreateListMusic', list: audios}, function(dt){
//                audio.setPlaylist(audios, dt, me.parent().parent().parent().index());
//            });
            $(this).find('i').removeClass('fa-play-circle').addClass('fa-pause-circle');
            $('.dAudioItem').removeClass('dAudioItem').addClass('dAudioFile');
        });
        $('.dAudioFile > a').live('click', function(){
            $(this).next().find('a').trigger('click');
        });
        $('.dAudioFile > p a').live('click', function(){
            audio.sing($(this).parent().parent().parent().index());
            $(this).find('i').removeClass('fa-play-circle').addClass('fa-pause-circle');
        });
        $('.lPlaylist').live('click', function(){
            $('.dItems').find('> *:not(.dPlayerFrame)').remove();
            $('.sInsertPlaylist select option:not(.sInsertPlaylist select option[value='+(-1)+'], .sInsertPlaylist select option[value=0])').each(function(k, v){
                $('.dItems').append('<div class="d_theme dPlaylist" id="'+$(this).attr('value')+'">' +
                    '<a title="'+ $(this).text() +'"><img src="'+SKIN+'/logo2.png" alt="wsup3"/></a>' +
                    '<p><input class="iPlaylistName" type="text" readonly="readonly" placeholder="'+tran('Tên danh sách nhạc|Playlist name|||')+'" value="'+ $(this).text() +'" /></p>' +
                    '<p><i class="far fa-clock"></i> '+ $(this).attr('date') +'</p>' +
                    '<p><a><i class="far fa-times-circle"></i><i class="far fa-edit"></i></a></p>' +
                    '</div>');
            });
            $('.dItems').append('<div class="d_theme dAddPlaylist">' +
                '<a title="'+tran('Thêm danh sách nhạc|Add playlist|||')+'" class="fas fa-plus-square"></a>' +
                '</div>');
            hover($('.dPlaylist > a'), {scale: 1.05}, {scale: 1}, 0.3);
        });
        $('.dAddPlaylist > a').live('click', function(){
            web.iReq({action: 'iAddPlaylist', name: tran('Danh sách nhạc|Playlist|||')}, function(md){
                $('.dAddPlaylist').before('<div class="d_theme dPlaylist" id="'+md._id+'">' +
                    '<a title="'+tran('Danh sách nhạc|Playlist|||')+'"><img src="'+SKIN+'/logo2.png" alt="wsup3"/></a>' +
                    '<p><input class="iPlaylistName" type="text" readonly="readonly" placeholder="'+tran('Tên danh sách nhạc|Playlist name|||')+'" value="'+tran('Danh sách nhạc|Playlist|||')+'" /></p>' +
                    '<p><i class="far fa-clock"></i> '+web.getFormatNow()+'</p>' +
                    '<p><a><i class="far fa-times-circle"></i><i class="far fa-edit"></i></a></p>' +
                    '</div>');
                $('.sInsertPlaylist select option:eq('+($('.sInsertPlaylist select option').length-1)+')').before('<option date="'+web.getFormatNow()+'" value="'+md._id+'">'+tran('Danh sách nhạc|Playlist|||')+'</option>');
            });
        });
        $('.dPlaylist p a i.fa-times-circle').live('click', function(){
            if($(this).css('color')=='rgb(255, 0, 0)')
            {
                me = $(this).parent().parent().parent();
                web.iReq({action: 'iDelPlaylist', id: me.attr('id')}, function(md){});
                me.remove();
                $('.sInsertPlaylist select option[value='+me.attr('id')+']').remove();
            }
            else
                $(this).css('color', 'rgb(255, 0, 0)');
        });
        $('.d_theme p a i.fa-edit').live('click', function(){
            $(this).parent().parent().parent().find('.iPlaylistName').css({background: '#fff', cursor: 'text'}).removeAttr('readonly').select();
        });
        $('.iPlaylistName').live('blur', function(){
            $(this).attr('readonly', 'readonly').css({background: 'none', cursor: 'pointer'});
            $(this).parent().parent().parent().attr('id');
            $('.sInsertPlaylist select option[value='+$(this).parent().parent().attr('id')+']').text($(this).val());
            web.iReq({action: 'iEditPlaylist', name: $(this).val(), id: $(this).parent().parent().attr('id')}, function(md){});
        });
        $('.dPlaylist a').live('click', function(){
            $(this).parent().find('.iPlaylistName').trigger('click');
        });
        $('.iPlaylistName').live('click', function(){
            if($(this).attr('readonly')=='readonly')
            {
                $('.dItems').find('> div:not(.dPlayerFrame)').remove();
                $('.dItems').append('<div class="dMoveFrame" id="'+$(this).parent().parent().attr('id')+'"></div>');
                web.iReq({action: 'iGetSongsOfPlaylist', cartid: $(this).parent().parent().attr('id')}, function(dt){
                    if(dt!=null && dt.length>0)
                    {
                        audios = [];
                        $.each(dt, function(k, v){
                            audios.push(v.file);
                            $('.dMoveFrame').append('<div class="dMovePos"><div class="d_theme dAudioItem" date="'+v.file.date+'" id="'+v.file._id+'">' +
                                '<a title="'+v.file.name+'"><img src="'+SKIN+'/logo2.png" alt="wsup3"/></a>' +
                                '<p><a title="'+v.file.name+'"><i class="far fa-play-circle"></i> '+ v.file.name+'</a></p>' +
                                '<p><i class="far fa-clock"></i> ' + v.file.params.duration + 's - ' + v.file.dateVN + '</p>' +
                                '<p><a><i class="far fa-times-circle"></i><i class="fas fa-arrows-alt"></i></a></p>' +
                                '</div></div>');
                        });
                        hover($('.dAudioItem > a'), {scale: 1.05}, {scale: 1}, 0.3);
                        moveObj();
                    }
                });
            }
        });
        $('.d_theme p a i.fa-times-circle:not(.dPlaylist p a i.fa-times-circle)').live('click', function(){
            if($(this).css('color')=='rgb(255, 0, 0)')
            {
                me = $(this).parent().parent().parent();
                web.iReq({action: 'iDelSongOfPlaylist', id: me.attr('id')}, function(md){});
                me.remove();
            }
            else
                $(this).css('color', 'rgb(255, 0, 0)');
        });
    };
    var moveObj = function(){
        (new MoveObj({
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
            changeCB: function(params){
                songs = [];
                songs[0] = {
                    cartid: params.controls.frameObj.attr('id'),
                    contentid: params.controls.itemObj.eq(params.posIndex1).attr('id'),
                    number: 1,
                    pos: params.posIndex2+1,
                    date: params.controls.itemObj.eq(params.posIndex1).attr('date')
                };
                songs[1] = {
                    cartid: params.controls.frameObj.attr('id'),
                    contentid: params.controls.itemObj.eq(params.posIndex2).attr('id'),
                    number: 1,
                    pos: params.posIndex1+1,
                    date: params.controls.itemObj.eq(params.posIndex2).attr('date')
                };
                temp = audios[params.posIndex1];
                audios[params.posIndex1] = audios[params.posIndex2];
                audios[params.posIndex2] = temp;
                web.iReq({action: 'iEditSongsOfPlaylist', songs: songs}, function(md){
                    $('.dAudioFile').removeClass('dAudioFile').addClass('dAudioItem');
                    moveObj();
                    hover($('.dAudioItem > a'), {scale: 1.05}, {scale: 1}, 0.3);
                });
            }
        })).ready();
    };
    var params = {
        BASEURL: (typeof BASEURL == 'undefined')? '': BASEURL
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready
    };
};
switch(PAGE)
{
    case 'home':
        var home = new Home({
            BASEURL: BASEURL
        });
        break;
    case 'theme':
        var theme = new Theme({
            BASEURL: BASEURL
        });
        break;
    case 'classes':
        var classes = new Classes({
            BASEURL: BASEURL
        });
        break;
    case 'class':
        var clss = new Class({
            BASEURL: BASEURL
        });
        break;
    case 'address':
        var address = new Address({
            BASEURL: BASEURL
        });
        break;
    case 'lien-he':
        var contact = new Contact({
            BASEURL: BASEURL,
            map: map
        });
        break;
    case 'music':
        var music = new Music({
            BASEURL: BASEURL
        });
        break;
    case 'gameXyz':
        var gameXyz = new GameXyz({
            BASEURL: BASEURL
        });
        break;
}
$(document).ready(function(){
    web = new Cazs({});
    people = JSON.parse((web.done(window.localStorage.getItem('people'), '{}')));
    align = new Align();
    if($('.d_frame').length<=0){
        if($(window).scrollTop()>70 && $('.bgPopup').css('display')=='none')
            TweenMax.to($('.d_header'), 0.3, {top: -70});
        else
            TweenMax.to($('.dBgHead'), 0.3, {alpha: '1'});
        $('.d_header').hover(function(){}, function(){
            if($(window).scrollTop()>70 && $('.bgPopup').css('display')=='none')
            {
                TweenMax.to($('.d_header'), 0.4, {top: -70});
            }
        });
    }
    convertToDay($('.convertToDay'));
    switch(PAGE)
    {
        case 'home':
            home.ready();
            break;
        case 'classes':
            classes.ready();
            break;
        case 'class':
            clss.ready();
            break;
        case 'address':
            address.ready();
            break;
        case 'theme':
            theme.ready();
            break;
        case 'lien-he':
            contact.ready();
            break;
        case 'music':
            music.ready();
            break;
        case 'gameXyz':
            gameXyz.ready();
            break;
    }
    $('.dPopup > i').click(function(){
        hidePopup();
    });
    if(typeof viewReady !== 'undefined')
        viewReady();
});

var frameIndex = 1, onScroll = 1;
window.onload = function()
{
    loadFrame();
    $("img.lazy").lazyload({
        effect: "fadeIn",
        threshold: 2000
    });
    $("img.lazyItem").lazyload({
        effect: "fadeIn",
        threshold: 2000
    });
    $('.d_item_banner > img').each(function() {
        if($(this).css('height') < $(this).parent().parent().css('height'))
            $(this).css({'height': '100%', 'width': 'auto'});
        ver_center($(this), 'all', 0);
    });
    ver_center($('.v_fiml'), 'all', 0);
    banner('d_item_banner', 'a_next_banner', 'a_prev_banner', 'd_banner', 500, 1000000, '', function(class_item, index){
        tweenBn[index].restart();
    });
    switch(PAGE)
    {
        case 'home':
            home.loaded();
            break;
        case 'classes':
            classes.loaded();
            break;
        case 'class':
            clss.loaded();
            break;
        case 'address':
            address.loaded();
            break;
        case 'theme':
            theme.loaded();
            break;
        case 'lien-he':
            contact.loaded();
            break;
        case 'music':
            music.loaded();
            break;
        case 'gameXyz':
            gameXyz.loaded();
            break;
    }
    animates();
    $('.a_map_frame').each(function(index) {
        $(this).click(function(){
            if(frameIndex > 0 && frameIndex-1 < $('.d_frame').length && index+1 != frameIndex && onScroll == 1)
            {
                onScroll = 0;
                if(index==0)
                    setTimeout(function(){
                        tweenBn[$('.d_banner').attr('banner_number')].restart()
                    }, 600);
                else
                    tweenFr[index+1].restart();
                if(index==2)
                    setTimeout(function(){
                        video.play();
                    }, 1500);
                else
                {
                    video.pause();
                    setTimeout(function(){
                        if(video.played)
                            video.pause();
                    }, 550);
                }
                var frame = $('.d_frame:eq('+index+')');
                tl_obj = new TimelineMax();
                tl_obj.to($("html, body"), 1, {scrollTop: frame.offset().top, ease:Power1.easeIn, onComplete: function() {
                    onScroll = 1;
                    frameIndex = index+1;
                    $('.d_map_frames').stop().slideUp(300, function(){
                        TweenMax.to($('.d_frame_map'), 0.3, {border: '1px solid #FFF'});
                    });
                }});
            }
        });
    });
    $('.d_wait').fadeOut(200, function () {
        animate_frame();
        TweenL = new TimelineMax();
        $('.d_logo span').each(function (index) {
            TweenL.staggerTo($(this), 0.3, { color: '#3F5D7D' }, 0.1);
        });
    });
    if($('.d_frame').length==0)
    {
        $('html').mousemove(function(e){
            if(e.clientX>=body_w-170 && e.clientY<=60)
            {
                TweenMax.to($('.d_header'), 0.2, {alpha: '1', top: 0});
                return;
            }
            if(e.clientX<=170 && e.clientY<=60)
            {
                TweenMax.to($('.d_header'), 0.2, {alpha: '1', top: 0});
                return;
            }
            if(e.clientY<=20)
                TweenMax.to($('.d_header'), 0.2, {alpha: '1', top: 0});
        })
        if(876<body_w)
            folow($('.d_fixed'), function(){}, function(){}, function(){
                $('.d_fixed').css('top', '16px');
            });
    }
    $('.a_up').click(function(){
        tweenBn[$('.d_banner').attr('banner_number')].restart();
        frameIndex = 1;
        TweenMax.to($('html, body'), 0.2, {scrollTop: 0, onComplete: function(){
            TweenMax.to($('.d_footer'), 0.3, {top: -56, onComplete: function(){
                TweenMax.to($('.d_header'), 0.3, {top: 0});
            }});
        }});
        video.pause();
    });
    $('.i_news').hover(function(){
        TweenMax.to($("html, body"), 0.3, {scrollTop: $('.i_news').offset().top-65});
    }).css('height', (body_h-70)+'px');
    var chat = 0;
    //$('.d_wrap').append('<div class="d_chat"><a style="text-shadow: rgb(197, 206, 216) 0px 0px 0px;">Hỗ trợ trực tuyến</a><div><iframe class="i_chat" width="100%" height="100%" src="http://chat.wsup3.com/chat/Wsup3?className=h%E1%BB%97%20tr%E1%BB%A3"></iframe></div></div>');
    $('.d_chat a').click(function(){
        if(chat==1)
        {
            TweenMax.to($('.d_chat'), 0.4, {width: 0, onComplete: function(){
                chat = 0;
            }});
        }
        else
        {
            TweenMax.to($('.d_chat'), 0.4, {width: 341, onComplete: function(){
                chat = 1;
            }});
        }
    });
    $('.i_chat').load(function(){
        setTimeout(function(){
            TweenMax.to($('.d_chat'), 0.4, {width: 0, onComplete: function(){
                chat = 0;
            }});
        }, 5000);
    });
    if(typeof viewLoaded !== 'undefined')
    {
        more_reserve();
        viewLoaded();
    }
    if(860<=body_w && body_w<=1131)
    {
        $('.d_artical').css('width', ($(window).width()-482)+'px');
        desktop();
    }
    else
    if(body_w>1131)
    {
        $('.d_artical').css('width', '650px');
        desktop();
    }
    else
    {
        $('.aMenu').toggle(function(){
            $('html').css('overflow', 'hidden');
            $('.d_header').css('zIndex', '17');
            TweenMax.to($('.d_menu'), 0.3, {right: '0'});
            TweenMax.to($('html'), 0.3, {right: '260px'});
            TweenMax.to($('.d_header'), 0.3, {left: '-260px', right: '260px'});
            TweenMax.to($('.d_header, .d_footer'), 0.3, {left: '-260px', right: '260px'});
            TweenMax.to($('.d_chat'), 0.3, {right: '275px'});
            TweenMax.to($('.dBgHead'), 0.3, {alpha: '0'});
            TweenMax.to($(this).find('img'), 0.3, {background: '#fff'});
            TweenMax.to($(this), 0.3, {boxShadow: '0 0 5px #fff'});
            $('.bgPopup').fadeIn(300);
        }, function(){
            if($('.d_frame').length==0)
                $('html').css('overflow', 'auto');
            TweenMax.to($('.d_menu'), 0.3, {right: '-260px'});
            TweenMax.to($('html'), 0.3, {right: '0'});
            TweenMax.to($('.d_header, .d_footer'), 0.3, {left: '0', right: '0'});
            TweenMax.to($('.d_chat'), 0.3, {right: '15px'});
            TweenMax.to($(this).find('img'), 0.3, {background: 'none'});
            TweenMax.to($(this), 0.3, {boxShadow: '0 0 0 #fff'});
            $('.bgPopup').fadeOut(300, function(){
                $('.d_header').css('zIndex', '16');
            });
        });
    }
};

$(window).resize(function(){
    loadFrame();
    clearInterval(auto[$('.d_banner').attr('index')]);
    $('.d_item_banner').css('display', 'block');
    $('.d_item_banner > img').each(function() {
        clearInterval(auto[$('.d_banner').attr('index')]);
        $(this).css({'height': 'auto', 'width': '100%'})
        if($(this).css('height') < $(this).parent().parent().css('height'))
            $(this).css({'height': '100%', 'width': 'auto'})
        ver_center($(this), 'all', 0);
    });
    banner('d_item_banner', 'a_next_banner', 'a_prev_banner', 'd_banner', 500, 1000000, '', "tweenBn[index].restart();");
    ver_center($('.v_fiml'), 'all', 0);
    if(860<=body_w && body_w<=1131)
        $('.d_artical').css('width', ($(window).width()-482)+'px');
    else
    if(body_w>1131)
        $('.d_artical').css('width', '650px');
    if(876<body_w)
    {
        folow($('.d_fixed'), function(){}, function(){}, function(){
            $('.d_fixed').css('top', '16px');
        });
        $('.d_menu').css('right', '0');
    }
    else
    if($('.bgPopup').css('display')=='none')
        $('.d_menu').css('right', '-260px');
    else
        $('.d_menu').css('right', '0');
    if(typeof viewResize !== 'undefined')
        viewResize();
}).scroll(function(e){
    if($('.d_frame').length==0)
        if($(this).scrollTop()<=70)
            TweenMax.to($('.d_header'), 0.3, {top: 0});
        else
            TweenMax.to($('.d_header'), 0.3, {top: -70});
    if($(this).scrollTop()>=511 && 876<body_w)
        TweenMax.to($('.a_up'), 0.3, {alpha: 1, right: '6.5px', rotation: '-360', ease:Back.easeOut});
    else
        TweenMax.to($('.a_up'), 0.3, {alpha: 0, right: '-44px', rotation: '360', ease:Back.easeOut});
});

var body_w, body_h;
function loadFrame()
{
    body_w = $(window).width(), body_h = $(window).height();
    $('.d_frame').css({'width': body_w + 'px', 'height': (body_h - 66)+'px'});
    $('.i_news').css('height', (body_h-70)+'px');
    $('.iProject').css({'width': body_w + 'px', 'height': body_h + 'px'});
    $('.dMapFrame').css({height: (body_h - 122)+'px'});
    $('.dPopup').css('margin', -($('.dPopup').height()/2) +'px 0 0 '+ -($('.dPopup').width()/2) +'px');
}

var tweenBn = {}, tweenFr = {}, video, device = new Devices;
function animate_frame()
{
    try
    {
        $('.d_item_banner').each(function(index) {
            if(index==0)
            {
                tweenBn[0] = new TimelineMax();
                tweenBn[0].staggerTo($('.d_item_banner:eq(0) > span'), 1, {top: '50%', alpha: 1, ease:Back.easeOut, delay: 1}, 0.1);
            }
            else
            {
                tweenBn[index] = new TimelineMax({paused: true});
                tweenBn[index].staggerTo($('.d_item_banner:eq('+index+') > span'), 1, {top: '50%', alpha: 1, ease:Back.easeOut, delay: 0.9}, 0.1);
            }
        });
        tweenFr[2].to($('.d_web_type > div'), 0, {scale: 0.9});
        device.phone({
            other_f:function(){
                tweenFr[2].to($('.p_title_frame2'), 1, {top: '0', alpha: 1, textShadow: '0 0 10px #C5CED8', ease:Back.easeOut, delay: 1.5, onComplete: function() {
                    tweenFr[2].staggerTo($('.d_web_type > div'), 0.5, {alpha: 1, left: '0', scale: 1, ease:Power3.easeOut}, 0.07);
                }});
            },
            phone_f: function(params){
                tweenFr[2].to($('.p_title_frame2'), 1, {top: '10px', alpha: 1, textShadow: '0 0 10px #C5CED8', ease:Back.easeOut, delay: 1.5, onComplete: function() {
                    tweenFr[2].staggerTo($('.d_web_type > div'), 0.5, {alpha: 1, left: '0', scale: 1, ease:Power3.easeOut}, 0.07);
                }});
            }
        });

        tweenFr[3].staggerTo($('.d_text_frame3_2 > p, .s_sep_frame3, .a_contact_frame3'), 1, {top: '0px', alpha: 1, textShadow: '0 0 10px #C5CED8', ease:Back.easeOut, delay: 1.5}, 0.1);
        device.phone({
            other_f:function(){
                tweenFr[3].to($('.a_close_frame3'), 0.5, {right: '-13px', alpha: 1, rotation: -720});
            },
            phone_f: function(params){
                tweenFr[3].to($('.a_close_frame3'), 0.5, {right: '0px', alpha: 1, rotation: -720});
            }
        });

        tweenFr[4].to($('.d_tems_frame4 div'), 0, {scale: 0.9});
        device.phone({
            other_f:function(){
                tweenFr[4].staggerTo($('.d_template_frame4 > p, .s_sep_frame4'), 1, {top: '0px', alpha: 1, textShadow: '0 0 10px #C5CED8', ease:Back.easeOut, delay: 1.5, onComplete: function() {
                    tweenFr[4].staggerTo($('.d_tems_frame4 div'), 0.5, {alpha: 1, left: '0', scale: 1, ease:Power3.easeOut}, 0.07);
                }}, 0.1);
            },
            phone_f: function(params){
                tweenFr[4].staggerTo($('.d_template_frame4 > p, .s_sep_frame4'), 1, {top: '40px', alpha: 1, textShadow: '0 0 10px #C5CED8', ease:Back.easeOut, delay: 1.5, onComplete: function() {
                    tweenFr[4].staggerTo($('.d_tems_frame4 div'), 0.5, {alpha: 1, left: '0', scale: 1, ease:Power3.easeOut}, 0.07);
                }}, 0.1);
            }
        });
        
        tweenFr[5].to($('.a_res_img'), 0, {scale: 0.9, onComplete: function(){
            TweenMax.to($('.d_footer'), 0.3, {top: -56, onComplete: function(){
                TweenMax.to($('.d_header'), 0.3, {top: 0});
            }});
        }});
        tweenFr[5].to($('.a_res_img'), 0.5, {alpha: 1, left: '0', scale: 1, ease:Power3.easeOut, delay: 1.5});
        tweenFr[5].staggerTo($('.d_responsive_frame5 p, .s_sep_frame5'), 1, {top: '0px', alpha: 1, textShadow: '0 0 10px #C5CED8', ease:Back.easeOut}, 0.1);
        
        tweenFr[6].to($('.d_cercle_frame'), 0, {scale: 0.9, onComplete: function(){
            TweenMax.to($('.d_header'), 0.3, {top: -66, onComplete: function(){
                TweenMax.to($('.d_footer'), 0.3, {top: 0});
            }});
        }});
        tweenFr[6].staggerTo($('.d_lifecycle > p, .s_sep_frame6'), 1, {top: '0px', alpha: 1, textShadow: '0 0 10px #C5CED8', ease:Back.easeOut, delay: 1.5, onComplete: function() {
            tweenFr[6].staggerTo($('.d_cercle_frame'), 0.5, {alpha: 1, left: '0', scale: 1, ease:Power3.easeOut}, 0.07);
        }}, 0.1);
    }
    catch(ex)
    {}
}

function desktop()
{
    $('.d_menu > div  > ul > li').last().hover(function(){
        $('.d_menu > div  > ul > li ul').css({'left': '0px', 'right': 'auto', 'text-align': 'left'})
    });
    $('.d_menu > div  > ul > li:eq(1)').hover(function(){
        $('.d_menu > div  > ul > li ul').css({'left': 'auto', 'right': '0px', 'text-align': 'right'});
    });
}

function animates()
{
    $('a').each(function(index) {
        if($(this).find('img').length > 0)
            hover($(this), {scale: 1.05}, {scale: 1}, 0.3);
        else
            hover($(this), {textShadow: '0 0 10px #C5CED8'}, {textShadow: '0 0 0px #C5CED8'}, 0.3);
    });
    hover($('.d_tems_frame4 div > a'), {boxShadow: '0 0 10px #000'}, {boxShadow: '0 0 0px #C5CED8'}, 0.2);
    hover($('.d_cer_frame'), {boxShadow: '0 0 10px #000', scale: 1.05}, {boxShadow: '0 0 0px #000', scale: 1}, 0.2);
    if(body_w>860)
    {
        $('.d_menu > div  > ul > li').hover(function(){
            $('.d_menu > div  > ul > li').css('zIndex', '1');
            $(this).css('zIndex', '2').find(' > ul').slideDown(300);
        }, function(){
            $(this).find(' > ul').stop().slideUp(300);
        });
        $('.d_frame_map').hover(function(){
            TweenMax.to($(this), 0.2, {border: '1px solid #C5CED8', onComplete: function(){
                $('.d_map_frames').stop().slideDown(300, function(){
                    $('.a_map_frame').css('textShadow', '0 0 0 #C5CED8');
                    TweenMax.to($('.a_map_frame:eq('+(frameIndex-1)+')'), 0.2, {textShadow: '0 0 10px #C5CED8'});
                });
            }});
        }, function(){
            $('.d_map_frames').stop().slideUp(200, function(){
                TweenMax.to($('.d_frame_map'), 0.2, {border: '1px solid #FFF'});
            });
        });
    }
    else
    {
        $('.d_menu > div  > ul > li > ul').parent().find(' > a').toggle(function(){
            TweenMax.to($(this).next(), 0.4, {rotation: 180});
            $(this).next().next().slideDown(300);
        }, function(){
            TweenMax.to($(this).next(), 0.4, {rotation: 0});
            $(this).next().next().stop().slideUp(300);
        });
        $('.d_frame_map').click(function(e){
            TweenMax.to($(this), 0.2, {border: '1px solid #C5CED8', onComplete: function(){
                $('.d_map_frames').stop().slideDown(300, function(){
                    $('.a_map_frame').css('textShadow', '0 0 0 #C5CED8');
                    TweenMax.to($('.a_map_frame:eq('+(frameIndex-1)+')'), 0.2, {textShadow: '0 0 10px #C5CED8'});
                });
            }});
            e.stopPropagation();
        });
    }
    $('.a_map_frame').each(function(index) {
        $(this).mouseout(function(){
            if(index == frameIndex-1)
                TweenMax.to($(this), 0.3, {textShadow: '0 0 10px #C5CED8'});
        });
    });
    $('body, .a_map_frame').click(function(e){
        if($(this).hasClass('a_map_frame'))
            e.stopPropagation();
        else
            $('.d_map_frames').stop().slideUp(300, function(){
                TweenMax.to($('.d_frame_map'), 0.3, {border: '1px solid #FFF'});
            });
    });
    hover($('.d_theme > a'), {boxShadow: '0 0 10px #000'}, {boxShadow: '0 0 0px #C5CED8'}, 0.2);
    hover($('.dPopup > i'), {boxShadow: '0px 0px 10px #fff'}, {boxShadow: '0px 0px 6px #fff'}, 0.2);
}

function showPopup(content)
{
    $('.dPopup').css({opacity: '0', display: 'block'});
    ver_center($('.dContentPop'), 'top', 0, 1);
    $('.dContentPop div').text(content);
    $('.bgPopup').fadeIn(300);
    $('.dPopup').fadeTo(1, 300);
    TweenMax.to($('.dPopup > i'), 0.6, {rotation: -720, left: '-=160px', alpha: 1});
}
function hidePopup()
{
    $('.bgPopup').fadeOut(300);
    $('.dPopup').fadeOut(300, function(){
        $('.dContentPop div').text('');
    });
    TweenMax.to($('.dPopup > i'), 0.6, {rotation: 0, left: '+=160px', alpha: 0});
}

function hover(obj, css, css_df, delay)
{
    obj.hover(function(){
        TweenMax.to($(this), delay, css);
    }, function(){
        TweenMax.to($(this), delay, css_df);
    });
}

function initMap() {
    var styledMapType = new google.maps.StyledMapType(
        [
            {
                stylers: [
                    { hue: '#3F5D7D' }
                ]
            }
        ],
        {name: 'Styled Map'}
    );
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        scrollwheel: true,
        center: {lat: 12.2201159, lng: 109.192539},
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_LEFT
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        scaleControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        fullscreenControl: true,
        styles: [
            {
                featureType: 'all',
                stylers: [
                    { hue: '#3F5D7D' }
                ]
            }
        ]
    });
    //Auto complete
    var input = (document.getElementById('address'));
    var types = document.getElementById('type-selector');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    var marker2 = false, address, infowindow2, place, origin_place_id;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    autocomplete.addListener('place_changed', function(){
        place = autocomplete.getPlace();
        if(place.geometry.viewport)
            map.fitBounds(place.geometry.viewport);
        else
            map.setCenter(place.geometry.location);
        map.setZoom(14);
        if(place.address_components){
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
        directionsDisplay.setMap(map);
        route(place.place_id, directionsService, directionsDisplay);
        if(marker2==false)
        {
            marker2 = new google.maps.Marker({
                title: tran('Địa chỉ của bạn|Your address|Ваш адрес|你的地址|あなたの住所'),
                map: map,
                icon: 'https://www.wsup3.cf/public/media/images/skin/mark.png',
                animation: google.maps.Animation.DROP
            });
            infowindow2 = new google.maps.InfoWindow();
            marker2.addListener('click', function() {
                infowindow2.open(map, marker2);
            });
        }
        else
        {
            infowindow2.close();
            marker2.setVisible(false);
        }
        marker2.setPosition(place.geometry.location);
        marker2.setVisible(true);
        infowindow2.setContent('<div id="content">'+
            '<img src="https://www.wsup3.cf/public/media/images/skin/address.png" alt="wsup3" height="136px"/>'+
            '<p style="font-size: 26px;">'+tran('Địa chỉ của bạn|Your address|Ваш адрес|你的地址|あなたの住所')+':</p>'+
            '<div id="bodyContent">'+
            '<p style="font-size: 16px;">'+address+'</p>'+
            '</div>'+
            '</div>');
        infowindow2.open(map, marker2);
        function route(origin_place_id, directionsService, directionsDisplay)
        {
            if(!origin_place_id)
                return;
            directionsService.route({
                origin: {placeId: origin_place_id},
                destination: {placeId: 'ChIJBRdFCFlncDERf5LAcT8UWrc'},
                travelMode: 'DRIVING'
            }, function(response, status){
                if(status === 'OK')
                    directionsDisplay.setDirections(response);
            });
        }
    });
    //End auto complete

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    var infowindow = new google.maps.InfoWindow({
        content: '<div id="content">'+
            '<span style="float: left; margin-right: 6px" title="Logo"><img src="https://www.wsup3.cf/public/media/images/skin/logo.png" alt="wsup3" height="136px"/></span>'+
            '<p style="font-size: 26px;">Hợp Tác & Cung Cấp Website Wsup3</p>'+
            '<div id="bodyContent">'+
            '<p style="font-size: 16px;">Địa chỉ: 61 Lý Nam Đế - Phước Long – TP.Nha Trang</p>'+
            '<p style="font-size: 16px;">Email: <a href="mailto:wsup3.cf@gmail.com">info@wsup3.cf</a></p>'+
            '<p style="font-size: 16px;">Hotline: '+SPHONE+'</p>'+
            '</div>'+
            '</div>'
    });
    var marker = new google.maps.Marker({
        position: {lat: 12.216299, lng: 109.192539},
        title: 'HT & CC Website Wsup3',
        map: map,
        icon: 'https://www.wsup3.cf/public/media/images/skin/marker.png',
        animation: google.maps.Animation.DROP
    });
    infowindow.open(map, marker);
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}