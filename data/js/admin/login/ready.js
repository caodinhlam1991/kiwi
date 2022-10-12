backmap = new BackMap();
backmap.add({ page: 'dBoardUser' });
$('.aMenu').click(function () {
    changePage($('.dBoardUser'), 'dShow', {
        fn: function () {
            backmap.add({ page: 'dBoardUser' });
        }, params: {}
    });
});
$('.dAppPage').click(function () {
    changePage($('.' + $(this).find('.dClose').attr('board')), 'dShow', {
        fn: function (me) {
            $('.' + me.find('.dClose').attr('board')).find('input:eq(0)').focus();
            backmap.add({ page: me.find('.dClose').attr('board'), title: me.find('> a').attr('title') });
        }, params: $(this)
    });
});
$('.dAppLanguages').click(function () {
    changePage($('.dBoardLanguages'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardLanguages', action: {
                    fn: function () {
                        if ($('#fLanguages').html() == '')
                            $('.dBoardLanguages .sBtnMore').trigger('click');
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$("#fLogin").validate({
    rules: {
        email: { required: true, email: true },
        password: { required: true, minlength: 4, maxlength: 32 }
    },
    messages: {
        email: {
            required: tran("Mời bạn nhập email|Please enter your email|Пожалуйста, введите ваш emai|请输入您的电子邮件|あなたのメールアドレスを入力してください"),
            email: tran("Địa chỉ email không hợp lệ|Please enter your email|Пожалуйста введите ваш e-mail|请输入您的电子邮件|あなたのメール アドレスを入力してください。"),
        },
        password: {
            required: tran("Mời bạn nhập Mật khẩu|Please enter your password|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            minlength: tran("Mật khẩu quá ngắn, tối thiểu 4 ký tự|Password too short, min 4 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            maxlength: tran("Mật khẩu quá dài, tối đa 32 ký tự|Password too long, max 32 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
        }
    },
    submitHandler: function () {
        $('.dBgAction').css('display', 'block');
        web.iReq({ action: 'iLogin', email: $('#fLogin #iEmail').val(), password: $('#fLogin #iPassword').val() }, function (data) {
            if (data == null) {
                if ($('#fLogin label[for=iPassword]').length == 0)
                    $('#fLogin #iPassword').after('<label for="iPassword" generated="true" class="error"></label>');
                $('#fLogin label[for=iPassword]').html(tran('Email hoặc mật khẩu không đúng|Email or password is incorrect|||')).css('display', 'block');
            }
            else {
                window.localStorage.setItem('people', JSON.stringify(data.people));
                window.localStorage.setItem('flags', JSON.stringify(data.flags));
                switch(data.path)
                {
                    case '/dashboard':
                        $('.sFeaControl a:eq(0)').trigger('click');
                        people = JSON.parse((web.done(window.localStorage.getItem('people'), null)));
                        if(people.hasOwnProperty('displayname') && people.displayname!='')
                        {
                            $('.dUserFeature > a').attr('title', people.displayname);
                            $('.dUserFeature > a').last().text(people.displayname);
                        }
                        if(people.hasOwnProperty('image') && people.image!='')
                            $('.dUserFeature > a > img').attr('src', people.image);
                        wChat(web, people);
                        $('.dLogoutFeature').click(function(){
                            window.localStorage.setItem('people', null);
                            people = null;
                            $('.dLogined').fadeOut(200, function(){
                                $('.dLogin').fadeIn(300);
                            });
                        });
                        $('.dLogin').fadeOut(200, function(){
                            $('.dLogined').fadeIn(300);
                        });
                    break;
                    default:
                        window.location.assign(data.path);
                    break;
                }
            }
            $('.dBgAction').css('display', 'none');
        });
    }
});
$('#fLogin .iSubmit').click(function (e) {
    $("#fLogin").submit();
});
$('#fLogin input').keypress(function (e) {
    if (e.keyCode == 12+1)
        $("#fLogin").submit();
});
var codeApply = $.md5(Math.floor(Math.random() * 10)).slice(0, 6).toLocaleUpperCase(), code;
var c = document.getElementById("cCaptcha");
var ctx = c.getContext("2d");
var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
gradient.addColorStop("0", "#3F5D7D");
gradient.addColorStop("0.5", "#279B61");
gradient.addColorStop("1.0", "#008AB8");
ctx.fillStyle = gradient;
ctx.font = "16px Arial";
ctx.fillText(codeApply, 0, 20);
$("#fRegister").validate({
    rules: {
        email: { required: true, email: true },
        password: { required: true, minlength: 4, maxlength: 32 },
        repassword: { equalTo: '#fRegister #iPassword' },
        displayname: { required: true },
        captcha: { required: true, minlength: 6, maxlength: 6 }
    },
    messages: {
        email: {
            required: tran("Mời bạn nhập email|Please enter your email|Пожалуйста, введите ваш emai|请输入您的电子邮件|あなたのメールアドレスを入力してください"),
            email: tran("Địa chỉ email không hợp lệ|Please enter your email|Пожалуйста введите ваш e-mail|请输入您的电子邮件|あなたのメール アドレスを入力してください。"),
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
    submitHandler: function () {
        if (codeApply != $('#iCaptcha').val()) {
            if ($('#fRegister label[for=iCaptcha]').length == 0)
                $('#fRegister #iCaptcha').after('<label for="iCaptcha" generated="true" class="error"></label>');
            $('label[for=iCaptcha]').html('Mã xác nhận không đúng').css('display', 'block');
        }
        else {
            $('.dBgAction').css('display', 'block');
            web.iReq({ action: 'iRegister', email: $('#fRegister #iEmail').val(), password: $('#fRegister #iPassword').val(), displayname: $('#fRegister #iDisplayName').val() }, function (data) {
                if ($('#fRegister label[for=iCaptcha]').length == 0)
                    $('#fRegister #iCaptcha').after('<label for="iCaptcha" generated="true" class="error"></label>');
                $('#fRegister label[for=iCaptcha]').html(data.msg).css('display', 'block');
                $('.dBgAction').css('display', 'none');
            });
        }
    }
});
$('#fRegister .iSubmit').click(function () {
    $("#fRegister").submit();
});
$('#fRegister input').keypress(function (e) {
    if (e.keyCode == 13)
        $("#fRegister").submit();
});
var code2 = $.md5(Math.floor(Math.random() * 10)).slice(0, 6).toLocaleUpperCase();
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
        email: { required: true, email: true },
        captcha: { required: true, minlength: 6, maxlength: 6 }
    },
    messages: {
        email: {
            required: tran("Mời bạn nhập email|Please enter your email|Пожалуйста, введите ваш emai|请输入您的电子邮件|あなたのメールアドレスを入力してください"),
            email: tran("Địa chỉ email không hợp lệ|Please enter your email|Пожалуйста введите ваш e-mail|请输入您的电子邮件|あなたのメール アドレスを入力してください。"),
        },
        captcha: {
            required: tran("Mời bạn nhập mã xác nhận|Please enter conrfirm code|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            minlength: tran("Mã xác nhận quá ngắn, tối thiểu 6 ký tự|conrfirm code too short, min 6 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            maxlength: tran("Mã xác nhận quá dài, tối đa 6 ký tự|conrfirm code too long, max 6 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
        }
    },
    submitHandler: function () {
        if (code2 != $('#fForgot #iCaptcha').val()) {
            if ($('#fForgot label[for=iCaptcha]').length == 0)
                $('#fForgot #iCaptcha').after('<label for="iCaptcha" generated="true" class="error"></label>');
            $('label[for=iCaptcha]').html('Mã xác nhận không đúng').css('display', 'block');
        }
        else {
            $('.dBgAction').css('display', 'block');
            web.iReq({ action: 'iForgot', email: $('#fForgot #iEmail').val() }, function (data) {
                if ($('#fForgot label[for=iCaptcha]').length == 0)
                    $('#fForgot #iCaptcha').after('<label for="iCaptcha" generated="true" class="error"></label>');
                $('#fForgot label[for=iCaptcha]').html(data).css('display', 'block');
                $('.dBgAction').css('display', 'none');
                code2 = $.md5(Math.floor(Math.random() * 10)).slice(0, 6).toLocaleUpperCase();
                ctx = c.getContext("2d");
                ctx.clearRect(0, 0, c.width, c.height);
                ctx.fillText(code2, 0, 20);
            });
        }
    }
});
$('#fForgot .iSubmit').click(function () {
    $("#fForgot").submit();
});
$('#fForgot input').keypress(function (e) {
    if (e.keyCode == 13)
        $("#fForgot").submit();
});