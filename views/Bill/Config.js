exports.config = function($){
//    $.app.get('/gio-hang', function(req, res){
//        $.setController('Cart/Controller/index.js', req, res, 'index');
//    });
    $.app.get('/chuyen-khoan-thanh-cong', function(req, res){
        $.setController('Bill/Controller/index.js', req, res, 'success');
    });
};