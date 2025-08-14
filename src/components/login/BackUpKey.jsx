"use client"

import { useState, useMemo } from "react"
import { AlertTriangle } from "lucide-react"



export default function BackupKey({ seedPhrase, onConfirm, deterministic }) {
  const [copied, setCopied] = useState(false)

  const words = useMemo(
    () => seedPhrase?.trim().split(/\s+/).filter(Boolean) ?? [],
    [seedPhrase]
  )

  const isValidCount = words.length === 12 || words.length === 24

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(seedPhrase)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <div className="bk bk-center">
      <div className="bk-card" role="region" aria-labelledby="bk-title">
        <div className="bk-subtitle">Step 1/3</div>
        <h2 id="bk-title" className="bk-title">Back up private key</h2>

        {!isValidCount && (
          <p className="bk-error" style={{ marginBottom: ".5rem" }}>
            Seed must have 12 or 24 words (recibí {words.length}).
          </p>
        )}

        <div className="bk-seed-grid">
          {words.map((w, i) => (
            <label className="bk-seed-item" key={i}>
              <span className="bk-seed-index">{i + 1}.</span>
              <input
                readOnly
                autoComplete="off"
                className="bk-seed-input"
                value={w}
                size={Math.max(10, w.length + 2)}
                onFocus={(e) => e.currentTarget.select()}
              />
            </label>
          ))}
        </div>

        <div className="bk-actions">
          <button type="button" className="bk-btn" data-variant="ghost" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
        </div>

        <div className="bk-warning">
          <AlertTriangle className="bk-warning-icon" />
          <span>Backup your seed phrase securely.</span>
        </div>

        <p className="bk-muted">Anyone with your seed phrase can access your account.</p>

        {deterministic ? (
          <p className="bk-muted">
            If you lose access to your Gmail account, the only way to recover your wallet is using your private key. Keep this in a safe place.
          </p>
        ) : (
          <p className="bk-muted">
            The only way to recover your account is using your seed phrase. Keep this in a safe place.
          </p>
        )}

        <button className="bk-btn" type="button" onClick={onConfirm}>
          Got it
        </button>
      </div>
    </div>
  )
}
