


const verifyWords = ({onConfirm}) => {
    return (
        <div class="verify-container">
            <h3>Step 2/3</h3>
            <h2>Verify Your Recovery Phrase</h2>
            <p>Fill out the words according to their numbers to verify that you have stored your phrase safely.</p>

            <div class="verify-grid">
                <input type="text" placeholder="Word #5" />
                <input type="text" placeholder="Word #10" />

                <div class="wallet-icon">
                    <img src="wallet-icon.svg" alt="Wallet" />
                </div>

                <input type="text" placeholder="Wallet Name" class="wallet-name" />

                <button class="next-btn">Next</button>
            </div>
        </div>

    )
}