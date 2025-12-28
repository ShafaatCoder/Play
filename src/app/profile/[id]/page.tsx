import React from "react";

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">User Profile:
        <span className="p-2 rounded bg-orange-500">{id}</span> </h1>
      <hr className="w-1/2 my-4" />
    </div>
  );
}
