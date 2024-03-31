import { UserType } from '@/core/entities/user-type'
import { makeUserAccount } from 'tests/factories/make-user-account'
import { TransferUseCase } from './transfer-use-case'
import { InMemoryAccountRepository } from 'tests/in-memory-repositories/in-memory-account-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

describe('Transfer Use Case', () => {
  let accountRepository: InMemoryAccountRepository
  let sut: TransferUseCase
  beforeEach(() => {
    accountRepository = new InMemoryAccountRepository()
    sut = new TransferUseCase(accountRepository)
  })

  it('should not be able to transfer if the account type is merchant', async () => {
    const accountFrom = makeUserAccount({
      document: '11111111111',
      userAccountType: UserType.MERCHANT,
      balance: 100,
    })
    const accountTo = makeUserAccount({
      document: '22222222222',
      userAccountType: UserType.COMMON,
      balance: 0,
    })

    accountRepository.items.push(accountFrom)
    accountRepository.items.push(accountTo)

    const result = await sut.execute({
      documentFrom: accountFrom.getDocument(),
      documentTo: accountTo.getDocument(),
      amount: 100,
    })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to transfer if amount is bigger than balance', async () => {
    const accountFrom = makeUserAccount({
      document: '11111111111',
      userAccountType: UserType.COMMON,
      balance: 100,
    })
    const accountTo = makeUserAccount({
      document: '22222222222',
      userAccountType: UserType.MERCHANT,
      balance: 0,
    })

    accountRepository.items.push(accountFrom)
    accountRepository.items.push(accountTo)

    const result = await sut.execute({
      documentFrom: accountFrom.getDocument(),
      documentTo: accountTo.getDocument(),
      amount: 200,
    })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should be able to transfer', async () => {
    const accountFrom = makeUserAccount({
      document: '11111111111',
      userAccountType: UserType.COMMON,
      balance: 100,
    })
    const accountTo = makeUserAccount({
      document: '22222222222',
      userAccountType: UserType.MERCHANT,
      balance: 0,
    })

    accountRepository.items.push(accountFrom)
    accountRepository.items.push(accountTo)

    const result = await sut.execute({
      documentFrom: accountFrom.getDocument(),
      documentTo: accountTo.getDocument(),
      amount: 100,
    })

    expect(result.isRight).toBeTruthy()
  })
})
