import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.10.158', // This will make the server accessible externally
    port: 5173, // Specify the port you want to use
  },
})


// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '192.168.10.149', // This will make the server accessible externally
//     port: 8000, // Specify the port you want to use
//   },
// });