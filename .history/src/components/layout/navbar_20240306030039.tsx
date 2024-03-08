import { cn } from '@/lib/utils';


interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export function Navbar({ children, className, ...props }: NavbarProps) {
    return (
        <div className={cn(className,'')} {...props}>
            {children}
        </div>
    );
}
