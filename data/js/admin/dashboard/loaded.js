$('.aScreens').live('dblclick', function () {
    me = $(this);
    web.iReq({ action: 'wAccessScreen', rers: me.parent().prev().find('.iTalkRers').val(), index: me.parent().parent().parent().index() }, function () { });
});
$('.aSendMess').live('click', function () {
    web.iReq({ action: 'wTalk', rers: $('.iChatRers').val(), mess: $('.dContentWriter').html() }, function (dt) {
        $('.dContentWriter').html('');
    });
});
//$('.aScreens').live('dblclick', function () {
//    me = $(this);
//    web.iReq({ action: 'wAccessScreens', rers: me.parent().prev().find('.iTalkRers').val(), index: me.parent().parent().parent().index() }, function () { });
//});
//$('.sTalk').live('dblclick', function () {
//    web.iReq({ action: 'wAccessUpdate', rers: $(this).prev().val() }, function () { });
//});

//$('.iLive').selectBox();
//$('.iGroup').selectBox();
//$('.iGender').selectBox();
$('.aMenu').live('click', function () {
    if ($('.iChatRers').val() != '')
        web.iReq({ action: 'wDone', rers: $('.iChatRers').val() }, function () { });
    tempTab = 'ck2';
    $('.aTabs').trigger('mouseup');
    location.hash = people._id + "¬hideBrowser¬" + $('.aMenu').attr('apping');
    changePage($('.dMainBoard'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dMainBoard', action: {
                    fn: function () {
                        $('.aCloseView, .aCloseVideo, .aCloseAudio').trigger('click');
                        $('img.iDel, img.iCheck').fadeIn(200, function () {
                            $('img.iDelY, img.iReady').fadeOut(200);
                        });
                        $('.aAccepts, .aTabs, .aSendMess, .aAccept, .lUpload, .aCustomBtn, .aExcel, .aProducts, .aRecordingVideo, .aVideoGallery, .aPauseRecordingVideo, .aSave, .aCamera, .aImages').fadeOut(300);
                        $('.dItem > div').die('click');
                        $('.dVideo, .dAudio').die('click');
                        $('.sItemChk').removeClass('sItemChk');
                        if (window.stream)
                            window.stream.getTracks().forEach(function (track) {
                                track.stop();
                            });
                        exitFullscreen();
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppAddProduct').live('click', function () {
    $.each(flags, function (key, value) {
        if (typeof (CKEDITOR.instances['ProDetail' + key]) == 'undefined') {
            ck = CKEDITOR.replace('ProDetail' + key);
            addBtnCke(ck);
        }
    });
    if (typeof (temp) == 'undefined')
        cleanContent('post');
    else {
        $.each(temp, function (key, value) {
            CKEDITOR.instances['ProDetail' + value.flag].setData(value.detail);
        });
        $('.aCustomBtn, .aExcel').fadeOut(300);
    }
    $('.dCat').css('display', 'block');
    $('.lChecked').removeClass('lChecked');
    if (typeof (temp) != 'undefined')
        $.each(temp[0].cats, function (key, value) {
            $('label[cat=' + value + ']').addClass('lChecked');
        });
    if ($('.dCat').length == 0)
        web.iReq({ action: 'iGetTerms' }, function (dt) {
            var count = 0;
            while (count < dt.length) {
                count = 0;
                $.each(dt, function (k, obj) {
                    if (typeof (obj) != 'undefined') {
                        p = '<div class="dCat ' + obj._id + '">' +
                            '<label cat="' + obj._id + '"><span class="sCat"></span><span class="sCatChecked"></span> ' + obj.title + '</label>' +
                            '</div>';
                        if (obj.cats.hasOwnProperty(0) == true && obj.cats[0] != null && obj.cats != 'undefined') {
                            if ($('.fCats .' + obj.cats[0]).length > 0) {
                                $('.fCats .' + obj.cats[0]).append(p);
                                delete dt[k];
                            }
                        }
                        else {
                            $('.fCats').append(p);
                            delete dt[k];
                        }
                    }
                    else
                        count++;
                });
            }
            if (typeof (temp) != 'undefined')
                $.each(temp[0].cats, function (key, value) {
                    $('label[cat=' + value + ']').addClass('lChecked');
                });
        });
    $('.dBoardAddProduct .dLanguages a:eq(0)').addClass('aLanguageActive');
    changePage($('.dBoardAddProduct'), 'dShow', {
        fn: function () {
            $.each(flags, function (key, value) {
                $('#iProTitle' + key).css('width', $('#fAddProduct .dLine').width() - 5 - $('[for=iProTitle' + key + ']').width() + 'px');
                $('#iProExcept' + key).css('width', $('#fAddProduct .dLine').width() - 5 - $('[for=iProExcept' + key + ']').width() + 'px');
            });
            add_tab("dBoardAddProduct .dLanguages a", "aLanguageActive", "dBoardAddProduct .dTabsLanguage", 100, 999e4, function () { });
            $('#fAddProduct #iPosition').css('width', $('#fAddProduct .dLine').width() - 5 - $('#fAddProduct [for=iPosition]').width() + 'px');
            $('#iProKeyword').css('width', $('#fAddProduct .dLine').width() - 5 - $('[for=iProKeyword]').width() + 'px');
            $('#iProDate').css('width', $('#fAddProduct .dLine').width() - 5 - $('[for=iProDate]').width() + 'px');
            $('#iProPath').css('width', $('#fAddProduct .dLine').width() - 5 - $('[for=iProPath]').width() + 'px');
            backmap.add({
                page: 'dBoardAddProduct', action: {
                    fn: function () {
                        if (typeof (temp) == 'undefined')
                            web.iReq({ action: 'iGetFeatures' }, function (dt) {
                                $.each(dt, function (k, v) {
                                    $('.dBoardAddProduct .aFeature').trigger('click');
                                });
                                $.each(dt, function (k, v) {
                                    $('.dFeatures .fFeature:eq(' + k + ') select').val(v.path);
                                    $('.dFeatures .fFeature:eq(' + k + ') select').next().find('span:eq(0)').text(v.title);
                                    $('.dFeatures .fFeature:eq(' + k + ') select').trigger('change');
                                    $('.dFeatures .fFeature:eq(' + k + ') .iFeatureValue').val((typeof (v.params['gia-tri-mac-dinh']) != 'undefined') ? v.params['gia-tri-mac-dinh'].detail : '');
                                });
                            });
                        $('.aAccept').fadeIn(300);
                        if (typeof (num) != 'undefined') {
                            for (temp2 = 1; temp2 <= num; temp2++) {
                                $('a.sFeatureName' + temp2 + ', a.sFeatureParent' + temp2 + ', a.sFeatureValue' + temp2).css('width', '0px');
                                $('a.sFeatureName' + temp2).css('width', $('a.sFeatureName' + temp2).parent().width() - 5 - $('[for=sFeatureName' + temp2 + ']').width() + 'px');
                                $('a.sFeatureParent' + temp2).css('width', $('a.sFeatureParent' + temp2).parent().width() - 5 - $('[for=sFeatureParent' + temp2 + ']').width() + 'px');
                                $('a.sFeatureValue' + temp2).css('width', $('a.sFeatureValue' + temp2).parent().width() - 5 - $('[for=sFeatureValue' + temp2 + ']').width() + 'px');
                                $('input.iFeatureValue' + temp2).css('width', $('input.iFeatureValue' + temp2).parent().width() - 5 - $('[for=iFeatureValue' + temp2 + ']').width() + 'px');
                                $('.sFeatureOpts' + temp2).css('width', $('.sFeatureOpts' + temp2).parent().width() - 5 - $('[for=sFeatureOpts' + temp2 + ']').width() + 'px');
                            }
                            $('#fAddProduct .aMinFeature').trigger('click');
                        }
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppAddLocProduct').live('click', function () {
    $.each(flags, function (key, value) {
        if (typeof (CKEDITOR.instances['ProLocDetail' + key]) == 'undefined') {
            ck = CKEDITOR.replace('ProLocDetail' + key);
            addBtnCke(ck);
        }
    });
    if (typeof (temp) == 'undefined')
        cleanContent('locpost');
    else {
        $.each(temp, function (key, value) {
            CKEDITOR.instances['ProLocDetail' + value.flag].setData(value.detail);
        });
        $('.aCustomBtn, .aExcel').fadeOut(300);
    }
    $('.dCat').css('display', 'block');
    $('.lChecked').removeClass('lChecked');
    if (typeof (temp) != 'undefined')
        $.each(temp[0].cats, function (key, value) {
            $('label[cat=' + value + ']').addClass('lChecked');
        });
    if ($('.dCat').length == 0)
        web.iReq({ action: 'iGetLocTerms' }, function (dt) {
            var count = 0;
            while (count < dt.length) {
                count = 0;
                $.each(dt, function (k, obj) {
                    if (typeof (obj) != 'undefined') {
                        p = '<div class="dCat ' + obj._id + '">' +
                            '<label cat="' + obj._id + '"><span class="sCat"></span><span class="sCatChecked"></span> ' + obj.title + '</label>' +
                            '</div>';
                        if (obj.cats.hasOwnProperty(0) == true && obj.cats[0] != null && obj.cats != 'undefined') {
                            if ($('.fCats .' + obj.cats[0]).length > 0) {
                                $('.fCats .' + obj.cats[0]).append(p);
                                delete dt[k];
                            }
                        }
                        else {
                            $('.fCats').append(p);
                            delete dt[k];
                        }
                    }
                    else
                        count++;
                });
            }
            if (typeof (temp) != 'undefined')
                $.each(temp[0].cats, function (key, value) {
                    $('label[cat=' + value + ']').addClass('lChecked');
                });
        });
    $('.dBoardAddLocProduct .dLanguages a:eq(0)').addClass('aLanguageActive');
    changePage($('.dBoardAddLocProduct'), 'dShow', {
        fn: function () {
            $.each(flags, function (key, value) {
                $('#iProTitle' + key).css('width', $('#fAddLocProduct .dLine').width() - 5 - $('[for=iProTitle' + key + ']').width() + 'px');
                $('#iProExcept' + key).css('width', $('#fAddLocProduct .dLine').width() - 5 - $('[for=iProExcept' + key + ']').width() + 'px');
            });
            add_tab("dBoardAddLocProduct .dLanguages a", "dBoardAddLocProduct .aLanguageActive", "dBoardAddLocProduct .dTabsLanguage", 100, 999e4, function () { });
            $('#fAddLocProduct #iPosition').css('width', $('#fAddLocProduct .dLine').width() - 5 - $('#fAddLocProduct [for=iPosition]').width() + 'px');
            $('#fAddLocProduct #iProKeyword').css('width', $('#fAddLocProduct .dLine').width() - 5 - $('#fAddLocProduct [for=iProKeyword]').width() + 'px');
            $('#fAddLocProduct #iProDate').css('width', $('#fAddLocProduct .dLine').width() - 5 - $('#fAddLocProduct [for=iProDate]').width() + 'px');
            $('#fAddLocProduct #iProPath').css('width', $('#fAddLocProduct .dLine').width() - 5 - $('#fAddLocProduct [for=iProPath]').width() + 'px');
            backmap.add({
                page: 'dBoardAddLocProduct', action: {
                    fn: function () {
                        if (typeof (temp) == 'undefined')
                            web.iReq({ action: 'iGetLocFeatures' }, function (dt) {
                                $.each(dt, function (k, v) {
                                    $('.dBoardAddLocProduct .aFeature').trigger('click');
                                });
                                $.each(dt, function (k, v) {
                                    $('.dFeatures .fFeature:eq(' + k + ') select').val(v.path);
                                    $('.dFeatures .fFeature:eq(' + k + ') select').next().find('span:eq(0)').text(v.title);
                                    $('.dFeatures .fFeature:eq(' + k + ') select').trigger('change');
                                    $('.dFeatures .fFeature:eq(' + k + ') .iFeatureValue').val((typeof (v.params['gia-tri-mac-dinh']) != 'undefined') ? v.params['gia-tri-mac-dinh'].detail : '');
                                });
                            });
                        $('.aAccept').fadeIn(300);
                        if (typeof (num) != 'undefined') {
                            for (temp2 = 1; temp2 <= num; temp2++) {
                                $('a.sFeatureName' + temp2 + ', a.sFeatureParent' + temp2 + ', a.sFeatureValue' + temp2).css('width', '0px');
                                $('a.sFeatureName' + temp2).css('width', $('a.sFeatureName' + temp2).parent().width() - 5 - $('[for=sFeatureName' + temp2 + ']').width() + 'px');
                                $('a.sFeatureParent' + temp2).css('width', $('a.sFeatureParent' + temp2).parent().width() - 5 - $('[for=sFeatureParent' + temp2 + ']').width() + 'px');
                                $('a.sFeatureValue' + temp2).css('width', $('a.sFeatureValue' + temp2).parent().width() - 5 - $('[for=sFeatureValue' + temp2 + ']').width() + 'px');
                                $('input.iFeatureValue' + temp2).css('width', $('input.iFeatureValue' + temp2).parent().width() - 5 - $('[for=iFeatureValue' + temp2 + ']').width() + 'px');
                                $('.sFeatureOpts' + temp2).css('width', $('.sFeatureOpts' + temp2).parent().width() - 5 - $('[for=sFeatureOpts' + temp2 + ']').width() + 'px');
                            }
                            $('#fAddLocProduct .aMinFeature').trigger('click');
                        }
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppProducts').click(function () {
    changePage($('.dBoardProducts'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardProducts', action: {
                    fn: function () {
                        if ($('.sCats option').length == 0)
                            web.iReq({ action: 'iGetTerms' }, function (dt) {
                                $('.sCats').append('<option value="">' + tran('Tất cả|All|||') + '</option>');
                                var count = 0;
                                while (count < dt.length) {
                                    count = 0;
                                    $.each(dt, function (k, obj) {
                                        if (typeof (obj) != 'undefined') {
                                            p = '<div class="dCat ' + obj._id + '">' +
                                                '<label cat="' + obj._id + '"><span class="sCat"></span><span class="sCatChecked"></span> ' + obj.title + '</label>' +
                                                '</div>';
                                            if (obj.cats.hasOwnProperty(0) == true && obj.cats[0] != null && obj.cats[0] != 'undefined') {
                                                if ($('optgroup.' + obj.cats[0]).length > 0) {
                                                    $('optgroup.' + obj.cats[0]).addClass('oGroup').append('<option value="' + obj._id + '">' + obj.title + '</option>');
                                                    $('optgroup.' + obj.cats[0]).after('<optgroup class="' + obj._id + '" label="' + obj.title + '"></optgroup>');
                                                    delete dt[k];
                                                }
                                            }
                                            else {
                                                $('.sCats').append('<option value="' + obj._id + '">' + obj.title + '</option><optgroup class="' + obj._id + '" label="' + obj.title + '"></optgroup>');
                                                delete dt[k];
                                            }
                                        }
                                        else
                                            count++;
                                    });
                                }
                                $('.sCats optgroup:not(.oGroup)').remove();
                                if (typeof (temp) != 'undefined')
                                    $.each(temp[0].cats, function (key, value) {
                                        $('label[cat=' + value + ']').addClass('lChecked');
                                    });
                                if ($('#fProducts').html() == '')
                                    $('.dBoardProducts .sBtnMore').trigger('click');
                            });
                        else
                            if ($('#fProducts').html() == '')
                                $('.dBoardProducts .sBtnMore').trigger('click');
                        $('.aCustomBtn').attr({ 'onClick': "$('.dAppAddProduct').trigger('click');", title: $('.dAppAddProduct a:eq(1)').text() }).fadeIn(300);
                        $('.aExcel').fadeIn(300);
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppLocProducts').click(function () {
    changePage($('.dBoardProducts'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardLocProducts', action: {
                    fn: function () {
                        if ($('.sCats option').length == 0)
                            web.iReq({ action: 'iGetTerms' }, function (dt) {
                                $('.sCats').append('<option value="">Tất cả</option>');
                                var count = 0;
                                while (count < dt.length) {
                                    count = 0;
                                    $.each(dt, function (k, obj) {
                                        if (typeof (obj) != 'undefined') {
                                            p = '<div class="dCat ' + obj._id + '">' +
                                                '<label cat="' + obj._id + '"><span class="sCat"></span><span class="sCatChecked"></span> ' + obj.title + '</label>' +
                                                '</div>';
                                            if (obj.cats.hasOwnProperty(0) == true && obj.cats[0] != null && obj.cats[0] != 'undefined') {
                                                if ($('optgroup.' + obj.cats[0]).length > 0) {
                                                    $('optgroup.' + obj.cats[0]).addClass('oGroup').append('<option value="' + obj._id + '">' + obj.title + '</option>');
                                                    $('optgroup.' + obj.cats[0]).after('<optgroup class="' + obj._id + '" label="' + obj.title + '"></optgroup>');
                                                    delete dt[k];
                                                }
                                            }
                                            else {
                                                $('.sCats').append('<option value="' + obj._id + '">' + obj.title + '</option><optgroup class="' + obj._id + '" label="' + obj.title + '"></optgroup>');
                                                delete dt[k];
                                            }
                                        }
                                        else
                                            count++;
                                    });
                                }
                                $('.sCats optgroup:not(.oGroup)').remove();
                                if (typeof (temp) != 'undefined')
                                    $.each(temp[0].cats, function (key, value) {
                                        $('label[cat=' + value + ']').addClass('lChecked');
                                    });
                                if ($('#fProducts').html() == '')
                                    $('.dBoardProducts .sBtnMore').trigger('click');
                            });
                        else
                            if ($('#fProducts').html() == '')
                                $('.dBoardProducts .sBtnMore').trigger('click');
                        $('.aCustomBtn').attr({ 'onClick': "$('.dAppAddProduct').trigger('click');", title: $('.dAppAddProduct a:eq(1)').text() }).fadeIn(300);
                        $('.aExcel').fadeIn(300);
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppAddCategory').click(function (e) {
    $('.dCat').css('display', 'block');
    if (typeof (temp) == 'undefined')
        cleanContent('term');
    else {
        $('.dCat.' + temp[0]._id).css('display', 'none');
        $('.lChecked').removeClass('lChecked');
        $('label[cat=' + temp[0].cats[0] + ']').addClass('lChecked');
        $('.aCustomBtn, .aExcel').fadeOut(300);
    }
    if ($('.dCat').length == 0)
        web.iReq({ action: 'iGetTerms' }, function (dt) {
            var count = 0;
            while (count < dt.length) {
                count = 0;
                $.each(dt, function (k, obj) {
                    if (typeof (obj) != 'undefined') {
                        p = '<div class="dCat ' + obj._id + '">' +
                            '<label cat="' + obj._id + '"><span class="sCat"></span><span class="sCatChecked"></span> ' + obj.title + '</label>' +
                            '</div>';
                        if (obj.cats.hasOwnProperty(0) == true && obj.cats[0] != null && obj.cats != 'undefined') {
                            if ($('.fCats .' + obj.cats[0]).length > 0) {
                                $('.fCats .' + obj.cats[0]).append(p);
                                delete dt[k];
                            }
                        }
                        else {
                            $('.fCats').append(p);
                            delete dt[k];
                        }
                    }
                    else
                        count++;
                });
            }
            if (typeof (temp) != 'undefined')
                $.each(temp[0].cats, function (key, value) {
                    $('label[cat=' + value + ']').addClass('lChecked');
                });
        });
    $('.dBoardAddCategory .dLanguages a:eq(0)').addClass('aLanguageActive');
    changePage($('.dBoardAddCategory'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardAddCategory', action: {
                    fn: function () {
                        $.each(flags, function (key, value) {
                            $('#iCatTitle' + key).css('width', $('#fAddCategory .dLine').width() - 5 - $('[for=iCatTitle' + key + ']').width() + 'px');
                            $('#iCatExcept' + key).css('width', $('#fAddCategory .dLine').width() - 5 - $('[for=iCatExcept' + key + ']').width() + 'px');
                        });
                        add_tab("dBoardAddCategory .dLanguages a", "aLanguageActive", "dBoardAddCategory .dTabsLanguage", 100, 999e4, function () { });
                        $('#fAddCategory #iPosition').css('width', $('#fAddCategory .dLine').width() - 5 - $('#fAddCategory  [for=iPosition]').width() + 'px');
                        $('#iCatKeyword').css('width', $('#fAddCategory .dLine').width() - 5 - $('[for=iCatKeyword]').width() + 'px');
                        $('#iCatDate').css('width', $('#fAddProduct .dLine').width() - 5 - $('[for=iCatDate]').width() + 'px');
                        $('#iCatPath').css('width', $('#fAddCategory .dLine').width() - 5 - $('[for=iCatPath]').width() + 'px');
                        $('.aAccept').fadeIn(300);
                        if (typeof (num) != 'undefined') {
                            for (temp2 = 1; temp2 <= num; temp2++) {
                                $('a.sFeatureName' + temp2 + ', a.sFeatureParent' + temp2 + ', a.sFeatureValue' + temp2).css('width', '0px');
                                $('a.sFeatureName' + temp2).css('width', $('a.sFeatureName' + temp2).parent().width() - 5 - $('[for=sFeatureName' + temp2 + ']').width() + 'px');
                                $('a.sFeatureParent' + temp2).css('width', $('a.sFeatureParent' + temp2).parent().width() - 5 - $('[for=sFeatureParent' + temp2 + ']').width() + 'px');
                                $('a.sFeatureValue' + temp2).css('width', $('a.sFeatureValue' + temp2).parent().width() - 5 - $('[for=sFeatureValue' + temp2 + ']').width() + 'px');
                                $('input.iFeatureValue' + temp2).css('width', $('input.iFeatureValue' + temp2).parent().width() - 5 - $('[for=iFeatureValue' + temp2 + ']').width() + 'px');
                                $('.sFeatureOpts' + temp2).css('width', $('.sFeatureOpts' + temp2).parent().width() - 5 - $('[for=sFeatureOpts' + temp2 + ']').width() + 'px');
                            }
                            $('#fAddCategory .aMinFeature').trigger('click');
                        }
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppCategories').click(function () {
    changePage($('.dBoardCategories'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardCategories', action: {
                    fn: function () {
                        if ($('#fCategories').html() == '')
                            $('.dBoardCategories .sBtnMore').trigger('click');
                        $('.aCustomBtn').attr({ 'onClick': "$('.dAppAddCategory').trigger('click');", title: $('.dAppAddCategory a:eq(1)').text() }).fadeIn(300);
                        $('.aExcel').fadeIn(300);
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppAddPage').click(function () {
    $.each(flags, function (key, value) {
        if (typeof (CKEDITOR.instances['PgDetail' + key]) == 'undefined') {
            ck = CKEDITOR.replace('PgDetail' + key);
            addBtnCke(ck);
        }
    });
    if (typeof (temp) == 'undefined')
        cleanContent('page');
    else {
        $.each(temp, function (key, value) {
            CKEDITOR.instances['PgDetail' + value.flag].setData(value.detail);
        });
        $('.aCustomBtn, .aExcel').fadeOut(300);
    }
    $('.dBoardAddPage .dLanguages a:eq(0)').addClass('aLanguageActive');
    changePage($('.dBoardAddPage'), 'dShow', {
        fn: function () {
            $.each(flags, function (key, value) {
                $('#iPgTitle' + key).css('width', $('#fAddPage .dLine').width() - 5 - $('[for=iPgTitle' + key + ']').width() + 'px');
                $('#iPgExcept' + key).css('width', $('#fAddPage .dLine').width() - 5 - $('[for=iPgExcept' + key + ']').width() + 'px');
            });
            add_tab("dBoardAddPage .dLanguages a", "aLanguageActive", "dBoardAddPage .dTabsLanguage", 100, 999e4, function () { });
            $('#fAddPage #iPosition').css('width', $('#fAddPage .dLine').width() - 5 - $('#fAddPage [for=iPosition]').width() + 'px');
            $('#iPgKeyword').css('width', $('#fAddPage .dLine').width() - 5 - $('[for=iPgKeyword]').width() + 'px');
            $('#iPgDate').css('width', $('#fAddPage .dLine').width() - 5 - $('[for=iPgDate]').width() + 'px');
            $('#iPgPath').css('width', $('#fAddPage .dLine').width() - 5 - $('[for=iPgPath]').width() + 'px');
            backmap.add({
                page: 'dBoardAddPage', action: {
                    fn: function () {
                        $('.aAccept').fadeIn(300);
                        if (typeof (num) != 'undefined') {
                            for (temp2 = 1; temp2 <= num; temp2++) {
                                $('a.sFeatureName' + temp2 + ', a.sFeatureParent' + temp2 + ', a.sFeatureValue' + temp2).css('width', '0px');
                                $('a.sFeatureName' + temp2).css('width', $('a.sFeatureName' + temp2).parent().width() - 5 - $('[for=sFeatureName' + temp2 + ']').width() + 'px');
                                $('a.sFeatureParent' + temp2).css('width', $('a.sFeatureParent' + temp2).parent().width() - 5 - $('[for=sFeatureParent' + temp2 + ']').width() + 'px');
                                $('a.sFeatureValue' + temp2).css('width', $('a.sFeatureValue' + temp2).parent().width() - 5 - $('[for=sFeatureValue' + temp2 + ']').width() + 'px');
                                $('input.iFeatureValue' + temp2).css('width', $('input.iFeatureValue' + temp2).parent().width() - 5 - $('[for=iFeatureValue' + temp2 + ']').width() + 'px');
                                $('.sFeatureOpts' + temp2).css('width', $('.sFeatureOpts' + temp2).parent().width() - 5 - $('[for=sFeatureOpts' + temp2 + ']').width() + 'px');
                            }
                            $('#fAddPage .aMinFeature').trigger('click');
                        }
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppPages').click(function () {
    changePage($('.dBoardPages'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardPages', action: {
                    fn: function () {
                        if ($('#fPages').html() == '')
                            $('.dBoardPages .sBtnMore').trigger('click');
                        $('.aCustomBtn').attr({ 'onClick': "$('.dAppAddPage').trigger('click');", title: $('.dAppAddPage a:eq(1)').text() }).fadeIn(300);
                        $('.aExcel').fadeIn(300);
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppOrder').click(function () {
    changePage($('.dBoardOrder'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardOrder', action: {
                    fn: function () {
                        if ($('#fOrder').html() == '')
                            $('.dBoardOrder .sBtnMore').trigger('click');
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppSubscription').click(function () {
    changePage($('.dBoardSubscription'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardSubscription', action: {
                    fn: function () {
                        if ($('#fSubscription').html() == '')
                            $('.dBoardSubscription .sBtnMore').trigger('click');
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppContact').click(function () {
    changePage($('.dBoardContact'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardContact', action: {
                    fn: function () {
                        if ($('#fContact').html() == '')
                            $('.dBoardContact .sBtnMore').trigger('click');
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppPhotos').click(function () {
    OpenPhotos(function () {
        backmap.add({
            page: 'dBoardImages', action: {
                fn: function () {
                    $('#iMedia').attr('accept', '.jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF');
                    if (people.class == 1 || people.class == 6)
                        $('.lUpload').attr('type', 'image').fadeIn(300);
                    $('.dBoardImages .dItem > div').live('click', function () {
                        $('.dViewImg').attr('viewIng', $('.dBoardImages .dItem > div').index(this));
                        $('.iViewImg').attr({ _id: $(this).find('img').attr('_id'), src: $(this).find('img').attr('src'), title: $(this).find('img').attr('title') });
                        $('.iViewImg').css('width', 'auto');
                        $('.dBgImg, .dViewImg' + ((people._id == $(this).find('img').attr('wid')/*|| people.class == 6*/) ? ', .aDelete' : '')).fadeIn(200, function () {
                            if ($('.iViewImg').width() > $('.dViewImg').width())
                                $('.iViewImg').css('width', '100%');
                            ver_center($('.iViewImg'), 'all', 0, 1);
                            $('.dViewImg').fadeTo(200, 1);
                        });
                    });
                }, params: {}
            }
        });
    });
});
$('.dAppAudios').live('click', function () {
    changePage($('.dBoardAudios'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardAudios', action: {
                    fn: function () {
                        if ($('#fAudios').html() == '')
                            $('.dBoardAudios .sBtnMore').trigger('click');
                        if (typeof (callback) == 'function')
                            callback();
                    }, params: {}
                }
            });
            $('#iMedia').attr('accept', '.mp3,.MP3,.3gp,.3GP,.aac,.AAC,.ogg,.OGG,.wav,.WAV,.wma,.WMA,.webm,.WEBM');
            if (people.class == 1 || people.class == 6)
                $('.lUpload').attr('type', 'audio').fadeIn(300);
        }, params: {}
    });
});
$('.dAppFriends').live('click', function () {
    if (people != null && people._id != undefined)
    {
        location.hash = LANG + "¬hideContent";
        changePage($('.dBoardFriends'), 'dShow', {
            fn: function () {
                backmap.add({
                    page: 'dBoardFriends', action: {
                        fn: function () {
                            $('.iSearch').attr({'placeholder': tran('Tìm kiếm|Search||'), 'or': $('.iSearch').val()});
                            $('.iSearch').val('');
                            $('.aReload, .aForward, .aHistories, .aDownload, .aPin, .aAddTab, .aOnWebview').fadeOut(200);
                            if ($('#fFriends').html() == '')
                            {
                                $('.sBtnMore').attr('type', 'messenges');
                                $('.dBoardFriends .sBtnMore').trigger('click');
                            }
                            if (typeof (callback) == 'function')
                                callback();
                            $('.aHideControls').addClass('aHideMessenge');
                        }, params: {}
                    }
                });
            }, params: {}
        });
    }
    else
    {
        $('.dRSide > div > div').css('display', 'none');
        $('.dBoardLogin').css('display', 'block');
        $('.sFeaControl a:eq(1)').attr('board', 'dBoardLogin');
        $('.dRSide').animate({ right: 0 }, 260);
    }
});
$('.sTalk').live('click', function (e) {
    e.stopPropagation();
    me = $(this);
    web.iReq({ action: 'iGetMyCoins' }, function (cdt) {
        $('.iChatRers').val(me.parent().find('.iTalkRers').val());
        $('.dTalkDetail > div').html('');
        changePage($('.dBoardTalk'), 'dShow', {
            fn: function () {
                backmap.add({
                    page: 'dBoardTalk', action: {
                        fn: function () {
                            if (me.parent().prev().find('img:eq(1)').css('display') == 'block') {
                                web.iReq({ action: 'iGetLetters', _id: me.parent().parent().attr('id') }, function (dt) {
                                    $.each(dt, function (k, v) {
                                        $('.dTalkDetail > div').append('<div>' +
                                            '<div class="dChatBg"></div>' +
                                            '<div class="dChat">' +
                                            '<a class="aVatar"><img src="' + ((v.people.image != '') ? v.people.image : SKIN + '/logo.png') + '" alt="wsup3"/></a>' + v.detail +
                                            '<a class="aChatOpt">.</a></div>' +
                                            '</div>');
                                    });
                                    $('.dTalkDetail').animate({ scrollTop: $('.dTalkDetail > div').height() + 43 }, 200);
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
                            }
                            if ($('.dContentWriter').length < 1)
                                $('.dWriterControl').append('<div class="dContentWriter" contenteditable="true"></div>');
                            $('.aSendMess').fadeIn(300);
                        }, params: {}
                    }
                });
            }, params: {}
        });
    });
});
$('#fAudios .dCategory').live('click', function () {
    me = $(this);
    $('.dBgVideo, .aDelete').fadeIn(200);
    $('.dViewAudio').fadeTo(200, 1);
    audio.sing(me.index());
});
$('.tSongTitle, .iCreatedSong, .iSongTime').keydown(function () {
    $('.aEditAudio').fadeIn(300);
});
$('.aEditAudio').live('click', function () {
    audios[$('.dPlayer').attr('playing')].name = $('.tSongTitle').val();
    audios[$('.dPlayer').attr('playing')].params.duration = parseInt($('.iSongTime').val());
    web.iReq({ action: 'iEditFile', item: audios[$('.dPlayer').attr('playing')], type: 'audio' }, function (dt) { });
    $(this).fadeOut(300);
});
$('.aCloseAudio').live('click', function () {
    $('.dBgVideo, .dViewAudio, .aDelete').fadeOut(200);
});
$('.dAppVideos').click(function () {
    changePage($('.dBoardVideos'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardVideos', action: {
                    fn: function () {
                        if ($('#fVideos').html() == '')
                            $('.dBoardVideos .sBtnMore').trigger('click');
                        if (typeof (callback) == 'function')
                            callback();
                    }, params: {}
                }
            });
            if (GoogleAuth.currentUser.get().getAuthResponse(true) == null)
                GoogleAuth.signIn();
            $('#iMedia').attr('accept', '.webm,.WEBM,.ogg,.OGG,.mp4,.MP4');
            if (people.class == 1 || people.class == 6)
                $('.lUpload').attr('type', 'video').fadeIn(300);
            $('.dVideo').live('click', function () {
                $('.dBgVideo, .aDelete').fadeIn(200);
                $('.dViewVideo').fadeTo(200, 1);
                $('.dViewVideo div').attr('idVideo', $(this).attr('id'));
                $('.dViewVideo div').html('<iframe width="60%" height="100%" src="https://www.youtube.com/embed/' + $(this).attr('id') + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
            });
        }, params: {}
    });
});
$('.aCloseVideo').live('click', function () {
    $('.dBgVideo, .dViewVideo, .aDelete').fadeOut(200, function () {
        $('.dViewVideo iframe').remove();
    });
});
$('.dAppAddLanguage').click(function () {
    if (typeof (temp) == 'undefined')
        cleanContent('flag');
    else
        $('.aCustomBtn, .aExcel').fadeOut(300);
    changePage($('.dBoardAddLanguage'), 'dShow', {
        fn: function () {
            $.each(flags, function (key, value) {
                $('#iName' + key).css('width', $('#fAddLanguage .dLine').width() - 5 - $('[for=iName' + key + ']').width() + 'px');
            });
            $('#iId').css('width', $('#fAddLanguage .dLine').width() - 5 - $('[for=iId]').width() + 'px');
            $('#fAddLanguage #iPosition').css('width', $('#fAddLanguage .dLine').width() - 5 - $('#fAddLanguage [for=iPosition]').width() + 'px');
            backmap.add({
                page: 'dBoardAddLanguage', action: {
                    fn: function () {
                        $('.aAccept').fadeIn(300);
                        if (typeof (num) != 'undefined') {
                            for (temp2 = 1; temp2 <= num; temp2++) {
                                $('a.sFeatureName' + temp2 + ', a.sFeatureParent' + temp2 + ', a.sFeatureValue' + temp2).css('width', '0px');
                                $('a.sFeatureName' + temp2).css('width', $('a.sFeatureName' + temp2).parent().width() - 5 - $('[for=sFeatureName' + temp2 + ']').width() + 'px');
                                $('a.sFeatureParent' + temp2).css('width', $('a.sFeatureParent' + temp2).parent().width() - 5 - $('[for=sFeatureParent' + temp2 + ']').width() + 'px');
                                $('a.sFeatureValue' + temp2).css('width', $('a.sFeatureValue' + temp2).parent().width() - 5 - $('[for=sFeatureValue' + temp2 + ']').width() + 'px');
                                $('input.iFeatureValue' + temp2).css('width', $('input.iFeatureValue' + temp2).parent().width() - 5 - $('[for=iFeatureValue' + temp2 + ']').width() + 'px');
                                $('.sFeatureOpts' + temp2).css('width', $('.sFeatureOpts' + temp2).parent().width() - 5 - $('[for=sFeatureOpts' + temp2 + ']').width() + 'px');
                            }
                            $('#fAddLanguage .aMinFeature').trigger('click');
                        }
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppAddFeature').click(function () {
    $.each(flags, function (key, value) {
        if (typeof (CKEDITOR.instances['FeaDetail' + key]) == 'undefined') {
            ck = CKEDITOR.replace('FeaDetail' + key);
            addBtnCke(ck);
        }
    });
    if (typeof (temp) == 'undefined')
        cleanContent('feature');
    else {
        $.each(temp, function (key, value) {
            CKEDITOR.instances['FeaDetail' + value.flag].setData(temp[key].detail);
        });
        $('.aCustomBtn, .aExcel').fadeOut(300);
    }
    $('.dBoardAddFeature .dLanguages a:eq(0)').addClass('aLanguageActive');
    changePage($('.dBoardAddFeature'), 'dShow', {
        fn: function () {
            $.each(flags, function (key, value) {
                $('#iFeaName' + key).css('width', $('#fAddFeature .dLine').width() - 5 - $('[for=iFeaName' + key + ']').width() + 'px');
                $('#iFeaExcept' + key).css('width', $('#fAddFeature .dLine').width() - 5 - $('[for=iFeaExcept' + key + ']').width() + 'px');
            });
            add_tab("dBoardAddFeature .dLanguages a", "aLanguageActive", "dBoardAddFeature .dTabsLanguage", 100, 999e4, function () { });
            $('#fAddFeature #iPosition').css('width', $('#fAddFeature .dLine').width() - 5 - $('#fAddFeature [for=iPosition]').width() + 'px');
            $('#iFeaKey').css('width', $('#fAddFeature .dLine').width() - 5 - $('[for=iFeaKey]').width() + 'px');
            backmap.add({
                page: 'dBoardAddFeature', action: {
                    fn: function () {
                        $('.aAccept').fadeIn(300);
                        if (typeof (num) != 'undefined') {
                            for (temp2 = 1; temp2 <= num; temp2++) {
                                $('a.sFeatureName' + temp2 + ', a.sFeatureParent' + temp2 + ', a.sFeatureValue' + temp2).css('width', '0px');
                                $('a.sFeatureName' + temp2).css('width', $('a.sFeatureName' + temp2).parent().width() - 5 - $('[for=sFeatureName' + temp2 + ']').width() + 'px');
                                $('a.sFeatureParent' + temp2).css('width', $('a.sFeatureParent' + temp2).parent().width() - 5 - $('[for=sFeatureParent' + temp2 + ']').width() + 'px');
                                $('a.sFeatureValue' + temp2).css('width', $('a.sFeatureValue' + temp2).parent().width() - 5 - $('[for=sFeatureValue' + temp2 + ']').width() + 'px');
                                $('input.iFeatureValue' + temp2).css('width', $('input.iFeatureValue' + temp2).parent().width() - 5 - $('[for=iFeatureValue' + temp2 + ']').width() + 'px');
                                $('.sFeatureOpts' + temp2).css('width', $('.sFeatureOpts' + temp2).parent().width() - 5 - $('[for=sFeatureOpts' + temp2 + ']').width() + 'px');
                            }
                            $('#fAddFeature .aMinFeature').trigger('click');
                        }
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppAddMenu').click(function () {
    $.each(flags, function (key, value) {
        if (typeof (CKEDITOR.instances['MnuDetail' + key]) == 'undefined') {
            ck = CKEDITOR.replace('MnuDetail' + key);
            addBtnCke(ck);
        }
    });
    if (typeof (temp) == 'undefined')
        cleanContent('menu');
    else {
        $.each(temp, function (key, value) {
            CKEDITOR.instances['MnuDetail' + value.flag].setData(temp[key].detail);
        });
        $('.aCustomBtn, .aExcel').fadeOut(300);
    }
    $('.dBoardAddMenu .dLanguages a:eq(0)').addClass('aLanguageActive');
    changePage($('.dBoardAddMenu'), 'dShow', {
        fn: function () {
            $.each(flags, function (key, value) {
                $('#iMnuName' + key).css('width', $('#fAddMenu .dLine').width() - 5 - $('[for=iMnuName' + key + ']').width() + 'px');
                $('#iMnuExcept' + key).css('width', $('#fAddMenu .dLine').width() - 5 - $('[for=iMnuExcept' + key + ']').width() + 'px');
            });
            add_tab("dBoardAddMenu .dLanguages a", "aLanguageActive", "dBoardAddMenu .dTabsLanguage", 100, 999e4, function () { });
            $('#fAddMenu #iPosition').css('width', $('#fAddMenu .dLine').width() - 5 - $('#fAddMenu [for=iPosition]').width() + 'px');
            $('#iMnuKey').css('width', $('#fAddMenu .dLine').width() - 5 - $('[for=iMnuKey]').width() + 'px');
            backmap.add({
                page: 'dBoardAddMenu', action: {
                    fn: function () {
                        $('.aAccept').fadeIn(300);
                        if (typeof (num) != 'undefined') {
                            for (temp2 = 1; temp2 <= num; temp2++) {
                                $('a.sFeatureName' + temp2 + ', a.sFeatureParent' + temp2 + ', a.sFeatureValue' + temp2).css('width', '0px');
                                $('a.sFeatureName' + temp2).css('width', $('a.sFeatureName' + temp2).parent().width() - 5 - $('[for=sFeatureName' + temp2 + ']').width() + 'px');
                                $('a.sFeatureParent' + temp2).css('width', $('a.sFeatureParent' + temp2).parent().width() - 5 - $('[for=sFeatureParent' + temp2 + ']').width() + 'px');
                                $('a.sFeatureValue' + temp2).css('width', $('a.sFeatureValue' + temp2).parent().width() - 5 - $('[for=sFeatureValue' + temp2 + ']').width() + 'px');
                                $('input.iFeatureValue' + temp2).css('width', $('input.iFeatureValue' + temp2).parent().width() - 5 - $('[for=iFeatureValue' + temp2 + ']').width() + 'px');
                                $('.sFeatureOpts' + temp2).css('width', $('.sFeatureOpts' + temp2).parent().width() - 5 - $('[for=sFeatureOpts' + temp2 + ']').width() + 'px');
                            }
                            $('#fAddMenu .aMinFeature').trigger('click');
                        }
                    }, params: {}
                }
            });
        }, params: {}
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
                        if (people.class == 1 || people.class == 6)
                            $('.aCustomBtn').attr({ 'onClick': "$('.dAppAddLanguage').trigger('click');", title: $('.dAppAddLanguage a:eq(1)').text() }).fadeIn(300);
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppFeatures').click(function () {
    changePage($('.dBoardFeatures'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardFeatures', action: {
                    fn: function () {
                        if ($('#fFeatures').html() == '')
                            $('.dBoardFeatures .sBtnMore').trigger('click');
                        if (people.class == 1 || people.class == 6)
                            $('.aCustomBtn').attr({ 'onClick': "$('.dAppAddFeature').trigger('click');", title: $('.dAppAddFeature a:eq(1)').text() }).fadeIn(300);
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppMenus').click(function () {
    changePage($('.dBoardMenus'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardMenus', action: {
                    fn: function () {
                        if ($('#fMenus').html() == '')
                            $('.dBoardMenus .sBtnMore').trigger('click');
                        if (people.class == 1 || people.class == 6)
                            $('.aCustomBtn').attr({ 'onClick': "$('.dAppAddMenu').trigger('click');", title: $('.dAppAddMenu a:eq(1)').text() }).fadeIn(300);
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppAddUser').click(function () {
    if (typeof (temp) == 'undefined')
        cleanContent('people');
    else
        $('.aCustomBtn, .aExcel').fadeOut(300);
    changePage($('.dBoardAddUser'), 'dShow', {
        fn: function () {
            $('.dBoardAddUser #iEmail').css('width', $('#fAddUser .dLine').width() - 5 - $('.dBoardAddUser [for=iEmail]').width() + 'px');
            $('#iPassword').css('width', $('#fAddUser .dLine').width() - 5 - $('[for=iPassword]').width() + 'px');
            $('.dBoardAddUser #iFullname').css('width', $('#fAddUser .dLine').width() - 5 - $('.dBoardAddUser [for=iFullname]').width() + 'px');
            $('.dBoardAddUser #iAddress').css('width', $('#fAddUser .dLine').width() - 5 - $('.dBoardAddUser [for=iAddress]').width() + 'px');
            $('#iDisplayname').css('width', $('#fAddUser .dLine').width() - 5 - $('[for=iDisplayname]').width() + 'px');
            $('.dBoardAddUser #iPhone').css('width', $('#fAddUser .dLine').width() - 5 - $('.dBoardAddUser [for=iPhone]').width() + 'px');
            $('.iGroup').css('width', $('#fAddUser .dLine').width() - 5 - $('[for=iGroup]').width() + 'px');
            $('.iSex').css('width', $('#fAddUser .dLine').width() - 5 - $('.dBoardAddUser [for=iSex]').width() + 'px');
            backmap.add({
                page: 'dBoardAddUser', action: {
                    fn: function () {
                        $('.aAccept').fadeIn(300);
                        if (typeof (num) != 'undefined') {
                            for (temp2 = 1; temp2 <= num; temp2++) {
                                $('a.sFeatureName' + temp2 + ', a.sFeatureParent' + temp2 + ', a.sFeatureValue' + temp2).css('width', '0px');
                                $('a.sFeatureName' + temp2).css('width', $('a.sFeatureName' + temp2).parent().width() - 5 - $('[for=sFeatureName' + temp2 + ']').width() + 'px');
                                $('a.sFeatureParent' + temp2).css('width', $('a.sFeatureParent' + temp2).parent().width() - 5 - $('[for=sFeatureParent' + temp2 + ']').width() + 'px');
                                $('a.sFeatureValue' + temp2).css('width', $('a.sFeatureValue' + temp2).parent().width() - 5 - $('[for=sFeatureValue' + temp2 + ']').width() + 'px');
                                $('input.iFeatureValue' + temp2).css('width', $('input.iFeatureValue' + temp2).parent().width() - 5 - $('[for=iFeatureValue' + temp2 + ']').width() + 'px');
                                $('.sFeatureOpts' + temp2).css('width', $('.sFeatureOpts' + temp2).parent().width() - 5 - $('[for=sFeatureOpts' + temp2 + ']').width() + 'px');
                            }
                            $('#fAddUser .aMinFeature').trigger('click');
                        }
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppAddCustomer').click(function () {
    if (typeof (temp) == 'undefined') {
        cleanContent('customer');
        $('.dBoardAddCustomer #iEmail').removeAttr('readonly');
    }
    else {
        $('.aCustomBtn, .aExcel').fadeOut(300);
        $('.dBoardAddCustomer #iEmail').attr('readonly', 'readonly');
    }
    changePage($('.dBoardAddCustomer'), 'dShow', {
        fn: function () {
            $('.dBoardAddCustomer #iFullname').css('width', $('#fAddCustomer .dLine').width() - 5 - $('#fAddCustomer [for=iFullname]').width() + 'px');
            $('.dBoardAddCustomer #iEmail').css('width', $('#fAddCustomer .dLine').width() - 5 - $('#fAddCustomer [for=iEmail]').width() + 'px');
            $('.dBoardAddCustomer #iAddress').css('width', $('#fAddCustomer .dLine').width() - 5 - $('#fAddCustomer [for=iAddress]').width() + 'px');
            $('.dBoardAddCustomer #iPhone').css('width', $('#fAddCustomer .dLine').width() - 5 - $('#fAddCustomer [for=iPhone]').width() + 'px');
            $('.dBoardAddCustomer .iGender').css('width', $('#fAddCustomer .dLine').width() - 5 - $('#fAddCustomer [for=iGender]').width() + 'px');
            backmap.add({
                page: 'dBoardAddCustomer', action: {
                    fn: function () {
                        $('.aAccept').fadeIn(300);
                        if (typeof (num) != 'undefined') {
                            for (temp2 = 1; temp2 <= num; temp2++) {
                                $('a.sFeatureName' + temp2 + ', a.sFeatureParent' + temp2 + ', a.sFeatureValue' + temp2).css('width', '0px');
                                $('a.sFeatureName' + temp2).css('width', $('a.sFeatureName' + temp2).parent().width() - 5 - $('[for=sFeatureName' + temp2 + ']').width() + 'px');
                                $('a.sFeatureParent' + temp2).css('width', $('a.sFeatureParent' + temp2).parent().width() - 5 - $('[for=sFeatureParent' + temp2 + ']').width() + 'px');
                                $('a.sFeatureValue' + temp2).css('width', $('a.sFeatureValue' + temp2).parent().width() - 5 - $('[for=sFeatureValue' + temp2 + ']').width() + 'px');
                                $('input.iFeatureValue' + temp2).css('width', $('input.iFeatureValue' + temp2).parent().width() - 5 - $('[for=iFeatureValue' + temp2 + ']').width() + 'px');
                                $('.sFeatureOpts' + temp2).css('width', $('.sFeatureOpts' + temp2).parent().width() - 5 - $('[for=sFeatureOpts' + temp2 + ']').width() + 'px');
                            }
                            $('#fAddCustomer .aMinFeature').trigger('click');
                        }
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppChange').click(function () {
    changePage($('.dBoardChange'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardChange', action: {
                    fn: function () {
                        $('.dBoardChange #iPw').css('width', $('#fChange .dLine').width() - 5 - $('#fChange [for=iPw]').width() + 'px');
                        $('.dBoardChange #iNewPw').css('width', $('#fChange .dLine').width() - 5 - $('#fChange [for=iNewPw]').width() + 'px');
                        $('.dBoardChange #iReNewPw').css('width', $('#fChange .dLine').width() - 5 - $('#fChange [for=iReNewPw]').width() + 'px');
                        $('.aAccept').fadeIn(300);
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppUsers').click(function () {
    changePage($('.dBoardUsers'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardUsers', action: {
                    fn: function () {
                        if ($('#fUsers').html() == '')
                            $('.dBoardUsers .sBtnMore').trigger('click');
                        $('.aCustomBtn').attr({ 'onClick': "$('.dAppAddUser').trigger('click');", title: $('.dAppAddUser a:eq(1)').text() }).fadeIn(300);
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppCustomers').click(function () {
    changePage($('.dBoardCustomers'), 'dShow', {
        fn: function () {
            backmap.add({
                page: 'dBoardCustomers', action: {
                    fn: function () {
                        if ($('#fCustomers').html() == '')
                            $('.dBoardCustomers .sBtnMore').trigger('click');
                        $('.aCustomBtn').attr({ 'onClick': "$('.dAppAddCustomer').trigger('click');", title: $('.dAppAddCustomer a:eq(1)').text() }).fadeIn(300);
                    }, params: {}
                }
            });
        }, params: {}
    });
});
$('.dAppPage').click(function () {
    changePage($('.' + $(this).find('.dClose').attr('board')), 'dShow', {
        fn: function (me) {
            backmap.add({ page: me.find('.dClose').attr('board'), title: me.find('> a').attr('title') });
        }, params: $(this)
    });
});
$('.dAppStore').click(function () {
    changePage($('.dBoardStore'), 'dShow', {
        fn: function (me) {
            backmap.add({
                page: 'dBoardStore', title: me.find('> a').attr('title'), action: {
                    fn: function () {
                        if ($('.dFreeApps').css('display') != 'block')
                            web.iReq({ action: 'iGetStore' }, function (dt) {
                                if (dt.freeApps.length > 0) {
                                    $.each(dt.freeApps, function (k, v) {
                                        $('.dFreeApps > div').append('<div class="dAppFrame">' +
                                            '<div class="dNotify">' +
                                            '<span class="sBlur" style="background-image: url(\'../..' + v.imgs[0] + '\')"></span>' +
                                            '<span class="sScreen"></span>' +
                                            '<span class="sNumber">6</span></div>' +
                                            '<div class="dClose" board="dBoardHdonline" full="full" url="http://hdonline.vn/">' +
                                            '<span class="sBlur" style="background-image: url(\'../..' + v.imgs[0] + '\')"></span>' +
                                            '<span class="sScreen"></span>' +
                                            '<span class="fa fa-times"></span></div>' +
                                            '<a title="' + v.title + '">' +
                                            '<img src="' + v.imgs[0] + '" alt="wsup3"/>' +
                                            '</a><a title="' + v.title + '">' + v.title + '</a></div>');
                                    });
                                    $('.dFreeApps').css('display', 'block');
                                }
                                if (dt.priceApps.length > 0) {
                                    $.each(dt.priceApps, function (k, v) {
                                        $('.dPriceApps > div').append('<div class="dAppFrame">' +
                                            '<div class="dNotify">' +
                                            '<span class="sBlur" style="background-image: url(\'../..' + v.imgs[0] + '\')"></span>' +
                                            '<span class="sScreen"></span>' +
                                            '<span class="sNumber">6</span></div>' +
                                            '<div class="dClose" board="dBoardHdonline" full="full" url="http://hdonline.vn/">' +
                                            '<span class="sBlur" style="background-image: url(\'../..' + v.imgs[0] + '\')"></span>' +
                                            '<span class="sScreen"></span>' +
                                            '<span class="fa fa-times"></span></div>' +
                                            '<a title="' + v.title + '">' +
                                            '<img src="' + v.imgs[0] + '" alt="wsup3"/>' +
                                            '</a><a title="' + v.title + '">' + v.title + '</a></div>');
                                    });
                                    $('.dFreeApps').css('display', 'block');
                                }
                            });
                    }, params: {}
                }
            });
        }, params: $(this)
    });
});
$('.dAppFrame').click(function () {
    if ($(this).find('.dClose').attr('full') == 'full')
        launchIntoFullscreen(document.documentElement);
    changePage($('.' + $(this).find('.dClose').attr('board')), 'dShow', {
        fn: function (app) {
            backmap.add({
                page: app.find('.dClose').attr('board'), title: app.find('> a').attr('title'), action: {
                    fn: function (app) {
                        if (app.find('.dClose').attr('full') == 'full')
                            launchIntoFullscreen(document.documentElement);
                        if ($('.' + app.find('.dClose').attr('board')).html() == '')
                            $('.' + app.find('.dClose').attr('board')).append('<iframe src="' + web.makeLink(app.find('.dClose').attr('url')) + '" style="width: 100%; height: 100%" frameborder="0"></iframe>');
                        else
                            if ($('.' + app.find('.dClose').attr('board') + ' iframe').attr('src') == '')
                                $('.' + app.find('.dClose').attr('board') + ' iframe').attr('src', web.makeLink(app.find('.dClose').attr('url')));
                        app.find('.dClose').fadeIn(200);
                    }, params: app
                }
            });
        }, params: $(this)
    });
});
$('.dClose').live('click', function (e) {
    me = $(this);
    device.execute({
        w_1000_f: function(params) {
            if(me.hasClass('dCloseWrap'))
                temp3 = me.attr('address');
            else
                temp3 = me.attr('weburl');
            if($('.dActApp .dClose').hasClass('dCloseWrap'))
                temp2 = (tabs[$('.dActApp .dClose').attr('address')] > tabs[temp3]? tabs[$('.dActApp .dClose').attr('address')]-1: ((tabs[$('.dActApp .dClose').attr('address')] == tabs[temp3]? (tabs[temp3]==Object.keys(tabs).length)? Object.keys(tabs).length-1: tabs[temp3]: tabs[$('.dActApp .dClose').attr('address')])));
            else
                temp2 = (tabs[$('.dActApp .dClose').attr('weburl')] > tabs[temp3]? tabs[$('.dActApp .dClose').attr('weburl')]-1: ((tabs[$('.dActApp .dClose').attr('weburl')] == tabs[temp3]? (tabs[temp3]==Object.keys(tabs).length)? Object.keys(tabs).length-1: tabs[temp3]: tabs[$('.dActApp .dClose').attr('weburl')])));
            console.log(temp2);
        },
        w_800_1000_f: function(params) {
            if(me.hasClass('dCloseWrap'))
                temp3 = me.attr('address');
            else
                temp3 = me.attr('mobileurl');
            if($('.dActApp .dClose').hasClass('dCloseWrap'))
                temp2 = (tabs[$('.dActApp .dClose').attr('address')] > tabs[temp3]? tabs[$('.dActApp .dClose').attr('address')]-1: ((tabs[$('.dActApp .dClose').attr('address')] == tabs[temp3]? (tabs[temp3]==Object.keys(tabs).length)? Object.keys(tabs).length-1: tabs[temp3]: tabs[$('.dActApp .dClose').attr('address')])));
            else
                temp2 = (tabs[$('.dActApp .dClose').attr('mobileurl')] > tabs[temp3]? tabs[$('.dActApp .dClose').attr('mobileurl')]-1: ((tabs[$('.dActApp .dClose').attr('mobileurl')] == tabs[temp3]? (tabs[temp3]==Object.keys(tabs).length)? Object.keys(tabs).length-1: tabs[temp3]: tabs[$('.dActApp .dClose').attr('mobileurl')])));
        },
        w_768_800_f: function(params) {
            if(me.hasClass('dCloseWrap'))
                temp3 = me.attr('address');
            else
                temp3 = me.attr('mobileurl');
            if($('.dActApp .dClose').hasClass('dCloseWrap'))
                temp2 = (tabs[$('.dActApp .dClose').attr('address')] > tabs[temp3]? tabs[$('.dActApp .dClose').attr('address')]-1: ((tabs[$('.dActApp .dClose').attr('address')] == tabs[temp3]? (tabs[temp3]==Object.keys(tabs).length)? Object.keys(tabs).length-1: tabs[temp3]: tabs[$('.dActApp .dClose').attr('address')])));
            else
                temp2 = (tabs[$('.dActApp .dClose').attr('mobileurl')] > tabs[temp3]? tabs[$('.dActApp .dClose').attr('mobileurl')]-1: ((tabs[$('.dActApp .dClose').attr('mobileurl')] == tabs[temp3]? (tabs[temp3]==Object.keys(tabs).length)? Object.keys(tabs).length-1: tabs[temp3]: tabs[$('.dActApp .dClose').attr('mobileurl')])));
        },
        w_590_768_f: function(params) {
            if(me.hasClass('dCloseWrap'))
                temp3 = me.attr('address');
            else
                temp3 = me.attr('mobileurl');
            if($('.dActApp .dClose').hasClass('dCloseWrap'))
                temp2 = (tabs[$('.dActApp .dClose').attr('address')] > tabs[temp3]? tabs[$('.dActApp .dClose').attr('address')]-1: ((tabs[$('.dActApp .dClose').attr('address')] == tabs[temp3]? (tabs[temp3]==Object.keys(tabs).length)? Object.keys(tabs).length-1: tabs[temp3]: tabs[$('.dActApp .dClose').attr('address')])));
            else
                temp2 = (tabs[$('.dActApp .dClose').attr('mobileurl')] > tabs[temp3]? tabs[$('.dActApp .dClose').attr('mobileurl')]-1: ((tabs[$('.dActApp .dClose').attr('mobileurl')] == tabs[temp3]? (tabs[temp3]==Object.keys(tabs).length)? Object.keys(tabs).length-1: tabs[temp3]: tabs[$('.dActApp .dClose').attr('mobileurl')])));
        },
        w_480_590_f: function(params) {
            if(me.hasClass('dCloseWrap'))
                temp3 = me.attr('address');
            else
                temp3 = me.attr('mobileurl');
            if($('.dActApp .dClose').hasClass('dCloseWrap'))
                temp2 = (tabs[$('.dActApp .dClose').attr('address')] > tabs[temp3]? tabs[$('.dActApp .dClose').attr('address')]-1: ((tabs[$('.dActApp .dClose').attr('address')] == tabs[temp3]? (tabs[temp3]==Object.keys(tabs).length)? Object.keys(tabs).length-1: tabs[temp3]: tabs[$('.dActApp .dClose').attr('address')])));
            else
                temp2 = (tabs[$('.dActApp .dClose').attr('mobileurl')] > tabs[temp3]? tabs[$('.dActApp .dClose').attr('mobileurl')]-1: ((tabs[$('.dActApp .dClose').attr('mobileurl')] == tabs[temp3]? (tabs[temp3]==Object.keys(tabs).length)? Object.keys(tabs).length-1: tabs[temp3]: tabs[$('.dActApp .dClose').attr('mobileurl')])));
        },
        w_320_480_f: function(params) {
            if(me.hasClass('dCloseWrap'))
                temp3 = me.attr('address');
            else
                temp3 = me.attr('mobileurl');
            if($('.dActApp .dClose').hasClass('dCloseWrap'))
                temp2 = (tabs[$('.dActApp .dClose').attr('address')] > tabs[temp3]? tabs[$('.dActApp .dClose').attr('address')]-1: ((tabs[$('.dActApp .dClose').attr('address')] == tabs[temp3]? (tabs[temp3]==Object.keys(tabs).length)? Object.keys(tabs).length-1: tabs[temp3]: tabs[$('.dActApp .dClose').attr('address')])));
            else
                temp2 = (tabs[$('.dActApp .dClose').attr('mobileurl')] > tabs[temp3]? tabs[$('.dActApp .dClose').attr('mobileurl')]-1: ((tabs[$('.dActApp .dClose').attr('mobileurl')] == tabs[temp3]? (tabs[temp3]==Object.keys(tabs).length)? Object.keys(tabs).length-1: tabs[temp3]: tabs[$('.dActApp .dClose').attr('mobileurl')])));
        }
    });
    temp = tabs[temp3];
    delete tabs[temp3];
    $.each(Object.keys(tabs), function(k, v){
        tabs[v] = k+1;
    });
    me.parent().removeClass('dActApp');
    $('.dClose[address="'+Object.keys(tabs)[temp2-1]+'"]').parent().addClass('dActApp');
    $('.dClose[weburl="'+Object.keys(tabs)[temp2-1]+'"]').parent().addClass('dActApp');
    $('.dClose[mobileurl="'+Object.keys(tabs)[temp2-1]+'"]').parent().addClass('dActApp');
    me.css('display', 'none');
    setTimeout(function(){
        location.hash = LANG + "¬closeTab¬" + temp + "¬" + temp2 + "¬" + Object.keys(tabs).length;
        temp2 = temp3 = undefined;
    }, 200);
    if(me.hasClass('dCloseWrap'))
        me.parent().remove();
    e.preventDefault();
    e.stopPropagation();
    return false;
});
$('.dWebApp:not(.dDashBrowser .dWebApp, .dClose)').live('click', function () {
    if(isApp)
    {
//        if(!$(this).hasClass('dCazsApps') || isApp=='e')
//        {
            $('.dActApp').removeClass('dActApp');
            me = $(this);
            me.addClass('dActApp');
            setTimeout(function(){
                if(me.hasClass('dWrapApp'))
                    peopleApad(me.find('.dClose').attr('address'), me.find('.dClose').attr('type'), me.find('img').attr('src'));
                else
                    device.execute({
                        w_1000_f: function(params) {
                            peopleApad(me.find('.dClose').attr('weburl'), me.find('.dClose').attr('type'), me.find('img').attr('src'));
                        },
                        w_800_1000_f: function(params) {
                            peopleApad(me.find('.dClose').attr('mobileurl'), me.find('.dClose').attr('type'), me.find('img').attr('src'));
                        },
                        w_768_800_f: function(params) {
                            peopleApad(me.find('.dClose').attr('mobileurl'), me.find('.dClose').attr('type'), me.find('img').attr('src'));
                        },
                        w_590_768_f: function(params) {
                            peopleApad(me.find('.dClose').attr('mobileurl'), me.find('.dClose').attr('type'), me.find('img').attr('src'));
                        },
                        w_480_590_f: function(params) {
                            peopleApad(me.find('.dClose').attr('mobileurl'), me.find('.dClose').attr('type'), me.find('img').attr('src'));
                        },
                        w_320_480_f: function(params) {
                            peopleApad(me.find('.dClose').attr('mobileurl'), me.find('.dClose').attr('type'), me.find('img').attr('src'));
                        }
                    });
                me.find('.dClose').css('display', 'block');
            }, 300);
//        }
    }
    else
        window.location.assign($(this).find('.dClose').attr('weburl'));
});
var tabs = {};
var peopleApad = function(apad, isChr, icon){
    if (people == null || people == undefined)
        people = {parameters: { apad: apad }};
    else
        people.parameters = { apad: apad };
    if(tabs.hasOwnProperty(apad))
        location.hash = LANG + "¬showTab¬" + tabs[apad];// + "¬icon¬" + icon;
    else
    {
        tabs[apad] = Object.keys(tabs).length+1;
        location.hash = LANG + "¬addTab¬" + tabs[apad] + "¬" + apad+"¬¬"+isChr;// + "¬icon¬" + icon;
    }
    
    web.iReq({ action: 'iBrowsers', people: people}, function (dt) {
        //location.hash = LANG + "¬openApp¬";
    });
};
tempTab = 'ck1';
$('.aTabs').mousedown(function () {
    holdTimeout = setTimeout(function () {
        if (tempTab == 'ck1')
            tempTab = 'lck1';
        else
            tempTab = 'lck2';
        $('.dAddBrowser').before('<div class="dBrowser"></div>');
        location.hash = people._id + "¬addBrowser¬" + ($('.dBrowser').length - 1) +"¬¬"+(($('.aOnWebviewed').length==0)? 1: 2);//+"¬¬i"
    }, 2500);
}).mouseup(function () {
    (typeof (holdTimeout) == 'undefined') ? '' : clearInterval(holdTimeout);
    switch (tempTab) {
        case 'ck2':
            $('.dBrowser > a, .dBrowsize > a').css('display', 'none');
            $('.dBrowsize').parent().addClass('dBoardBrowser');
            $('.dBrowsersTab').removeClass('dBrowsersTab');
            location.hash = people._id + "¬showBrowser¬" + $('.dAppBrowser .dClose').attr('index') + "¬¬" + $('.dAppBrowser .dClose').attr('index');
            tempTab = 'ck1';
            break;
        case 'lck1':
            tempTab = 'ck1';
            break;
        case 'lck2':
            tempTab = 'ck2';
            break;
        case 'ck1':
        default:
            location.hash = people._id + "¬hideBrowser¬" + $('.aMenu').attr('apping');
            $('.dBrowser > a, .dBrowsize > a').css('display', 'block');
            $('.dBoardBrowser').removeClass('dBoardBrowser');
            $('.dBrowser, .dAddBrowser').addClass('dBrowsersTab');
            tempTab = 'ck2';
            break;
    };
});
$('.dBrowsize > a').click(function () {
    $('.dBrowsing').fadeOut(200, function () {
        $(this).remove();
    });
    $('.dBrowsize > a').fadeOut(200);
});
$('.aFeature').click(function () {
    $(this).attr('num', parseInt($(this).attr('num')) + 1);
    $(this).next().prepend('<fieldset class="fFeature fFeature' + $(this).attr('num') + '" num="' + $(this).attr('num') + '" style="opacity: 0"><div>' +
        '<a class="aMinFeature" title="' + tran('Thu gọn|Minimize|||') + '"><i class="fa fa-minus"></i></a>' +
        '<a class="aDelFeature" title="' + tran('Hủy|Delete|||') + '"><img src="' + SKIN + '/admin/close.jpg" alt="wsup3"/></a>' +
        '<div class="dLine">' +
        '<label for="sFeatureName' + $(this).attr('num') + '">' + tran('Tên đặc điểm|Feature name|||') + ':&nbsp;</label>' +
        '<select id="sFeatureName' + $(this).attr('num') + '" class="sFeatureName sFeatureName' + $(this).attr('num') + '">' + ((typeof (features[$(this).attr('type')]) != 'undefined') ? features[$(this).attr('type')].opts : '<option value="choice" tool="choice">Chọn</option>') + '</select>' +
        '</div><div class="dTypeControl dTypeControl' + $(this).attr('num') + '"></div>' +
        '</div></fieldset>').find('fieldset').first().fadeTo(300, 1);
    $('.sFeatureName' + $(this).attr('num')).css('width', $('.sFeatureName' + $(this).attr('num')).parent().width() - 5 - $('[for=sFeatureName' + $(this).attr('num') + ']').width() + 'px');
    $('.sFeatureName' + $(this).attr('num')).selectBox();
    $('.sFeatureName' + $(this).attr('num')).attr('num', $(this).attr('num'));
});
$('#iProTitlevi, #iCatTitlevi, #iPgTitlevi, #iFeaNamevi, #iMnuNamevi').change(function () {
    $(this).parent().parent().parent().find('input[name=path]').val(createSlug($(this).val()));
    $(this).parent().parent().parent().find('input[name=keyword]').val($(this).val() + ', ' + $(this).val().toLowerCase());
});