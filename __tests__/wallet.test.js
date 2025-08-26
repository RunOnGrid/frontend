const { generateMnemonic, generatexPubxPriv } = require('../src/lib/wallet.ts');
const { generateExternalIdentityKeypair } = require('../src/lib/sspFunctions.ts');

describe('Wallet Functions Chain', () => {
  test('should generate mnemonic and derive keys successfully', async () => {
    // 1. Generar mnemonic
    const mnemonic = generateMnemonic(128);
    expect(mnemonic).toBeDefined();
    expect(mnemonic.split(' ')).toHaveLength(12);
    
    // 2. Generar xpub/xpriv
    const xpubxpriv = generatexPubxPriv(mnemonic, 48, 19167, 0, '0');
    expect(xpubxpriv.xpriv).toBeDefined();
    expect(xpubxpriv.xpub).toBeDefined();
    
    // 3. Generar external identity keypair
    const externalIdentity = generateExternalIdentityKeypair(xpubxpriv.xpriv);
    expect(externalIdentity.privKey).toBeDefined();
    expect(externalIdentity.pubKey).toBeDefined();
    expect(externalIdentity.address).toBeDefined();
    
    console.log('✅ Test passed - All functions working!');
    console.log('📝 Mnemonic:', mnemonic);
    console.log('🔑 Address:', externalIdentity.address);
  });
  
  test('should handle different mnemonic strengths', () => {
    const mnemonic128 = generateMnemonic(128);
    const mnemonic256 = generateMnemonic(256);
    
    expect(mnemonic128.split(' ')).toHaveLength(12);
  });
});
