import { sha256 } from '@noble/hashes/sha2';
import * as secp from '@noble/secp256k1';
import * as utils from '@noble/hashes/utils';
import { randomBytes } from '@noble/hashes/utils';
import * as ecc from "@bitcoinerlab/secp256k1";
import { ripemd160 } from '@noble/hashes/ripemd160';
import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import { DirectSecp256k1HdWallet } from "cosmwasm";
import { wordlist } from '@scure/bip39/wordlists/english';
import { Buffer } from 'buffer';
import { HDKey } from '@scure/bip32';
import bs58check from "bs58check";


interface xPrivXpub {
    xpriv: string;
    xpub: string;
}

export interface ZkIdentity {
    mnemonic: string;
    akashData: DirectSecp256k1HdWallet;
}

export interface Network {
    messagePrefix: string;
    bech32: string;
    bip32: { public: number; private: number };
    pubKeyHash: number;
    scriptHash: number;
    wif: number;
}

export const flux: Network = {
    messagePrefix: '\x18Flux Signed Message:\n',
    bech32: '', // Flux no usa bech32
    bip32: { public: 0x0488b21e, private: 0x0488ade4 },
    pubKeyHash: 0x1c,
    scriptHash: 0x32,
    wif: 0x80,
};


const BIP32 = BIP32Factory(ecc);


/**
 * Generates a 12-word mnemonic from 
 * and derives the Akash identity from it.
 */
export async function generateMnemonicFromGoogle(
    providerId: string,
    email: string,
    deterministic: boolean = false
): Promise<ZkIdentity> {
    const seedMaterial = `${providerId}|${email}`;

    let entropySource: Uint8Array;
    if (deterministic) {
        entropySource = sha256(utils.utf8ToBytes(seedMaterial));
    } else {
        const salt = randomBytes(32);
        const input = utils.concatBytes(utils.utf8ToBytes(seedMaterial), salt);
        entropySource = sha256(input);
    }

    const entropy128 = entropySource.slice(0, 16);
    const mnemonic = bip39.entropyToMnemonic(Buffer.from(entropy128));

    const akashData = await deriveAkash(mnemonic)
    return {
        mnemonic,
        akashData
    };
}
export async function deriveAkash(mnemonic: string): Promise<DirectSecp256k1HdWallet> {
    const akashData = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "akash" });
    return akashData

}

export function generatexPubxPriv(
    mnemonic: string,
    bip = 48,
    coin: 19167,
    account = 0,
    type = 'p2sh',
): xPrivXpub {

    let seed = bip39.mnemonicToSeedSync(mnemonic);
    const uint8 = new Uint8Array(seed);
    // @ts-expect-error assign to null as it is no longer needed
    mnemonic = null;
    const masterKey = HDKey.fromMasterSeed(uint8, flux.bip32);

    const externalChain = masterKey.derive(
        `m/${bip}'/${coin}'/${account}'/${type}'`,
    );


    return externalChain.toJSON();
}



export function generateFluxKeyPair(xpriv: string) {


    const hd = HDKey.fromExtendedKey(xpriv, flux.bip32);

    const child = hd.derive(`m/44'/19167'/0'/0'`);

    if (!child.privateKey) {
        throw new Error("Private key missing");
    }
    const keyNode = BIP32.fromBase58(child.privateExtendedKey, flux);
    const wif = keyNode.toWIF();
    console.log(wif);


    // 3. Obtenemos la public key comprimida
    const pubKey = secp.getPublicKey(child.privateKey, true);

    const sha256Hash = sha256(pubKey);
    const hash = Buffer.from(sha256Hash)
    const data = hash.toString()
    const hash160 = ripemd160(data);
    const prefix = Buffer.from("1cb8", "hex");
    const hashuint = new Uint8Array(hash160)
    const uint8 = new Uint8Array(prefix);

    const addressBytes = Buffer.concat([uint8, hashuint]);
    const addressUint = new Uint8Array(addressBytes);

    // 6. base58check encode
    return {
        address: bs58check.encode(addressUint),
        privKeyFlux: wif
    }
}

export function generateMnemonic(strength: 128 | 256 = 256): string {
    return bip39.generateMnemonic(strength, undefined, wordlist);
}

export function validateMnemonic(mnemonic: string): boolean {
    return bip39.validateMnemonic(mnemonic, wordlist);
}

