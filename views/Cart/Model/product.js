exports.model = function($){
    var addProduct = function(p, fn){
        $.model.db.products.insertOne(p, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt.ops[0]);
        });
    };
    var addProducts = function(ps, fn){
        $.model.db.products.insertMany(ps, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt.ops[0]);
        });
    };
    var delProduct = function (_id, fn) {
        $.model.db.products.remove({ _id: _id }, function (err, dt) {
            $.fill(fn, dt);
        });
    };
    var delProByCartid = function (_id, fn) {
        $.model.db.products.remove({ cartid: _id }, function (err, dt) {
            $.fill(fn, dt);
        });
    };
    //old
    var changeLive = function (id, live, fn) {
        return $.model.db.products.update({ _id: id }, { live: live }, { new: false }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var editProduct = function (c, fn) {
        return $.model.db.products.update({ _id: c._id }, c, { new: false }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var editProductByIds = function (c, fn) {
        return $.model.db.products.update({ cartid: c.cartid, contentid: c.contentid }, c, { new: false }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getProductId = function (id, fn) {
        return $.model.db.products.findOne({ _id: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getProductByIds = function (cartid, contentid, fn) {
        return $.model.db.products.findOne({ cartid: cartid, contentid: contentid }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAll = function (match, sort, project, fn) {
        return $.model.db.products.aggregate([
            {$match: match},
            {$sort: sort},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAllAdv = function (match, sort, project, fn) {
        return $.model.db.products.aggregate([
            {$match: match},
            {$sort: sort},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAllRef = function (match, sort, project, fn) {
        return $.model.db.products.aggregate([
            {$match: match},
            {$sort: sort},
            {$lookup: {
                localField: 'contentid',
                from: 'contents',
                foreignField: '_id',
                as: 'content'
            }},
            {$unwind: '$content'},
            {$project: {
                cartid: 1,
                content: 1,
                number: 1
            }}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAllRef2 = function (match, sort, project, fn) {
        return $.model.db.products.aggregate([
            {$match: match},
            {$sort: sort},
            {$lookup: {
                localField: 'contentid',
                from: 'files',
                foreignField: '_id',
                as: 'file'
            }},
            {$unwind: '$file'},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getProducts = function (match, sort, skip, limit, fn) {
        return $.model.db.products.aggregate([
            {$match: match},
            {$sort: sort},
            {$skip: skip},
            {$limit: limit},
            {$lookup: {
                localField: 'cartid',
                from: 'carts',
                foreignField: '_id',
                as: 'cart'
            }},
            {$unwind: '$cart'},
            {$project: {
                cart: 1,
                params: 1,
                live: 1,
                date: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}}
            }}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    $.model.db.products = $.dbclient.db($.config.database.name).collection("products");
    return {
        addProduct: addProduct,
        addProducts: addProducts,
        delProduct: delProduct,
        delProByCartid: delProByCartid,
        changeLive: changeLive,
        editProduct: editProduct,
        editProductByIds: editProductByIds,
        getProductId: getProductId,
        getProductByIds: getProductByIds,
        getAll: getAll,
        getAllAdv: getAllAdv,
        getAllRef: getAllRef,
        getAllRef2: getAllRef2,
        getProducts: getProducts
    };
};