import { describe, expect, it } from 'vitest'
import { trainingSchema } from './trainingSchema.js'

describe('trainingSchema', () => {
  const emptyTraining = {
    organizationName: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '',
    description: '', location: '', isCertification: false, certificationType: '',
  }

  it('accepts a valid training and trims values', () => {
    expect(trainingSchema.parse({
      title: ' Formation web ', organizationName: ' Acme ', degree: ' Master ',
      fieldOfStudy: ' Informatique ', startDate: ' 2023-09 ', endDate: ' 2025-06 ',
      description: ' Cours ', location: ' Paris ', isCertification: true,
      certificationType: ' RNCP ',
    })).toEqual({
      title: 'Formation web', organizationName: 'Acme', degree: 'Master',
      fieldOfStudy: 'Informatique', startDate: '2023-09', endDate: '2025-06',
      description: 'Cours', location: 'Paris', isCertification: true,
      certificationType: 'RNCP',
    })
  })

  it('requires a title and validates its length', () => {
    expect(() => trainingSchema.parse({ ...emptyTraining })).toThrow()
    expect(() => trainingSchema.parse({ ...emptyTraining, title: ' '.repeat(2) })).toThrow()
    expect(() => trainingSchema.parse({ ...emptyTraining, title: 'x'.repeat(256) })).toThrow()
  })

  it('normalizes empty nullable values and validates dates and certification fields', () => {
    expect(trainingSchema.parse({ ...emptyTraining, title: 'Formation', endDate: null, certificationType: null })).toMatchObject({ organizationName: null, startDate: null, endDate: null, certificationType: null, isCertification: false })
    expect(() => trainingSchema.parse({ ...emptyTraining, title: 'Formation', startDate: '09/2023' })).toThrow('La date doit respecter le format YYYY, YYYY-MM ou YYYY-MM-DD.')
    expect(() => trainingSchema.parse({ ...emptyTraining, title: 'Formation', isCertification: 'true' })).toThrow()
  })
})
