import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}


export let mockTasks = [
  {
    key: 'PROJ-101',
    summary: 'Implement user authentication system',
    status: 'In Progress',
    priority: 'High',
    projectName: 'Alpha Project',
    assignee: 'John Doe',
    sprint: 'Sprint 1',
    description: 'Create a secure authentication system with JWT tokens. This involves setting up the backend routes, password hashing, token generation, and validation middleware. Frontend components for login and registration forms also need to be developed.',
    created: '2024-01-15T10:00:00Z',
    updated: '2024-01-20T14:30:00Z'
  },
  {
    key: 'PROJ-102',
    summary: 'Design dashboard UI components',
    status: 'To Do',
    priority: 'Medium',
    projectName: 'Bravo Project',
    assignee: 'Jane Smith',
    sprint: 'Sprint 1',
    description: 'Create reusable UI components for the dashboard using shadcn/ui and TailwindCSS. This includes cards, buttons, forms, and navigation elements. Ensure components are accessible and responsive.',
    created: '2024-01-16T09:00:00Z',
    updated: '2024-01-16T09:00:00Z'
  },
  {
    key: 'PROJ-103',
    summary: 'Fix login page responsive issues',
    status: 'Done',
    priority: 'Low',
    projectName: 'Charlie Project',
    assignee: 'Mike Johnson',
    sprint: 'Sprint 1',
    description: 'Resolve responsive design issues on mobile devices for the login page. Test on various screen sizes and ensure all elements are displayed correctly and are usable.',
    created: '2024-01-14T11:00:00Z',
    updated: '2024-01-19T16:45:00Z'
  },
  {
    key: 'PROJ-104',
    summary: 'Integrate Jira API endpoints for task fetching',
    status: 'In Progress',
    priority: 'Highest',
    projectName: 'Alpha Project',
    assignee: 'Sarah Wilson',
    sprint: 'Sprint 2',
    description: 'Connect application with Jira REST API for real-time data fetching of tasks. Implement error handling and loading states. Ensure secure API calls.',
    created: '2024-01-17T08:30:00Z',
    updated: '2024-01-21T12:15:00Z'
  },
  {
    key: 'PROJ-105',
    summary: 'Optimize database queries for user profiles',
    status: 'To Do',
    priority: 'Medium',
    projectName: 'Delta Project',
    assignee: 'David Brown',
    sprint: 'Sprint 2',
    description: 'Improve application performance by optimizing database queries related to user profiles and settings. Analyze current query performance and implement indexing or query rewriting as needed.',
    created: '2024-01-18T13:20:00Z',
    updated: '2024-01-18T13:20:00Z'
  },
  {
    key: 'PROJ-106',
    summary: 'Add task filtering functionality by status and priority',
    status: 'In Progress',
    priority: 'High',
    projectName: 'Bravo Project',
    assignee: 'Emily Davis',
    sprint: 'Sprint 1',
    description: 'Allow users to filter tasks by status, priority, and project. Implement UI elements for filter selection and update the task list dynamically.',
    created: '2024-01-19T10:45:00Z',
    updated: '2024-01-22T09:30:00Z'
  }
];



export const priorityColors = {
    'Highest': 'bg-red-600 hover:bg-red-700 text-white',
    'High': 'bg-orange-500 hover:bg-orange-600 text-white',
    'Medium': 'bg-yellow-500 hover:bg-yellow-600 text-black dark:text-yellow-900',
    'Low': 'bg-green-500 hover:bg-green-600 text-white',
    'Lowest': 'bg-blue-500 hover:bg-blue-600 text-white',
  };

 export const statusColors = {
    'To Do': 'bg-gray-500 hover:bg-gray-600 text-white',
    'In Progress': 'bg-blue-500 hover:bg-blue-600 text-white',
    'Done': 'bg-green-600 hover:bg-green-700 text-white',
    'Blocked': 'bg-red-500 hover:bg-red-600 text-white',
  };


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