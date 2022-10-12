var isContact = { status: 0 }, align, web, backmap, dateObj = new Date(), adt = [], favorites, parentFav = [], favoriting = [];
var Home = function (p) {
    var ready = function () {

    };
    var loaded = function () {

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
    var ready = function () {

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
}
$(document).ready(function () {
    tran();
    align = new Align();
    $('.aMinimize').click(function () {
        location.hash = LANG + "¬minimize";
    });
    $('.aClose').click(function () {
        location.hash = LANG + "¬close";
        //$('body').fadeOut(300, function () {
        //});
    });
    $('.dTabs').mouseup(function () {
        location.hash = LANG + "¬mouseup¬¬¬";
    });
    $('.aAddsTab').click(function () {
        dateObj = new Date();
        location.hash = LANG + "¬addBrowser¬" + dateObj.getDate() + (dateObj.getMonth() + 1) + dateObj.getFullYear() + dateObj.getHours() + dateObj.getMinutes() + dateObj.getSeconds() + "¬about:blank";
        $('#iUrlText').val('').focus();
    });
    $('.dUrlBox input').keydown(function (e) {
        if (e.keyCode == 13) {
            histories = JSON.parse((window.localStorage.getItem('whb-histories') == null) ? '[]' : window.localStorage.getItem('whb-histories'));
            if (($(this).val().split('.').length > 1 && $(this).val().split(' ').length == 1 && $(this).val().split('.')[0] != '.' && $(this).val().split('.')[$(this).val().split('.').length - 1] != '.') || $(this).val().split('localhost').length > 0) {
                histories.unshift({
                    date: dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear() + ' ' + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds(),
                    domain: decodeURIComponent($(this).val())
                });
                while (Object.keys(histories).length > 666)
                    histories.pop();
                window.localStorage.setItem('whb-histories', JSON.stringify(histories));
                location.hash = LANG + "¬browsers¬" + decodeURIComponent($(this).val());
            }
            else {
                histories.unshift({
                    date: dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear() + ' ' + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds(),
                    domain: 'https://www.google.com/search?q=' + decodeURIComponent($(this).val())
                });
                while (Object.keys(histories).length > 666)
                    histories.pop();
                window.localStorage.setItem('whb-histories', JSON.stringify(histories));
                location.hash = LANG + "¬browsers¬" + 'https://www.google.com/search?q=' + decodeURIComponent($(this).val());
            }
        }
    });
    $('.aReloads').click(function () {
        location.hash = LANG + "¬reloadsBrowser¬" + $('.hBrowsing').index();
    });
    $('.aForwards').click(function () {
        location.hash = LANG + "¬forwardsBrowser¬" + $('.hBrowsing').index();
    });
    $('.aBacks').click(function () {
        location.hash = LANG + "¬backsBrowser¬" + $('.hBrowsing').index();
    });
    $('.aApps').toggle(function () {
        location.hash = LANG + "¬browsersApps";
        $('.dApps').fadeIn(300);
        $(this).addClass('aApping');
    }, function () {
        location.hash = LANG + "¬hidesApps";
        $(this).removeClass('aApping');
    });
    $('.sSelectAll').mouseup(function () {
        $('#iUrlText').select();
        $('.sSelectAll').css('zIndex', 1);
    });
    $('.aHistories').toggle(function () {
        location.hash = LANG + "¬historiesBrowser";
        $(this).addClass('aHistoring');
    }, function () {
        location.hash = LANG + "¬hidesHistories";
        $(this).removeClass('aHistoring');
    });
    favorites = JSON.parse((window.localStorage.getItem('whb-favorites') == null) ? '{}' : window.localStorage.getItem('whb-favorites'));
    $.each(favorites, function (k, v) {
        if (v.domain != '#')
            $('.dFavorites > div').prepend('<a draggable="true" time="' + k + '" class="aFavorite" url="' + v.domain + '" title="' + v.title + '"><img src="' + v.icon + '" alt="wsup3" /><span>' + v.title + '</span><span class="sDelFav"><i class="fas fa-times"></i></span></a>');
        else
            $('.dFavorites > div').prepend('<a draggable="true" time="' + k + '" class="aFolder" title = "' + v.title + '"><i class="far fa-folder"></i><span>' + v.title + '</span><span class="sDelFav"><i class="fas fa-times"></i></span></a>');
    });
    $('.aFolderPlus').click(function () {
        dateObj = (new Date()).getTime();
        if (parentFav.length > 0)
            eval("favorites" + parentFav.join('') + "['" + dateObj + "'] = {title: '" + tran('Chuyên mục|Folder|||') + "', domain: '#', childs: {}};");
        else
            favorites[dateObj] = {
                title: tran('Chuyên mục|Folder|||'),
                domain: '#',
                childs: {}
            };
        while (Object.keys(favorites).length > 666)
            delete favorites[Object.keys(favorites)[0]];
        window.localStorage.setItem('whb-favorites', JSON.stringify(favorites));
        $('.aFolderPlus').after('<a draggable="true" time="' + dateObj + '" class="aFolder" title = "' + tran('Chuyên mục|Folder|||') + '"><i class="far fa-folder"></i><span>' + tran('Chuyên mục|Folder|||') + '</span><span class="sDelFav"><i class="fas fa-times"></i></span></a>');
    });
    $('.aBacksFolder').click(function () {
        $('.aFavorite, .aFolder').remove();
        parentFav.pop();
        $.each(((parentFav.length > 0) ? eval("favorites" + parentFav.join('')) : favorites), function (k, v) {
            if (v.domain != '#')
                $('.dFavorites > div').append('<a draggable="true" time="' + k + '" class="aFavorite" url="' + v.domain + '" title="' + v.title + '"><img src="' + ((v.icon != '') ? v.icon : '../data/media/images/skin/admin/favicon.ico') + '" alt="wsup3" /><span>' + v.title + '</span><span class="sDelFav"><i class="fas fa-times"></i></span></a>');
            else
                $('.dFavorites > div').append('<a draggable="true" time="' + k + '" class="aFolder" title = "' + v.title + '"><i class="far fa-folder"></i><span>' + v.title + '</span><span class="sDelFav"><i class="fas fa-times"></i></span></a>');
        });
        if (parentFav.length < 1)
            $('.aBacksFolder').css('display', 'none');
    });
    $('.dTitleBar').mousewheel(function (event, delta) {
        if (delta > 0) {
            TweenMax.to($('.dFavorites > div'), 0.2, {left: '+=166'});
        } else {
            TweenMax.to($('.dFavorites > div'), 0.2, {left: '-=166'});
        }
    });
    switch(PAGE)
    {
        case 'home':
            home.ready();
            break;
        case 'theme':
            theme.ready();
            break;
    }
});
var frameIndex = 1, onScroll = 1;
window.onload = function()
{
    loadFrame();
    $('.aMaximize').live('click', function () {
        location.hash = LANG + "¬formats";
    });
    $('.dTabs h3').live('click', function () {
        location.hash = LANG + "¬showBrowser¬" + $(this).index() + "¬" + $('.hBrowsing').index();
        $('.hBrowsing').attr('text', $('#iUrlText').val()).removeClass('hBrowsing');
        $('#iUrlText').val($(this).attr('text'));
        $(this).addClass('hBrowsing');
    }).live('mouseup', function (e) {
        if (e.which == 2)
            $(this).find('.aCloseTab').click();
    });
    $('.aCloseTab').live('click', function () {
        if ($(this).parent().index() == $('.hBrowsing').index() && $('.dTabs h3').length > 1) {
            if ($('.hBrowsing').index() == $('.dTabs h3:last').index()) {
                location.hash = LANG + "¬closeTab¬" + $(this).parent().index() + "¬" + $('.hBrowsing').prev().index() + "¬" + ($('.dTabs h3').length - 1);
                $(this).parent().prev().addClass('hBrowsing');
            }
            else {
                location.hash = LANG + "¬closeTab¬" + $(this).parent().index() + "¬" + $('.hBrowsing').next().index() + "¬" + ($('.dTabs h3').length - 1);
                $(this).parent().next().addClass('hBrowsing');
            }
        }
        else
            location.hash = LANG + "¬closeTab¬" + $(this).parent().index() + "¬" + $('.hBrowsing').index() + "¬" + ($('.dTabs h3').length - 1);
        if ($('.dTabs h3').length > 1)
            $(this).parent().remove();
        return false;
    });
    $('.aNewBrowser').live('click', function () {
        if ($('.dTabs h3').length > 1) {
            if ($(this).parent().index() == $('.hBrowsing').index() && $('.dTabs h3').length > 1) {
                if ($('.hBrowsing').index() == $('.dTabs h3:last').index()) {
                    location.hash = LANG + "¬newBrowser¬" + $(this).parent().index() + "¬" + $('.hBrowsing').prev().index() + "¬" + ($('.dTabs h3').length - 1);
                    $(this).parent().prev().addClass('hBrowsing');
                }
                else {
                    location.hash = LANG + "¬newBrowser¬" + $(this).parent().index() + "¬" + $('.hBrowsing').next().index() + "¬" + ($('.dTabs h3').length - 1);
                    $(this).parent().next().addClass('hBrowsing');
                }
            }
            else
                location.hash = LANG + "¬newBrowser¬" + $(this).parent().index() + "¬" + $('.hBrowsing').index() + "¬" + ($('.dTabs h3').length - 1);
            $(this).parent().remove();
        }
        return false;
    });
    $('#iUrlText').blur(function () {
        $('.sSelectAll').css('zIndex', 3);
    });
    $('.aAccessHistory').live('click', function () {
        location.hash = LANG + "¬browsers¬" + $(this).text();
    });
    $('.aDownloads').click(function () {
        location.hash = LANG + "¬downloadsBrowser¬" + $('.hBrowsing').index();
    });
    $('.aFavorite').live('mouseup', function (e) {
        switch (e.button) {
            case 0:
                location.hash = LANG + "¬browsers¬" + $(this).attr('url');
                break;
            case 1:
                location.hash = LANG + "¬addBrowser¬" + $(this).attr('url');
                break;
            case 2:
                $(this).toggleClass('aFavContext');
                break;
        }
    });
    $('.aFolder').live('mouseup', function (e) {
        switch (e.button) {
            case 0:
            case 1:
                dateObj = $(this).attr('time');
                $('.aFavorite, .aFolder').remove();
                parentFav.push("['" +dateObj +"'].childs");
                $.each(eval("favorites" + parentFav.join('')), function (k, v) {
                    if (v.domain != '#')
                        $('.dFavorites > div').append('<a draggable="true" time="' + k + '" class="aFavorite" url="' + v.domain + '" title="' + v.title + '"><img src="' + ((v.icon != '') ? v.icon : '../data/media/images/skin/admin/favicon.ico') + '" alt="wsup3" /><span>' + v.title + '</span><span class="sDelFav"><i class="fas fa-times"></i></span></a>');
                    else
                        $('.dFavorites > div').append('<a draggable="true" time="' + k + '" class="aFolder" title = "' + v.title + '"><i class="far fa-folder"></i><span>' + v.title + '</span><span class="sDelFav"><i class="fas fa-times"></i></span></a>');
                });
                $('.aBacksFolder').fadeIn(200);
                break;
            case 2:
                $(this).toggleClass('aFavContext');
                break;
        }
    });
    $('.aFavorite, .aFolder').on('dragstart', function (e) {
        e.originalEvent.dataTransfer.setData("time", $(this).attr('time'));
    });
    $('.aFolder').on('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        favorites[$(this).attr('time')].childs[e.originalEvent.dataTransfer.getData("time")] = favorites[e.originalEvent.dataTransfer.getData("time")];
        $('.aFavorite[time=' + e.originalEvent.dataTransfer.getData("time") + '], .aFolder[time=' + e.originalEvent.dataTransfer.getData("time") + ']').remove();
        delete favorites[e.originalEvent.dataTransfer.getData("time")];
        window.localStorage.setItem('whb-favorites', JSON.stringify(favorites));
    });
    $('.sDelFav').live('mouseup', function () {
        me = $(this);
        ((parentFav.length > 0) ? eval("delete favorites" + parentFav.join('') + "['" + me.parent().attr('time') + "']") : delete favorites[me.parent().attr('time')]);
        window.localStorage.setItem('whb-favorites', JSON.stringify(favorites));
        TweenMax.to(me.parent(), 0.2, {
            width: '0px', onComplete: function () {
                me.parent().remove();
            }
        });
        return false;
    });
    switch(PAGE)
    {
        case 'home':
            home.loaded();
            break;
        case 'theme':
            theme.loaded();
            break;
    }
    hashchange();
    $('.dHeader').css('opacity', 1);
    switch (body_h) {
        case 29:
            $('.dTitleBar').fadeIn(300);
            break;
        case 36:
            $('.dControlsBox').fadeIn(300);
            break;
    }
};
$(window).resize(function () {
    loadFrame();
}).scroll(function (e) {

});
var body_w, body_h;
function loadFrame()
{
    body_w = $(window).width(), body_h = $(window).height();
}
var moveObj = function () {
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
        changeCB: function (params) {
            songs = [];
            songs[0] = {
                cartid: params.controls.frameObj.attr('id'),
                contentid: params.controls.itemObj.eq(params.posIndex1).attr('id'),
                number: 1,
                pos: params.posIndex2 + 1,
                date: params.controls.itemObj.eq(params.posIndex1).attr('date')
            };
            songs[1] = {
                cartid: params.controls.frameObj.attr('id'),
                contentid: params.controls.itemObj.eq(params.posIndex2).attr('id'),
                number: 1,
                pos: params.posIndex1 + 1,
                date: params.controls.itemObj.eq(params.posIndex2).attr('date')
            };
            temp = audios[params.posIndex1];
            audios[params.posIndex1] = audios[params.posIndex2];
            audios[params.posIndex2] = temp;
            web.iReq({ action: 'iEditSongsOfPlaylist', songs: songs }, function (md) {
                $('.dAudioFile').removeClass('dAudioFile').addClass('dAudioItem');
                moveObj();
                hover($('.dAudioItem > a'), { scale: 1.05 }, { scale: 1 }, 0.3);
            });
        }
    })).ready();
};
function dropsAddsTab(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#iUrlText').val(e.dataTransfer.getData("text"));
    dateObj = new Date();
    location.hash = LANG + "¬addBrowser¬" + dateObj.getDate() + (dateObj.getMonth() + 1) + dateObj.getFullYear() + dateObj.getHours() + dateObj.getMinutes() + dateObj.getSeconds() + "¬" + e.dataTransfer.getData("text");
}
function dropsForwards(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#iUrlText').val(e.dataTransfer.getData("text"));
    location.hash = LANG + "¬browsers¬" + e.dataTransfer.getData("text");
}
function dropsUrl(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#iUrlText').val(e.dataTransfer.getData("text"));
}
function dropsBook(e) {
    e.preventDefault();
    dateObj = (new Date()).getTime();
    favoriting.push({
        time: dateObj,
        domain: decodeURIComponent(e.dataTransfer.getData("text"))
    });
    location.hash = LANG + "¬addFavorite¬" + favoriting[0].domain;
    $('.dFavorites > div').append('<a draggable="true" time="' + dateObj + '" class="aFavorite aFavorite' + dateObj + '" url="' + e.dataTransfer.getData("text") + '" title="' + e.dataTransfer.getData("text") + '"><img src="../data/media/images/skin/admin/favicon.ico" alt="W"><span>' + e.dataTransfer.getData("text") + '</span><span class="sDelFav"><i class="fas fa-times"></i></span></a>');
    if (parentFav.length > 0)
        eval("favorites" + parentFav.join('') + "['" + dateObj + "'] = {title: '" + decodeURIComponent(e.dataTransfer.getData("text")) + "-title-" + dateObj + "', domain: '" + decodeURIComponent(e.dataTransfer.getData("text")) + "', icon: '../data/media/images/skin/admin/favicon.ico?&time=" + dateObj + "'};");
    else
        eval("favorites['" + dateObj + "'] = {title: '" + decodeURIComponent(e.dataTransfer.getData("text")) + "-title-" + dateObj + "', domain: '" + decodeURIComponent(e.dataTransfer.getData("text")) + "', icon: '../data/media/images/skin/admin/favicon.ico?&time=" + dateObj + "'};");
    while (Object.keys(favorites).length > 666)
        delete favorites[Object.keys(favorites)[0]];
    window.localStorage.setItem('whb-favorites', JSON.stringify(favorites));
}
$.fn.textWidths = function (tag, cb) {
    tag.text(this.val() || this.attr('placeholder'));
    if (typeof (cb) == 'function')
        cb(this, tag);
    return tag.width();
};
function hashchange() {
    adt = getParams(decodeURIComponent(location.hash));
    switch (adt[1]) {
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
function getInfo(obj) {

}
function getParams(prmstr)
{
    adt[0] = prmstr;
    if (adt[0] != "" && adt[0].indexOf('#') >= 0) {
        adt = adt[0].split('#');
        if (adt[1].indexOf('¬') >= 0)
            adt = adt[1].split('¬');
    }
    return adt;
}