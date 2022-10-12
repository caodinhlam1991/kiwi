exports.config = function($){
    $.app.get('/format', function(req, res){
        $.setController('Admin/Controller/index.js', req, res, 'format');
    });
    $.app.get('/admin', function(req, res){
        $.setController("Admin/Controller/index.js", req, res, 'index');
    });
    $.app.get('/dashbrowser', function(req, res){
        $.setController("Admin/Controller/index.js", req, res, 'dashbrowser');
    });
    $.app.get('/dashapp', function(req, res){
        $.setController("Admin/Controller/index.js", req, res, 'dashapp');
    });
    $.app.get('/wapp', function(req, res){
        $.setController("Admin/Controller/index.js", req, res, 'wapp');
    });
    $.app.get('/browserlogin', function(req, res){
        $.setController("Admin/Controller/index.js", req, res, 'browserlogin');
    });
    $.app.get('/guests', function(req, res){
        $.setController("Admin/Controller/index.js", req, res, 'guests');
    });
    $.app.get('/admin/:lang@:_id', function (req, res) {
        $.setController("Admin/Controller/index.js", req, res, 'index');
    });
    $.app.get('/dashbrowser/:lang', function(req, res){
        $.setController("Admin/Controller/index.js", req, res, 'dashbrowser');
    });
    $.app.get('/dashapp/:lang@:_id', function(req, res){
        $.setController("Admin/Controller/index.js", req, res, 'dashapp');
    });
    $.app.get('/wapp/:lang', function(req, res){
        $.setController("Admin/Controller/index.js", req, res, 'wapp');
    });
    $.app.get('/browserlogin/:lang', function(req, res){
        $.setController("Admin/Controller/index.js", req, res, 'browserlogin');
    });
    $.app.get('/guests/:lang', function(req, res){
        $.setController("Admin/Controller/index.js", req, res, 'guests');
    });
    $.app.get('/admin/:lang/people/:action', function(req, res){
        $.setController("Admin/Controller/index.js", req, res);
    });
    $.app.get('/admin/:lang/camera', function(req, res){
        $.setController("Admin/Controller/index.js", req, res, 'camera');
    });
    $.app.get('/admin/:lang/recording', function(req, res){
        $.setController("Admin/Controller/index.js", req, res, 'recording');
    });
};