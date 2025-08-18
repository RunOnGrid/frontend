"use client";

import { useState, useEffect } from "react";
import SetPassword from "@/components/login/setPassword";
// Asumo que tienes estas dependencias importadas
import { useRouter } from 'next/navigation'; 
import { encrypt as passworderEncrypt } from "@metamask/browser-passworder"
import secureLocalStorage from "react-secure-storage"
import {
    deriveAkash,
    generatexPubxPriv,
    generateFluxKeyPair
  }
    from "@/lib/wallet"


export default function VerifyWords({ seedPhrase }) {
    const [wordPositions, setWordPositions] = useState([]);
    const [wordInputs, setWordInputs] = useState({});
    const [walletName, setWalletName] = useState("");
    const [error, setError] = useState("");
    
    // 1. NUEVO ESTADO: para controlar qué componente mostrar.
    const [isVerified, setIsVerified] = useState(false);
    
    // (Asegúrate de tener acceso al router si lo vas a usar)
    const router = useRouter(); 

    const words = seedPhrase.trim().split(" ");

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

    const handleSubmit = async () => { // Hacemos la función async para usar passworder
        setError(""); // Limpiar errores previos
        console.log('Submitted', wordInputs, walletName);
        if (!walletName.trim()) {
            setError("Please enter a wallet name");
            return;
        }

        const isValid = wordPositions.every(
            (pos) => words[pos - 1] === wordInputs[pos]
        );
        
        console.log('isValid?', isValid);
        if (!isValid) {
            setError("The recovery words do not match");
            return;
        }

        localStorage.setItem(
            "wallet",
            JSON.stringify({ name: walletName.trim() })
        );
        
        // 2. ACTUALIZA EL ESTADO: En lugar de retornar JSX, cambiamos el estado.
        setIsVerified(true);
    };

    // Función que se pasará a SetPassword
    const handlePasswordConfirm = async (password) => {
        if (password) {
          try {
            console.log("Encrypting with password:", password);

            const akashData = await deriveAkash(seedPhrase);
            const account = await akashData.getAccounts();
            const returnData = generatexPubxPriv(seedPhrase, 44, 19167, 0, '0');
            const fluxAddress = generateFluxKeyPair(returnData.xpriv)
            const blob = await passworderEncrypt(password, seedPhrase);
            secureLocalStorage.setItem("walletSeed", blob);
            localStorage.setItem("account", JSON.stringify({ "akashAddress": account[0].address, "fluxAddress": fluxAddress.address}))
            console.log("Seed phrase encrypted and saved.");
            router.push("/profile");
          } catch(e) {
            console.error("Encryption failed:", e);
            setError("Could not encrypt and save the wallet.");
          }
        }
    };


    // 3. RENDERIZADO CONDICIONAL: Usamos el estado 'isVerified' para decidir qué mostrar.
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