import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function FormZelcore() {
  const [apiData, setApiData] = useState(null);
  const [zelId, setZelId] = useState('');
  const [signature, setSignature] = useState('');

  // const handlePostRequest = async () => {
  //   try {
  //     if (!apiData || !apiData.data) {
  //       console.error('Error: apiData is null or does not contain data.');
  //       return;
  //     }

  //     const apiUrl = 'https://api.runonflux.io/id/verifylogin';
  //     const postData = {
  //       loginPhrase: apiData.data,
  //       zelid: zelId,
  //       signature: signature
  //     };

  //     const response = await axios.post(apiUrl, postData, {
  //       headers: {
  //         'Content-Type': 'text/plain',
  //       },
  //     });
  //     if (response.data && response.data.status == 'success') {
  //       // Save postData to localStorage
  //       localStorage.setItem('postData', JSON.stringify(postData));

  //       // Redirect the user to the /profile/ page
  //       window.location.href = '/profile';
  //     }
  //     else {
  //       console.log(response)
  //     }

  //     setPostResponse(response.data);
  //   } catch (error) {
  //     console.error('Error making POST request:', error);
  //   }
  // };

  useEffect(() => {
    const apiUrl = 'https://api.runonflux.io/id/loginphrase';

    axios
      .get(apiUrl)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
          {" "}
          <img alt="" src="" /> Read the Grid Cloud docs{" "}
        </span>
        <span>
          {" "}
          <img alt="" src="" /> See whats new with Grid Cloud{" "}
        </span>
        <span>
          {" "}
          <img alt="" src="" /> Join the community{" "}
        </span>

        <div className="member-login">
          Not a member yet?
          <Link href="/register">
            <span className="member2-login"> Create an account </span>
          </Link>
          and start right now!
        </div>
      </div>
      <div>
        <h2 className="login-title">Login with your ZelID</h2>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              fontFamily: "rouben",
              color: "white",
              marginTop: "30px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {" "}
            Message
          </label>
          <input
            style={{ marginLeft: "auto", marginRight: "auto" }}
            placeholder={apiData ? apiData.data : ""}
            className="login-input"
            value={apiData ? apiData.data : ""}
            readOnly
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              fontFamily: "rouben",
              color: "white",
              marginTop: "30px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {" "}
            Address
          </label>
          <input
            style={{ marginLeft: "auto", marginRight: "auto" }}
            placeholder="Insert ZellID or Bitcoin address"
            className="login-input"
            value={zelId}
            onChange={(e) => setZelId(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              fontFamily: "rouben",
              color: "white",
              marginTop: "30px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {" "}
            Signature
          </label>
          <input
            style={{ marginLeft: "auto", marginRight: "auto" }}
            placeholder="Insert Signature"
            className="login-input"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />
          <div className="link-zelcore">
            <Link
              href={`zel:?action=sign&message=${
                apiData ? apiData.data : ''
              }&icon=https%3A%2F%2Fraw.githubusercontent.com%2Frunonflux%2Fflux%2Fmaster%2FzelID.svg&callback=http://localhost:3000/api/post`}>
              <Image alt="" src="/zelID.svg" height={50} width={50} />
            </Link>
          </div>

          <button className="login-submit" type="submit">
            <Link href="/profile">Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormZelcore;
