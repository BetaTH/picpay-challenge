import { UserAccount } from '../entities/user-account'

export class TransferService {
  transfer(accountFrom: UserAccount, accountTo: UserAccount, amount: number) {
    accountFrom.debit(amount)
    accountTo.credit(amount)
  }
}
