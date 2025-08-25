"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navigationItems = [
    { href: "/", label: "Beranda" },
    { href: "/about", label: "Tentang Elhusain.Travel" },
    { href: "/paket", label: "Paket Elhusain" },
    { href: "/artikel", label: "Artikel & Blog" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50 max-w-full overflow-hidden">
      <div className="max-w-full px-2 sm:px-4 mx-auto">
        <div className="flex justify-between items-center h-16 min-w-0">
          {/* Logo */}
          <div className="flex-shrink-0 min-w-0">
            <Link href="/" className="block">
              <Image
                src="/logo-elhusain.png"
                alt="El Husain Travel Logo"
                width={100}
                height={65}
                priority
                className="max-h-8 w-auto max-w-full"
              />
            </Link>
          </div>

          {/* Desktop Navigation (shows on md and up) */}
          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6 md:flex-wrap flex-1 justify-end min-w-0">
            <div className="flex items-center space-x-4 lg:space-x-6 flex-wrap">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-amber-800 py-2 text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Button className="bg-amber-800 hover:bg-amber-700 text-white ml-4 whitespace-nowrap flex-shrink-0">
              Hubungi Kami
            </Button>
          </div>

          {/* Mobile Navigation (shows below md) */}
          <div className="md:hidden flex-shrink-0">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-72 sm:w-80 max-w-[90vw] overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigasi Utama</SheetTitle>
                  <SheetDescription className="sr-only">
                    Menu navigasi untuk situs Elhusain Travel.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col h-full">
                  {/* Logo in sidebar */}
                  <div className="flex items-center mb-6">
                    <Link href="/">
                      <Image
                        src="/logo-elhusain.png"
                        alt="El Husain Travel Logo"
                        width={100}
                        height={65}
                        priority
                        className="max-h-10 w-auto max-w-full"
                      />
                    </Link>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex-1">
                    <div className="space-y-2">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-800 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </nav>

                  {/* Contact Button in sidebar */}
                  <div className="mt-auto pt-4">
                    <Button className="w-full bg-amber-800 hover:bg-amber-700 text-white">
                      Hubungi Kami
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
