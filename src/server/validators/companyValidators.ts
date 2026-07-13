import { z } from 'zod'
import {
  companyCategoryIdSchema,
  companyCitySchema,
  companyCountrySchema,
  companyEmailSchema,
  companyNameSchema,
  companyPhoneSchema,
  companyRecruiterNameSchema,
  companyWebsiteSchema,
} from './companyBaseValidators.js'

export const createCompanyBodySchema = z.object({
  name: companyNameSchema,
  website: companyWebsiteSchema,
  email: companyEmailSchema,
  phone: companyPhoneSchema,
  city: companyCitySchema,
  country: companyCountrySchema,
  categoryId: companyCategoryIdSchema,
  recruiterName: companyRecruiterNameSchema,
})

export const updateCompanyFavoriteBodySchema = z.object({
  isFavorite: z.boolean({
    error: 'Le statut favori doit etre un booleen.',
  }),
})

export type CreateCompanyBody = z.infer<typeof createCompanyBodySchema>
export type UpdateCompanyFavoriteBody = z.infer<
  typeof updateCompanyFavoriteBodySchema
>
