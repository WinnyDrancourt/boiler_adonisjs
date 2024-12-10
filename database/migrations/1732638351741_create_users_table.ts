import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.string('username', 25).nullable().unique()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()

      table.json('avatar').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
