import { UserAccount } from '@/domain/transaction/entities/user-account'
import { AccountsRepository } from '@/domain/transaction/repositories/accounts-repository'

export class InMemoryAccountsRepository implements AccountsRepository {
  public items: UserAccount[] = []

  async findById(id: string) {
    const userAccount = this.items.find((item) => item.id.toString() === id)
    if (!userAccount) {
      return null
    }
    return userAccount
  }

  async save(account: UserAccount) {
    const itemIdx = this.items.findIndex((item) => item.id === account.id)
    this.items[itemIdx] = account
  }
}
