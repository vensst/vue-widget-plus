import { onBeforeUnmount } from 'vue'

export function useResizeObserver(
  target: () => HTMLElement | undefined,
  callback: () => void
) {
  let observer: ResizeObserver | null = null

  const observe = () => {
    const el = target()
    if (!el) return

    observer = new ResizeObserver(() => {
      callback()
    })

    observer.observe(el)
  }

  const disconnect = () => {
    observer?.disconnect()
    observer = null
  }

  onBeforeUnmount(disconnect)

  return {
    observe,
    disconnect
  }
}
