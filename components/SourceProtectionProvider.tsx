"use client";

import React, { useEffect } from "react";

export default function SourceProtectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Check if running on local environment
    const isLocal =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.startsWith("192.168.") ||
        window.location.hostname.endsWith(".local") ||
        process.env.NODE_ENV !== "production");

    // Do not apply any restrictions on local development
    if (isLocal) {
      return;
    }

    // 1. Disable Right-Click Context Menu (Inspect, Save As, View Source) in Production
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Block all Developer Tools, View Source & Page Saving Keyboard Shortcuts in Production
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = typeof window !== "undefined" && navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // F12 (DevTools)
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+I / Cmd+Option+I (DevTools Inspect)
      if (cmdOrCtrl && e.shiftKey && (e.key === "I" || e.key === "i" || e.keyCode === 73)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+J / Cmd+Option+J (Console)
      if (cmdOrCtrl && e.shiftKey && (e.key === "J" || e.key === "j" || e.keyCode === 74)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+C / Cmd+Option+C (Inspect Element selector)
      if (cmdOrCtrl && e.shiftKey && (e.key === "C" || e.key === "c" || e.keyCode === 67)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+U / Cmd+Option+U (View Page Source)
      if (cmdOrCtrl && (e.key === "u" || e.key === "U" || e.keyCode === 85)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+S / Cmd+S (Save Page HTML & Source Assets)
      if (cmdOrCtrl && (e.key === "s" || e.key === "S" || e.keyCode === 83)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+P / Cmd+P (Print Page to download assets/PDF)
      if (cmdOrCtrl && (e.key === "p" || e.key === "P" || e.keyCode === 80)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+K (Firefox Web Console)
      if (cmdOrCtrl && e.shiftKey && (e.key === "K" || e.key === "k" || e.keyCode === 75)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+E (Network tab / Extension triggers)
      if (cmdOrCtrl && e.shiftKey && (e.key === "E" || e.key === "e" || e.keyCode === 69)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 3. Block Drag-and-Drop Image Saving & Asset Downloading in Production
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // 4. Overwrite & Clear Console Logs in Production
    const disableConsole = () => {
      try {
        const noop = () => {};
        window.console.log = noop;
        window.console.debug = noop;
        window.console.info = noop;
        window.console.warn = noop;
        window.console.dir = noop;
        window.console.table = noop;
      } catch {}
    };

    // 5. Anti-DevTools Debugger Trap in Production
    let devtoolsInterval: NodeJS.Timeout | null = null;
    disableConsole();

    devtoolsInterval = setInterval(() => {
      const before = performance.now();
      // Debugger execution pauses if DevTools panel is open
      (function () {})["constructor"]("debugger")();
      const after = performance.now();
      if (after - before > 100) {
        window.location.reload();
      }
    }, 1000);

    // Attach event listeners for Production
    window.addEventListener("contextmenu", handleContextMenu, { capture: true });
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("dragstart", handleDragStart, { capture: true });

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("dragstart", handleDragStart, { capture: true });
      if (devtoolsInterval) clearInterval(devtoolsInterval);
    };
  }, []);

  return <>{children}</>;
}
