import { create } from "zustand";

const useUserStore = create((set) => ({
  userid: null,
  setUser: (num) => set(() => ({ userid: num })),
}));

export default useUserStore;
