import { createContext } from "react";

// Shared between the persistent Header (which renders outside the router's
// per-route content) and HomePage (which owns the scroll-spy that tracks which
// home-page anchor section is currently in view), so the nav's active-dot
// indicator survives HomePage no longer being a direct parent of Header.
export const ActiveSectionContext = createContext({ active: "top", setActive: () => {} });
