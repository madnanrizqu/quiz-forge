# App Layer

**Why it exists:** 
Contains application-wide configuration, initialization, and global providers. It is the entry point that makes the app run.

**How to use it:** 
Put global routing, global styles, state providers (like Redux/Context), and top-level layouts here. Modules here can import from any lower layer (Pages, Widgets, Features, Entities, Shared) but are never imported by them.
