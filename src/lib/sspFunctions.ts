/**
 * Portions of this file are adapted from SSP Wallet:
 * generateNodeIdentityKeypair
 * generateExternalIdentityKeypair
 * Copyright (c) 2024 InFlux Technologies Limited / RunOnFlux.com Team / SSP Community
 * Licensed under the GNU Affero General Public License v3.0
 * See <https://www.gnu.org/licenses/agpl-3.0.html>
 */


import { sha256 } from '@noble/hashes/sha2';
import * as ecc from "@bitcoinerlab/secp256k1";
import { ECPairFactory } from "ecpair";
import { ripemd160 } from '@noble/hashes/ripemd160';
import { BIP32Factory } from 'bip32';
import { Buffer } from 'buffer';
import { HDKey } from '@scure/bip32';
import bs58check from "bs58check";


const ECPair = ECPairFactory(ecc);
const BIP32 = BIP32Factory(ecc);



export interface keyPair {
    privKey: string;
    pubKey: string;
  }

export interface externalIdentity {
    privKey: string;
    pubKey: string;
    address: string;
  }

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


function generateNodeIdentityKeypair(
    xpriv: string,
): keyPair {

    const externalid = HDKey.fromExtendedKey(
        xpriv,
        bitcoin.bip32
    );
    const externalAddress = externalid.deriveChild(11).deriveChild(0);

    const keyNode = BIP32.fromBase58(externalAddress.privateExtendedKey, bitcoin);
    const wif = keyNode.toWIF();
    console.log(wif);
    const pubkeyHex = Buffer.from(keyNode.publicKey).toString('hex');

    return {
        privKey: wif,
        pubKey: pubkeyHex
    }
}


export function generateExternalIdentityKeypair(
    xpriv: string,
): externalIdentity {
    const identityKeypair = generateNodeIdentityKeypair(xpriv)

    const kp = ECPair.fromWIF(identityKeypair.privKey, bitcoin);

    const address = pubkeyToP2PKH(kp.publicKey, bitcoin);
    const externalIdentity = {
        privKey: identityKeypair.privKey,
        pubKey: identityKeypair.pubKey,
        address: address || ""
    };
    return externalIdentity;
}

function pubkeyToP2PKH(pubKey: Uint8Array, network = bitcoin) {
    // 1. Hash160 = RIPEMD160(SHA256(pubkey))
    const pubKeyHash = ripemd160(sha256(pubKey));

    // 2. Prefijo de la red
    const prefix = Uint8Array.from([network.pubKeyHash]);

    // 3. Concatenar prefix + pubKeyHash
    const payload = new Uint8Array(prefix.length + pubKeyHash.length);
    payload.set(prefix, 0);
    payload.set(pubKeyHash, prefix.length);

    // 4. Base58Check encode
    return bs58check.encode(payload);
}


