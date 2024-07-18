import { z } from 'zod'

import { organizationSchema } from '../models/organization.ts'

export const organizationSubject = z.tuple([
  z.union([
    z.literal('transfer_ownership'),
    z.literal('delete'),
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
  ]),
  z.union([z.literal('Organization'), organizationSchema]),
])

export type OrganizationSubject = z.infer<typeof organizationSubject>
