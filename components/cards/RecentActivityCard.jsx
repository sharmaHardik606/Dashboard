import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function RecentActivityCard({ activity }) {
  return (
    <div className="flex items-center gap-4 p-1 bg-white dark:bg-neutral-900">
    
    <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>ER</AvatarFallback>
    </Avatar>

      {/* Content */}
      <div className="flex-1 ">
        <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">
          {activity.user} {activity.action + "."}
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
  );
}
