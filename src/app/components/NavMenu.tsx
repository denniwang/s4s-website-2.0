"use client"; // Add this if not already present

import React, { useState } from "react"; // Import useState
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button"; // Import Button
import { MenuIcon, XCircleIcon} from "lucide-react"; // Import Menu and X icons

import pages from "@/pages";
import Image from "next/image";
import Link from "next/link";

export default function NavMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
              <Link key={index} href={page.url}>
                <NavigationMenuItem className="p-3 rounded-md hover:bg-accent font-bold text-lg">
                  {page.title}
                </NavigationMenuItem>
              </Link>
            ))}
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
              onClick={toggleMobileMenu} // Close menu on link click
              className="text-2xl font-bold hover:text-accent-foreground"
            >
              {page.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
