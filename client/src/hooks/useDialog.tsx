import { create } from 'zustand';

export enum ModalEnum {
    LOGIN = "login",
    REGISTER = "register"
}

interface DialogState {
    type: ModalEnum | null;
    isOpen: boolean;
    openDialog: (type: ModalEnum) => void;
    closeDialog: () => void
}

export const useDialog = create<DialogState>((set) => ({
    type: null,
    isOpen: false,
    openDialog: (type: ModalEnum) => set({ type, isOpen: true }),
    closeDialog: () => set({ isOpen: false, type: null })
}));
