'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@uidu/navigation-menu-ui'
import Link from 'next/link'

export default function MainHeader() {
  return (
    <nav className="hidden gap-4 md:flex items-center justify-start p-1 ">
      <NavigationMenu>
        <NavigationMenuList className='gap-2' >
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Components
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[300px] p-2">
                {navigationItemsLinks.map((item) => (
                  <NavigationMenuLink key={item.href} asChild>
                    <Link
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                      href={item.href}
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">{item.title}</div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                        {item.description}
                      </div>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="font-medium tracking-wide" href="#">
              Documentation
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="font-medium tracking-wide" href="#">
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}


const navigationItemsLinks = [
  {
    href: "docs/navigation",
    title: "Navigation",
    description: "Navigation components are used to make your app better",
  },
  {
    href: "docs/core/avatar",
    title: "Core",
    description: "Core components are used to make your app better",
  },
  {
    href: "docs/forms",
    title: "Forms",
    description: "Forms components are used to make your app better",
  },
  {
    href: "docs/panels",
    title: "Panels",
    description: "Panels components are used to make your app better",
  },
]