var web, people, imgs = {}, isApp = false, videos = {}, recordedBlobs = [], mediaRecorder, refresh = {}, partial, OpenPhotos, adt = [];
var Dashboard = function (p) {
    OpenPhotos = function (callback) {
        changePage($('.dBoardImages'), 'dShow', {
            fn: function () {
                $('.dBoardImages .sBtnMore').trigger('click');
                if (typeof (callback) == 'function')
                    callback();
            }, params: {}
        });
    };
    var ready = function () {
        partial = document.createElement('script');
        partial.src = BASEURL + "/public/js/admin/login/ready.js";
        document.head.appendChild(partial);
        if (people != null && people._id != undefined)
        {
            if (people.hasOwnProperty('displayname') && people.displayname != '')
            {
                $('.dUserFeature > a').attr('title', people.displayname);
                $('.dUserFeature > a').last().text(people.displayname);
            }
            if (people.hasOwnProperty('image') && people.image != '')
                $('.dUserFeature > a > img').attr('src', people.image);
            $('.dLogoutFeature').click(function () {
                window.localStorage.setItem('people', null);
                people = null;
                $('.dLogined').fadeOut(200, function () {
                    $(".dBoardFriends .dFramePng").html('');
                    $('.dLogin').fadeIn(300);
                });
            });
            $('.dLogined').fadeIn(300);
        } else
        {
            $('.dLogin').fadeIn(300);
            $('.dAppFriends .dNotify').fadeIn(300);
        }
        partial = document.createElement('script');
        partial.src = BASEURL + "/public/js/admin/dashboard/ready.js";
        document.head.appendChild(partial);
        $('.sFeaControl a:eq(1)').click(function () {
            switch ($(this).attr('board'))
            {
                case 'dBoardLogin':
                    $("#fLogin").submit();
                    break;
                case 'dBoardRegister':
                    $("#fRegister").submit();
                    break;
                case 'dBoardForgot':
                    $("#fForgot").submit();
                    break;
                default:

                    break;
            }
        });
        actionBrowser();
        $('.iSearch').click(function () {
            if ($('.aHideMessenge').length == 0)
            {
                if ($('.aHideControls').css('top') == '47px')
                    $('.aHideControls').fadeOut(250, function () {
                        $(this).css({'top': '0', 'right': '0'}).fadeIn(250);
                    });
                if ($('.dAppBoard .dFramePng').css('display') == 'block')
                {
                    $('.dControlBrowser').animate({ top: 32 }, 260, function(){
                        location.hash = LANG + "??lessContent";
                    });
                    $('.dDashApp .dBoardAction > .dFramePng').animate({ height: '301px' }, 260);
                    $('.dDashApp .dBoardAction, .dRSide').animate({ top: 63 }, 260);
                } else
                    location.hash = LANG + "??lessContent";
            }
        }).blur(function () {

        });
        $('.aBack').click(function () {
            if ($('.aHideMessenge').length == 0)
                location.hash = LANG + "??backsBrowser";
            else
                if (backmap.see($(this).attr('time')).page != 'dBoardFriends')
                {
                    $('.aSendMess').fadeOut(200);
                    if (typeof (backmap.see(parseInt($(this).attr('time')) - 1).action) != 'undefined' && typeof (backmap.see(parseInt($(this).attr('time')) - 1).action.fn) == 'function')
                        backmap.see(parseInt($(this).attr('time')) - 1).action.fn(backmap.see(parseInt($(this).attr('time')) - 1).action.params);
                    changePage($('.' + backmap.see(parseInt($(this).attr('time')) - 1).page), 'dShow', {
                        fn: function () {
                            $('.aBack').attr('ready', 1);
                        }, params: {}
                    });
                    $(this).attr('time', parseInt($(this).attr('time')) - 1);
                    backmap.setTime($(this).attr('time'));
                } else
                    $('.aHideControls').trigger('click');
        });
        $('.aHome').click(function () {
            location.hash = LANG + "??reloadsBrowser";
        });
        $('.aHideControls').click(function () {
            if ($('.aHideMessenge').length == 0)
            {
                $('.dAppBoard .dFramePng, .aHideControls').fadeOut(200, function () {
                    $('.dControlBrowser').animate({ top: 2 }, 260, function(){
                        $('.iSearch').blur();
                        location.hash = LANG + "??resizesContent";
                    });
                    $('.aHideControls').css({'top': '0', 'right': '0', 'display': 'inline-block'});
                });
            } else
            {
                $('.aReload, .aForward, .aHistories, .aDownload, .aPin, .aAddTab, .aOnWebview').fadeIn(200);
                $('.aHideMessenge').removeClass('aHideMessenge');
                $('.aSendMess').fadeOut(300);
                changePage($('.dAppBoard'), 'dShow', {
                    fn: function () {
                        backmap.add({
                            page: 'dAppBoard', action: {
                                fn: function () {
                                    if (typeof (callback) == 'function')
                                        callback();
                                    $('.iSearch').attr({'placeholder': $('.iSearch').attr('or'), 'value': $('.iSearch').attr('or')});
                                    if ($('.aHideControls').css('top') == '0px')
                                        location.hash = LANG + "??restoreContent";
                                    else
                                        location.hash = LANG + "??showContent";
                                }, params: {}
                            }
                        });
                    }, params: {}
                });
            }
        });
        $('.aAddTab').click(function () {
            location.hash = LANG + "??addWBrowser??" + decodeURIComponent("about:blank")+"????"+(($('.aOnWebviewed').length==0)? '1': '2');
        });
        $('.aReload').click(function () {
            location.hash = LANG + "??reloadsBrowser";
        });
        $('.aForward').click(function () {
            location.hash = LANG + "??forwardsBrowser";
        });
        $('.aDownload').click(function () {
            location.hash = LANG + "??downloadsBrowser";
        });
        $('.aOnWebview').toggle(function () {
            $(this).addClass('aOnWebviewed');
        }, function () {
            $(this).removeClass('aOnWebviewed');
        });
        $('.dCazsApps').click(function () {
            if (people == null)
            {
                $('.dRSide > div > div').css('display', 'none');
                $('.dBoardLogin').css('display', 'block');
                $('.sFeaControl a:eq(1)').attr('board', 'dBoardLogin');
                $('.dRSide').animate({ right: 0 }, 260);
                return false;
            }
        });
    };
    var loaded = function () {
        if (people != null)
        {
            wChat(web, people);
        }
        partial = document.createElement('script');
        partial.src = BASEURL + "/public/js/admin/dashboard/loaded.js";
        document.head.appendChild(partial);
    };
    var resize = function () {
        partial = document.createElement('script');
        partial.src = BASEURL + "/public/js/admin/dashboard/resize.js";
        document.head.appendChild(partial);
    };
    partial = document.createElement('script');
    partial.src = BASEURL + "/public/js/admin/dashboard/content.js";
    document.head.appendChild(partial);
    var params = {
        BASEURL: (typeof BASEURL == 'undefined') ? '' : BASEURL,
        wapps: {},
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready,
        resize: resize,
        wapps: params.wapps
    };
};
var Guests = function (p) {
    var ready = function () {
        backmap = new BackMap();
        $('.dWebApp').click(function () {
            me = $(this);
            device.execute({
                w_1000_f: function (params) {
                    location.assign(me.find('.dClose').attr('weburl'));
                },
                w_800_1000_f: function (params) {
                    location.assign(me.find('.dClose').attr('mobileurl'));
                },
                w_768_800_f: function (params) {
                    location.assign(me.find('.dClose').attr('mobileurl'));
                },
                w_590_768_f: function (params) {
                    locon.assign(me.find('.dClose').attr('mobileurl'));
                },
                w_480_590_f: function (params) {
                    location.assign(me.find('.dClose').attr('mobileurl'));
                },
                w_320_480_f: function (params) {
                    location.assign(me.find('.dClose').attr('mobileurl'));
                }
            });
        });
    };
    var loaded = function () {
        if (people.class != 1 || people.class != 6)
            $('.dAppOrder, .dAppSubscription, .dAppContact').remove();
        wChat(web, people);
        partial = document.createElement('script');
        partial.src = BASEURL + "/public/js/admin/dashboard/loaded.js";
        document.head.appendChild(partial);
        $('.dWebApp').fadeIn(330);
    };
    var resize = function () {
        partial = document.createElement('script');
        partial.src = BASEURL + "/public/js/admin/dashboard/resize.js";
        document.head.appendChild(partial);
    };
    partial = document.createElement('script');
    partial.src = BASEURL + "/public/js/admin/dashboard/content.js";
    document.head.appendChild(partial);
    var params = {
        BASEURL: (typeof BASEURL == 'undefined') ? '' : BASEURL
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready,
        resize: resize
    };
};
var DashBrowser = function (p) {
    var ready = function () {
        backmap = new BackMap();
        people = JSON.parse((web.done(window.localStorage.getItem('people'), null)));
        if (people == null)
            window.location.assign(BASEURL + '/browserlogin');
        if (people.hasOwnProperty('displayname') && people.displayname != '')
        {
            $('.dUserFeature > a').attr('title', people.displayname);
            $('.dUserFeature > a').last().text(people.displayname);
        }
        if (people.hasOwnProperty('image') && people.image != '')
            $('.dUserFeature > a > img').attr('src', people.image);
        $('.dLogoutFeature').click(function () {
            $(".dBoardFriends .dFramePng").html('');
            window.localStorage.setItem('people', null);
            people = null;
            window.location.assign(BASEURL + '/browserlogin');
        });
        actionBrowser();
    };
    var loaded = function () {
        $('.dDashBrowser .dApp').fadeTo(330, 1);
        resizes();
    };
    var resize = function () {
        resizes();
    };
    partial = document.createElement('script');
    partial.src = BASEURL + "/public/js/admin/dashboard/content.js";
    document.head.appendChild(partial);
    partial = document.createElement('script');
    partial.src = BASEURL + "/public/js/admin/dashboard/resize.js";
    document.head.appendChild(partial);
    var params = {
        BASEURL: (typeof BASEURL == 'undefined') ? '' : BASEURL
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready,
        resize: resize
    };
};
var DashApp = function (p) {
    var ready = function () {
        partial = document.createElement('script');
        partial.src = BASEURL + "/public/js/admin/login/ready.js";
        document.head.appendChild(partial);
        if (people != null && people._id != undefined)
        {
            if (people.hasOwnProperty('displayname') && people.displayname != '')
            {
                $('.dUserFeature > a').attr('title', people.displayname);
                $('.dUserFeature > a').last().text(people.displayname);
            }
            if (people.hasOwnProperty('image') && people.image != '')
                $('.dUserFeature > a > img').attr('src', people.image);
            $('.dLogoutFeature').click(function () {
                window.localStorage.setItem('people', null);
                people = null;
                $('.dLogined').fadeOut(200, function () {
                    $(".dBoardFriends .dFramePng").html('');
                    $('.dLogin').fadeIn(300);
                });
            });
            $('.dLogined').fadeIn(300);
        } else
        {
            $('.dLogin').fadeIn(300);
            $('.dAppFriends .dNotify').fadeIn(300);
        }
        partial = document.createElement('script');
        partial.src = BASEURL + "/public/js/admin/dashboard/ready.js";
        document.head.appendChild(partial);
        $('.sFeaControl a:eq(1)').click(function () {
            switch ($(this).attr('board'))
            {
                case 'dBoardLogin':
                    $("#fLogin").submit();
                    break;
                case 'dBoardRegister':
                    $("#fRegister").submit();
                    break;
                case 'dBoardForgot':
                    $("#fForgot").submit();
                    break;
                default:

                    break;
            }
        });
        actionBrowser();
        $('.iSearch').click(function () {
            if ($('.aHideMessenge').length == 0)
            {
                if ($('.aHideControls').css('top') == '47px')
                    $('.aHideControls').fadeOut(250, function () {
                        $(this).css({'top': '0', 'right': '0'}).fadeIn(250);
                    });
                if ($('.dAppBoard .dFramePng').css('display') == 'block')
                {
                    $('.dControlBrowser').animate({ top: 32 }, 260, function(){
                        location.hash = LANG + "??lessContent";
                    });
                    $('.dDashApp .dBoardAction > .dFramePng').animate({ height: '301px' }, 260);
                    $('.dDashApp .dBoardAction, .dRSide').animate({ top: 63 }, 260);
                } else
                    location.hash = LANG + "??lessContent";
            }
        }).blur(function () {

        });
        $('.aBack').click(function () {
            if ($('.aHideMessenge').length == 0)
                location.hash = LANG + "??backsBrowser";
            else
                if (backmap.see($(this).attr('time')).page != 'dBoardFriends')
                {
                    $('.aSendMess').fadeOut(200);
                    if (typeof (backmap.see(parseInt($(this).attr('time')) - 1).action) != 'undefined' && typeof (backmap.see(parseInt($(this).attr('time')) - 1).action.fn) == 'function')
                        backmap.see(parseInt($(this).attr('time')) - 1).action.fn(backmap.see(parseInt($(this).attr('time')) - 1).action.params);
                    changePage($('.' + backmap.see(parseInt($(this).attr('time')) - 1).page), 'dShow', {
                        fn: function () {
                            $('.aBack').attr('ready', 1);
                        }, params: {}
                    });
                    $(this).attr('time', parseInt($(this).attr('time')) - 1);
                    backmap.setTime($(this).attr('time'));
                } else
                    $('.aHideControls').trigger('click');
        });
        $('.aHome').click(function () {
            location.hash = LANG + "??reloadsBrowser";
        });
        $('.aHideControls').click(function () {
            if ($('.aHideMessenge').length == 0)
            {
                $('.dAppBoard .dFramePng, .aHideControls').fadeOut(200, function () {
                    $('.dControlBrowser').animate({ top: 2 }, 260, function(){
                        $('.iSearch').blur();
                        location.hash = LANG + "??resizesContent";
                    });
                    $('.aHideControls').css({'top': '0', 'right': '0', 'display': 'inline-block'});
                });
            } else
            {
                $('.aReload, .aForward, .aHistories, .aDownload, .aPin, .aAddTab, .aOnWebview').fadeIn(200);
                $('.aHideMessenge').removeClass('aHideMessenge');
                $('.aSendMess').fadeOut(300);
                changePage($('.dAppBoard'), 'dShow', {
                    fn: function () {
                        backmap.add({
                            page: 'dAppBoard', action: {
                                fn: function () {
                                    if (typeof (callback) == 'function')
                                        callback();
                                    $('.iSearch').attr({'placeholder': $('.iSearch').attr('or'), 'value': $('.iSearch').attr('or')});
                                    if ($('.aHideControls').css('top') == '0px')
                                        location.hash = LANG + "??restoreContent";
                                    else
                                        location.hash = LANG + "??showContent";
                                }, params: {}
                            }
                        });
                    }, params: {}
                });
            }
        });
        $('.aAddTab').click(function () {
            location.hash = LANG + "??addWBrowser??" + decodeURIComponent("about:blank")+"????"+(($('.aOnWebviewed').length==0)? '1': '2');
        });
        $('.aReload').click(function () {
            location.hash = LANG + "??reloadsBrowser";
        });
        $('.aForward').click(function () {
            location.hash = LANG + "??forwardsBrowser";
        });
        $('.aDownload').click(function () {
            location.hash = LANG + "??downloadsBrowser";
        });
        $('.aSpeedUp').toggle(function () {
            $(this).addClass('aSpeedUpped');
            location.hash = LANG + "??speedUp";
        }, function () {
            $(this).removeClass('aSpeedUpped');
            location.hash = LANG + "??offSpeedUp";
        });
        $('.dCazsApps').click(function () {
            if (people == null)
            {
                $('.dRSide > div > div').css('display', 'none');
                $('.dBoardLogin').css('display', 'block');
                $('.sFeaControl a:eq(1)').attr('board', $(this).find('.dClose').attr('board'));
                $('.dRSide').animate({ right: 0 }, 260);
                return false;
            }
        });
    };
    var loaded = function () {
        partial = document.createElement('script');
        partial.src = BASEURL + "/public/js/admin/dashboard/loaded.js";
        document.head.appendChild(partial);
        if (people != null)
        {
            web.iReq({action: 'iGetMyCoins'}, function (cdt) {
                if (cdt == 'logout')
                    $('.dLogoutFeature').trigger('click');
                else
                    $('.sWatts span').html(sep_price2(String(cdt)));
            });
            wChat(web, people);
        }
        backmap.add({page: 'dAppBoard', title: $('title').text()});
        resizes();
        setInterval(function () {
            web.iReq({action: 'iGetFormatNowArr', agent: navigator.peopleAgent}, function (dt) {
                $('.sServerDate span:eq(0)').text(dt[0]);
                $('.sServerDate span:eq(1)').text(dt[1]);
                $('.sServerDate span:eq(2)').text(dt[2]);
                $('.sServerDate span:eq(3)').text(dt[3]);
                $('.sServerDate span:eq(4)').text(dt[4]);
                $('.sServerDate span:eq(5)').text(dt[5]);
                $('.sServerDate span:eq(6)').text(dt[6]);
            });
        }, 1000);
        //web.wpReady(function (md) {
        //switch (md.type) {
        //case 'isWsup3Homes':
        //web.wpRes({ action: 'wpIsShowTheme', agent: navigator.peopleAgent });
        //break;
        //}
        //});
    };
    var resize = function () {
        resizes();
    };
    partial = document.createElement('script');
    partial.src = BASEURL + "/public/js/admin/dashboard/content.js";
    document.head.appendChild(partial);
    partial = document.createElement('script');
    partial.src = BASEURL + "/public/js/admin/dashboard/resize.js";
    document.head.appendChild(partial);
    var params = {
        BASEURL: (typeof BASEURL == 'undefined') ? '' : BASEURL,
        wapps: {},
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready,
        resize: resize,
        wapps: params.wapps
    };
};

