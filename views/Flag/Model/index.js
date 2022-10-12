exports.model = function($){
    var addFlag = function (ls, fn) {
        $.model.db.flags.insertMany(ls, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt.ops[0]);
        });
    };
    var editFlag = function (l, fn) {
        $.model.db.flags.updateOne({ _id: l._id }, { $set: l }, function (err) {
            if (err) throw err;
            $.fill(fn, l);
        });
    };
    var getFlagsAdv = function (match, sort, skip, limit, fn) {
        return $.model.db.flags.aggregate([
            { $match: match },
            { $skip: skip },
            { $sort: sort },
            { $limit: limit },
            {
                $project: {
                    id: 1,
                    name: 1,
                    image: 1,
                    parameters: 1,
                    position: 1,
                    flag: 1,
                    active: 1,
                    createdVN: { $dateToString: { format: "%H:%M %d/%m/%Y", date: '$created' } },
                    created: 1
                }
            }
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    //old
    var deleteFlag = function (_id, fn) {
        return $.model.db.flags.remove({ _id: _id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAll = function (match, project, fn) {
        return $.model.db.flags.find(match, project).sort({ date: 1 }).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getFlags = function (match, sort, skip, limit, fn) {
        return $.model.db.flags.find(match).sort(sort).skip(skip).limit(limit).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getFlag = function (match, fn) {
        return $.model.db.flags.find(match).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getFlagBy_id = function (_id, fn) {
        return $.model.db.flags.findOne({_id: _id}, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getFlagById = function(id, fn){
        return $.model.db.flags.findOne({id: id}, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    $.model.db.flags = $.dbclient.db($.config.database.name).collection("flags");
    return {
        addFlag: addFlag,
        deleteFlag: deleteFlag,
        editFlag: editFlag,
        getAll: getAll,
        getFlags: getFlags,
        getFlagsAdv: getFlagsAdv,
        getFlag: getFlag,
        getFlagBy_id: getFlagBy_id,
        getFlagById: getFlagById
    };
};