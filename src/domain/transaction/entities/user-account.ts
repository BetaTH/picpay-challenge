import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserType } from '@/core/entities/user-type'

export type UserAccountProps = {
  userAccountType: UserType
  balance: number
}

export class UserAccount extends Entity<UserAccountProps> {
  getUserAccountType() {
    return this.props.userAccountType
  }

  getBalance() {
    return this.props.balance
  }

  credit(amount: number) {
    this.props.balance += amount
  }

  debit(amount: number) {
    this.props.balance -= amount
  }

  isAbleToTransfer(amount: number): boolean {
    if (this.props.userAccountType === UserType.MERCHANT) {
      return false
    }
    return this.props.balance < amount
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
