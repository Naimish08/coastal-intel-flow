import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { FaGoogle, FaGithub, FaEnvelope, FaLock } from 'react-icons/fa'
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const Login = () => {
  const { user, loading: authLoading, signIn, signUp, signOut, signInWithProvider, resetPassword, signInWithOtp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => {
      setMessage('')
      setMessageType('')
    }, 5000)
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      showMessage('Please fill in all fields', 'error')
      return
    }

    setLoading(true)
    const { error } = await signIn(email, password)
    
    if (error) {
      showMessage(error.message, 'error')
    } else {
      showMessage('Successfully signed in!', 'success')
    }
    setLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      showMessage('Please fill in all fields', 'error')
      return
    }

    if (password.length < 6) {
      showMessage('Password must be at least 6 characters long', 'error')
      return
    }

    setLoading(true)
    const { error } = await signUp(email, password)
    
    if (error) {
      showMessage(error.message, 'error')
    } else {
      showMessage('Check your email for the confirmation link!', 'success')
    }
    setLoading(false)
  }

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setLoading(true)
    const { error } = await signInWithProvider(provider)
    
    if (error) {
      showMessage(error.message, 'error')
    }
    setLoading(false)
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      showMessage('Please enter your email address', 'error')
      return
    }

    setLoading(true)
    const { error } = await resetPassword(email)
    
    if (error) {
      showMessage(error.message, 'error')
    } else {
      showMessage('Check your email for the password reset link!', 'success')
    }
    setLoading(false)
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      showMessage('Please enter your email address', 'error')
      return
    }

    setLoading(true)
    const { error } = await signInWithOtp(email)
    
    if (error) {
      showMessage(error.message, 'error')
    } else {
      showMessage('Check your email for the magic link!', 'success')
    }
    setLoading(false)
  }

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      showMessage(error.message, 'error')
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-lg">Loading...</span>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
          <CardHeader className="text-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-t-lg">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-primary/10 rounded-full shadow-md">
                <FaEnvelope className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-extrabold text-gray-900 dark:text-white">Welcome Back!</CardTitle>
            <CardDescription className="text-md text-gray-600 dark:text-gray-400 mt-2">
              You're signed in as <span className="font-medium text-foreground">{user.email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-success font-medium">Authentication successful</span>
              </div>
            </div>
            <Button 
              onClick={handleSignOut} 
              variant="outline" 
              className="w-full"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
          <CardHeader className="text-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-t-lg">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-primary/10 rounded-full shadow-md">
                <FaEnvelope className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-extrabold text-gray-900 dark:text-white">Coastal Intel Flow</CardTitle>
            <CardDescription className="text-md text-gray-600 dark:text-gray-400 mt-2">
              Sign in to access your coastal hazard reporting dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {message && (
              <Alert className={`mb-4 ${messageType === 'error' ? 'border-destructive/50 text-destructive bg-destructive/10' : 'border-success/50 text-success bg-success/10'}`}>
                {messageType === 'error' ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                {/* OAuth Buttons */}
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => handleOAuthSignIn('google')}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <FaGoogle className="mr-2 h-4 w-4" />
                    )}
                    Continue with Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => handleOAuthSignIn('github')}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <FaGithub className="mr-2 h-4 w-4" />
                    )}
                    Continue with GitHub
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>

                {/* Additional Options */}
                <div className="space-y-2 text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm"
                    onClick={handlePasswordReset}
                    disabled={loading || !email}
                  >
                    Forgot your password?
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm"
                    onClick={handleMagicLink}
                    disabled={loading || !email}
                  >
                    Send magic link
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                {/* OAuth Buttons */}
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => handleOAuthSignIn('google')}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <FaGoogle className="mr-2 h-4 w-4" />
                    )}
                    Sign up with Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => handleOAuthSignIn('github')}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <FaGithub className="mr-2 h-4 w-4" />
                    )}
                    Sign up with GitHub
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or create account</span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password (min. 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Login
