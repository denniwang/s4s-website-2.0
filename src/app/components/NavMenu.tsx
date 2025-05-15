import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import pages from "@/pages";
import Link from "next/link";

export default function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {pages.map((page: { url: string; title: string }, index) => (
          <Link href={page.url} key={index}>
            <NavigationMenuLink>{page.title}</NavigationMenuLink>
          </Link>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
