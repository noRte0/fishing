"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TroyPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if user tries to access this protected route
    router.push("/mock/troy/horse/sleep/d3d/signin");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          Please sign in to access this page.
        </p>
        <div className="text-gray-400 text-sm">Redirecting to login...</div>
      </div>
    </div>
  );
}
