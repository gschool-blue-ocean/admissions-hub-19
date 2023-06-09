import { create } from "zustand";

const useUserStore = create((set) => ({
  userid: null,
  setUserId: (num) => set(() => ({ userid: num })),
}));

export default useUserStore;
