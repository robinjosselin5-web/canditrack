import { describe, expect, it, vi } from 'vitest'
import { asyncHandler } from './asyncHandler.js'

describe('asyncHandler', () => {
  it('forwards a resolved async handler without calling next', async () => {
    const handler = vi.fn(async () => undefined)
    const next = vi.fn()

    const wrapped = asyncHandler(handler)

    await wrapped({} as never, {} as never, next)

    expect(handler).toHaveBeenCalledTimes(1)
    expect(next).not.toHaveBeenCalled()
  })

  it('forwards a rejected async handler to next', async () => {
    const error = new Error('boom')
    const handler = vi.fn(async () => {
      throw error
    })
    const next = vi.fn()

    const wrapped = asyncHandler(handler)

    await wrapped({} as never, {} as never, next)

    expect(handler).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(error)
  })
})
