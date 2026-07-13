import { describe, expect, it } from 'vitest'
import { experienceSchema } from './experienceSchema.js'

describe('experienceSchema', () => {
  it('accepts a valid experience and trims values', () => {
    expect(
      experienceSchema.parse({
        companyName: ' Acme ',
        endDate: ' 2024-06 ',
        jobTitle: ' Developpeur ',
        location: ' Paris ',
        startDate: ' 2023 ',
      }),
    ).toEqual({
      companyName: 'Acme',
      endDate: '2024-06',
      jobTitle: 'Developpeur',
      location: 'Paris',
      startDate: '2023',
    })
  })

  it('requires a job title', () => {
    expect(() => experienceSchema.parse({
      companyName: '',
      endDate: '',
      jobTitle: '  ',
      location: '',
      startDate: '',
    })).toThrow('Le poste est obligatoire.')
  })

  it('normalizes optional empty values to null', () => {
    expect(
      experienceSchema.parse({
        companyName: '',
        endDate: '',
        jobTitle: 'Developpeur',
        location: '   ',
        startDate: '',
      }),
    ).toEqual({
      companyName: null,
      endDate: null,
      jobTitle: 'Developpeur',
      location: null,
      startDate: null,
    })
  })

  it('rejects invalid date formats', () => {
    expect(() =>
      experienceSchema.parse({
        companyName: '',
        endDate: '06/2024',
        jobTitle: 'Developpeur',
        location: '',
        startDate: '2024',
      }),
    ).toThrow('La date doit respecter le format YYYY, YYYY-MM ou YYYY-MM-DD.')
  })

  it('accepts initial values used by the update mode', () => {
    expect(
      experienceSchema.parse({
        companyName: 'Acme',
        endDate: '',
        jobTitle: 'Developpeur',
        location: 'Paris',
        startDate: '2024-01-15',
      }),
    ).toMatchObject({ jobTitle: 'Developpeur', startDate: '2024-01-15' })
  })
})
