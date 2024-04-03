import { User } from '../entities/user'

export interface UsersRepository {
  findById(id: string): Promise<User>
  findByEmail(email: string): Promise<User>
  findByDocument(document: string): Promise<User>
  create(user: User): Promise<void>
  save(user: User): Promise<void>
}
