import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Aside from "@/components/Aside";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Aside></Aside>
      <div className="px-15 py-10 w-full">{children}</div>
    </>
  );
}
