

# MCP Setup

## Local Setup
start the server: `npm run dev`

add to your mcp config
```json
{
  "mcpServers": {
    "deeptradingchartmcp-local1": {
      "command": "node",
      "args": [
        "/Users/evansmacbookpro/Desktop/Projects/experience/DeepTradingChartMcp/dist/index.js",
        "DEBUG=true API_KEY=80692a6b241c89396ffd0687de7d8d8c2c15c37f8ae1a11a9b8cda3e856f8675"
      ]
    }
  }
}
```


Sample Call in cursor or inspector
```json
{
  "absolutePathToCurrentFile": "/Users/evansmacbookpro/Desktop/Projects/experience/DeepTradingChartMcp/src/index.ts",
  "absolutePathToProjectDirectory": "/Users/evansmacbookpro/Desktop/Projects/experience/DeepTradingChartMcp",
  "context": "Generate a modern, clean signup form with fields for name, email, password, and password confirmation. The form should include validation for all fields, especially email format and password strength/matching. Include a submit button that has a loading state, and error handling for form submission. Design should be responsive and match a financial/trading application aesthetic.",
  "message": "/ui generate a signup form",
  "searchQuery": "signup form"
}
```
Sample React Response

```tsx
"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Google } from "lucide-react";

interface SignupFormProps {
  className?: string;
}

export function SignupForm({ className }: SignupFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Welcome! Please fill in the details to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" type="button" className="w-full">
              <Google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="example@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-2">
        <div className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" className="p-0 h-auto">
            Sign in
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function SignupFormDemo() {
  return (
    <div className="h-full flex items-center justify-center p-4">
      <SignupForm />
    </div>
  );
}

export default SignupFormDemo;
```