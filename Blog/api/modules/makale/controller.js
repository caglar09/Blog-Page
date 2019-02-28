const cqlModule = require('../../lib/cassandra');
let cqlClient = cqlModule.getClient();

const redis = require('../../lib/redis');
let rClient = redis.getClient();

const uuidv1 = require("uuid/v1");
const baseResult = require("../../lib/result");


exports.create = function (req, res) {
    var uid = uuidv1();
    let dt = req.body;
    if (dt.kat_id && dt.baslik &&dt.ozet &&dt.icerik) {
        let query = "Insert into makale(makale_id,baslik,begenme_sayisi,eklenme_tarihi,icerik,kat_id,ozet,resim) values( " + uid + ",'" + dt.baslik + "'," + dt.begenme_sayisi + "," + (new Date().getDate()) + ",'" + dt.icerik + "'," + dt.kat_id + ",'" + dt.ozet + "','" + dt.resim + "')";
        cqlClient.execute(query).then(function (result) {
            console.log(result);
            res.send(result)
        });
    }
    rClient.del("allcategory");


}

exports.update = function (req, res) {

   
        let veri = req.body;
        if (veri.kat_id) {
            let query = "Update makale set baslik='" + veri.baslik + "', begenme_sayisi=" + veri.begenme_sayisi + ", icerik='"+veri.icerik+"',kat_id="+veri.kat_id+",ozet='"+veri.ozet+"',resim='"+veri.resim+"' where makale_id=" + veri.makale_id;
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
    // try { } catch (ex) {
    //     let x = new baseResult(false, null, "hata oluştu");
    //     res.send(x);
    // }
}

exports.list = function (req, res) {
    rClient.get("allmakale", function (err, val) {
        if (val) {
            res.send(JSON.parse(val));
            console.log("redisten gönderildi");
        } else {
            let query = "Select * from makale";
            cqlClient.execute(query)
                .then(function (result) {
                    let rows = JSON.stringify(result.rows);
                    rClient.set("allmakale", rows, function (err) {
                        res.send(result.rows);
                        console.log("cassandradan geldi");
                    })
                });
        }
    })
}

exports.get = function (req, res) {
    let veri = req.headers;
    let query = "Select * from makale where kat_id=" + veri.id;
    cqlClient.execute(query).then(function (result) {
        res.send(result.rows);
    })

}

exports.remove = function (req, res) {
    let veri = req.body;

    if (veri.kat_id) {
        let query = "Delete from makale where kat_id=" + veri.kat_id;
        cqlClient.execute(query).then(function (result) {
            res.send(result.rows);
        })
    } else {
        res.send("Kategori id boş olamaz.");
    }

}