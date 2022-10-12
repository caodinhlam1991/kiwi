var saveContent = function (type) {
    if ($('img.iCheck').css('display') == 'inline-block')
        $('img.iReady').fadeIn(200, function () {
            $('img.iCheck').fadeOut(200);
        });
    else {
        $('.dBgAction').css('display', 'block');
        var item = { cats: {} };
        $.each(languages, function (key, value) {
            item['title' + key] = $('.' + backmap.see().page + ' [name=title' + key + ']').val();
            item['except' + key] = $('.' + backmap.see().page + ' [name=except' + key + ']').val();
            if (type != 'term')
                item['detail' + key] = CKEDITOR.instances[((type == 'post') ? 'Pro' : ((type == 'page') ? 'Pg' : ((type == 'feature') ? 'Fea' : 'Mnu'))) + 'Detail' + key].getData();
            item['imgs' + key] = {};
            item['params' + key] = {};
            $('.' + backmap.see().page + ' .dTabsLanguage' + key + ' .dPhoto:eq(0) p').each(function (index) {//imgs
                item['imgs' + key][index] = $(this).find('img:eq(0)').attr('src');
            });
            $('.' + backmap.see().page + ' .dTabsLanguage' + key + ' .fFeature[tool=editor]').each(function () {
                me = $(this);
                item['params' + key][me.find('.sFeatureName').val()] = {};
                $(this).find('.sFeatureName option').each(function (i) {
                    if ($(this).val() == me.find('.sFeatureName').val()) {
                        item['params' + key][me.find('.sFeatureName').val()].tool = $(this).attr('tool');
                        item['params' + key][me.find('.sFeatureName').val()].title = $(this).text();
                    }
                });
                if (typeof (features[me.find('.sFeatureName').val()]) != 'undefined' && features[me.find('.sFeatureName').val()]['dac-diem-cha'] == 'show')
                    item['params' + key][me.find('.sFeatureName').val()].parent = me.find('.sFeatureParent').val();
                if (typeof (features[me.find('.sFeatureName').val()]) != 'undefined' && features[me.find('.sFeatureName').val()]['da-gia-tri'] == 'show') {
                    if (features[me.find('.sFeatureName').val()]['dac-diem-cha'] == 'show') {
                        item['params' + key][me.find('.sFeatureName').val()].parent = {};
                        me.find('select.sFeatureParent').each(function (index) {
                            item['params' + key][me.find('.sFeatureName').val()].parent[index] = $(this).val();
                        });
                    }
                    item['params' + key][me.find('.sFeatureName').val()].detail = {};
                    me.find('.tFeatureDetail').each(function (index) {
                        if (CKEDITOR.instances[$(this).attr('name')].getData() != '')
                            item['params' + key][me.find('.sFeatureName').val()].detail[index] = CKEDITOR.instances[$(this).attr('name')].getData();
                    });
                }
                else
                    if (CKEDITOR.instances[me.find('textarea').attr('name')].getData() != '')
                        item['params' + key][me.find('.sFeatureName').val()].detail = CKEDITOR.instances[me.find('textarea').attr('name')].getData();
            });
            $('.' + backmap.see().page + ' .dTabsLanguage' + key + ' .fFeature[tool=text]').each(function () {
                me = $(this);
                item['params' + key][me.find('.sFeatureName').val()] = {
                    detail: me.find('.iFeatureValue').val()
                };
                $(this).find('.sFeatureName option').each(function (i) {
                    if ($(this).val() == me.find('.sFeatureName').val()) {
                        item['params' + key][me.find('.sFeatureName').val()].tool = $(this).attr('tool');
                        item['params' + key][me.find('.sFeatureName').val()].title = $(this).text();
                    }
                });
                if (typeof (features[me.find('.sFeatureName').val()]) != 'undefined' && features[me.find('.sFeatureName').val()]['dac-diem-cha'] == 'show')
                    item['params' + key][me.find('.sFeatureName').val()].parent = me.find('.sFeatureParent').val();
                if (typeof (features[me.find('.sFeatureName').val()]) != 'undefined' && features[me.find('.sFeatureName').val()]['da-gia-tri'] == 'show') {
                    if (features[me.find('.sFeatureName').val()]['dac-diem-cha'] == 'show') {
                        item['params' + key][me.find('.sFeatureName').val()].parent = {};
                        me.find('select.sFeatureParent').each(function (index) {
                            item['params' + key][me.find('.sFeatureName').val()].parent[index] = $(this).val();
                        });
                    }
                    item['params' + key][me.find('.sFeatureName').val()].detail = {};
                    me.find('.iFeatureValue').each(function (index) {
                        item['params' + key][me.find('.sFeatureName').val()].detail[index] = $(this).val();
                    });
                }
            });
            $('.' + backmap.see().page + ' .dTabsLanguage' + key + ' .fFeature[tool=number]').each(function () {
                me = $(this);
                item['params' + key][me.find('.sFeatureName').val()] = {
                    detail: me.find('.iFeatureValue').val()
                };
                $(this).find('.sFeatureName option').each(function (i) {
                    if ($(this).val() == me.find('.sFeatureName').val()) {
                        item['params' + key][me.find('.sFeatureName').val()].tool = $(this).attr('tool');
                        item['params' + key][me.find('.sFeatureName').val()].title = $(this).text();
                    }
                });
                if (typeof (features[me.find('.sFeatureName').val()]) != 'undefined' && features[me.find('.sFeatureName').val()]['dac-diem-cha'] == 'show')
                    item['params' + key][me.find('.sFeatureName').val()].parent = me.find('.sFeatureParent').val();
                if (typeof (features[me.find('.sFeatureName').val()]) != 'undefined' && features[me.find('.sFeatureName').val()]['da-gia-tri'] == 'show') {
                    if (features[me.find('.sFeatureName').val()]['dac-diem-cha'] == 'show') {
                        item['params' + key][me.find('.sFeatureName').val()].parent = {};
                        me.find('select.sFeatureParent').each(function (index) {
                            item['params' + key][me.find('.sFeatureName').val()].parent[index] = $(this).val();
                        });
                    }
                    item['params' + key][me.find('.sFeatureName').val()].detail = {};
                    me.find('.iFeatureValue').each(function (index) {
                        item['params' + key][me.find('.sFeatureName').val()].detail[index] = $(this).val();
                    });
                }
            });
            $('.' + backmap.see().page + ' .dTabsLanguage' + key + ' .fFeature[tool=select]').each(function () {
                me = $(this);
                item['params' + key][me.find('.sFeatureName').val()] = {
                    detail: me.find('.sFeatureValue').val()
                };
                if (me.find('.sFeatureName').val() == 'kieu-gia-tri')
                    item.keyword = me.find('.sFeatureValue').val();
                if (me.find('.sFeatureOpts').length > 0)
                    item['params' + key][me.find('.sFeatureName').val()].opts = me.find('.sFeatureOpts').val();
                else
                    item['params' + key][me.find('.sFeatureName').val()].opts = me.find('.sFeatureValue').html();
                $(this).find('.sFeatureName option').each(function (i) {
                    if ($(this).val() == me.find('.sFeatureName').val()) {
                        item['params' + key][me.find('.sFeatureName').val()].title = $(this).text();
                        item['params' + key][me.find('.sFeatureName').val()].tool = $(this).attr('tool');
                    }
                });
                if (typeof (features[me.find('.sFeatureName').val()]) != 'undefined' && features[me.find('.sFeatureName').val()]['dac-diem-cha'] == 'show')
                    item['params' + key][me.find('.sFeatureName').val()].parent = me.find('.sFeatureParent').val();
                if (typeof (features[me.find('.sFeatureName').val()]) != 'undefined' && features[me.find('.sFeatureName').val()]['da-gia-tri'] == 'show') {
                    if (features[me.find('.sFeatureName').val()]['dac-diem-cha'] == 'show') {
                        item['params' + key][me.find('.sFeatureName').val()].parent = {};
                        me.find('select.sFeatureParent').each(function (index) {
                            item['params' + key][me.find('.sFeatureName').val()].parent[index] = $(this).val();
                        });
                    }
                    item['params' + key][me.find('.sFeatureName').val()].detail = {};
                    me.find('select.sFeatureValue').each(function (index) {
                        item['params' + key][me.find('.sFeatureName').val()].detail[index] = $(this).val();
                    });
                }
            });
            $('.' + backmap.see().page + ' .dTabsLanguage' + key + ' .fFeature[tool=image]').each(function () {
                me = $(this);
                item['params' + key][me.find('.sFeatureName').val()] = {
                    parent: me.find('.sFeatureParent').val()
                };
                $(this).find('.sFeatureName option').each(function (i) {
                    if ($(this).val() == me.find('.sFeatureName').val()) {
                        item['params' + key][me.find('.sFeatureName').val()].tool = $(this).attr('tool');
                        item['params' + key][me.find('.sFeatureName').val()].title = $(this).text();
                    }
                });
                if (me.find('.dPhoto p').length > 0) {
                    v = {};
                    me.find('.dPhoto p').each(function (index) {
                        v[index] = $(this).find('img:eq(0)').attr('src');
                    });
                    item['params' + key][me.find('.sFeatureName').val()].detail = v;
                }
            });
            $('.' + backmap.see().page + ' .dTabsLanguage' + key + ' .fFeature[tool=date]').each(function () {
                me = $(this);
                item['params' + key][me.find('.sFeatureName').val()] = {
                    parent: me.find('.sFeatureParent').val(),
                    detail: me.find('.iFeatureValue').val()
                };
                $(this).find('.sFeatureName option').each(function (i) {
                    if ($(this).val() == me.find('.sFeatureName').val()) {
                        item['params' + key][me.find('.sFeatureName').val()].title = $(this).text();
                        item['params' + key][me.find('.sFeatureName').val()].tool = $(this).attr('tool');
                    }
                });
            });
            $('.' + backmap.see().page + ' .dTabsLanguage' + key + ' .fFeature[tool=menu]').each(function () {
                me = $(this);
                item['params' + key][me.find('.sFeatureName').val()] = {
                    parent: me.find('select.sFeatureValue').val(),
                    position: me.find('.iFeatureValue').val()
                };
                if (typeof (features[me.find('.sFeatureName').val()]) != 'undefined' && features[me.find('.sFeatureName').val()]['da-gia-tri'] == 'show') {
                    me.find('select.sFeatureValue').each(function (index) {
                        item['params' + key][me.find('.sFeatureName').val()].parent[index] = $(this).val();
                    });
                    me.find('.iFeatureValue').each(function (index) {
                        item['params' + key][me.find('.sFeatureName').val()].position[index] = $(this).val();
                    });
                }
                $(this).find('.sFeatureName option').each(function (i) {
                    if ($(this).val() == me.find('.sFeatureName').val()) {
                        item['params' + key][me.find('.sFeatureName').val()].title = $(this).text();
                        item['params' + key][me.find('.sFeatureName').val()].tool = $(this).attr('tool');
                    }
                });
            });
        });
        if (typeof ($('.' + backmap.see().page + ' [name=keyword]').val()) != 'undefined')
            item.keyword = $('.' + backmap.see().page + ' [name=keyword]').val();
        item.site = LINK;
        if (typeof (temp) != 'undefined') {
            item.site = temp[0].site;
            $.each(temp, function (key, value) {
                if (typeof (temp[key]) != 'undefined') {
                    item['_id' + value.language] = temp[key]._id;
                    if (type != 'term')
                        item['postid' + value.language] = temp[key].postid;
                }
            });
        }
        item.type = type;
        if (type != 'page')
            $('.' + backmap.see().page + ' .fCats .lChecked').each(function (index) {//cats
                item.cats[index] = $(this).attr('cat');
            });
        item.position = $('.' + backmap.see().page + ' [name=position]').val();
        item.path = $('.' + backmap.see().page + ' [name=path]').val();
        item.date = $('.' + backmap.see().page + ' [name=date]').val();
        item.live = $('.' + backmap.see().page + ' .iLive').val();
        web.iReq({ action: 'iSaveContent', item: item }, function (dt) {
            switch (item.type) {
                case 'post':
                    animate.hidezoomout($('.dBoardAddProduct'), 0.3, function () {
                        $('#fProducts').html('');
                        $('.dAppProducts').trigger('click');
                    });
                    break;
                case 'term':
                    animate.hidezoomout($('.dBoardAddCategory'), 0.3, function () {
                        $('.fCats div').remove();
                        $('#fCategories').html('');
                        $('.dAppCategories').trigger('click');
                    });
                    break;
                case 'page':
                    animate.hidezoomout($('.dBoardAddPage'), 0.3, function () {
                        $('#fPages').html('');
                        $('.dAppPages').trigger('click');
                    });
                    break;
                case 'feature':
                    animate.hidezoomout($('.dBoardAddFeature'), 0.3, function () {
                        $('#fFeatures').html('');
                        $('.dAppFeatures').trigger('click');
                    });
                    break;
                case 'menu':
                    animate.hidezoomout($('.dBoardAddMenu'), 0.3, function () {
                        $('#fMenus').html('');
                        $('.dAppMenus').trigger('click');
                    });
                    break;
                case 'lang':
                    animate.hidezoomout($('.dBoardAddPage'), 0.3, function () {
                        $('#fPages').html('');
                        $('.dAppPages').trigger('click');
                    });
                    break;
            }
            if (typeof (temp) != 'undefined')
                backmap.setTime(backmap.time() - 2);
            else
                backmap.setTime(backmap.time() - 1);
            cleanContent(type);
            $('.dBgAction').css('display', 'none');
        });
        $('img.iCheck').fadeIn(200, function () {
            $('img.iReady, .aAccept').fadeOut(200);
        });
        $('.sBtnMore').fadeIn(250);
    }
};
var saveUser = function () {
    if ($('img.iCheck').css('display') == 'inline-block')
        $('img.iReady').fadeIn(200, function () {
            $('img.iCheck').fadeOut(200);
        });
    else {
        $('.dBgAction').css('display', 'block');
        var item = { parameters: {} };
        if (typeof (temp) != 'undefined')
            item._id = temp._id;
        if (backmap.see().page == 'dBoardAddUser') {
            item['displayname'] = $('.' + backmap.see().page + ' [name=displayname]').val();
            item.group = $('.' + backmap.see().page + ' .iGroup').val();
        }
        else
            item.group = 2;
        item['fullname'] = $('.' + backmap.see().page + ' [name=fullname]').val();
        item.gender = $('.' + backmap.see().page + ' .iGender').val();
        item['address'] = $('.' + backmap.see().page + ' [name=address]').val();
        item['phone'] = $('.' + backmap.see().page + ' [name=phone]').val();
        item['email'] = $('.' + backmap.see().page + ' [name=email]').val();
        if ($('.' + backmap.see().page + ' .dPhoto p').length > 0)
            item['image'] = $('.' + backmap.see().page + ' .dPhoto p > img').attr('src');
        else
            item['image'] = '';
        $('.' + backmap.see().page + ' .fFeature[tool=text]').each(function () {
            me = $(this);
            item['params' + key][me.find('.sFeatureName').val()] = {
                parent: me.find('.sFeatureParent').val()
            };
            $(this).find('.sFeatureName option').each(function (i) {
                if ($(this).val() == me.find('.sFeatureName').val()) {
                    item['params' + key][me.find('.sFeatureName').val()].tool = $(this).attr('tool');
                    item['params' + key][me.find('.sFeatureName').val()].title = $(this).text();
                }
            });
            if (CKEDITOR.instances[me.find('textarea').attr('name')].getData() != '')
                item['params' + key][me.find('.sFeatureName').val()].detail = CKEDITOR.instances[me.find('textarea').attr('name')].getData();
        });
        $('.' + backmap.see().page + ' .fFeature[tool=select]').each(function () {
            me = $(this);
            item['params' + key][me.find('.sFeatureName').val()] = {
                detail: me.find('.sFeatureValue').val()
            };
            if (me.find('.sFeatureName').val() == 'kieu-gia-tri')
                item.keyword = me.find('.sFeatureValue').val();
            if (me.find('.sFeatureOpts').length > 0)
                item['params' + key][me.find('.sFeatureName').val()].opts = me.find('.sFeatureOpts').val();
            else
                item['params' + key][me.find('.sFeatureName').val()].opts = me.find('.sFeatureValue').html();
            $(this).find('.sFeatureName option').each(function (i) {
                if ($(this).val() == me.find('.sFeatureName').val()) {
                    item['params' + key][me.find('.sFeatureName').val()].title = $(this).text();
                    item['params' + key][me.find('.sFeatureName').val()].tool = $(this).attr('tool');
                }
            });
            if (typeof (features[me.find('.sFeatureName').val()]) != 'undefined' && features[me.find('.sFeatureName').val()]['dac-diem-cha'] == 'show')
                item['params' + key][me.find('.sFeatureName').val()].parent = me.find('.sFeatureParent').val();
            if (typeof (features[me.find('.sFeatureName').val()]) != 'undefined' && features[me.find('.sFeatureName').val()]['da-gia-tri'] == 'show') {
                if (features[me.find('.sFeatureName').val()]['dac-diem-cha'] == 'show') {
                    item['params' + key][me.find('.sFeatureName').val()].parent = {};
                    me.find('select.sFeatureParent').each(function (index) {
                        item['params' + key][me.find('.sFeatureName').val()].parent[index] = $(this).val();
                    });
                }
                item['params' + key][me.find('.sFeatureName').val()].detail = {};
                me.find('.sFeatureValue').each(function (index) {
                    item['params' + key][me.find('.sFeatureName').val()].detail[index] = $(this).val();
                });
            }
        });
        $('.' + backmap.see().page + ' .fFeature[tool=image]').each(function () {
            me = $(this);
            item['params' + key][me.find('.sFeatureName').val()] = {
                parent: me.find('.sFeatureParent').val()
            };
            $(this).find('.sFeatureName option').each(function (i) {
                if ($(this).val() == me.find('.sFeatureName').val()) {
                    item['params' + key][me.find('.sFeatureName').val()].tool = $(this).attr('tool');
                    item['params' + key][me.find('.sFeatureName').val()].title = $(this).text();
                }
            });
        });
        $('.' + backmap.see().page + ' .fFeature[tool=date]').each(function () {
            me = $(this);
            item['params' + key][me.find('.sFeatureName').val()] = {
                parent: me.find('.sFeatureParent').val(),
                detail: me.find('.iFeatureValue').val()
            };
            $(this).find('.sFeatureName option').each(function (i) {
                if ($(this).val() == me.find('.sFeatureName').val()) {
                    item['params' + key][me.find('.sFeatureName').val()].title = $(this).text();
                    item['params' + key][me.find('.sFeatureName').val()].tool = $(this).attr('tool');
                }
            });
        });
        item.active = $('.' + backmap.see().page + ' .iLive').val();
        web.iReq({ action: 'iSaveUser', item: item }, function (data) {
            if (backmap.see().page == 'dBoardAddUser') {
                animate.hidezoomout($('.' + backmap.see().page), 0.3, function () {
                    $('#fUsers').html('');
                    $('.dAppUsers').trigger('click');
                });
                cleanContent('people');
            }
            else {
                animate.hidezoomout($('.' + backmap.see().page), 0.3, function () {
                    $('#fCustomers').html('');
                    $('.dAppCustomers').trigger('click');
                });
                cleanContent('customer');
            }
            if (typeof (temp) != 'undefined')
                backmap.setTime(backmap.time() - 2);
            else
                backmap.setTime(backmap.time() - 1);
            $('.dBgAction').css('display', 'none');
            console.log(data);
        });
        $('img.iCheck').fadeIn(200, function () {
            $('img.iReady, .aAccept').fadeOut(200);
        });
        $('.sBtnMore').fadeIn(250);
    }
};
var saveLanguage = function () {
    if ($('img.iCheck').css('display') == 'inline-block')
        $('img.iReady').fadeIn(200, function () {
            $('img.iCheck').fadeOut(200);
        });
    else {
        $('.dBgAction').css('display', 'block');
        var item = { parameters: {} };
        if (typeof (temp) != 'undefined') {
            item._id = temp[0]._id;
            item.idOld = temp[0].id;
        }
        $.each(languages, function (key, value) {
            item['name' + key] = $('.' + backmap.see().page + ' [name=name' + key + ']').val();
        });
        item.id = $('.' + backmap.see().page + ' [name=id]').val();
        item.image = $('.' + backmap.see().page + ' .dPhoto:eq(0) p > img').attr('src');
        item.position = $('.' + backmap.see().page + ' [name=position]').val();
        $('.' + backmap.see().page + ' .fFeature[tool=text]').each(function () {
            me = $(this);
            item['params' + key][me.find('.sFeatureName').val()] = {
                parent: me.find('.sFeatureParent').val()
            };
            $(this).find('.sFeatureName option').each(function (i) {
                if ($(this).val() == me.find('.sFeatureName').val()) {
                    item['params' + key][me.find('.sFeatureName').val()].tool = $(this).attr('tool');
                    item['params' + key][me.find('.sFeatureName').val()].title = $(this).text();
                }
            });
            if (CKEDITOR.instances[me.find('textarea').attr('name')].getData() != '')
                item['params' + key][me.find('.sFeatureName').val()].detail = CKEDITOR.instances[me.find('textarea').attr('name')].getData();
        });
        $('.' + backmap.see().page + ' .fFeature[tool=select]').each(function () {
            me = $(this);
            item['params' + key][me.find('.sFeatureName').val()] = {
                detail: me.find('.sFeatureValue').val()
            };
            if (me.find('.sFeatureName').val() == 'kieu-gia-tri')
                item.keyword = me.find('.sFeatureValue').val();
            if (me.find('.sFeatureOpts').length > 0)
                item['params' + key][me.find('.sFeatureName').val()].opts = me.find('.sFeatureOpts').val();
            else
                item['params' + key][me.find('.sFeatureName').val()].opts = me.find('.sFeatureValue').html();
            $(this).find('.sFeatureName option').each(function (i) {
                if ($(this).val() == me.find('.sFeatureName').val()) {
                    item['params' + key][me.find('.sFeatureName').val()].title = $(this).text();
                    item['params' + key][me.find('.sFeatureName').val()].tool = $(this).attr('tool');
                }
            });
            if (typeof (features[me.find('.sFeatureName').val()]) != 'undefined' && features[me.find('.sFeatureName').val()]['dac-diem-cha'] == 'show')
                item['params' + key][me.find('.sFeatureName').val()].parent = me.find('.sFeatureParent').val();
            if (typeof (features[me.find('.sFeatureName').val()]) != 'undefined' && features[me.find('.sFeatureName').val()]['da-gia-tri'] == 'show') {
                if (features[me.find('.sFeatureName').val()]['dac-diem-cha'] == 'show') {
                    item['params' + key][me.find('.sFeatureName').val()].parent = {};
                    me.find('select.sFeatureParent').each(function (index) {
                        item['params' + key][me.find('.sFeatureName').val()].parent[index] = $(this).val();
                    });
                }
                item['params' + key][me.find('.sFeatureName').val()].detail = {};
                me.find('.sFeatureValue').each(function (index) {
                    item['params' + key][me.find('.sFeatureName').val()].detail[index] = $(this).val();
                });
            }
        });
        $('.' + backmap.see().page + ' .fFeature[tool=image]').each(function () {
            me = $(this);
            item['params' + key][me.find('.sFeatureName').val()] = {
                parent: me.find('.sFeatureParent').val()
            };
            $(this).find('.sFeatureName option').each(function (i) {
                if ($(this).val() == me.find('.sFeatureName').val()) {
                    item['params' + key][me.find('.sFeatureName').val()].tool = $(this).attr('tool');
                    item['params' + key][me.find('.sFeatureName').val()].title = $(this).text();
                }
            });
            if (me.find('.dPhoto p').length > 0) {
                v = {};
                me.find('.dPhoto p').each(function (index) {
                    v[index] = $(this).find('img:eq(0)').attr('src');
                });
                item['params' + key][me.find('.sFeatureName').val()].detail = v;
            }
        });
        $('.' + backmap.see().page + ' .fFeature[tool=date]').each(function () {
            me = $(this);
            item['params' + key][me.find('.sFeatureName').val()] = {
                parent: me.find('.sFeatureParent').val(),
                detail: me.find('.iFeatureValue').val()
            };
            $(this).find('.sFeatureName option').each(function (i) {
                if ($(this).val() == me.find('.sFeatureName').val()) {
                    item['params' + key][me.find('.sFeatureName').val()].title = $(this).text();
                    item['params' + key][me.find('.sFeatureName').val()].tool = $(this).attr('tool');
                }
            });
        });
        item.active = $('.' + backmap.see().page + ' .iLive').val();
        web.iReq({ action: 'iSaveLanguage', item: item }, function (data) {
            animate.hidezoomout($('.dBoardAddLanguage'), 0.3, function () {
                $('#fLanguages').html('');
                $('.dAppLanguages').trigger('click');
            });
            if (typeof (temp) != 'undefined')
                backmap.setTime(backmap.time() - 2);
            else
                backmap.setTime(backmap.time() - 1);
            cleanContent('language');
            $('.dBgAction').css('display', 'none');
        });
        $('img.iCheck').fadeIn(200, function () {
            $('img.iReady').fadeOut(200);
        });
        $('.sBtnMore').fadeIn(250);
    }
};
var cleanContent = function (type) {
    switch (type) {
        case 'post':
            $('#fAddProduct')[0].reset();
            $.each(languages, function (key, value) {
                CKEDITOR.instances['ProDetail' + key].setData('');
            });
            $('#fAddProduct .dPhoto, #fAddProduct .dFeatures').html('');
            $('#fAddProduct .lChecked').removeClass('lChecked');
            break;
        case 'locpost':
            $('#fAddLocProduct')[0].reset();
            $.each(languages, function (key, value) {
                CKEDITOR.instances['ProLocDetail' + key].setData('');
            });
            $('#fAddLocProduct .dPhoto, #fAddLocProduct .dFeatures').html('');
            $('#fAddLocProduct .lChecked').removeClass('lChecked');
            break;
        case 'term':
            $('#fAddCategory')[0].reset();
            $('#fAddCategory .dPhoto, #fAddCategory .dFeatures').html('');
            $('#fAddCategory .lChecked').removeClass('lChecked');
            break;
        case 'page':
            $('#fAddPage')[0].reset();
            $.each(languages, function (key, value) {
                CKEDITOR.instances['PgDetail' + key].setData('');
            });
            $('#fAddPage .dPhoto, #fAddPage .dFeatures').html('');
            break;
        case 'feature':
            $('#fAddFeature')[0].reset();
            $.each(languages, function (key, value) {
                CKEDITOR.instances['FeaDetail' + key].setData('');
            });
            $('#fAddFeature .dPhoto, #fAddFeature .dFeatures').html('');
            break;
        case 'menu':
            $('#fAddMenu')[0].reset();
            $.each(languages, function (key, value) {
                CKEDITOR.instances['MnuDetail' + key].setData('');
            });
            $('#fAddMenu .dPhoto, #fAddMenu .dMenus').html('');
            break;
        case 'language':
            $('#fAddLanguage')[0].reset();
            $('#fAddLang .dPhoto, #fAddLang .dFeatures').html('');
            break;
        case 'people':
            $('#fAddUser')[0].reset();
            $('#fAddUser .dPhoto, #fAddUser .dFeatures').html('');
            break;
        case 'customer':
            $('#fAddCustomer')[0].reset();
            $('#fAddCustomer .dPhoto, #fAddCustomer .dFeatures').html('');
            break;
        default:
            $('#fAddProduct')[0].reset();
            $('#fAddCategory')[0].reset();
            $('#fAddPage')[0].reset();
            $('.dPhoto, .dFeatures').html('');
            $('.lChecked').removeClass('lChecked');
            $.each(languages, function (key, value) {
                (typeof (CKEDITOR.instances['ProDetail' + key]) != 'undefined') ? CKEDITOR.instances['ProDetail' + key].setData('') : '';
                (typeof (CKEDITOR.instances['PgDetail' + key]) != 'undefined') ? CKEDITOR.instances['PgDetail' + key].setData('') : '';
            });
            break;
    };
    $('.aCustomBtn, .aExcel').fadeOut(300);
    delete temp;
};
var getFeatures = function (idForm, value, key, val, num) {
    switch (val.tool) {
        case 'editor':
            p = '<fieldset class="fFeature fFeature' + num + '" num="' + num + '" tool="' + val.tool + '" style="opacity: 0"><div>' +
                '<a class="aMinFeature" title="' + tran('Thu gọn|Minimize|||') + '"><i class="fa fa-minus"></i></a>' +
                '<a class="aDelFeature" title="' + tran('Hủy|Delete|||') + '"><img src="' + SKIN + '/admin/close.jpg" alt="wsup3"/></a>' +
                '<div class="dLine">' +
                '<label for="sFeatureName' + num + '">' + tran('Tên đặc điểm|Feature name|||') + ':&nbsp;</label>' +
                '<select id="sFeatureName' + num + '" class="sFeatureName sFeatureName' + num + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select>' +
                '</div>';
            num2 = num;
            if (typeof (val.detail) == 'object')
                $.each(val.detail, function (k, v) {
                    if (k == 0)
                        p += '<div class="dTypeControl dTypeControl' + num2 + '">' +
                            ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num2 + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num2 + '" class="sFeatureParent sFeatureParent' + num2 + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                            '<textarea name="featureDetail' + num2 + '" class="tFeatureDetail tFeatureDetail' + num2 + '" style="opacity: 0"></textarea></div>';
                    else
                        p += '<div class="dValue"><div class="dTypeControl dTypeControl' + num2 + '">' +
                            ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num2 + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num2 + '" class="sFeatureParent sFeatureParent' + num2 + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                            '<textarea name="featureDetail' + num2 + '" class="tFeatureDetail tFeatureDetail' + num2 + '" style="opacity: 0"></textarea></div><a>_</a></div>';
                    num2++;
                });
            else {
                p += '<div class="dTypeControl dTypeControl' + num + '">' +
                    ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num + '" class="sFeatureParent sFeatureParent' + num + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                    '<textarea name="featureDetail' + num + '" class="tFeatureDetail tFeatureDetail' + num + '" style="opacity: 0"></textarea></div>';
            }
            $(idForm + ' .dTabsLanguage' + value.language + ' .dFeatures').prepend(p + ((typeof (features[key]) == 'undefined') ? '' : (features[key]['da-gia-tri'] == 'show') ? '<a num="' + num + '" key="' + key + '" class="aValue">' + tran('Thêm nội dung|Add content||') + '</a>' : '') +
                '</div></fieldset>').find('fieldset').first().fadeTo(300, 1);
            num2 = num;
            if (typeof (val.detail) == 'object') {
                if (typeof (val.parent) == 'object')
                    $.each(val.parent, function (k, v) {
                        $('.sFeatureParent' + num2).val(v).selectBox();
                        num2++;
                    });
                else
                    $('.sFeatureParent' + num2).val(val.paren).selectBox();
                num2 = num;
                $.each(val.detail, function (k, v) {
                    ck = CKEDITOR.replace('featureDetail' + num2);
                    addBtnCke(ck);
                    CKEDITOR.instances['featureDetail' + num2].setData(v);
                    num2++;
                });
            }
            else {
                ck = CKEDITOR.replace('featureDetail' + num);
                addBtnCke(ck);
                CKEDITOR.instances['featureDetail' + num].setData(val.detail);
            }
            $('.sFeatureName' + num).val(key).selectBox();
            $('.sFeatureName' + num).attr('num', num);
            num = num2;
            break;
        case 'text':
            p = '<fieldset class="fFeature fFeature' + num + '" num="' + num + '" tool="' + val.tool + '" style="opacity: 0"><div>' +
                '<a class="aMinFeature" title="' + tran('Thu gọn|Minimize|||') + '"><i class="fa fa-minus"></i></a>' +
                '<a class="aDelFeature" title="' + tran('Hủy|Delete|||') + '"><img src="' + SKIN + '/admin/close.jpg" alt="wsup3"/></a>' +
                '<div class="dLine">' +
                '<label for="sFeatureName' + num + '">' + tran('Tên đặc điểm|Feature name|||') + ':&nbsp;</label>' +
                '<select id="sFeatureName' + num + '" class="sFeatureName sFeatureName' + num + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select>' +
                '</div>';
            num2 = num;
            if (typeof (val.detail) == 'object')
                $.each(val.detail, function (k, v) {
                    if (k == 0)
                        p += '<div class="dTypeControl dTypeControl' + num2 + '">' +
                            ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num2 + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num2 + '" class="sFeatureParent sFeatureParent' + num2 + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                            '<div class="dLine">' +
                            '<label for="iFeatureValue' + num2 + '">' + tran('Giá trị|Value|||') + ':&nbsp;</label>' +
                            '<input type="text" id="iFeatureValue' + num2 + '" class="iFeatureValue iFeatureValue' + num2 + '" />' +
                            '</div></div>';
                    else
                        p += '<div class="dValue"><div class="dTypeControl dTypeControl' + num2 + '">' +
                            ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num2 + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num2 + '" class="sFeatureParent sFeatureParent' + num2 + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                            '<div class="dLine">' +
                            '<label for="iFeatureValue' + num2 + '">' + tran('Giá trị|Value|||') + ':&nbsp;</label>' +
                            '<input type="text" id="iFeatureValue' + num2 + '" class="iFeatureValue iFeatureValue' + num2 + '" />' +
                            '</div></div><a>_</a></div>';
                    num2++;
                });
            else {
                p += '<div class="dTypeControl dTypeControl' + num + '">' +
                    ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num + '" class="sFeatureParent sFeatureParent' + num + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                    '<div class="dLine">' +
                    '<label for="iFeatureValue' + num + '">' + tran('Giá trị|Value|||') + ':&nbsp;</label>' +
                    '<input type="text" id="iFeatureValue' + num + '" class="iFeatureValue iFeatureValue' + num + '" />' +
                    '</div></div>';
            }
            $(idForm + ' .dTabsLanguage' + value.language + ' .dFeatures').prepend(p + ((typeof (features[key]) == 'undefined') ? '' : (features[key]['da-gia-tri'] == 'show') ? '<a num="' + num + '" key="' + key + '" class="aValue">' + tran('Thêm giá trị|Add value||') + '</a>' : '') +
                '</div></fieldset>').find('fieldset').first().fadeTo(300, 1);
            num2 = num;
            if (typeof (val.detail) == 'object') {
                if (typeof (val.parent) == 'object')
                    $.each(val.parent, function (k, v) {
                        $('.sFeatureParent' + num2).val(v).selectBox();
                        num2++;
                    });
                else
                    $('.sFeatureParent' + num2).val(val.parent).selectBox();
                num2 = num;
                $.each(val.detail, function (k, v) {
                    $('.iFeatureValue' + num2).val(v);
                    num2++;
                });
            }
            else {
                $('.sFeatureParent' + num).val(val.parent).selectBox();
                $('.iFeatureValue' + num).val(val.detail);
            }
            $('.sFeatureName' + num).val(key).selectBox();
            $('.sFeatureName' + num).attr('num', num);
            num = num2;
            break;
        case 'number':
            p = '<fieldset class="fFeature fFeature' + num + '" num="' + num + '" tool="' + val.tool + '" style="opacity: 0"><div>' +
                '<a class="aMinFeature" title="' + tran('Thu gọn|Minimize|||') + '"><i class="fa fa-minus"></i></a>' +
                '<a class="aDelFeature" title="' + tran('Hủy|Delete|||') + '"><img src="' + SKIN + '/admin/close.jpg" alt="wsup3"/></a>' +
                '<div class="dLine">' +
                '<label for="sFeatureName' + num + '">' + tran('Tên đặc điểm|Feature name|||') + ':&nbsp;</label>' +
                '<select id="sFeatureName' + num + '" class="sFeatureName sFeatureName' + num + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select>' +
                '</div>';
            num2 = num;
            if (typeof (val.detail) == 'object')
                $.each(val.detail, function (k, v) {
                    if (k == 0)
                        p += '<div class="dTypeControl dTypeControl' + num2 + '">' +
                            ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num2 + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num2 + '" class="sFeatureParent sFeatureParent' + num2 + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                            '<div class="dLine">' +
                            '<label for="iFeatureValue' + num2 + '">' + tran('Giá trị|Value|||') + ':&nbsp;</label>' +
                            '<input type="number" id="iFeatureValue' + num2 + '" class="iFeatureValue iFeatureValue' + num2 + '" />' +
                            '</div></div>';
                    else
                        p += '<div class="dValue"><div class="dTypeControl dTypeControl' + num2 + '">' +
                            ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num2 + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num2 + '" class="sFeatureParent sFeatureParent' + num2 + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                            '<div class="dLine">' +
                            '<label for="iFeatureValue' + num2 + '">' + tran('Giá trị|Value|||') + ':&nbsp;</label>' +
                            '<input type="number" id="iFeatureValue' + num2 + '" class="iFeatureValue iFeatureValue' + num2 + '" />' +
                            '</div></div><a>_</a></div>';
                    num2++;
                });
            else {
                p += '<div class="dTypeControl dTypeControl' + num + '">' +
                    ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num + '" class="sFeatureParent sFeatureParent' + num + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                    '<div class="dLine">' +
                    '<label for="iFeatureValue' + num + '">' + tran('Giá trị|Value|||') + ':&nbsp;</label>' +
                    '<input type="number" id="iFeatureValue' + num + '" class="iFeatureValue iFeatureValue' + num + '" />' +
                    '</div></div>';
            }
            $(idForm + ' .dTabsLanguage' + value.language + ' .dFeatures').prepend(p + ((typeof (features[key]) == 'undefined') ? '' : (features[key]['da-gia-tri'] == 'show') ? '<a num="' + num + '" key="' + key + '" class="aValue">' + tran('Thêm giá trị|Add value||') + '</a>' : '') +
                '</div></fieldset>').find('fieldset').first().fadeTo(300, 1);
            num2 = num;
            if (typeof (val.detail) == 'object') {
                if (typeof (val.parent) == 'object')
                    $.each(val.parent, function (k, v) {
                        $('.sFeatureParent' + num2).val(v).selectBox();
                        num2++;
                    });
                else
                    $('.sFeatureParent' + num2).val(val.parent).selectBox();
                num2 = num;
                $.each(val.detail, function (k, v) {
                    $('.iFeatureValue' + num2).val(v);
                    num2++;
                });
            }
            else {
                $('.sFeatureParent' + num).val(val.parent).selectBox();
                $('.iFeatureValue' + num).val(val.detail);
            }
            $('.sFeatureName' + num).val(key).selectBox();
            $('.sFeatureName' + num).attr('num', num);
            num = num2;
            break;
        case 'select':
            p = '<fieldset class="fFeature fFeature' + num + '" num="' + num + '" tool="' + val.tool + '" style="opacity: 0"><div>' +
                '<a class="aMinFeature" title="' + tran('Thu gọn|Minimize|||') + '"><i class="fa fa-minus"></i></a>' +
                '<a class="aDelFeature" title="' + tran('Hủy|Delete|||') + '"><img src="' + SKIN + '/admin/close.jpg" alt="wsup3"/></a>' +
                '<div class="dLine">' +
                '<label for="sFeatureName' + num + '">' + tran('Tên đặc điểm|Feature name|||') + ':&nbsp;</label>' +
                '<select id="sFeatureName' + num + '" class="sFeatureName sFeatureName' + num + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select>' +
                '</div>';
            num2 = num;
            if (typeof (val.detail) == 'object')
                $.each(val.detail, function (k, v) {
                    if (k == 0)
                        p += '<div class="dTypeControl dTypeControl' + num2 + '">' +
                            ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num2 + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num2 + '" class="sFeatureParent sFeatureParent' + num2 + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                            '<div class="dLine">' +
                            '<label for="sFeatureValue' + num2 + '">' + tran('Giá trị|Value|||') + ':&nbsp;</label>' +
                            '<select id="sFeatureValue' + num2 + '" class="sFeatureValue sFeatureValue' + num2 + '">' + val.opts + '</select>' +
                            '</div></div>';
                    else
                        p += '<div class="dValue"><div class="dTypeControl dTypeControl' + num2 + '">' +
                            ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num2 + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num2 + '" class="sFeatureParent sFeatureParent' + num2 + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                            '<div class="dLine">' +
                            '<label for="sFeatureValue' + num2 + '">' + tran('Giá trị|Value|||') + ':&nbsp;</label>' +
                            '<select id="sFeatureValue' + num2 + '" class="sFeatureValue sFeatureValue' + num2 + '">' + val.opts + '</select>' +
                            '</div></div><a>_</a></div>';
                    num2++;
                });
            else {
                p += '<div class="dTypeControl dTypeControl' + num + '">' +
                    ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num + '" class="sFeatureParent sFeatureParent' + num + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                    '<div class="dLine">' +
                    '<label for="sFeatureValue' + num + '">' + tran('Giá trị|Value|||') + ':&nbsp;</label>' +
                    '<select id="sFeatureValue' + num2 + '" class="sFeatureValue sFeatureValue' + num2 + '">' + val.opts + '</select>' +
                    '</div></div>';
            }
            $(idForm + ' .dTabsLanguage' + value.language + ' .dFeatures').prepend(p + ((typeof (features[key]) == 'undefined') ? '' : (features[key]['da-gia-tri'] == 'show') ? '<a num="' + num + '" key="' + key + '" class="aValue">' + tran('Thêm giá trị|Add value||') + '</a>' : '') +
                '</div></fieldset>').find('fieldset').first().fadeTo(300, 1);
            num2 = num;
            if (typeof (val.detail) == 'object') {
                if (typeof (val.parent) == 'object')
                    $.each(val.parent, function (k, v) {
                        $('.sFeatureParent' + num2).val(v).selectBox();
                        num2++;
                    });
                else
                    $('.sFeatureParent' + num2).val(val.parent).selectBox();
                num2 = num;
                $.each(val.detail, function (k, v) {
                    $('.sFeatureValue' + num2).val(v).selectBox();
                    num2++;
                });
            }
            else {
                $('.sFeatureParent' + num).val(val.parent).selectBox();
                $('.sFeatureValue' + num).val(val.detail).selectBox();
                if ($('.sFeatureValue' + num).val() == 'select') {
                    $('.sFeatureValue' + num).parent().after('<div class="dLine">' +
                        '<label for="sFeatureOpts' + num + '">Options code:&nbsp;</label>' +
                        '<input type="text" value="" id="sFeatureOpts' + num + '" class="sFeatureOpts sFeatureOpts' + num + '"/>' +
                        '</div>');
                    $('.sFeatureOpts' + num).val(val.opts);
                }
            }
            $('.sFeatureName' + num).val(key).selectBox();
            $('.sFeatureName' + num).attr('num', num);
            num = num2;
            break;
        case 'image':
            imgs = '';
            $.each(val.detail, function (ky, val) {
                imgs += '<p><img src="' + val + '" alt="wsup3"/><a><img src="' + SKIN + '/admin/close.jpg" alt="wsup3"/></a></p>';
            });
            $(idForm + ' .dTabsLanguage' + value.language + ' .dFeatures').prepend('<fieldset class="fFeature fFeature' + num + '" num="' + num + '" tool="' + val.tool + '" style="opacity: 0"><div>' +
                '<a class="aMinFeature" title="' + tran('Thu gọn|Minimize|||') + '"><i class="fa fa-minus"></i></a>' +
                '<a class="aDelFeature" title="' + tran('Hủy|Delete|||') + '"><img src="' + SKIN + '/admin/close.jpg" alt="wsup3"/></a>' +
                '<div class="dLine">' +
                '<label for="sFeatureName' + num + '">' + tran('Tên đặc điểm|Feature name|||') + ':&nbsp;</label>' +
                '<select id="sFeatureName' + num + '" class="sFeatureName sFeatureName' + num + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select>' +
                '</div><div class="dTypeControl dTypeControl' + num + '">' +
                ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num + '" class="sFeatureParent sFeatureParent' + num + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                '<div class="dPhoto">' + imgs + '</div><a class="aPhoto">' + $('.aPhoto').html() + '</a></div>' +
                '</div></fieldset>').find('fieldset').first().fadeTo(300, 1);
            $('.sFeatureName' + num).val(key).selectBox();
            $('.sFeatureParent' + num).val(val.parent).selectBox();
            $('.sFeatureValue' + num).selectBox();
            $('.sFeatureName' + num).attr('num', num);
            break;
        case 'date':
            $(idForm + ' .dTabsLanguage' + value.language + ' .dFeatures').prepend('<fieldset class="fFeature fFeature' + num + '" num="' + num + '" tool="' + val.tool + '" style="opacity: 0"><div>' +
                '<a class="aMinFeature" title="' + tran('Thu gọn|Minimize|||') + '"><i class="fa fa-minus"></i></a>' +
                '<a class="aDelFeature" title="' + tran('Hủy|Delete|||') + '"><img src="' + SKIN + '/admin/close.jpg" alt="wsup3"/></a>' +
                '<div class="dLine">' +
                '<label for="sFeatureName' + num + '">' + tran('Tên đặc điểm|Feature name|||') + ':&nbsp;</label>' +
                '<select id="sFeatureName' + num + '" class="sFeatureName sFeatureName' + num + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select>' +
                '</div><div class="dTypeControl dTypeControl' + num + '">' +
                ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num + '" class="sFeatureParent sFeatureParent' + num + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                '<div class="dLine">' +
                '<label for="iFeatureValue' + num + '">' + tran('Giá trị|Value|||') + ':&nbsp;</label>' +
                '<input type="date" id="iFeatureValue' + num + '" class="iFeatureValue iFeatureValue' + num + '"/>' +
                '</div></div>' +
                '</div></fieldset>').find('fieldset').first().fadeTo(300, 1);
            $('.sFeatureName' + num).val(key).selectBox();
            $('.sFeatureParent' + num).val(val.parent).selectBox();
            $('.sFeatureName' + num).attr('num', num);
            $('.iFeatureValue' + num).val(val.detail.substring(0, 10));
            break;
        case 'menu':
            web.iReq({ action: 'iGetMenu', menu: key, _id: c[0]._id }, function (dt) {
                optemp = '<option value="false">Không</option>';
                if (typeof (dt) != 'undefined' && dt.length > 0)
                    $.each(dt, function (k, v) {
                        optemp += '<option value="' + v._id + '">' + v.title + '</option>'
                    });
                p = '<fieldset class="fFeature fFeature' + num + '" num="' + num + '" tool="' + val.tool + '" style="opacity: 0"><div>' +
                    '<a class="aMinFeature" title="' + tran('Thu gọn|Minimize|||') + '"><i class="fa fa-minus"></i></a>' +
                    '<a class="aDelFeature" title="' + tran('Hủy|Delete|||') + '"><img src="' + SKIN + '/admin/close.jpg" alt="wsup3"/></a>' +
                    '<div class="dLine">' +
                    '<label for="sFeatureName' + num + '">' + tran('Tên đặc điểm|Feature name|||') + ':&nbsp;</label>' +
                    '<select id="sFeatureName' + num + '" class="sFeatureName sFeatureName' + num + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select>' +
                    '</div>';
                num2 = num;
                if (typeof (val.parent) == 'object')
                    $.each(val.parent, function (k, v) {
                        if (k == 0)
                            p += '<div class="dTypeControl dTypeControl' + num2 + '">' +
                                ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num2 + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num2 + '" class="sFeatureParent sFeatureParent' + num2 + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                                '<div class="dLine">' +
                                '<label for="sFeatureValue' + num2 + '">' + tran('Trình đơn cha|Parent menu|||') + ':&nbsp;</label>' +
                                '<select id="sFeatureValue' + num2 + '" class="sFeatureValue sFeatureValue' + num2 + '">' + optemp + '</select>' +
                                '<label for="iFeatureValue' + num2 + '">' + tran('Vị trí|Position|||') + ':&nbsp;</label>' +
                                '<input type="number" min="1" id="iFeatureValue' + num2 + '" class="iFeatureValue iFeatureValue' + num2 + '"/>' +
                                '</div></div>';
                        else
                            p += '<div class="dValue"><div class="dTypeControl dTypeControl' + num2 + '">' +
                                ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num2 + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num2 + '" class="sFeatureParent sFeatureParent' + num2 + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                                '<div class="dLine">' +
                                '<label for="sFeatureValue' + num2 + '">' + tran('Trình đơn cha|Parent menu|||') + ':&nbsp;</label>' +
                                '<select id="sFeatureValue' + num2 + '" class="sFeatureValue sFeatureValue' + num2 + '">' + optemp + '</select>' +
                                '<label for="iFeatureValue' + num2 + '">' + tran('Vị trí|Position|||') + ':&nbsp;</label>' +
                                '<input type="number" min="1" id="iFeatureValue' + num2 + '" class="iFeatureValue iFeatureValue' + num2 + '"/>' +
                                '</div></div><a>_</a></div>';
                        num2++;
                    });
                else {
                    p += '<div class="dTypeControl dTypeControl' + num + '">' +
                        ((typeof (features[key]) == 'undefined') ? '' : (features[key]['dac-diem-cha'] == 'show') ? '<div class="dLine"><label for="sFeatureParent' + num2 + '">' + tran('Đặc điểm cha|Feature parent|||') + ':&nbsp;</label><select id="sFeatureParent' + num2 + '" class="sFeatureParent sFeatureParent' + num2 + '">' + features[$(idForm + ' .aFeature').attr('type')].opts + '</select></div>' : '') +
                        '<div class="dLine">' +
                        '<label for="sFeatureValue' + num + '">' + tran('Trình đơn cha|Parent menu|||') + ':&nbsp;</label>' +
                        '<select id="sFeatureValue' + num + '" class="sFeatureValue sFeatureValue' + num + '">' + optemp + '</select>' +
                        '<label for="iFeatureValue' + num + '">' + tran('Vị trí|Position|||') + ':&nbsp;</label>' +
                        '<input type="number" min="1" id="iFeatureValue' + num + '" class="iFeatureValue iFeatureValue' + num + '"/>' +
                        '</div></div>';
                }
                $(idForm + ' .dTabsLanguage' + value.language + ' .dFeatures').prepend(p + ((typeof (features[key]) == 'undefined') ? '' : (features[key]['da-gia-tri'] == 'show') ? '<a num="' + num + '" key="' + key + '" class="aValue">' + tran('Thêm giá trị|Add value||') + '</a>' : '') +
                    '</div></fieldset>').find('fieldset').first().fadeTo(300, 1);
                num2 = num;
                if (typeof (val.parent) == 'object') {
                    $.each(val.parent, function (k, v) {
                        $('.sFeatureValue' + num2).val(v).selectBox();
                        num2++;
                    });
                }
                else {
                    $('.sFeatureValue' + num).val(val.parent).selectBox();
                    $('.iFeatureValue' + num).val(val.position);
                }
                $('.sFeatureName' + num).val(key).selectBox();
                $('.sFeatureName' + num).attr('num', num);
                num = num2;
            });
            break;
        default:
            $('.dTypeControl' + num).html('');
            break;
    }
    return num;
};