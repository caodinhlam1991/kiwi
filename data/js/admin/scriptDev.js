var web, imgs = {}, videos = {}, features = {}, recordedBlobs = [], mediaRecorder, refresh = {}, partial, OpenPhotos, adt = [];
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
        partial.src = BASEURL + "/public/js/admin/dashboard/ready.js";
        document.head.appendChild(partial);
    };
    var loaded = function () {
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
    };
    var loaded = function () {
        $('#fLogin #iEmail').focus();
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
        var login = new Login();
        break;
    case 'dashboard':
        var dashboard = new Dashboard();
        break;
}

$(document).ready(function () {
    $('.aMinimizes').click(function () {
        location.hash = LANG + "¬minimizes";
    });
    $('.aClose').click(function () {
        location.hash = LANG + "¬close";
    });
    web = new Wsup3({});
    switch (PAGE) {
        case 'login':
            login.ready();
            break;
        case 'dashboard':
            dashboard.ready();
            break;
    }
});
var bodyW, bodyH;
window.onload = function () {
    bodyW = $(window).width(), bodyH = $(window).height() + 6;
    switch (PAGE) {
        case 'login':
            login.loaded();
            break;
        case 'dashboard':
            dashboard.loaded();
            break;
    }
    $('.aRestores').live('click', function () {
        location.hash = LANG + "¬restores";
        $(this).html('<i class="fas fa-window-maximize"></i>').addClass('aMaximizes').removeClass('aRestores');
    });
    $('.aMaximizes').live('click', function () {
        location.hash = LANG + "¬maximizes";
        $(this).html('<i class="fas fa-window-restore"></i>').addClass('aRestores').removeClass('aMaximizes');
    });
    $('body').fadeTo(200, 1, function () {
        location.hash = LANG + "¬showApps";
    });
};
function hashchange() {
    adt = getParams(decodeURIComponent(location.hash));
    switch (adt[1]) {
        case 'allowApps':
            TweenMax.to($('.dSearch'), 0.36, { right: 168 });
            TweenMax.to($('.dControls'), 0.36, {
                right: 0, onComplete: function () {
                    $('.dWebApp').fadeIn(330);
                }
            });
            location.hash = LANG + "¬done";
            break;
        case 'setInfo':
            if (decodeURIComponent(adt[2]) != 'about:blank')
                $('#iUrlText').val(decodeURIComponent(adt[2]));
            location.hash = LANG + "¬done";
            break;
        case 'openBrowser':
            $('.dTabs > a').before('<h3 ondrop="dropsTab(this, event); return false;" title=""><img src = "../data/media/images/skin/admin/favicon.ico" alt = "wsup3" /><span>' + adt[2] + '</span><span></span><a class="aCloseTab" title="' + tran('Xóa trang|Deletes page') + '"><i class="fas fa-times"></i></a><a class="aNewBrowser" title="' + tran('Tách rời|Leaves a new browser') + '"><i class="fas fa-window-restore"></i></a></h3 >');
            $('.hBrowsing').attr('text', $('#iUrlText').val()).removeClass('hBrowsing');
            $('.dTabs h3:last').addClass('hBrowsing');
            $('#iUrlText').val(adt[2]).focus();
            break;
        case 'histories':
            $('.dHeader').css('display', 'none');
            $('.dHistories').fadeIn(300);
            histories = JSON.parse((window.localStorage.getItem('whb-histories') == null) ? '[]' : window.localStorage.getItem('whb-histories'));
            $('.dHistories').html('');
            $.each(histories, function (k, v) {
                $('.dHistories').append('<p><span>' + v.date + ':</span> <a class="aAccessHistory">' + v.domain + '</a></p>');
            });
            location.hash = LANG + "¬done";
            break;
        case "setFavicoTitle":
            if (adt[2] != '') {
                favorites = JSON.stringify(favorites).replace(favoriting[0].domain + '-title-' + favoriting[0].time, adt[2]);
                $('.aFavorite' + favoriting[0].time).attr('title', adt[2]).find('span:eq(0)').text(adt[2]);
                window.localStorage.setItem('whb-favorites', favorites);
                favorites = JSON.parse(favorites);
            }
            location.hash = LANG + "¬done";
            break;
        case "setFavicon":
            if (adt[2] != '') {
                favorites = JSON.stringify(favorites).replace('../data/media/images/skin/admin/favicon.ico?&time=' + favoriting[0].time, adt[2]);
                window.localStorage.setItem('whb-favorites', favorites);
                $('.aFavorite' + favoriting[0].time + ' img').attr('src', adt[2]);
                favorites = JSON.parse(favorites);
                favoriting.splice(0, 1);
                if (favoriting.length > 0)
                    location.hash = LANG + "¬addFavorite¬" + favoriting[0].domain;
                else
                    location.hash = LANG + "¬done";
            }
            break;
        default:
            break;
    }
}
function getParams(prmstr) {
    adt[0] = prmstr;
    if (adt[0] != "" && adt[0].indexOf('#') >= 0) {
        adt = adt[0].split('#');
        if (adt[1].indexOf('¬') >= 0)
            adt = adt[1].split('¬');
    }
    return adt;
}
$(window).resize(function () {
    bodyW = $(window).width(), bodyH = $(window).height() + 6;
    $('body').css('opacity', '0');
    switch (PAGE) {
        case 'login':
            login.resize();
            break;
        case 'dashboard':
            dashboard.resize();
            break;
    }
    setTimeout(function () {
        $('body').fadeTo(200, 1)
    }, 400);
    //location.hash = LANG + "¬done";
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
    web.iReq({ action: 'iGetSlug', slug: slug }, function (dt) {
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