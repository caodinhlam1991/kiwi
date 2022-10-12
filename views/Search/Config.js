exports.config = function(){
    $.app.get("/tim-kiem",function(o,e){
        $.setController("Search/Controller/index.js",o,e, 'index');
    });
};