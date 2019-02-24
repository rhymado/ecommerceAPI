'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments('id')
      table.string('username').references('username').inTable('users').notNullable().unique()
      table.string('profile_name').notNullable()
      table.string('image')
      table.string('address').notNullable()
      table.integer('postal_code').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
