"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/forms/AuthForm";
import { getSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    if (!session?.token || !session?.user) return;
    router.replace(session.user.role === "admin" ? "/admin" : "/");
  }, [router]);

  return <AuthForm mode="login" />;
}
