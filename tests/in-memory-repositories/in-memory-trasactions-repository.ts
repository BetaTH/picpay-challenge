import { Transaction } from '@/domain/transaction/entities/transaction'
import { TransactionsRepository } from '@/domain/transaction/repositories/transactions-repository'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = []

  async create(transaction: Transaction) {
    this.items.push(transaction)
  }
}
