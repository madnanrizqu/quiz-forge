# Shared Layer

**Why it exists:**
Contains highly reusable, cross-cutting functionality and UI components that are entirely detached from specific business logic or domains.

**How to use it:**
Put generic UI components (buttons, inputs), generic API clients, utility functions, design tokens, and routing primitives here. **Important:** The Shared layer is at the bottom of the hierarchy and cannot import from any other layer.
