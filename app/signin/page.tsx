"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import backgroundImage from "./assets/sign-in-bg.svg";
import mcsoftLogo from "./assets/mic-ic.svg";
import LoginPhase from "./components/loginphase";
import Key from "./assets/key.svg";
import loading from "./assets/loading.gif";

type LoginPhaseType = 'email' | 'password' | 'optionsemail' | 'options';

export default function SignInPage() {
  const [phase, setPhase] = useState<LoginPhaseType>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="h-[calc(100vh)] flex items-center justify-center relative overflow-hidden flex-col gap-5">
      {isMounted && isLoading && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
          <Image
            src={loading}
            alt="Loading"
            width={60}
            height={60}
            priority
          />
        </div>
      )}
      <Image
        src={backgroundImage}
        alt="Sign in background"
        fill
        className="absolute inset-0 object-cover -z-10"
        priority
      />
      <div className="mb-7 flex flex-col gap-5">
      <div className="bg-white p-11 shadow-lg mx-auto w-110">
        <Image
          src={mcsoftLogo}
          alt="McSoft Logo"
          width={108}
          height={24}
          className=""
          priority
        />
        <LoginPhase phase={phase} setPhase={setPhase} />
      </div>

      {phase === 'email' && (
        <div
          style={{ fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif' }}
          className="bg-white py-2 px-11 shadow-lg mx-auto w-110 cursor-pointer hover:bg-gray-200"
          onClick={() => setPhase('options')}
        >
          <div className="flex flex-row items-center">
            <Image
              src={Key}
              alt="Key"
              width={32}
              height={32}
              className=""
              priority
            />
            <div className="text-[#1b1b1b] px-3 text-[15px]">Sign-in options</div>
          </div>
        </div>
      )}
      </div>
      </div>
  );
}
