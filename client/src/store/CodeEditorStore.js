import { create } from "zustand";

const useCodeEditorStore = create((set) => ({
  clientID: null,
  setClientID: (newClientID) => set({ clientID: newClientID }),
  content: null,
  setContent: (newContent) => set({ content: newContent }),
}));

export default useCodeEditorStore;
