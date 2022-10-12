exports.model = function($){
    var addCart = function(c, fn){
        $.model.db.carts.insertOne(c, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt.ops[0]);
        });
    };
    var delCart = function (_id, fn) {
        $.model.db.carts.remove({ _id: _id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var changeLive = function (id, live, fn) {
        $.model.db.carts.updateOne({ _id: id }, { $set: { live: live } }, function (err, res) {
            if (err) throw err;
            $.fill(fn, id);
        });
    };
    var getCarts = function (match, sort, skip, limit, fn) {
        $.model.db.carts.aggregate([
            {$match: match},
            {$sort: sort},
            {$skip: skip},
            {$limit: limit},
            {$lookup: {
                localField: 'userid',
                from: 'users',
                foreignField: '_id',
                as: 'user'
            }},
            {$unwind: '$user'},
            {$lookup: {
                localField: '_id',
                from: 'products',
                foreignField: 'cartid',
                as: 'product'
            }},
            {$unwind: '$product'},
            {$lookup: {
                localField: 'product.contentid',
                from: 'contents',
                foreignField: '_id',
                as: 'content'
            }},
            {$unwind: '$content'},
            {$project: {
                user: 1,
                product: 1,
                content: 1,
                params: 1,
                live: 1,
                date: 1,
                dateVN: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}}
            }}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    //old
    var editCart = function (c, fn) {
        return $.model.db.carts.update({ _id: c._id }, c, { new: false }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getCartId = function (id, fn) {
        return $.model.db.carts.findOne({ _id: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAll = function (match, sort, project, fn) {
        return $.model.db.carts.aggregate([
            {$match: match},
            {$sort: sort},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAllAdv = function (match, sort, project, fn) {
        return $.model.db.carts.aggregate([
            {$match: match},
            {$sort: sort},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    $.model.db.carts = $.dbclient.db($.config.database.name).collection("carts");
    return {
        addCart: addCart,
        delCart: delCart,
        changeLive: changeLive,
        editCart: editCart,
        getCartId: getCartId,
        getAll: getAll,
        getAllAdv: getAllAdv,
        getCarts: getCarts
    };
};