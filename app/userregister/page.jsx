"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import logoNet from "../../public/images/logo.png";
import Input from "@/components/Input";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import axios from "axios";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currVariant) =>
      currVariant === "login" ? "register" : "login"
    );
  }, []);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      // setEmail("");
      // setName("");
      // setPassword("");
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-10 py-2">
          <Image src={logoNet} alt="logo" className="h-12 w-48" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-90 px-16 py-16 self-center mt-2 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  id="name"
                  type="text"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                type={type}
                value={password}
                className="flex"
              />
              <span
                className="flex justify-end items-center"
                onClick={handleToggle}
              >
                <Icon
                  className="absolute mr-23 px-7 mb-20 bg-inherit"
                  icon={icon}
                  size={30}
                />
              </span>
            </div>
            <button
              className="
                        bg-red-700
                        py-3
                        text-white
                        rounded
                        w-full
                        mt-10
                        hover:bg-red-950
                        transition
                     "
              onClick={register}
            >
              {variant === "login" ? "Login" : "Sign Up"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
