import { createContext, useContext, useState } from 'react'

const LangContext = createContext<{ locale: string; setLocale: (l: string) => void } | null>(null)

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState('es')
  return (
    <LangContext.Provider value={{ locale, setLocale }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
