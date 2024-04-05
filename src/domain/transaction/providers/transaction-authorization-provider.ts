import { UserAccount } from '../entities/user-account'

export abstract class TransactionAuthorizationProvider {
  abstract isAuthorizedToTransfer(
    from: UserAccount,
    to: UserAccount,
  ): Promise<boolean>
}
