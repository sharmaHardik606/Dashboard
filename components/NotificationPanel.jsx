"use client";

import activityData from "@/constants/dashboard/activityData";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MailCheck } from "lucide-react";

export default function NotificationPanel({ onMarkRead }) {
  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[95vw] max-w-sm sm:absolute sm:top-12 sm:right-0 sm:left-auto sm:translate-x-0 sm:w-[85vw] sm:max-w-lg bg-white dark:bg-gray-900 shadow-xl rounded-lg p-4 z-50 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-5">
        <h2 className="text-2xl font-semibold text-foreground">
          Notifications
        </h2>
        <Button variant={"mainblue"} size={"xl"} onClick={onMarkRead}>
          <MailCheck />
          Mark all as read
        </Button>
      </div>

      <div className="max-h-72 overflow-y-auto space-y-3 border bg-neutral-50 rounded-xl p-2 sm:p-5">
        {activityData.map((activity, idx) => (
          <div key={idx} className="flex items-center gap-4 p-1">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={activity.avatar || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>
                {activity.user?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs sm:text-sm font-semibold text-foreground">
                  {activity.user} {activity.action}.
                </p>
                <p className="text-xs font-semibold sm:font-bold text-muted-foreground/70">
                  {activity.date}
                </p>
              </div>
              <p className="text-xs font-semibold sm:font-bold text-muted-foreground ">
                {activity.timeAgo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
