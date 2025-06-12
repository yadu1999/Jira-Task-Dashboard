

// let mockTasks = [
//   {
//     key: 'PROJ-101',
//     summary: 'Implement user authentication system',
//     status: 'In Progress',
//     priority: 'High',
//     projectName: 'Alpha Project',
//     assignee: 'John Doe',
//     sprint: 'Sprint 1',
//     description: 'Create a secure authentication system with JWT tokens. This involves setting up the backend routes, password hashing, token generation, and validation middleware. Frontend components for login and registration forms also need to be developed.',
//     created: '2024-01-15T10:00:00Z',
//     updated: '2024-01-20T14:30:00Z'
//   },
//   {
//     key: 'PROJ-102',
//     summary: 'Design dashboard UI components',
//     status: 'To Do',
//     priority: 'Medium',
//     projectName: 'Bravo Project',
//     assignee: 'Jane Smith',
//     sprint: 'Sprint 1',
//     description: 'Create reusable UI components for the dashboard using shadcn/ui and TailwindCSS. This includes cards, buttons, forms, and navigation elements. Ensure components are accessible and responsive.',
//     created: '2024-01-16T09:00:00Z',
//     updated: '2024-01-16T09:00:00Z'
//   },
//   {
//     key: 'PROJ-103',
//     summary: 'Fix login page responsive issues',
//     status: 'Done',
//     priority: 'Low',
//     projectName: 'Charlie Project',
//     assignee: 'Mike Johnson',
//     sprint: 'Sprint 1',
//     description: 'Resolve responsive design issues on mobile devices for the login page. Test on various screen sizes and ensure all elements are displayed correctly and are usable.',
//     created: '2024-01-14T11:00:00Z',
//     updated: '2024-01-19T16:45:00Z'
//   },
//   {
//     key: 'PROJ-104',
//     summary: 'Integrate Jira API endpoints for task fetching',
//     status: 'In Progress',
//     priority: 'Highest',
//     projectName: 'Alpha Project',
//     assignee: 'Sarah Wilson',
//     sprint: 'Sprint 2',
//     description: 'Connect application with Jira REST API for real-time data fetching of tasks. Implement error handling and loading states. Ensure secure API calls.',
//     created: '2024-01-17T08:30:00Z',
//     updated: '2024-01-21T12:15:00Z'
//   },
//   {
//     key: 'PROJ-105',
//     summary: 'Optimize database queries for user profiles',
//     status: 'To Do',
//     priority: 'Medium',
//     projectName: 'Delta Project',
//     assignee: 'David Brown',
//     sprint: 'Sprint 2',
//     description: 'Improve application performance by optimizing database queries related to user profiles and settings. Analyze current query performance and implement indexing or query rewriting as needed.',
//     created: '2024-01-18T13:20:00Z',
//     updated: '2024-01-18T13:20:00Z'
//   },
//   {
//     key: 'PROJ-106',
//     summary: 'Add task filtering functionality by status and priority',
//     status: 'In Progress',
//     priority: 'High',
//     projectName: 'Bravo Project',
//     assignee: 'Emily Davis',
//     sprint: 'Sprint 1',
//     description: 'Allow users to filter tasks by status, priority, and project. Implement UI elements for filter selection and update the task list dynamically.',
//     created: '2024-01-19T10:45:00Z',
//     updated: '2024-01-22T09:30:00Z'
//   }
// ];

import { mockTasks } from "../lib/utils";

class JiraService {
  constructor() {
    this.baseUrl = 'https://your-domain.atlassian.net/rest/api/3';
  }

  getStoredCredentials() {
    try {
      const credentials = localStorage.getItem('jira_credentials');
      return credentials ? JSON.parse(credentials) : null;
    } catch (error) {
      console.error('Error getting stored credentials:', error);
      return null;
    }
  }

  async makeJiraRequest(endpoint, options = {}) {
    const credentials = this.getStoredCredentials();
    
    if (!credentials) {
      
      console.warn('No Jira credentials found, proceeding with mock data.');
    }

  
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200)); 
    

    return { success: true, data: {} };
  }

  async getTasks() {
    try {
  
      await this.makeJiraRequest('/search'); 
      
  
      return {
        success: true,
        tasks: JSON.parse(JSON.stringify(mockTasks)) 
      };
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return {
        success: false,
        message: 'Failed to fetch tasks from Jira',
        tasks: []
      };
    }
  }

  async updateTask(taskKey, updates) {
    try {
      await this.makeJiraRequest(`/issue/${taskKey}`, { method: 'PUT' });
      
      const taskIndex = mockTasks.findIndex(task => task.key === taskKey);
      if (taskIndex !== -1) {
        mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updates, updated: new Date().toISOString() };
      } else {
        return { success: false, message: 'Task not found for update' };
      }
      
      return {
        success: true,
        message: 'Task updated successfully'
      };
    } catch (error) {
      console.error('Error updating task:', error);
      return {
        success: false,
        message: 'Failed to update task in Jira'
      };
    }
  }

  async getProjects() {
    try {
      await this.makeJiraRequest('/project');
      
      const projects = [...new Set(mockTasks.map(task => task.projectName))];
      
      return {
        success: true,
        projects: projects.map(name => ({ name, key: name.replace(/\s+/g, '').toUpperCase() }))
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return {
        success: false,
        projects: []
      };
    }
  }

  async createTask(taskData) {
    try {
      await this.makeJiraRequest('/issue', { method: 'POST' });
      
      const newTask = {
        key: `TASK-${Math.floor(Math.random() * 9000) + 1000}`,
        summary: taskData.summary,
        status: 'To Do',
        priority: taskData.priority || 'Medium',
        projectName: taskData.projectName || (mockTasks.length > 0 ? mockTasks[0].projectName : "Default Project"), 
        assignee: taskData.assignee || 'Current User', 
        sprint: taskData.sprint || 'Backlog',
        description: taskData.description || '',
        created: new Date().toISOString(),
        updated: new Date().toISOString()
      };
      
      mockTasks.unshift(newTask);
      
      return {
        success: true,
        task: newTask
      };
    } catch (error) {
      console.error('Error creating task:', error);
      return {
        success: false,
        message: 'Failed to create task in Jira'
      };
    }
  }
}

export const jiraService = new JiraService();
