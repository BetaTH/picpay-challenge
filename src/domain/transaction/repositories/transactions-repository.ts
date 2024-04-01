import { Transaction } from '../entities/transaction'

export interface TransactionsRepository {
  create(transaction: Transaction): Promise<void>
}
