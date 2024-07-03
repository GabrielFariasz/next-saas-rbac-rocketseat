import { z } from 'zod'

export const billingSchema = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
  ]),
  z.literal('Billing'),
])

export type BillingSubject = z.infer<typeof billingSchema>
