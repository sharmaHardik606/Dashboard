import React from "react";

export function ContainerCard({ children, className }) {
  return (
    <div className={`md:p-4 p-3 rounded-2xl bg-white dark:bg-muted ${className || ""}`}>
      {children}
    </div>
  );
}
