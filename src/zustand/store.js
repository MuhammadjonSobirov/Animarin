
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

let useStore = (set) => {
    return {
        drawer: false,
        search: "",
        selectedGenres: [], // Инициализация пустым массивом
        setSelectedGenres: (genres) => set({ selectedGenres: genres }),
        setSearch: (query) => set({ search: query }),
        toggleDrawer: () => set((state) => ({ drawer: !state.drawer })),
    }
}

useStore = devtools(useStore)

useStore = persist(useStore, {
    name: 'drawer'
})

export default create(useStore)