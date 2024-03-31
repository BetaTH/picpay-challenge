import { UserAccount } from '../entities/user-account'

export interface AccountRepository {
  findByDocument(document: string): Promise<UserAccount | null>
}