var Wapp = function (p) {
    var ready = function () {
        backmap = new BackMap();
        backmap.add({page: 'dWapp'});
    };
    var loaded = function () {
        params.id = dateTimeObj.getParams().dateObj.getTime();
        web.iReq({action: 'wpVarAppid', id: params.id}, function (dt) {
            location.hash = LANG + "??done";
        });
        web.wpReady(function (md) {
            switch (md.type) {
                case 'backsBrowser':
                    location.hash = LANG + "??" + md.type;
                    break;
                case 'reloadsBrowser':
                    location.hash = LANG + "??" + md.type;
                    break;
                case 'forwardsBrowser':
                    location.hash = LANG + "??" + md.type;
                    break;
                case 'resizesContent':
                    location.hash = LANG + "??" + md.type;
                    break;
                case 'showContent':
                    location.hash = LANG + "??" + md.type;
                    break;
                case 'browsers':
                    location.hash = LANG + "??" + md.type + "??" + md.url;
                    break;
            }
        });
    };
    var resize = function () {
        resizes();
    };
    var params = {
        BASEURL: (typeof BASEURL == 'undefined') ? '' : BASEURL,
        id: null
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready,
        wapps: params.wapps
    };
};
function actionBrowser(device) {
    $('.dAppFeature').click(function () {
        $('.dRSide > div > div').css('display', 'none');
        $('.' + $(this).find('.dClose').attr('board')).css('display', 'block');
        $('.sFeaControl a:eq(1)').attr('board', $(this).find('.dClose').attr('board'));
        $('.dRSide').animate({ right: 0 }, 260);
    });
    $('.sFeaControl a:eq(0)').click(function () {
        if ($('.dRSide').css('right') == '0px')
            $('.dRSide').animate({ right: '-' + $('.dRSide').width() }, 260);
    });
    $('.dMainBoard').click(function () {
        $('.sFeaControl a:eq(0)').click();
    });
}
var BrowserLogin = function (p) {
    var ready = function () {
        people = JSON.parse((web.done(window.localStorage.getItem('people'), null)));
        if (people == null) {
            partial = document.createElement('script');
            partial.src = BASEURL + "/public/js/admin/login/ready.js";
            document.head.appendChild(partial);
        }
        backmap = new BackMap();
        actionBrowser();
    };
    var loaded = function () {
        if (people.class != 1 || people.class != 6)
            $('.dAppOrder, .dAppSubscription, .dAppContact').remove();
        wChat(web, people);
        partial = document.createElement('script');
        partial.src = BASEURL + "/public/js/admin/dashboard/loaded.js";
        document.head.appendChild(partial);
        $('.dDashBrowser .dApp').fadeTo(330, 1);
    };
    var resize = function () {
        partial = document.createElement('script');
        partial.src = BASEURL + "/public/js/admin/dashboard/resize.js";
        document.head.appendChild(partial);
    };
    partial = document.createElement('script');
    partial.src = BASEURL + "/public/js/admin/dashboard/content.js";
    document.head.appendChild(partial);
    var params = {
        BASEURL: (typeof BASEURL == 'undefined') ? '' : BASEURL
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready,
        resize: resize
    };
};
var Login = function (p) {
    var ready = function () {
        partial = document.createElement('script');
        partial.src = BASEURL + "/public/js/admin/login/ready.js";
        document.head.appendChild(partial);
        $('.sBtnMore').live('click', function () {
            me = $(this);
            me.fadeOut(250);
            params = {action: 'iGetMores', type: me.attr('type'), from: me.prev().find('.dCategory').length, keys: $('.iSearch').val(), opt: LANG};
            web.iReq(params, function (dt) {
                switch (me.attr('type')) {
                    case 'language':
                        dt.forEach(function (obj, index) {
                            p = '<div class="dCategory ' + obj._id + '">' +
                                    '<div class="dProduct" id="' + obj._id + '">' +
                                    '<p><span></span><span>' + obj.created + '<img class="iOnLang" lang="' + obj.id + '" style="display: ' + ((obj.active == true) ? 'block' : 'none') + '" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img class="iOnLang" lang="' + obj.id + '" style="display: ' + ((obj.active == false) ? 'block' : 'none') + '" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                                    '<div class="dOption">' +
                                    '<span lang="' + obj.id + '" class="' + ((LANG != obj.id) ? 'sSetDefault' : 'sInSetDefault') + '"></span>' +
                                    '<span class="sEditLang"><img src="' + SKIN + '/admin/edit.png" alt="wsup3"/></span>' +
                                    '</div><div class="dInfo">' +
                                    '<a target="_blank"><img src="' + ((typeof (obj.image) != 'undefined') ? obj.image : SKIN + '/logo.png') + '" alt="wsup3"/><span class="' + ((LANG == obj.id) ? 'sDefault' : 'sInDefault') + '"></span></a>' +
                                    '<p>' + obj.name + '</p>' +
                                    '<p></p>' +
                                    '</div></div></div>';
                            $('#fLanguages').append(p).find('.dInfo > a img').each(function () {
                                $(this).load(function () {
                                    align.topleft($(this), $(this).parent(), 0, 0, 1);
                                });
                            });
                        });
                        break;
                }
                if (dt.length < 10)
                    me.fadeOut(250);
                else
                    me.fadeIn(250);
            });
        });
        $('.aBack').click(function () {
            if (parseInt($(this).attr('time')) > 0 && $(this).attr('ready') == 1) {
                $(this).attr('ready', 0);
                $('title').html(backmap.see(parseInt($(this).attr('time')) - 1).title + ' - ' + SITENAME);
                changePage($('.' + backmap.see(parseInt($(this).attr('time')) - 1).page), 'dShow', {
                    fn: function () {
                        $('.aBack').attr('ready', 1);
                    }, params: {}
                });
                $(this).attr('time', parseInt($(this).attr('time')) - 1);
                $('.iDel').fadeIn(200, function () {
                    $('.iDelY').fadeOut(200);
                });
            }
        });//exit fullscreen exitFullscreen()
    };
    var loaded = function () {
        $('#fLogin #iEmail').focus();
        $("#fWebRegister").validate({
            rules: {
                webaddress: { required: true }
            },
            messages: {
                webaddress: {
                    required: tran("M???i b???n nh???p ?????a ch??? web|Please enter your web address name|????????????????????, ?????????????? ?????? ????????????|?????????????????????|?????????????????????????????????????????????????????????")
                }
            },
            submitHandler: function () {
                $('.dBgAction').css('display', 'block');
                $('.lError').removeClass('lForm');
                temp = $('#fWebRegister #iWebaddress').val();
                temp = (temp.indexOf("https://")==0)? temp.substring(8): temp;
                temp = (temp.indexOf("http://")==0)? temp.substring(7): temp;
                temp = (temp.indexOf("/")>-1)? temp.substring(0, temp.indexOf("/")): temp;
                $('#fWebRegister #iWebaddress').val(temp);
                web.iReq({ action: 'iWebRegister', webaddress: $('#fWebRegister #iWebaddress').val() }, function (data) {
                    $('.lError').html('????ng k?? th??nh c??ng, h??y li??n h??? h??? tr??? ????? ti???n h??nh c??i ?????t th??m').addClass('lForm');
                    $('.dBgAction').css('display', 'none');
                });
            }
        });
        $('#fWebRegister .iSent').click(function () {
            $("#fWebRegister").submit();
        });
        $('#fWebRegister input').keypress(function (e) {
            if (e.keyCode == 13)
                $("#fWebRegister").submit();
        });
    };
    var resize = function () { };
    var params = {
        BASEURL: (typeof BASEURL == 'undefined') ? '' : BASEURL
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready,
        resize: resize
    };
};

