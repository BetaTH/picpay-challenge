import { UserAccount } from '../entities/user-account'

export interface AccountsRepository {
  findById(id: string): Promise<UserAccount | null>
}
