import { LogOutIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { restartTour } from "@/config/driverConfig";

interface UserMenuProps {
  user: {
    name?: string;
    email: string;
    profile_picture?: string;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-auto p-0 hover:bg-transparent'>
          <Avatar>
            {user.profile_picture ? (
              <AvatarImage
                src={user.profile_picture}
                alt={user.name || user.email}
              />
            ) : (
              <AvatarFallback>
                {user.name?.[0] || user.email?.[0]}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='max-w-64' align='end'>
        <DropdownMenuLabel className='flex min-w-0 flex-col'>
          <span className='text-foreground truncate text-sm font-medium'>
            {user.name || user.email}
          </span>
          <span className='text-muted-foreground truncate text-xs font-normal'>
            {user.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon size={16} className='opacity-60' aria-hidden='true' />
          <span>Logout</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={restartTour}>
          <LogOutIcon size={16} className='opacity-60' aria-hidden='true' />
          <span>Restart Tour</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
