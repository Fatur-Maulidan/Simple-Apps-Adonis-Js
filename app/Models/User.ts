import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  public static table = 'blog'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public text: string
}
