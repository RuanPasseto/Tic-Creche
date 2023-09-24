import { ChevronDown } from "lucide-react";
import { useRouter } from 'next/navigation';

interface NavItemProps {
  title: string;
  icon: React.ElementType;
  route: string; // Nova prop para especificar a rota
}

export function NavItem({ title, icon: Icon, route }: NavItemProps) {
  const router = useRouter();

  const handleNavItemClick = () => {
    router.push(route); // Use a rota especificada na prop "route"
  };

  return (
    <a
      href="#"
      className="group flex items-center gap-3 rounded px-3
        py-2 border border-transparent bg-zinc-500
        hover:bg-sky-500 hover:border hover:border-white"
      onClick={handleNavItemClick}
    >
      <Icon className="h-5 w-5 text-zinc-50" />
      <span className="font-medium text-zinc-50 group-hover:text-violet-200">
        {title}
      </span>
      <ChevronDown className="ml-auto h-5 w-5 text-zinc-50 group-hover:text-red-500" />
    </a>
  );
}
