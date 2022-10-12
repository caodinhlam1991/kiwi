exports.config = function($){
    $.app.get('/dang-nhap', function(req, res){
        $.setController('People/Controller/index.js', req, res, 'PeopleLogin');
    });
    $.app.get('/dang-ky', function(req, res){
        $.setController('People/Controller/index.js', req, res, 'PeopleRegister');
    });
    $.app.get('/dang-ky-web', function(req, res){
        $.setController('People/Controller/index.js', req, res, 'WebRegister');
    });
    $.app.get('/quen-mat-khau', function(req, res){
        $.setController('People/Controller/index.js', req, res, 'forgot');
    });
    $.app.get('/hoc-vien', function(req, res){
        $.setController('People/Controller/index.js', req, res, 'student');
    });
    $.app.get('/hoc-vien/kich-hoat-khoa-hoc', function(req, res){
        $.setController('People/Controller/index.js', req, res, 'active');
    });
    $.app.get('/hoc-vien/qua-tang', function(req, res){
        $.setController('People/Controller/index.js', req, res, 'gift');
    });
    $.app.get('/hoc-vien/yeu-cau-ho-tro', function(req, res){
        $.setController('People/Controller/index.js', req, res, 'support');
    });
    $.app.get('/hoc-vien/thao-luan', function(req, res){
        $.setController('People/Controller/index.js', req, res, 'comment');
    });
    $.app.get('/hoc-vien/hop-thu', function(req, res){
        $.setController('People/Controller/index.js', req, res, 'inbox');
    });
    $.app.get('/hoc-vien/lich-su-thanh-toan', function(req, res){
        $.setController('People/Controller/index.js', req, res, 'history');
    });
    $.app.get('/hoc-vien/thong-tin', function(req, res){
        $.setController('People/Controller/index.js', req, res, 'profile');
    });
    $.app.get('/hoc-vien/:slug', function(req, res){
        $.setController('People/Controller/index.js', req, res, 'course');
    });
    $.app.post('/hoc-vien/logFB', function(req, res){
        $.setController('People/Controller/index.js', req, res, 'logFB');
    });
    $.app.post('/hoc-vien/logout', function(req, res){
        $.setController('People/Controller/index.js', req, res, 'logout');
    });
};