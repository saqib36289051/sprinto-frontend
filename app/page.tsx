'use client'
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const count = useSelector((state: RootState) => state.record.value)
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);
  return (
    <main className="flex">

    </main>
  );
}
