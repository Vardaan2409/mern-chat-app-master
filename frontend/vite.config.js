import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173,
		proxy: {
			"/api": {
				target: "https://mern-chat-app-master-p2il.onrender.com",
				changeOrigin: true,
			},
		},
	},
});
