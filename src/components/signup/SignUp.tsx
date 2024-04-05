import Link from "next/link";

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
const SignUp = ({ handleSignup, formState, setFormState }: any) => {
  return (
    <Card className="mx-auto max-w-sm bg-black text-zinc-50 border-zinc-400">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">User name</Label>
            <Input
              id="user-name"
              placeholder="Max"
              required
              value={formState?.username}
              onChange={(e) =>
                setFormState({ ...formState, username: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={formState?.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formState?.password}
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-white border-white border text-black hover:text-white"
            onClick={handleSignup}
          >
            Create an account
          </Button>
          <Button
            variant="outline"
            className="w-full  bg-transparent hover:bg-zinc-700 text-white hover:text-white transition-all duration-300"
          >
            Sign up with GitHub
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="#" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
export default SignUp;
