"use client";

import WithAuth from "@/hoc/with-auth";
import dynamic from "next/dynamic";

const DashboardPage = () => {
  return (
    <WithAuth requireAuth={true} redirectTo="/sign-in">
      <div>
        <h1>Dashboard</h1>
      </div>
    </WithAuth>
  );
};

export default dynamic(() => Promise.resolve(DashboardPage), { ssr: false });
