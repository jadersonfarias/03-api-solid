import { usersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-exists-not-found'
interface GetUserProfileUseCaseRequest {
  userId: string
}
interface GetUserProfileUseCaseResponse {
  user: User
}
export class GetUserProfileUseCase {
  constructor(private usersRepository: usersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
