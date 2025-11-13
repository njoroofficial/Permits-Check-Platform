"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import Image from "next/image";
// import { getCurrentUser } from "@/app/actions/user";
// import { useEffect, useState } from "react";

type UserRole = "CITIZEN" | "OFFICER";

interface CurrentUser {
  user: {
    role: UserRole;
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    idNumber: string | null;
    isActive: boolean;
  };
}

export function DashboardHeader({ user }: CurrentUser) {
  //   handle user logout
  const handleLogout = async () => {
    await signOut();
  };

  //   dashboard link based on user roles
  const dashboardLink =
    user?.role === "OFFICER" ? "/officer-dashboard" : "/dashboard";
  const navItems =
    user?.role === "OFFICER"
      ? [
          { href: "/officer-dashboard", label: "Dashboard" },
          {
            href: "/officer-dashboard/applications",
            label: "All Applications",
          },
          { href: "/officer-dashboard/reports", label: "Reports" },
        ]
      : [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/applications", label: "My Applications" },
          { href: "/apply", label: "Apply Now" },
        ];
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={dashboardLink} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Image
                src="/assets/muranga-logo.png"
                alt="Muranga Logo"
                width={40}
                height={40}
              />
            </div>
            <div>
              <h1 className="font-bold text-lg text-balance">
                Murang'a County
              </h1>
              <p className="text-sm text-muted-foreground">
                Permits & Licensing
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.firstName?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">
                    {user?.firstName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground capitalize">
                    {user?.role}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
