import { randomUUID } from 'node:crypto'

export class User {
  public id: string
  public name: string
  public createdAt: Date
  public updatedAt: Date
  constructor(name: string, id?: string, createdAt?: Date, updatedAt?: Date) {
    this.name = name
    this.id = id ?? randomUUID()
    this.createdAt = createdAt ?? new Date()
    this.updatedAt = updatedAt ?? new Date()
  }
}
