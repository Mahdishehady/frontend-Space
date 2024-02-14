"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Main() {
  const router = useRouter();
  useEffect(() => {
    const email = localStorage.getItem("email");

    // Check if email is found in localStorage
    if (email) {
      // If email is found, navigate to "/example"
      router.push("/heightanomaly/analysis/tables");
    } else {
      // If email is not found, navigate to "/login"
      router.push("/login");
    }
  });
  return <></>;
}
