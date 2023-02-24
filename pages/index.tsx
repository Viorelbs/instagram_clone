import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/Content";
import SecondaryBar from "@/components/SecondaryBar";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import useAuth from "@/hooks/useAuth";
import windowWidth from "@/hooks/useWidth";
import { useRecoilState } from "recoil";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";

export default function Home() {
  const { user } = useAuth();

  if (!user) return;

  return (
    <>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {windowWidth() < 768 && <Header />}
        <div className="md:flex justify-between min-h-screen">
          {<Sidebar windowWidth={windowWidth()} />}
          <Content />
          {windowWidth() > 991 && <SecondaryBar />}
        </div>
      </main>
    </>
  );
}
