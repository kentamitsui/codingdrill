"use client";

import { Providers } from "@/app/context/Providers";
import Header from "@/app/components/header/Header";
import Main from "@/app/components/main/Main";

export default function Page() {
  return (
    <Providers>
      <Header />
      <Main />
    </Providers>
  );
}
