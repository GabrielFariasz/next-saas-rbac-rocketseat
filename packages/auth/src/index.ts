import {
  createMongoAbility,
  CreateAbility,
  MongoAbility,
  AbilityBuilder,
  Normalize,
  SubjectType,
  ExtractSubjectType,
} from '@casl/ability'
import { User } from './models/user'
import { permissions } from './permissions'
import { userSubject } from './subjects/user.ts'
import { projectSubject } from './subjects/project.ts'

import { z } from 'zod'
import { inviteSchema } from './subjects/invite.ts'
import { billingSchema } from './subjects/billing.ts'
import { organizationSchema } from './subjects/organization.ts'

const appAbilitiesSchema = z.union([
  userSubject,
  projectSubject,
  inviteSchema,
  billingSchema,
  organizationSchema,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })

  return ability
}
