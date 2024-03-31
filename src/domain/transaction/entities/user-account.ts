import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserType } from '@/core/entities/user-type'

export type UserAccountProps = {
  document: string
  userAccountType: UserType
  balance: number
}

export class UserAccount extends Entity<UserAccountProps> {
  getDocument() {
    return this.props.document
  }

  getUserAccountType() {
    return this.props.userAccountType
  }

  getBalance() {
    return this.props.balance
  }

  credit(value: number) {
    this.props.balance += value
  }

  debit(value: number) {
    this.props.balance -= value
  }

  static create(props: UserAccountProps, id?: UniqueEntityID) {
    const account = new UserAccount(
      {
        ...props,
      },
      id,
    )
    return account
  }
}
