// src/app/components/ToastProvider.tsx
"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export default function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
