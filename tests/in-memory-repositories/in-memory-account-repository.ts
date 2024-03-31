import { UserAccount } from '@/domain/transaction/entities/user-account'
import { AccountRepository } from '@/domain/transaction/repositories/account-repository'

export class InMemoryAccountRepository implements AccountRepository {
  public items: UserAccount[] = []

  async findByDocument(document: string) {
    const userAccount = this.items.find(
      (item) => item.getDocument() === document,
    )
    if (!userAccount) {
      return null
    }
    return userAccount
  }
}
