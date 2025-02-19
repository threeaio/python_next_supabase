import { login } from './actions'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
export default async function LoginPage() {

  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-black border border-white/20 p-8 rounded-lg w-full max-w-sm space-y-6">
        <h1 className="text-2xl text-white mb-8 text-center font-[family-name:var(--font-geist-sans)]">
          Login
        </h1>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm text-white/70 font-[family-name:var(--font-geist-sans)]">
            Email
          </label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="email@example.com"
            required
            className="w-full px-3 py-2 placeholder:text-white/30 bg-black border border-white/20 rounded-md text-white font-[family-name:var(--font-geist-sans)] focus:outline-none focus:border-white"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm text-white/70 font-[family-name:var(--font-geist-sans)]">
            Password
          </label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Your password"
            required
            className="w-full px-3 placeholder:text-white/30 py-2 bg-black border border-white/20 rounded-md text-white font-[family-name:var(--font-geist-sans)] focus:outline-none focus:border-white"
          />
        </div>

        <button 
          formAction={login}
          className="w-full py-2 px-4 bg-black text-white border border-white/20 font-[family-name:var(--font-geist-sans)] rounded-md hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white transition-colors"
        >
          Log in
        </button>
      </form>
    </div>
  )
}