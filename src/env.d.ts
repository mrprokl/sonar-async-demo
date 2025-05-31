/// <reference types="vite/client" />

interface ImportMetaEnv {
  // No environment variables needed as API key is provided by user
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 