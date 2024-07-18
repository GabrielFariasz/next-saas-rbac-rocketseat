import { z } from 'zod'

import { projectSchema } from '../models/project.ts'

export const projectSubject = z.tuple([
  z.union([
    z.literal('create'),
    z.literal('delete'),
    z.literal('manage'),
    z.literal('get'),
    z.literal('update'),
  ]),
  z.union([z.literal('Project'), projectSchema]),
])

export type ProjectSubject = z.infer<typeof projectSubject>
