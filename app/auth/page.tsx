import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Auth() {
  return (
    <div className="flex justify-center mt-36">
      <Tabs defaultValue="log-in" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="log-in">Login</TabsTrigger>
          <TabsTrigger value="sign-up">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="log-in">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Email" type="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Log in</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="sign-up">
          <Card>
            <CardHeader>
              <CardTitle>Sign up</CardTitle>
              <CardDescription>
                Create an account to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Email" type="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Password" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  placeholder="Confirm Password"
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Sign up</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
