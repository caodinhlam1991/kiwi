backmap = new BackMap();
backmap.add({ page: 'dMainBoard', title: $('title').text() });
$.each(features, function (k, v) {
    if (v.path == 'kieu-gia-tri')
        features.typeValue = v.params['kieu-gia-tri'].opts;
    if (typeof (v.params) != 'undefined' && Object.keys(v.params).length > 0) {
        v.params = web.done(v.params[0], v.params);
        if (v.params.hasOwnProperty('type'))
            if (v.params.type.detail != 'content') {
                features[v.params.type.detail] = web.done(features[v.params.type.detail], { opts: '<option value="choice" tool="choice">' + tran('Chọn|Choice|||') + '</option>' });
                features[v.params.type.detail].opts += '<option value="' + v.path + '" tool="' + v.keyword + '">' + v.title + '</option>';
            }
            else {
                features['post'] = web.done(features['post'], { opts: '<option value="choice" tool="choice">' + tran('Chọn|Choice|||') + '</option>' });
                features['post'].opts += '<option value="' + v.path + '" tool="' + v.keyword + '">' + v.title + '</option>';
                features['term'] = web.done(features['term'], { opts: '<option value="choice" tool="choice">' + tran('Chọn|Choice|||') + '</option>' });
                features['term'].opts += '<option value="' + v.path + '" tool="' + v.keyword + '">' + v.title + '</option>';
                features['page'] = web.done(features['page'], { opts: '<option value="choice" tool="choice">' + tran('Chọn|Choice|||') + '</option>' });
                features['page'].opts += '<option value="' + v.path + '" tool="' + v.keyword + '">' + v.title + '</option>';
            }
        if (typeof (v.params['da-gia-tri']) != 'undefined') {
            features[v.path] = web.done(features[v.path], {});
            features[v.path]['da-gia-tri'] = v.params['da-gia-tri'].detail;
        }
        if (typeof (v.params['dac-diem-cha']) != 'undefined') {
            features[v.path] = web.done(features[v.path], {});
            features[v.path]['dac-diem-cha'] = v.params['dac-diem-cha'].detail;
        }
    }
});
shortcut.add("F12", function(){
    pt = prompt(tran('Mời bạn nhập mã lệnh|Enter command prompt|||'));
    switch(pt)
    {
        default:
            window.open(BASEURL);
            break;
    }
}, {'type':'keydown', 'propagate':true, 'target':document});
shortcut.add("F11", function(){
    launchIntoFullscreen(document.documentElement);
}, {
    'type':'keyup', 'propagate':true, 'target':document
});
shortcut.add("esc", function(){
    launchIntoFullscreen(document.documentElement);
}, {
    'type':'keyup', 'propagate':true, 'target':document
});
//        window.oncontextmenu=function(e){
//            return false;
//        };
$('.dProduct p span:nth-child(2) img:not(.iOnLang)').live('click', function (e) {
    e.stopPropagation();
    me = $(this);
    $('.dBgAction').css('display', 'block');
    web.iReq({action: 'iChangeLive', id: $(this).parent().parent().parent().attr('id'), board: backmap.see().page, live: $(this).attr('change') === 'true'}, function(dt){
        me.parent().find('img').fadeToggle(200);
        $('.dBgAction').css('display', 'none');
    });
});
$('.iOnLang').live('click', function(e){
    e.stopPropagation();
    me = $(this);
    $('.dBgAction').css('display', 'block');
    web.iReq({action: 'iOnLanguage', id: $(this).attr('lang'), active: $(this).attr('change') === 'true'}, function(dt){
        me.parent().find('img').fadeToggle(200);
        $('.dBgAction').css('display', 'none');
    });
});
$('.sEditProduct').live('click', function(e){
    e.stopPropagation();
    web.iReq({action: 'iGetContent', path: $(this).parent().parent().attr('path')}, function(c){
        $.each(c, function(key, value){
            $('#iProTitle'+value.flag).val(value.title);
            $('#iProExcept'+value.flag).val(value.except);
        });
        $('#fAddProduct #iPosition').val(c[0].position);
        $('#iProPath').val(c[0].path);
        $('#iProPath').attr('placeholder', c[0].path);
        $('#iProKeyword').val(c[0].keyword);
        $('#iProDate').val(c[0].date);
        $('#fAddProduct .dPhoto, #fAddProduct .dFeatures').html('');
        num = 0;
        $.each(c, function(key, value){
            if(c[key].imgs!=null)
                $.each(c[key].imgs, function(k, v){
                    $('#fAddProduct .dTabsLanguage'+value.flag+' .dPhoto').append('<p><img src="'+v+'" alt="wsup3"><a><img src="'+SKIN+'/admin/close.jpg" alt="wsup3"></a></p>');
                });
            if(c[key].params!=null)
                $.each(value.params, function(key, val){
                    num++;
                    num = getFeatures('#fAddProduct', value, key, val, num);
                });
        });
        web.callEnd(function(){
            $('.aFeature').attr('num', num);
            temp = c;
            $('.dAppAddProduct').trigger('click');
        });
    });
});
$('.sEditCategory').live('click', function(e){
    e.stopPropagation();
    web.iReq({action: 'iGetContent', path: $(this).parent().parent().attr('path')}, function(c){
        $('.dCat').css('display', 'block');
        $.each(c, function(key, value){
            $('#iCatTitle'+value.flag).val(value.title);
            $('#iCatExcept'+value.flag).val(value.except);
        });
        $('#fAddCategory #iPosition').val(c[0].position);
        $('#iCatPath').val(c[0].path);
        $('#iCatPath').attr('placeholder', c[0].path);
        $('#iCatKeyword').val(c[0].keyword);
        $('#iCatDate').val(c[0].date);
        $('#fAddCategory .dPhoto, #fAddCategory .dFeatures').html('');
        num = 0;
        $.each(c, function(key, value){
            if(c[key].imgs!=null)
                $.each(c[key].imgs, function(k, v){
                    $('#fAddCategory .dTabsLanguage'+value.flag+' .dPhoto').append('<p><img src="'+v+'" alt="wsup3"><a><img src="'+SKIN+'/admin/close.jpg" alt="wsup3"></a></p>');
                });
            if(c[key].params!=null)
                $.each(value.params, function(key, val){
                    num++;
                    num = getFeatures('#fAddCategory', value, key, val, num);
                });
        });
        web.callEnd(function(){
            $('.aFeature').attr('num', num);
            temp = c;
            $('.dAppAddCategory').trigger('click');
        });
    });
});
$('.sEditPage').live('click', function(e){
    e.stopPropagation();
    web.iReq({action: 'iGetContent', path: $(this).parent().parent().attr('path')}, function(c){
        $.each(c, function(key, value){
            $('#iPgTitle'+value.flag).val(value.title);
            $('#iPgExcept'+value.flag).val(value.except);
        });
        $('#iPgPath').val(c[0].path);
        $('#iPgPath').attr('placeholder', c[0].path);
        $('#iPgKeyword').val(c[0].keyword);
        $('#iPgDate').val(c[0].date);
        $('#fAddPage #iPosition').val(c[0].position);
        $('#fAddPage .dPhoto, #fAddPage .dFeatures').html('');
        num = -1;
        $.each(c, function(key, value){
            if(c[key].imgs!=null)
                $.each(c[key].imgs, function(k, v){
                    $('#fAddPage .dTabsLanguage'+value.flag+' .dPhoto').append('<p><img src="'+v+'" alt="wsup3"><a><img src="'+SKIN+'/admin/close.jpg" alt="wsup3"></a></p>');
                });
            if(c[key].params!=null)
                $.each(value.params, function(key, val){
                    num++;
                    num = getFeatures('#fAddPage', value, key, val, num);
                });
        });
        web.callEnd(function(){
            $('.aFeature').attr('num', num);
            temp = c;
            $('.dAppAddPage').trigger('click');
        });
    });
});
$('.sEditFeature').live('click', function(e){
    e.stopPropagation();
    web.iReq({action: 'iGetContent', path: $(this).parent().parent().attr('path')}, function(c){
        $.each(c, function(key, value){
            $('#iFeaName'+value.flag).val(value.title);
            $('#iFeaExcept'+value.flag).val(value.except);
        });
        $('#iFeaKey').val(c[0].path);
        $('#iFeaKey').attr('placeholder', c[0].path);
        $('#fAddFeature #iFeaPos').val(c[0].position);
        $('#fAddFeature .dPhoto, #fAddFeature .dFeatures').html('');
        num = 0;
        $.each(c, function(key, value){
            if(c[key].imgs!=null)
                $.each(c[key].imgs, function(k, v){
                    $('#fAddFeature .dTabsLanguage'+value.flag+' .dPhoto').append('<p><img src="'+v+'" alt="wsup3"><a><img src="'+SKIN+'/admin/close.jpg" alt="wsup3"></a></p>');
                });
            if(c[key].params!=null)
                $.each(value.params, function(key, val){
                    num++;
                    num = getFeatures('#fAddFeature', value, key, val, num);
                });
        });
        web.callEnd(function(){
            $('.aFeature').attr('num', num);
            temp = c;
            $('.dAppAddFeature').trigger('click');
        });
    });
});
$('.sEditMenu').live('click', function(e){
    e.stopPropagation();
    web.iReq({action: 'iGetContent', path: $(this).parent().parent().attr('path')}, function(c){
        $.each(c, function(key, value){
            $('#iMnuName'+value.flag).val(value.title);
            $('#iMnuExcept'+value.flag).val(value.except);
        });
        $('#iMnuKey').val(c[0].path);
        $('#fAddMenu #iMnuPos').val(c[0].position);
        $('#fAddMenu .dPhoto, #fAddMenu .dFeatures').html('');
        num = 0;
        $.each(c, function(key, value){
            if(c[key].imgs!=null)
                $.each(c[key].imgs, function(k, v){
                    $('#fAddMenu .dTabsLanguage'+value.flag+' .dPhoto').append('<p><img src="'+v+'" alt="wsup3"><a><img src="'+SKIN+'/admin/close.jpg" alt="wsup3"></a></p>');
                });
            if(c[key].params!=null)
                $.each(value.params, function(key, val){
                    num++;
                    num = getFeatures('#fAddMenu', value, key, val, num);
                });
        });
        web.callEnd(function(){
            $('.aFeature').attr('num', num);
            temp = c;
            $('.dAppAddMenu').trigger('click');
        });
    });
});
$('.sEditLang').live('click', function(e){
    e.stopPropagation();
    web.iReq({action: 'iGetLanguage', id: $(this).prev().attr('lang')}, function(c){
        $.each(c, function(ky, val){
            $('#iName'+val.flag).val(val.name);
        });
        $('#iId').val(c[0].id);
        $('#fAddLanguage #iPosition').val(c[0].position);
        $('#fAddLanguage .dPhoto, #fAddLanguage .dFeatures').html('');
        if(c[0].image!=null)
            $('#fAddLanguage .dPhoto').append('<p><img src="'+c[0].image+'" alt="wsup3"><a><img src="'+SKIN+'/admin/close.jpg" alt="wsup3"></a></p>');
        num = 0;
        $.each(c, function (key, value) {
            //if(c[key].image!=null)
            //    $.each(c[key].image, function (k, v) {
            //        $('#fAddLanguage .dTabsLanguage'+value.flag+' .dPhoto').append('<p><img src="'+v+'" alt="wsup3"><a><img src="'+SKIN+'/admin/close.jpg" alt="wsup3"></a></p>');
            //    });
            if(c[key].params!=null)
                $.each(value.params, function(key, val){
                    num++;
                    num = getFeatures('#fAddLanguage', value, key, val, num);
                });
        });
        web.callEnd(function(){
            $('.aFeature').attr('num', num);
            temp = c;
            $('.dAppAddLanguage').trigger('click');
        });
    });
});
$('.sEditUser').live('click', function(e){
    e.stopPropagation();
    web.iReq({action: 'iGetUser', _id: $(this).parent().parent().attr('id')}, function(c){
        $('#fAddUser #iDisplayname').val(c.displayname);
        $('#fAddUser #iFullname').val(c.fullname);
        $('#fAddUser .iSex').val(String(c.gender));
        $('#fAddUser .iSex option').each(function(i){
            if($(this).val()==String(c.gender))
                $('#fAddUser .iSex .selectBox-label').text($(this).text());
        });
        $('#fAddUser #iAddress').val(c.address);
        $('#fAddUser #iPhone').val(c.phone);
        $('#fAddUser #iEmail').val(c.email);
        $('#fAddUser .iGroup').val(c.group);
        $('#fAddUser select.iLive').val(c.active);
        $('#fAddUser select.iLive option').each(function(i){
            if($(this).val()==String(c.active))
                $('#fAddUser .iLive .selectBox-label').text($(this).text());
        });
        $('#fAddUser .iGroup option').each(function(i){
            if($(this).val()==c.group)
                $('#fAddUser .iGroup .selectBox-label').text($(this).text());
        });
        $('#fAddUser .dPhoto, #fAddUser .dFeatures').html('');
        if(c.hasOwnProperty('image') && c.image != '')
            $('#fAddUser .dPhoto').append('<p><img src="'+c.image+'" alt="wsup3"><a><img src="'+SKIN+'/admin/close.jpg" alt="wsup3"></a></p>');
        num = 0;
        if (c.hasOwnProperty('parameters') && c.parameters.length > 0 && c.parameters[0] != null)
            $.each(c.parameters, function(k, v){
                num++;
                num = getFeatures('#fAddUser', null, k, v, num);
            });
        web.callEnd(function(){
            $('.aFeature').attr('num', num);
            temp = c;
            $('.dAppAddUser').trigger('click');
        });
    });
});
$('.sEditCustomer').live('click', function(e){
    e.stopPropagation();
    web.iReq({ action: 'iGetUser', _id: $(this).parent().parent().attr('id') }, function (c) {
        $('#fAddCustomer #iFullname').val(c.fullname);
        $('#fAddCustomer .iGender').val(String(c.gender));
        $('#fAddCustomer #iAddress').val(c.address);
        $('#fAddCustomer #iPhone').val(c.phone);
        $('#fAddCustomer #iEmail').val(c.email);
        $('#fAddCustomer select.iLive').val(String(c.active));
        $('#fAddCustomer .dPhoto, #fAddCustomer .dFeatures').html('');
        if(c.hasOwnProperty('image') && c.image != '')
            $('#fAddCustomer .dPhoto').append('<p><img src="'+c.image+'" alt="wsup3"><a><img src="'+SKIN+'/admin/close.jpg" alt="wsup3"></a></p>');
        num = 0;
        if(c.parameters.length > 0 && c.parameters[0] != null)
            $.each(c.parameters, function(k, v){
                num++;
                num = getFeatures('#fAddCustomer', null, k, v, num);
            });
        web.callEnd(function(){
            $('.aFeature').attr('num', num);
            temp = c;
            $('.dAppAddCustomer').trigger('click');
        });
    });
});
$('.dProduct > a').live('click', function(e){
    e.stopPropagation();
});
$('.sTrash').live('click', function(e){
    e.stopPropagation();
    $(this).addClass('dDel');
    $(this).find('img:eq(1)').fadeTo(200, 1);
    $(this).find('img:eq(0)').fadeTo(200, 0);
});
$('.dDel').live('click', function(e){
    e.stopPropagation();
    me = $(this);
    web.iReq({action: 'iDelContent', path: $(this).parent().parent().attr('path')}, function(){
        me.parent().parent().parent().fadeOut(300, function(){
            $(this).remove();
            $('.fCats div').remove();
        });
    });
});
$('.sAddFr').live('click', function(e){
    e.stopPropagation();
    $(this).addClass('sAddFrY');
    $(this).find('img:eq(1)').fadeTo(200, 1);
    $(this).find('img:eq(0)').fadeTo(200, 0);
});
$('.sDelFr').live('click', function(e){
    e.stopPropagation();
    $(this).addClass('sDelFrY');
    $(this).find('img:eq(1)').fadeTo(200, 1);
    $(this).find('img:eq(0)').fadeTo(200, 0);
});
$('.sAddFrY').live('click', function(e){
    e.stopPropagation();
    me = $(this);
    web.iReq({action: 'iAddFr', id: $(this).parent().parent().attr('id')}, function(dt){
        window.localStorage.setItem('people', JSON.stringify(dt));
        people = dt;
    });
    me.removeClass().addClass('sDelFr').attr('title', tran('Xóa bạn|Remove friend|Add friend|Add friend|Add friend'));
    me.find('img:eq(0)').attr('src', SKIN+'/admin/exFr.png').fadeTo(200, 1, function(){
        me.find('img:eq(1)').attr('src', SKIN+'/admin/exFrY.png').fadeTo(200, 0);
    });
});
$('.sDelFrY').live('click', function(e){
    e.stopPropagation();
    me = $(this);
    web.iReq({action: 'iDelFr', id: $(this).parent().parent().attr('id')}, function(dt){
        window.localStorage.setItem('people', JSON.stringify(dt));
        people = dt;
    });
    me.removeClass().addClass('sAddFr').attr('title', tran('Thêm bạn|Add friend|Add friend|Add friend|Add friend'));
    me.find('img:eq(1)').attr('src', SKIN+'/admin/addFrY.png').fadeTo(200, 0, function(){
        me.find('img:eq(0)').attr('src', SKIN+'/admin/addFr.png').fadeTo(200, 1);
    });
});
$('.sTrashUser').live('click', function(e){
    e.stopPropagation();
    $(this).addClass('dDelUser');
    $(this).find('img:eq(1)').fadeTo(200, 1);
    $(this).find('img:eq(0)').fadeTo(200, 0);
});
$('.dDelUser').live('click', function(e){
    e.stopPropagation();
    me = $(this);
    web.iReq({action: 'iDelUser', _id: $(this).parent().parent().attr('id')}, function(){
        me.parent().parent().parent().fadeOut(300, function(){
            $(this).remove();
        });
    });
});
$('.sTrashOrder').live('click', function(e){
    e.stopPropagation();
    $(this).addClass('dDelOrder');
    $(this).find('img:eq(1)').fadeTo(200, 1);
    $(this).find('img:eq(0)').fadeTo(200, 0);
});
$('.sTrashProduct').live('click', function(e){
    e.stopPropagation();
    $(this).addClass('dDelProduct');
    $(this).find('img:eq(1)').fadeTo(200, 1);
    $(this).find('img:eq(0)').fadeTo(200, 0);
});
$('.sTrashContact').live('click', function(e){
    e.stopPropagation();
    $(this).addClass('dDelContact');
    $(this).find('img:eq(1)').fadeTo(200, 1);
    $(this).find('img:eq(0)').fadeTo(200, 0);
});
$('.dDelOrder').live('click', function(e){
    e.stopPropagation();
    me = $(this);
    web.iReq({action: 'iDelOrder', _id: $(this).parent().parent().attr('id')}, function(){
        me.parent().parent().parent().fadeOut(300, function(){
            $(this).remove();
        });
    });
});
$('.dDelProduct').live('click', function(e){
    e.stopPropagation();
    me = $(this);
    if(me.parent().parent().parent().parent().find('> div').length>2)
        web.iReq({action: 'iDelProduct', _id: $(this).parent().parent().attr('id')}, function(){
            me.parent().parent().parent().fadeOut(300, function(){
                $(this).remove();
            });
        });
    else
        web.iReq({action: 'iDelOrder', _id: $(this).parent().parent().parent().parent().find('> .dProduct').attr('id')}, function(){
            me.parent().parent().parent().parent().fadeOut(300, function(){
                $(this).remove();
            });
        });
});
$('.dDelContact').live('click', function(e){
    e.stopPropagation();
    me = $(this);
    web.iReq({action: 'iDelContact', _id: $(this).parent().parent().attr('id')}, function(){
        me.parent().parent().parent().fadeOut(300, function(){
            $(this).remove();
        });
    });
});
$('.dProduct').live('click', function(){
    $(this).addClass('dProductMore');
    $(this).find('.dInfo').animate({ paddingRight: '50px' }, 200);
    $(this).find('.dOption').animate({ right: 0 }, 300);
});
$('.dProductMore').live('click', function(){
    $(this).removeClass('dProductMore');
    $(this).find('.dInfo').animate({ paddingRight: '0px' }, 200);
    $(this).find('.dOption').animate({ right: '-50px' }, 300);
    $(this).find('.dDel img:eq(0), .dDelUser img:eq(0), .sAddFrY img:eq(0), .sDelFrY img:eq(0)').fadeTo(200, 1, function(){
        $(this).parent().removeClass('dDel dDelUser sAddFrY sDelFrY').find('img:eq(1)').fadeTo(200, 0);
    });
});
$('.dReply').live('click', function (e) {
    e.stopPropagation();
    me = $(this);
    $('.iChatRers').val($(this).find('.iTalkRers').val());
    $('.dTalkDetail > div').html('');
    changePage($('.dBoardTalk'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardTalk', action: {
                    fn: function () {
                        if ($('.dContentWriter').length < 1)
                            $('.dWriterControl').append('<div class="dContentWriter" contenteditable="true"></div>');
                        $('.aSendMess').fadeIn(300);

                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dCategory .dProduct').live('click', function(){
    if($('#fCategories').width()-$(this).width()<$(this).position().left)
        $('#fCategories').animate({ scrollLeft: '+='+($(this).position().left-($('#fCategories').width()-$(this).width())) }, 300);
    else
    if($(this).position().left<0)
        $('#fCategories').animate({ scrollLeft: '+='+$(this).position().left }, 300);
});
$('.sSetDefault').live('click', function(){
    web.iReq({ action: 'iChangeLanguage', flag: $(this).attr('lang') }, function (dt) {
        $('.sDefault').addClass('sInDefault').removeClass('sDefault');
        $('.sInSetDefault').addClass('sSetDefault').removeClass('sInSetDefault');
        $(this).addClass('sInSetDefault').removeClass('sSetDefault');
        $(this).parent().next().find('.sInDefault').addClass('sDefault').removeClass('sInDefault');
        people = dt;
        window.localStorage.setItem('people', JSON.stringify(people));
        window.location.assign(BASEURL + '/admin/' + dt.flag+'@'+dt._id);
    });
});
$('.sFeatureValue').live('change', function(){
    if($(this).val()=='select')
    {
        $(this).parent().after('<div class="dLine">' +
            '<label for="sFeatureOpts'+$(this).parent().parent().parent().attr('num')+'">Options code:&nbsp;</label>' +
            '<input type="text" value="" id="sFeatureOpts'+$(this).parent().parent().parent().attr('num')+'" class="sFeatureOpts sFeatureOpts'+$(this).parent().parent().parent().attr('num')+'"/>' +
            '</div>');
        $('.sFeatureOpts'+$(this).parent().parent().parent().attr('num')).css('width', $('.sFeatureOpts'+$(this).parent().parent().parent().attr('num')).parent().width()-5-$('[for=sFeatureOpts'+$(this).parent().parent().parent().attr('num')+']').width()+'px');
    }
    else
        $('.sFeatureOpts'+$(this).parent().parent().parent().attr('num')).parent().remove();
});
$('.sFeatureName').live('change', function(){
    $(this).parent().parent().find('.dValue').remove();
    $(this).parent().parent().find('.aValue').remove();
    me = $(this);
    switch($('option[value='+$(this).val()+']').attr('tool'))
    {
        case 'editor':
            $('.dTypeControl'+me.attr('num')).html(((typeof(features[me.val()])=='undefined')? '': (features[me.val()]['dac-diem-cha']=='show')? '<div class="dLine"><label for="sFeatureParent'+me.attr('num')+'">'+tran('Đặc điểm cha|Feature parent|||')+':&nbsp;</label><select id="sFeatureParent'+me.attr('num')+'" class="sFeatureParent sFeatureParent'+me.attr('num')+'">'+features[me.parent().parent().parent().parent().find('.aFeature').attr('type')].opts+'</select></div>': '') +
                '<textarea name="featureDetail'+me.attr('num')+'" class="tFeatureDetail tFeatureDetail'+me.attr('num')+'" style="opacity: 0"></textarea>');
            if(typeof(features[me.val()])!='undefined' && features[me.val()]['da-gia-tri']=='show')
                $('.dTypeControl'+me.attr('num')).after('<a num="'+me.attr('num')+'" key="'+me.val()+'" class="aValue">'+tran('Thêm nội dung|Add content||')+'</a>');
            ck = CKEDITOR.replace('featureDetail'+me.attr('num'));
            addBtnCke(ck);
            $('.fFeature'+me.attr('num')).attr('tool', 'editor');
            $('.sFeatureParent'+me.attr('num')).css('width', $('.sFeatureParent'+me.attr('num')).parent().width()-5-$('[for=sFeatureParent'+me.attr('num')+']').width()+'px');
            $('.sFeatureParent'+me.attr('num')).selectBox();
            break;
        case 'text':
            $('.dTypeControl'+me.attr('num')).html(((typeof(features[me.val()])=='undefined')? '': (features[me.val()]['dac-diem-cha']=='show')? '<div class="dLine"><label for="sFeatureParent'+me.attr('num')+'">'+tran('Đặc điểm cha|Feature parent|||')+':&nbsp;</label><select id="sFeatureParent'+me.attr('num')+'" class="sFeatureParent sFeatureParent'+me.attr('num')+'">'+features[me.parent().parent().parent().parent().find('.aFeature').attr('type')].opts+'</select></div>': '') +
                '<div class="dLine">' +
                '<label for="iFeatureValue'+me.attr('num')+'">'+tran('Giá trị|Value|||')+':&nbsp;</label>' +
                '<input type="text" id="iFeatureValue'+me.attr('num')+'" class="iFeatureValue iFeatureValue'+me.attr('num')+'"/>' +
                '</div>');
            if(typeof(features[me.val()])!='undefined' && features[me.val()]['da-gia-tri']=='show')
                $('.dTypeControl'+me.attr('num')).after('<a num="'+me.attr('num')+'" key="'+me.val()+'" class="aValue">'+tran('Thêm giá trị|Add value||')+'</a>');
            $('.fFeature'+me.attr('num')).attr('tool', 'text');
            $('.sFeatureParent'+me.attr('num')).css('width', $('.sFeatureParent'+me.attr('num')).parent().width()-5-$('[for=sFeatureParent'+me.attr('num')+']').width()+'px');
            $('.sFeatureParent'+me.attr('num')).selectBox();
            $('.iFeatureValue'+me.attr('num')).css('width', $('.iFeatureValue'+me.attr('num')).parent().width()-5-$('[for=iFeatureValue'+me.attr('num')+']').width()+'px');
            break;
        case 'number':
            $('.dTypeControl'+me.attr('num')).html(((typeof(features[me.val()])=='undefined')? '': (features[me.val()]['dac-diem-cha']=='show')? '<div class="dLine"><label for="sFeatureParent'+me.attr('num')+'">'+tran('Đặc điểm cha|Feature parent|||')+':&nbsp;</label><select id="sFeatureParent'+me.attr('num')+'" class="sFeatureParent sFeatureParent'+me.attr('num')+'">'+features[me.parent().parent().parent().parent().find('.aFeature').attr('type')].opts+'</select></div>': '') +
                '<div class="dLine">' +
                '<label for="iFeatureValue'+me.attr('num')+'">'+tran('Giá trị|Value|||')+':&nbsp;</label>' +
                '<input type="number" id="iFeatureValue'+me.attr('num')+'" class="iFeatureValue iFeatureValue'+me.attr('num')+'"/>' +
                '</div>');
            if(typeof(features[me.val()])!='undefined' && features[me.val()]['da-gia-tri']=='show')
                $('.dTypeControl'+me.attr('num')).after('<a num="'+me.attr('num')+'" key="'+me.val()+'" class="aValue">'+tran('Thêm giá trị|Add value||')+'</a>');
            $('.fFeature'+me.attr('num')).attr('tool', 'number');
            $('.sFeatureParent'+me.attr('num')).css('width', $('.sFeatureParent'+me.attr('num')).parent().width()-5-$('[for=sFeatureParent'+me.attr('num')+']').width()+'px');
            $('.sFeatureParent'+me.attr('num')).selectBox();
            $('.iFeatureValue'+me.attr('num')).css('width', $('.iFeatureValue'+me.attr('num')).parent().width()-5-$('[for=iFeatureValue'+me.attr('num')+']').width()+'px');
            break;
        case 'select':
            $.each(features, function(k, v){
                if(v.path == $('.sFeatureName'+me.attr('num')).val())
                    temp2 = v;
            });
            $('.dTypeControl'+me.attr('num')).html(((typeof(features[me.val()])=='undefined')? '': (features[me.val()]['dac-diem-cha']=='show')? '<div class="dLine"><label for="sFeatureParent'+me.attr('num')+'">'+tran('Đặc điểm cha|Feature parent|||')+':&nbsp;</label><select id="sFeatureParent'+me.attr('num')+'" class="sFeatureParent sFeatureParent'+me.attr('num')+'">'+features[me.parent().parent().parent().parent().find('.aFeature').attr('type')].opts+'</select></div>': '') +
                '<div class="dLine">' +
                '<label for="sFeatureValue'+me.attr('num')+'">'+tran('Giá trị|Value|||')+':&nbsp;</label>' +
                '<select id="sFeatureValue'+me.attr('num')+'" class="sFeatureValue sFeatureValue'+me.attr('num')+'">'+((typeof(temp2.params['kieu-gia-tri'])!='undefined')? temp2.params['kieu-gia-tri'].opts: temp2.params[0]['kieu-gia-tri'].opts)+'</select>' +
                '</div>');
            if(typeof(features[me.val()])!='undefined' && features[me.val()]['da-gia-tri']=='show')
                $('.dTypeControl'+me.attr('num')).after('<a num="'+me.attr('num')+'" key="'+me.val()+'" class="aValue">'+tran('Thêm nội dung|Add content||')+'</a>');
            $('.fFeature'+me.attr('num')).attr('tool', 'select');
            $('.sFeatureParent'+me.attr('num')).css('width', $('.sFeatureParent'+me.attr('num')).parent().width()-5-$('[for=sFeatureParent'+me.attr('num')+']').width()+'px');
            $('.sFeatureParent'+me.attr('num')).selectBox();
            $('.sFeatureValue'+me.attr('num')).css('width', $('.sFeatureValue'+me.attr('num')).parent().width()-5-$('[for=sFeatureValue'+me.attr('num')+']').width()+'px');
            $('.sFeatureValue'+me.attr('num')).selectBox();
            break;
        case 'image':
            $('.dTypeControl'+me.attr('num')).html(((typeof(features[me.val()])=='undefined')? '': (features[me.val()]['dac-diem-cha']=='show')? '<div class="dLine"><label for="sFeatureParent'+me.attr('num')+'">'+tran('Đặc điểm cha|Feature parent|||')+':&nbsp;</label><select id="sFeatureParent'+me.attr('num')+'" class="sFeatureParent sFeatureParent'+me.attr('num')+'">'+features[me.parent().parent().parent().parent().find('.aFeature').attr('type')].opts+'</select></div>': '') +
                '<div class="dPhoto"></div><a class="aPhoto">'+$('.aPhoto').html()+'</a>');
            $('.fFeature'+me.attr('num')).attr('tool', 'image');
            $('.sFeatureParent'+me.attr('num')).css('width', $('.sFeatureParent'+me.attr('num')).parent().width()-5-$('[for=sFeatureParent'+me.attr('num')+']').width()+'px');
            $('.sFeatureParent'+me.attr('num')).selectBox();
            break;
        case 'date':
            $('.dTypeControl'+me.attr('num')).html(((typeof(features[me.val()])=='undefined')? '': (features[me.val()]['dac-diem-cha']=='show')? '<div class="dLine"><label for="sFeatureParent'+me.attr('num')+'">'+tran('Đặc điểm cha|Feature parent|||')+':&nbsp;</label><select id="sFeatureParent'+me.attr('num')+'" class="sFeatureParent sFeatureParent'+me.attr('num')+'">'+features[me.parent().parent().parent().parent().find('.aFeature').attr('type')].opts+'</select></div>': '') +
                '<div class="dLine">' +
                '<label for="iFeatureValue'+me.attr('num')+'">'+tran('Giá trị|Value|||')+':&nbsp;</label>' +
                '<input type="date" id="iFeatureValue'+me.attr('num')+'" class="iFeatureValue iFeatureValue'+me.attr('num')+'"/>' +
                '</div>');
            $('.fFeature'+me.attr('num')).attr('tool', 'date');
            $('.sFeatureParent'+me.attr('num')).css('width', $('.sFeatureParent'+me.attr('num')).parent().width()-5-$('[for=sFeatureParent'+me.attr('num')+']').width()+'px');
            $('.sFeatureParent'+me.attr('num')).selectBox();
            $('.iFeatureValue'+me.attr('num')).css('width', $('.iFeatureValue'+me.attr('num')).parent().width()-5-$('[for=iFeatureValue'+me.attr('num')+']').width()+'px');
            break;
        case 'menu':
            web.iReq({action: 'iGetMenu', menu: me.val(), _id: ((typeof(temp)=='undefined')? null: temp[0]._id)}, function(dt){
                optemp = '<option value="false">Không</option>';
                if(typeof(dt) != 'undefined' && dt != null && dt.length>0)
                    $.each(dt, function(k, v){
                        optemp+='<option value="'+ v._id+'">'+ v.title+'</option>'
                    });
                $('.dTypeControl'+me.attr('num')).html(((typeof(features[me.val()])=='undefined')? '': (features[me.val()]['dac-diem-cha']=='show')? '<div class="dLine"><label for="sFeatureParent'+me.attr('num')+'">'+tran('Đặc điểm cha|Feature parent|||')+':&nbsp;</label><select id="sFeatureParent'+me.attr('num')+'" class="sFeatureParent sFeatureParent'+me.attr('num')+'">'+features[me.parent().parent().parent().parent().find('.aFeature').attr('type')].opts+'</select></div>': '') +
                    '<div class="dLine"><label for="sFeatureValue'+me.attr('num')+'">'+tran('Trình đơn cha|Parent menu|||')+':&nbsp;</label>' +
                    '<select id="sFeatureValue'+me.attr('num')+'" class="sFeatureValue sFeatureValue'+me.attr('num')+'">'+optemp+'</select></div>' +
                    '<div class="dLine"><label for="iFeatureValue'+me.attr('num')+'">'+tran('Vị trí|Position|||')+':&nbsp;</label>' +
                    '<input type="number" min="1" id="iFeatureValue'+me.attr('num')+'" class="iFeatureValue iFeatureValue'+me.attr('num')+'"/>' +
                    '</div>');
                if(typeof(features[me.val()])!='undefined' && features[me.val()]['da-gia-tri']=='show')
                    $('.dTypeControl'+me.attr('num')).after('<a num="'+me.attr('num')+'" key="'+me.val()+'" class="aValue">'+tran('Thêm nội dung|Add content||')+'</a>');
                $('.fFeature'+me.attr('num')).attr('tool', 'menu');
                $('.iFeatureValue'+me.attr('num')).css('width', $('.iFeatureValue'+me.attr('num')).parent().width()-5-$('[for=iFeatureValue'+me.attr('num')+']').width()+'px');
                $('.sFeatureValue'+me.attr('num')).css('width', $('.sFeatureValue'+me.attr('num')).parent().width()-5-$('[for=sFeatureValue'+me.attr('num')+']').width()+'px');
                $('.sFeatureValue'+me.attr('num')).selectBox();
            });
            break;
        default:
            $('.dTypeControl'+me.attr('num')).html('');
            $('.fFeature'+me.attr('num')).attr('tool', '');
            break;
    }
});
$('.aValue').live('click', function(){
    $('.aValue, .aFeature').attr('num', parseInt($(this).attr('num'))+1);
    $(this).before('<div class="dValue"><div class="dTypeControl dTypeControl'+$(this).attr('num')+'">' +
        ((typeof(features[$(this).attr('key')])=='undefined')? '': (features[$(this).attr('key')]['dac-diem-cha']=='show')? '<div class="dLine"><label for="sFeatureParent'+$(this).attr('num')+'">'+tran('Đặc điểm cha|Feature parent|||')+':&nbsp;</label><select id="sFeatureParent'+$(this).attr('num')+'" class="sFeatureParent sFeatureParent'+$(this).attr('num')+'">'+features[$(this).parent().parent().parent().find('.aFeature').attr('type')].opts+'</select></div>': '') +
        (($(this).parent().parent().attr('tool')=='editor')?
            '<textarea name="featureDetail'+$(this).attr('num')+'" class="tFeatureDetail tFeatureDetail'+$(this).attr('num')+'" style="opacity: 0"></textarea>'
            : (($(this).parent().parent().attr('tool')=='text')?
            '<div class="dLine"><label for="iFeatureValue'+$(this).attr('num')+'">'+tran('Giá trị|Value|||')+':&nbsp;</label><input type="text" id="iFeatureValue'+$(this).attr('num')+'" class="iFeatureValue iFeatureValue'+$(this).attr('num')+'"/></div>'
            : (($(this).parent().parent().attr('tool')=='number')?
            '<div class="dLine"><label for="iFeatureValue'+$(this).attr('num')+'">'+tran('Giá trị|Value|||')+':&nbsp;</label><input type="number" id="iFeatureValue'+$(this).attr('num')+'" class="iFeatureValue iFeatureValue'+$(this).attr('num')+'"/></div>'
            : '<div class="dLine"><label for="sFeatureValue'+$(this).attr('num')+'">'+tran('Giá trị|Value|||')+':&nbsp;</label><select id="sFeatureValue'+$(this).attr('num')+'" class="sFeatureValue sFeatureValue'+$(this).attr('num')+'">'+$(this).parent().parent().find('> div > .dLine').next().find('select.sFeatureValue').html()+'</select></div>'))) +
        '</div><a>_</a></div>');
    if($(this).parent().parent().attr('tool')=='editor')
    {
        ck = CKEDITOR.replace('featureDetail'+$(this).attr('num'));
        addBtnCke(ck);
    }
    else
    if($(this).parent().parent().attr('tool')=='select')
    {
        $('.sFeatureValue'+$(this).attr('num')).selectBox();
        $('.sFeatureValue'+$(this).attr('num')).css('width', $('.sFeatureValue'+$(this).attr('num')).parent().width()-5-$('[for=sFeatureValue'+$(this).attr('num')+']').width()+'px');
    }
    else
        $('.iFeatureValue'+$(this).attr('num')).css('width', $('.iFeatureValue'+$(this).attr('num')).parent().width()-5-$('[for=iFeatureValue'+$(this).attr('num')+']').width()+'px');
    $('.sFeatureParent'+$(this).attr('num')).selectBox();
    $('.sFeatureParent'+$(this).attr('num')).css('width', $('.sFeatureParent'+$(this).attr('num')).parent().width()-10-$('[for=sFeatureParent'+$(this).attr('num')+']').width()+'px');
    $('.sFeatureName'+$(this).attr('num')).attr('num', $(this).attr('num'));
});
$('.dValue > a').live('click', function(){
    $(this).parent().fadeOut(300, function(){
        $(this).remove();
    });
});
$('.aDelFeature').live('click', function(){
    if($(this).find('img').css('border-radius')=='36%')
        $(this).parent().parent().fadeOut(300, function(){
            $('.'+$(this).find('select').attr('ul')).remove();
            $(this).remove();
        });
    else
        $(this).find('img').animate({borderRadius: '36%'}, 200);
});
$('legend select').live('change', function(){
    if($(this).val()=='add')
    {
        $(this).next().find('.selectBox-label').fadeTo(0, 0, function(){
            $(this).parent().next().fadeIn(200).val('').focus();
        });
    }
    else
    {
        $(this).next().next().fadeOut(0, function(){
            $(this).prev().find('.selectBox-label').fadeTo(200, 1);
        });
    }
});
$('.dPhoto a').live('click', function(){
    $(this).parent().fadeOut(300, function(){
        $(this).remove();
    });
});
$('.cke_dialog_ui_button').live('click', function(){
    if(($(this).html()=='Duyệt máy chủ' || $(this).html()=='Browse Server'))
    {
        backmap.set({obj: $(this), name: 'Add img'});
        $('.cke_dialog_background_cover, body > .cke_reset_all').fadeOut(300);
        OpenPhotos();
        $('#iMedia').attr('accept', '.jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF');
        $('.lUpload').attr('type', 'image').fadeIn(300);
        $('.dItem > div').live('click', function(){
            $('.sItemChk').removeClass('sItemChk');
            $(this).find('.sTitle').toggleClass('sItemChk');
        });
    }
});
$('.aAccept').live('click', function(){
    if(backmap.see().name=='Add img' || backmap.see().name=='Add video'){
        if(backmap.see().name=='Add img')
        {
            if ($('.sItemChk').length < 1)
                alert(tran('Mời bạn chọn 1 ảnh|Choose a image|||'));
            else {
                changePage($('.' + backmap.see().page), 'dShow', {fn: function(){}, params: {}});
                if(backmap.see().obj.parent().parent().prev().find('.cke_dialog_ui_input_text:eq(1)').length>0)
                {
                    backmap.see().obj.parent().parent().prev().find('.cke_dialog_ui_input_text:eq(1)').val($('.sItemChk').parent().parent().find('> img').attr('src'));
                    $('.cke_dialog_background_cover, body > .cke_reset_all').fadeIn(300);
                }
                else
                    backmap.see().obj.parent().find('> .dPhoto').append('<p><img src="'+$('.sItemChk').parent().parent().find('> img').attr('src')+'" alt="wsup3"/><a><img src="'+SKIN+'/admin/close.jpg" alt="wsup3"/></a></p>');
                $('.sItemChk').removeClass('sItemChk');
                $('.dItem > div').die('click');
                backmap.set({name: ''});
            }
        }
        else
        {
            if ($('.sItemChk').length < 1)
                alert(tran('Mời bạn chọn 1 video|Choose a video|||'));
            else {
                changePage($('.' + backmap.see().page), 'dShow', {fn: function(){}, params: {}});
                CKEDITOR.instances[backmap.see().editor.name].insertHtml('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+$('.sItemChk').parent().attr('id')+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>');
                $('.sItemChk').removeClass('sItemChk');
                $('.dVideo').die('click');
                backmap.set({name: ''});
            }
        }
    }
    else
        switch(backmap.see().page) {
            case 'dBoardAddProduct':
                if (CKEDITOR.instances['ProDetailvi'].getData() == '')
                {
                    if ($('.' + backmap.see().page + ' .lProDetailvi').length == 0)
                        $('.' + backmap.see().page + ' .dTabsLanguagevi .aFeature').before('<label class="lProDetail lProDetailvi error">' + tran('Mời bạn nhập chi tiết|Enter content detail, please|Введите содержание деталь, пожалуйста|请输入内容详细信息|コンテンツの詳細を入力してください') + '</label>');
                }
                else
                    $('.' + backmap.see().page + ' .lProDetailvi').remove();
            case 'dBoardAddCategory':
            case 'dBoardAddPage':
                $.each(flags, function(key, value){
                    $('.'+backmap.see().page+' .dTabsLanguage'+key+' .tTextFeature, .'+backmap.see().page+' .tImgFeature').each(function(){
                        if($(this).prev().find('.iKey').css('display')=='block' && $(this).prev().find('.iKey').val() == '')
                        {
                            if($(this).parent().find('.lFeature').length == 0)
                                $(this).parent().find('.aAddFeature').before('<label class="error lFeature">'+tran('Mời bạn nhập tên đặc điểm|Enter feature name, please|Пожалуйста введите детали продукта|商品詳細を入力してください|请输入产品详细信息')+'</label>').css('display', 'block');
                        }
                        else
                            $(this).parent().find('.lFeature').remove();
                    });
                });
                if(backmap.see().page=='dBoardAddProduct')
                    $("#fAddProduct").submit();
                if(backmap.see().page=='dBoardAddCategory')
                    $("#fAddCategory").submit();
                if(backmap.see().page=='dBoardAddPage')
                {
                    $.each(flags, function(key, value){
                        if (CKEDITOR.instances['PgDetail'+key].getData() == '')
                        {
                            if ($('.' + backmap.see().page + ' .dTabsLanguage'+key+' .lPgDetail'+key).length == 0)
                                $('.' + backmap.see().page + ' .dTabsLanguage'+key+' .aFeature').before('<label class="lPgDetail lPgDetail'+key+' error">' + tran('Mời bạn nhập chi tiết '+value+'|Enter '+value+' Content detail, please|Введите '+value+' содержимое деталь, пожалуйста|请输入'+value+'内容详情|'+value+'内容の詳細を入力してください') + '</label>');
                        }
                        else
                            $('.' + backmap.see().page + ' .lPgDetail'+key).remove();
                    });
                    $("#fAddPage").submit();
                }
                refresh.pros = true;
                break;
            case 'dBoardAddUser':
                $('.'+backmap.see().page+' .tTextFeature, .'+backmap.see().page+' .tImgFeature').each(function(){
                    if($(this).prev().find('.iKey').css('display')=='block' && $(this).prev().find('.iKey').val() == '')
                    {
                        if($(this).parent().find('.lFeature').length == 0)
                            $(this).parent().find('.aAddFeature').before('<label class="error lFeature">'+tran('Mời bạn nhập tên đặc điểm|Enter feature name, please|Пожалуйста введите детали продукта|商品詳細を入力してください|请输入产品详细信息')+'</label>').css('display', 'block');
                    }
                    else
                        $(this).parent().find('.lFeature').remove();
                });
                $("#fAddUser").submit();
                break;
            case 'dBoardAddCustomer':
                $('.'+backmap.see().page+' .tTextFeature, .'+backmap.see().page+' .tImgFeature').each(function(){
                    if($(this).prev().find('.iKey').css('display')=='block' && $(this).prev().find('.iKey').val() == '')
                    {
                        if($(this).parent().find('.lFeature').length == 0)
                            $(this).parent().find('.aAddFeature').before('<label class="error lFeature">'+tran('Mời bạn nhập tên đặc điểm|Enter feature name, please|Пожалуйста введите детали продукта|商品詳細を入力してください|请输入产品详细信息')+'</label>').css('display', 'block');
                    }
                    else
                        $(this).parent().find('.lFeature').remove();
                });
                $("#fAddCustomer").submit();
                break;
            case 'dBoardAddLanguage':
                $('.'+backmap.see().page+' .tTextFeature, .'+backmap.see().page+' .tImgFeature').each(function(){
                    if($(this).prev().find('.iKey').css('display')=='block' && $(this).prev().find('.iKey').val() == '')
                    {
                        if($(this).parent().find('.lFeature').length == 0)
                            $(this).parent().find('.aAddFeature').before('<label class="error lFeature">'+tran('Mời bạn nhập tên đặc điểm|Enter feature name, please|Пожалуйста введите детали продукта|商品詳細を入力してください|请输入产品详细信息')+'</label>').css('display', 'block');
                    }
                    else
                        $(this).parent().find('.lFeature').remove();
                });
                $("#fAddLanguage").submit();
                break;
            case 'dBoardAddFeature':
                $.each(flags, function(key, value){
                    $('.'+backmap.see().page+' .dTabsLanguage'+key+' .tTextFeature, .'+backmap.see().page+' .tImgFeature').each(function(){
                        if($(this).prev().find('.iKey').css('display')=='block' && $(this).prev().find('.iKey').val() == '')
                        {
                            if($(this).parent().find('.lFeature').length == 0)
                                $(this).parent().find('.aAddFeature').before('<label class="error lFeature">'+tran('Mời bạn nhập tên đặc điểm|Enter feature name, please|Пожалуйста введите детали продукта|商品詳細を入力してください|请输入产品详细信息')+'</label>').css('display', 'block');
                        }
                        else
                            $(this).parent().find('.lFeature').remove();
                    });
                });
                if(backmap.see().page=='dBoardAddFeature')
                {
                    $.each(flags, function(key, value){
                        if (CKEDITOR.instances['FeaDetail'+key].getData() == '')
                        {
                            if ($('.' + backmap.see().page + ' .dTabsLanguage'+key+' .FeaDetail'+key).length == 0)
                                $('.' + backmap.see().page + ' .dTabsLanguage'+key+' .dPhoto').before('<label class="lFeaDetail lFeaDetail'+key+' error">' + tran('Mời bạn nhập chi tiết '+value+'|Enter '+value+' Content detail, please|Введите '+value+' содержимое деталь, пожалуйста|请输入'+value+'内容详情|'+value+'内容の詳細を入力してください') + '</label>');
                        }
                        else
                            $('.' + backmap.see().page + ' .lFeaDetail'+key).remove();
                    });
                    $("#fAddFeature").submit();
                }
                break;
            case 'dBoardAddMenu':
                $.each(flags, function(key, value){
                    $('.'+backmap.see().page+' .dTabsLanguage'+key+' .tTextMenu, .'+backmap.see().page+' .tImgMenu').each(function(){
                        if($(this).prev().find('.iKey').css('display')=='block' && $(this).prev().find('.iKey').val() == '')
                        {
                            if($(this).parent().find('.lMenu').length == 0)
                                $(this).parent().find('.aAddMenu').before('<label class="error lMenu">'+tran('Mời bạn nhập tên đặc điểm|Enter menu name, please|Пожалуйста введите детали продукта|商品詳細を入力してください|请输入产品详细信息')+'</label>').css('display', 'block');
                        }
                        else
                            $(this).parent().find('.lMenu').remove();
                    });
                });
                if(backmap.see().page=='dBoardAddMenu')
                {
                    $.each(flags, function(key, value){
                        if (CKEDITOR.instances['MnuDetail'+key].getData() == '')
                        {
                            if ($('.' + backmap.see().page + ' .dTabsLanguage'+key+' .MnuDetail'+key).length == 0)
                                $('.' + backmap.see().page + ' .dTabsLanguage'+key+' .dPhoto').before('<label class="lMnuDetail lMnuDetail'+key+' error">' + tran('Mời bạn nhập chi tiết '+value+'|Enter '+value+' Content detail, please|Введите '+value+' содержимое деталь, пожалуйста|请输入'+value+'内容详情|'+value+'内容の詳細を入力してください') + '</label>');
                        }
                        else
                            $('.' + backmap.see().page + ' .lMnuDetail'+key).remove();
                    });
                    $("#fAddMenu").submit();
                }
                break;
            case 'dBoardMessageUser':
                if (CKEDITOR.instances['message'].getData() == '')
                {
                    if ($('.' + backmap.see().page + ' .lMessage').length == 0)
                        $('.' + backmap.see().page + ' #fMessageUser').append('<label class="lMessage error">' + tran('Mời bạn nhập nội dung|Enter detail, please|Введите подробности, пожалуйста|请输入详细信息|詳細を入力してください') + '</label>');
                }
                else
                    $('.' + backmap.see().page + ' .lMessage').remove();
                $('#fMessageUser').submit();
                break;
            case 'dBoardImport':
            case 'dBoardSell':
                if($('.' + backmap.see().page + ' .dProductSell').length>0)
                {
                    if ($('img.iCheck').css('display') =='inline-block')
                        $('img.iReady').fadeIn(200, function(){
                            $('img.iCheck').fadeOut(200);
                        });
                    else
                    {
                        products = {};
                        $('.' + backmap.see().page + ' form .dProductSell').each(function(){
                            products[$(this).attr('_id')] = {};
                            products[$(this).attr('_id')].title = $(this).find('p:eq(0)').text();
                            products[$(this).attr('_id')].price = $(this).find('.iNewPrice').val().replace(/\,/g, "");
                            if(backmap.see().page == 'dBoardSell')
                            {
                                products[$(this).attr('_id')].priceOriginal = $(this).find('.iNewPrice').attr('priceOriginal').replace(/\,/g, "");
                                products[$(this).attr('_id')].priceImport = $(this).find('.iNewPrice').attr('priceImport').replace(/\,/g, "");
                                products[$(this).attr('_id')].promotionVal = ($(this).find('.iPromotionVal').val().replace(/\,/g, ""));
                                products[$(this).attr('_id')].promotionType = $(this).find('.iPromotion').val();
                            }
                            else
                            {
                                products[$(this).attr('_id')].tax = $(this).find('.iTax').val();
                                products[$(this).attr('_id')].promotionVal = $(this).find('.iPromotionVal').val().replace(/\,/g, "");
                                products[$(this).attr('_id')].promotionType = '%';
                            }
                            products[$(this).attr('_id')].number = $(this).find('.iNumber').val();
                            products[$(this).attr('_id')].unit = $(this).find('.iNumber').next().text();
                        });
                        web.iReq({action: ((backmap.see().page == 'dBoardSell')? 'iSaveBillSell': 'iSaveBillImport'),
                            _id: $('.'+backmap.see().page+' .lSellCode input').attr('_id'),
                            billType: ((backmap.see().page == 'dBoardSell')? 'sell': 'import'),
                            billId: $('.' + backmap.see().page + ' .lSellCode input' ).val(),
                            promotionVal: $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val(),
                            promotionType: $('.' + backmap.see().page + ' .pFinal .iPromotion').val(),
                            pId: ((backmap.see().page == 'dBoardSell')? $('.dBoardSell .sCustomer').val(): $('.dBoardImport .sSupplier').val()),
                            products: products
                        }, function(dt){
                            $('.' + backmap.see().page + ' form').html('');
                            $('.' + backmap.see().page + ' .lSellCode input').val('HD'+web.getFormatNow().replace(/\/|\:|\ /g, ""));
                            $('.' + backmap.see().page + ' .pFinal span:eq(0)').text(web.getFormatNow());
                            $('.' + backmap.see().page + ' .pFinal span:eq(1)').text(0);
                            $('.' + backmap.see().page + ' .pFinal span:eq(2)').text(0);
                            $('img.iReady, img.iCheck').fadeToggle(250);
                        });
                    }
                }
                break;
            case 'dBoardChange':
                $('#fChange').submit();
                break;
        }
});
$('.aPhoto').live('click', function(){
    backmap.set({obj: $(this), name: 'Add imgs'});
    $('.aAccept').fadeOut(300);
    $('.dItem > div').live('click', function(){
        $(this).find('.sTitle').toggleClass('sItemChk');
    });
    OpenPhotos();
    $('.lUpload').fadeIn(300);
    $('.aAccepts').fadeIn(300);
});
$('.a1Photo').live('click', function(){
    backmap.set({obj: $(this), name: 'Add img'});
    OpenPhotos();
    $('.lUpload').fadeIn(300);
    $('.dItem > div').live('click', function(){
        $('.sItemChk').removeClass('sItemChk');
        $(this).find('.sTitle').toggleClass('sItemChk');
    });
});
$('.aAccepts').live('click', function(){
    switch(backmap.see().name)
    {
        case 'Add imgs':
        case 'Add images':
            if($('.sItemChk').length<1)
                alert(tran('Mời bạn chọn ảnh|Choose images|||'));
            else {
                $('.dItem > div').die('click');
                tmp = '';
                $('.sItemChk').each(function(){
                    if(backmap.see().name=='Add imgs')
                        tmp += '<p><img src="'+$(this).parent().parent().find('> img').attr('src')+'" alt="wsup3"/><a><img src="'+SKIN+'/admin/close.jpg" alt="wsup3"/></a></p>';
                    else
                        tmp += '<img src="'+$(this).parent().parent().find('> img').attr('src')+'" alt="wsup3"/>';
                });
                if(backmap.see().name=='Add imgs')
                    backmap.see().obj.parent().find('> .dPhoto').append(tmp);
                else
                    CKEDITOR.instances[backmap.see().editor].insertHtml(tmp);
            }
            break;
        case 'Add videos':
            if ($('.sItemChk').length < 1)
                alert(tran('Mời bạn chọn video|Choose videos|||'));
            else {
                $('.dVideo').die('click');
                tmp = '';
                $('.sItemChk').each(function(){
                    tmp += CKEDITOR.instances[backmap.see().editor].getData()+'<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+$(this).parent().attr('id')+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>';
                });
                CKEDITOR.instances[backmap.see().editor].insertHtml(tmp);
            }
            break;
    };
    changePage($('.' + backmap.see().page), 'dShow', {fn: function(){
        $('.sItemChk').removeClass('sItemChk');
        $('.aAccepts, .lUpload').fadeOut(300);
        $('.aAccept').fadeIn(300);
    }, params: {}});
    backmap.set({name: ''});
});
$('.dFeatures label').live('click', function(){
    $('.lTypeSelected').removeClass('lTypeSelected');
    $(this).toggleClass('lTypeSelected');
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
                                url: BASEURL + '/' + LANG + '/media/addMultimedia',
                                type: 'POST',
                                data: {data: e.target.result, wid: people._id, name: v.name, type: 'image'},
                                dataType: 'json',
                                success: function (dt) {
                                    if(dt.status == true)
                                    {
                    console.log(dt);
                                        $('.fImages').append('<div class="dNewItem">' +
                                            '<img wid="' + people._id + '" site="' + dt.link + '" _id="' + dt.mediaid + '" src="' + dt.link + '/multimedia/' + dt.mediaid + '" alt="wsup3" title="' + v.name + '"/>' +
                                            '<div class="dText">' +
                                            '<span class="sGlass"></span>' +
                                            '<span class="sTitle">'+v.name+'</span></div></div>');
                                        metroImgs.addItems($('.dNewItem'), 1);
                                    }
                                    $('.dProcess').css('display', 'none');
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
        case 'audio':
            if (this.files.length > 0) {
                $.each(this.files, function (k, v) {
                    if (v) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            new Promise(function (resolve, reject) {
                                resolve({
                                    playerTmp: undefined,
                                    result: e.target.result,
                                    k: k,
                                    v: v,
                                    ValGetLength: undefined
                                });
                            }).then(function (prm) {
                                prm.playerTmp = new Audio(prm.result);
                                prm.ValGetLength = setInterval(function () {
                                    if ((prm.playerTmp.buffered.length == 1 && prm.playerTmp.readyState) || isNaN(prm.playerTmp.duration) == false) {
                                        $.ajax({
                                            url: BASEURL + '/' + LANG + '/media/addMultimedia',
                                            type: 'POST',
                                            data: { data: prm.result, duration: prm.playerTmp.duration, wid: people._id, name: prm.v.name, type: 'audio' },
                                            dataType: 'json',
                                            success: function (dt) {
                                                if (dt.status == true) {
                                                    $('#fAudios').prepend('<div class="dCategory ' + dt.mediaid + '">' +
                                                        '<div class="dProduct dAudio" id="' + dt.mediaid + '">' +
                                                        '<p><span>' + people.displayname + '</span><span>' + dt.date + '<img style="display: block" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: none" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                                                        '<div class="dInfo">' +
                                                        '<a target="_blank" href="' + BASEURL + '/multimedia/' + dt.mediaid + '"><img src="' + SKIN + '/logo.png" alt="wsup3"/></a>' +
                                                        '<p>' + prm.v.name + '</p>' +
                                                        '</div></div></div>').find('.dInfo > a img').each(function () {
                                                            $(this).load(function () {
                                                                align.topleft($(this), $(this).parent(), 0, 0, 1);
                                                            });
                                                        });
                                                }
                                                $('.dProcess').css('display', 'none');
                                            },
                                            xhr: function () {
                                                xhr = new XMLHttpRequest();
                                                xhr.upload.addEventListener('progress', function (evt) {
                                                    if (evt.lengthComputable && count == 1) {
                                                        count = 0;
                                                        var percentComplete = evt.loaded / evt.total;
                                                        percentComplete = parseInt(percentComplete * 100);
                                                        $('.dProcess').css('display', 'block').animate({ width: percentComplete + '%' }, 300);
                                                        $('.dProcess span').text(percentComplete + '%');
                                                        setTimeout('count = 1', 300);
                                                    }
                                                }, false);
                                                return xhr;
                                            }
                                        });
                                        clearInterval(prm.ValGetLength);
                                    }
                                }, 300);
                            });
                        };
                        reader.readAsDataURL(v);
                    }
                });
            }
            //upAudio(this.files, 0, $(this), function () {

            //})
            break;
        case 'video':
            if(typeof(tempVideo)=='undefined')
                tempVideo = this.files.length-1;
            selectedFile = this.files[tempVideo];
            defineRequest({
                params: {'snippet.categoryId': '22',
                    'snippet.defaultLanguage': '',
                    'snippet.description': '',
                    'snippet.tags[]': '',
                    'snippet.title': selectedFile.name,
                    'status.embeddable': '',
                    'status.license': '',
                    'status.privacyStatus': 'public',
                    'status.publicStatsViewable': ''
                },
                progress: function(dt){
                    var percentComplete = dt.loaded / dt.total;
                    percentComplete = parseInt(percentComplete * 100);
                    $('.dProcess').css('display', 'block').animate({ height: percentComplete + '%'}, 300);
                    $('.dProcess span').text(percentComplete + '%');
                },
                complete: function(video){
                    if(video.hasOwnProperty('status')==true && video.status.uploadStatus == 'uploaded')
                    {
                        $('.fVideos').append('<div class="dVideo"><img src="'+video.snippet.thumbnails.high.url+'" alt="wsup3" title="'+ selectedFile.name +'"/>' +
                            '<span class="sTitle">'+ selectedFile.name +'</span></div>');
                        web.iReq({action: 'iSaveVideo', video: video}, function(){
                            if(tempVideo>0)
                            {
                                tempVideo--;
                                $('#iMedia').trigger('change');
                            }
                        });
                    }
                    $('.dProcess').css('display', 'none');
                }
            });
            break;
        case 'excel':
            if(this.files.length>0)
                $.each(this.files, function(k, v) {
                    if(v){
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            $.ajax({
                                url: BASEURL + '/' + LANG + '/media/addFiles',
                                type: 'POST',
                                data: {data: e.target.result, wid: people._id, name: v.name, type: 'file'},
                                dataType: 'json',
                                success: function (dt) {
                                    web.iReq({action: 'iUploadExcel', name: dt[0].name}, function(dt){
                                        setTimeout(function(){
                                            $('.'+backmap.see().page).find('form').html('');
                                            $('.'+backmap.see().page+' .sBtnMore').trigger('click');
                                        }, 1000);
                                    });
                                    $('.dProcess').css('display', 'none');
                                },
                                xhr: function () {
                                    xhr = new XMLHttpRequest();
                                    xhr.upload.addEventListener('progress', function (evt) {
                                        if (evt.lengthComputable && count == 1) {
                                            count = 0;
                                            var percentComplete = evt.loaded / evt.total;
                                            percentComplete = parseInt(percentComplete * 100);
                                            $('.dProcess').css('display', 'block').animate({height: percentComplete + '%'}, 300);
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
function upAudio(files, length, me, cb)
{
    if (length <= files.length-1) {
        reader = new FileReader();
        reader.onload = function (e) {
            playerTmp = new Audio(e.target.result);
            ValGetLength = setInterval(function () {
                if ((playerTmp.buffered.length == 1 && playerTmp.readyState) || isNaN(playerTmp.duration) == false) {
                    $.ajax({
                        url: BASEURL + '/' + LANG + '/media/addMultimedia',
                        type: 'POST',
                        data: { data: e.target.result, duration: playerTmp.duration, wid: people._id, name: files[length].name, type: 'audio' },
                        dataType: 'json',
                        success: function (dt) {
                            if (dt.status == true) {
                                $('#fAudios').prepend('<div class="dCategory ' + dt.mediaid + '">' +
                                    '<div class="dProduct dAudio" id="' + dt.mediaid + '">' +
                                    '<p><span>' + people.displayname + '</span><span>' + dt.date + '<img style="display: block" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: none" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                                    '<div class="dInfo">' +
                                    '<a target="_blank" href="' + BASEURL + '/multimedia/' + dt.mediaid + '"><img src="' + SKIN + '/logo.png" alt="wsup3"/></a>' +
                                    '<p>' + files[length].name + '</p>' +
                                    '</div></div></div>').find('.dInfo > a img').each(function () {
                                        me.load(function () {
                                            align.topleft(me, me.parent(), 0, 0, 1);
                                        });
                                    });
                            }
                            $('.dProcess').css('display', 'none');
                            length++;
                            upAudio(files, length, me, cb);
                        },
                        xhr: function () {
                            xhr = new XMLHttpRequest();
                            xhr.upload.addEventListener('progress', function (evt) {
                                if (evt.lengthComputable && count == 1) {
                                    count = 0;
                                    percentComplete = evt.loaded / evt.total;
                                    percentComplete = parseInt(percentComplete * 100);
                                    $('.dProcess').css('display', 'block').animate({ height: percentComplete + '%' }, 300);
                                    $('.dProcess span').text(percentComplete + '%');
                                    setTimeout('count = 1', 300);
                                }
                            }, false);
                            return xhr;
                        }
                    });
                }
                clearInterval(ValGetLength);
            }, 300);
        };
        reader.readAsDataURL(files[length]);
    }
    else
        cb();
}
$('.aExcel').live('click', function(){
    $('#iMedia').attr('accept', '.xlsx, .xls');
    $('.lUpload').attr('type', 'excel').trigger('click');
});
$('.dAppCamera').live('click', function(){
    changePage($('.dBoardCamera'), 'dShow', {fn: function(){
        backmap.add({page: 'dBoardCamera', action: {fn: function(){
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            }).then(function(stream){
                window.stream = stream;
                if(window.URL)
                    document.querySelector('#vCamera').src = window.URL.createObjectURL(stream);
                else
                    document.querySelector('#vCamera').src = stream;
            }).catch(function(error){
                console.log('navigator.getUserMedia error: ', error);
            });
            $('.aCamera, .aImages').fadeIn(300);
        }, params: {}}});
    }, params: {}});
});
$('.dAppRecording').live('click', function(){
    changePage($('.dBoardRecording'), 'dShow', {fn: function(){
        backmap.add({page: 'dBoardRecording', action: {fn: function(){
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            }).then(function(stream){
                window.stream = stream;
                if(window.URL)
                    document.querySelector('#vRecording').src = window.URL.createObjectURL(stream);
                else
                    document.querySelector('#vRecording').src = stream;
            }).catch(function(error){
                console.log('navigator.getUserMedia error: ', error);
            });
            $('.aRecordingVideo, .aVideoGallery').fadeIn(300);
        }, params: {}}});
    }, params: {}});
});
$('.aRecordingVideo').live('click', function(){
    recordedBlobs = recordedBlobs;
    var options = {mimeType: 'video/webm; codecs=vp9'};
    if(!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + ' is not Supported');
        options = {mimeType: 'video/webm;codecs=vp8'};
        if(!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.log(options.mimeType + ' is not Supported');
            options = {mimeType: 'video/webm'};
            if(!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.log(options.mimeType + ' is not Supported');
                options = {mimeType: ''};
            }
        }
    }
    try {
        mediaRecorder = (typeof(mediaRecorder)!='undefined')? mediaRecorder: new MediaRecorder(window.stream, options);
    } catch (e) {
        alert('Exception while creating MediaRecorder: '
            + e + '. mimeType: ' + options.mimeType);
        return;
    }
    $('.aRecordingVideo, .aVideoGallery').fadeOut(300, function(){
        $('.aPauseRecordingVideo, .aSave').fadeIn(200);
    });
    mediaRecorder.ondataavailable = function(event){
        if(event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
        }
    };
    if(mediaRecorder.state=='inactive')
        mediaRecorder.start(3000);
    else
        mediaRecorder.resume(3000);
});
$('.aPauseRecordingVideo').live('click', function(){
    mediaRecorder.pause();
    $('.aPauseRecordingVideo').fadeOut(300, function(){
        $('.aRecordingVideo').fadeIn(200);
    });
});
$('.aVideoGallery').live('click', function(){
    $('.aRecordingVideo, .aVideoGallery').fadeOut(300);
    $('.fVideos').html('');
    $('.dAppVideos').trigger('click');
    recordedBlobs = [];
    if(window.stream)
        window.stream.getTracks().forEach(function(track) {
            track.stop();
        });
});
$('.aSave').live('click', function(){
    mediaRecorder.stop();
    var reader = new window.FileReader();
    reader.readAsDataURL(new Blob(recordedBlobs, {type: 'video/mp4'}));
    reader.onloadend = function() {
        $.ajax({
            url: BASEURL+'/'+LANG+'/media/addMultimedia',
            type: 'POST',
            data: {data: reader.result, wid: people._id, name: web.getNowString()+'.mp4', type: 'video'},
            dataType: 'json',
            success: function(dt){
                $('.dProcess').css('display', 'none');
                $('.aSave, .aPauseRecordingVideo').fadeOut(300, function(){
                    $('.aVideoGallery, .aRecordingVideo').fadeIn(200);
                });
                mediaRecorder = undefined;
                recordedBlobs = [];
            },
            xhr: function() {
                xhr = new XMLHttpRequest();
                xhr.upload.addEventListener('progress', function(evt){
                    if(evt.lengthComputable){
                        var percentComplete = evt.loaded/evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        $('.dProcess').css('display', 'block').animate({width: percentComplete+'%'}, 300);
                        $('.dProcess span').text(percentComplete+'%');
                    }
                }, false);
                return xhr;
            }
        });
    };
//            var url = window.URL.createObjectURL(blob);
//            window.open(url);
//            var url = (window.URL || window.webkitURL).createObjectURL(blob);
//            console.log(url);
//            window.URL.revokeObjectURL(url);
//            var a = document.createElement('a');
//            a.style.display = 'none';
//            a.href = url;
//            a.download = 'test.webm';
//            document.body.appendChild(a);
//            a.click();
//            document.body.removeChild(a);
});
$('.aImages').live('click', function(){
    $('.aCamera, .aImages').fadeOut(200);
    $('.fImages').html('');
    metroImgs.checkInit = false;
    $('.dAppPhotos').trigger('click');
    if(window.stream)
        window.stream.getTracks().forEach(function(track) {
            track.stop();
        });
});
$('.aCamera').live('click', function(){
    temp = document.createElement('canvas');
    temp.width = $('#vCamera').width();
    temp.height = $('#vCamera').height();
    temp2 = temp.getContext('2d');
    temp2.drawImage(document.getElementById('vCamera'), 0, 0, temp.width, temp.height);
    $.ajax({
        url: BASEURL+'/'+LANG+'/media/addMultimedia',
        type: 'POST',
        data: {data: temp.toDataURL(), wid: people._id, name: web.getNowString()+'.png', type: 'image'},
        dataType: 'json',
        success: function(dt){
            $('.dProcess').css('display', 'none');
            $('.aCamera').fadeTo(100, 0.6, function(){
                $('.aCamera').fadeTo(100, 1);
            });
        },
        xhr: function() {
            xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', function(evt){
                if(evt.lengthComputable){
                    var percentComplete = evt.loaded/evt.total;
                    percentComplete = parseInt(percentComplete * 100);
                    $('.dProcess').css('display', 'block').animate({width: percentComplete+'%'}, 300);
                    $('.dProcess span').text(percentComplete+'%');
                }
            }, false);
            return xhr;
        }
    });
});
$('.dShow').live('mousedown', function(){
    $('img.iCheck').fadeIn(200, function(){
        $('img.iReady').fadeOut(200);
    });
});
$('.sBtnMore').live('click', function(){
    me = $(this);
    me.fadeOut(250);
    params = {action: 'iGetMores', type: me.attr('type'), from: me.parent().prev().find('.dCategory').length, keys: $('.iSearch').val(), opt: undefined};
    switch(me.attr('type'))
    {
        case 'messenges':
            if(me.parent().prev().find('.dCategory').length==0)
            {
                if(chats.length==0)
                {
                    params.type = 'mfriend';
                    me.attr('type', params.type);
                }
                else
                    params.chats = chats.slice(0, 10);
            }
            else
                if(chats.length>0)
                    params.chats = chats.slice(me.parent().prev().find('.dCategory').length-1, 10);
            break;
        case 'mfriend':
                if(chats.length>0)
                {
                    if(me.parent().prev().find('.dCategory').length==0)
                    {
                        if(params.keys=='')
                        {
                            params.type = 'messenges';
                            me.attr('type', params.type);
                            params.chats = chats.slice(0, 10);
                            break;
                        }
                        else
                            params.onLetter = true;
                    }
                    params.from = (me.parent().prev().find('.dCategory').length-chats.length>0)? (me.parent().prev().find('.dCategory').length-chats.length>0)-1: 0;
                }
            break;
        case 'friend':
            if(me.parent().prev().find('.dCategory').length==0)
            {
                if(chats.length>0)
                {
                    if(params.keys=='')
                    {
                        params.type = 'messenges';
                        me.attr('type', params.type);
                        params.chats = chats.slice(0, 10);
                    }
                    else
                        params.onLetter = true;
                }
            }
            else
            {
                if(chats.length==0)
                    params.from = (me.parent().prev().find('.dCategory').length-people.friends.length>0)? (me.parent().prev().find('.dCategory').length-people.friends.length)-1: 0;
                else
                {
                    dear = [];
                    $.each(chats, function(k, v){
                        dear.push(v);
                    });
                    if(people.friends.length>0)
                        $.each(people.friends, function(k, v){
                            dear.push(v);
                        });
                    else
                        params.from = (me.parent().prev().find('.dCategory').length-dear.length>0)? (me.parent().prev().find('.dCategory').length-dear.length>0)-1: 0;
                    dear = undefined;
                }
            }
            break;
        case 'post':
            params.opt = $('.sCats').val();
            break;
        case 'image':
            params.from = $('.fImages .dItem > div').length;
            break;
    }
    web.iReq(params, function (dt) {
        switch(me.attr('type'))
        {
            case 'post':
                dt.forEach(function(obj, index) {
                    p = '<div class="dCategory ' + obj._id + '">' +
                        '<div class="dProduct" path="'+obj.path+'" id="' + obj._id + '">' +
                        '<p><span>' + obj.people.displayname + '</span><span>' + obj.dateVN + '<img style="display: ' + ((obj.live == true) ? 'block' : 'none') + '" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: ' + ((obj.live == false) ? 'block' : 'none') + '" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                        '<div class="dOption">' +
                        '<span class="sEditProduct"><img src="' + SKIN + '/admin/edit.png" alt="wsup3"/></span>' +
                        '<span class="sTrash"><img src="' + SKIN + '/admin/trash.png" alt="wsup3"/><img src="' + SKIN + '/admin/trashY.png" alt="wsup3"/></span>' +
                        '</div><div class="dInfo">' +
                        '<a target="_blank" href="' + BASEURL + '/' + obj.path + '"><img src="' + ((obj.hasOwnProperty('imgs') == true && obj.imgs.hasOwnProperty(0) == true)? ((obj.imgs[0] != null)? obj.imgs[0]: SKIN + '/logo.png'): SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                        '<p>' + obj.title + '</p>' +
                        '<p>Lượt xem: ' + obj.views + '</p>' +
                        '<p>' + obj.except + '</p>' +
                        '</div></div></div>';
                    $('#fProducts').append(p).find('.dInfo > a img').each(function(){
                        $(this).load(function(){
                            align.topleft($(this), $(this).parent(), 0, 0, 1);
                        });
                    });
                });
                break;
            case 'image':
                if(dt.length>0)
                {
                    console.log(dt);
                    $.each(dt, function(k, v){
                        $('.fImages').append('<div class="dNewItem">' +
                            '<img wid="' + v.people._id +'" site="'+v.site+'"_id="'+v.mediaid+'" src="' + v.site+'/multimedia/'+v.mediaid + '" alt="wsup3" title="'+v.name+'"/>' +
                            '<div class="dText">' +
                            '<span class="sGlass"></span>' +
                            '<span class="sTitle">'+v.name+'</span></div></div>');
                    });
                    metroImgs.addItems($('.dNewItem'), 1);
                }
                break;
            case 'audio':
                if(dt.list.length>0)
                {
                    getInfoList(dt);
                    dt.list.forEach(function(obj, index) {
                        p = '<div class="dCategory ' + obj.mediaid + '">' +
                            '<div class="dProduct dAudio" id="' + obj.mediaid + '">' +
                            '<p><span>' + obj.people.displayname + '</span><span>' + obj.dateVN+'<img style="display: block" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: none" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                            '<div class="dInfo">' +
                            '<a title="' + obj.site + '"><img src="'+SKIN + '/logo.png" alt="wsup3"/></a>' +
                            '<p><b>' + obj.name + '</b></p>' +
                            '</div></div></div>';
                        $('#fAudios').append(p).find('.dInfo > a img').each(function(){
                            $(this).load(function(){
                                align.topleft($(this), $(this).parent(), 0, 0, 1);
                            });
                        });
                    });
                }
                break;
            case 'video':
                if(dt.length>0)
                    $.each(dt, function(k, v){
                        $('#fVideos').append('<div id="'+ v.params.id+'" class="dVideo"><img src="'+ v.params.img+'" alt="wsup3" title="'+ v.name+'"/>' +
                            '<span class="sTitle">'+v.name+'</span></div>');
                    });
                break;
            case 'messenges':
                dt = dt[0];
                dt.forEach(function (obj, index) {
                    temp = {};
                    temp[people.pead] = 1;
                    temp[obj.pead] = 1;
                    p = '<div class="dCategory ' + obj._id + '">' +
                        '<div class="dProduct dProductMore" id="' + obj._id + '">' +
                        '<p><span>' + ((obj.hasOwnProperty('displayname') && obj.displayname != '') ? obj.displayname : obj.fullname) + '</span><span>' + obj.dateVN + '<img style="display: ' + ((obj.live == true) ? 'block' : 'none') + '" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: block" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                        '<div class="dOption" style="">' +
                        "<input class='iTalkRers' type='hidden' value='"+JSON.stringify(temp)+"'/>" +
                        '<span class="sTalk" title="'+tran('Nói chuyện|Talk|Talk|Talk|Talk')+'"><img src="' + SKIN + '/admin/talk.png" alt="wsup3"/></span>' +
                        '<span class="'+((obj.isFr==true)? 'sDelFr': 'sAddFr')+'" title="'+((obj.isFr==true)? tran('Xóa bạn|Remove friend|Add friend|Add friend|Add friend'): tran('Thêm bạn|Add friend|Add friend|Add friend|Add friend'))+'"><img src="' + SKIN + '/admin/'+((obj.isFr==true)? 'exFr': 'addFr')+'.png" alt="wsup3"/><img src="' + SKIN + '/admin/'+((obj.isFr==true)? 'exFrY': 'addFrY')+'.png" alt="wsup3"/></span>' +
                        '</div><div class="dInfo">' +
                        '<a class="aScreens"><img src="' + ((obj.hasOwnProperty('image') && obj.image != '') ? obj.image : SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                        '<p>' + obj.email + '</p>' +
                        '<p>' + ofGroup(obj) + '</p>' +
                        '<p>' + ((typeof(obj.phone)!='undefined')? obj.phone: '') + '</p>' +
                        '</div></div></div>';
                    $('#fFriends').append(p).find('.dInfo > a img').each(function(){
                        $(this).load(function(){
                            align.topleft($(this), $(this).parent(), 0, 0, 1);
                        });
                    });
                });
                if(dt.length<9)
                    me.attr('type', 'mfriend');
                if(dt.length<5)
                    me.trigger('click');
                break;
            case 'mfriend':
                dtTemp = dt;
                $.each(chats, function(k, v) {
                    dt = dtTemp;
                    dt.forEach(function (obj, index) {
                        if (v._id == obj._id) {
                            if(params.onLetter==undefined)
                                dtTemp.splice(index, 1);
                            else
                                dtTemp[index].hasLetter = true;
                            return;
                        }
                    });
                });
                dt = dtTemp;
                dtTemp = undefined;
                dt.forEach(function (obj, index) {
                    temp = {};
                    temp[people.pead] = 1;
                    temp[obj.pead] = 1;
                    p = '<div class="dCategory ' + obj._id + '">' +
                        '<div class="dProduct dProductMore" id="' + obj._id + '">' +
                        '<p><span>' + ((obj.hasOwnProperty('displayname') && obj.displayname != '') ? obj.displayname : obj.fullname) + '</span><span>' + obj.dateVN + '<img style="display: ' + ((obj.live == true) ? 'block' : 'none') + '" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: ' + ((obj.hasOwnProperty('hasLetter') == true && obj.hasLetter == true) ? 'block' : 'none') + '" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                        '<div class="dOption" style="">' +
                        "<input class='iTalkRers' type='hidden' value='"+JSON.stringify(temp)+"'/>" +
                        '<span class="sTalk" title="'+tran('Nói chuyện|Talk|Talk|Talk|Talk')+'"><img src="' + SKIN + '/admin/talk.png" alt="wsup3"/></span>' +
                        '<span class="sDelFr" title="'+ tran('Xóa bạn|Remove friend|Add friend|Add friend|Add friend') +'"><img src="' + SKIN + '/admin/exFr.png" alt="wsup3"/><img src="' + SKIN + '/admin/exFrY.png" alt="wsup3"/></span>' +
                        '</div><div class="dInfo">' +
                        '<a class="aScreens"><img src="' + ((obj.hasOwnProperty('image') && obj.image != '') ? obj.image : SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                        '<p>' + obj.email + '</p>' +
                        '<p>' + ofGroup(obj) + '</p>' +
                        '<p>' + ((typeof(obj.phone)!='undefined')? obj.phone: '') + '</p>' +
                        '</div></div></div>';
                    $('#fFriends').append(p).find('.dInfo > a img').each(function(){
                        $(this).load(function(){
                            align.topleft($(this), $(this).parent(), 0, 0, 1);
                        });
                    });
                });
                if(dt.length<9)
                    me.attr('type', 'friend');
                if(dt.length<5)
                    me.trigger('click');
                break;
            case 'friend':
                dtTemp = dt;
                $.each(chats, function(k, v) {
                    dt = dtTemp;
                    dt.forEach(function (obj, index) {
                        if (v._id == obj._id) {
                            if(params.onLetter==undefined)
                                dtTemp.splice(index, 1);
                            else
                                dtTemp[index].hasLetter = true;
                            return;
                        }
                    });
                });
                dt = dtTemp;
                dtTemp = undefined;
                dt.forEach(function (obj, index) {
                    temp = {};
                    temp[people.pead] = 1;
                    temp[obj.pead] = 1;
                    p = '<div class="dCategory ' + obj._id + '">' +
                        '<div class="dProduct dProductMore" id="' + obj._id + '">' +
                        '<p><span>' + ((obj.hasOwnProperty('displayname') && obj.displayname != '') ? obj.displayname : obj.fullname) + '</span><span>' + obj.dateVN + '<img style="display: ' + ((obj.live == true) ? 'block' : 'none') + '" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: ' + ((obj.hasOwnProperty('hasLetter') == true && obj.hasLetter == true) ? 'block' : 'none') + '" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                        '<div class="dOption" style="">' +
                        "<input class='iTalkRers' type='hidden' value='"+JSON.stringify(temp)+"'/>" +
                        '<span class="sTalk" title="'+tran('Nói chuyện|Talk|Talk|Talk|Talk')+'"><img src="' + SKIN + '/admin/talk.png" alt="wsup3"/></span>' +
                        '<span class="'+((obj.isFr==true)? 'sDelFr': 'sAddFr')+'" title="'+((obj.isFr==true)? tran('Xóa bạn|Remove friend|Add friend|Add friend|Add friend'): tran('Thêm bạn|Add friend|Add friend|Add friend|Add friend'))+'"><img src="' + SKIN + '/admin/'+((obj.isFr==true)? 'exFr': 'addFr')+'.png" alt="wsup3"/><img src="' + SKIN + '/admin/'+((obj.isFr==true)? 'exFrY': 'addFrY')+'.png" alt="wsup3"/></span>' +
                        '</div><div class="dInfo">' +
                        '<a class="aScreens"><img src="' + ((obj.hasOwnProperty('image') && obj.image != '') ? obj.image : SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                        '<p>' + obj.email + '</p>' +
                        '<p>' + ofGroup(obj) + '</p>' +
                        '<p>' + ((typeof(obj.phone)!='undefined')? obj.phone: '') + '</p>' +
                        '</div></div></div>';
                    $('#fFriends').append(p).find('.dInfo > a img').each(function(){
                        $(this).load(function(){
                            align.topleft($(this), $(this).parent(), 0, 0, 1);
                        });
                    });
                });
                if(dt.length<9)
                    me.attr('type', 'friend');
                break;
            case 'term':
                console.log(dt);
                if($('.iSearch').val() != '')
                    dt.forEach(function (obj, index) {
                        p = ((obj.cats.hasOwnProperty(0) == true) ? '<div class="dCategory dChildCategory ' + obj._id + '">' : '<div class="dCategory ' + obj._id + '">') +
                            '<div class="dProduct" id="' + obj._id + '" path="' + obj.path + '">' +
                            '<p><span>' + obj.people.displayname + '</span><span>' + obj.dateVN + '<img style="display: ' + ((obj.live == true) ? 'block' : 'none') + '" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: ' + ((obj.live == false) ? 'block' : 'none') + '" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                            '<div class="dOption">' +
                            '<span class="sEditCategory"><img src="' + SKIN + '/admin/edit.png" alt="wsup3"/></span>' +
                            '<span class="sTrash"><img src="' + SKIN + '/admin/trash.png" alt="wsup3"/><img src="' + SKIN + '/admin/trashY.png" alt="wsup3"/></span>' +
                            '</div><div class="dInfo">' +
                            '<a target="_blank" href="' + BASEURL + '/' + obj.path + '"><img src="' + ((obj.hasOwnProperty('imgs') == true && obj.imgs.hasOwnProperty(0) == true)? ((obj.imgs[0] != null)? obj.imgs[0]: SKIN + '/logo.png'): SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                            '<p>' + obj.title + '</p>' +
                            '<p>Lượt xem: ' + obj.views + '</p>' +
                            '<p>' + obj.except + '</p>' +
                            '</div></div></div>';
                        $('#fCategories').append(p).find('.dInfo > a img').each(function () {
                            $(this).load(function () {
                                align.topleft($(this), $(this).parent(), 0, 0, 1);
                            });
                        });
                    });
                else
                    dt.forEach(function(obj, index) {
                        p = ((obj.cats.hasOwnProperty(0) == true) ? '<div class="dCategory dChildCategory ' + obj._id + '">' : '<div class="dCategory ' + obj._id + '">') +
                            '<div class="dProduct" id="' + obj._id + '" path="' + obj.path + '">' +
                            '<p><span>' + obj.people.displayname + '</span><span>' + obj.dateVN + '<img style="display: ' + ((obj.live == true) ? 'block' : 'none') + '" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: ' + ((obj.live == false) ? 'block' : 'none') + '" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                            '<div class="dOption">' +
                            '<span class="sEditCategory"><img src="' + SKIN + '/admin/edit.png" alt="wsup3"/></span>' +
                            '<span class="sTrash"><img src="' + SKIN + '/admin/trash.png" alt="wsup3"/><img src="' + SKIN + '/admin/trashY.png" alt="wsup3"/></span>' +
                            '</div><div class="dInfo">' +
                            '<a target="_blank" href="' + BASEURL + '/' + obj.path + '"><img src="' + ((obj.hasOwnProperty('imgs') == true && obj.imgs.hasOwnProperty(0) == true)? ((obj.imgs[0] != null)? obj.imgs[0]: SKIN + '/logo.png'): SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                            '<p>' + obj.title + '</p>' +
                            '<p>Lượt xem: ' + obj.views + '</p>' +
                            '<p>' + obj.except + '</p>' +
                            '</div></div></div>';
                        if (obj.cats.hasOwnProperty(0) == true)
                        {
                            $('#fCategories .' + obj.cats[0]).append(p).find('.dInfo > a img').each(function () {
                                $(this).load(function () {
                                    align.topleft($(this), $(this).parent(), 0, 0, 1);
                                });
                            });
                        }
                        else
                            $('#fCategories').append(p).find('.dInfo > a img').each(function(){
                                $(this).load(function(){
                                    align.topleft($(this), $(this).parent(), 0, 0, 1);
                                });
                            });
                    });
                break;
            case 'page':
                dt.forEach(function(obj, index) {
                    p = '<div class="dCategory ' + obj._id + '">' +
                        '<div class="dProduct" path="' + obj.path + '" id="' + obj._id + '">' +
                        '<p><span>' + obj.people.displayname + '</span><span>' + obj.dateVN + '<img style="display: ' + ((obj.live == true) ? 'block' : 'none') + '" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: ' + ((obj.live == false) ? 'block' : 'none') + '" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                        '<div class="dOption">' +
                        '<span class="sEditPage"><img src="' + SKIN + '/admin/edit.png" alt="wsup3"/></span>' +
                        '<span class="sTrash"><img src="' + SKIN + '/admin/trash.png" alt="wsup3"/><img src="' + SKIN + '/admin/trashY.png" alt="wsup3"/></span>' +
                        '</div><div class="dInfo">' +
                        '<a target="_blank" href="' + BASEURL + '/' + obj.path + '"><img src="' + ((obj.hasOwnProperty('imgs') == true && obj.imgs.hasOwnProperty(0) == true)? ((obj.imgs[0] != null)? obj.imgs[0]: SKIN + '/logo.png'): SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                        '<p>' + obj.title + '</p>' +
                        '<p>Lượt xem: ' + obj.views + '</p>' +
                        '<p>' + obj.except + '</p>' +
                        '</div></div></div>';
                    $('#fPages').append(p).find('.dInfo > a img').each(function(){
                        $(this).load(function(){
                            align.topleft($(this), $(this).parent(), 0, 0, 1);
                        });
                    });
                });
                break;
            case 'feature':
                dt.forEach(function(obj, index) {
                    p = '<div class="dCategory ' + obj._id + '">' +
                        '<div class="dProduct" path="' + obj.path + '" id="' + obj._id + '">' +
                        '<p><span>' + obj.people.displayname + '</span><span>' + obj.dateVN + '<img style="display: ' + ((obj.live == true) ? 'block' : 'none') + '" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: ' + ((obj.live == false) ? 'block' : 'none') + '" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                        '<div class="dOption">' +
                        '<span class="sEditFeature"><img src="' + SKIN + '/admin/edit.png" alt="wsup3"/></span>' +
                        '<span class="sTrash"><img src="' + SKIN + '/admin/trash.png" alt="wsup3"/><img src="' + SKIN + '/admin/trashY.png" alt="wsup3"/></span>' +
                        '</div><div class="dInfo">' +
                        '<a target="_blank"><img src="' + ((obj.hasOwnProperty('imgs') == 'true' && obj.imgs.hasOwnProperty(0) == true)? ((obj.imgs[0] != null)? obj.imgs[0]: SKIN + '/logo.png'): SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                        '<p>' + obj.title + '</p>' +
                        '<p>' + obj.path + '</p>' +
                        '</div></div></div>';
                    $('#fFeatures').append(p).find('.dInfo > a img').each(function(){
                        $(this).load(function(){
                            align.topleft($(this), $(this).parent(), 0, 0, 1);
                        });
                    });
                });
                break;
            case 'menu':
                dt.forEach(function(obj, index) {
                    p = '<div class="dCategory ' + obj._id + '">' +
                        '<div class="dProduct" path="' + obj.path + '" id="' + obj._id + '">' +
                        '<p><span>' + obj.people.displayname + '</span><span>' + obj.dateVN + '<img style="display: ' + ((obj.live == true) ? 'block' : 'none') + '" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: ' + ((obj.live == false) ? 'block' : 'none') + '" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                        '<div class="dOption">' +
                        '<span class="sEditMenu"><img src="' + SKIN + '/admin/edit.png" alt="wsup3"/></span>' +
                        '<span class="sTrash"><img src="' + SKIN + '/admin/trash.png" alt="wsup3"/><img src="' + SKIN + '/admin/trashY.png" alt="wsup3"/></span>' +
                        '</div><div class="dInfo">' +
                        '<a target="_blank"><img src="' + ((obj.hasOwnProperty('imgs') == true && obj.imgs.hasOwnProperty(0) == true)? ((obj.imgs[0] != null)? obj.imgs[0]: SKIN + '/logo.png'): SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                        '<p>' + obj.title + '</p>' +
                        '<p>' + obj.path + '</p>' +
                        '</div></div></div>';
                    $('#fMenus').append(p).find('.dInfo > a img').each(function(){
                        $(this).load(function(){
                            align.topleft($(this), $(this).parent(), 0, 0, 1);
                        });
                    });
                });
                break;
            case 'flag':
                dt.forEach(function(obj, index) {
                    p = '<div class="dCategory ' + obj._id + '">' +
                        '<div class="dProduct" id="' + obj._id + '">' +
                        '<p><span></span><span>' + obj.createdVN + '<img class="iOnLang" lang="'+obj.id+'" style="display: ' + ((obj.active == true) ? 'block' : 'none') + '" change="false" src="'+SKIN+'/admin/fresh.png" alt="wsup3"/><img class="iOnLang" lang="'+obj.id+'" style="display: ' + ((obj.active == false) ? 'block' : 'none') + '" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
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
            case 'customer':
            case 'people':
                dt.forEach(function(obj, index) {
                    p = '<div class="dCategory ' + obj._id + '">' +
                        '<div class="dProduct" id="' + obj._id + '">' +
                        '<p><span>' + ((obj.hasOwnProperty('displayname') && obj.displayname != '') ? obj.displayname : obj.fullname) + '</span><span>' + obj.dateVN + '<img style="display: ' + ((obj.active == true) ? 'block' : 'none') + '" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: ' + ((obj.active == false) ? 'block' : 'none') + '" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                        '<div class="dOption">' +
                        '<span class="'+((me.attr('type')=='people')? 'sEditUser': 'sEditCustomer')+'"><img src="' + SKIN + '/admin/edit.png" alt="wsup3"/></span>' +
                        '<span class="sTrashUser"><img src="' + SKIN + '/admin/trash.png" alt="wsup3"/><img src="' + SKIN + '/admin/trashY.png" alt="wsup3"/></span>' +
                        '</div><div class="dInfo">' +
                        '<a target="_blank"><img src="' + ((obj.hasOwnProperty('image') && obj.image != '') ? obj.image : SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                        '<p>' + obj.email + '</p>' +
                        '<p>' + ofGroup(obj) + '</p>' +
                        '<p>' + ((typeof(obj.phone)!='undefined')? obj.phone: '') + '</p>' +
                        '</div></div></div>';
                    $('#'+((me.attr('type')=='people')? 'fUsers': 'fCustomers')).append(p).find('.dInfo > a img').each(function(){
                        $(this).load(function(){
                            align.topleft($(this), $(this).parent(), 0, 0, 1);
                        });
                    });
                });
                break;
            case 'order':
                temp = {};
                $.each(dt, function(k, obj){
                    temp[obj._id] = web.done(temp[obj._id], []);
                    temp[obj._id].push(obj);
                });
                $.each(temp, function(_id, o){
//                    total = 0;
//                    $.each(o, function(k, obj){
//                        total += parseInt(obj.content.params['gia-ban'].detail[0])*parseInt(obj.product.number);
//                    });
                    p = '<div class="dCategory ' + _id + '">' +
                        '<div class="dProduct" id="' + _id + '">' +
                        '<p><span>' + o[0].people.email + '</span><span>' + o[0].dateVN + '<img style="display: ' + ((o[0].live == true) ? 'block' : 'none') + '" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: ' + ((o[0].live == false) ? 'block' : 'none') + '" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                        '<div class="dOption">' +
                        '<span class="sTrashOrder"><img src="' + SKIN + '/admin/trash.png" alt="wsup3"/><img src="' + SKIN + '/admin/trashY.png" alt="wsup3"/></span>' +
                        '</div><div class="dInfo">' +
                        '<a target="_blank"><img src="' + ((typeof(o[0].people.image)!='undefined')? o[0].people.image: SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                        '<p><span>Họ tên: ' + o[0].people.fullname + '</span></p>' +
                        '<p><span>Số điện thoại: ' + o[0].people.phone + '</span></p>' +
                        '<p><span>' + ((typeof(o[0].people.address)!='undefined')? 'Địa chỉ: '+o[0].people.address: '') + '</span></p>' +
                        '<p><span>' + ((typeof(o[0].params)!='undefined')? 'Yêu cầu: '+o[0].params.require: '') + '</span></p>' +
//                        '<p><span>Tổng tiền: ' + sep_price2(String(total)) + ' Đ</span></p>' +
                        '</div></div>';
                    $.each(o, function(k, obj){
                        p += '<div class="dCategory dChildCategory ' + obj.product._id + '">' +
                            '<div class="dProduct" id="' + obj.product._id + '">' +
                            '<div class="dOption">' +
                            '<span class="sTrashProduct"><img src="' + SKIN + '/admin/trash.png" alt="wsup3"/><img src="' + SKIN + '/admin/trashY.png" alt="wsup3"/></span>' +
                            '</div><div class="dInfo">' +
                            '<a target="_blank" href="' + BASEURL + '/' + obj.content.path + '"><img src="' + ((obj.content.imgs.hasOwnProperty(0) == true) ? ((typeof(obj.content.imgs[0])=='object')? ((obj.content.imgs[0]!=null)? obj.content.imgs[0]: SKIN + '/logo.png'): obj.content.imgs[0]) : SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                            '<p><span>' + obj.content.title + '</span></p>' +
                            '<p><span>Số lượng: ' + obj.product.number + '</span></p>' +
//                            '<p><span>Đơn giá: ' + sep_price2(String(obj.content.params['gia-ban'].detail[0])) + ' Đ</span></p>' +
                            '</div></div></div>';
                    });
                    p += '</div>';
                    $('#fOrder').append(p);
                });
                break;
            case 'subscription':
                $.each(dt, function(index, obj){
                    p = '<div class="dCategory ' + obj._id + '">' +
                        '<div class="dProduct" id="' + obj._id + '">' +
                        '<p><span>' + obj.email + '</span><span>' + obj.dateVN + '<img style="display: ' + ((obj.live == true) ? 'block' : 'none') + '" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: ' + ((obj.live == false) ? 'block' : 'none') + '" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                        '<div class="dOption">' +
                        '<span class="sTrashContact"><img src="' + SKIN + '/admin/trash.png" alt="wsup3"/><img src="' + SKIN + '/admin/trashY.png" alt="wsup3"/></span>' +
                        '</div><div class="dInfo">' +
                        '<a target="_blank"><img src="' + ((typeof(obj.content.imgs[0])=='object')? obj.content.imgs[0]: SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                        '<p><span>Sản phẩm: ' + obj.content.title + '</span></p>' +
                        '<p><span>Số điện thoại: ' + obj.phone + '</span></p>' +
                        '</div></div></div>';
                    $('#fSubscription').append(p);
                });
                break;
            case 'contact':
                $.each(dt, function(index, obj){
                    p = '<div class="dCategory ' + obj._id + '">' +
                        '<div class="dProduct" id="' + obj._id + '">' +
                        '<p><span>' + ((typeof(obj.fullname)!='undefined')? obj.fullname: obj.email) + '</span><span>' + obj.dateVN + '<img style="display: ' + ((obj.live == true) ? 'block' : 'none') + '" change="false" src="' + SKIN + '/admin/fresh.png" alt="wsup3"/><img style="display: ' + ((obj.live == false) ? 'block' : 'none') + '" change="true" src="' + SKIN + '/admin/nofresh.png" alt="wsup3"/></span></p>' +
                        '<div class="dOption">' +
                        '<span class="sTrashContact"><img src="' + SKIN + '/admin/trash.png" alt="wsup3"/><img src="' + SKIN + '/admin/trashY.png" alt="wsup3"/></span>' +
                        '</div><div class="dInfo">' +
                        '<a target="_blank"><img src="' + SKIN + '/logo.png' + '" alt="wsup3"/></a>' +
                        '<p>' + obj.email + '</p>' +
                        '<p><span>' + obj.title + '</span></p>' +
                        '<p>' + obj.detail + '</p>' +
                        '</div></div></div>';
                    $('#fContact').append(p).find('.dInfo > a img').each(function(){
                        $(this).load(function(){
                            align.topleft($(this), $(this).parent(), 0, 0, 1);
                        });
                    });
                });
                break;
        }
        if(dt.length<9 && me.attr('type') != 'mfriend' && me.attr('type') != 'friend')
            me.fadeOut(250);
        else
            me.fadeIn(250);
    });
});
function ofGroup(obj)
{
    switch (obj.class) {
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
function getInfoList(result) {
    if ($('.dBoardAudios .sBtnMore').prev().find('.dCategory').length < 1)
        audios = undefined;
    if (typeof (audios) == 'undefined') {
        audios = result.list;
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
            }
        });
    }
    else
        audios = audios.concat(result.list);
    audio.setPlaylists(audios, function (params) {
        //if(audios.length<16)
        //    web.iReq({action: 'iCreateListMusic', list: audios}, function(dt){
        //        params.controls.frameAudio.attr('ready', 1);
        //        params.src = dt;
        //        if(params.player.currentTime>0 || params.src != params.player.src)
        //        {
        //            audio.stop();
        //            audio.play();
        //        }
        //    });
    });
}
$('#fAddProduct .fCats .dCat label').live('click', function () {
    $(this).toggleClass('lChecked');
    if ($('#fAddProduct .fCats .lChecked').length == 0)
        $('#fAddProduct .fCats label.error').html(tran('Mời bạn chọn chuyên mục|Choose a category, please|Пожалуйста, выберите категорию|请选择一个类别|カテゴリを選択してください。')).css('display', 'block');
    else
        $('#fAddProduct .fCats label.error').html('').css('display', 'none');
});
$('#fAddCategory .fCats label').live('click', function () {
    $('#fAddCategory .fCats label').removeClass('lChecked');
    $('#fAddCategory .fCats').find('.sCatChecked');
    $(this).addClass('lChecked');
});
rules = {}, messages = {};
$.each(flags, function(key, value){
    rules['title'+key] = {required: true, minlength: 2, maxlength: 1000};
    messages['title'+key] = {
        required: tran("Mời bạn nhập tên nội dung "+value+"|Enter "+value+" content name, please|Введите имя "+value+" содержимого, пожалуйста|请输入"+value+"内容名称|"+value+"コンテンツ名を入力してください"),
        minlength: tran("Tên nội dung "+value+" quá ngắn, tối thiểu 2 ký tự|"+value+" content name too short, min 2 characters|"+value+" cодержание имени слишком коротким, мин 2 символов|"+value+"内容名称太短，最少2个字符|"+value+"コンテンツ名が短すぎます（最小2文字）"),
        maxlength: tran("Tên nội dung "+value+" quá dài, tối đa 1000 ký tự|"+value+" content name too long, max 1000 characters|"+value+" cодержание слишком длинное имя, максимум 1000 символов|"+value+"内容名称过长，最多1000个字符|"+value+"コンテンツ名が長すぎます（最大1000文字）")
    };
});
$("#fAddProduct").validate({
    rules: rules,
    messages: messages,
    submitHandler: function(){
        submit = true;
        $('.'+backmap.see().page+' label.error').each(function(){
            if($(this).css('display')=='block')
                submit = false;
        });
        if(submit == true)
            saveContent('post');
    }
});
$("#fAddCategory").validate({
    rules: rules,
    messages: messages,
    submitHandler: function(){
        submit = true;
        $('.'+backmap.see().page+' label.error').each(function(){
            if($(this).css('display')=='block')
                submit = false;
        });
        if(submit == true)
            saveContent('term');
    }
});
$("#fAddPage").validate({
    rules: rules,
    messages: messages,
    submitHandler: function(){
        submit = true;
        $('.'+backmap.see().page+' label.error').each(function(){
            if($(this).css('display')=='block')
                submit = false;
        });
        if(submit == true)
            saveContent('page');
    }
});
rules = {}, messages = {};
$.each(flags, function(key, value){
    rules['name'+key] = {required: true, minlength: 2, maxlength: 1000};
    messages['name'+key] = {
        required: tran("Mời bạn nhập tên đặc điểm "+value+"|Enter "+value+" content name, please|Введите имя "+value+" содержимого, пожалуйста|请输入"+value+"内容名称|"+value+"コンテンツ名を入力してください"),
        minlength: tran("Tên đặc điểm "+value+" quá ngắn, tối thiểu 2 ký tự|"+value+" feature name too short, min 2 characters|"+value+" Функция имени слишком коротким, мин 2 символов|"+value+"功能名称太短，最少2个字符|"+value+"機能名が短すぎます。最小2文字"),
        maxlength: tran("Tên đặc điểm "+value+" quá dài, tối đa 1000 ký tự|"+value+" feature name too long, max 1000 characters|"+value+" Функция слишком длинное имя, максимум 1000 символов|"+value+"功能名称太长，最多1000个字符|"+value+"機能名が長すぎます（最大1000文字）")
    };
});
$("#fAddFeature").validate({
    rules: rules,
    messages: messages,
    submitHandler: function(){
        submit = true;
        $('.'+backmap.see().page+' label.error').each(function(){
            if($(this).css('display')=='block')
                submit = false;
        });
        if(submit == true)
            saveContent('feature');
    }
});
rules = {}, messages = {};
$.each(flags, function(key, value){
    rules['name'+key] = {required: true, minlength: 2, maxlength: 1000};
    messages['name'+key] = {
        required: tran("Mời bạn nhập tên trình đơn "+value+"|Enter "+value+" content name, please|Введите имя "+value+" содержимого, пожалуйста|请输入"+value+"内容名称|"+value+"コンテンツ名を入力してください"),
        minlength: tran("Tên trình đơn "+value+" quá ngắn, tối thiểu 2 ký tự|"+value+" menu name too short, min 2 characters|"+value+" Функция имени слишком коротким, мин 2 символов|"+value+"功能名称太短，最少2个字符|"+value+"機能名が短すぎます。最小2文字"),
        maxlength: tran("Tên trình đơn "+value+" quá dài, tối đa 1000 ký tự|"+value+" menu name too long, max 1000 characters|"+value+" Функция слишком длинное имя, максимум 1000 символов|"+value+"功能名称太长，最多1000个字符|"+value+"機能名が長すぎます（最大1000文字）")
    };
});
$("#fAddMenu").validate({
    rules: rules,
    messages: messages,
    submitHandler: function(){
        submit = true;
        $('.'+backmap.see().page+' label.error').each(function(){
            if($(this).css('display')=='block')
                submit = false;
        });
        if(submit == true)
            saveContent('menu');
    }
});
rules = {}, messages = {};
$.each(flags, function(key, value){
    rules['name'+key] = {required: true, minlength: 2, maxlength: 1000};
    messages['name'+key] = {
        required: tran("Mời bạn nhập tên ngôn ngữ "+value+"|Enter "+value+" flag name, please|Введите название "+value+" языка, пожалуйста|请输入"+value+"语言名称|"+value+"言語名を入力してください"),
        minlength: tran("Tên ngôn ngữ "+value+" quá ngắn, tối thiểu 2 ký tự|"+value+" flag name too short, min 2 characters|"+value+" языка название слишком коротким, мин 2 символов|"+value+"语言名称太短，最少2个字符|"+value+"言語名が短すぎます（最小2文字）"),
        maxlength: tran("Tên ngôn ngữ "+value+" quá dài, tối đa 1000 ký tự|"+value+" flag name too long, max 1000 characters|"+value+" Языка название слишком длинное, максимум 1000 символов|"+value+"语言名称太长，最多1000个字符|"+value+"言語名が長すぎます（最大1000文字）")
    };
});
$("#fAddUser").validate({
    rules: {
        displayname: {required: true, minlength: 2, maxlength: 64},
        email: {required: true, email: true}
    },
    messages: {
        displayname: {
            required: tran("Mời bạn nhập tên hiển thị|Please enter your display name|Пожалуйста, введите ваше отображаемое имя|请输入您的显示名称|表示名を入力してください"),
            minlength: tran("Tên hiển thị quá ngắn, tối thiểu 2 ký tự|Display name too short, min 2 characters|Oтображать имя слишком коротким, минимум 2 символов|显示名称太短，最少2个字符|表示名が短すぎます。最小2文字"),
            maxlength: tran("Tên hiển thị quá dài, tối đa 64 ký tự|Display name too long, max 64 characters|Отображаемое имя слишком длинное, до 64 символов|显示名称太长，最多64个字符|表示名が長すぎます（最大64文字）")
        },
        email: {
            required: tran("Mời bạn nhập email|Please enter your email|Пожалуйста, введите ваш emai|请输入您的电子邮件|あなたのメールアドレスを入力してください"),
            email:tran("Địa chỉ email không hợp lệ|Please enter your email|Пожалуйста введите ваш e-mail|请输入您的电子邮件|あなたのメール アドレスを入力してください。")
        }
    },
    submitHandler: function(){
        submit = true;
        $('.'+backmap.see().page+' label.error').each(function(){
            if($(this).css('display')=='block')
                submit = false;
        });
        if(submit == true)
            saveUser();
    }
});
$("#fAddCustomer").validate({
    rules: {
        fullname: {required: true, minlength: 2, maxlength: 64},
        email: {required: true, email: true}
    },
    messages: {
        fullname: {
            required: tran("Mời bạn nhập họ tên|Please enter your fullname|Пожалуйста, введите ваше отображаемое имя|请输入您的显示名称|表示名を入力してください"),
            minlength: tran("Họ tên quá ngắn, tối thiểu 2 ký tự|Fullname too short, min 2 characters|Oтображать имя слишком коротким, минимум 2 символов|显示名称太短，最少2个字符|表示名が短すぎます。最小2文字"),
            maxlength: tran("Họ tên quá dài, tối đa 64 ký tự|Fullname too long, max 64 characters|Отображаемое имя слишком длинное, до 64 символов|显示名称太长，最多64个字符|表示名が長すぎます（最大64文字）")
        },
        email: {
            required: tran("Mời bạn nhập email|Please enter your email|Пожалуйста, введите ваш emai|请输入您的电子邮件|あなたのメールアドレスを入力してください"),
            email:tran("Địa chỉ email không hợp lệ|Please enter your email|Пожалуйста введите ваш e-mail|请输入您的电子邮件|あなたのメール アドレスを入力してください。")
        }
    },
    submitHandler: function(){
        submit = true;
        $('.'+backmap.see().page+' label.error').each(function(){
            if($(this).css('display')=='block')
                submit = false;
        });
        if(submit == true)
            saveUser();
    }
});
rules['id'] = {required: true, minlength: 2, maxlength: 6};
messages['id'] = {
    required: tran("Mời bạn nhập mã ngôn ngữ|Enter flag code, please|Пожалуйста введите код языка,|请输入语言代码|言語コードを入力してください"),
    minlength: tran("Mã ngôn ngữ quá ngắn, tối thiểu 2 ký tự|Language code too short, min 2 characters|Код языка слишком коротким, мин 2 символов|语言代码太短，最少2个字符|言語コードが短すぎます（最小2文字）"),
    maxlength: tran("Mã ngôn ngữ quá dài, tối đa 1000 ký tự|Language code too long, max 1000 characters|Код языка слишком долго, Макс 1000 символов|语言代码太长，最多1000个字符|言語コードが長すぎます（最大1000文字）")
};
$("#fAddLanguage").validate({
    rules: rules,
    messages: messages,
    submitHandler: function(){
        submit = true;
        $('.'+backmap.see().page+' label.error').each(function(){
            if($(this).css('display')=='block')
                submit = false;
        });
        if(submit == true)
            saveLanguage();
    }
});
$("#fMessageUser").validate({
    rules: {
        email: {required: true, email: true},
        title: {required: true, minlength: 6, maxlength: 255}
    },
    messages: {
        email: {
            required: tran("Mời bạn nhập email|Please enter your email|Пожалуйста, введите ваш emai|请输入您的电子邮件|あなたのメールアドレスを入力してください"),
            email:tran("Địa chỉ email không hợp lệ|Please enter your email|Пожалуйста введите ваш e-mail|请输入您的电子邮件|あなたのメール アドレスを入力してください。")
        },
        title: {
            required: tran("Mời bạn nhập tiêu đề|Please enter title|Введите название|请输入标题|タイトルを入力してください"),
            minlength: tran("Tiêu đề quá ngắn, tối thiểu 6 ký tự|Title too short, min 6 characters|Oтображать имя слишком коротким, минимум 6 символов|标题太短，最少6个字符|表示名が短すぎます。最小6文字"),
            maxlength: tran("Tiêu đề quá dài, tối đa 255 ký tự|Title too long, max 255 characters|Отображаемое имя слишком длинное, до 255 символов|显示名称太长，最多64个字符|表示名が長すぎます（最大255文字）")
        }
    },
    submitHandler: function(){
        submit = true;
        $('.'+backmap.see().page+' label.error').each(function(){
            if($(this).css('display')=='block')
                submit = false;
        });
        if(submit == true)
            if ($('img.iCheck').css('display') =='inline-block')
                $('img.iReady').fadeIn(200, function(){
                    $('img.iCheck').fadeOut(200);
                });
            else
                web.iReq({action: 'iSendGift', email: $('.dBoardMessageUser #iEmail' ).val(), title: $('.dBoardMessageUser #iTitle' ).val(), detail: CKEDITOR.instances['message'].getData()}, function(dt){
                    changePage($('.dBoardUsers'), 'dShow', {fn: function(){
                        backmap.add({page: 'dBoardUsers', action: {fn: function(){
                            $('.aAccept').fadeOut(300);
                            $('.aCustomBtn').fadeIn(300);
                            $('img.iCheck').fadeIn(200, function(){
                                $('img.iReady').fadeOut(200);
                            });
                            $('#fMessageUser #iEmail').val('');
                            $('#fMessageUser #iTitle').val('');
                            CKEDITOR.instances['message'].setData('');
                        }, params: {}}});
                    }, params: {}});
                });
    }
});
$("#fChange").validate({
    rules: {
        pw: {required: true, minlength: 4, maxlength: 32},
        newPw: {required: true, minlength: 4, maxlength: 32},
        reNewPw: {equalTo: '#fChange #iNewPw'}
    },
    messages: {
        pw: {
            required: tran("Mời bạn nhập Mật khẩu cũ|Please enter your old password|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            minlength: tran("Mật khẩu cũ quá ngắn, tối thiểu 4 ký tự|Old password too short, min 4 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            maxlength: tran("Mật khẩu cũ quá dài, tối đa 32 ký tự|Old password too long, max 32 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。")
        },
        newPw: {
            required: tran("Mời bạn nhập Mật khẩu mới|Please enter your new password|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            minlength: tran("Mật khẩu mới quá ngắn, tối thiểu 4 ký tự|New password too short, min 4 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。"),
            maxlength: tran("Mật khẩu mới quá dài, tối đa 32 ký tự|New password too long, max 32 characters|Пожалуйста, введите ваш пароль|请输入您的密码|あなたのパスワードを入力してください。")
        },
        reNewPw: {
            equalTo: tran("Nhập lại mật khẩu mới không đúng|Re-enter your new password wrong|Пожалуйста, введите ваш пароль|请重新输入您的密码|あなたのパスワードを再入力してください。")
        }
    },
    submitHandler: function(){
        if(people.pw == $.md5($('#fChange #iPw').val()))
        {
            submit = true;
            $('.'+backmap.see().page+' label.error').each(function(){
                if($(this).css('display')=='block')
                    submit = false;
            });
            if(submit == true)
                if ($('img.iCheck').css('display') =='inline-block')
                    $('img.iReady').fadeIn(200, function(){
                        $('img.iCheck').fadeOut(200);
                    });
                else
                    web.iReq({action: 'iChangePw', pw: $('#fChange #iPw' ).val(), newPw: $('#fChange #iNewPw' ).val()}, function(dt){
                        changePage($('.dBoardAccount'), 'dShow', {fn: function(){
                            backmap.add({page: 'dBoardAccount', action: {fn: function(){
                                $('.aAccept').fadeOut(300);
                                $('img.iCheck').fadeIn(200, function(){
                                    $('img.iReady').fadeOut(200);
                                });
                                people.pw = $.md5($('#fChange #iNewPw').val());
                                window.localStorage.setItem('people', JSON.stringify(people));
                            }, params: {}}});
                        }, params: {}});
                    });
        }
        else
        if($('#fChange #iPw').next('label.error').length == 0)
            $('#fChange #iPw').after('<label for="iPw" generated="true" class="error">' + tran('Mật khẩu cũ không đúng|Old password is wrong|||') + '</label>');
        else
            $('#fChange #iPw').next('label.error').text(tran('Mật khẩu cũ không đúng|Old password is wrong|||')).css('display', 'block');
    }
});
$('.aAdvance').toggle(function(){
    $(this).prev().animate({height: $(this).prev().find('div').height()+'px'}, 250);
}, function(){
    $(this).prev().animate({height: '0px'}, 250);
});
$('.dBoardSell .aDelPro').live('click', function(){
    if($(this).css('color')=='rgb(255, 0, 0)')
        $(this).parent().parent().fadeOut(300, function(){
            $(this).remove();
            total = 0;
            $('.dBoardSell .lPrice span').each(function(){
                total += parseInt($(this).text().replace(/\,/g, ""));
            });
            $('.dBoardSell .pTotal:eq(0) span').text(sep_price2(String(total)));
            if($('.dBoardSell .pFinal .iPromotion').val()=='-')
                $('.dBoardSell .pTotal:eq(1) span').text(sep_price2(String(parseInt($('.dBoardSell .pTotal:eq(0) span').text().replace(/\,/g, ""))-parseInt($('.dBoardSell .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
            else
                $('.dBoardSell .pTotal:eq(1) span').text(sep_price2(String(parseInt($('.dBoardSell .pTotal:eq(0) span').text().replace(/\,/g, ""))-(parseInt($('.dBoardSell .pTotal:eq(0) span').text().replace(/\,/g, ""))*$('.dBoardSell .pFinal .iPromotionVal').val()/100))));
        });
    else
        $(this).animate({color: 'rgb(255, 0, 0)'}, 200);
});
$('.dBoardImport .aDelPro').live('click', function(){
    if($(this).css('color')=='rgb(255, 0, 0)')
        $(this).parent().parent().fadeOut(300, function(){
            $(this).remove();
            total = 0;
            $('.dBoardImport .lPrice span').each(function(){
                total += parseInt($(this).text().replace(/\,/g, ""));
            });
            $('.dBoardImport .pTotal:eq(0) span').text(sep_price2(String(total)));
            if($('.dBoardImport .pFinal .iPromotion').val()=='-')
                $('.dBoardImport .pTotal:eq(1) span').text(sep_price2(String(parseInt($('.dBoardImport .pTotal:eq(0) span').text().replace(/\,/g, ""))-parseInt($('.dBoardImport .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
            else
                $('.dBoardImport .pTotal:eq(1) span').text(sep_price2(String(parseInt($('.dBoardImport .pTotal:eq(0) span').text().replace(/\,/g, ""))-(parseInt($('.dBoardImport .pTotal:eq(0) span').text().replace(/\,/g, ""))*$('.dBoardImport .pFinal .iPromotionVal').val()/100))));
        });
    else
        $(this).animate({color: 'rgb(255, 0, 0)'}, 200);
});
$('.aDelete').click(function(){
    switch(backmap.see().page) {
        case 'dBoardImages':
            if($('.dViewImg').attr('time')==1)
            {
                $('.dViewImg').attr('time', 0);
                if($('.iDelY').css('display')=='none')
                    $('.iDelY').fadeIn(200, function(){
                        $('.iDel').fadeOut(200, function(){
                            $('.dViewImg').attr('time', 1);
                        });
                    });
                else
                {
                    if($('.fImages .dItem').length>0)
                    {
                        $('.aDelete').attr('deleting', $('.dViewImg').attr('viewing'));
                        web.iReq({ action: 'iDeleteFile', id: $('.iViewImg').attr('_id'), site: $('.fImages .dItem:eq('+$('.dViewImg').attr('viewing')+') img').attr('site')}, function(dt){
                            if(dt.status == true)
                            {
                                $('.dViewImg').attr('time', 1);
                                if($('.aDelete').attr('deleting')!=0)
                                    $('.iPrev').trigger('click');
                                else
                                    $('.iNext').trigger('click');
                                $('.iDel').fadeIn(200, function(){
                                    if($('.aDelete').attr('deleting')!=0)
                                        $('.dItem:eq('+(parseInt($('.dViewImg').attr('viewing'))+1)+')').remove();
                                    else
                                    {
                                        $('.dItem:eq(0)').remove();
                                        $('.dViewImg').attr('viewing', 0);
                                    }
                                    $('.iDelY').fadeOut(200);
                                });
                            }
                        });
                    }
                    else
                        $('.aDelete').fadeOut(290);
                }
            }
            break;
        case 'dBoardAudios':
            if($('.dViewAudio').attr('time')==1)
            {
                $('.dViewAudio').attr('time', 0);
                if($('.iDelY').css('display')=='none')
                    $('.iDelY').fadeIn(200, function(){
                        $('.iDel').fadeOut(200, function(){
                            $('.dViewAudio').attr('time', 1);
                        });
                    });
                else
                {
                    web.iReq({action: 'iDeleteFile', id: $('.dAudio:eq('+$('.dPlayer').attr('playing')+')').attr('id'), site: $('.dAudio:eq('+$('.dPlayer').attr('playing')+') a').attr('title')}, function(dt){
                        if(dt.status == true)
                        {
                            $('.dViewAudio').attr('time', 1);
                            $('.iDel').fadeIn(200, function(){
                                $('.iDelY').fadeOut(200);
                            });
                        }
                        playlist.splice($('.dPlayer').attr('playing'), 1);
                        $('.dViewAudio').attr('time', 1);
                        $('div.'+$('.dAudio:eq('+$('.dPlayer').attr('playing')+')').attr('id')).remove();
                        $('.dPlayer').attr('playing', 0);
                        $('.aCloseAudio').trigger('click');
                    });
                }
            }
            break;
        case 'dBoardVideos':
            if($('.dViewVideo').attr('time')==1)
            {
                $('.dViewVideo').attr('time', 0);
                if($('.iDelY').css('display')=='none')
                    $('.iDelY').fadeIn(200, function(){
                        $('.iDel').fadeOut(200, function(){
                            $('.dViewVideo').attr('time', 1);
                        });
                    });
                else
                {
                    web.iReq({action: 'iDelVideo', id: $('.dViewVideo > div').attr('idVideo'), people: JSON.parse(window.localStorage.getItem('people'))}, function(dt){
                        if(dt.status == true)
                        {
                            buildApiRequest('DELETE', '/youtube/v3/videos', {'id': $('.dViewVideo > div').attr('idVideo'), 'onBehalfOfContentOwner': ''});
                            $('.dViewVideo').attr('time', 1);
                            $('.iDel').fadeIn(200, function(){
                                $('.iDelY').fadeOut(200);
                            });
                        }
                        $('.dViewVideo').attr('time', 1);
                        $('#'+$('.dViewVideo > div').attr('idVideo')).remove();
                        $('.aCloseVideo').trigger('click');
                    });
                }
            }
            break;
    }
});
$('.aCloseView').click(function(){
    $('.iDel').fadeIn(200, function(){
        $('.iDelY').fadeOut(200);
    });
    $('.dBgImg, .dViewImg, .aDelete').fadeOut(200, function(){
        $('.dViewImg').css('opacity', 0);
        $('.dViewing').removeClass('dViewing');
    });
});
$('.iNext').click(function(){
    if($('.dViewImg').attr('time')==1 && $('.dViewImg').attr('viewing')!=$('.dItem > div').length-1)
    {
        $('.dViewImg').attr({time: 0, viewing: parseInt($('.dViewImg').attr('viewing'))+1});
        $('.iViewImg').fadeTo(200, 0, function () {
            $(this).attr({_id: $('.dItem > div:eq('+$('.dViewImg').attr('viewing')+')').find('img').attr('_id'), src: $('.dItem > div:eq('+$('.dViewImg').attr('viewing')+')').find('img').attr('src'), title: $('.dItem > div:eq('+$('.dViewImg').attr('viewing')+')').find('img').attr('title')}).css('width', 'auto');
            if($(this).width()>$('.dViewImg').width())
                $(this).css('width', '100%');
            ver_center($('.iViewImg'), 'all', 0, 1);
            $('.dViewImg').fadeTo(200, 1, function(){
                $('.dViewImg').attr('time', 1);
            });
        });
    }
    $('.iDel').fadeIn(200, function(){
        $('.iDelY').fadeOut(200);
    });
});
$('.iPrev').click(function(){
    if($('.dViewImg').attr('time')==1 && $('.dViewImg').attr('viewing')!=0)
    {
        $('.dViewImg').attr({time: 0, viewing: parseInt($('.dViewImg').attr('viewing'))-1});
        $('.iViewImg').fadeTo(200, 0, function(){
            $(this).attr({_id: $('.dItem > div:eq('+$('.dViewImg').attr('viewing')+')').find('img').attr('_id'),src: $('.dItem > div:eq('+$('.dViewImg').attr('viewing')+')').find('img').attr('src'), title: $('.dItem > div:eq('+$('.dViewImg').attr('viewing')+')').find('img').attr('title')}).css('width', 'auto');
            if($(this).width()>$('.dViewImg').width())
                $(this).css('width', '100%');
            ver_center($('.iViewImg'), 'all', 0, 1);
            $('.dViewImg').fadeTo(200, 1, function(){
                $('.dViewImg').attr('time', 1);
            });
        });
    }
    $('.iDel').fadeIn(200, function(){
        $('.iDelY').fadeOut(200);
    });
});
$('.aMinFeature').live('click', function(){
    if($(this).parent().parent().height()==30)
    {
        $(this).parent().parent().animate({height: $(this).parent().height()+'px'}, 250, function(){
            $(this).css('height', 'auto')
        });
        $(this).find('.fa-plus').removeClass('fa-plus').addClass('fa-minus');
    }
    else
    {
        $(this).parent().parent().animate({height: '30px'}, 250);
        $(this).find('.fa-minus').removeClass('fa-minus').addClass('fa-plus');
    }
});
$('.dBoardProducts .sCats').live('change', function(){
    $('#fProducts').html('');
    $('.dBoardProducts .sBtnMore').trigger('click');
});
$('.aGift').live('click', function(){
    me = $(this);
    changePage($('.dBoardMessageUser'), 'dShow', {fn: function(){
        backmap.add({page: 'dBoardMessageUser', action: {fn: function(){
            $('.aCustomBtn').fadeOut(300);
            $('.aAccept').fadeIn(300);
            $('#fMessageUser #iEmail').val(me.attr('email'));
            if(typeof(CKEDITOR.instances['message'])=='undefined')
            {
                ck = CKEDITOR.replace('message');
                addBtnCke(ck);
            }
            $('#fMessageUser #iEmail').css('width', $('#fMessageUser .dLine').width()-5-$('#fMessageUser [for=iEmail]').width()+'px');
            $('#fMessageUser #iTitle').css('width', $('#fMessageUser .dLine').width()-5-$('#fMessageUser [for=iTitle]').width()+'px');
        }, params: {}}});
    }, params: {}});
});
$('.dAppLogout').click(function(){
    window.localStorage.removeItem('people');
    window.localStorage.removeItem('flags');
    window.location.assign(BASEURL+'/admin/vi/people/login');
});