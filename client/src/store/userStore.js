import { create } from "zustand";

const useUserStore = create((set) => ({
  userid: null,
  studentId: null,
  setStudentId: (num) => set(() => ({ studentId: num })),
  setUserId: (num) => set(() => ({ userid: num })),
  attempts: null,
  setAttempts: (num) => set(() => ({ userid: num })),
}));

export default useUserStore;
