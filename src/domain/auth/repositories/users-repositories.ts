import { User } from '../entities/user'

export interface UsersRepository {
  findByEmailOrDocument(email: string, document: string): Promise<User | null>
  create(user: User): Promise<void>
  save(user: User): Promise<void>
}
