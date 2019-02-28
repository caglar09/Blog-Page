var redis = require("redis");

var options = {
    host: '127.0.0.1',
    port: '6379',
    db: 9
}

let client = redis.createClient(options);

exports.getClient=function(){
    return client;
}