import { cn } from '@/lib/utils';


interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}

export default function Navbar({  className,children, ...props }: NavbarProps) {
    return (
        <div className={cn(className,'')} {...props}>
           {children}
        </div>
    );
}
