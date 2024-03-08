import { cn } from '@/lib/utils';


interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}



export default function Navbar({  className,children, ...props }: NavbarProps) {
    return (
        <div className={cn(className,'flex flex-row items-center justify-between w-full h-[5rem] border-b shadow-sm fixed bg-white/95')} {...props}>
            {children}
        </div>
    );
}
