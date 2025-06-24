# Claude Code Instructions

This project uses pnpm as the package manager. Always use pnpm commands instead of npm.

## Development Commands

- **Start development server**: `pnpm dev`
- **Build project**: `pnpm build`
- **Run linter**: `pnpm lint`
- **Format code**: `pnpm format`
- **Check formatting**: `pnpm format:check`
- **Preview build**: `pnpm preview`

## Project Structure

- React + TypeScript application built with Vite
- Uses QR code styling library (`qr-code-styling`)
- Tailwind CSS for styling with a cyberpunk/terminal theme
- Components are located in `src/components/`

## Key Features

- QR code generation with customizable styling
- Color picker for QR code and background colors
- Center image upload with PNG/JPG support
- Image resizing and margin controls
- Download functionality for generated QR codes

## Testing & Quality

Always run linting and build before committing:
```bash
pnpm lint
pnpm build
```