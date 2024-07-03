import {
  createMongoAbility,
  CreateAbility,
  MongoAbility,
  AbilityBuilder,
} from '@casl/ability'
import { User } from './models/user'
import { permissions } from './permissions'
import { UserSubject } from './subjects/user.ts'
import { ProjectSubject } from './subjects/project.ts'

type AppAbilities = UserSubject | ProjectSubject | ['manage', 'all']

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role]) {
    throw new Error(`Permissions for role ${user.role} not found`)
  }

  const ability = permissions[user.role](user, builder)
  return ability
}
