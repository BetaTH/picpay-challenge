import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserType } from '@/core/entities/user-type'

export type UserProps = {
  firstName: string
  lastName: string
  userType: UserType
  email: string
  document: string
}

export class UserAccount extends Entity<UserProps> {
  static create(props: UserProps, id?: UniqueEntityID) {
    const account = new UserAccount(
      {
        ...props,
      },
      id,
    )
    return account
  }
}
