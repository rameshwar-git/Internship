"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons";

function DonationForm() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute top-0 left-0 p-4 sm:p-6 flex items-center gap-2 text-primary">
        <Logo className="h-6 w-6" />
        <h1 className="font-headline text-xl font-bold">Fundify</h1>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
           <Heart className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="font-headline text-2xl mt-4">Make a Donation</CardTitle>
          <CardDescription>
            Your contribution makes a difference. Thank you for your support!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Full Name (Optional)</Label>
                <Input id="name" placeholder="Jane Doe" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input id="amount" type="number" placeholder="500" required />
              </div>
              {refCode && (
                 <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="refCode">Referral Code</Label>
                    <Input id="refCode" value={refCode} disabled />
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Donate Now</Button>
           <p className="text-xs text-muted-foreground">Are you an intern? <Link href="/login" className="underline text-primary font-medium">Login here</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
}


export default function DonatePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DonationForm />
        </Suspense>
    )
}
