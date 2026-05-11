// Shim de tipos para VSCode/TypeScript cuando el workspace no resuelve imports remotos.
//
// Objetivo: eliminar el error
//   "Cannot find module 'https://esm.sh/...@supabase/supabase-js...' or its corresponding type declarations"
//
// Nota: En runtime (Supabase Edge / Deno) el import remoto funciona.
// Este archivo solo aporta tipos a TS/VSCode.

declare module "https://esm.sh/@supabase/supabase-js@2.39.0?target=deno" {
  // Tipado mínimo (suficiente para esta función).
  // Si en el futuro necesitas tipos completos, lo ideal es que VSCode use el language server de Deno
  // (ver .vscode/settings.json) o mover el import a un specifier resuelto por Deno.
  export const createClient: (...args: any[]) => any
}
