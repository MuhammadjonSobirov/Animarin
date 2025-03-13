import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

let useStore = (set) => {
    return {
        drawer: false,
        search: "",
        selectedGenres: [],
        tickets: [],
        paidTickets: [],
        favorites: [], // 🌟 FAVORITE ANIMELAR SAQLANADI

        setSelectedGenres: (genres) => set({ selectedGenres: genres }),
        setSearch: (query) => set({ search: query }),
        toggleDrawer: () => set((state) => ({ drawer: !state.drawer })),
        setTicket: (ticket) => set((state) => ({ tickets: [...state.tickets, ticket] })),
        deleteTicket: (id) => set((state) => ({ tickets: state.tickets.filter((ticket) => ticket.id !== id) })),

        // 🌟 FAVORITELARNI BOSHQARISH
        addFavorite: (anime) => set((state) => {
            const isAlreadyFavorite = state.favorites.some((fav) => fav.animeId === anime.animeId);
            if (!isAlreadyFavorite) {
                return { favorites: [...state.favorites, anime] };
            }
            return state;
        }),

        removeFavorite: (id) => set((state) => ({
            favorites: state.favorites.filter((fav) => fav.animeId !== id)
        })),
    }
}
;

useStore = devtools(useStore);
useStore = persist(useStore, { name: "anime-store" });

export default create(useStore);
