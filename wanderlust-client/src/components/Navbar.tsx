'use client'
import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";

const navLinks: { label: string; href: string; active?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
  // { label: "Admin", href: "/admin" },
];

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const handleSignOut = () => {
    authClient.signOut()
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Left: primary nav */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map(({ label, href, active }) => (
            <Link
              key={label}
              href={href}
              className={`border-b-2 pb-1 text-sm font-medium transition-colors ${active
                ? "border-[#15A1BF] text-[#15A1BF]"
                : "border-transparent text-foreground hover:text-[#15A1BF]"
                }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Center: logo (absolute on desktop, static on mobile) */}
        <Link
          href="/"
          aria-label="Wanderlast home"
          className="md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={130}
            height={30}
            priority
          />
        </Link>

        {/* Right: account actions */}
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-[#15A1BF]"
          >
            <UserRound size={15} />
            <span className="hidden sm:inline">Profile</span>
          </Link>

          {
            user ? <Popover>
              <PopoverTrigger render={<Avatar>
                <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>}>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>

                  <PopoverDescription>
                    <span className="block">
                      {user?.email}
                    </span>
                    <Button onClick={handleSignOut} variant="destructive">
                      Signout
                    </Button>
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover> : <>
              <Link
                href="/login"
                className="text-sm font-medium text-foreground transition-colors hover:text-[#15A1BF]"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium text-foreground transition-colors hover:text-[#15A1BF]"
              >
                Sign Up
              </Link>
            </>
          }




        </div>
      </div>
    </header>
  );
}