// src/app/page.tsx
"use client";

import ToastProvider from "./components/ToastProvider";

export default function Page() {
  return (
    <ToastProvider>
      <h1>Hello World</h1>
      {/* Your page content */}
    </ToastProvider>
  );
}
