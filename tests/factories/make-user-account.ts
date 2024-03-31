import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  UserAccount,
  UserAccountProps,
} from '@/domain/transaction/entities/user-account'
import { UserType } from '@/core/entities/user-type'

export function makeUserAccount(
  override: Partial<UserAccountProps> = {},
  id?: UniqueEntityID,
) {
  const answer = UserAccount.create(
    {
      document: faker.lorem.sentence({ min: 12, max: 12 }),
      balance: faker.number.int({ min: 100, max: 10000 }),
      userAccountType: UserType.COMMON,
      ...override,
    },
    id,
  )

  return answer
}
