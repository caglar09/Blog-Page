const cqlModule = require('../../lib/cassandra');
let cqlClient = cqlModule.getClient();

const redis = require('../../lib/redis');
let rClient = redis.getClient();

const uuidv1 = require("uuid/v1");
const baseResult = require("../../lib/result");


exports.create = function (req, res) {
    var uid = uuidv1();
    let dt = req.body;
    let query = "Insert into kategoriler(kat_id,kat_ad,kat_adet,kat_resim) values( " + uid + ",'" + dt.kat_ad + "'," + dt.kat_adet + ",'" + dt.kat_resim + "')";
    cqlClient.execute(query).then(function (result) {
        console.log(result);
        res.send(result)
    });
    rClient.del("allcategory");
}

exports.update = function (req, res) {

    try {
        let veri = req.body;
        if (veri.kat_id) {
            let query = "Update kategoriler set kat_ad='" + veri.kat_ad + "', kat_resim='" + veri.kat_resim + "' where kat_id=" + veri.kat_id;
            cqlClient.execute(query, function (err, result) {
                let x;
                if (!err) {
                    x = new baseResult(true, null, "Başarıyla güncellendi");
                } else {
                    x = new baseResult(false, null, "hata oluştu");
                }

                res.send(x);
               
            });
        } else {
            let x = new baseResult(true, null, "Kayıt idsi boş olamaz");
            res.send(x);
        }
    } catch (ex) {
        let x = new baseResult(false, null, "hata oluştu");
        res.send(x);
    }
}

exports.list = function (req, res) {
    rClient.get("allcategory", function (err, val) {
        if (val) {
            res.send(JSON.parse(val));
            console.log("redisten gönderildi");
        } else {
            let query = "Select * from kategoriler";
            cqlClient.execute(query)
                .then(function (result) {
                    let rows = JSON.stringify(result.rows);
                    rClient.set("allcategory", rows, function (err) {
                        res.send(result.rows);
                        console.log("cassandradan geldi");
                    })
                });
        }
    })
}

exports.get = function (req, res) {
    let veri = req.headers;
    let query = "Select * from kategoriler where kat_id=" + veri.kat_id;
    cqlClient.execute(query).then(function (result) {
        res.send(result.rows);
    })

}

exports.remove = function (req, res) {
    let veri = req.body;

    if (veri.kat_id) {
        let query = "Delete from kategoriler where kat_id=" + veri.kat_id;
        cqlClient.execute(query).then(function (result) {
            res.send(result.rows);
        })
    } else {
        res.send("Kategori id boş olamaz.");
    }

}