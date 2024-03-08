import { cn } from '@/lib/utils';
import Link from "next/link"
import { isAdmin } from '../../../lib/session';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';







type NavbarLink = {
    href: string;
    label: string;
    icon?: React.ReactNode;
    isnotadmin?: boolean;
}

interface NavbarLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    children?: React.ReactNode;
    className?: string;
    isnotadmin?: boolean;
    href: string;
}

interface LinksProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    links:NavbarLink[]
}

const admin = isAdmin()

const navbarLinks: NavbarLink[] = [
    { href: '/', label: 'Eido', isnotadmin : false, icon: <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
                >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg> },
    { href: '/login', label: 'Login',  isnotadmin : false},
    { href: '/register', label: 'Register' , isnotadmin : false},
    { href: '/dashboard', label: 'Dashboard', isnotadmin: admin },
    { href: '/admin', label: 'Admin', isnotadmin: admin },
];


export function NavbarLink({ children, className, href, ...props }: NavbarLinkProps) {
    return (
        <Link
            className={cn( `px-4 flex flex-grow text-lg font-medium ${props.isnotadmin &&'hidden'}`, className)}
            href={href}
            {...props}  
        >
            {children}
        </Link>
    );
}


export function Links({ children, className, links, ...props }: LinksProps) {
    return (
        <div className={cn( 'flex flex-row items-center justify-around',className )} {...props}>
            {links.map((link, index) => (
                <NavbarLink  key={index} {...link}>
                    {link.icon && link.icon}
                    {link.label}
                </NavbarLink>
            ))}
            {children}
        </div>
    );
}


interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}


export function BurgerMenu({ className, children, ...props }: NavbarProps) {
    return (

             <Sheet {...props}>
                <SheetTrigger className={cn('flex flex-row items-center justify-around', className)}>{children}</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <Links links={navbarLinks} className='sm:hidden flex flex-col py-10 gap-4 justify-start items-start'/>
                </SheetContent>
            </Sheet>
    );
}



export default function Navbar({  className,children, ...props }: NavbarProps) {
    return (
        <div className={cn( 'flex flex-row items-center justify-between  w-full h-[5rem] border-b shadow-sm fixed bg-white/95 py-2 px-6',className )} {...props}>
            <Links links={navbarLinks} className='hidden sm:flex' />
            <Link href={'/'}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-6 w-6 sm:hidden"
                >
                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg> 
            </Link>
            {children}
            <BurgerMenu className='sm:hidden'><Menu/></BurgerMenu>
        </div>
    );
}
