"use client"; // Add this if not already present

import React, { useState } from "react"; // Import useState
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button"; // Import Button
import { MenuIcon, XCircleIcon, User, LogOut } from "lucide-react"; // Import Menu and X icons
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import pages from "@/pages";
import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/consts";

interface SessionUser {
  email?: string | null
  name?: string | null
  image?: string | null
  role?: string
}

export default function NavMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex items-center justify-between w-full px-6 py-2 relative">
      {/* Logo on the left */}
      <Link href={"/"} className="z-20">
        <Image alt="s4s logo" src={"/s4s-trans.png"} width={75} height={75} />
      </Link>

      {/* Desktop NavigationMenu component on the right */}
      <div className="hidden lg:flex">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-4">
            {pages.map((page: { url: string; title: string }, index) => (
              <Link key={index} href={page.url} className="flex items-center justify-center ">
                <NavigationMenuItem className="p-3 rounded-md hover:bg-accent font-bold text-lg ">
                  {page.title}
                </NavigationMenuItem>
              </Link>
            ))}
            
            {session ? (
              // Logged in user
              <NavigationMenuItem className="p-3 rounded-md font-bold text-lg">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user?.image || ""} />
                        <AvatarFallback>
                          {session.user?.name?.charAt(0) || <User className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block">{session.user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        My Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {(session.user as SessionUser)?.role === 'ADMIN' && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin">
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            ) : (
              // Not logged in
              <>
                <NavigationMenuItem className="p-3 rounded-md font-bold text-lg">
                  <Link href="/auth/signin">
                    <Button variant="ghost" className="font-bold text-lg">
                      Sign In
                    </Button>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="p-3 rounded-md font-bold text-lg">
                  <Link href="/auth/signup">
                    <Button className="font-bold text-lg">
                      Sign Up
                    </Button>
                  </Link>
                </NavigationMenuItem>
              </>
            )}
            <NavigationMenuItem className="relative group/signup p-3 rounded-md font-bold text-lg ml-[-4]">
              <span className="cursor-pointer hover:bg-accent rounded-md p-3 text-blue-600">More</span>
              <div className="absolute right-0 mt-2 w-56 bg-background border border-gray-200 rounded-md shadow-lg opacity-0 group-hover/signup:opacity-100 group-hover/signup:visible invisible transition-opacity z-30">
                <div className="flex flex-col">
                  <Link href={LINKS.webinarRSVP} target="_blank" className="px-4 py-3 hover:bg-accent rounded-t-md">RSVP for Webinar</Link>
                  <Link href={LINKS.calendly} target="_blank" className="px-4 py-3 hover:bg-accent rounded-b-md">Mentor Connect!</Link>
                </div>
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Hamburger Menu Button for mobile */}
      <div className="lg:hidden relative z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <XCircleIcon className="h-8 w-8" />
          ) : (
            <MenuIcon className="h-8 w-8" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-0 left-0 w-full h-screen bg-background z-10 flex flex-col items-center justify-center space-y-6">
          {pages.map((page: { url: string; title: string }, index) => (
            <Link
              key={index}
              href={page.url}
              onClick={toggleMobileMenu}
              className="text-2xl font-bold hover:text-accent-foreground"
            >
              {page.title}
            </Link>
          ))}
          
          {session ? (
            // Logged in user mobile menu
            <>
              <Link
                href="/dashboard"
                onClick={toggleMobileMenu}
                className="text-2xl font-bold hover:text-accent-foreground"
              >
                My Dashboard
              </Link>
              {(session.user as SessionUser)?.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  onClick={toggleMobileMenu}
                  className="text-2xl font-bold hover:text-accent-foreground"
                >
                  Admin Panel
                </Link>
              )}
              <Link
                href="/profile"
                onClick={toggleMobileMenu}
                className="text-2xl font-bold hover:text-accent-foreground"
              >
                Profile
              </Link>
              <Button
                onClick={() => {
                  handleSignOut();
                  toggleMobileMenu();
                }}
                variant="ghost"
                className="text-2xl font-bold text-red-600 hover:text-red-700"
              >
                Sign Out
              </Button>
            </>
          ) : (
            // Not logged in mobile menu
            <>
              <Link
                href="/auth/signin"
                onClick={toggleMobileMenu}
                className="text-2xl font-bold hover:text-accent-foreground"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                onClick={toggleMobileMenu}
                className="text-2xl font-bold hover:text-accent-foreground"
              >
                Sign Up
              </Link>
              <Link href={LINKS.webinarRSVP} target="_blank" className="text-2xl font-bold hover:text-accent-foreground">RSVP for Webinar</Link>
              <Link href={LINKS.calendly} target="_blank" className="text-2xl font-bold hover:text-accent-foreground">Connect with a Mentor</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
