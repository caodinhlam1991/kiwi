exports.model = function($){
    //$.model.db.bills = $.mongoose.model('bills', new $.mongoose.Schema({
    //    billId: String,
    //    billType: String,
    //    promotionVal: String,
    //    promotionType: String,
    //    products: Object,
    //    userid: $.mongoose.Schema.ObjectId,
    //    pid: $.mongoose.Schema.ObjectId,
    //    date: Date
    //}));
    $.model.db.bills = $.dbclient.db($.config.database.name).collection("bills");
    var addBill = function(c, fn){
        c = new $.model.db.carts(c);
        c.save(function(err){
            if(err)
                return err;
            $.fill(fn, c);
        });
        return c;
    };
    var editBill = function (b, fn) {
        return $.model.db.carts.update({ _id: b._id }, b, { new: false }, function (err, dt) {
            $.fill(fn, dt);
        });
    };
    var getAll = function (match, project, fn) {
        return $.model.db.carts.aggregate([
            {$match: match},
            {$sort: {position: 1}},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getBillId = function (billId, fn) {
        return $.model.db.carts.findOne({ billId: billId }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getBillsOpts = function (match, sort, project, fn) {
        return $.model.db.carts.aggregate([
            {$match: match},
            {$sort: sort},
            {$lookup: {
                localField: 'userid',
                from: 'users',
                foreignField: '_id',
                as: 'user'
            }},
            {$unwind: '$user'},
            {$lookup: {
                localField: 'pid',
                from: 'users',
                foreignField: '_id',
                as: 'customer'
            }},
            {$unwind: '$customer'},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getBillsImport = function (match, sort, project, fn) {
        return $.model.db.carts.aggregate([
            {$match: match},
            {$sort: sort},
            {$lookup: {
                localField: 'userid',
                from: 'users',
                foreignField: '_id',
                as: 'user'
            }},
            {$unwind: '$user'},
            {$lookup: {
                localField: 'pid',
                from: 'contents',
                foreignField: '_id',
                as: 'customer'
            }},
            {$unwind: '$customer'},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getBillPages = function (match, sort, skip, limit, project, fn) {
        return $.model.db.carts.aggregate([
            {$match: match},
            {$sort: sort},
            {$skip: skip},
            {$limit: limit},
            {$lookup: {
                localField: 'params.teacher.detail',
                from: 'users',
                foreignField: 'email',
                as: 'user'
            }},
            {$unwind: '$user'},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    return {
        addBill: addBill,
        editBill: editBill,
        getAll: getAll,
        getBillId: getBillId,
        getBillsOpts: getBillsOpts,
        getBillPages: getBillPages,
        getBillsImport: getBillsImport
    };
};