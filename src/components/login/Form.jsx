import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
  };

  return (
    <div className="contenedor-login">
      <div className="textos-login">
        <div> Grid Cloud </div>
        <h1> Welcome back to Grid Cloud</h1>
        <span>
          {' '}
          <img alt="" src="" /> Read the Grid Cloud docs{' '}
        </span>
        <span>
          {' '}
          <img alt="" src="" /> See whats new with Grid Cloud{' '}
        </span>
        <span>
          {' '}
          <img alt="" src="" /> Join the community{' '}
        </span>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login to your Grid Cloud account</h2>

        <input
          placeholder="Email"
          className="register-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="input-container">
          <input
            placeholder="Password"
            className="register-input"
            type={view ? 'text' : 'password'}
          />
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

        <Link href="/profile">
          <button className="login-submit" type="submit">
            Login
          </button>
        </Link>

        <div className="member-container">
          <div className="member-login">
            Not a member yet?
            <Link href="/register">
              <span className="member2-login"> Create an account </span>
            </Link>
            and start right now!
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
