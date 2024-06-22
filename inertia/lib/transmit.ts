import { Transmit } from '@adonisjs/transmit-client'

let transmit: Transmit | null = null

export function getTransmit() {
  // Don'tt create transmit client if we are serverside rendering
  if (!window) return null

  if (!transmit) {
    transmit = new Transmit({
      baseUrl: window.location.origin,
    })
  }

  return transmit
}
