"use client";

import activityData from "@/constants/dashboard/activityData";
import { Button } from "./ui/button";

export default function NotificationPanel() {
  return (
    <div className="absolute right-0 top-12  bg-white dark:bg-gray-900 shadow-xl rounded-lg p-4 z-50 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Notifications
              </h2>
              <Button variant={"mainblue"}>Mark as all read</Button>
            </div>

      <div className="max-h-72 overflow-y-auto space-y-3 bg-white dark:bg-gray-900 shadow-xl rounded-lg p-4 z-50 border border-gray-200 dark:border-gray-700">
        {activityData.map((item, index) => (
          <div
            key={index}
            className="text-sm text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700 pb-2"
          >
            <div>
              <span className="font-semibold">{item.user}</span> {item.action}
            </div>
            <div className="text-xs text-gray-500">
              {item.date} • {item.timeAgo}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
