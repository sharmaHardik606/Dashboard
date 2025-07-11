'use client';

import Image from 'next/image';
import Link from 'next/link';
import NotificationData from '@/constants/dashboard/notificationData';
import { Button } from '@/components/ui/button';

export default function NotificationsSection() {
  return (
    <div className="flex flex-col gap-3 p-1 w-full">
        <h2 className="text-xl font-semibold">Alerts and Notifications</h2>

      {NotificationData.map((notification) => (
        <div key={notification.id} className="flex items-start gap-4 p-1">
          <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                      <Image
                        src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
                        alt="User avatar"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

        
          <div className="flex-1">
            <div className="flex flex-col">
              <p className="font-semibold text-foreground">
                {notification.message}
              </p>
              <Link
                href={notification.link}
                className="text-sm font-medium underline"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      ))}
      <Button variant={'hollow'} size={"xl"}>View All</Button>
    </div>
  );
}







