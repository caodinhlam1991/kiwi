// JavaScript Document

$('.s_update_news').live('click', function(e){//ud
    e.preventDefault();
    $(this).text(tran('Đang cập nhật|Updating|Обновляются|更新|更新')+' ...').attr('class', 'badge s_onupdate');
    getnewsall(n1.categoryId(), n1.execute, 'end();');
    //getnewsall(h1.categoryId(), h2.execute, 'getnewsall(gk.categoryId(), gk.execute, \'getnewsall(n1.categoryId(), n1.execute, \'end();\');\')');
})//end

var from, nums_site, length;
function end()
{
    $('.s_onupdate').text(tran('Đã cập nhật.|Updated.|Обновление.|更新 |更新した.')).attr('class', 'badge s_updated');
}
function getnewsall(categoryId, execute, callBack)
{
    $.ajax({
        url:baseurl+"/process/getnewsall",
        type:"POST",
        data: {code: $('body').attr('security'), 'termid': categoryId},
        dataType: 'json',
        success: function(data){
            execute(data, callBack);
        }
    });
}
function get_except(me, to, news_length, f_url, f_site, f_remove, f_detail, f_categoryId, ext, dt, f)
{
    $('body').append('<div class="d_except_"></div><div class="d_detail_"></div><div class="d_html"></div>');
    var d_except = $('.d_except_'), d_detail = $('.d_detail_'), d_html = $('.d_html');
    $.ajax({
        url:baseurl+"/process/getnews",
        type:"POST",
        data: {url: me+from+ext(), code: $('body').attr('security')},
        success: function(data){
            d_except.empty();
            var interval = setInterval(function(){
                if(d_except.text()!='')
                {
                    clearInterval(interval);
                    f_site();
                    f_remove();
                    getDetail(me, to, news_length, d_html, d_except, d_detail, f_url, f_site, f_remove, f_detail, f_categoryId, ext, dt, f)
                }
            },200);
            d_except.html(data);
        }
    });
}
function getDetail(me, to, news_length, d_html, d_except, d_detail, f_url, f_site, f_remove, f_detail, f_categoryId, ext, dt, f)
{
    $.ajax({
        url:baseurl+"/process/getnews",
        type:"POST",
        data: {url: f_url(), code: $('body').attr('security')},
        success: function(data){
            d_html.empty();
            var interval2 = setInterval(function(){
                if(d_html.text()!='')
                {
                    clearInterval(interval2);
                    d_detail.append('<div class="d_line_detail">'+f_detail()+'</div>');
                    f_remove();
                    length++;
                    if(length<news_length())
                        getDetail(me, to, news_length, d_html, d_except, d_detail, f_url, f_site, f_remove, f_detail, f_categoryId, ext, dt, f);
                    else
                    {
                        d_html.remove();
                        if(dt.length>0)
                        {
                            postid1 = dt[nums_site-from];
                            postid2 = dt[nums_site-from];
                            postid1 = (typeof(postid1)!='undefined')? postid1.id: 0;
                            postid2 = (typeof(postid2)!='undefined')? postid2.postid: 0;
                            $.ajax({
                                url:baseurl+"/process/addnews",
                                type:"POST",
                                data: {code: $('body').attr('security'), postid1: postid1, postid2: postid2, termid: f_categoryId(), detail: d_detail.html(), except: d_except.html()},
                                success: function(data){
                                    d_except.remove()
                                    d_detail.remove()
                                    if(from<to)
                                    {
                                        from++;
                                        get_except(me, to, news_length, f_url, f_site, f_remove, f_detail, f_categoryId, ext, dt, f);
                                    }
                                    else
                                        eval(f);
                                }
                            });
                        }
                        else
                            $.ajax({
                                url:baseurl+"/process/addnews",
                                type:"POST",
                                data: {code: $('body').attr('security'), postid1: 0, postid2: 0, termid: f_categoryId(), detail: d_detail.html(), except: d_except.html()},
                                success: function(data){
                                    d_except.remove()
                                    d_detail.remove()
                                    if(from<to)
                                    {
                                        from++;
                                        get_except(me, to, news_length, f_url, f_site, f_remove, f_detail, f_categoryId, ext, dt, f);
                                    }
                                    else
                                        eval(f);
                                }
                            });
                    }
                }
            },250);
            d_html.html(data);
        }
    });
}

