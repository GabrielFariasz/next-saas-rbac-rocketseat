import { z } from 'zod'

export const inviteSchema = z.tuple([
  z.union([z.literal('get'), z.literal('manage'), z.literal('export')]),
  z.literal('Invite'),
])

export type InviteSubject = z.infer<typeof inviteSchema>
