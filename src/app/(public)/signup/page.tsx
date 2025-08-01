"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { signup } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!fullName || !email || !password) {
      toast({
        title: "Error",
        description: "All fields are required.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const result = await signup({
        name: fullName,
        role:'user',
        email,
        password,
      });

      if (result.error) {
        toast({
          title: "Registration Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Account created successfully! Please login.",
        });
        router.push("/login");
      }
    } catch (error) {
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Intern Registration</CardTitle>
        <CardDescription>
          Create your account to start your fundraising journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input id="full-name" placeholder="Alex Doe" required onChange={(e)=>{setFullName(e.target.value)}} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
          <Button onClick={handleSubmit} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Create an account
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline text-primary font-medium">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
