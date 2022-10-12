exports.model = function($){
    $.model.db.powers = client.db($.config.database.name).collection("powers");
    var addPower = function(power, fn){
        power = new $.model.db.powers(power);
        power.save(function (error, dt) {
            $.fill(fn, dt);
        });
    };
};