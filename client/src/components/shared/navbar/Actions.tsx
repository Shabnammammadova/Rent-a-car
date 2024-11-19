import SettingsIcon from "@/assets/icons/settings.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import NofiticationIcon from "@/assets/icons/notification.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModalEnum, useDialog } from "@/hooks/useDialog";

export const Actions = () => {
    const { openDialog } = useDialog()
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
            <Button onClick={() => openDialog(ModalEnum.LOGIN)}
            >
                Sign in
            </Button>
        </div >
    );
};
