// Mocks para las dependencias problemáticas de wallet
// Esto permite que Jest ejecute las funciones reales

// Mock de @noble/hashes/sha2
jest.mock('@noble/hashes/sha2', () => ({
  sha256: jest.fn((data) => {
    // Mock simple de SHA256
    const buffer = Buffer.from(data);
    return Buffer.alloc(32).fill(buffer[0] || 1);
  })
}));

// Mock de @noble/hashes
jest.mock('@noble/hashes', () => ({
  sha256: jest.fn((data) => {
    const buffer = Buffer.from(data);
    return Buffer.alloc(32).fill(buffer[0] || 1);
  }),
  ripemd160: jest.fn((data) => {
    const buffer = Buffer.from(data);
    return Buffer.alloc(20).fill(buffer[0] || 1);
  })
}));

// Mock de @noble/curves
jest.mock('@noble/curves', () => ({
  secp256k1: {
    getPublicKey: jest.fn((privateKey) => Buffer.alloc(33).fill(2)),
    getSharedSecret: jest.fn(() => Buffer.alloc(32).fill(3)),
    sign: jest.fn(() => ({ r: 'mock', s: 'mock' })),
    verify: jest.fn(() => true)
  }
}));

// Mock de @noble/hashes/ripemd160
jest.mock('@noble/hashes/ripemd160', () => ({
  ripemd160: jest.fn((data) => {
    // Mock simple de RIPEMD160
    const buffer = Buffer.from(data);
    return Buffer.alloc(20).fill(buffer[0] || 1);
  })
}));

// Mock de @noble/hashes/utils
jest.mock('@noble/hashes/utils', () => ({
  utf8ToBytes: jest.fn((str) => Buffer.from(str, 'utf8')),
  randomBytes: jest.fn((size) => Buffer.alloc(size).fill(1))
}));

// Mock de @noble/secp256k1
jest.mock('@noble/secp256k1', () => ({
  secp256k1_CURVE: { n: 'mock' },
  getPublicKey: jest.fn((privateKey) => Buffer.alloc(33).fill(2)),
  getSharedSecret: jest.fn(() => Buffer.alloc(32).fill(3)),
  Point: jest.fn(),
  sign: jest.fn(() => ({ r: 'mock', s: 'mock' })),
  signAsync: jest.fn(() => Promise.resolve({ r: 'mock', s: 'mock' })),
  Signature: jest.fn(),
  utils: { randomPrivateKey: jest.fn(() => Buffer.alloc(32).fill(4)) },
  verify: jest.fn(() => true)
}));

// Mock de @bitcoinerlab/secp256k1
jest.mock('@bitcoinerlab/secp256k1', () => ({
  ECPairFactory: jest.fn(() => jest.fn().mockReturnValue({
    fromWIF: jest.fn().mockReturnValue({
      publicKey: Buffer.alloc(33).fill(7)
    })
  }))
}));

// Mock de @scure/bip32
jest.mock('@scure/bip32', () => ({
  HDKey: jest.fn().mockImplementation(() => ({
    fromExtendedKey: jest.fn().mockReturnValue({
      deriveChild: jest.fn().mockReturnValue({
        deriveChild: jest.fn().mockReturnValue({
          privateExtendedKey: 'mock-xpriv-key',
          publicExtendedKey: 'mock-xpub-key'
        })
      })
    }),
    fromMasterSeed: jest.fn().mockReturnValue({
      derive: jest.fn().mockReturnValue({
        toJSON: jest.fn().mockReturnValue({
          xpriv: 'mock-xpriv-key',
          xpub: 'mock-xpub-key'
        })
      })
    })
  }))
}));

// Mock de bip32
jest.mock('bip32', () => ({
  BIP32Factory: jest.fn(() => jest.fn().mockReturnValue({
    fromBase58: jest.fn().mockReturnValue({
      toWIF: jest.fn(() => 'mock-wif-key'),
      publicKey: Buffer.alloc(33).fill(5)
    })
  }))
}));

// Mock de ecpair
jest.mock('ecpair', () => ({
  ECPairFactory: jest.fn(() => jest.fn().mockReturnValue({
    fromWIF: jest.fn().mockReturnValue({
      publicKey: Buffer.alloc(33).fill(6)
    })
  }))
}));

// Mock de bs58check
jest.mock('bs58check', () => ({
  encode: jest.fn((data) => 'mock-address-' + data.length)
}));

// Mock de bip39
jest.mock('bip39', () => ({
  generateMnemonic: jest.fn((strength) => {
    const words = strength === 128 ? 
      'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about' :
      'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art';
    return words;
  }),
  mnemonicToSeedSync: jest.fn(() => Buffer.alloc(64).fill(7)),
  validateMnemonic: jest.fn(() => true),
  entropyToMnemonic: jest.fn(() => 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about')
}));

// Mock de cosmwasm
jest.mock('cosmwasm', () => ({
  DirectSecp256k1HdWallet: {
    fromMnemonic: jest.fn(() => Promise.resolve({
      // Mock wallet object
    }))
  }
}));
