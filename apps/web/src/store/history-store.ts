import type { FixedAttempt, IndefiniteSession } from "@tot-opos/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type HistoryState = {
  fixedAttempts: FixedAttempt[];
  indefiniteSessions: IndefiniteSession[];
  addFixedAttempt: (attempt: FixedAttempt) => void;
  addIndefiniteSession: (session: IndefiniteSession) => void;
};

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      fixedAttempts: [],
      indefiniteSessions: [],

      addFixedAttempt: (attempt) =>
        set((state) => ({
          fixedAttempts: [attempt, ...state.fixedAttempts],
        })),

      addIndefiniteSession: (session) =>
        set((state) => ({
          indefiniteSessions: [session, ...state.indefiniteSessions],
        })),
    }),
    { name: "tot-opos:history" },
  ),
);
