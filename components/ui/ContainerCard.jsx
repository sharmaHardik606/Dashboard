import React from "react";

export function ContainerCard({ children, className }) {
  return (
    <div className={`p-4 rounded-2xl bg-white dark:bg-muted shadow ${className || ""}`}>
      {children}
    </div>
  );
}
