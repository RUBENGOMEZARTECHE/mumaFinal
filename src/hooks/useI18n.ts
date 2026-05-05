import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_LOCALE, isSupportedLocale, type SupportedLocale } from '../lib/i18n'

type Dictionary<T> = Partial<Record<SupportedLocale, T>> & Record<typeof DEFAULT_LOCALE, T>

function readLocaleFromBrowser(): SupportedLocale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE

  const queryLocale = new URLSearchParams(window.location.search).get('lang')
  if (isSupportedLocale(queryLocale)) return queryLocale

  const firstSegment = window.location.pathname.split('/').filter(Boolean)[0]
  if (isSupportedLocale(firstSegment)) return firstSegment

  const storedLocale = window.localStorage.getItem('muma-locale')
  if (isSupportedLocale(storedLocale)) return storedLocale

  return DEFAULT_LOCALE
}

export function useLocale(): SupportedLocale {
  const [locale, setLocale] = useState<SupportedLocale>(DEFAULT_LOCALE)

  useEffect(() => {
    const syncLocale = () => setLocale(readLocaleFromBrowser())

    syncLocale()
    window.addEventListener('popstate', syncLocale)
    window.addEventListener('muma:locale-change', syncLocale)
    window.addEventListener('storage', syncLocale)

    return () => {
      window.removeEventListener('popstate', syncLocale)
      window.removeEventListener('muma:locale-change', syncLocale)
      window.removeEventListener('storage', syncLocale)
    }
  }, [])

  return locale
}

export function useI18n<T>(dictionary: Dictionary<T>): { locale: SupportedLocale; t: T } {
  const locale = useLocale()
  const t = useMemo(() => dictionary[locale] ?? dictionary[DEFAULT_LOCALE], [dictionary, locale])

  return { locale, t }
}