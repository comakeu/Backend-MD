const db = require('../database/dbConfig')

function get(id){
    return db('users as u')
    .where('u.user_id', id)
    .first()
}

function update(id, changes) {
    return db('users as u')
    .where('u.user_id', id)
    .update(changes)
    .then(flag => {
        if(flag) return this.get(id)
    })
}

function remove(id) {
    return db('users as u')
    .where('u.user_id', id)
    .del()
}

module.exports = {
    get,
    update,
    remove,
}