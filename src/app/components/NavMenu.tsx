import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import pages from "@/pages";
import Link from "next/link";

export default function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {pages.map((page: { url: string; title: string }, index) => (
          <Link key={index} href={page.url}>
            <NavigationMenuItem className="p-3 rounded-md hover:bg-accent">
              {page.title}
            </NavigationMenuItem>
          </Link>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
