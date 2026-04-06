import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginWithPassword } from "@/lib/api"
import { isAuthenticated, setAdminToken } from "@/lib/auth"

export default function LoginPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/admin", { replace: true })
    }
  }, [navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(false)
    setSubmitting(true)
    try {
      const token = await loginWithPassword(password)
      setAdminToken(token)
      navigate("/admin", { replace: true })
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-0px)] items-center justify-center bg-[var(--gray-100)] p-4">
      <Card className="w-full max-w-sm border-[var(--gray-200)] shadow-md">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-[var(--primary-green)]">Admin login</CardTitle>
            <CardDescription>Enter the admin password to continue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(false)
                }}
                disabled={submitting}
                aria-invalid={error}
              />
            </div>
            {error && (
              <p className="text-sm font-medium text-destructive" role="alert">
                Invalid password
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Signing in…" : "Log In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
