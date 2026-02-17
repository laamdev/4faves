import { Password } from '@convex-dev/auth/providers/Password'
import { convexAuth } from '@convex-dev/auth/server'
import { DataModel } from './_generated/dataModel'

const PasswordWithProfile = Password<DataModel>({
  profile(params) {
    return {
      email: params.email as string,
      name: (params.name as string) ?? undefined,
    }
  },
})

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [PasswordWithProfile],
})
