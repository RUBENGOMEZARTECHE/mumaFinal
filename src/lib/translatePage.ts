import { batNightI18n } from '../i18n/batNightI18n.js'
import { cienciaCiudadanaI18n } from '../i18n/cienciaCiudadanaI18n.js'
import { contactoI18n } from '../i18n/contactoI18n.js'
import { cuevaNerjaI18n } from '../i18n/cuevaNerjaI18n.js'
import { donarI18n } from '../i18n/donarI18n.js'
import { educacionAmbientalI18n } from '../i18n/educacionAmbientalI18n.js'
import { formacionI18n } from '../i18n/formacionI18n.js'
import { fuenteDePiedraI18n } from '../i18n/fuenteDePiedraI18n.js'
import { inicioI18n } from '../i18n/inicioI18n.js'
import { mumaI18n } from '../i18n/mumaI18n.js'
import { navbarI18n } from '../i18n/navbarI18n.js'
import { nosotrosI18n } from '../i18n/nosotrosI18n.js'
import { plazaMayorMalagaI18n } from '../i18n/plazaMayorMalagaI18n.js'
import { portugalGrutasMoedaI18n } from '../i18n/portugalGrutasMoedaI18n.js'
import { realidadVirtualI18n } from '../i18n/realidadVirtualI18n.js'
import { refugiosI18n } from '../i18n/refugiosI18n.js'
import { voluntariosI18n } from '../i18n/voluntariosI18n.js'
import { DEFAULT_LOCALE, isSupportedLocale, type SupportedLocale } from './i18n'

type AnyDictionary = Record<string, unknown>

const dictionaries = [
  batNightI18n,
  cienciaCiudadanaI18n,
  contactoI18n,
  cuevaNerjaI18n,
  donarI18n,
  educacionAmbientalI18n,
  formacionI18n,
  fuenteDePiedraI18n,
  inicioI18n,
  mumaI18n,
  navbarI18n,
  nosotrosI18n,
  plazaMayorMalagaI18n,
  portugalGrutasMoedaI18n,
  realidadVirtualI18n,
  refugiosI18n,
  voluntariosI18n,
] as AnyDictionary[]

function getLocaleFromBrowser(): SupportedLocale {
  const queryLocale = new URLSearchParams(window.location.search).get('lang')
  if (isSupportedLocale(queryLocale)) return queryLocale

  const firstSegment = window.location.pathname.split('/').filter(Boolean)[0]
  if (isSupportedLocale(firstSegment)) return firstSegment

  const storedLocale = window.localStorage.getItem('muma-locale')
  if (isSupportedLocale(storedLocale)) return storedLocale

  return DEFAULT_LOCALE
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function flattenStrings(value: unknown, output: string[] = []): string[] {
  if (typeof value === 'string') {
    const normalized = normalizeText(value)
    if (normalized) output.push(normalized)
    return output
  }

  if (Array.isArray(value)) {
    value.forEach((item) => flattenStrings(item, output))
    return output
  }

  if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => flattenStrings(item, output))
  }

  return output
}

function buildTranslationMap(locale: SupportedLocale): Map<string, string> {
  const map = new Map<string, string>()
  if (locale === DEFAULT_LOCALE) return map

  dictionaries.forEach((dictionary) => {
    const sourceStrings = flattenStrings(dictionary[DEFAULT_LOCALE])
    const targetStrings = flattenStrings(dictionary[locale])

    sourceStrings.forEach((source, index) => {
      const target = targetStrings[index]
      if (source && target && source !== target && !map.has(source)) {
        map.set(source, target)
      }
    })
  })

  return map
}

function translateTextKeepingWhitespace(original: string, map: Map<string, string>): string {
  const normalized = normalizeText(original)
  const translated = map.get(normalized)
  if (!translated) return original

  const prefix = original.match(/^\s*/)?.[0] ?? ''
  const suffix = original.match(/\s*$/)?.[0] ?? ''
  return `${prefix}${translated}${suffix}`
}

function translateAttributes(root: ParentNode, map: Map<string, string>) {
  const attributes = ['alt', 'title', 'aria-label', 'placeholder', 'value']

  root.querySelectorAll<HTMLElement>('*').forEach((element) => {
    attributes.forEach((attribute) => {
      const value = element.getAttribute(attribute)
      if (!value) return

      const translated = translateTextKeepingWhitespace(value, map)
      if (translated !== value) element.setAttribute(attribute, translated)
    })
  })
}

function translateTextNodes(root: ParentNode, map: Map<string, string>) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement
      if (!parent) return NodeFilter.FILTER_REJECT
      if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT
      if (!normalizeText(node.textContent ?? '')) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    },
  })

  const nodes: Text[] = []
  while (walker.nextNode()) nodes.push(walker.currentNode as Text)

  nodes.forEach((node) => {
    const current = node.textContent ?? ''
    const translated = translateTextKeepingWhitespace(current, map)
    if (translated !== current) node.textContent = translated
  })
}

export function translatePage(locale = getLocaleFromBrowser()) {
  const map = buildTranslationMap(locale)
  if (map.size === 0) return

  translateAttributes(document.body, map)
  translateTextNodes(document.body, map)
}

if (typeof window !== 'undefined') {
  const run = () => translatePage()

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run)
  } else {
    run()
  }

  window.addEventListener('muma:locale-change', () => {
    window.setTimeout(run, 0)
  })
}