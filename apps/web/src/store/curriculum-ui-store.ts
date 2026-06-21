import { create } from "zustand";
import { persist } from "zustand/middleware";

type CurriculumUiState = {
  openNodeIds: string[];
  toggleNode: (id: string) => void;
  setOpenNodeIds: (ids: string[]) => void;
};

export const useCurriculumUiStore = create<CurriculumUiState>()(
  persist(
    (set) => ({
      openNodeIds: [],

      toggleNode: (id) =>
        set((state) => ({
          openNodeIds: state.openNodeIds.includes(id)
            ? state.openNodeIds.filter((n) => n !== id)
            : [...state.openNodeIds, id],
        })),

      setOpenNodeIds: (ids) => set({ openNodeIds: ids }),
    }),
    { name: "tot-opos:curriculum-ui" },
  ),
);
