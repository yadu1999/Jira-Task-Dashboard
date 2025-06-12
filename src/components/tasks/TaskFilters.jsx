import React, { useState, useEffect } from 'react';
import { useTask } from '@/contexts/TaskContext';
import { jiraService } from '@/services/jiraService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { SlidersHorizontal } from 'lucide-react';

const TaskFilters = () => {
  const { filters, setFilters, sortBy, setSortBy } = useTask();
  const [projectOptions, setProjectOptions] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await jiraService.getProjects();
      if (response.success) {
        setProjectOptions(response.projects);
      }
    };
    fetchProjects();
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <Card className="mb-6 glass-effect">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
            <SlidersHorizontal className="w-5 h-5 mr-2 text-primary"/>
            <h3 className="text-lg font-semibold">Filter & Sort Tasks</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="status-filter" className="mb-1 block text-sm font-medium">Status</Label>
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger id="status-filter" className="w-full bg-background/70">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="to do">To Do</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="priority-filter" className="mb-1 block text-sm font-medium">Priority</Label>
            <Select
              value={filters.priority}
              onValueChange={(value) => handleFilterChange('priority', value)}
            >
              <SelectTrigger id="priority-filter" className="w-full bg-background/70">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="highest">Highest</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="lowest">Lowest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="project-filter" className="mb-1 block text-sm font-medium">Project</Label>
            <Select
              value={filters.project}
              onValueChange={(value) => handleFilterChange('project', value)}
              disabled={projectOptions.length === 0}
            >
              <SelectTrigger id="project-filter" className="w-full bg-background/70">
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projectOptions.map(proj => (
                  <SelectItem key={proj.key} value={proj.name}>{proj.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="sort-by" className="mb-1 block text-sm font-medium">Sort By</Label>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger id="sort-by" className="w-full bg-background/70">
                <SelectValue placeholder="Sort tasks by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="project">Project Name</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskFilters;