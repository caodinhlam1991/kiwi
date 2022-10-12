exports.model = function($){
    var addCoin = function(c, fn){
        $.model.db.watts.insertOne(c, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt.ops[0]);
        });
    };
    var getCoinsPeopleId = function (id, fn) {
        $.model.db.watts.findOne({ wid: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getCoins = function (match, sort, skip, limit, fn) {
        $.model.db.watts.aggregate([
            {$match: match},
            {$sort: sort},
            {$skip: skip},
            {$limit: limit},
            {$lookup: {
                localField: 'wid',
                from: 'users',
                foreignField: '_id',
                as: 'user'
            }},
            {$unwind: '$user'},
            {$project: {
                user: 1,
                coin: 1,
            }}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var editCoin = function (c, fn) {
        $.model.db.watts.updateOne({ _id: c._id }, { $set: c }, function (err, res) {
            if (err) throw err;
            $.fill(fn, c);
        });
    };
    var delCoinById = function (id, fn) {
        $.model.db.watts.remove({ _id: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    //old
    var getCoinId = function (id, fn) {
        return $.model.db.watts.findOne({ _id: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAll = function (match, sort, project, fn) {
        return $.model.db.watts.aggregate([
            {$match: match},
            {$sort: sort},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAllAdv = function (match, sort, project, fn) {
        return $.model.db.watts.aggregate([
            {$match: match},
            {$sort: sort},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    $.model.db.watts = $.dbclient.db($.config.database.name).collection("watts");
    return {
        addCoin: addCoin,
        getCoinsPeopleId: getCoinsPeopleId,
        editCoin: editCoin,
        getCoinId: getCoinId,
        getAll: getAll,
        getAllAdv: getAllAdv,
        getCoins: getCoins,
        delCoinById: delCoinById
    };
};