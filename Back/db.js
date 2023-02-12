const {Pool}=require("pg");
const {db}= require('./confi');

const pool = new Pool ({
    host:db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database,
});
    
module.exports = pool;