const config = require('config');
const knex = require('knex-connection');
const Account = require('Data/Account');

/**
* Creates a new account record in the database.
* @namespace Data.Account
* @method create
* @param {String} username Account name used to authenticate.
* @return {JSON|null} Record created, or NULL if it failed.
*/
async function createPlatformId(platform, external_id) {
    let account_id = await knex('accounts').insert({username: "Unnammed"});
    if(account_id < 1) {
        return null;
    }
    console.log("Creating user:", external_id)
    let platform_user_id = await knex('platform_users').insert({platform, external_id, account_id});
    return await Account.findAccountById(account_id);
}

/**
* Gets any account that match the specified username and password.
* @namespace Data.Account
* @method authenticate
* @param {String} username Account name used to authenticate.
* @param {String} password Password used to authenticate.
* @return {JSON|null} Record loaded, or NULL if it failed.
*/
async function findAccountByPlatformId(platform, external_id) {
    try {
        let platform_user = await knex('platform_users').where('external_id', external_id).andWhere('platform', platform);
        let account_id = platform_user[0].account_id;
        if(account_id > 0) {
            return await Account.findAccountById(account_id);
        }
        return null;
    }
    catch(error) {
        return null;
    }
}

module.exports = {
    createPlatformId,
    findAccountByPlatformId,
}