import { Either, left, right } from '@/core/either'
import { AccountsRepository } from '../repositories/accounts-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UserType } from '@/core/entities/user-type'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { TransactionsRepository } from '../repositories/transactions-repository'
import { TransferService } from '../services/transferService'
import { UnitOfWork } from '@/core/unit-of-work/unit-of-work'

type TransferUseCaseRequest = {
  accountIdFrom: string
  accountIdTo: string
  amount: number
}

type TransferUseCaseResponse = Either<
  ResourceNotFoundError,
  Record<string, never>
>

export class TransferUseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private transactionsRepository: TransactionsRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute({
    accountIdFrom,
    accountIdTo,
    amount,
  }: TransferUseCaseRequest): Promise<TransferUseCaseResponse> {
    const accountFrom = await this.accountsRepository.findById(accountIdFrom)

    if (!accountFrom) {
      return left(new ResourceNotFoundError())
    }

    if (accountFrom.getUserAccountType() === UserType.MERCHANT) {
      return left(new NotAllowedError())
    }

    if (accountFrom.getBalance() < amount) {
      return left(new NotAllowedError())
    }

    const accountTo = await this.accountsRepository.findById(accountIdTo)

    if (!accountTo) {
      return left(new ResourceNotFoundError())
    }

    const transferService = new TransferService()
    const { transaction } = transferService.transfer(
      accountFrom,
      accountTo,
      amount,
    )

    await this.unitOfWork.runInTransaction(async () => {
      await this.accountsRepository.save(accountFrom)
      await this.accountsRepository.save(accountTo)
      await this.transactionsRepository.create(transaction)
    })

    return right({})
  }
}
