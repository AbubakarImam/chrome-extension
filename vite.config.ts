import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react-swc";
import { ManifestV3Export, crx } from "@crxjs/vite-plugin";

import manifestJson from "./manifest.json";

const manifest = manifestJson as ManifestV3Export;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react(), crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        content: './src/contentScript/main.tsx',
        background: './src/background/background.ts',
        popup: './src/popup/main.tsx',
      },
    },
  },
});
