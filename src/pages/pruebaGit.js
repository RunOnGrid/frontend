import AuthComponent from '@/components/github/AuthComp';
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/", // Puedes redirigir a una página de "Próximamente" o similar
      permanent: false,
    },
  };
}
export default function PruebaGit() {
  return (
    <div>
      <AuthComponent />
    </div>
  );
}
