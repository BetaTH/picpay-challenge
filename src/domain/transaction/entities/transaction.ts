import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { UserAccount } from './user-account'
import { AggregateRoot } from '@/core/entities/aggregate-root'

export type TransactionProps = {
  accountFrom: UserAccount
  accountTo: UserAccount
  amount: number
  createdAt: Date
}

export class Transaction extends AggregateRoot<TransactionProps> {
  private makeTransaction() {
    this.props.accountFrom.debit(this.props.amount)
    this.props.accountTo.credit(this.props.amount)
  }

  static create(
    props: Optional<TransactionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const transaction = new Transaction(
      {
        ...props,
        createdAt: props.createdAt || new Date(),
      },
      id,
    )
    transaction.makeTransaction()
    return transaction
  }
}
