// src/components/LoginForm.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.jpg";
import google from "../../public/google.svg";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

 const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      console.log(idToken);
      

     const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, rememberMe }),
      });
      console.log(res);
      
      router.push('/');

    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="w-full max-w-md h-screen  lg:max-w-[400px] mx-auto overflow-scroll no-scrollbar py-8">
      <div className="mb-8 flex lg:justify-center ">
        <Image src={logo} alt="TSS Logo" className=" lg:w-[80px] w-[50px]" />
      </div>

      <h2 className="text-3xl font-semibold mt-12 lg:mt-0">Welcome Back 👋</h2>
      <p className="mt-2 text-gray-500 text-sm">
        Enter your email and password to access your account.
      </p>

      <form onSubmit={handleSignIn} className="mt-8">
        <div>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 outline-none block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        <div className=" mt-5">
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 outline-none block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between text-sm mt-3">
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="remember"
              className="ml-2 font-medium text-gray-700"
            >
              Remember me
            </label>
          </div>
          <Link href="#" className="font-medium text-accent hover:opacity-80">
            Forgot password
          </Link>
        </div>

        <div className=" mt-10">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-100 py-2 font-semibold text-white shadow-sm hover:bg-primary-50 outline-none"
          >
            Sign In
          </button>
          <button className=" mt-3 flex w-full items-center justify-center rounded-md bg-white py-2 font-medium text-gray-700 shadow-[1px_1px_3px_rgba(0,0,0,0.2)] hover:bg-gray-50">
            <Image src={google} alt="Google Logo" width={20} height={20} />
            <span className="ml-2">Sign in with Google</span>
          </button>
        </div>
      </form>

      <div className="mt-12 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link href="/sign-up" className="font-medium text-accent hover:opacity-80">
          Sign up
        </Link>
      </div>
    </div>
  );
}
