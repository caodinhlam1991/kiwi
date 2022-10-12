exports.config = function($){
    $.app.post('/dat-hang/:action', function(req, res){
        $.setController('Cart/Controller/index.js', req, res);
    });
    $.app.get('/gio-hang', function(req, res){
        $.setController('Cart/Controller/index.js', req, res, 'index');
    });
    $.app.get('/thanh-toan', function(req, res){
        $.setController('Cart/Controller/index.js', req, res, 'payment');
    });
    $.app.get('/kich-hoat/:email/:id', function(req, res){
        $.setController('Cart/Controller/index.js', req, res, 'active');
    });
    $.app.get('/thanh-toan-thanh-cong', function(req, res){
        $.setController('Cart/Controller/index.js', req, res, 'success');
    });
};