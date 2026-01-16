// src/components/LoginForm.tsx
"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.jpg";
import google from "../../public/google.svg";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirebaseApp } from "@/config/firebase";
import { useRouter } from "next/navigation";
const { auth } = getFirebaseApp();

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await res.user.getIdToken();
      const user = res.user;

      await updateProfile(user, {
        displayName: username,
      });
      console.log(user);
      

      await fetch("../app/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, rememberMe }),
      });

      router.push("/");
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-md h-screen  lg:max-w-[400px] mx-auto overflow-scroll no-scrollbar py-8">
      <div className="mb-8 flex lg:justify-center ">
        <Image src={logo} alt="TSS Logo" className=" lg:w-[80px] w-[50px]" />
      </div>
      <div className=" lg:text-center">
        <h2 className="text-3xl font-semibold mt-12 lg:mt-0">
          Create Your Account
        </h2>
        <p className="mt-2 text-gray-500 text-sm">
          Enter details to create your account.
        </p>
      </div>

      <form onSubmit={handleSignUp} className="mt-8">
        <div>
          <label htmlFor="email" className=" text-sm">
            Email
          </label>
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
          <label htmlFor="username" className=" text-sm">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 outline-none block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your username"
          />
        </div>

        <div className=" mt-5">
          <label htmlFor="password" className=" text-sm">
            Password
          </label>
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
            Sign Up
          </button>
          <button className=" mt-3 flex w-full items-center justify-center rounded-md bg-white py-2 font-medium text-gray-700 shadow-[1px_1px_3px_rgba(0,0,0,0.2)] hover:bg-gray-50">
            <Image src={google} alt="Google Logo" width={20} height={20} />
            <span className="ml-2">Sign in with Google</span>
          </button>
        </div>
      </form>

      <div className="mt-12 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-accent hover:opacity-80"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
