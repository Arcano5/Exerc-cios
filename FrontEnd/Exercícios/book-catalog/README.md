# Book Catalog (React + TypeScript) - ready to upload

This is a minimal React + TypeScript project that uses the public service https://crudcrud.com
to store books (GET, POST, DELETE, PUT). The zip contains the source code; after uploading to GitHub
run `npm install` and edit `.env` (see below).

## Setup

1. Copy `.env.example` to `.env` and replace `<SUA_CHAVE>` with your crudcrud.com key (the URL expires).
2. `npm install`
3. `npm run dev`

## Notes

- The project uses Vite and React 18 with JSX automatic.
- Do not commit your `.env` with the crudcrud key to a public repo.
