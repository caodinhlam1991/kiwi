backmap.add({page: 'dBoardLogin'});
$('.aMenu').click(function(){
    changePage($('.dBoardUser'), 'dShow', {fn: function(){
        backmap.add({page: 'dBoardUser'});
    }, params: {}});
});
$('.aBack').click(function(){
    if(parseInt($(this).attr('time'))>0 && $(this).attr('ready')==1)
    {
        $(this).attr('ready', 0);
        $('title').html(backmap.see(parseInt($(this).attr('time'))-1).title+' - '+SITENAME);
        changePage($('.'+backmap.see(parseInt($(this).attr('time'))-1).page), 'dShow', {fn: function(){
            $('.aBack').attr('ready', 1);
        }, params: {}});
        $(this).attr('time', parseInt($(this).attr('time'))-1);
        $('.iDel').fadeIn(200, function(){
            $('.iDelY').fadeOut(200);
        });
    }
});//exit fullscreen exitFullscreen()
$('.dAppPage').click(function(){
    changePage($('.'+$(this).find('.dClose').attr('board')), 'dShow', {fn: function(me){
        $('.'+me.find('.dClose').attr('board')).find('input:eq(0)').focus();
        backmap.add({page: me.find('.dClose').attr('board'), title: me.find('> a').attr('title')});
    }, params: $(this)});
});
$('.sBtnMore').live('click', function(){
    me = $(this);
    me.fadeOut(250);
    params = {action: 'iGetMores', type: me.attr('type'), from: me.prev().find('.dCategory').length, keys: $('.iSearch').val(), opt: LANG};
    web.iReq(params, function(dt){
        switch(me.attr('type'))
        {
            case 'language':
                dt.forEach(function(obj, index) {
                    p = '<div class="dCategory ' + obj._id + '">' +
                        '<div class="dProduct" id="' + obj._id + '">' +
                        '<p><span></span><span>' + obj.created + '<img class="iOnLang" lang="'+obj.id+'" style="display: ' + ((obj.active == true) ? 'block' : 'none') + '" change="false" src="'+SKIN+'/admin/fresh.png" alt="wsup3"/><img class="iOnLang" lang="'+obj.id+'" style="display: ' + ((obj.active == false) ? 'block' : 'none') + '" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                        '<div class="dOption">' +
                        '<span lang="'+obj.id+'" class="'+((LANG != obj.id)? 'sSetDefault': 'sInSetDefault')+'"></span>' +
                        '<span class="sEditLang"><img src="' + SKIN + '/admin/edit.png" alt="wsup3"/></span>' +
                        '</div><div class="dInfo">' +
                        '<a target="_blank"><img src="' + ((typeof(obj.image)!='undefined') ? obj.image : SKIN + '/logo.png') + '" alt="wsup3"/><span class="'+((LANG == obj.id)? 'sDefault': 'sInDefault')+'"></span></a>' +
                        '<p>' + obj.name + '</p>' +
                        '<p></p>' +
                        '</div></div></div>';
                    $('#fLanguages').append(p).find('.dInfo > a img').each(function(){
                        $(this).load(function(){
                            align.topleft($(this), $(this).parent(), 0, 0, 1);
                        });
                    });
                });
                break;
        }
        if(dt.length<10)
            me.fadeOut(250);
        else
            me.fadeIn(250);
    });
});
$('.dAppLanguages').click(function(){
    changePage($('.dBoardLanguages'), 'dShow', {fn: function(){
        backmap.add({page: 'dBoardLanguages', action: {fn: function(){
            if($('#fLanguages').html()=='')
                $('.dBoardLanguages .sBtnMore').trigger('click');
        }, params: {}}});
    }, params: {}});
});
$("#fLogin").validate({
    rules: {
        email: {required: true, email: true},
        password: {required: true, minlength: 4, maxlength: 32}
    },
    messages: {
        email: {
            required: tran("Mời bạn nhập email|Please enter your email|Пожалуйста, введите ваш emai|请输入您的电子邮件|あなたのメールアドレスを入力してください"),
            email:tran("Địa chỉ email không hợp lệ|Please enter your email|Пожалуйста введите ваш e-mail|请输入您的电子邮件|あなたのメール アドレスを入力してください。"),
        },
        password: {
            required: tran("Mời bạn nhập Mật khẩu|Please enter your password|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            minlength: tran("Mật khẩu quá ngắn, tối thiểu 4 ký tự|Password too short, min 4 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            maxlength: tran("Mật khẩu quá dài, tối đa 32 ký tự|Password too long, max 32 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
        }
    },
    submitHandler: function(){
        $('.dBgAction').css('display', 'block');
        web.iReq({action: 'iLogin', email: $('#fLogin #iEmail').val(), password: $('#fLogin #iPassword').val()}, function(data){
            if(data == null)
            {
                if($('#fLogin label[for=iPassword]').length==0)
                    $('#fLogin #iPassword').after('<label for="iPassword" generated="true" class="error"></label>');
                $('#fLogin label[for=iPassword]').html(tran('Email hoặc mật khẩu không đúng|Email or password is incorrect|||')).css('display', 'block');
            }
            else
            {
                window.localStorage.setItem('people', JSON.stringify(data.people));
                window.localStorage.setItem('languages', JSON.stringify(data.languages));
                window.location.assign(data.path);
            }
            $('.dBgAction').css('display', 'none');
        });
    }
});
$('#fLogin .iSubmit').click(function(e){
    $("#fLogin").submit();
});
$('#fLogin input').keypress(function(e){
    if(e.keyCode==13)
        $("#fLogin").submit();
});
var code = $.md5(Math.floor(Math.random()*10)).slice(0,6).toLocaleUpperCase();
var c = document.getElementById("cCaptcha");
var ctx = c.getContext("2d");
var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
gradient.addColorStop("0", "#3F5D7D");
gradient.addColorStop("0.5", "#279B61");
gradient.addColorStop("1.0", "#008AB8");
ctx.fillStyle = gradient;
ctx.font = "16px Arial";
ctx.fillText(code, 0, 20);
$("#fRegister").validate({
    rules: {
        email: {required: true, email: true},
        password: {required: true, minlength: 4, maxlength: 32},
        repassword: {equalTo: '#fRegister #iPassword'},
        displayname: {required: true},
        captcha: {required: true, minlength: 6, maxlength: 6}
    },
    messages: {
        email: {
            required: tran("Mời bạn nhập email|Please enter your email|Пожалуйста, введите ваш emai|请输入您的电子邮件|あなたのメールアドレスを入力してください"),
            email:tran("Địa chỉ email không hợp lệ|Please enter your email|Пожалуйста введите ваш e-mail|请输入您的电子邮件|あなたのメール アドレスを入力してください。"),
        },
        password: {
            required: tran("Mời bạn nhập Mật khẩu|Please enter your password|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            minlength: tran("Mật khẩu quá ngắn, tối thiểu 4 ký tự|Password too short, min 4 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            maxlength: tran("Mật khẩu quá dài, tối đa 32 ký tự|Password too long, max 32 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
        },
        repassword: {
            equalTo: tran("Nhập lại mật khẩu không đúng|Re-enter your password wrong|Пожалуйста, введите ваш пароль|请重新输入您的密码|あなたのパスワードを再入力してください。")
        },
        displayname: {
            required: tran("Mời bạn nhập tên hiển thị|Please enter your display name|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。")
        },
        captcha: {
            required: tran("Mời bạn nhập mã xác nhận|Please enter conrfirm code|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            minlength: tran("Mã xác nhận quá ngắn, tối thiểu 6 ký tự|conrfirm code too short, min 6 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            maxlength: tran("Mã xác nhận quá dài, tối đa 6 ký tự|conrfirm code too long, max 6 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
        }
    },
    submitHandler: function(){
        if(code!=$('#iCaptcha').val())
        {
            if($('#fRegister label[for=iCaptcha]').length==0)
                $('#fRegister #iCaptcha').after('<label for="iCaptcha" generated="true" class="error"></label>');
            $('label[for=iCaptcha]').html('Mã xác nhận không đúng').css('display', 'block');
        }
        else
        {
            $('.dBgAction').css('display', 'block');
            web.iReq({action: 'iRegister', email: $('#fRegister #iEmail').val(), password: $('#fRegister #iPassword').val(), displayname: $('#fRegister #iDisplayName').val()}, function(data){
                if(data.status==false)
                {
                    if($('#fRegister label[for=iCaptcha]').length==0)
                        $('#fRegister #iCaptcha').after('<label for="iCaptcha" generated="true" class="error"></label>');
                    $('#fRegister label[for=iCaptcha]').html(data.msg).css('display', 'block');
                }
                else
                {
                    changePage($('.dBoardLogin'), 'dShow', {fn: function(){
                        if($('#fLogin label[for=iPassword]').length==0)
                            $('#fLogin #iPassword').after('<label for="iPassword" generated="true" class="error"></label>');
                        $('#fLogin label[for=iPassword]').html(data.msg).css('display', 'block');
                        $('title').html(tran('Đăng nhập|Login||')+SITENAME);
                        $('.dBgAction').css('display', 'none');
                    }, params: {}});
                }
            });
        }
    }
});
$('#fRegister .iSubmit').click(function(){
    $("#fRegister").submit();
});
$('#fRegister input').keypress(function(e){
    if(e.keyCode==13)
        $("#fRegister").submit();
});
var code2 = $.md5(Math.floor(Math.random()*10)).slice(0,6).toLocaleUpperCase();
var c = document.getElementById("cCaptcha2");
var ctx = c.getContext("2d");
var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
gradient.addColorStop("0", "#008AB8");
gradient.addColorStop("0.5", "#279B61");
gradient.addColorStop("1.0", "#3F5D7D");
ctx.fillStyle = gradient;
ctx.font = "16px Arial";
ctx.fillText(code2, 0, 20);
$("#fForgot").validate({
    rules: {
        email: {required: true, email: true},
        captcha: {required: true, minlength: 6, maxlength: 6}
    },
    messages: {
        email: {
            required: tran("Mời bạn nhập email|Please enter your email|Пожалуйста, введите ваш emai|请输入您的电子邮件|あなたのメールアドレスを入力してください"),
            email:tran("Địa chỉ email không hợp lệ|Please enter your email|Пожалуйста введите ваш e-mail|请输入您的电子邮件|あなたのメール アドレスを入力してください。"),
        },
        captcha: {
            required: tran("Mời bạn nhập mã xác nhận|Please enter conrfirm code|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            minlength: tran("Mã xác nhận quá ngắn, tối thiểu 6 ký tự|conrfirm code too short, min 6 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            maxlength: tran("Mã xác nhận quá dài, tối đa 6 ký tự|conrfirm code too long, max 6 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
        }
    },
    submitHandler: function(){
        if(code2!=$('#fForgot #iCaptcha').val())
        {
            if($('#fForgot label[for=iCaptcha]').length==0)
                $('#fForgot #iCaptcha').after('<label for="iCaptcha" generated="true" class="error"></label>');
            $('label[for=iCaptcha]').html('Mã xác nhận không đúng').css('display', 'block');
        }
        else
        {
            $('.dBgAction').css('display', 'block');
            web.iReq({action: 'iForgot', email: $('#fForgot #iEmail').val()}, function(data){
                if($('#fForgot label[for=iCaptcha]').length==0)
                    $('#fForgot #iCaptcha').after('<label for="iCaptcha" generated="true" class="error"></label>');
                $('#fForgot label[for=iCaptcha]').html(data).css('display', 'block');
                $('.dBgAction').css('display', 'none');
            });
        }
    }
});
$('#fForgot .iSubmit').click(function(){
    $("#fForgot").submit();
});
$('#fForgot input').keypress(function(e){
    if(e.keyCode==13)
        $("#fForgot").submit();
});