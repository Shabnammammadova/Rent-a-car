import SettingsIcon from "@/assets/icons/settings.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import NofiticationIcon from "@/assets/icons/notification.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModalEnum, useDialog } from "@/hooks/useDialog";
import { logoutAsync, selectUserData } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { LogOut, User2Icon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserRole } from "@/types";
import { paths } from "@/constants/paths";

export const Actions = () => {
    const { openDialog } = useDialog()
    const { user } = useAppSelector(selectUserData)
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logoutAsync())
    }
    return (
        <div className="flex gap-3 lg:gap-5">
            <Link
                to="/"
                className="rounded-full border border-[#c3d4e966] opacity-80 hover:opacity-100 duration-75 p-2.5"
            >
                <img src={HeartIcon} alt="favorites icon" />
            </Link>
            <Link
                to="/"
                className="rounded-full border border-[#c3d4e966] opacity-80 hover:opacity-100 duration-75 p-2.5"
            >
                <img src={NofiticationIcon} alt="notification icon" />
            </Link>
            <Link
                to="/"
                className="rounded-full border border-[#c3d4e966] opacity-80 hover:opacity-100 duration-75 p-2.5"
            >
                <img src={SettingsIcon} alt="settings icon" />
            </Link>
            {user ?
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>

                        {user.avatar ? (
                            <button className="rounded-full border border-[#c3d4e966]  duration-75 ">
                                <img
                                    src={user.avatar}
                                    alt="User Avatar"
                                    className="rounded-full w-10 h-10 object-cover"
                                />
                            </button>

                        ) : (
                            <button className="rounded-full border border-[#c3d4e966]  duration-75 p-2.5 ">
                                <User2Icon color="#596780" />
                            </button>
                        )}



                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {
                            user.role === UserRole.Admin && <DropdownMenuItem asChild>
                                <Link to={paths.DASHBOARD.MAIN}>Dashboard</Link>
                            </DropdownMenuItem>
                        }
                        <DropdownMenuItem><Link to="/profile">Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link to="/reservation">Reservation</Link></DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}> <LogOut />
                            <span>Log out</span>
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                : <Button onClick={() => openDialog(ModalEnum.LOGIN)}
                >
                    Sign in
                </Button>}

        </div >
    );
};
