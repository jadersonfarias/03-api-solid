import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-exists-not-found'
import { CheckIn } from '@prisma/client'
import { LateCheckInValidationError } from './erros/late-check-in-validation-error'
import dayjs from 'dayjs'
interface ValidateCheckInUseCaseRequest {
  checkInId: string
}
interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}
export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}
  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }
    checkIn.validated_at = new Date()
    await this.checkInsRepository.save(checkIn)

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )
    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    return {
      checkIn,
    }
  }
}
