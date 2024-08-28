'use client'
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Home() {
  const count = useSelector((state: RootState) => state.record.value)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Hello world {count}</p>
    </main>
  );
}
