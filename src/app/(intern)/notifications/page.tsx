import { Bell, Gift, Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case "donation":
        return <Gift className="h-5 w-5 text-primary" />;
      case "milestone":
        return <Trophy className="h-5 w-5 text-accent" />;
      case "announcement":
        return <Bell className="h-5 w-5 text-secondary-foreground" />;
      default:
        return <Bell className="h-5 w-5 text-secondary-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Notifications</CardTitle>
        <CardDescription>
          Stay updated with your latest fundraising activities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "flex items-start gap-4 p-4 rounded-lg border",
                notification.read ? "bg-transparent" : "bg-primary/5"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-full",
                  notification.read ? "bg-muted" : "bg-primary/10"
                )}
              >
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <p className="font-medium">{notification.content}</p>
                <p className="text-sm text-muted-foreground">
                  {notification.time}
                </p>
              </div>
              {!notification.read && (
                <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
