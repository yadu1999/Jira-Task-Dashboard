

// const mockUsers = [
//   {
//     id: 1,
//     email: 'admin@jira.com',
//     password: 'admin123',
//     name: 'Admin User',
//     role: 'admin'
//   },
//   {
//     id: 2,
//     email: 'user@jira.com',
//     password: 'user123',
//     name: 'Regular User',
//     role: 'user'
//   },
//   {
//     id: 3,
//     email: 'demo@jira.com',
//     password: 'demo123',
//     name: 'Demo User',
//     role: 'user'
//   }
// ];

import { mockTasks } from "../lib/utils";

class AuthService {
  generateToken(user) {
   
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      userId: user.id,
      email: user.email,
      exp: Date.now() + (24 * 60 * 60 * 1000) 
    }));
    const signature = btoa(`${header}.${payload}.secret`);
    
    return `${header}.${payload}.${signature}`;
  }

  async validateToken(token) {
    try {
      if (!token) return false;
      
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      const payload = JSON.parse(atob(parts[1]));
      
   
      if (payload.exp < Date.now()) {
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  async validateJiraCredentials(jiraUrl, email, apiToken) {
    try {
     
      if (!jiraUrl || !email || !apiToken) {
        return { success: false, message: 'All Jira credentials are required' };
      }


      await new Promise(resolve => setTimeout(resolve, 500));

      let isValidUrl = false;
      try {
        new URL(jiraUrl);
        isValidUrl = true;
      } catch (_) {
        isValidUrl = false;
      }

      if (isValidUrl && email.includes('@') && apiToken.length > 10) {
        return { success: true };
      }
      
      let errorMessage = 'Invalid Jira credentials. Please check:';
      if (!isValidUrl) errorMessage += "\n- URL format (e.g., https://example.atlassian.net or https://www.atlassian.com/software/jira)";
      if (!email.includes('@')) errorMessage += "\n- Email format";
      if (apiToken.length <= 10) errorMessage += "\n- API Token length (should be more than 10 characters)";


      return { success: false, message: errorMessage };
    } catch (error) {
      console.error('Jira validation error:', error);
      return { success: false, message: 'Failed to validate Jira credentials due to an internal error.' };
    }
  }

  async login(email, password, jiraCredentials) {
    try {
      
      const user = mockTasks?.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return { success: false, message: 'Invalid app email or password' };
      }

  
      const jiraValidation = await this.validateJiraCredentials(
        jiraCredentials.jiraUrl,
        jiraCredentials.jiraEmail,
        jiraCredentials.jiraApiToken
      );

      if (!jiraValidation.success) {
        return { success: false, message: jiraValidation.message };
      }

 
      const token = this.generateToken(user);

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  }

  async refreshToken(currentToken) {
    try {
      const isValid = await this.validateToken(currentToken);
      
      if (!isValid) {
        return { success: false, message: 'Invalid token' };
      }

      const parts = currentToken.split('.');
      const payload = JSON.parse(atob(parts[1]));
      const user = mockUsers.find(u => u.id === payload.userId);

      if (!user) {
        return { success: false, message: 'User not found' };
      }

      const newToken = this.generateToken(user);
      
      return {
        success: true,
        token: newToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      };
    } catch (error) {
      console.error('Token refresh error:', error);
      return { success: false, message: 'Failed to refresh token' };
    }
  }
}

export const authService = new AuthService();
