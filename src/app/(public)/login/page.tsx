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
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { signin } from "@/app/actions/auth"
import { useRouter } from "next/navigation";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";


export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [role, setRole] =useState('user');
  const [password, setPassword]=useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
  
      if (!email || !password) {
        toast({
          title: "Error",
          description: "All fields are required.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
  
      try {
        const result = await signin({
          email,
          role,
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
            description: "Login successfully! Please login.",
          });
          router.push("/dashboard");
          <Link href={"/dashboard"}/>
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
        <CardTitle className="font-headline text-2xl">Intern Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger id="role">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="super-admin">Super Admin</SelectItem>
                    </SelectContent>
                </Select>
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
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline text-primary font-medium">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
