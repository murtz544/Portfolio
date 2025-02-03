import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { clearAllUserErrors, login } from "@/store/slices/userSlice"
import { toast } from "react-toastify"
import SpecialLoadingButton from "@/pages/sub-components/SpecialLoadingButton"

export function LoginForm({className, ...props}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loading, isAuthenticated, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Dispatching login action..."); // Debug log
        dispatch(login(email, password));
    };

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearAllUserErrors());
        }
        if(isAuthenticated) {
            navigateTo("/");
        }
    }, [dispatch, isAuthenticated, error, loading]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Acme Inc account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to={"/password/forgot"}
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input value={password}
                  onChange={(e) => setPassword(e.target.value)} type="password" required />
              </div>
              {
                loading ? 
                    (<SpecialLoadingButton content={"Logging In"}/>) : 
                    (<Button type="submit" className="w-full" onClick={handleLogin}>
                        Login
                    </Button>)
              }
              
              
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
