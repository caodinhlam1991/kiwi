exports.controller = function($, req, res){
    var multimedia = function(){
        $.getModel('File', 'media', $).getMultimediaId($.ObjectId(req.params.id), function (multimedia) {
            if(multimedia!=null)
            {
                media = multimedia.data.substring(multimedia.data.indexOf(';base64,')+8);
                media = media.replace(/ /g, '+');
                media = new Buffer(media, 'base64');
                res.writeHead(200, {
                    'Content-Type': multimedia.data.substring(5, multimedia.data.indexOf(';base64')),
                    'Content-Length': media.length
                });
                return res.end(media);
            }
            res.end(null);
        });
    };
    var music = function(){
        $.getModel('File', 'media', $).getMultimediaId(req.params.id, function (multimedia) {
            if(multimedia!=null)
                $.getModel('File', 'media', $).getFileMId(multimedia._id, function (file) {
                    if(file!=null)
                    {
                        media = multimedia.data.substring(multimedia.data.indexOf(';base64,')+8);
                        media = media.replace(/ /g, '+');
                        media = new Buffer(media, 'base64');
                        $.fs.writeFileSync($.config.filedir + '/'+file.name, media);
                        return res.download($.config.filedir + '/'+file.name);
                    }
                    else
                        res.end(null);
                });
            else
                res.end(null);
        });
    };
    var addMultimedia = function(){
        if(req.method=='POST')
        {
            $.getModel('File', 'media', $).addMultimedia({
                data: req.body.data
            }, function (multimedia) {
                $.getModel('File', 'index', $).addFile({
                    name: req.body.name,
                    type: req.body.type,
                    mediaid: multimedia._id,
                    live: false,
                    params: ((typeof (req.body.duration) != 'undefined') ? { duration: parseInt(req.body.duration) } : {}),
                    path: $.createSlug(req.body.name),
                    site: (($.isOf == true) ? $.baseurls(req) : $.config.link),
                    wid: $.ObjectId(req.body.wid),
                    date: new Date($.dateTimeObj.getNow())
                }, function (file) {
                    if (typeof (multimedia._id) != 'undefined')
                        res.send({ status: true, link: (($.isOf == true) ? $.baseurls(req) : $.config.link), date: $.dateTimeObj.getNow(), mediaid: multimedia._id });
                    else
                        res.send({ status: false, err: multimedia });
                });
            });
        }
    };
    var addPic = function(){
        if(req.method=='POST')
        {
            $.getModel('Content', 'index', $).getAll({type: 'post', $or:[{wid: $.ObjectId(req.body.wid)}, {'params.address': req.body.pead}], cats: $.ObjectId('628d7e78e49a440004efc9ce')}, {date: -1}, {_id: 1}, function (docs) {
                query = {};
                if (req.body.class != 6)
                    query = {wid: $.ObjectId(req.body.wid)};
                query['type'] = 'image';
                query['name'] = {$regex: ".*.*"};
                $.getModel('File', 'index', $).getAll(query, {date: -1, name: 1}, {_id: 1}, function (files) {
                    if(files.length-(docs.length*2)<2)
                        $.getModel('File', 'media', $).addMultimedia({
                            data: req.body.data
                        }, function (multimedia) {
                            $.getModel('File', 'index', $).addFile({
                                name: req.body.name,
                                type: req.body.type,
                                mediaid: multimedia._id,
                                live: false,
                                params: ((typeof (req.body.duration) != 'undefined') ? { duration: parseInt(req.body.duration) } : {}),
                                path: $.createSlug(req.body.name),
                                site: (($.isOf == true) ? $.baseurls(req) : $.config.link),
                                wid: $.ObjectId(req.body.wid),
                                date: new Date($.dateTimeObj.getNow())
                            }, function (file) {
                                if (typeof (multimedia._id) != 'undefined')
                                    res.send({ status: true, link: (($.isOf == true) ? $.baseurls(req) : $.config.link), date: $.dateTimeObj.getNow(), mediaid: multimedia._id });
                                else
                                    res.send({ status: false, err: multimedia });
                            });
                        });
                    else
                        res.send({ status: false, err: "Đăng thêm 1 bài viết để tải lên thêm 2 img hãy xoá "+ (files.length-(docs.length*2)) +" img không cần, tải lại page nếu tải img lỗi" });
                });
            });
        }
    };
    var deleteMultimedia = function(){
        if(req.method=='POST' && (req.body.user.group == 1 || req.body.user.group == 6))
        {
            multimedia = '';
            console.log(req.query.mediaid);
            $.webGet($, req.body.site + '/vi/media/delMedia?&mediaid=' + req.body._id, function (dt) {
                multimedia += dt;
            }, function () {
                $.getModel('File', 'media', $).delFileMediaid($.ObjectId(req.body._id), function (dt) {
                    res.send(true);
                });
            });
        }
    };
    var like = function(){
        res.render('File/View/Layout/index', {
            $: $,
            template: 'like'
        });
    };
    var commentCount = function(){
        res.render('File/View/Layout/index', {
            $: $,
            template: 'comment-count'
        });
    };
    var getData = function () {
        $.getModel('File', 'media', $).getMultimediaId($.mongoose.Types.ObjectId(req.query.mediaid), function (media){
            if(err)
                return res.end({status: false, err: media});
            if(media != null){
                res.end(media.data);
            }
            res.end(null);
        });
    };
    var delMedia = function () {
        $.getModel('File', 'media', $).delMultimediaId($.ObjectId(req.query.mediaid), function (dt) {
            res.send(true);
        });
    };
    var addFiles = function(){
        if(req.method=='POST')
        {
            $.getModel('File', 'index', $).addFile({
                name: req.body.name,
                type: req.body.type,
                mediaid: req.body.mediaid,
                live: false,
                wid: req.body.wid,
                site: (($.isOf == true) ? $.baseurls(req) : $.config.link),
                date: $.dateTimeObj.getNow()
            }, function (file) {
                if (typeof (file._id) != 'undefined')
                    res.send({ status: true, name: req.body.name, _id: file._id });
                else
                    res.send({ status: false, err: file });
            });
        }
    };
    var iEditFile = function(data){
        if(data.user.group == 1 || data.user.group == 6)
        {
            item = {
                _id: data.params.item._id,
                name: data.params.item.name,
                type: data.params.item.type,
                mediaid: data.params.item.mediaid,
                live: data.params.item.live,
                params: data.params.item.params,
                site: data.params.item.site,
                userid: data.params.item.userid,
                date: data.params.item.date
            };
            if(data.params.type=='audio')
            {
                item.path = $.createSlug(data.params.item.name);
                item.name += '.mp3';
            }
            $.getModel('File', 'index', $).editFile(item, function (dt) {
                $.return(data, true);
            });
        }
    };
    var iGetNextFile = function(data){
        if(data.user.group == 1 || data.user.group == 6 || data.user.group == 4)
            $.getModel('File', 'index', $).getAllAdv({type: data.params.type, live: true}, {date: -1, name: 1}, {
                _id: 1,
                date: 1
            }, function (result) {
                result.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                });
                if (data.params.pos + 1 < result.length)
                    $.getModel('File', 'index', $).getFileId(result[data.params.pos + 1]._id, function (file) {
                        $.return(data, file);
                    });
                else
                    $.getModel('File', 'index', $).getFileId(result[0]._id, function (file) {
                        $.return(data, file);
                    });
            });
    };
    return {
        like: like,
        commentCount: commentCount,
        addMultimedia: addMultimedia,
        addPic: addPic,
        deleteMultimedia: deleteMultimedia,
        multimedia: multimedia,
        music: music,
        getData: getData,
        delMedia: delMedia,
        addFiles: addFiles,
        iEditFile: iEditFile,
        iGetNextFile: iGetNextFile
    };
};