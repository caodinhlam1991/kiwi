exports.config = function () {
    $.app.get("/", function (o, e) {
        $.setController("Home/Controller/index.js",o,e, 'index');
    });
    $.app.get('//:lang@:_id', function(req, res){
        $.setController("Home/Controller/index.js", req, res, 'index');
    });
    $.app.get('/thiet-ke-web', function (req, res) {
        $.setController('Home/Controller/index.js', req, res, 'webdesign');
    });
    $.app.get('/friend', function (req, res) {
        $.setController('Home/Controller/index.js', req, res, 'friend');
    });
    $.app.get('/friend/:lang@:_id', function(req, res){
        $.setController("Home/Controller/index.js", req, res, 'friend');
    });
};