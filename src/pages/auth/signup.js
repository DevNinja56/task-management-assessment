import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Logo from "@/components/icon/logo";
import { GrFacebookOption } from "react-icons/gr";
import { ROUTES } from "@/config/routes";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import AuthContent from "@/components/pages/auth/authContent";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      if (res.status === 201) {
        // Redirect to sign-in page after successful registration
        router.push("/auth/signin");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary relative flex items-center justify-center py-3 lg:py-0">
      <div className="h-full w-full relative min-h-[100vh]">
        <Image
          height={802}
          width={1203}
          alt="AuthBackgroundImage"
          src="/images/AuthBackgroundImage4k.jpg"
          className="absolute w-full h-full top-0 -left-80 opacity-20 mix-blend-luminosity hidden 2xl:block animate-auth-image"
        />
        <Image
          height={802}
          width={1203}
          alt="AuthBackgroundImage"
          src={"/images/AuthBackgroundImage.svg"}
          className="absolute w-full h-full top-0 -left-[88px] opacity-20 animate-auth-image mix-blend-luminosity hidden lg:block 2xl:hidden"
        />
        <AuthContent />
        <div className="h-[94%] static lg:absolute top-6 right-0 rounded-[40px] bg-white/40 rounded-r-none w-5/12 hidden lg:block"></div>
        <form
          onSubmit={handleSubmit}
          className="static lg:absolute right-2 top-0 w-11/12 md:w-6/12 lg:w-2/5 h-full mx-auto lg:mx-0 bg-white rounded-xl lg:rounded-[40px] lg:rounded-r-none px-5 md:px-8 lg:px-14 xl:px-28 flex flex-col items-center gap-5 xl:gap-6 justify-center py-5 lg:py-0 shadow-lg lg:shadow-none"
        >
          <div className="flex lg:hidden items-center gap-2">
            <Logo height="20" width="20" color="primary" />
            <h1 className="text-secondary font-extrabold text-base lexend-deca-font">
              Taskmaster Pro
            </h1>
          </div>
          <div className="flex items-center gap-4 w-full">
            <h1 className="font-semibold text-xl lg:text-2xl xl:text-3xl text-secondary">
              Seconds to sign up!
            </h1>
            <Logo height="30" width="30" color="primary" />
          </div>
          <Input
            onChange={(e) => setName(e.target.value)}
            placeHolder="Name"
            padding="py-2 lg:py-4"
            value={name}
            className="border-b border-primary/20 w-full focus:border-primary text-sm lg:text-base"
          />
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeHolder="Email"
            padding="py-2 lg:py-4"
            value={email}
            className="border-b border-primary/20 w-full focus:border-primary text-sm lg:text-base"
          />
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeHolder="Password"
            padding="py-3 lg:py-4"
            value={password}
            errors={error}
            className="border-b border-primary/20 w-full focus:border-primary text-sm lg:text-base"
          />
          <Button
            text="Sign Up"
            padding="py-3 lg:py-4"
            radius="rounded-[51px]"
            className="w-full text-sm lg:text-base"
            animation
          />
          <p className="text-sm text-secondary">Or</p>
          <div className="flex items-center gap-3 w-full">
            <Button
              radius="rounded-[30px]"
              padding="py-3 lg:py-4"
              text="Facebook"
              buttonColor="white"
              color="secondary"
              className="border border-primary/20 w-full text-sm lg:text-base"
              icon={
                <GrFacebookOption className="text-xl text-blue-800 min-w-fit" />
              }
            />
            <Button
              radius="rounded-[30px]"
              padding="py-3 lg:py-4"
              text="Google"
              buttonColor="white"
              color="secondary"
              className="border border-primary/20 w-full text-sm lg:text-base"
              image={
                <Image
                  height={20}
                  width={20}
                  alt="google"
                  src="/images/Google.svg"
                />
              }
            />
          </div>
          <h1
            onClick={() => router.push(ROUTES.SIGN_IN)}
            className="text-sm roboto-font text-gray cursor-pointer lg:mt-6"
          >
            Don't have an account?{" "}
            <span className="text-primary font-semibold">Login</span>
          </h1>
        </form>
      </div>
    </div>
  );
}

SignUp.layout = {
  layout: "none",
};
