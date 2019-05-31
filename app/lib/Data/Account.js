const config = require('config');
const bcrypt = require('bcrypt');
const knex = require('knex-connection');

async function GetAccount(params) {
    let result = await knex('accounts').where(params).first();
    return result;
}

async function CountAccount(params) {
    let result = await knex('accounts').count('id as count').where(params).first();
    return result.count;
}

async function CreateHash(password) {
    return bcrypt.hash(password, config.bcrypt.factor);
}


async function CreateAccount(account) {
    let id = await knex('accounts').insert(account);
    return id;
}

async function Register(username, password, confirm, email) {
    let result = {
        success: false,
        message: '',
        account: null
    };

    let account = {
        username: username,
        password: null,
        email: email
    };

    try {
        if(password != confirm) {
            result.message = 'Password Confirm does not match password.';
        }
        else {
            let count = await CountAccount({username: account.username});
            if(count >= 1) {
                result.message = "Username already exists."
            }
            else {
                account.password = await CreateHash(password)
                let newid = await CreateAccount(account);
                result.account = await GetAccount({id: newid});
                result.success = true;
            }
        }
    }
    catch(error) {
        console.log("Error occured during register:", error);
        result.message = 'An error has occured while processing the request.';
    }

    return result;
}

async function Authenticate(username, password) {
    let result = {
        success: false,
        message: 'Invalid username or Password.',
        account: null
    };
    
    try {
        result.account = await GetAccount({username: username});
        if(result.account != null) {
            result.success = await bcrypt.compare(password, result.account.password);
            if(!result.success) {
                result.account = null;
            }
        }
    }
    catch(error) {
        result.message = 'An error has occured while processing the request.';
    }

    return result;
}

async function FindById(id) {
    try {
        let account = await GetAccount({id: id});
        return account;
    }
    catch(error) {
        return null;
    }
}

module.exports = {
    Authenticate,
    Register,
    FindById,
}