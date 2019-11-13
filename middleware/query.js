const connection = require('../db/db')

let query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (error, data) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    })
}

module.exports = () => {
    return async (ctx, next) => {
        ctx.mysql = {};
        ctx.mysql.query = query;
        await next();
    }
}