import { AppError } from './app-error'

export class UserAlreadyExistsError extends AppError {
  constructor(message = 'User already exists') {
    super(message, 409)
  }
}
