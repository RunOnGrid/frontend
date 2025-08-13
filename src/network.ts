export interface Network {
    messagePrefix: string;
    bech32: string;
    bip32: { public: number; private: number };
    pubKeyHash: number;
    scriptHash: number;
    wif: number;
}

export const bitcoin: Network = {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: { public: 0x0488b21e, private: 0x0488ade4 },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
};

export const flux: Network = {
    messagePrefix: '\x18Flux Signed Message:\n',
    bech32: '', // Flux no usa bech32
    bip32: { public: 0x0488b21e, private: 0x0488ade4 },
    pubKeyHash: 0x1c,
    scriptHash: 0x32,
    wif: 0x80,
};
