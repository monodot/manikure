import { defineStore } from 'pinia'

export const usePreferencesStore = defineStore({
    id: 'preferences',
    state: () => ({
        theme: 'dark',
        showSidebar: true,
        codeViewLanguage: 'yaml',
    }),
})
