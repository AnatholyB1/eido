import { cn } from '@/lib/utils';
import Link from "next/link"
import { isAdmin } from '../../../lib/session';




type NavbarLink = {
    href: string;
    label: string;
    icon?: React.ReactNode;
    isNotAdmin?: boolean;
}

interface NavbarLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    children?: React.ReactNode;
    className?: string;
    isNotAdmin?: boolean;
    href: string;
}

interface LinksProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    links:NavbarLink[]
}



const navbarLinks: NavbarLink[] = [
    { href: '/', label: 'Eido', isNotAdmin : false, icon: <svg
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
    { href: '/login', label: 'Login',  isNotAdmin : false},
    { href: '/register', label: 'Register' , isNotAdmin : false},
    { href: '/dashboard', label: 'Dashboard', isNotAdmin: isAdmin() },
    { href: '/admin', label: 'Admin', isNotAdmin: isAdmin()  },
];


export function NavbarLink({ children, className, href, ...props }: NavbarLinkProps) {
    return (
        <Link
            className={cn(className, `px-4 flex flex-grow text-lg font-medium ${props.isNotAdmin &&'hidden'}`)}
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



export default function Navbar({  className,children, ...props }: NavbarProps) {
    return (
        <div className={cn(className, 'flex flex-row items-center justify-between w-full h-[5rem] border-b shadow-sm fixed bg-white/95 py-2 px-6' )} {...props}>
            <Links links={navbarLinks} className='hidden lg:flex'/>
            {children}
        </div>
    );
}
