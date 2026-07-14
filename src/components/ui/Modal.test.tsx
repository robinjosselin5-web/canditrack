// @vitest-environment jsdom
import { useState, type ReactElement } from 'react'
import { act } from 'react-dom/test-utils'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Modal } from './Modal'

let root: Root | null = null

afterEach(() => {
  act(() => {
    root?.unmount()
  })
  root = null
  document.body.innerHTML = ''
})

function render(ui: ReactElement): void {
  const container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)

  act(() => {
    root?.render(ui)
  })
}

function dispatchTab(shiftKey = false): void {
  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      bubbles: true,
      key: 'Tab',
      shiftKey,
    }),
  )
}

function dispatchEscape(): void {
  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      bubbles: true,
      key: 'Escape',
    }),
  )
}

function TestHarness() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(true)} type="button">
        Ouvrir
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Premiere modale">
        <button type="button">Premier champ</button>
        <button type="button">Second champ</button>
      </Modal>
    </div>
  )
}

describe('Modal', () => {
  it('generates unique labelled dialogs for each instance', () => {
    render(
      <div>
        <Modal isOpen onClose={vi.fn()} title="Premiere">
          <span>Contenu A</span>
        </Modal>
        <Modal isOpen onClose={vi.fn()} title="Deuxieme">
          <span>Contenu B</span>
        </Modal>
      </div>,
    )

    const dialogs = Array.from(
      document.querySelectorAll<HTMLElement>('[role="dialog"]'),
    )

    expect(dialogs).toHaveLength(2)
    const labelledByIds = dialogs.map((dialog) =>
      dialog.getAttribute('aria-labelledby'),
    )
    expect(labelledByIds[0]).not.toBe(labelledByIds[1])
    expect(labelledByIds.every((id) => id)).toBe(true)
  })

  it('traps focus and restores it when the modal closes', async () => {
    render(<TestHarness />)

    const opener = document.querySelector<HTMLButtonElement>('button')
    expect(opener).not.toBeNull()

    opener?.focus()

    await act(async () => {
      opener?.click()
      await Promise.resolve()
    })

    const modal = document.querySelector<HTMLElement>('[role="dialog"]')
    const closeButton = modal?.querySelector<HTMLButtonElement>('button[aria-label="Fermer"]')
    const firstField = modal?.querySelector<HTMLButtonElement>('button:not([aria-label])')
    const secondField = modal?.querySelectorAll<HTMLButtonElement>('button:not([aria-label])')[1]

    expect(document.activeElement).toBe(closeButton)

    await act(async () => {
      dispatchTab()
    })
    expect(document.activeElement).toBe(firstField)

    await act(async () => {
      dispatchTab()
    })
    expect(document.activeElement).toBe(secondField)

    await act(async () => {
      dispatchTab()
    })
    expect(document.activeElement).toBe(closeButton)

    await act(async () => {
      dispatchTab(true)
    })
    expect(document.activeElement).toBe(secondField)

    await act(async () => {
      closeButton?.click()
    })

    expect(document.activeElement).toBe(opener)
  })

  it('closes on Escape and keeps the close behavior delegated to the consumer', async () => {
    const onClose = vi.fn()

    render(
      <Modal isOpen onClose={onClose} title="Escape">
        <span>Contenu</span>
      </Modal>,
    )

    await act(async () => {
      dispatchEscape()
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