//CNTT
var gk = {
        execute: function(dt, end){
            nums_site = 0;
            from = 1;
            length = 0;
            nums_site = nums_site + gk.to();
            get_except(gk.url(true), gk.to(), gk.length, gk.url_detail, gk.site, gk.remove, gk.detail, gk.categoryId, gk.ext, dt, end);
        },
        to: function(){
            return 10;//get 10 page
        },
        url: function(p){
            return (p)? 'http://genk.vn/home/page-': 'http://genk.vn';
        },
        length: function(){
            return $('.www_intro').length;
        },
	detail: function(){
            $('.content a').each(function(){
                $(this).parent('li').parent('ul').remove();
            });
            $('.content img:eq(0)').attr('class', 'www_img');
            $('.content img:not(.www_img)').each(function(){
                $(this).attr({'img_src': $(this).attr('src'), 'src': ''});
            });
            return $('.content').append('<p class="p_source">Nguồn: <b>Genk</b></p><p class="p_filter">Tổng hợp: <b>Wsup3</p>').html();
        },
        url_detail : function(){
            return "http://genk.vn"+$('.list-news-status:eq('+length+') h2 a').attr('href');
        },
	remove: function(){
            $('.init_content, .clearfix').remove();
        },
	site: function(){
            $('.list-news img').remove();
            $('.list-news').attr('class', 'www_intro');
            $('.d_except_ h2').attr({'class': 'www_title'});
            $('.list-news-status-p').next().attr('class', 'www_except');
            except=$('.d_except_');
            except.html($('.w690').html());
            except.html($('.w690').html());
            length = 0;
        },
        ext: function(){
            return ".chn";
        },
	categoryId: function(){
            return '32';//Công Nghệ
        },
}
var t2 = {
        execute: function(dt, end){
            nums_site = 0;
            from = 0;
            length = 0;
            nums_site = nums_site + t2.to();
            get_except(t2.url(true), t2.to(), t2.length, t2.url_detail, t2.site, t2.remove, t2.detail, gk.categoryId, t2.ext, dt, end);
        },
        to: function(){
            return 9;
        },
        url: function(p){
            return (p)? 'http://www.thongtincongnghe.com/article?page=': 'http://www.thongtincongnghe.com';
        },
        length: function(){
            return $('.www_intro').length;
        },
	detail: function(){
            $('.style-single a').each(function(){
                $(this).parent('li').parent('ul').remove();
            });
            $('.style-single .figure').css('background', 'none')
            $('.style-single img:eq(0)').attr('class', 'www_img');
            $('.style-single img:not(.www_img)').each(function(){
                $(this).attr({'img_src': $(this).attr('data-src'), 'src': ''});
            });
            return $('.style-single').append('<p class="p_source">Nguồn: <b>Thông tin công nghệ</b></p><p class="p_filter">Tổng hợp: <b>Wsup3</p>').html();
        },
        url_detail : function(){
            var url = $('.www_intro:eq('+length+') a').attr('href');
            if(url.indexOf("http")==0)
                return url;
            else
                return t2.url(false)+'/'+url;
        },
	remove: function(){},
	site: function(){
            $('.views-row img').remove();
            $('.views-row').attr('class', 'www_intro');
            $('.www_intro .media-body').attr('class', 'www_except');
            $('.www_except').each(function(){
                $(this).before('<h3 class="www_title">'+$(this).find('h3').text()+'</h3>');
                $(this).find('header').remove();
            });
            $('.d_except_').html($('.view-content').html());
            length = 0;
        },
        ext: function(){
            return "";
        },
}
//CNTT

