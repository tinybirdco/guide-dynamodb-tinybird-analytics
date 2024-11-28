"use client";

import { useContext } from "react";
import { redirect } from "next/navigation";
import UserContext from "@/stores/user";
import Container from "@/components/container";
import Header from "@/components/header";
import AdminDashboard from "@/components/admin_dashboard";

export default function Admin() {
  const { user } = useContext(UserContext);

  if (user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="h-screen">
      <Header className="sticky top-0 left-0 z-50" />
      <Container className="h-full" classNameContent="pt-6">
        <div className="col-span-full">
          <AdminDashboard user={user} />
        </div>
      </Container>
    </div>
  );
}
