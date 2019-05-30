const bcrypt = require('bcrypt');
const config = require('config');

exports.seed = function(knex, Promise) {

  let username = 'Developer'
  let password = 'Developer'
  console.log('Creating \'{0}\' account with password {0}', username, password);

  return bcrypt.hash(password, config.bcrypt.factor)
    .then(function(hash) {
        return knex('accounts').insert([{username: username, password: hash, email: "kaine.adams@pirion.net"}]);
    });
    
}