var backmap;
var animate = new Animation();
var align = new Align();
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
switch (PAGE) {
    case 'login':
    case 'webRegister':
        var login = new Login();
        break;
    case 'dashboard':
        var dashboard = new Dashboard();
        break;
    case 'guests':
        var guests = new Guests();
        break;
    case 'dashbrowser':
        var dashbrowser = new DashBrowser();
        break;
    case 'dashapp':
        var dashapp = new DashApp();
        break;
    case 'wapp':
        var wapp = new Wapp();
        break;
    case 'browserlogin':
        var browserlogin = new BrowserLogin();
        break;
}

$(document).ready(function () {
    //if (navigator.peopleAgent.indexOf("Android") == -1 || navigator.peopleAgent.indexOf("like Mac") == -1)
    //window.location.assign(BASEURL + '/is-wsup3-homes');
    $('html').on('dragstart', function () {
        return false;
    });
    $('.aMinimizes').click(function () {
        location.hash = LANG + "??minimizes";
        $(this).prev().html('<i class="fas fa-window-restore"></i>').addClass('aRestores').removeClass('aMaximizes');
    });
    $('.aClose').click(function () {
        location.hash = LANG + "??close";
    });
    $('.iSearch').live('keyup', function (e) {
        if ($(this).attr('time') == 1) {
            $(this).attr('time', 0);
            switch (backmap.see().page) {
                case 'dMainBoard':
                case 'dAppBoard':
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        if ($('.iSearch').val() == "" || $('.iSearch').val() == $('.iSearch').attr('placeholder'))
                            location.hash = LANG + "??reloadsBrowser";
                        else
                        {
                            if ($('.iSearch').val().split('.').Length >= 3)
                            {
                                adt = $('.iSearch').val().split('.');
                                if (adt[adt.Length - 1].split('/').Length >= 1)
                                    adt = adt[adt.Length - 1].split('/');
                                switch (adt[0])
                                {
                                    case "vn":
                                    case "com":
                                    case "cf":
                                    case "net":
                                    case "me":
                                        break;
                                    default:
                                        location.hash = LANG + "??downloadFile??" + decodeURIComponent($('.iSearch').val());
                                        break;
                                }
                                $('.iSearch').attr('time', 1);
                                break;
                            }
                            if ($('.dShelf .dActApp').length > 0)
                            {
                                if(isApp)
                                {
                                    tabs[decodeURIComponent($('.iSearch').val())] = tabs[$('.dActApp .dClose').attr('address')];
                                    delete tabs[$('.dActApp .dClose').attr('address')];
                                    $('.dActApp .dClose').attr('address', decodeURIComponent($('.iSearch').val()));
                                    location.hash = LANG + "??browsers??" + tabs[decodeURIComponent($('.iSearch').val())] + "??" + decodeURIComponent($('.iSearch').val());// + "??icon??" + icon;
                                }
                                else
                                    window.location.assign(decodeURIComponent($('.iSearch').val()));
                            }
                            else
                            {
                                if ($('.iSearch').val().indexOf(' ') >= 0 || $('.iSearch').val().indexOf('.') < 0)
                                {
                                    setTimeout(function(){
                                        if(isApp)
                                            location.hash = LANG + "??addWBrowser??" + 'https://www.google.com/search?q=' + decodeURIComponent($('.iSearch').val());
                                        else
                                            window.location.assign('https://www.google.com/search?q=' + decodeURIComponent($('.iSearch').val()));
                                    }, 200);
                                }
                                else
                                {
                                    if(isApp)
                                        location.hash = LANG + "??addWBrowser??"+$('.iSearch').val();
                                    else
                                        window.location.assign('http://'+$('.iSearch').val());
                                }
                            }
                        }
                    }
                    $('.iSearch').attr('time', 1);
                    break;
                case 'dBoardImport':
                case 'dBoardSell':
                    $('.' + backmap.see().page + ' .dProducts > div').html('');
                    if ($('.aProducts img:eq(1)').css('opacity') == 0)
                    {
                        $('.' + backmap.see().page + ' .aProducts').trigger('click');
                        setTimeout(function () {
                            $.each(pros.items, function (k, v) {
                                if (v.title.indexOf($('.iSearch').val()) > -1)
                                {
                                    $('.' + backmap.see().page + ' .dProducts > div').append('<div key="' + k + '" _id="' + v._id + '" class="dProductSelect">' +
                                            '<a><img src="' + ((v.imgs.hasOwnProperty(0) == true) ? ((typeof (v.imgs[0]) == 'object') ? ((v.imgs[0] != null) ? v.imgs[0] : SKIN + '/logo.png') : v.imgs[0]) : SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                                            '<a>' + v.title + '</a></div>');
                                }
                            });
                        }, 600);
                    } else
                        $.each(pros.items, function (k, v) {
                            if (v.title.indexOf($('.iSearch').val()) > -1)
                            {
                                $('.' + backmap.see().page + ' .dProducts > div').append('<div key="' + k + '" _id="' + v._id + '" class="dProductSelect">' +
                                        '<a><img src="' + ((v.imgs.hasOwnProperty(0) == true) ? ((typeof (v.imgs[0]) == 'object') ? ((v.imgs[0] != null) ? v.imgs[0] : SKIN + '/logo.png') : v.imgs[0]) : SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                                        '<a>' + v.title + '</a></div>');
                            }
                        });
                    $('.iSearch').attr('time', 1);
                    break;
                case 'dBoardFriends':
                    $('.' + backmap.see().page + ' .sBtnMore').attr('type', 'mfriend');
                default:
                    $('.' + backmap.see().page + ' .sBtnMore').parent().prev().html('');
                    $('.' + backmap.see().page + ' .sBtnMore').trigger('click');
                    setTimeout(function () {
                        $('.iSearch').attr('time', 1);
                    }, 500);
                    break;
            }
        }
    });
    web = new Cazs({});
    device = new Devices;
    switch (PAGE) {
        case 'webRegister':???
            backmap = new BackMap();
            backmap.add({ page: 'dBoardUser' });
        case 'login':
            login.ready();
            break;
        case 'dashboard':
            dashboard.ready();
            break;
        case 'guests':
            guests.ready();
            break;
        case 'dashbrowser':
            dashbrowser.ready();
            break;
        case 'dashapp':
            dashapp.ready();
            break;
        case 'wapp':
            wapp.ready();
            break;
        case 'browserlogin':
            browserlogin.ready();
            break;
    }
});
var bodyW, bodyH;
window.onload = function () {
    bodyW = $(window).width(), bodyH = $(window).height() + 6;
    switch (PAGE) {
        case 'login':
        case 'webRegister':
            login.loaded();
            $('body').fadeTo(200, 1, function () {

            });
            break;
        case 'dashboard':
            dashboard.loaded();
            $('body').fadeTo(200, 1, function () {
                location.hash = LANG + "??showApps";
            });
            break;
        case 'guests':
            guests.loaded();
            $('body').fadeTo(200, 1, function () {

            });
            break;
        case 'dashbrowser':
            dashbrowser.loaded();
            $('body').fadeTo(200, 1, function () {

            });
            break;
        case 'dashapp':
            dashapp.loaded();
            $('body').fadeTo(200, 1, function () {
                location.hash = LANG + "??showApps";
            });
            break;
        case 'wapp':
            wapp.loaded();
            $('body').fadeTo(200, 1, function () {

            });
            break;
        case 'browserlogin':
            browserlogin.loaded();
            $('body').fadeTo(200, 1, function () {

            });
            break;
    }
    $('.sAddFr').live('click', function (e) {
        e.stopPropagation();
        $(this).addClass('sAddFrY');
        $(this).find('img:eq(1)').fadeTo(200, 1);
        $(this).find('img:eq(0)').fadeTo(200, 0);
    });
    $('.sDelFr').live('click', function (e) {
        e.stopPropagation();
        $(this).addClass('sDelFrY');
        $(this).find('img:eq(1)').fadeTo(200, 1);
        $(this).find('img:eq(0)').fadeTo(200, 0);
    });
    $('.sAddFrY').live('click', function (e) {
        e.stopPropagation();
        me = $(this);
        web.iReq({action: 'iAddFr', id: $(this).parent().parent().attr('id')}, function (dt) {
            window.localStorage.setItem('people', JSON.stringify(dt));
            people = dt;
        });
        me.removeClass().addClass('sDelFr').attr('title', tran('X??a b???n|Remove friend|Add friend|Add friend|Add friend'));
        me.find('img:eq(0)').attr('src', SKIN + '/admin/exFr.png').fadeTo(200, 1, function () {
            me.find('img:eq(1)').attr('src', SKIN + '/admin/exFrY.png').fadeTo(200, 0);
        });
    });
    $('.sDelFrY').live('click', function (e) {
        e.stopPropagation();
        me = $(this);
        web.iReq({action: 'iDelFr', id: $(this).parent().parent().attr('id')}, function (dt) {
            window.localStorage.setItem('people', JSON.stringify(dt));
            people = dt;
        });
        me.removeClass().addClass('sAddFr').attr('title', tran('Th??m b???n|Add friend|Add friend|Add friend|Add friend'));
        me.find('img:eq(1)').attr('src', SKIN + '/admin/addFrY.png').fadeTo(200, 0, function () {
            me.find('img:eq(0)').attr('src', SKIN + '/admin/addFr.png').fadeTo(200, 1);
        });
    });
    $('.aRestores').live('click', function () {
        location.hash = LANG + "??restores";
        $(this).html('<i class="fas fa-window-maximize"></i>').addClass('aMaximizes').removeClass('aRestores');
    });
    $('.aMaximizes').live('click', function () {
        location.hash = LANG + "??maximizes";
        $(this).html('<i class="fas fa-window-restore"></i>').addClass('aRestores').removeClass('aMaximizes');
    });
};
function hashchange() {
    adt = getParams(decodeURIComponent(location.hash));
    switch (adt[1]) {
        case 'allowApps':
            isApp = adt[2];
            $('.aHideControls').fadeIn(360);
            device.execute({
                w_1000_f: function (params) {
                    $('.dSearch').animate({ right: 193 }, 260);
                    $('.dControls').animate({ right: 0 }, 260);
                    $('.aOnWebview').fadeIn(288);
                },
                w_800_1000_f: function (params) {
                    
                },
                w_768_800_f: function (params) {
                    
                },
                w_590_768_f: function (params) {
                    
                },
                w_480_590_f: function (params) {
                    
                },
                w_320_480_f: function (params) {
                    
                }
            });
            location.hash = LANG + "??done";
            break;
        case 'moreControls':
            $('.dControlBrowser').animate({ top: 32 }, 260, function(){
                $('.dDashApp .dFramePng').fadeIn(200, function () {
                    location.hash = LANG + "??showContent";
                })
            });
            $('.dDashApp .dBoardAction > .dFramePng').animate({ height: '301px' }, 260);
            $('.dDashApp .dBoardAction').animate({ top: 63 }, 260);
            break;
        case 'lessControls':
            $('.dDashApp .dFramePng').fadeOut(200, function () {
                $('.dControlBrowser').animate({ top: 2 }, 260, function(){
                    $('.iSearch').blur();
                    location.hash = LANG + "??resizesContent";
                });
            });
            break;
        case 'setInfo':
            if (adt[3] != 'about:blank' && adt[3] != 'https://cazs.cf/guests') {
                if (adt[2] != '')
                {
                    adt[2] = (adt[2]=='WrapApp')? $('.dActApp > a:eq(1)').text(): adt[2];
                    $('.iSearch').attr({'placeholder': decodeURIComponent(adt[2]) + ' @ ' + decodeURIComponent(adt[3]), 'url': decodeURIComponent(adt[3])}).val(decodeURIComponent(adt[2]) + ' @ ' + decodeURIComponent(adt[3]));
                }
                else
                    $('.iSearch').attr('placeholder', $('.iSearch').attr('or')).val('');
                if(adt[2] != 'WrapApp')
                {
                    $('.dShelf .dClose[address="'+Object.keys(tabs)[parseInt(adt[4])-1]+'"]').next().next().text(decodeURIComponent(adt[2]));
                    $('.dShelf .dClose[weburl="'+Object.keys(tabs)[parseInt(adt[4])-1]+'"]').next().next().text(decodeURIComponent(adt[2]));
                    $('.dShelf .dClose[mobileurl="'+Object.keys(tabs)[parseInt(adt[4])-1]+'"]').next().next().text(decodeURIComponent(adt[2]));
                }
                if (adt[5] != '')
                    $('.aHome img').attr('src', 'http://www.google.com/s2/favicons?domain=' + decodeURIComponent(adt[3]));
                else
                    $('.aHome img').attr('src', $('.aHome img').attr('or'));
            }
            location.hash = LANG + "??done";
            break;
        case 'openBrowser':
            $('.dTabs > a').before('<h3 ondrop="dropsTab(this, event); return false;" title=""><img src = "../data/media/images/skin/admin/favicon.ico" alt = "wsup3" /><span>' + adt[2] + '</span><span></span><a class="aCloseTab" title="' + tran('X??a trang|Deletes page') + '"><i class="fas fa-times"></i></a><a class="aNewBrowser" title="' + tran('T??ch r????i|Leaves a new browser') + '"><i class="fas fa-window-restore"></i></a></h3 >');
            $('.hBrowsing').attr('text', $('#iUrlText').val()).removeClass('hBrowsing');
            $('.dTabs h3:last').addClass('hBrowsing');
            $('#iUrlText').val(adt[2]).focus();
            break;
        case 'addWBrowser':
            $('.dActApp').removeClass('dActApp');
            temp = Math.round(Math.random(1, 100) * 100);
            $('.dShelf').append('<div class="dApp dWebApp dActApp dWrapApp">\n\
                    <div class="dNotify">\n\
                        <span class="sScreen"></span>\n\
                        <span class="sNumber">6</span>\n\
                    </div>\n\
                    <div class="dClose dCloseWrap" address="' + decodeURIComponent(adt[2] + temp) + '" type="c" style="display: block;">\n\
                        <span class="sScreen"></span>\n\
                        <span class="fa fa-times"></span>\n\
                    </div>\n\
                    <a title="">\n\
                        <img class="anim" src="../../public/media/images/skin/admin/homes.png" alt="wsup3"/>\n\
                    </a>\n\
                    <a title=""></a>\n\
                </div>');
            tabs[decodeURIComponent(adt[2] + temp)] = Object.keys(tabs).length + 1;
            location.hash = LANG + "??addBrowser??" + tabs[decodeURIComponent(adt[2] + temp)] + "??" + decodeURIComponent(adt[2])+"????"+(($('.aOnWebviewed').length==0)? '1': '2');// + "??icon??" + icon;
            break;
        case 'downloads':
            downloads = JSON.parse((window.localStorage.getItem('whb-downloads') == null) ? '[]' : window.localStorage.getItem('whb-downloads'));
            //$.each(downloads, function (k, v) {
            //$('.dHistories').append('<p><span>' + v.date + ':</span> <a class="aAccessHistory">' + v.domain + '</a></p>');
            //});
            $('.dRSide > div > div').css('display', 'none');
            $('.dBoardDownloads').css('display', 'block');
            $('.dRSide').animate({ right: 0 }, 260);
            location.hash = LANG + "??done";
            break;
        case 'histories':
            $('.dHeader').css('display', 'none');
            $('.dHistories').fadeIn(300);
            histories = JSON.parse((window.localStorage.getItem('whb-histories') == null) ? '[]' : window.localStorage.getItem('whb-histories'));
            $('.dHistories').html('');
            $.each(histories, function (k, v) {
                $('.dHistories').append('<p><span>' + v.date + ':</span> <a class="aAccessHistory">' + v.domain + '</a></p>');
            });
            location.hash = LANG + "??done";
            break;
        case "setFavicoTitle":
            if (adt[2] != '') {
                favorites = JSON.stringify(favorites).replace(favoriting[0].domain + '-title-' + favoriting[0].time, adt[2]);
                $('.aFavorite' + favoriting[0].time).attr('title', adt[2]).find('span:eq(0)').text(adt[2]);
                window.localStorage.setItem('whb-favorites', favorites);
                favorites = JSON.parse(favorites);
            }
            location.hash = LANG + "??done";
            break;
        case "setFavicon":
            if (adt[2] != '') {
                favorites = JSON.stringify(favorites).replace('../data/media/images/skin/admin/favicon.ico?&time=' + favoriting[0].time, adt[2]);
                window.localStorage.setItem('whb-favorites', favorites);
                $('.aFavorite' + favoriting[0].time + ' img').attr('src', adt[2]);
                favorites = JSON.parse(favorites);
                favoriting.splice(0, 1);
                if (favoriting.length > 0)
                    location.hash = LANG + "??addFavorite??" + favoriting[0].domain;
                else
                    location.hash = LANG + "??done";
            }
            break;
        case "setMinimizes":
            $('.aMinimizes').click();
            break;
        case "activated":
            web.iReq({action: 'wpActivated', id: params.id}, function (dt) {

            });
            location.hash = LANG + "??done";
            break;
        case "done":
            console.log(adt);
            break;
        default:
            break;
    }
}
function getParams(prmstr) {
    adt[0] = prmstr;
    if (adt[0] != "" && adt[0].indexOf('#') >= 0) {
        adt = adt[0].split('#');
        if (adt[1].indexOf('??') >= 0)
            adt = adt[1].split('??');
    }
    return adt;
}
$(window).resize(function () {
    bodyW = $(window).width(), bodyH = $(window).height() + 6;
    switch (PAGE) {
        case 'login':
            $('body').css('opacity', '0');
            login.resize();
            break;
        case 'dashboard':
            dashboard.resize();
            break;
        case 'guests':
            $('body').css('opacity', '0');
            guests.resize();
            break;
        case 'dashbrowser':
            $('body').css('opacity', '0');
            dashbrowser.resize();
            break;
        case 'dashapp':
            dashapp.resize();
            break;
        case 'wapp':
            wapp.resize();
            break;
        case 'browserlogin':
            $('body').css('opacity', '0');
            browserlogin.resize();
            break;
    }
    setTimeout(function () {
        $('body').fadeTo(200, 1)
    }, 400);
    //location.hash = LANG + "??done";
});

//Delete image
$('.a_del_img_upload').live('click', function () {
    $('.s_img_upload').next().val('');
    $('.s_img_upload').fadeOut(200, function () {
        $(this).remove();
    }).prev().val('');
});
//End delete image

function createSlug(a) {
    return a = a.toLowerCase(), a = a.replace(/\xe0|\xe1|\u1ea1|\u1ea3|\xe3|\xe2|\u1ea7|\u1ea5|\u1ead|\u1ea9|\u1eab|\u0103|\u1eb1|\u1eaf|\u1eb7|\u1eb3|\u1eb5/g, "a"),
            a = a.replace(/\xe8|\xe9|\u1eb9|\u1ebb|\u1ebd|\xea|\u1ec1|\u1ebf|\u1ec7|\u1ec3|\u1ec5/g, "e"),
            a = a.replace(/\xec|\xed|\u1ecb|\u1ec9|\u0129/g, "i"),
            a = a.replace(/\xf2|\xf3|\u1ecd|\u1ecf|\xf5|\xf4|\u1ed3|\u1ed1|\u1ed9|\u1ed5|\u1ed7|\u01a1|\u1edd|\u1edb|\u1ee3|\u1edf|\u1ee1/g, "o"),
            a = a.replace(/\xf9|\xfa|\u1ee5|\u1ee7|\u0169|\u01b0|\u1eeb|\u1ee9|\u1ef1|\u1eed|\u1eef/g, "u"),
            a = a.replace(/\u1ef3|\xfd|\u1ef5|\u1ef7|\u1ef9/g, "y"),
            a = a.replace(/\u0111/g, "d"),
            a = a.replace(/!|_|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-"), a = a.replace(/-+-/g, "-"),
            a = a.replace(/^\-+|\-+$/g, ""),
            a = a.replace(/&/g, '-and-'),
            a = a.replace(/\-\-+/g, '-'),
            a = a.replace(/^-+/, ''),
            a = a.replace(/-+$/, '');
}

$('#title').live('keyup', function () {
    $('#slug').val(createSlug($(this).val()));
}).live('blur', function () {
    getSlug($('#slug'), $('#slug').val());
});
function getSlug(input, slug) {
    $('body').append('<div class="d_bg_manager"></div>');
    web.iReq({action: 'iGetSlug', slug: slug}, function (dt) {
        if (data != null)
            input.val(data);
        $('.d_bg_manager').remove();
    });
}
$('#slug').live('change', function () {
    if ($(this).val() == '')
        $(this).val(createSlug($('#title').val()));
    else
        $(this).val(createSlug($(this).val()));
    getSlug($(this), $(this).val());
});
//End create slug

var SubmitForm = function (p) {//Submit form object
    var ready = function () {
        params.before();
        event();
    };
    var loaded = function () { };
    var event = function () {
        $(params.idForm).find('select').change(function () {
            $(params.idForm).submit();
        });
        $(params.idForm).find('input').keypress(function (e) {
            if (e.keyCode == 13)
                $(params.idForm).submit();
        });
    };
    var params = {
        idForm: '#idForm',
        BASEURL: (typeof BASEURL == 'undefined') ? '' : BASEURL,
        before: function () { }
    };
    params = $.extend({}, params, p);
    return {
        loaded: loaded,
        ready: ready
    };
};//End submit