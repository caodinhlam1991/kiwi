var align, web, backmap = new BackMap();
var Home = function(p){
    var ready = function(){
        $('.d_footer').css('position', 'fixed');
        $('.dBgFoot').css('opacity', '0.6');
        $('body').css('overflow', 'hidden');
    };
    var loaded = function(){
        video = document.getElementById("vFiml");
        $('.d_frame').each(function(index) {
            while(index>9)
                index-=10;
            $(this).css('background', '#FFF');
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
                tl_obj.to($("html, body"), 1, {scrollTop: frame.offset().top, ease:Power1.easeIn, onComplete: function() {
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
var Music = function(p){
    var ready = function(){
        people = JSON.parse((web.done(window.localStorage.getItem('people'), null)));
        if (people != null)
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
                        window.localStorage.setItem('languages', JSON.stringify(data.languages));
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
                web.iReq({action: 'iContactsSong', isLogin: ((people != null)? 1: 0), detail: $('#iSongRequire').val(), displayname: $('#iNameRequire').val()}, function(md){
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
        if (people != null)
            web.iReq({action: 'iGetPlaylists'}, function(md){
                if(md.length>0)
                    $.each(md, function(k, v){
                        $('.sInsertPlaylist select option:eq(0)').after('<option date="'+ v.dateVN+ '" value="'+ v._id +'">'+ v.params.name +'</option>');
                    });
            });
        $('.sInsertPlaylist select').live('change', function(){
            if ($(this).val()!=-1)
                if (people == null)
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
console.log(PAGE);
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
}
$(document).ready(function(){
    web = new Wsup3({});
    align = new Align();
    if($('.d_frame').length<=0){
        if($(window).scrollTop()>70 && $('.bgPopup').css('display')=='none')
            TweenMax.to($('.d_header'), 0.3, {top: -70});
        else
            TweenMax.to($('.dBgHead'), 0.3, {alpha: '1'});
        $('.d_screen').hover(function(){
            if($('.bgPopup').css('display')=='none')
                TweenMax.to($('.dBgHead'), 0.3, {alpha: '1'});
        });
        $('.d_header').hover(function(){}, function(){
            if($(window).scrollTop()>70 && $('.bgPopup').css('display')=='none')
            {
                TweenMax.to($('.dBgHead'), 0.3, {alpha: '0.6'});
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
        case 'theme':
            theme.ready();
            break;
        case 'lien-he':
            contact.ready();
            break;
        case 'music':
            music.ready();
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
        case 'theme':
            theme.loaded();
            break;
        case 'lien-he':
            contact.loaded();
            break;
        case 'music':
            music.loaded();
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
    $('.d_wait').fadeOut(200, function(){
        $('.d_wrap').fadeTo(300, 1, function(){
            animate_frame();
            TweenL = new TimelineMax();
            $('.d_logo span').each(function(index) {
                TweenL.staggerTo($(this), 0.3, {color: '#3F5D7D'}, 0.1);
            });
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
        TweenMax.to($('html, body'), 0.2, {scrollTop: 0});
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
            TweenMax.to($('.d_chat'), 0.4, {height: 0, onComplete: function(){
                chat = 0;
            }});
        }
        else
        {
            TweenMax.to($('.d_chat'), 0.4, {height: 355, onComplete: function(){
                chat = 1;
            }});
        }
    });
    $('.i_chat').load(function(){
        setTimeout(function(){
            TweenMax.to($('.d_chat'), 0.4, {height: 0, onComplete: function(){
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
            TweenMax.to($('.dBgHead'), 0.3, {alpha: '0.6'});
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
        {
            TweenMax.to($('.dBgHead'), 0.3, {alpha: '1'});
            TweenMax.to($('.d_header'), 0.3, {top: 0});
        }
        else
        {
            TweenMax.to($('.dBgHead'), 0.3, {alpha: '0.6'});
            TweenMax.to($('.d_header'), 0.3, {top: -70});
        }
    if($(this).scrollTop()>=511 && 876<body_w)
        TweenMax.to($('.a_up'), 0.3, {alpha: 1, right: '6.5px', rotation: '-360', ease:Back.easeOut});
    else
        TweenMax.to($('.a_up'), 0.3, {alpha: 0, right: '-44px', rotation: '360', ease:Back.easeOut});
});

var body_w, body_h;
function loadFrame()
{
    body_w = $(window).width(), body_h = $(window).height();
    $('.d_frame').css({'width': body_w + 'px', 'height': (body_h - 122)+'px'});
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

        tweenFr[5].to($('.a_res_img'), 0, {scale: 0.9});
        tweenFr[5].to($('.a_res_img'), 0.5, {alpha: 1, left: '0', scale: 1, ease:Power3.easeOut, delay: 1.5});
        tweenFr[5].staggerTo($('.d_responsive_frame5 p, .s_sep_frame5'), 1, {top: '0px', alpha: 1, textShadow: '0 0 10px #C5CED8', ease:Back.easeOut}, 0.1);

        tweenFr[6].to($('.d_cercle_frame'), 0, {scale: 0.9});
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
                icon: 'https://wsup3.cf/public/media/images/skin/mark.png',
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
            '<img src="https://wsup3.cf/public/media/images/skin/address.png" alt="wsup3" height="136px"/>'+
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
            '<span style="float: left; margin-right: 6px" title="Logo"><img src="https://wsup3.cf/public/media/images/skin/logo.png" alt="wsup3" height="136px"/></span>'+
            '<p style="font-size: 26px;">Công Ty THHH Hợp Tác & Cung Cấp Website Wsup3</p>'+
            '<div id="bodyContent">'+
            '<p style="font-size: 16px;">Địa chỉ: 61 Lý Nam Đế - Phước Long – TP.Nha Trang</p>'+
            '<p style="font-size: 16px;">Email: <a href="mailto:info@wsup3.cf">info@wsup3.cf</a></p>'+
            '<p style="font-size: 16px;">Hotline: 0587.849.218</p>'+
            '</div>'+
            '</div>'
    });
    var marker = new google.maps.Marker({
        position: {lat: 12.216299, lng: 109.192539},
        title: 'Công ty TNHH HT & CC Website Wsup3',
        map: map,
        icon: 'https://wsup3.cf/public/media/images/skin/marker.png',
        animation: google.maps.Animation.DROP
    });
    infowindow.open(map, marker);
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}