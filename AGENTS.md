# Agentic Intelligence Portal: Core Guidelines

This document serves as the persistent instruction set for AI agents working on this project. It captures the design philosophy, architectural patterns, and strategic context of the "Agentic Intelligence" theme.

## 1. Design Philosophy
- **Aesthetic**: High-fidelity, dark-mode executive dashboard. Use `zinc-950` for backgrounds and `zinc-50` for primary text.
- **Typography**: 
  - **Serif**: `Playfair Display` for headings and high-level strategic titles.
  - **Sans**: `Inter` for UI elements and general body text.
  - **Mono**: `JetBrains Mono` for metadata, technical labels, and data points.
- **Interactions**: Use `framer-motion` for all transitions. Prefer subtle fades, staggered entrances, and node-based visual connections.

## 2. Architectural Patterns
- **Modular Views**: Each primary sidebar section is a standalone component in `src/components/`.
- **Centralized Data**: Strategic memos, market opportunities, and synthesis threads are managed in `src/data.ts`.
- **Utility-First**: Use the `cn()` helper from `src/lib/utils.ts` for all conditional Tailwind classes.
- **Lazy Knowledge**: The "Knowledge Base" (ingestion) should prioritize client-side parsing (CSV, Zip, Text) before any server-side offloading.

## 3. Strategic Context
- **The "Weave"**: The core metaphor of the app is "weaving" disparate strategic threads into a cohesive intelligence.
- **2026 Paradigm**: The app assumes a future state where "Computer Use" and "Autonomous Agents" are the baseline for enterprise operations.
- **Orphaned Demand**: A key focus is identifying market gaps left by SaaS platform shifts and competitor exits.

## 4. Development Rules
- **No Mock Data**: When adding new memos or opportunities, ensure they are integrated into `src/data.ts` rather than hardcoded in components.
- **Responsive Precision**: Maintain the sidebar layout on desktop, but ensure the `main` content area is fluid and uses `max-w-6xl` for readability.
- **Iconography**: Exclusively use `lucide-react`.
- **Type Safety**: Maintain strict TypeScript interfaces for all data structures in `src/data.ts`.
