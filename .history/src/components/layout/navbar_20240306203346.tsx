import { cn } from '@/lib/utils';


interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}



export default function Navbar({  className,children, ...props }: NavbarProps) {
    return (
        <div className={cn(className, 'flex flex-row items-center justify-between w-full h-[5rem] border-b shadow-sm fixed bg-white/95')} {...props}>
            <div className="relative z-20 flex items-center text-lg font-medium">
                <svg
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
                </svg>
                Eido
            </div>
            {children}
        </div>
    );
}
