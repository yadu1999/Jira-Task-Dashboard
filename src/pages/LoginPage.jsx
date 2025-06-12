
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { LogIn, AlertTriangle, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [jiraUrl, setJiraUrl] = useState('https://www.atlassian.com/software/jira');
  const [jiraEmail, setJiraEmail] = useState('superadmin@gmail.com');
  const [jiraApiToken, setJiraApiToken] = useState('MOCK_API_TOKEN_1234567890ABCDEF');
  const [showJiraApiToken, setShowJiraApiToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password || !jiraUrl || !jiraEmail || !jiraApiToken) {
      setError('All fields are required.');
      setIsLoading(false);
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const jiraCredentials = { jiraUrl, jiraEmail, jiraApiToken };
    const result = await login(email, password, jiraCredentials);

    setIsLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-bg">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-lg shadow-2xl glass-effect">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
              className="mx-auto mb-4"
            >
              <LogIn className="w-16 h-16 text-primary" />
            </motion.div>
            <CardTitle className="text-3xl font-bold">Jira Task Dashboard</CardTitle>
            <CardDescription>Sign in to access your tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">App Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@jira.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">App Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-background/80 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground hover:text-primary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-1 pt-4">
                <p className="text-sm font-medium text-muted-foreground">Jira Connection Details</p>
                <div className="space-y-2 p-4 border rounded-md bg-black/10">
                  <div className="space-y-2">
                    <Label htmlFor="jiraUrl">Jira Instance URL</Label>
                    <Input
                      id="jiraUrl"
                      type="url"
                      placeholder="https://your-domain.atlassian.net"
                      value={jiraUrl}
                      onChange={(e) => setJiraUrl(e.target.value)}
                      required
                      className="bg-background/80"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jiraEmail">Jira Email</Label>
                    <Input
                      id="jiraEmail"
                      type="email"
                      placeholder="your-jira-email@example.com"
                      value={jiraEmail}
                      onChange={(e) => setJiraEmail(e.target.value)}
                      required
                      className="bg-background/80"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jiraApiToken">Jira API Token</Label>
                    <div className="relative">
                      <Input
                        id="jiraApiToken"
                        type={showJiraApiToken ? "text" : "password"}
                        placeholder="Your Jira API Token"
                        value={jiraApiToken}
                        onChange={(e) => setJiraApiToken(e.target.value)}
                        required
                        className="bg-background/80 pr-10"
                      />
                       <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground hover:text-primary"
                        onClick={() => setShowJiraApiToken(!showJiraApiToken)}
                      >
                        {showJiraApiToken ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </Button>
                    </div>
                  </div>
                 </div>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start p-3 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md"
                >
                  <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <pre className="whitespace-pre-wrap font-sans">{error}</pre>
                </motion.div>
              )}
              <Button type="submit" className="w-full font-semibold text-lg" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center text-center">
            <p className="text-xs text-muted-foreground">
              Use <code className="bg-muted p-1 rounded-sm">admin@jira.com</code> / <code className="bg-muted p-1 rounded-sm">admin123</code> for demo.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Jira details are mock validated. The API token is pre-filled for demo purposes.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
