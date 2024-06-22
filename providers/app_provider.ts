import type { ApplicationService } from '@adonisjs/core/types'
import transmit from '@adonisjs/transmit/services/main'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * The application has been booted
   */
  async start() {
    let counter = 0

    setInterval(() => {
      counter++
      transmit.broadcast('global', `Hallo ${counter}`)
    }, 1000)
  }
}
