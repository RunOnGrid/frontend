"use client"

import { useState, useEffect } from "react"; // AÑADIDO: useEffect
import {MoveLeft} from "lucide-react";

import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'

const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
}
zxcvbnOptions.setOptions(options)


export default function SetPassword({ onConfirm }) {
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState("")
    
    // AÑADIDO: Nuevo estado para guardar la fortaleza de la contraseña
    const [strength, setStrength] = useState({ score: 0, feedback: null });

    // AÑADIDO: Calcula la fortaleza cada vez que la contraseña cambia
    useEffect(() => {
        if (password) {
            const result = zxcvbn(password);
            setStrength({
                score: result.score, // Un número de 0 (peor) a 4 (mejor)
                feedback: result.feedback.warning || result.feedback.suggestions[0] || null
            });
        } else {
            setStrength({ score: 0, feedback: null });
        }
    }, [password]);

    const handleSubmit = () => {
        setError("") // Limpia errores
        if (!password || !confirm) {
            setError("Both fields are required")
        // AÑADIDO: Validación de fortaleza antes de continuar
        } else if (strength.score < 2) { // Requerimos una puntuación mínima de 2 ("Regular")
            setError("Password is too weak")
        } else if (password !== confirm) {
            setError("Passwords do not match")
        } else {
            onConfirm(password)
        }
    }

    const getStrengthProps = () => {
        const score = strength.score;
        const width = score === 0 ? "10%" : `${(score + 1) * 20}%`;
        let color = "";
        switch (score) {
            case 0: color = "#ef4444"; break; 
            case 1: color = "#f97316"; break; 
            case 2: color = "#eab308"; break; 
            case 3: color = "#84cc16"; break; 
            case 4: color = "#22c55e"; break;
            default: color = "transparent";
        }
        return { width, color };
    };

    const strengthProps = getStrengthProps();

    return (
        <div className="centered-container">
            <div className="sp-card" role="region" aria-labelledby="sp-title">            
                <div className="sp-card__subtitle">Step 3/3</div>
                <h2 id="sp-title" className="sp-card__title">Secure your wallet</h2>
                <p className="sp-card__subtitle">
                    Choose a password to encrypt your seed phrase. This will be required to access your wallet.
                </p>

                <div className="sp-form">
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="sp-input"
                    />

                    {/* AÑADIDO: Barra de progreso y texto de feedback */}
                    {password && (
                        <div style={{minHeight: "30px"}}> {/* Contenedor para evitar saltos de layout */}
                            <div className="sp-strength-bar-container">
                                <div 
                                    className="sp-strength-bar"
                                    style={{
                                        height: '100%',
                                        width: strengthProps.width,
                                        backgroundColor: strengthProps.color,
                                        transition: 'width 0.3s ease-in-out'
                                    }}
                                ></div>
                            </div>
                            {strength.feedback && (
                               <p style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '4px' }}>
                                 {strength.feedback}
                               </p>
                            )}
                        </div>
                    )}

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="sp-input"
                    />

                    {error && (
                        <p className="sp-error" role="alert" aria-live="polite">
                            {error}
                        </p>
                    )}

                    <button onClick={handleSubmit} className="sp-btn">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}