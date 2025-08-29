"use client";

import { useState, useEffect, useMemo } from "react";
import SetPassword from "@/components/login/setPassword";
// Asumo que tienes estas dependencias importadas
import { useRouter } from 'next/navigation';
import { encrypt as passworderEncrypt, decrypt as passworderDecrypt } from "@metamask/browser-passworder"
import secureLocalStorage from "react-secure-storage"
import { useAppDispatch } from "@/hooks/reduxHooks";

import {
    deriveAkash,
    generatexPubxPriv,
    generateFluxKeyPair
}
    from "@/lib/wallet"
import {
    generateExternalIdentityKeypair
}
    from "@/lib/sspFunctions"
import { getFingerprint } from "@/lib/sspFingerPrint"
import { setPasswordBlob } from "@/store/passwordBlobSlice"




export default function VerifyWords({ seedPhrase }) {
    const dispatch = useAppDispatch();


    const [wordPositions, setWordPositions] = useState([]);
    const [wordInputs, setWordInputs] = useState({});
    const [walletName, setWalletName] = useState("");
    const [error, setError] = useState("");
    const [browser, setBrowser] = useState(null);
  

    useEffect(() => {
      setBrowser(window.chrome || window.browser);
    }, []);





    const [isVerified, setIsVerified] = useState(false);

    // (Asegúrate de tener acceso al router si lo vas a usar)
    const router = useRouter();
    let seedPhraseString = new TextDecoder().decode(seedPhrase);
    let words = useMemo(
        () => seedPhraseString?.trim().split(/\s+/).filter(Boolean) ?? [],
        [seedPhraseString]
    )



    useEffect(() => {
        const totalWords = words.length;
        // Corrección: el bucle do-while podría ser infinito si totalWords es <= 1
        // o si el primer número es el último. Una lógica más segura:
        let positions = [];
        while (positions.length < 2) {
            const randomPos = Math.floor(Math.random() * totalWords) + 1;
            if (!positions.includes(randomPos)) {
                positions.push(randomPos);
            }
        }
        setWordPositions(positions.sort((a, b) => a - b)); // Ordenarlos es una buena práctica
    }, [seedPhrase]);

    const handleChange = (pos, value) => {
        setWordInputs((prev) => ({ ...prev, [pos]: value.trim().toLowerCase() }));
    };

    const handleSubmit = async () => {
        setError("");

        if (!walletName.trim()) {
            setError("Please enter a wallet name");
            return;
        }

        const isValid = wordPositions.every(
            (pos) => words[pos - 1] === wordInputs[pos]
        );
        if (!isValid) {
            setError("The recovery words do not match");
            return;
        }

        localStorage.setItem(
            "wallet",
            JSON.stringify({ name: walletName.trim() })
        );


        setIsVerified(true);
    };

    const handlePasswordConfirm = async (password) => {
        if (password) {
            try {
                localStorage.clear();
                secureLocalStorage.clear();
                let seedphrase = new TextDecoder().decode(seedPhrase);
                const blob = await passworderEncrypt(password, seedphrase);

                const randomParams = password.slice(-128);

                const randomParamFingerprint = getFingerprint('forRandomParams');
                const randomParamsBlob = await passworderEncrypt(randomParamFingerprint, randomParams);

                const akashData = await deriveAkash(seedPhrase);
                const account = await akashData.getAccounts();

                const returnData = generatexPubxPriv(new TextDecoder().decode(seedPhrase), 44, 19167, 0, '0');
                console.log(returnData);

                let externalIdentity = generateExternalIdentityKeypair(returnData.xpriv)
                console.log(externalIdentity);
                const fluxAddress = generateFluxKeyPair(returnData.xpriv)

                const blob1 = await passworderEncrypt(password, externalIdentity.privKey)
                console.log(blob1);
                const fingerprint = getFingerprint();
                const pwBlob = await passworderEncrypt(fingerprint, password);

                secureLocalStorage.setItem('randomParams', randomParamsBlob);
                secureLocalStorage.setItem('FluxIdentity', blob1);
                secureLocalStorage.setItem('walletSeed', blob);
                localStorage.setItem("fluxAddress", fluxAddress.address);
                localStorage.setItem("akashAddress", account[0].address);

                if (browser?.storage?.session) {
                    await browser.storage.session.set({
                        pwBlob: pwBlob,
                    })
                }
                dispatch(setPasswordBlob(pwBlob));

                seedPhrase.fill(0);
                seedphrase = null;
                externalIdentity = null;
                password = null

                router.push("/profile");
            } catch (e) {
                console.error("Encryption failed:", e);
                setError("Could not encrypt and save the wallet.");
            }
        }
    };




    if (isVerified) {
        return <SetPassword onConfirm={handlePasswordConfirm} />;
    }

    return (
        <div className="page-container">
            <div className="verifySeed-container">
                <h3>Step 2/3</h3>
                <h2>Verify Your Recovery Phrase</h2>
                <p>
                    Fill out the words according to their numbers to verify that you have
                    stored your phrase safely.
                </p>

                <div className="verify-grid">
                    {wordPositions.map((pos) => (
                        <input
                            key={pos}
                            type="text"
                            placeholder={`Word #${pos}`}
                            value={wordInputs[pos] || ""}
                            onChange={(e) => handleChange(pos, e.target.value)}
                        />
                    ))}
                </div>
                <div className="verify-grid-2">
                    <input
                        type="text"
                        placeholder="Wallet Name"
                        value={walletName}
                        onChange={(e) => setWalletName(e.target.value)}
                    />
                    <button className="next-btn" onClick={handleSubmit}>
                        Next
                    </button>
                </div>

                {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
            </div>
        </div>
    );
}