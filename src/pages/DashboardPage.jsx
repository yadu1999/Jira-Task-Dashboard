
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTask } from '@/contexts/TaskContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Filter, Loader2, RefreshCw, Sun, Moon, Search } from 'lucide-react';
import TaskCard from '@/components/tasks/TaskCard';
import TaskFilters from '@/components/tasks/TaskFilters';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';
import TaskDetailsModal from '@/components/tasks/TaskDetailsModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { jiraService } from '@/services/jiraService';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { tasks, loading, fetchTasks, getFilteredAndSortedTasks, updateTask, createTask } = useTask();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectOptions, setProjectOptions] = useState([]);

  useEffect(() => {
    fetchTasks();
    const fetchProjects = async () => {
      const response = await jiraService.getProjects();
      if (response.success) {
        setProjectOptions(response.projects);
      }
    };
    fetchProjects();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEditTask = async (taskKey, updates) => {
    await updateTask(taskKey, updates);
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };
  
  const displayedTasks = getFilteredAndSortedTasks().filter(task => 
    task.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading && tasks.length === 0) {
    return <LoadingSpinner text="Fetching your Jira tasks..."/>;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background text-foreground transition-colors duration-300">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-border/50">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="flex-1 mb-4 sm:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Jira Task Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">Welcome, {user?.name || 'User'}!</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="flex items-center space-x-2 flex-wrap justify-center sm:justify-end">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="glass-effect hover:bg-primary/20">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button variant="outline" onClick={() => setIsFiltersVisible(!isFiltersVisible)} className="glass-effect hover:bg-primary/20">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
          <CreateTaskModal projectOptions={projectOptions} />
          <Button onClick={fetchTasks} variant="outline" disabled={loading} className="glass-effect hover:bg-primary/20">
            {loading && tasks.length > 0 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Refresh
          </Button>
          <Button onClick={handleLogout} variant="destructive" className="glass-effect hover:bg-destructive/80">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </motion.div>
      </header>

      <div className="mb-6 relative">
        <Input 
          type="text"
          placeholder="Search tasks by summary, key, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 glass-effect bg-background/70"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      <AnimatePresence>
        {isFiltersVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 overflow-hidden"
          >
            <TaskFilters />
          </motion.div>
        )}
      </AnimatePresence>
      
      {loading && tasks.length > 0 && (
         <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50"
          >
            <div className="flex items-center p-3 rounded-md bg-primary/80 text-primary-foreground shadow-lg glass-effect">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <span>Updating tasks...</span>
            </div>
          </motion.div>
      )}

      <main>
        {displayedTasks.length === 0 && !loading ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 flex flex-col items-center"
          >
            <img  alt="No tasks found illustration" class="mx-auto mb-6 w-48 h-48 md:w-64 md:h-64 text-muted-foreground" src="https://images.unsplash.com/photo-1682624400764-d2c9eaeae972" />
            <h2 className="text-2xl font-semibold mb-2">No Tasks Found</h2>
            <p className="text-muted-foreground max-w-md">
              {searchTerm ? `No tasks match your search term "${searchTerm}". Try a different search or clear your filters.` : 
              "Either there are no tasks matching your filters, or you have no tasks assigned. Try creating a new task!"}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}
          >
            {displayedTasks.map((task) => (
              <TaskCard 
                key={task.key} 
                task={task} 
                onEditTask={handleEditTask} 
                onViewDetails={handleViewDetails}
              />
            ))}
          </motion.div>
        )}
      </main>
      
      <TaskDetailsModal 
        task={selectedTask} 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)} 
      />
      
      <footer className="mt-12 pt-6 border-t border-border/50 text-center text-muted-foreground text-xs md:text-sm">
        <p>&copy; {new Date().getFullYear()} Jira Task Dashboard. All rights reserved.</p>
        <p>Powered by React, TailwindCSS, shadcn/ui, and Framer Motion.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
