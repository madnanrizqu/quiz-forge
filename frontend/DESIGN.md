# Sapphire Architectural Design System

### 1. Overview & Creative North Star

**Creative North Star: "The Architectural Blueprint"**

Sapphire Architectural is a design system rooted in structural clarity and technical precision. It rejects the standard "flat" web look in favor of an editorial layout that feels constructed rather than just rendered. The system utilizes generous whitespace, deep blue accents, and a layered surface hierarchy to guide the user through complex workflows with ease and authority.

### 2. Colors

The palette is dominated by a range of technical blues and clean surfaces.

- **The "No-Line" Rule:** Sectioning is achieved through shifts in background tone (e.g., transitioning from `surface` to `surface-container-low`) rather than hard borders. 1px solid lines are strictly prohibited for structural containers.

- **Surface Hierarchy & Nesting:**
  - `surface`: The base canvas.

  - `surface-container-low`: Used for secondary grouping (e.g., page sections).

  - `surface-container-lowest`: Reserved for the highest priority interactive cards or input fields to provide maximum "pop" against darker containers.

- **Signature Textures:** Use a `primary-gradient` (135deg, #0044b8 to #095ae9) for primary call-to-action buttons to imply energy and depth.

### 3. Typography

The system uses a high-contrast typographic pairing to establish "Editorial Authority."

- **Headlines:** _Plus Jakarta Sans_. A geometric sans-serif used to provide a modern, bold architectural feel.

- **Body & Labels:** _Inter_. A highly legible typeface for technical data and long-form content.

**Typography Scale:**

- **Display/H1:** 1.875rem (30px) - Bold, tight tracking.

- **Headline/H2:** 1.25rem (20px) - Semi-bold for section headers.

- **Title/Body Large:** 1.125rem (18px) - Used for primary inputs and featured text.

- **Body/Standard:** 0.875rem (14px) - For general UI text and descriptions.

- **Label/Small:** 0.75rem (12px) - Uppercase with wide tracking for metadata labels.

- **Micro:** 10px - Reserved for code snippets or tertiary annotations.

### 4. Elevation & Depth

Depth is communicated through "Atmospheric Layering" rather than traditional skeuomorphism.

- **Ambient Shadows:** The primary shadow definition is `0 12px 40px rgba(20, 28, 43, 0.06)`. This extra-diffused, low-opacity shadow creates a "floating" effect for main content cards.

- **The Layering Principle:** Use `surface-container-lowest` (#ffffff) on top of `surface-container-low` (#f1f3ff) to create clear elevation levels without borders.

- **The "Ghost Border":** For interactive elements like cards, use a subtle `outline: 1px solid rgba(195, 198, 216, 0.15)` to provide a hint of structure without creating visual noise.

- **Backdrop Blurs:** Navigation bars should use `backdrop-blur-xl` at 80% opacity to maintain context while ensuring legibility.

### 5. Components

- **Buttons:**
  - Primary: Gradient fill, rounded-xl (12px), bold typography, and a `shadow-lg` colored to the primary brand.

  - Ghost: Text-only with high hover states using `surface-container-low`.

- **Input Fields:** Large, 56px height (14rem equivalents), `rounded-xl`, with a `surface-container-lowest` background. Borderless by default, using a 2px `primary/40` ring on focus.

- **Question Cards:** Feature a "Signature Accent" — a 4px wide vertical pill of `primary` color on the left edge to denote the active or primary element.

- **Badges/Chips:** Small, rounded-full, using `surface-container-high` for high-contrast metadata.

### 6. Do's and Don'ts

**Do:**

- Use `text-on-surface-variant` for secondary descriptions to maintain hierarchy.

- Apply `transition-all duration-300` and subtle `hover:-translate-y-1` to cards.

- Use uppercase labels with `tracking-wider` for all metadata.

**Don't:**

- Never use a black #000000 hex; use `on-surface` (#141c2b) for all text.

- Do not use sharp 0px corners; maintain a consistent `rounded-xl` (12px) for cards and `rounded-lg` (8px) for internal UI elements.

- Avoid using standard 1px borders to separate content; use tonal background shifts instead.
