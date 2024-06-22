import { Head } from '@inertiajs/react'
import { getTransmit } from '../lib/transmit'
import { useEffect, useState } from 'react'
import { Transmit } from '@adonisjs/transmit-client'

export default function Home(props: { version: number }) {
  // state for last received message
  const [lastMessage, setLastMessage] = useState<string | null>(null)

  // Handle global subscription
  async function handleGlobalSubscription(transmit: Transmit | null) {
    if (!transmit) return

    const global_subscription = transmit.subscription('global')

    await global_subscription.create()

    global_subscription.onMessage((message: string) => {
      setLastMessage(message)
    })
  }

  useEffect(() => {
    // Connect
    const transmit = getTransmit()

    handleGlobalSubscription(transmit)

    // Cleanup
    return () => {
      transmit && transmit.close()
    }
  }, [])

  return (
    <>
      <Head title="Homepage" />

      <div className="container">
        <div className="title">AdonisJS {props.version} x Inertia x React</div>

        <span>
          Learn more about AdonisJS and Inertia.js by visiting the{' '}
          <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
        </span>

        <span>Last message: {lastMessage ?? 'None received'}</span>
      </div>
    </>
  )
}
