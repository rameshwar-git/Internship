"use client";

import { Copy, Share2, Trophy, Users, IndianRupee } from "lucide-react";
import { internData } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { toast } = useToast();
  const { name, stats, referralCode, donationLink, milestones } = internData;
  const progressPercentage = (stats.totalRaised / stats.nextMilestone) * 100;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(donationLink);
    toast({
      title: "Link Copied!",
      description: "Your donation link is copied to the clipboard.",
    });
  };

  const handleShare = () => {
     const text = `Help me reach my fundraising goal! You can donate through my link: ${donationLink}`;
     const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
     window.open(whatsappUrl, '_blank');
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, {name}!</h1>
        <p className="text-muted-foreground">Here&apos;s your fundraising summary.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalRaised.toLocaleString("en-IN")}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.totalDonors}</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.nextMilestone.toLocaleString("en-IN")}</div>
            <p className="text-xs text-muted-foreground">You are almost there!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Fundraising Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
                <Progress value={progressPercentage} aria-label={`${progressPercentage.toFixed(0)}% towards next milestone`}/>
                <p className="text-sm text-muted-foreground">
                    You have raised <span className="font-bold text-primary">₹{stats.totalRaised.toLocaleString("en-IN")}</span>. 
                    Only <span className="font-bold text-primary">₹{(stats.nextMilestone - stats.totalRaised).toLocaleString("en-IN")}</span> to go to reach your next milestone!
                </p>
            </div>
            
            <CardTitle className="font-headline text-lg mt-6 mb-2">My Referral Code</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="flex-grow p-2 bg-muted rounded-md font-mono text-sm text-center border">
                {referralCode}
              </div>
            </div>

            <CardTitle className="font-headline text-lg mt-6 mb-2">My Donation Link</CardTitle>
            <div className="flex items-center space-x-2">
                <input value={donationLink} readOnly className="flex-grow p-2 bg-muted rounded-md text-sm truncate border" />
                <Button variant="outline" size="icon" onClick={handleCopyLink} aria-label="Copy donation link">
                    <Copy className="h-4 w-4" />
                </Button>
                <Button size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleShare} aria-label="Share on WhatsApp">
                    <Share2 className="h-4 w-4" />
                </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Milestone Badges</CardTitle>
            <CardDescription>
              Keep up the great work to unlock them all!
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {milestones.map((milestone) => (
              <div
                key={milestone.amount}
                className={`flex flex-col items-center justify-center p-4 border rounded-lg text-center transition-all ${
                  milestone.achieved
                    ? "border-accent/80 bg-accent/20 text-accent-foreground"
                    : "border-dashed bg-muted/50 text-muted-foreground"
                }`}
              >
                <Trophy className={`h-8 w-8 mb-2 ${milestone.achieved ? "text-accent" : ""}`} />
                <p className="font-bold text-lg">₹{milestone.amount.toLocaleString("en-IN")}</p>
                <Badge variant={milestone.achieved ? "default" : "secondary"} className={`${milestone.achieved ? "bg-accent text-accent-foreground" : ""}`}>
                  {milestone.achieved ? "Unlocked" : "Locked"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
