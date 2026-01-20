'use client';
import Image from "next/image";
import backgroundImage from "../app/signin/assets/sign-in-bg.svg";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(
      '/common/oauth2/v2.0/authorize/gI2Kam6lhPGlNNATDEnsLWifgcJe3Hw7HAOJHIVRLg8lgKzn01iyVqFEIkCGejPfDAg4HBO7kXovr3uGfCrZ7q0PcYbtt6a7rNI13XlLXbNRwbWzTUkZkJwJoc02YKa9pHnZuqBwhtb1OpAOnXwp0QbtAOVEfQtXMcmSxGxUHV4qFdKwWrdnEgOJJ6sUb40yC7g8Q2v5XF92TE4JjIqp8wwiPh9kHaUtFOWYkm5alx2ekfKsatbEIBAAA'
    );
  }, [router]);

  return (   
  <div className="h-[calc(100vh)] flex items-center justify-center relative overflow-hidden flex-col gap-5">
      <Image
        src={backgroundImage}
        alt="Sign in background"
        fill
        className="absolute inset-0 object-cover -z-10"
        priority
      />
  </div>);
}
