import { AppError } from '../errors/appError.js'

export async function getGeneratedCvAvatarPlaceholder(): Promise<never> {
  throw new AppError('La photo du CV généré n’est pas encore disponible.', 501)
}
