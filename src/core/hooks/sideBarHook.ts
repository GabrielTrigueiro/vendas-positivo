import { create } from "zustand";

interface IProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSideBarHook = create<IProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSideBarHook;
