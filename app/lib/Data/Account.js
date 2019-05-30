const config = require('config');
const bcrypt = require('bcrypt');
const knex = require('knex-connection');

/**
* Creates a new account record in the database.
* @namespace Data.Account
* @method create
* @param {String} username Account name used to authenticate.
* @param {String} password Password used to authenticate.
* @param {String} email Email address for validation.
* @return {JSON|null} Record created, or NULL if it failed.
*/
async function create(username, password, email) {
    try {
        let passhash = await bcrypt.hash(password, config.bcrypt.factor);
        let result = await knex('accounts').insert({username, password: passhash, email});
        let account = await knex('accounts').where('id', result);
        return account[0];
    }
    catch(error) {
        return null;
    }
}

/**
* Gets any account that match the specified username and password.
* @namespace Data.Account
* @method authenticate
* @param {String} username Account name used to authenticate.
* @param {String} password Password used to authenticate.
* @return {JSON|null} Record loaded, or NULL if it failed.
*/
async function authenticate(username, password) {
    try {
        let account = await knex('accounts').where('username', username);
        let is_match = await bcrypt.compare(password, account[0].password);
        if(is_match) {
            return account[0];
        }
        return null;
    }
    catch(error) {
        return null;
    }
}

/**
* Gets any account that match the specified username and password.
* @namespace Data.Account
* @method findAccountById
* @param {Number} id id field for the account.
* @return {JSON|null} Record loaded, or NULL if it failed.
*/
async function findAccountById(id) {
    try {
        let account = await knex('accounts').where('id', id);
        return account[0];
    }
    catch(error) {
        return null;
    }
}

/**
* Gets any account that match the specified username and password.
* @namespace Data.Account
* @method findAccountById
* @param {Number} id id field for the account.
* @return {JSON|null} Record loaded, or NULL if it failed.
*/
async function updateName(id, username) {
    try {
        let account = await knex('accounts').update('username', username).where('id', id);
    }
    catch(error) {
        return null;
    }
}

module.exports = {
    create,
    authenticate,
    findAccountById,
    updateName,
}