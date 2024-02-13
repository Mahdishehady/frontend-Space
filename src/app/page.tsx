"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Main() {
  const router = useRouter();
  useEffect(() => {
    // Navigate to the "/login" route when the component mounts
    router.push("/login");
  });
  return <></>;
}
