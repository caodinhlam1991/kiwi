pros = []
$(document).ready(function() {
    $('.dAppSell').live('click', function () {
        if (refresh.pros == true) {
            pros = [];
            $('.dBoardSell .dProducts > div').html('');
            delete refresh.pros;
        }
        backmap.add({page: 'dBoardSell', action: {fn: function () {
            changePage($('.dBoardSell'), 'dShow', {fn: function () {
                if (pros.length == 0) {
                    web.iReq({action: 'iGetPros'}, function (dt) {
                        pros = dt;
                        $.each(pros.items, function (k, v) {
                            $('.dBoardSell .dProducts > div').append('<div key="' + k + '" _id="' + v._id + '" class="dProductSelect">' +
                                '<a><img src="' + ((v.imgs.hasOwnProperty(0) == true) ? ((typeof(v.imgs[0]) == 'object') ? ((v.imgs[0] != null) ? v.imgs[0][0] : SKIN + '/logo.png') : v.imgs[0]) : SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                                '<a>' + v.title + '</a></div>');
                            align.topleft($('.dBoardSell .dProductSelect:eq(' + k + ') a img'), $('.dBoardSell .dProductSelect:eq(' + k + ') a'), 0, 0, 1);
                        });
                        $.each(pros.customer, function (k, v) {
                            $('.dBoardSell .sCustomer').append('<option value="' + v._id + '">' + ((typeof(v.fullname) == 'undefined') ? v.displayname : v.fullname) + '</option>')
                        });
                    });
                }
                else if ($('.dBoardSell .dProducts > div').html() == '') {
                    $.each(pros.items, function (k, v) {
                        $('.dBoardSell .dProducts > div').append('<div key="' + k + '" _id="' + v._id + '" class="dProductSelect">' +
                            '<a><img src="' + ((v.imgs.hasOwnProperty(0) == true) ? ((typeof(v.imgs[0]) == 'object') ? ((v.imgs[0] != null) ? v.imgs[0][0] : SKIN + '/logo.png') : v.imgs[0]) : SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                            '<a>' + v.title + '</a></div>');
                        align.topleft($('.dBoardSell .dProductSelect:eq(' + k + ') a img'), $('.dBoardSell .dProductSelect:eq(' + k + ') a'), 0, 0, 1);
                    });
                    $.each(pros.customer, function (k, v) {
                        $('.dBoardSell .sCustomer').append('<option value="' + v._id + '">' + ((typeof(v.fullname) == 'undefined') ? v.displayname : v.fullname) + '</option>')
                    });
                }
                $('.aProducts').addClass('aCtrCenter').fadeIn(250);
                $('.aAccept').addClass('aCtrRight').fadeIn(250);
                $('.dBoardSell .pFinal:eq(0) > span').text(web.getFormatNow());
                $('.dBoardSell .lSellCode input').val('HD' + web.getFormatNow().replace(/\/|\:|\ /g, "")).removeAttr('_id');
            }, params: {}});
        }, params: {}}});
    });
    $('.dAppImport').live('click', function () {
        if (refresh.pros == true) {
            pros = [];
            $('.dBoardImport .dProducts > div').html('');
            delete refresh.pros;
        }
        backmap.add({page: 'dBoardImport', action: {fn: function () {
            changePage($('.dBoardImport'), 'dShow', {fn: function () {
                if (pros.length == 0) {
                    web.iReq({action: 'iGetPros'}, function (dt) {
                        pros = dt;
                        $.each(pros.items, function (k, v) {
                            $('.dBoardImport .dProducts > div').append('<div key="' + k + '" _id="' + v._id + '" class="dProductSelect">' +
                                '<a><img src="' + ((v.imgs.hasOwnProperty(0) == true) ? ((typeof(v.imgs[0]) == 'object') ? ((v.imgs[0] != null) ? v.imgs[0][0] : SKIN + '/logo.png') : v.imgs[0]) : SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                                '<a>' + v.title + '</a></div>');
                            align.topleft($('.dBoardImport .dProductSelect:eq(' + k + ') a img'), $('.dBoardImport .dProductSelect:eq(' + k + ') a'), 0, 0, 1);
                        });
                        $.each(pros.supplier, function (k, v) {
                            $('.dBoardImport .sSupplier').append('<option value="' + v._id + '">' + v.title + '</option>')
                        });
                    });
                }
                else if ($('.dBoardImport .dProducts > div').html() == '') {
                    $.each(pros.items, function (k, v) {
                        $('.dBoardImport .dProducts > div').append('<div key="' + k + '" _id="' + v._id + '" class="dProductSelect">' +
                            '<a><img src="' + ((v.imgs.hasOwnProperty(0) == true) ? ((typeof(v.imgs[0]) == 'object') ? ((v.imgs[0] != null) ? v.imgs[0][0] : SKIN + '/logo.png') : v.imgs[0]) : SKIN + '/logo.png') + '" alt="wsup3"/></a>' +
                            '<a>' + v.title + '</a></div>');
                        align.topleft($('.dBoardImport .dProductSelect:eq(' + k + ') a img'), $('.dBoardImport .dProductSelect:eq(' + k + ') a'), 0, 0, 1);
                    });
                    $.each(pros.supplier, function (k, v) {
                        $('.dBoardImport .sSupplier').append('<option value="' + v._id + '">' + v.title + '</option>')
                    });
                }
                $('.aProducts').addClass('aCtrCenter').fadeIn(250);
                $('.aAccept').addClass('aCtrRight').fadeIn(250);
                $('.dBoardImport .pFinal:eq(0) > span').text(web.getFormatNow());
                $('.dBoardImport .lSellCode input').val('HD' + web.getFormatNow().replace(/\/|\:|\ /g, ""));
            }, params: {}});
        }, params: {}}});
    });
    $('.dAppDateReport').live('click', function () {
        backmap.add({page: 'dBoardDateReport', action: {fn: function () {
            changePage($('.dBoardDateReport'), 'dShow', {fn: function () {
                $('.dBoardDateReport .dDate input').val(web.dateObj.getFullYear() + '-' + (((web.dateObj.getMonth() + 1) < 10) ? '0' + (web.dateObj.getMonth() + 1) : (web.dateObj.getMonth() + 1)) + '-' + (((web.dateObj.getDate()) < 10) ? '0' + (web.dateObj.getDate()) : (web.dateObj.getDate())));
                $('.aBack').attr('ready', 1);
            }, params: {}});
        }, params: {}}});
    });
    $('.dAppReportImport').live('click', function () {
        backmap.add({page: 'dBoardReportImport', action: {fn: function () {
            changePage($('.dBoardReportImport'), 'dShow', {fn: function () {
                $('.dBoardReportImport .dDate input').val(web.dateObj.getFullYear() + '-' + (((web.dateObj.getMonth() + 1) < 10) ? '0' + (web.dateObj.getMonth() + 1) : (web.dateObj.getMonth() + 1)) + '-' + (((web.dateObj.getDate()) < 10) ? '0' + (web.dateObj.getDate()) : (web.dateObj.getDate())));
                $('.aBack').attr('ready', 1);
            }, params: {}});
        }, params: {}}});
    });
    $('.dAppReportStaff').live('click', function () {
        backmap.add({page: 'dBoardReportStaff', action: {fn: function () {
            changePage($('.dBoardReportStaff'), 'dShow', {fn: function () {
                $('.dBoardReportStaff .dDate input').val(web.dateObj.getFullYear() + '-' + (((web.dateObj.getMonth() + 1) < 10) ? '0' + (web.dateObj.getMonth() + 1) : (web.dateObj.getMonth() + 1)) + '-' + (((web.dateObj.getDate()) < 10) ? '0' + (web.dateObj.getDate()) : (web.dateObj.getDate())));
                $('.aBack').attr('ready', 1);
                if ($('.sStaff option').length == 0)
                    web.iReq({action: 'iGetUsers'}, function (dt) {
                        $.each(dt, function (k, v) {
                            $('.sStaff').append('<option value="' + v._id + '">' + ((v.displayname == '' || typeof(v.displayname) == 'undefined') ? v.fullname : v.displayname) + '</option>');
                        });
                    });
            }, params: {}});
        }, params: {}}});
    });
    $('.dAppImportBill').live('click', function () {
        backmap.add({page: 'dBoardImportBill', action: {fn: function () {
            changePage($('.dBoardImportBill'), 'dShow', {fn: function () {
                $('.aBack').attr('ready', 1);
            }, params: {}});
        }, params: {}}});
    });
    $('.dAppReportStore').live('click', function () {
        web.iReq({action: 'iGetAllPro'}, function (dt) {
            total = total2 = 0;
            $('#fBillStore').html('');
            $.each(dt, function (k, v) {
                total += v.params['gia-von'].detail * v.params['ton-kho'].detail;
                if (typeof(v.params['quy-doi']) != 'undefined') {
                    quydoi = Math.floor(v.params['ton-kho'].detail / v.params['quy-doi'].detail);
                    total2 += quydoi * v.params['gia-quy-doi'].detail;
                    total2 += v.params[((v.group == 5) ? 'gia-goc' : 'gia-ban')].detail * (v.params['ton-kho'].detail - quydoi * v.params['quy-doi'].detail);
                    loinhuan = (v.params[((v.group == 5) ? 'gia-goc' : 'gia-ban')].detail - v.params['gia-von'].detail) * (v.params['ton-kho'].detail - quydoi * v.params['quy-doi'].detail);
                    loinhuan += quydoi * v.params['gia-quy-doi'].detail - v.params['gia-von'].detail * (quydoi * v.params['quy-doi'].detail);
                }
                else {
                    total2 += v.params[((v.group == 5) ? 'gia-goc' : 'gia-ban')].detail * v.params['ton-kho'].detail;
                    loinhuan = (v.params[((v.group == 5) ? 'gia-goc' : 'gia-ban')].detail - v.params['gia-von'].detail) * v.params['ton-kho'].detail;
                }
                $('#fBillStore').append('<div class="dCategory">' +
                    '<div class="dProductSell">' +
                    '<div class="dInfo">' +
                    '<p><b>' + v.title + '</b></p>' +
                    '<p><label>Số lượng: <span>' + sep_price2(String(v.params['ton-kho'].detail)) + ' ' + v.params['don-vi-tinh'].detail + '</span></label></p>' +
                    '<p><label>Giá vốn: <span>' + sep_price2(String(v.params['gia-von'].detail)) + ' Đ</span></label></p>' +
                    '<p><label>Giá bán: <span>' + sep_price2(String(v.params[((v.group == 5) ? 'gia-goc' : 'gia-ban')].detail)) + ' Đ</span></label></p>' +
                    '</div><br/>' +
                    '<label class="lPrice">Lợi nhuận: <span>' + sep_price2(String(loinhuan)) + '</span> Đ</label>' +
                    '</div></div>');
            });
            $('.dBoardReportStore .pTotal:eq(0) span').text(dt.length + ' Mặt hàng');
            $('.dBoardReportStore .pTotal:eq(1) span').text(sep_price2(String(total)));
            $('.dBoardReportStore .pTotal:eq(2) span').text(sep_price2(String(total2)));
            total = 0;
            $('#fBillStore .lPrice span').each(function (index) {
                total += parseInt($(this).text().replace(/\,/g, ""));
            });
            $('.dBoardReportStore .pTotal:eq(3) span').text(sep_price2(String(total)));
            backmap.add({page: 'dBoardReportStore', action: {fn: function () {
                changePage($('.dBoardReportStore'), 'dShow', {fn: function () {
                    $('.aBack').attr('ready', 1);
                }, params: {}});
            }, params: {}}});
        });
    });
    $('.dAppReportAvailable').live('click', function () {
        if ($('#fReportAvailable .dCategory').length == 0)
            web.iReq({action: 'iGetAvailable'}, function (dt) {
                $('#fReportAvailable').html('');
                $.each(dt, function (k, v) {
                    if (v.params['ton-kho'].detail < v.params['kiem-tra-het-hang'].detail)
                        $('#fReportAvailable').append('<div class="dCategory">' +
                            '<div class="dProductSell">' +
                            '<div class="dInfo">' +
                            '<p><b>' + v.title + '</b></p>' +
                            '<p><label>Số lượng: <span>' + sep_price2(String(v.params['ton-kho'].detail)) + ' ' + v.params['don-vi-tinh'].detail + '</span></label></p>' +
                            '</div></div></div>');
                });
                backmap.add({page: 'dBoardReportAvailable', action: {fn: function () {
                    changePage($('.dBoardReportAvailable'), 'dShow', {fn: function () {
                        $('.aBack').attr('ready', 1);
                    }, params: {}});
                }, params: {}}});
            });
        else
            backmap.add({page: 'dBoardReportAvailable', action: {fn: function () {
                changePage($('.dBoardReportAvailable'), 'dShow', {fn: function () {
                    $('.aBack').attr('ready', 1);
                }, params: {}});
            }, params: {}}});
    });
    $('.dAppReportExpirate').live('click', function () {
        if ($('#fReportExpirate .dCategory').length == 0)
            web.iReq({action: 'iGetAvailable'}, function (dt) {
                $('#fReportExpirate').html('');
                $.each(dt, function (k, v) {
                    expirate = v.params['han-dung'].detail.substring(0, 10).split('-');
                    if (expirate[0] == web.dateObj.getFullYear() && expirate[1] <= web.dateObj.getMonth() + 2)
                        $('#fReportExpirate').append('<div class="dCategory">' +
                            '<div class="dProductSell">' +
                            '<div class="dInfo">' +
                            '<p><b>' + v.title + '</b></p>' +
                            '<p><label>hạn dùng: <span>' + expirate[2] + '-' + expirate[1] + '-' + expirate[0] + '</span></label></p>' +
                            '<p><label>tồn kho: <span>' + v.params['ton-kho'].detail + ' ' + v.params['don-vi-tinh'].detail + '</span></label></p>' +
                            '</div></div></div>');
                });
                backmap.add({page: 'dBoardReportExpirate', action: {fn: function () {
                    changePage($('.dBoardReportExpirate'), 'dShow', {fn: function () {
                        $('.aBack').attr('ready', 1);
                    }, params: {}});
                }, params: {}}});
            });
        else
            backmap.add({page: 'dBoardReportExpirate', action: {fn: function () {
                changePage($('.dBoardReportExpirate'), 'dShow', {fn: function () {
                    $('.aBack').attr('ready', 1);
                }, params: {}});
            }, params: {}}});
    });
    $('.dBoardDateReport .dDate a').live('click', function () {
        people = JSON.parse((window.localStorage.getItem('people')));
        web.iReq({action: 'iReportDate', fromDate: $('.dBoardDateReport .iFromDate').val(), toDate: $('.dBoardDateReport .iToDate').val()}, function (dt) {
            $('#fDateReport table tbody tr:not(.tHead)').remove();
            $.each(dt, function (k, v) {
                total = profit = 0;
                $.each(v.products, function (k2, v2) {
                    if (v2.promotionType == '-')
                        total += (parseInt(v2.number) * parseInt(((people.group == 5) ? v2.priceOriginal : v2.price))) - parseInt(v2.promotionVal);
                    else
                        total += (parseInt(v2.number) * parseInt(((people.group == 5) ? v2.priceOriginal : v2.price))) - ((parseInt(v2.number) * parseInt(((people.group == 5) ? v2.priceOriginal : v2.price))) * parseInt(v2.promotionVal) / 100);
                    profit += parseInt(v2.number) * parseInt(v2.priceImport);
                });
                if (v.promotionType == '-')
                    total = total - parseInt(v.promotionVal);
                else
                    total = total - (total * parseInt(v.promotionVal) / 100);
                if (people.group == 1) {
                    if ($('#fDateReport .tProfit').length < 1)
                        $('#fDateReport table .tHead').append('<th class="tProfit">Lợi nhuận</th>');
                    $('.dBoardDateReport .pTotal:eq(1)').css('display', 'block');
                    profit = total - profit;
                }
                $('#fDateReport table tbody').append('<tr>' +
                    '<td><a class="aViewBill" title="' + v.billId + '">' + v.billId + '</a></td>' +
                    '<td>' + ((v.people.displayname != '') ? v.people.displayname : v.people.fullname) + '</td>' +
                    '<td>' + ((typeof(v.customer.displayname) != 'undefined') ? v.customer.displayname : v.customer.fullname) + '</td>' +
                    '<td>' + v.date + '</td>' +
                    '<td><span class="sPrice">' + sep_price2(String(total)) + '</span>Đ</td>' +
                    ((people.group == 1) ? '<td><span class="sProfit">' + sep_price2(String(profit)) + '</span>Đ</td>' : '') + '</tr>');
            });
            total = profit = 0;
            $('.dBoardDateReport .sPrice').each(function (index) {
                total += parseInt($(this).text().replace(/\,/g, ""));
            });
            $('.dBoardDateReport .sProfit').each(function (index) {
                profit += parseInt($(this).text().replace(/\,/g, ""));
            });
            $('.dBoardDateReport .pTotal:eq(0) span').text(sep_price2(String(total)) + 'Đ');
            $('.dBoardDateReport .pTotal:eq(1) span').text(sep_price2(String(profit)) + 'Đ');
        });
    });
    $('.dBoardReportImport .dDate a').live('click', function () {
        people = JSON.parse((window.localStorage.getItem('people')));
        web.iReq({action: 'iReportImport', fromDate: $('.dBoardReportImport .iFromDate').val(), toDate: $('.dBoardReportImport .iToDate').val()}, function (dt) {
            $('#fImportReport table tbody tr:not(.tHead)').remove();
            $.each(dt, function (k, v) {
                total = 0;
                $.each(v.products, function (k2, v2) {
                    if (v2.promotionType == '-')
                        total += ((parseInt(v2.number) * parseInt(v2.price)) + (parseInt(v2.number) * parseInt(v2.price)) * v2.tax / 100) - parseInt(((v2.promotionVal == '') ? 0 : v2.promotionVal));
                    else
                        total += ((parseInt(v2.number) * parseInt(v2.price)) + (parseInt(v2.number) * parseInt(v2.price)) * v2.tax / 100) - (((parseInt(v2.number) * parseInt(v2.price)) + (parseInt(v2.number) * parseInt(v2.price)) * v2.tax / 100) * parseInt(((v2.promotionVal == '') ? 0 : v2.promotionVal)) / 100);
                });
                if (v.promotionType == '-')
                    total = total - parseInt(v.promotionVal);
                else
                    total = total - (total * parseInt(v.promotionVal) / 100);
                $('#fImportReport table tbody').append('<tr>' +
                    '<td><a class="aViewBill" title="' + v.billId + '">' + v.billId + '</a></td>' +
                    '<td>' + ((v.people.displayname != '') ? v.people.displayname : v.people.fullname) + '</td>' +
                    '<td>' + v.customer.title + '</td>' +
                    '<td>' + v.date + '</td>' +
                    '<td><span class="sPrice">' + sep_price2(String(total)) + '</span>Đ</td></tr>');
            });
            total = 0;
            $('.dBoardReportImport .sPrice').each(function (index) {
                total += parseInt($(this).text().replace(/\,/g, ""));
            });
            $('.dBoardReportImport .pTotal span').text(sep_price2(String(total)) + 'Đ');
        });
    });
    $('.dBoardReportStaff .dDate a').live('click', function () {
        people = JSON.parse((window.localStorage.getItem('people')));
        web.iReq({action: 'iReportStaff', wid: $('.dBoardReportStaff .sStaff').val(), fromDate: $('.dBoardReportStaff .iFromDate').val(), toDate: $('.dBoardReportStaff .iToDate').val()}, function (dt) {
            $('#fReportStaff table tbody tr:not(.tHead)').remove();
            $.each(dt, function (k, v) {
                total = profit = 0;
                $.each(v.products, function (k2, v2) {
                    if (v2.promotionType == '-')
                        total += (parseInt(v2.number) * parseInt(((people.group == 5) ? v2.priceOriginal : v2.price))) - parseInt(v2.promotionVal);
                    else
                        total += (parseInt(v2.number) * parseInt(((people.group == 5) ? v2.priceOriginal : v2.price))) - ((parseInt(v2.number) * parseInt(((people.group == 5) ? v2.priceOriginal : v2.price))) * parseInt(v2.promotionVal) / 100);
                    profit += parseInt(v2.number) * parseInt(v2.priceImport);
                });
                if (v.promotionType == '-')
                    total = total - parseInt(v.promotionVal);
                else
                    total = total - (total * parseInt(v.promotionVal) / 100);
                if (people.group == 1) {
                    if ($('#fReportStaff .tProfit').length < 1)
                        $('#fReportStaff table .tHead').append('<th class="tProfit">Lợi nhuận</th>');
                    $('.dBoardReportStaff .pTotal:eq(1)').css('display', 'block');
                    profit = total - profit;
                }
                $('#fReportStaff table tbody').append('<tr>' +
                    '<td><a class="aViewBill" title="' + v.billId + '">' + v.billId + '</a></td>' +
                    '<td>' + ((v.people.displayname != '') ? v.people.displayname : v.people.fullname) + '</td>' +
                    '<td>' + ((typeof(v.customer.displayname) != 'undefined') ? v.customer.displayname : v.customer.fullname) + '</td>' +
                    '<td>' + v.date + '</td>' +
                    '<td><span class="sPrice">' + sep_price2(String(total)) + '</span>Đ</td>' +
                    ((people.group == 1) ? '<td><span class="sProfit">' + sep_price2(String(profit)) + '</span>Đ</td>' : '') + '</tr>');
            });
            total = profit = 0;
            $('.dBoardReportStaff .sPrice').each(function (index) {
                total += parseInt($(this).text().replace(/\,/g, ""));
            });
            $('.dBoardReportStaff .sProfit').each(function (index) {
                profit += parseInt($(this).text().replace(/\,/g, ""));
            });
            $('.dBoardReportStaff .pTotal:eq(0) span').text(sep_price2(String(total)) + 'Đ');
            $('.dBoardReportStaff .pTotal:eq(1) span').text(sep_price2(String(profit)) + 'Đ');
        });
    });
    $('.dBoardPayHistory .dDate a').live('click', function () {
        people = JSON.parse((window.localStorage.getItem('people')));
        web.iReq({action: 'iReportPayHistory', pid: $('.dBoardPayHistory .sCustomerPay').val(), fromDate: $('.dBoardPayHistory .iFromDate').val(), toDate: $('.dBoardPayHistory .iToDate').val()}, function (dt) {
            $('#fPayHistory table tbody tr:not(.tHead)').remove();
            $.each(dt, function (k, v) {
                total = profit = 0;
                $.each(v.products, function (k2, v2) {
                    if (v2.promotionType == '-')
                        total += (parseInt(v2.number) * parseInt(((people.group == 5) ? v2.priceOriginal : v2.price))) - parseInt(v2.promotionVal);
                    else
                        total += (parseInt(v2.number) * parseInt(((people.group == 5) ? v2.priceOriginal : v2.price))) - ((parseInt(v2.number) * parseInt(((people.group == 5) ? v2.priceOriginal : v2.price))) * parseInt(v2.promotionVal) / 100);
                    profit += parseInt(v2.number) * parseInt(v2.priceImport);
                });
                if (v.promotionType == '-')
                    total = total - parseInt(v.promotionVal);
                else
                    total = total - (total * parseInt(v.promotionVal) / 100);
                if (people.group == 1) {
                    if ($('#fPayHistory .tProfit').length < 1)
                        $('#fPayHistory table .tHead').append('<th class="tProfit">Lợi nhuận</th>');
                    $('.dBoardPayHistory .pTotal:eq(1)').css('display', 'block');
                    profit = total - profit;
                }
                $('#fPayHistory table tbody').append('<tr>' +
                    '<td><a class="aViewBill" title="' + v.billId + '">' + v.billId + '</a></td>' +
                    '<td>' + ((v.people.displayname != '') ? v.people.displayname : v.people.fullname) + '</td>' +
                    '<td>' + ((typeof(v.customer.displayname) != 'undefined') ? v.customer.displayname : v.customer.fullname) + '</td>' +
                    '<td>' + v.date + '</td>' +
                    '<td><span class="sPrice">' + sep_price2(String(total)) + '</span>Đ</td>' +
                    ((people.group == 1) ? '<td><span class="sProfit">' + sep_price2(String(profit)) + '</span>Đ</td>' : '') + '</tr>');
            });
            total = profit = 0;
            $('.dBoardPayHistory .sPrice').each(function (index) {
                total += parseInt($(this).text().replace(/\,/g, ""));
            });
            $('.dBoardPayHistory .sProfit').each(function (index) {
                profit += parseInt($(this).text().replace(/\,/g, ""));
            });
            $('.dBoardPayHistory .pTotal span').text(sep_price2(String(total)) + 'Đ');
            $('.dBoardPayHistory .pTotal:eq(1) span').text(sep_price2(String(profit)) + 'Đ');
        });
    });
    $('.dBoardImportBill .lSellCode a').live('click', function () {
        people = JSON.parse((window.localStorage.getItem('people')));
        $('#fImportBill').html('');
        web.iReq({action: 'iGetBillImport', billId: $('.dBoardImportBill .lSellCode input').val()}, function (dt) {
            $('.dBoardImportBill .lSellCode').next().text(dt.date);
            $.each(dt.products, function (k, v) {
                if (v.promotionType == '-')
                    total = (parseInt(v.price) * parseInt(v.number)) - v.promotionVal;
                else
                    total = (parseInt(v.price) * parseInt(v.number)) - ((parseInt(v.price) * parseInt(v.number)) * v.promotionVal / 100);
                $('#fImportBill').append('<div class="dCategory">' +
                    '<div class="dProductSell">' +
                    '<div class="dInfo">' +
                    '<p><b>' + v.title + '</b></p>' +
                    '<p><label>Đơn giá: <span>' + sep_price2(String(v.price)) + 'Đ</span></label></p>' +
                    '<p><label>Số lượng: <span>' + v.number + ' ' + v.unit + '</span></label></p>' +
                    '<p><label>Chiết khấu: <span>' + ((v.promotionVal == '') ? 0 : v.promotionVal) + ((v.promotionType == '%') ? v.promotionType : 'Đ') + '</span></label></p><br/>' +
                    '</div>' +
                    '<label class="lPrice">Giá: <span>' + sep_price2(String(total)) + '</span>Đ</label>' +
                    '</div></div>');
            });
            $('.dBoardImportBill .sPromotionVal').text(dt.promotionVal);
            $('.dBoardImportBill .sPromotion').text(((dt.promotionType == '%') ? dt.promotionType : 'Đ'));
            total = 0;
            $('#fImportBill .lPrice span').each(function (index) {
                total += parseInt($(this).text().replace(/\,/g, ""));
            });
            $('.dBoardImportBill .pTotal:eq(0) span').text(sep_price2(String(total)));
            if (dt.promotionType == '-')
                $('.dBoardImportBill .pTotal:eq(1) span').text(sep_price2(String(parseInt($('.dBoardImportBill .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseInt($('.dBoardImportBill .pFinal .sPromotionVal').text().replace(/\,/g, "")))));
            else
                $('.dBoardImportBill .pTotal:eq(1) span').text(sep_price2(String(parseInt($('.dBoardImportBill .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseInt($('.dBoardImportBill .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.dBoardImportBill .pFinal .sPromotionVal').text() / 100))));
        });
    });
    $('.dBoardDateReport .aViewBill, .dBoardReportStaff .aViewBill, .dBoardPayHistory .aViewBill').live('click', function () {
        people = JSON.parse((window.localStorage.getItem('people')));
        me = $(this);
        $('#fBillDetail').html('');
        backmap.add({page: 'dBoardBillDetail', action: {fn: function () {
            changePage($('.dBoardBillDetail'), 'dShow', {fn: function () {
                web.iReq({action: 'iGetBill', billId: me.text()}, function (dt) {
                    $('.dBoardBillDetail .lSellCode span').text(dt.billId);
                    $('.dBoardBillDetail .lSellCode').next().text(me.parent().next().next().text());
                    $.each(dt.products, function (k, v) {
                        if (v.promotionType == '-')
                            total = (parseInt(((people.group == 5) ? v.priceOriginal : v.price)) * parseInt(v.number)) - v.promotionVal;
                        else
                            total = (parseInt(((people.group == 5) ? v.priceOriginal : v.price)) * parseInt(v.number)) - ((parseInt(((people.group == 5) ? v.priceOriginal : v.price)) * parseInt(v.number)) * v.promotionVal / 100);
                        $('#fBillDetail').append('<div class="dCategory">' +
                            '<div class="dProductSell">' +
                            '<div class="dInfo">' +
                            '<p><b>' + v.title + '</b></p>' +
                            '<p><label>Đơn giá: <span>' + sep_price2(String(((people.group == 5) ? v.priceOriginal : v.price))) + 'Đ</span></label></p>' +
                            '<p><label>Số lượng: <span>' + v.number + ' ' + v.unit + '</span></label></p>' +
                            '<p><label>Khuyến mãi: <span>' + v.promotionVal + ((v.promotionType == '%') ? v.promotionType : 'Đ') + '</span></label></p><br/>' +
                            '</div>' +
                            '<label class="lPrice">Giá: <span>' + sep_price2(String(total)) + '</span>Đ</label>' +
                            '</div></div>');
                    });
                    $('.dBoardBillDetail .sPromotionVal').text(dt.promotionVal);
                    $('.dBoardBillDetail .sPromotion').text(((dt.promotionType == '%') ? dt.promotionType : 'Đ'));
                    total = 0;
                    $('#fBillDetail .lPrice span').each(function (index) {
                        total += parseInt($(this).text().replace(/\,/g, ""));
                    });
                    $('.dBoardBillDetail .pTotal:eq(0) span').text(sep_price2(String(total)));
                    if (dt.promotionType == '-')
                        $('.dBoardBillDetail .pTotal:eq(1) span').text(sep_price2(String(parseInt($('.dBoardBillDetail .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseInt($('.dBoardBillDetail .pFinal .sPromotionVal').text().replace(/\,/g, "")))));
                    else
                        $('.dBoardBillDetail .pTotal:eq(1) span').text(sep_price2(String(parseInt($('.dBoardBillDetail .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseInt($('.dBoardBillDetail .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.dBoardBillDetail .pFinal .sPromotionVal').text() / 100))));
                });
            }, params: {}});
        }, params: {}}});
    });
    $('.dBoardReportImport .aViewBill').live('click', function () {
        people = JSON.parse((window.localStorage.getItem('people')));
        me = $(this);
        $('#fBillImport').html('');
        backmap.add({page: 'dBoardBillImport', action: {fn: function () {
            changePage($('.dBoardBillImport'), 'dShow', {fn: function () {
                web.iReq({action: 'iGetBillImport', billId: me.text()}, function (dt) {
                    $('.dBoardBillImport .lSellCode span').text(dt.billId);
                    $('.dBoardBillImport .lSellCode').next().text(me.parent().next().next().text());
                    $.each(dt.products, function (k, v) {
                        if (v.promotionType == '-')
                            total = ((parseInt(v.price) * parseInt(v.number)) + (parseInt(v.price) * parseInt(v.number)) * (parseInt(v.tax) - v.promotionVal) / 100) - v.promotionVal;
                        else
                            total = ((parseInt(v.price) * parseInt(v.number)) + (parseInt(v.price) * parseInt(v.number)) * (parseInt(v.tax) - v.promotionVal) / 100);
                        $('#fBillImport').append('<div class="dCategory">' +
                            '<div class="dProductSell">' +
                            '<div class="dInfo">' +
                            '<p><b>' + v.title + '</b></p>' +
                            '<p><label>Giá vốn: <span>' + sep_price2(String(v.price)) + 'Đ</span></label></p>' +
                            '<p><label>Số lượng: <span>' + v.number + ' ' + v.unit + '</span></label></p>' +
                            '<p><label>Thuế suất: <span>' + v.tax + '%</span></label></p>' +
                            '<p><label>Khuyến mãi: <span>' + v.promotionVal + ((v.promotionType == '%') ? v.promotionType : 'Đ') + '</span></label></p><br/>' +
                            '</div>' +
                            '<label class="lPrice">Giá: <span>' + sep_price2(String(total)) + '</span>Đ</label>' +
                            '</div></div>');
                    });
                    $('.dBoardBillImport .sPromotionVal').text(dt.promotionVal);
                    $('.dBoardBillImport .sPromotion').text(((dt.promotionType == '%') ? dt.promotionType : 'Đ'));
                    total = 0;
                    $('#fBillImport .lPrice span').each(function (index) {
                        total += parseInt($(this).text().replace(/\,/g, ""));
                    });
                    $('.dBoardBillImport .pTotal:eq(0) span').text(sep_price2(String(total)));
                    if (dt.promotionType == '-')
                        $('.dBoardBillImport .pTotal:eq(1) span').text(sep_price2(String(parseInt($('.dBoardBillImport .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseInt($('.dBoardBillImport .pFinal .sPromotionVal').text().replace(/\,/g, "")))));
                    else
                        $('.dBoardBillImport .pTotal:eq(1) span').text(sep_price2(String(parseInt($('.dBoardBillImport .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseInt($('.dBoardBillImport .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.dBoardBillImport .pFinal .sPromotionVal').text() / 100))));
                });
            }, params: {}});
        }, params: {}}});
    });
    $('.dBoardSell .dProductSelect a').live('click', function () {
        people = JSON.parse((window.localStorage.getItem('people')));
        if ($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id')).length == 0) {
            $('.' + backmap.see().page + ' form').append('<div class="dCategory pros' + pros.items[$(this).parent().attr('key')]._id + '">' +
                '<div class="dProductSell" _id="' + pros.items[$(this).parent().attr('key')]._id + '">' +
                '<div class="dInfo" style="padding-right: 0px;">' +
                '<a><img src="' + ((pros.items[$(this).parent().attr('key')].imgs.hasOwnProperty(0) == true) ? ((typeof(pros.items[$(this).parent().attr('key')].imgs[0]) == 'object') ? ((pros.items[$(this).parent().attr('key')].imgs[0] != null) ? pros.items[$(this).parent().attr('key')].imgs[0][0] : SKIN + '/logo.png') : pros.items[$(this).parent().attr('key')].imgs[0]) : SKIN + '/logo.png') + '" alt="wsup3"></a>' +
                '<p><b>' + pros.items[$(this).parent().attr('key')].title + '</b></p>' +
                '<p><label>Đơn giá:<input class="iNewPrice iOpts" type="text" priceOriginal="' + pros.items[$(this).parent().attr('key')].params['gia-goc'].detail + '" priceImport="' + pros.items[$(this).parent().attr('key')].params['gia-von'].detail + '" value="' + sep_price2(String(pros.items[$(this).parent().attr('key')].params[((people.group == 5) ? 'gia-goc' : 'gia-ban')].detail)) + '"/>Đ</label></p>' +
                '<p><label>Số lượng:<input class="iNumber iOpts" priceConvert="' + ((typeof(pros.items[$(this).parent().attr('key')].params['gia-quy-doi']) != 'undefined') ? pros.items[$(this).parent().attr('key')].params['gia-quy-doi'].detail : '') + '" convert="' + ((typeof(pros.items[$(this).parent().attr('key')].params['quy-doi']) != 'undefined') ? pros.items[$(this).parent().attr('key')].params['quy-doi'].detail : '') + '" type="number" max="' + pros.items[$(this).parent().attr('key')].params['ton-kho'].detail + '" value="1"/><span>' + pros.items[$(this).parent().attr('key')].params['don-vi-tinh'].detail + '</span> (Còn ' + pros.items[$(this).parent().attr('key')].params['ton-kho'].detail + ' ' + pros.items[$(this).parent().attr('key')].params['don-vi-tinh'].detail + ')</label></p>' +
                '<p><label>Khuyến mãi:<input class="iPromotionVal iOpts" type="text" value="0"/> <select class="iPromotion iOpts2"><option value="-">Đ</option><option value="%">%</option></select></label></p>' +
                '</div>' +
                '<a title="Xóa" class="aDelPro"><i class="fa fa-times" aria-hidden="true"></i></a>' +
                '<label class="lPrice">Giá: <span>' + sep_price2(String(pros.items[$(this).parent().attr('key')].params[((people.group == 5) ? 'gia-goc' : 'gia-ban')].detail)) + '</span>Đ</label>' +
                '</div></div>');
            align.topleft($('.dBoardSell .dProductSell > .dInfo > a:last img'), $('.dProductSell > .dInfo > a:last'), 0, 0, 1);
            total = 0;
            $('.' + backmap.see().page + ' .lPrice span').each(function () {
                total += parseFloat($(this).text().replace(/\,/g, ""));
            });
            $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
            if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
                $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
            else
                $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
        }
        else {
            $('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNumber').val(parseFloat($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNumber').val()) + 1);
            if ($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iPromotion').val() == '-')
                $('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .lPrice span').text(sep_price2(String(($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNumber').val() * $('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNewPrice').val().replace(/\,/g, "")) - $('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iPromotionVal').val().replace(/\,/g, ""))));
            else
                $('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .lPrice span').text(sep_price2(String(($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNumber').val() * $('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNewPrice').val().replace(/\,/g, "")) - (($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNumber').val() * $('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNewPrice').val().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iPromotionVal').val() / 100))));
            total = 0;
            $('.' + backmap.see().page + ' .lPrice span').each(function () {
                total += parseFloat($(this).text().replace(/\,/g, ""));
            });
            $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
            if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
                $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
            else
                $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
            if (typeof(pros.items[$(this).parent().attr('key')].params['quy-doi']) != 'undefined')
                if ($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNumber').val() % pros.items[$(this).parent().attr('key')].params['quy-doi'].detail == 0) {
                    $('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iPromotionVal').val(0).trigger('keyup');
                    $('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iPromotionVal').val(parseInt($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .lPrice span').text().replace(/\,/g, "")) - parseInt(pros.items[$(this).parent().attr('key')].params['gia-quy-doi'].detail) * ($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNumber').val() / pros.items[$(this).parent().attr('key')].params['quy-doi'].detail)).trigger('keyup');
                }
        }
    });
    $('.dBoardImport .dProductSelect a').live('click', function () {
        people = JSON.parse((window.localStorage.getItem('people')));
        if ($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id')).length == 0) {
            $('.' + backmap.see().page + ' form').append('<div class="dCategory pros' + pros.items[$(this).parent().attr('key')]._id + '">' +
                '<div class="dProductSell" _id="' + pros.items[$(this).parent().attr('key')]._id + '">' +
                '<div class="dInfo" style="padding-right: 0px;">' +
                '<a><img src="' + ((pros.items[$(this).parent().attr('key')].imgs.hasOwnProperty(0) == true) ? ((typeof(pros.items[$(this).parent().attr('key')].imgs[0]) == 'object') ? ((pros.items[$(this).parent().attr('key')].imgs[0] != null) ? pros.items[$(this).parent().attr('key')].imgs[0][0] : SKIN + '/logo.png') : pros.items[$(this).parent().attr('key')].imgs[0]) : SKIN + '/logo.png') + '" alt="wsup3" style="top: 39px; left: 0px; opacity: 1;"></a>' +
                '<p><b>' + pros.items[$(this).parent().attr('key')].title + '</b></p>' +
                '<p><label>Đơn giá:<input class="iNewPrice iOpts" type="text" value="' + sep_price2(String(pros.items[$(this).parent().attr('key')].params['gia-von'].detail)) + '"/>Đ</label></p>' +
                '<p><label>Số lượng:<input class="iNumber iOpts" type="number" value="1"/><span>' + pros.items[$(this).parent().attr('key')].params['don-vi-tinh'].detail + '</span></label></p>' +
                '<p><label>Chiết khấu:<input class="iPromotionVal iOpts" type="number" value="' + ((typeof(pros.items[$(this).parent().attr('key')].params['chiet-khau']) == 'number') ? pros.items[$(this).parent().attr('key')].params['chiet-khau'].detail : 0) + '"/><span>%</span></label></p>' +
                '<p><label>Thuế suất:<input class="iTax iOpts" type="number" value="' + pros.items[$(this).parent().attr('key')].params['thue-suat'].detail + '"/><span>%</span></label></p>' +
                '</div>' +
                '<a title="Xóa" class="aDelPro"><i class="fa fa-times" aria-hidden="true"></i></a>' +
                '<label class="lPrice">Giá: <span>' + sep_price2(String((parseFloat(pros.items[$(this).parent().attr('key')].params['gia-von'].detail) + (parseFloat(pros.items[$(this).parent().attr('key')].params['gia-von'].detail) * (pros.items[$(this).parent().attr('key')].params['thue-suat'].detail - ((typeof(pros.items[$(this).parent().attr('key')].params['chiet-khau']) == 'number') ? pros.items[$(this).parent().attr('key')].params['chiet-khau'].detail : 0)) / 100)))) + '</span>Đ</label>' +
                '</div></div>');
            align.topleft($('.dBoardImport .dProductSell > .dInfo > a:last img'), $('.dProductSell > .dInfo > a:last'), 0, 0, 1);
            total = 0;
            $('.' + backmap.see().page + ' .lPrice span').each(function () {
                total += parseFloat($(this).text().replace(/\,/g, ""));
            });
            $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
        }
        else {
            $('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNumber').val(parseFloat($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNumber').val()) + 1);
            $('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .lPrice span').text(sep_price2(String((($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNumber').val() * parseFloat($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNewPrice').val().replace(/\,/g, ""))) + ($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNumber').val() * parseFloat($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iNewPrice').val().replace(/\,/g, ""))) * ($('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iTax').val() - $('.' + backmap.see().page + ' .pros' + $(this).parent().attr('_id') + ' .iPromotionVal').val()) / 100))));
            total = 0;
            $('.' + backmap.see().page + ' .lPrice span').each(function () {
                total += parseFloat($(this).text().replace(/\,/g, ""));
            });
            $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
            if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
                $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
            else
                $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
        }
    });
    $('.dBoardSell .iNewPrice').live('keyup', function () {
        $(this).val(sep_price2($(this).val().replace(/\,/g, "")));
        if ($(this).parent().parent().next().next().find('.iPromotion').val() == '-')
            $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String((parseFloat($(this).val().replace(/\,/g, "")) * $(this).parent().parent().next().find('.iNumber').val()) - $(this).parent().parent().next().next().find('.iPromotionVal').val().replace(/\,/g, ""))));
        else
            $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String((parseFloat($(this).val().replace(/\,/g, "")) * $(this).parent().parent().next().find('.iNumber').val()) - ((parseFloat($(this).val().replace(/\,/g, "")) * $(this).parent().parent().next().find('.iNumber').val()) * $(this).parent().parent().next().next().find('.iPromotionVal').val() / 100))));
        total = 0;
        $('.' + backmap.see().page + ' .lPrice span').each(function () {
            total += parseFloat($(this).text().replace(/\,/g, ""));
        });
        $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
        if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
        else
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
    });
    $('.dBoardImport .iNewPrice').live('keyup', function () {
        $(this).val(sep_price2($(this).val().replace(/\,/g, "")));
        $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String(((parseFloat($(this).val().replace(/\,/g, "")) * $(this).parent().parent().next().find('.iNumber').val()) + (parseFloat($(this).val().replace(/\,/g, "")) * $(this).parent().parent().next().find('.iNumber').val()) * ($(this).parent().parent().next().next().next().find('.iTax').val() - $(this).parent().parent().next().next().find('.iPromotionVal').val()) / 100))));
        total = 0;
        $('.' + backmap.see().page + ' .lPrice span').each(function () {
            total += parseFloat($(this).text().replace(/\,/g, ""));
        });
        $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
        if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
        else
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
    });
    $('.dBoardSell .iNumber').live('keyup', function () {
        if ($(this).parent().parent().next().find('.iPromotion').val() == '-')
            $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String(($(this).val() * $(this).parent().parent().prev().find('.iNewPrice').val().replace(/\,/g, "")) - $(this).parent().parent().next().find('.iPromotionVal').val().replace(/\,/g, ""))));
        else
            $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String(($(this).val() * $(this).parent().parent().prev().find('.iNewPrice').val().replace(/\,/g, "")) - (($(this).val() * $(this).parent().parent().prev().find('.iNewPrice').val().replace(/\,/g, "")) * $(this).parent().parent().next().find('.iPromotionVal').val() / 100))));
        total = 0;
        $('.' + backmap.see().page + ' .lPrice span').each(function () {
            total += parseFloat($(this).text().replace(/\,/g, ""));
        });
        $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
        if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
        else
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
        if ($(this).attr('convert') != '') {
            if ($(this).val() % $(this).attr('convert') == 0) {
                $(this).parent().parent().next().find('.iPromotionVal').val(0).trigger('keyup');
                $(this).parent().parent().next().find('.iPromotionVal').val(parseInt($(this).parent().parent().parent().parent().find('.lPrice span').text().replace(/\,/g, "")) - parseInt($(this).attr('priceconvert')) * ($(this).val() / $(this).attr('convert'))).trigger('keyup');
            }
            if ($(this).val() < $(this).attr('convert'))
                $(this).parent().parent().next().find('.iPromotionVal').val(0).trigger('keyup');
        }
    }).live('change', function () {
        if ($(this).parent().parent().next().find('.iPromotion').val() == '-')
            $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String(($(this).val() * $(this).parent().parent().prev().find('.iNewPrice').val().replace(/\,/g, "")) - $(this).parent().parent().next().find('.iPromotionVal').val().replace(/\,/g, ""))));
        else
            $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String(($(this).val() * $(this).parent().parent().prev().find('.iNewPrice').val().replace(/\,/g, "")) - (($(this).val() * $(this).parent().parent().prev().find('.iNewPrice').val().replace(/\,/g, "")) * $(this).parent().parent().next().find('.iPromotionVal').val() / 100))));
        total = 0;
        $('.' + backmap.see().page + ' .lPrice span').each(function () {
            total += parseFloat($(this).text().replace(/\,/g, ""));
        });
        $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
        if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
        else
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
        if ($(this).attr('convert') != '') {
            if ($(this).val() % $(this).attr('convert') == 0) {
                $(this).parent().parent().next().find('.iPromotionVal').val(0).trigger('keyup');
                $(this).parent().parent().next().find('.iPromotionVal').val(parseInt($(this).parent().parent().parent().parent().find('.lPrice span').text().replace(/\,/g, "")) - parseInt($(this).attr('priceconvert')) * ($(this).val() / $(this).attr('convert'))).trigger('keyup');
            }
            if ($(this).val() < $(this).attr('convert'))
                $(this).parent().parent().next().find('.iPromotionVal').val(0).trigger('keyup');
        }
    });
    $('.dBoardImport .iNumber').live('keyup', function () {
        $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String((($(this).val() * parseFloat($(this).parent().parent().prev().find('.iNewPrice').val().replace(/\,/g, ""))) + ($(this).val() * parseFloat($(this).parent().parent().prev().find('.iNewPrice').val().replace(/\,/g, ""))) * ($(this).parent().parent().next().next().find('.iTax').val() - $(this).parent().parent().next().find('.iPromotionVal').val()) / 100))));
        total = 0;
        $('.' + backmap.see().page + ' .lPrice span').each(function () {
            total += parseFloat($(this).text().replace(/\,/g, ""));
        });
        $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
        if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
        else
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
    }).live('change', function () {
        $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String((($(this).val() * parseFloat($(this).parent().parent().prev().find('.iNewPrice').val().replace(/\,/g, ""))) + ($(this).val() * parseFloat($(this).parent().parent().prev().find('.iNewPrice').val().replace(/\,/g, ""))) * ($(this).parent().parent().next().next().find('.iTax').val() - $(this).parent().parent().next().find('.iPromotionVal').val()) / 100))));
        total = 0;
        $('.' + backmap.see().page + ' .lPrice span').each(function () {
            total += parseFloat($(this).text().replace(/\,/g, ""));
        });
        $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
        if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
        else
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
    });
    $('.dBoardSell .dProductSell .iPromotionVal').live('keyup', function () {
        if ($(this).next().val() == '-')
            $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String((parseFloat($(this).parent().parent().prev().prev().find('.iNewPrice').val().replace(/\,/g, "")) * parseFloat($(this).parent().parent().prev().find('.iNumber').val())) - parseFloat($(this).val().replace(/\,/g, "")))));
        else
            $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String((parseFloat($(this).parent().parent().prev().prev().find('.iNewPrice').val().replace(/\,/g, "")) * parseFloat($(this).parent().parent().prev().find('.iNumber').val())) - ((parseFloat($(this).parent().parent().prev().prev().find('.iNewPrice').val().replace(/\,/g, "")) * parseFloat($(this).parent().parent().prev().find('.iNumber').val())) * parseFloat($(this).val()) / 100))));
        total = 0;
        $('.' + backmap.see().page + ' .lPrice span').each(function () {
            total += parseFloat($(this).text().replace(/\,/g, ""));
        });
        $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
        if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
        else
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
        $(this).val(sep_price2(String($(this).val()).replace(/\,/g, "")));
    });
    $('.dBoardImport .dProductSell .iPromotionVal').live('keyup', function () {
        $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String(((parseFloat($(this).parent().parent().prev().prev().find('.iNewPrice').val().replace(/\,/g, "")) * $(this).parent().parent().prev().find('.iNumber').val()) + (parseFloat($(this).parent().parent().prev().prev().find('.iNewPrice').val().replace(/\,/g, "")) * $(this).parent().parent().prev().find('.iNumber').val()) * ($(this).parent().parent().next().find('.iTax').val() - $(this).val()) / 100))));
        total = 0;
        $('.' + backmap.see().page + ' .lPrice span').each(function () {
            total += parseFloat($(this).text().replace(/\,/g, ""));
        });
        $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
        if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
        else
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
        $(this).val(sep_price2(String($(this).val()).replace(/\,/g, "")));
    }).live('change', function () {
        $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String(((parseFloat($(this).parent().parent().prev().prev().find('.iNewPrice').val().replace(/\,/g, "")) * $(this).parent().parent().prev().find('.iNumber').val()) + (parseFloat($(this).parent().parent().prev().prev().find('.iNewPrice').val().replace(/\,/g, "")) * $(this).parent().parent().prev().find('.iNumber').val()) * ($(this).parent().parent().next().find('.iTax').val() - $(this).val()) / 100))));
        total = 0;
        $('.' + backmap.see().page + ' .lPrice span').each(function () {
            total += parseFloat($(this).text().replace(/\,/g, ""));
        });
        $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
        if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
        else
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
        $(this).val(sep_price2(String($(this).val()).replace(/\,/g, "")));
    });
    $('.iTax').live('keyup', function () {
        $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String((($(this).parent().parent().prev().prev().find('.iNumber').val() * parseFloat($(this).parent().parent().prev().prev().prev().find('.iNewPrice').val().replace(/\,/g, ""))) + ($(this).parent().parent().prev().prev().find('.iNumber').val() * parseFloat($(this).parent().parent().prev().prev().prev().find('.iNewPrice').val().replace(/\,/g, ""))) * ($(this).val() - $(this).parent().parent().prev().find('.iPromotionVal').val()) / 100))));
        total = 0;
        $('.' + backmap.see().page + ' .lPrice span').each(function () {
            total += parseFloat($(this).text().replace(/\,/g, ""));
        });
        $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
        if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
        else
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
    }).live('change', function () {
        $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String((($(this).parent().parent().prev().prev().find('.iNumber').val() * parseFloat($(this).parent().parent().prev().prev().prev().find('.iNewPrice').val().replace(/\,/g, ""))) + ($(this).parent().parent().prev().prev().find('.iNumber').val() * parseFloat($(this).parent().parent().prev().prev().prev().find('.iNewPrice').val().replace(/\,/g, ""))) * ($(this).val() - $(this).parent().parent().prev().find('.iPromotionVal').val()) / 100))));
        total = 0;
        $('.' + backmap.see().page + ' .lPrice span').each(function () {
            total += parseFloat($(this).text().replace(/\,/g, ""));
        });
        $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
        if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
        else
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
    });
    $('.dBoardSell .dProductSell .iPromotion').live('change', function () {
        if ($(this).val() == '-')
            $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String((parseFloat($(this).parent().parent().prev().prev().find('.iNewPrice').val().replace(/\,/g, "")) * parseFloat($(this).parent().parent().prev().find('.iNumber').val())) - parseFloat($(this).prev().val().replace(/\,/g, "")))));
        else
            $(this).parent().parent().parent().parent().find('.lPrice span').text(sep_price2(String((parseFloat($(this).parent().parent().prev().prev().find('.iNewPrice').val().replace(/\,/g, "")) * parseFloat($(this).parent().parent().prev().find('.iNumber').val())) - ((parseFloat($(this).parent().parent().prev().prev().find('.iNewPrice').val().replace(/\,/g, "")) * parseFloat($(this).parent().parent().prev().find('.iNumber').val())) * parseFloat($(this).prev().val()) / 100))));
        total = 0;
        $('.' + backmap.see().page + ' .lPrice span').each(function () {
            total += parseFloat($(this).text().replace(/\,/g, ""));
        });
        $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
        if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
        else
            $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
    });
    $('.dBoardSell .pFinal .iPromotionVal').live('keyup', function () {
        if ($(this).parent().next().val() == '-')
            $(this).parent().parent().parent().next().find('.pTotal  span').text(sep_price2(String(parseFloat($(this).parent().parent().parent().prev().find('.pTotal span').text().replace(/\,/g, "")) - parseFloat($(this).val().replace(/\,/g, "")))));
        else
            $(this).parent().parent().parent().next().find('.pTotal  span').text(sep_price2(String(parseFloat($(this).parent().parent().parent().prev().find('.pTotal span').text().replace(/\,/g, "")) - (($(this).parent().parent().parent().prev().find('.pTotal span').text().replace(/\,/g, "")) * $(this).val() / 100))));
        $(this).val(sep_price2($(this).val().replace(/\,/g, "")));
    });
    $('.dBoardImport .pFinal .iPromotionVal').live('keyup', function () {
        if ($(this).parent().next().val() == '-')
            $(this).parent().parent().parent().next().find('.pTotal  span').text(sep_price2(String(parseFloat($(this).parent().parent().parent().prev().find('.pTotal span').text().replace(/\,/g, "")) - parseFloat($(this).val().replace(/\,/g, "")))));
        else
            $(this).parent().parent().parent().next().find('.pTotal  span').text(sep_price2(String(parseFloat($(this).parent().parent().parent().prev().find('.pTotal span').text().replace(/\,/g, "")) - (($(this).parent().parent().parent().prev().find('.pTotal span').text().replace(/\,/g, "")) * $(this).val() / 100))));
        $(this).val(sep_price2($(this).val().replace(/\,/g, "")));
    });
    $('.dBoardSell .pFinal .iPromotion').live('change', function () {
        if ($(this).val() == '-')
            $(this).parent().parent().next().find('.pTotal  span').text(sep_price2(String(parseFloat($(this).parent().parent().prev().find('.pTotal span').text().replace(/\,/g, "")) - parseFloat($(this).prev().find('.iPromotionVal').val().replace(/\,/g, "")))));
        else
            $(this).parent().parent().next().find('.pTotal  span').text(sep_price2(String(parseFloat($(this).parent().parent().prev().find('.pTotal span').text().replace(/\,/g, "")) - (($(this).parent().parent().prev().find('.pTotal span').text().replace(/\,/g, "")) * $(this).prev().find('.iPromotionVal').val() / 100))));
    });
    $('.dBoardImport .pFinal .iPromotion').live('change', function () {
        if ($(this).val() == '-')
            $(this).parent().parent().next().find('.pTotal  span').text(sep_price2(String(parseFloat($(this).parent().parent().prev().find('.pTotal span').text().replace(/\,/g, "")) - parseFloat($(this).prev().find('.iPromotionVal').val().replace(/\,/g, "")))));
        else
            $(this).parent().parent().next().find('.pTotal  span').text(sep_price2(String(parseFloat($(this).parent().parent().prev().find('.pTotal span').text().replace(/\,/g, "")) - (($(this).parent().parent().prev().find('.pTotal span').text().replace(/\,/g, "")) * $(this).prev().find('.iPromotionVal').val() / 100))));
    });
    $('.aProducts').live('click', function () {
        if (bodyW >= 700) {
            if ($('.aProducts img:eq(0)').css('opacity') == 0) {
                $('.aProducts img:eq(0)').fadeTo(250, 1);
                $('.aProducts img:eq(1)').fadeTo(250, 0);
                TweenMax.to($('.' + backmap.see().page + ' .dProducts > div'), 0.3, {left: '-100%', onComplete: function () {
                    $('.' + backmap.see().page + ' .dProducts').css({display: 'none', width: '0%'});
                    TweenMax.to($('.' + backmap.see().page + ' .dContentSell'), 0.3, {width: '100%'});
                }});
            }
            else {
                $('.aProducts img:eq(0)').fadeTo(250, 0);
                $('.aProducts img:eq(1)').fadeTo(250, 1);
                TweenMax.to($('.' + backmap.see().page + ' .dContentSell'), 0.3, {width: '47.5%', onComplete: function () {
                    $('.' + backmap.see().page + ' .dProducts').css({display: 'block', width: '47%'});
                    TweenMax.to($('.' + backmap.see().page + ' .dProducts > div'), 0.3, {left: '0%'});
                }});
            }
        }
        else {

        }
    });
    $('.dBoardSell .lSellCode .iOpts').live('keyup', function (e) {
        people = JSON.parse((window.localStorage.getItem('people')));
        me = $(this);
        web.iReq({action: 'iGetBill', billId: $(this).val()}, function (dt) {
            if (dt != null) {
                me.attr('_id', dt._id);
                $('.' + backmap.see().page + ' form').html('');
                $.each(dt.products, function (k, v) {
                    $('.' + backmap.see().page + ' form').append('<div class="dCategory pros' + k + '">' +
                        '<div class="dProductSell" _id="' + k + '">' +
                        '<div class="dInfo" style="padding-right: 0px;">' +
                        '<a><img src="' + $('.dBoardSell .dProductSelect[_id=' + k + '] img').attr('src') + '" alt="wsup3"></a>' +
                        '<p><b>' + v.title + '</b></p>' +
                        '<p><label>Đơn giá:<input class="iNewPrice iOpts" type="text" priceOriginal="' + v['priceOriginal'] + '" priceImport="' + v['priceImport'] + '" value="' + sep_price2(String(v[((people.group == 5) ? 'priceOriginal' : 'price')])) + '"/>Đ</label></p>' +
                        '<p><label>Số lượng:<input class="iNumber iOpts" type="number" value="' + v['number'] + '"/><span>' + v['unit'] + '</span></label></p>' +
                        '<p><label>Khuyến mãi:<input class="iPromotionVal iOpts" type="text" value="' + v['promotionVal'] + '"/> <select class="iPromotion iOpts2"><option value="-">Đ</option><option value="%">%</option></select></label></p>' +
                        '</div>' +
                        '<a title="Xóa" class="aDelPro"><i class="fa fa-times" aria-hidden="true"></i></a>' +
                        '<label class="lPrice">Giá: <span>' + sep_price2(String(v[((people.group == 5) ? 'priceOriginal' : 'price')] * v['number'])) + '</span> Đ</label>' +
                        '</div></div>');
                    align.topleft($('.' + backmap.see().page + ' .dProductSell > .dInfo > a:last img'), $('.dProductSell > .dInfo > a:last'), 0, 0, 1);
                    $('.' + backmap.see().page + ' .pros' + k + ' .iPromotion').val(v.promotionType);
                });
                $('.' + backmap.see().page + ' .pFinal:eq(0) > span').text(dt.date);
                total = 0;
                $('.' + backmap.see().page + ' .lPrice span').each(function () {
                    total += parseFloat($(this).text().replace(/\,/g, ""));
                });
                $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
                $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val(dt.promotionVal);
                $('.' + backmap.see().page + ' .pFinal .iPromotion').val(dt.iPromotion);
                $('.' + backmap.see().page + ' .sCustomer').val(dt.pid);
                if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
                    $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
                else
                    $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
            }
            else
                me.removeAttr('_id');
        });
    });
    $('.dBoardImport .lSellCode .iOpts').live('keyup', function (e) {
        people = JSON.parse((window.localStorage.getItem('people')));
        me = $(this);
        web.iReq({action: 'iGetBillImport', billId: $(this).val()}, function (dt) {
            if (dt != null) {
                me.attr('_id', dt._id);
                $('.' + backmap.see().page + ' form').html('');
                $.each(dt.products, function (k, v) {
                    $('.' + backmap.see().page + ' form').append('<div class="dCategory pros' + k + '">' +
                        '<div class="dProductSell" _id="' + k + '">' +
                        '<div class="dInfo" style="padding-right: 0px;">' +
                        '<a><img src="' + $('.dBoardImport .dProductSelect[_id=' + k + '] img').attr('src') + '" alt="wsup3"></a>' +
                        '<p><b>' + v.title + '</b></p>' +
                        '<p><label>Đơn giá:<input class="iNewPrice iOpts" type="text" value="' + sep_price2(String(v['price'])) + '"/>Đ</label></p>' +
                        '<p><label>Số lượng:<input class="iNumber iOpts" type="number" value="' + v['number'] + '"/><span>' + v['unit'] + '</span></label></p>' +
                        '<p><label>Chiết khấu:<input class="iPromotionVal iOpts" type="text" value="' + v['promotionVal'] + '"/>%</label></p>' +
                        '<p><label>Thuế suất:<input class="iTax iOpts" type="number" value="' + v['tax'] + '">%</label></p>' +
                        '</div>' +
                        '<a title="Xóa" class="aDelPro"><i class="fa fa-times" aria-hidden="true"></i></a>' +
                        '<label class="lPrice">Giá: <span>' + sep_price2(String(v['price'] * v['number'] + v['price'] * v['number'] * (v['tax'] - v['promotionVal']) / 100)) + '</span> Đ</label>' +
                        '</div></div>');
                    align.topleft($('.' + backmap.see().page + ' .dProductSell > .dInfo > a:last img'), $('.' + backmap.see().page + ' .dProductSell > .dInfo > a:last'), 0, 0, 1);
                    $('.' + backmap.see().page + ' .pros' + k + ' .iPromotion').val(v.promotionType);
                });
                $('.' + backmap.see().page + ' .pFinal:eq(0) > span').text(dt.date);
                total = 0;
                $('.' + backmap.see().page + ' .lPrice span').each(function () {
                    total += parseFloat($(this).text().replace(/\,/g, ""));
                });
                $('.' + backmap.see().page + ' .pTotal:eq(0) span').text(sep_price2(String(total)));
                $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val(dt.promotionVal);
                $('.' + backmap.see().page + ' .pFinal .iPromotion').val(dt.iPromotion);
                $('.' + backmap.see().page + ' .sCustomer').val(dt.pid);
                if ($('.' + backmap.see().page + ' .pFinal .iPromotion').val() == '-')
                    $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - parseFloat($('.' + backmap.see().page + ' .pFinal .iPromotionVal').val().replace(/\,/g, "")))));
                else
                    $('.' + backmap.see().page + ' .pTotal:eq(1) span').text(sep_price2(String(parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) - (parseFloat($('.' + backmap.see().page + ' .pTotal:eq(0) span').text().replace(/\,/g, "")) * $('.' + backmap.see().page + ' .pFinal .iPromotionVal').val() / 100))));
            }
            else
                me.removeAttr('_id');
        });
    });
    $('.dAppPayHistory').live('click', function () {
        changePage($('.dBoardPayHistory'), 'dShow', {fn: function () {
            backmap.add({page: 'dBoardPayHistory', action: {fn: function () {
                if ($('.dBoardPayHistory .sCustomerPay option').length < 1)
                    web.iReq({action: 'iGetCustomers'}, function (dt) {
                        $.each(dt, function (k, v) {
                            $('.dBoardPayHistory .sCustomerPay').append('<option value="' + v._id + '">' + ((typeof(v.fullname) == 'undefined') ? v.displayname : v.fullname) + '</option>')
                        });
                    });
                $('.dBoardPayHistory .dDate input').val(web.dateObj.getFullYear() + '-' + (((web.dateObj.getMonth() + 1) < 10) ? '0' + (web.dateObj.getMonth() + 1) : (web.dateObj.getMonth() + 1)) + '-' + (((web.dateObj.getDate()) < 10) ? '0' + (web.dateObj.getDate()) : (web.dateObj.getDate())));
                $('.aBack').attr('ready', 1);
            }, params: {}}});
        }, params: {}});
    });
});