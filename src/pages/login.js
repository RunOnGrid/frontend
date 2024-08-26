import Form from '@/components/login/Form';
import Navbar from '@/components/login/Navbar';
import Image from "next/image";

export default function Login() {
  return (
    <div className="login-screen">
      <Form />
      <div className="login-info-container">
        <h1>
          Grid Compute removes the entry barrier for operating nodes on multiple
          chains
        </h1>
        <p>
          without coding, embodying Web3 ethos through decentralized computing
          for all nodes.
        </p>
        <div className="login-profile-info">
          <Image alt="" src="/userDark.png" width={30} height={30} />
          <div>
            <h3>John Doe</h3>
            <p>Head of reasearch</p>
          </div>
        </div>
      </div>
    </div>
  );
}
