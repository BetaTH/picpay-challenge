import { UserAccount } from '@/domain/transaction/entities/user-account'
import { TransactionAuthorizationProvider } from '@/domain/transaction/providers/transaction-authorization-provider'

export class TestTransactionAuthorizationProvider
  implements TransactionAuthorizationProvider
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async isAuthorizedToTransfer(from: UserAccount, to: UserAccount) {
    return true
  }
}
