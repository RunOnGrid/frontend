"use client"

import { useState } from "react";
import {MoveLeft} from "lucide-react";




export default function SetPassword({ onConfirm }) {
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = () => {
        if (!password || !confirm) {
            setError("Both fields are required")
        } else if (password !== confirm) {
            setError("Passwords do not match")
        } else {
            setError("")
            onConfirm(password)
        }
    }

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
