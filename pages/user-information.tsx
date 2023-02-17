import { auth } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import { getStorage, ref } from "firebase/storage";
import Head from "next/head";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import logo from "../public/Instagram_logo.png";

type Inputs = {
  displayName: string;
  profilePic: FileList;
};

export default function SetUser() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const { user, addUsername, uploadProfileImg } = useAuth();
  const [fileSizeError, setFileSizeError] = useState<string | undefined>();
  const onSubmit: SubmitHandler<Inputs> = ({ displayName, profilePic }) => {
    addUsername(displayName);
    uploadProfileImg(profilePic[0]);
    router.push("/");
  };
  console.log(user);
  const validateFileSize = (value: FileList) => {
    const file = value[0];
    if (file && file.size > 1000000) {
      setFileSizeError("File size should be less than 1mb");
      return false;
    } else {
      setFileSizeError(undefined);
      return true;
    }
  };

  if (user?.displayName !== null) {
    router.push("/");
  }
  return (
    <>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col items-center max-w-xl mx-auto pt-[10vh]">
          <Image src={logo} alt="instagram logo" width={200} className="my-5" />

          <div className="space-y-3 flex flex-col  w-full">
            <>
              <h1 className="text-lg font-semibold">Set your profile</h1>
              <input
                className="basic-input"
                type="text"
                required
                placeholder="Username"
                {...register("displayName")}
              />
              <label htmlFor="profilePic">
                Profile Picture, maxium size 1mb
              </label>
              <input
                id="profilePic"
                className="basic-input"
                type="file"
                required
                {...register("profilePic", {
                  validate: validateFileSize,
                })}
              />
              {fileSizeError && alert(fileSizeError)}
              <button type="submit" className="btn-primary">
                Submit
              </button>
            </>
          </div>
        </div>
      </form>
    </>
  );
}
