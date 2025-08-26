// Script de desarrollo para iteración ultra-rápida
// Ejecuta: nodemon dev-test.js

import { generateMnemonic, generatexPubxPriv } from './src/lib/wallet.ts';
import { generateExternalIdentityKeypair } from './src/lib/sspFunctions.ts';

// Función principal que puedes modificar rápidamente
function quickTest() {
  console.log('🚀 Quick Test - Modify this function for rapid iteration!\n');
  
  // 1. Generar mnemonic
  const mnemonic = generateMnemonic(128);
  console.log('📝 Mnemonic:', mnemonic);
  
  // 2. Generar xpub/xpriv
  const xpubxpriv = generatexPubxPriv(mnemonic, 48, 19167, 0, '0');
  console.log('🔑 xpriv:', xpubxpriv.xpriv?.substring(0, 30) + '...');
  
  // 3. Generar external identity
  const externalIdentity = generateExternalIdentityKeypair(xpubxpriv.xpriv);
  console.log('🏠 Address:', externalIdentity.address);
  
  // 🎯 AQUÍ PUEDES AGREGAR TU LÓGICA DE TEST RÁPIDO
  // Por ejemplo:
  // console.log('Testing with different parameters...');
  // const test2 = generatexPubxPriv(mnemonic, 44, 19167, 0, '0');
  // console.log('Different path result:', test2.xpriv?.substring(0, 20));
}

// Ejecutar
quickTest();

// Exportar para uso interactivo
export { quickTest };
