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

export const updateCompanyBodySchema = z.object({
  name: companyNameSchema,
  website: companyWebsiteSchema,
  email: companyEmailSchema,
  phone: companyPhoneSchema,
  city: companyCitySchema,
  country: companyCountrySchema,
  categoryId: companyCategoryIdSchema,
  recruiterName: companyRecruiterNameSchema,
})

export type UpdateCompanyBody = z.infer<typeof updateCompanyBodySchema>
