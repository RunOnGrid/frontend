"use client"

import { useState, useEffect, useRef } from "react"; // AÑADIDO: useEffect


export default function Session({ }) {

    const [error, setError] = useState("")
    const [password, setPassword] = useState("")
    const passwordRef = useRef(null);

    useEffect(() => {
        if (passwordRef.current) {
          passwordRef.current.focus();
        }
      }, []);
    

    const handleSubmit = () => {
        setError("")
        if (!password) {
            setError("Password is required")
        }
        onConfirm(password)
        setPassword("")

    }

    return (
        <div className="centered-container">
            <div className="sp-card" role="region" aria-labelledby="sp-title">
                <h2 id="sp-title" className="sp-card__title">Welcome back to Grid</h2>
                <p className="sp-card__subtitle">
                    Enter your password
                </p>

                <div className="sp-form">
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="sp-input"
                    />

                    {error && (
                        <p className="sp-error" role="alert" aria-live="polite">
                            {error}
                        </p>
                    )}

                    <button onClick={handleSubmit} className="sp-btn">
                        Unlock
                    </button>
                </div>
            </div>
        </div>
    )
}