import { User } from '../entities/user'

export interface UsersRepository {
  findByEmail(email: string): Promise<User>
  findByDocument(document: string): Promise<User>
  create(user: User): Promise<void>
  save(user: User): Promise<void>
}
