import { logout } from '@/app/login/actions'
import { createClient } from '@/utils/supabase/server'
export default async function LogoutButton() {
  const supabase = await createClient()

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return null
    }

  return (
    <form className="p-4">
      <button className="w-full py-2 px-4 bg-black text-white border border-white/20 font-[family-name:var(--font-geist-sans)] rounded-md hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white transition-colors" formAction={logout} type="submit">
        Log out
      </button>
    </form>
  )
}