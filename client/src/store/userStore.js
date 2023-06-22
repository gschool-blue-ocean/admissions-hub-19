import { create } from "zustand";

const useUserStore = create((set) => ({
  userid: null,
  setUserId: (num) => set(() => ({ userid: num })),
  studentId: null,
  setStudentId: (num) => set(() => ({ studentId: num })),
  studentName: null,
  setStudentName:(string) => set(() => ({ studentName: string })),
  attempts: null,
  setAttempts: (num) => set(() => ({ attempts: num })),
}));

export default useUserStore;
