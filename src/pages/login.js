import Form from '@/components/login/Form';
import Navbar from '@/components/login/Navbar';
import Image from "next/image";

export default function Login() {
  return (
    <div className="login-screen">
      <Form />
      <div className="login-info-container">
        <h2>
          Grid removes the need for DevOps management and creates a frictionless
          gateway to decentralized computing.
        </h2>
        <p>Build, Connect, Deploy.</p>
        <div className="login-profile-info">
          <Image alt="" src="/userDark.png" width={30} height={30} />
          <div>
            <h3>Benjamin Aguirre</h3>
            <p>CEO</p>
          </div>
        </div>
      </div>
    </div>
  );
}
