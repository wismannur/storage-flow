"use client";

import { withAuth } from "@/hoc/withAuth";

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default function ProtectedDashboardPage() {
  return withAuth({
    children: <DashboardPage />,
    requireAuth: true,
    redirectTo: "/sign-in",
  });
}
