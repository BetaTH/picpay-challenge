import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserType } from '@/core/entities/user-type'
import { HashProvider } from '../providers/hash-provider'

export type UserProps = {
  firstName: string
  lastName: string
  email: string
  document: string
  userType: UserType
  passwordHash: string
}

export class User extends Entity<UserProps> {
  get firstName() {
    return this.props.firstName
  }

  get lastName() {
    return this.props.lastName
  }

  get email() {
    return this.props.email
  }

  get document() {
    return this.props.document
  }

  get userType() {
    return this.props.userType
  }

  async comparePassword(hashProvider: HashProvider, password: string) {
    return await hashProvider.compareHash(this.props.passwordHash, password)
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
      },
      id,
    )
    return user
  }
}
