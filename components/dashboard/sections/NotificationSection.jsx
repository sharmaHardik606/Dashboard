'use client';

import Image from 'next/image';
import Link from 'next/link';
import NotificationData from '@/data/notificationData';
import { Button } from '@/components/ui/button';

export default function NotificationsSection() {
  return (
    <div className="flex flex-col gap-3 p-1">
        <h2 className="text-xl font-semibold">Alerts and Notifications</h2>

      {NotificationData.map((notification) => (
        <div key={notification.id} className="flex items-start gap-4 p-1">
          <Image
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full w-12 h-12 object-cover"
          />

        
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







