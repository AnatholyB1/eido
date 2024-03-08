import { cn } from '@/lib/utils';


interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}

export default function Navbar({  className,children, ...props }: NavbarProps) {
    return (
        <header className={cn(className,'w-full h-11 border-b shadow-sm')} {...props}>
           {children}
        </header>
    );
}
