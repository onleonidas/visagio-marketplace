import { IoIosNotifications } from "react-icons/io";
import { Toast, ToastToggle } from 'flowbite-react';
import { ToastProps } from "../types/ToastInterface";

export const CustomToast = ({index, message}: ToastProps) => {

    return (
        <Toast key={index}>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-500">
                <IoIosNotifications className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <ToastToggle />
        </Toast>
    );
};
