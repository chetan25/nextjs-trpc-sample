import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type NameStoreType = {
  name: string | null;
  setName: (userName: string) => void;
};

export const useNameStore = create<NameStoreType>()(
  persist(
    (set) => ({
      name: null,
      setName: (userName: string) => set(() => ({ name: userName })),
    }),
    {
      name: "user-name", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
