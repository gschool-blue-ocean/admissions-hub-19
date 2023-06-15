import { create } from "zustand";

const useUserStore = create((set) => ({
  userid: null,
  studentId: null,
  setStudentId: (num) => set(() => ({ studentId: num })),
  setUserId: (num) => set(() => ({ userid: num })),
}));

export default useUserStore;
