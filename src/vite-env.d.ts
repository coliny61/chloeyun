/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NOTION_API_KEY: string;
  readonly VITE_NOTION_DATABASE_ID: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
