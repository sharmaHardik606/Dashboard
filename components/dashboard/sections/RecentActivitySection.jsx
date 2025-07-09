'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import activityData from "@/constants/dashboard/activityData";

export default function RecentActivitySection() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>

      {activityData.map((activity, idx) => (
        <div key={idx} className="flex items-center gap-4 p-1">
          {/* Avatar */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between gap-5">
              <p className="text-sm font-semibold text-foreground">
                {activity.user} {activity.action}.
              </p>
              <p className="text-xs font-bold text-muted-foreground/70">
                {activity.date}
              </p>
            </div>
            <p className="text-xs font-bold text-muted-foreground">
              {activity.timeAgo}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

