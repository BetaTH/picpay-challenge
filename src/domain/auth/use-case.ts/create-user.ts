import { Either, left, right } from '@/core/either'
import { UsersRepository } from '../repositories/users-repositories'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { User } from '../entities/user'
import { UserType } from '@/core/entities/user-type'
import { HashProvider } from '../cryptography/hash-provider'

type RegisterUserUseCaseRequest = {
  firstName: string
  lastName: string
  document: string
  email: string
  password: string
  merchant?: boolean
}

type RegisterUserUseCaseResponse = Either<ResourceNotFoundError, { user: User }>

export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider,
  ) {}

  async execute({
    firstName,
    lastName,
    document,
    email,
    password,
    merchant,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userByEmail = await this.usersRepository.findByEmail(email)

    if (!userByEmail) {
      return left(new NotAllowedError())
    }
    const userByDocument = await this.usersRepository.findByDocument(document)

    if (!userByDocument) {
      return left(new NotAllowedError())
    }

    const passwordHash = await this.hashProvider.generateHash(password)

    const user = User.create({
      firstName,
      lastName,
      document,
      email,
      passwordHash,
      userType: merchant ? UserType.MERCHANT : UserType.COMMON,
    })

    await this.usersRepository.create(user)

    return right({ user })
  }
}
