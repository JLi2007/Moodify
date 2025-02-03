import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const anonKEY = import.meta.env.VITE_ANON_KEY;

const supabase = createClient(`https://${supabaseURL}.supabase.co`, anonKEY)

export default function Login() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth 
      supabaseClient={supabase} 
      appearance={{
        theme: ThemeSupa,
        style: {
          button: { background: 'white', color: '#1DB954' },
          input: {color: 'white'}
        },
      }}
      providers={['spotify']} 
      />)
  }
  else {
    return (<div>Logged in!</div>)
  }
}