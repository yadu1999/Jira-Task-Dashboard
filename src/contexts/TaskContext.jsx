
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jiraService } from '@/services/jiraService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    project: 'all',
  });
  const [sortBy, setSortBy] = useState('priority');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await jiraService.getTasks();
      
      if (response.success) {
        setTasks(response.tasks);
      } else {
        toast({
          title: "Failed to fetch tasks",
          description: response.message || "Unable to load tasks from Jira",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tasks. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskKey, updates) => {
    try {
      setLoading(true);
      const response = await jiraService.updateTask(taskKey, updates);
      
      if (response.success) {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.key === taskKey 
              ? { ...task, ...updates, updated: new Date().toISOString() } // Also update 'updated' timestamp
              : task
          )
        );
        
        toast({
          title: "Task Updated! ✅",
          description: "Changes have been synced with Jira",
        });
        
        return { success: true };
      } else {
        toast({
          title: "Update Failed",
          description: response.message || "Failed to update task",
          variant: "destructive",
        });
        return { success: false };
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      setLoading(true);
      const response = await jiraService.createTask(taskData);
      if (response.success && response.task) {
        setTasks(prevTasks => [response.task, ...prevTasks]);
        toast({
          title: "Task Created! 🎉",
          description: `Task ${response.task.key} has been successfully created.`,
        });
        return { success: true, task: response.task };
      } else {
        toast({
          title: "Creation Failed",
          description: response.message || "Failed to create task",
          variant: "destructive",
        });
        return { success: false };
      }
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };


  const getFilteredAndSortedTasks = () => {
    let filteredTasks = tasks.filter(task => {
      if (filters.status !== 'all' && task.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
      if (filters.priority !== 'all' && task.priority.toLowerCase() !== filters.priority.toLowerCase()) {
        return false;
      }
      if (filters.project !== 'all' && task.projectName !== filters.project) {
        return false;
      }
      return true;
    });

    const priorityOrder = { 'highest': 5, 'high': 4, 'medium': 3, 'low': 2, 'lowest': 1 };
    
    filteredTasks.sort((a, b) => {
    
      let projectCompare = 0;
  
      const projectPriorityA = a.projectName.charCodeAt(0);
      const projectPriorityB = b.projectName.charCodeAt(0);
      projectCompare = projectPriorityA - projectPriorityB;

      let taskPriorityCompare = (priorityOrder[b.priority.toLowerCase()] || 0) - (priorityOrder[a.priority.toLowerCase()] || 0);

      if (sortBy === 'priority') {
        if (projectCompare !== 0) {
          
        }
        if (taskPriorityCompare !== 0) return taskPriorityCompare;
        return a.projectName.localeCompare(b.projectName); 
      } else if (sortBy === 'project') {
        const nameCompare = a.projectName.localeCompare(b.projectName);
        if (nameCompare !== 0) return nameCompare;
        return taskPriorityCompare;
      } else if (sortBy === 'status') {
        const statusCompare = a.status.localeCompare(b.status);
        if (statusCompare !== 0) return statusCompare;
        return taskPriorityCompare; 
      }
      return 0;
    });

    return filteredTasks;
  };

  const value = {
    tasks,
    loading,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    fetchTasks,
    updateTask,
    createTask,
    getFilteredAndSortedTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
