import { UserType } from '@/core/entities/user-type'
import { makeUserAccount } from 'tests/factories/make-user-account'
import { TransferUseCase } from './transfer-use-case'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAccountsRepository } from 'tests/in-memory-repositories/in-memory-accounts-repository'
import { InMemoryTransactionsRepository } from 'tests/in-memory-repositories/in-memory-trasactions-repository'
import { TestTransactionAuthorizationProvider } from 'tests/providers/test-transaction-authorization-provider'

describe('Transfer Use Case', () => {
  let accountsRepository: InMemoryAccountsRepository
  let transactionsRepository: InMemoryTransactionsRepository
  let transactionAuthorizationProvider: TestTransactionAuthorizationProvider
  let sut: TransferUseCase
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository()
    transactionAuthorizationProvider =
      new TestTransactionAuthorizationProvider()
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new TransferUseCase(
      accountsRepository,
      transactionsRepository,
      transactionAuthorizationProvider,
    )
  })

  it('should not be able to transfer if the account type is merchant', async () => {
    const accountFrom = makeUserAccount(
      {
        userAccountType: UserType.MERCHANT,
        balance: 100,
      },
      new UniqueEntityID('11111111111'),
    )
    const accountTo = makeUserAccount(
      {
        userAccountType: UserType.COMMON,
        balance: 0,
      },
      new UniqueEntityID('22222222222'),
    )

    accountsRepository.items.push(accountFrom)
    accountsRepository.items.push(accountTo)

    const result = await sut.execute({
      accountIdFrom: '11111111111',
      accountIdTo: '22222222222',
      amount: 100,
    })

    expect(result.isLeft).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to transfer if amount is bigger than balance', async () => {
    const accountFrom = makeUserAccount(
      {
        userAccountType: UserType.COMMON,
        balance: 100,
      },
      new UniqueEntityID('11111111111'),
    )
    const accountTo = makeUserAccount(
      {
        userAccountType: UserType.MERCHANT,
        balance: 0,
      },
      new UniqueEntityID('22222222222'),
    )

    accountsRepository.items.push(accountFrom)
    accountsRepository.items.push(accountTo)

    const result = await sut.execute({
      accountIdFrom: '11111111111',
      accountIdTo: '22222222222',
      amount: 200,
    })

    expect(result.isLeft).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should be able to transfer', async () => {
    const accountFrom = makeUserAccount(
      {
        userAccountType: UserType.COMMON,
        balance: 100,
      },
      new UniqueEntityID('11111111111'),
    )
    const accountTo = makeUserAccount(
      {
        userAccountType: UserType.MERCHANT,
        balance: 0,
      },
      new UniqueEntityID('22222222222'),
    )

    accountsRepository.items.push(accountFrom)
    accountsRepository.items.push(accountTo)

    expect(accountFrom.balance).toEqual(100)
    expect(accountTo.balance).toEqual(0)

    const result = await sut.execute({
      accountIdFrom: '11111111111',
      accountIdTo: '22222222222',
      amount: 100,
    })

    expect(result.isRight).toBeTruthy()
    expect(accountFrom.balance).toEqual(0)
    expect(accountTo.balance).toEqual(100)
    expect(transactionsRepository.items).toHaveLength(1)
  })
})
