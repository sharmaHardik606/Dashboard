"use client";

import Link from "next/link";
import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import { useSidebar } from "@/context/SidebarContext";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import NotificationPanel from "./NotificationPanel";
import ConfirmationPopup from "./ConfirmationPopup";

export function Navbar() {
  const { toggleSidebar } = useSidebar();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const [showPanel, setShowPanel] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <>
      {/* Confirmation Popup Overlay */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-xs w-full">
            <ConfirmationPopup
              message="Are you sure you want to log out?"
              buttonText="Log out"
              onConfirm={() => {
                setShowConfirm(false);
                setDropdownOpen(false);
                handleLogout();
              }}
              onCancel={() => setShowConfirm(false)}
            />
          </div>
        </div>
      )}

      <header className="w-full sticky top-0 z-50 bg-gray-50 dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="w-full flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-2xl p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center ">
              <Image
                src="/Logo.svg"
                alt="Logo"
                width={150}
                height={150}
                priority
              />
            </Link>
          </div>

          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            {/* Notification Bell */}
            <div className="relative">
              <button
                className="relative hover:cursor-pointer"
                onClick={() => setShowPanel((prev) => !prev)}
              >
                <Bell className="h-6 w-6" />
                {hasUnread && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                )}
              </button>
              {showPanel && (
                <NotificationPanel
                  onMarkRead={() => {
                    setHasUnread(false);
                    setShowPanel(false);
                  }}
                />
              )}
            </div>

            {/* Avatar */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 hover:cursor-pointer"
            >
              <Image
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
                alt="User avatar"
                fill
                className="object-cover"
                priority
              />
            </button>

            {/* Logout Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-14 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-50">
                <button
                  onClick={() => setShowConfirm(true)} // <-- open confirmation dialog
                  className="w-full text-left font-bold text-red-600 text-sm px-3 py-2 bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}