import { Either, left, right } from '@/core/either'
import { AccountRepository } from '../repositories/account-repository'
import { TransferService } from '../services/transferService'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UserType } from '@/core/entities/user-type'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

type TransferUseCaseRequest = {
  documentFrom: string
  documentTo: string
  amount: number
}

type TransferUseCaseResponse = Either<
  ResourceNotFoundError,
  Record<string, never>
>

export class TransferUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({
    documentFrom,
    documentTo,
    amount,
  }: TransferUseCaseRequest): Promise<TransferUseCaseResponse> {
    const accountFrom =
      await this.accountRepository.findByDocument(documentFrom)

    if (!accountFrom) {
      return left(new ResourceNotFoundError())
    }

    if (accountFrom.getUserAccountType() === UserType.MERCHANT) {
      return left(new NotAllowedError())
    }

    if (accountFrom.getBalance() < amount) {
      return left(new NotAllowedError())
    }

    const accountTo = await this.accountRepository.findByDocument(documentTo)

    if (!accountTo) {
      return left(new ResourceNotFoundError())
    }

    const transferService = new TransferService()
    transferService.transfer(accountFrom, accountTo, amount)

    return right({})
  }
}