//HOT
var h1 = {
        execute: function(dt, callBack){
            nums_site = 0;
            from = 1;
            length = 0;
            nums_site = nums_site + h1.to();
            get_except(h1.url(true), h1.to(), h1.length, h1.url_detail, h1.site, h1.remove, h1.detail, h1.categoryId, h1.ext, dt, callBack);
        },
        to: function(){
            return 10;
        },
        url: function(p){
            return (p)? 'http://vietnamnet.vn/vn/moi-nong/trang': 'http://vietnamnet.vn';
        },
        length: function(){
            return $('.www_intro').length;
        },
	detail: function(){
            $('.ArticleContent a').each(function(){
                $(this).parent('li').parent('ul').remove();
            });
            $('.ArticleContent p:eq(0), .ArticleContent strong:eq(0)').remove();
            $('.ArticleContent img:eq(0)').attr('class', 'www_img');
            $('.ArticleContent img:not(.www_img)').each(function(){
                $(this).attr({img_src: $(this).attr('src'), src: ''});
            });
            return $('.ArticleContent').append('<p class="p_source">Nguồn: <b>vietnamnet</b></p><p class="p_filter">Tổng hợp: <b>Wsup3</p>').html();
        },
        url_detail : function(){
            var url = $('.www_intro:eq('+length+') a').attr('href');
            if(url.indexOf("http")==0)
                return url;
            else
                return h1.url(false)+url;
        },
	remove: function(){},
	site: function(){
            $('.ArticleCateItem img').remove();
            $('.ArticleCateItem').attr('class', 'www_intro');
            $('.www_intro h2 a').attr({class: 'www_title'});
            $('.www_intro h3').attr('class', 'www_except');
            $('.d_except_').html($('.ArticleCateList').html());
            length = 0;
        },
        ext: function(){
            return "/index.html";
        },
	categoryId: function(){
            return '21';//Tin Nóng
        },
}
var h2 = {
        execute: function(dt, callBack){
            nums_site = 0;
            from = 1;
            length = 0;
            nums_site = nums_site + h2.to();
            get_except(h2.url(true), h2.to(), h2.length, h2.url_detail, h2.site, h2.remove, h2.detail, h1.categoryId, h2.ext, dt, callBack);
        },
        to: function(){
            return 10;
        },
        url: function(p){
            return (p)? 'http://ngoisao.vn/theo-dong-su-kien/trang-': 'http://ngoisao.vn';
        },
        length: function(){
            return $('.www_intro').length;
        },
	detail: function(){
            $('.detail-content a').each(function(){
                $(this).parent('li').parent('ul').remove();
            });
            $('.detail-content img:eq(0)').attr('class', 'www_img');
            $('.detail-content img:not(.www_img)').each(function(){
                $(this).attr({img_src: $(this).attr('src'), src: ''});
            });
            return $('.detail-content').append('<p class="p_source">Nguồn: <b>Ngôi Sao</b></p><p class="p_filter">Tổng hợp: <b>Wsup3</p>').html();
        },
        url_detail : function(){
            var url = $('.www_intro:eq('+length+') a').attr('href');
            if(url.indexOf("http")==0)
                return url;
            else
                return h2.url(false)+'/'+url;
        },
	remove: function(){},
	site: function(){
            $('.cate-item img').remove();
            $('.cate-item').attr('class', 'www_intro');
            $('.www_intro h3 a').attr({class: 'www_title'});
            $('.www_intro .sapo').attr('class', 'www_except');
            $('.d_except_').html($('#cate-items').html());
            length = 0;
        },
        ext: function(){
            return "/";
        },
}
//HOT

