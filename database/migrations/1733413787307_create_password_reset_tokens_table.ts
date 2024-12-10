import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'password_reset_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table
        .uuid('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table.string('value').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('expired_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
