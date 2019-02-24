'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transaction extends Model {
    static get table(){
        return 'profiles'
    }
    static get primaryKey(){
        return 'id'
    }
    user(){
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Transaction