//NEW
var n1 = {
        execute: function(dt, callBack){
            nums_site = 0;
            from = 1;
            length = 0;
            nums_site = nums_site + n1.to();
            get_except(n1.url(true), n1.to(), n1.length, n1.url_detail, n1.site, n1.remove, n1.detail, n1.categoryId, n1.ext, dt, callBack);
        },
        to: function(){
            return 10;
        },
        url: function(p){
            return (p)? 'http://www.doisongphapluat.com/tin-tuc/page/': 'http://www.doisongphapluat.com';
        },
        length: function(){
            return $('.www_intro').length;
        },
	detail: function(){
            $('#main-detail a').each(function(){
                $(this).parent('li').parent('ul').remove();
            });
            $('#main-detail strong:eq(0)').remove();
            $('#main-detail img:eq(0)').attr('class', 'www_img');
            $('#main-detail img:not(.www_img)').each(function(){
                $(this).attr({img_src: $(this).attr('src'), src: ''});
            });
            return $('#main-detail').append('<p class="p_source">Nguồn: <b>Đời sống pháp luật</b></p><p class="p_filter">Tổng hợp: <b>Wsup3</p>').html();
        },
        url_detail : function(){
            var url = $('.www_intro:eq('+length+') a').attr('href');
            if(url.indexOf("http")==0)
                return url;
            else
                return n1.url(false)+url;
        },
	remove: function(){},
	site: function(){
            $('.module-vertical-list img').remove();
            $('.module-vertical-list li').attr('class', 'www_intro');
            $('.www_intro h4 a').attr({class: 'www_title'});
            $('.desc').each(function(){
                $(this).text().replace('(ĐSPL) - ', '');
            });
            $('.desc').attr('class', 'www_except');
            $('.d_except_').html($('.module-vertical-list').html());
            length = 0;
        },
        ext: function(){
            return "";
        },
	categoryId: function(){
            return '22';//Tin Nóng
        },
}
var n2 = {
        execute: function(dt, callBack){
            nums_site = 0;
            from = 1;
            length = 0;
            nums_site = nums_site + h2.to();
            get_except(h2.url(true), h2.to(), h2.length, h2.url_detail, h2.site, h2.remove, h2.detail, h1.categoryId, h2.ext, dt, callBack);
        },
        to: function(){
            return 10;
        },
        url: function(p){
            return (p)? 'http://ngoisao.vn/theo-dong-su-kien/trang-': 'http://ngoisao.vn';
        },
        length: function(){
            return $('.www_intro').length;
        },
	detail: function(){
            $('.detail-content a').each(function(){
                $(this).parent('li').parent('ul').remove();
            });
            $('.detail-content img').attr({width: '100%', align: 'center'});
            $('.detail-content img:eq(0)').attr('class', 'www_img');
            $('.detail-content img:not(.www_img)').each(function(){
                $(this).attr({img_src: $(this).attr('src'), src: ''});
            });
            return $('.detail-content').append('<p class="p_source">Nguồn: <b>Ngôi Sao</b></p><p class="p_filter">Tổng hợp: <b>Wsup3</p>').html();
        },
        url_detail : function(){
            var url = $('.www_intro:eq('+length+') a').attr('href');
            if(url.indexOf("http")==0)
                return url;
            else
                return h2.url(false)+'/'+url;
        },
	remove: function(){},
	site: function(){
            $('.cate-item img').remove();
            $('.cate-item').attr('class', 'www_intro');
            $('.www_intro h3 a').attr({class: 'www_title'});
            $('.www_intro .sapo').attr('class', 'www_except');
            $('.d_except_').html($('#cate-items').html());
            length = 0;
        },
        ext: function(){
            return "/";
        },
}
//HOT

//Travel
var ivv = {
        from: function(){
            nums_site = 0;
            from = 1;
            length = 0;
            nums_site = nums_site + gk.to();
        },
        to: function(){
            return 4;//get 3 page
        },
        url: function(p){
            return (p)? 'http://www.ivivu.com/blog/category/viet-nam/page/': 'http://www.ivivu.com';
        },
        length: function(){
            return $('.one-half').length;
        },
	title: function(){
            return $('.d_html h2:eq('+length+')').text();
        },
	img: function(){
            return $('.d_html').find('img:eq('+length+')').attr('src');
        },
	introduc: function(){
            return $('.list-news-status-p:eq('+length+')').next().text();
        },
	detail: function(){
            return $('.content').html();
        },
        url_detail : function(){
            return "http://genk.vn"+$('.list-news-status:eq('+length+') h2 a').attr('href');
        },
	remove: function(){
            $('.init_content, .clearfix').remove();
        },
	site: function(){
            except=$('.d_except_');
            except.html($('.w690').html());
            except.html($('.w690').html());
            length = 0;
        },
	categoryId: function(){
            return '32';//Công Nghệ
        },
        ext: function(){
            return ".chn";
        }
}
//Travel