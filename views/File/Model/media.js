exports.model = function($){
    var addMultimedia = function (m, fn) {
        $.model.db.medias.insertOne(m, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt.ops[0]);
        });
    };
    var delMultimediaId = function (id, fn) {
        $.model.db.medias.deleteOne({ _id: id }, function (err, dt) {
            $.fill(fn, dt);
        });
    };
    var getMultimediaId = function (id, fn) {
        $.model.db.medias.findOne({ _id: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAll = function (match, sort, project, fn) {
        $.model.db.medias.find(match, project).sort(sort).toArray(function (err, dt) {
            if(err) throw err;
            $.fill(fn, dt);
        });
    };
    //old
    $.model.db.medias = $.dbclient.db($.config.database.name).collection("medias");
    return {
        addMultimedia: addMultimedia,
        getMultimediaId: getMultimediaId,
        delMultimediaId: delMultimediaId,
        getAll: getAll
    };
};