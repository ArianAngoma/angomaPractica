const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, conecction) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASSE HAS TO MANY CONNECTIONS');
        }
        
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABSE CONNECTION WAS REFUSED');
        }
    }

    if (conecction) conecction.release();
    console.log('DB is Connected');
    return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;
