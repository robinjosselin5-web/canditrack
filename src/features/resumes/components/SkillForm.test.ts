import { AxiosError } from 'axios'
import { describe, expect, it, vi } from 'vitest'
import {
  applySkillFormBackendErrors,
  getDeleteSkillErrorMessage,
  getSkillFormGlobalErrorMessage,
} from '../utils/skillHelpers'

function buildAxiosError(
  data: { message?: string; errors?: Array<{ field?: string; message: string }> },
): AxiosError {
  return new AxiosError(
    'Request failed',
    'ERR_BAD_REQUEST',
    undefined,
    undefined,
    {
      data,
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: {} as never,
    },
  )
}

describe('SkillForm helpers', () => {
  it('maps backend field errors to react-hook-form errors', () => {
    const setError = vi.fn()
    const error = buildAxiosError({
      errors: [{ field: 'name', message: 'Competence obligatoire.' }],
    })

    applySkillFormBackendErrors(error, setError)

    expect(setError).toHaveBeenCalledWith('name', {
      type: 'server',
      message: 'Competence obligatoire.',
    })
  })

  it('returns a global message when the backend error is not field-specific', () => {
    const error = buildAxiosError({
      message: 'Impossible d ajouter cette competence.',
      errors: [{ message: 'Erreur technique.' }],
    })

    expect(getSkillFormGlobalErrorMessage(error)).toBe(
      'Impossible d ajouter cette competence.',
    )
  })

  it('returns the specific 404 message for deleting a skill', () => {
    expect(
      getDeleteSkillErrorMessage({
        response: { status: 404 },
      }),
    ).toBe(
      'Cette competence n existe plus ou vous n etes pas autorise a la supprimer.',
    )
  })
})
