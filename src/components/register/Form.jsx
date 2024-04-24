import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';

function Form() {
  const [email, setEmail] = useState('');
  const [view, setView] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordScore, setPasswordScore] = useState(0);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const passwordResult = zxcvbn(newPassword);
    setPasswordScore(passwordResult.score);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
  };
  const getPasswordStrengthBarStyle = () => {
    const score = passwordScore;
    switch (score) {
      case 0:
        return { width: '20%', backgroundColor: 'red' };
      case 1:
        return { width: '40%', backgroundColor: 'orange' };
      case 2:
        return { width: '60%', backgroundColor: 'lightgreen' };
      case 3:
        return { width: '80%', backgroundColor: 'green' };
      case 4:
        return { width: '100%', backgroundColor: 'darkgreen' };
      default:
        return { width: '0%', backgroundColor: 'gray' };
    }
  };

  return (
    <div className="contenedor-login">
      <div className="textos-login">
        <div> Grid Cloud </div>
        <h1> Deploy and scale effortlessly with Grid Cloud</h1>
        <span>
          {' '}
          <img alt="" src="" /> When you create a Grid Cloud account, you are
          creating a digital wallet. This wallet is secured by cryptography. It
          is important to keep username and password safe, as it is the only way
          to access the account.{' '}
        </span>
        <div style={{ fontSize: '24px' }}>
          {' '}
          <img alt="" src="" /> Your User, Your Data.{' '}
        </div>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Create your Grid Cloud account</h2>

        <input
          placeholder="Email"
          className="register-input"
          type="email"
          required
        />

        <div className="input-container">
          <input
            style={{ borderEndStartRadius: '0px', borderEndEndRadius: '0px' }}
            placeholder="Password"
            className="register-input"
            value={password}
            onChange={handlePasswordChange}
            type={view ? 'text' : 'password'}
          />
          <div
            className="password-strength-bar"
            style={getPasswordStrengthBarStyle()}>
            .
          </div>
          <Image
            onClick={() => {
              setView(!view);
            }}
            alt=""
            src={view ? '/hide2.png' : '/view.png'}
            width={25}
            height={25}
          />
        </div>

        <span> (Additional information)</span>
        <input
          placeholder="Company name"
          className="register-input"
          type="email"
          required
        />

        <Link href="/profile">
          <button className="login-submit" type="submit">
            Continue
          </button>
        </Link>

        <div className="member-container">
          <div className="member-login">
            Already have an account?
            <Link href="/login">
              <span className="member2-login"> Log in </span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
