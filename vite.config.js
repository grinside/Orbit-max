import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // Racine du projet
  publicDir: 'public', // Indique explicitement le dossier public
})