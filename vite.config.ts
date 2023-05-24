import { defineConfig } from 'vite';
import {config} from "dotenv";
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import reactRefresh from '@vitejs/plugin-react'

config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  base: '/', 
});

