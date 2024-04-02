import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Entity } from '@/core/entities/entity'

export type TransactionProps = {
  accountIdFrom: UniqueEntityID
  accountIdTo: UniqueEntityID
  amount: number
  createdAt: Date
}

export class Transaction extends Entity<TransactionProps> {
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
    return transaction
  }
}
