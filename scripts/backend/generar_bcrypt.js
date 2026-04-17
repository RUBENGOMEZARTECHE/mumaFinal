#!/usr/bin/env node

/**
 * Script para generar bcrypt desde Node.js
 * Úsalo así:
 *   node generar_bcrypt.js
 *   Te pide contraseña y genera el hash
 *
 * Para instalar dependencias:
 *   npm install bcrypt
 */

const bcrypt = require('bcrypt');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n=== Generador de bcrypt ===\n');
console.log('Esto genera un password_hash seguro para la tabla `usuarios` de Supabase.\n');

rl.question('Escribe la contraseña a hashear: ', async (password) => {
  if (!password || password.length < 6) {
    console.error('❌ Error: la contraseña debe tener al menos 6 caracteres.\n');
    rl.close();
    process.exit(1);
  }

  try {
    console.log('\n⏳ Generando bcrypt (tarda ~1 segundo)...\n');
    const hash = await bcrypt.hash(password, 10); // 10 = salt rounds (como lo hace PHP)

    console.log('✅ Hash generado:\n');
    console.log(`\`${hash}\`\n`);

    console.log('📋 Cópialo en Supabase:');
    console.log('   1. Table Editor → usuarios → Insert row');
    console.log('   2. Campo "password_hash" → pega el hash');
    console.log('   3. Los demás campos según corresponda\n');

    console.log('🔐 Verificación rápida:');
    const verify = await bcrypt.compare(password, hash);
    console.log(`   password_verify("${password}", hash) = ${verify ? '✅ true' : '❌ false'}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  rl.close();
});
