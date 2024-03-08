import { cn } from '@/lib/utils';


interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}

export function Navbar({ children, className, ...props }: NavbarProps) {
    return (
        <div className={cn(className,'')} {...props}>
            {children}
        </div>
    );
}
