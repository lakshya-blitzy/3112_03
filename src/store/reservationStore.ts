import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TableReservation } from '../types';

interface ReservationStore {
  reservations: TableReservation[];
  currentReservation: TableReservation | null;
  isLoading: boolean;
  error: string | null;
  makeReservation: (
    userId: string,
    date: string,
    time: string,
    partySize: number,
    specialRequests?: string
  ) => Promise<TableReservation>;
  cancelReservation: (reservationId: string) => void;
  getUserReservations: (userId: string) => TableReservation[];
  getAvailableTimes: (date: string) => string[];
}

// Available time slots
const TIME_SLOTS = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30', '20:00', '20:30', '21:00'
];

// Total tables available
const TOTAL_TABLES = 15;

export const useReservationStore = create<ReservationStore>()(
  persist(
    (set, get) => ({
      reservations: [],
      currentReservation: null,
      isLoading: false,
      error: null,

      makeReservation: async (
        userId: string,
        date: string,
        time: string,
        partySize: number,
        specialRequests?: string
      ): Promise<TableReservation> => {
        set({ isLoading: true, error: null });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Check availability
        const existingReservations = get().reservations.filter(
          (r) => r.date === date && r.time === time && r.status !== 'cancelled'
        );

        if (existingReservations.length >= TOTAL_TABLES) {
          set({ isLoading: false, error: 'No tables available for this time slot.' });
          throw new Error('No tables available');
        }

        // Find an available table
        const bookedTables = existingReservations.map((r) => r.tableNumber);
        let tableNumber = 1;
        while (bookedTables.includes(tableNumber) && tableNumber <= TOTAL_TABLES) {
          tableNumber++;
        }

        const newReservation: TableReservation = {
          id: crypto.randomUUID(),
          userId,
          date,
          time,
          partySize,
          tableNumber,
          specialRequests,
          status: 'confirmed',
          createdAt: new Date(),
        };

        set((state) => ({
          reservations: [...state.reservations, newReservation],
          currentReservation: newReservation,
          isLoading: false,
        }));

        return newReservation;
      },

      cancelReservation: (reservationId: string) => {
        set((state) => ({
          reservations: state.reservations.map((r) =>
            r.id === reservationId ? { ...r, status: 'cancelled' as const } : r
          ),
        }));
      },

      getUserReservations: (userId: string) => {
        return get().reservations.filter((r) => r.userId === userId);
      },

      getAvailableTimes: (date: string) => {
        const reservations = get().reservations.filter(
          (r) => r.date === date && r.status !== 'cancelled'
        );

        return TIME_SLOTS.filter((time) => {
          const reservationsAtTime = reservations.filter((r) => r.time === time);
          return reservationsAtTime.length < TOTAL_TABLES;
        });
      },
    }),
    {
      name: 'burger-palace-reservations',
    }
  )
);
