exports.controller = function($, req, res){
    var addFiles = function(){
        if(req.method=='POST')
        {
            file = $.getModel('File', 'index', $).addFile({
                name: req.body.name,
                type: req.body.type,
                mediaid: req.body.mediaid,
                live: true,
                wid: req.body.wid,
                site: $.config.link,
                date: $.dateTimeObj.getNow()
            });
            if(typeof(file._id) != 'undefined')
                res.send({status: true, name: req.body.name, _id: file._id});
            else
                res.send({status: false, err: file});
        }
    };
    return {
        addFiles: addFiles
    };
};