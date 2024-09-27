import Navbar from '@/components/login/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FormZelcore from '@/components/login/FormZelcore';
import Link from 'next/link';
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/", // Puedes redirigir a una página de "Próximamente" o similar
      permanent: false,
    },
  };
}
export default function ZelLogin() {
  return (
    <div>
      <Navbar />

      <FormZelcore />
    </div>
  );
}
