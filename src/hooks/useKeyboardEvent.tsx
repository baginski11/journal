import { useEffect } from 'react'

type Handler = () => void
type Action = 'keydown' | 'keyup' | 'keypress'

export const useKeyboardEvent = (
  action: Action,
  key: KeyboardEvent['key'],
  handler: Handler
) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler()
      }
    }

    document.addEventListener(action, handleKeyPress)

    return () => {
      document.removeEventListener(action, handleKeyPress)
    }
  }, [action, key, handler])
}
