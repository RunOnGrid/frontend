import Form from '@/components/register/Form';
import Navbar from '@/components/login/Navbar';
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/", // Puedes redirigir a una página de "Próximamente" o similar
      permanent: false,
    },
  };
}
export default function Register() {
  return (
    <>
      <Navbar />
      <Form />
    </>
  );
}
