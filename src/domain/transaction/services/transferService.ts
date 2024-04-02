import { Transaction } from '../entities/transaction'
import { UserAccount } from '../entities/user-account'

export class TransferService {
  transfer(accountFrom: UserAccount, accountTo: UserAccount, amount: number) {
    accountFrom.debit(amount)
    accountTo.credit(amount)
    const transaction = Transaction.create({
      accountIdFrom: accountFrom.id,
      accountIdTo: accountTo.id,
      amount,
    })
    return { transaction }
  }
}
