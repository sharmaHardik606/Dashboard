"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Modal({ children, className = "" }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const show = searchParams.get("showForm") === "1";

  // Close modal: remove query param
  function closeModal() {
    router.push(pathname);
  }

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") closeModal();
    }
    if (show) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [show]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="w-full h-full fixed inset-0 z-50 bg-black/40 overflow-y-auto">
      <div className="flex min-h-screen items-start justify-center p-4">
        <div
          className={`relative bg-white rounded-xl shadow-xl w-full max-w-lg my-8 ${className}`}
        >
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}