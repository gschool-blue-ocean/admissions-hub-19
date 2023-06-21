import { create } from "zustand";

const useRatingStore = create((set) => ({
  rating1: null,
  rating2: null,
  rating3: null,
  setRating1: (num) => set(() => ({ rating1: num })),
  setRating2: (num) => set(() => ({ rating2: num })),
  setRating3: (num) => set(() => ({ rating3: num })),
}));

export default useRatingStore;