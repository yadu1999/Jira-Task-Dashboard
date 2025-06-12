
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTask } from '@/contexts/TaskContext';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CreateTaskModal = ({ projectOptions }) => {
  const { createTask } = useTask();
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [projectName, setProjectName] = useState(projectOptions.length > 0 ? projectOptions[0].name : '');
  const [priority, setPriority] = useState('Medium');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const taskData = {
      summary,
      description,
      projectName,
      priority,
    };
    const result = await createTask(taskData);
    setIsLoading(false);
    if (result.success) {
      setOpen(false);
   
      setSummary('');
      setDescription('');
      setProjectName(projectOptions.length > 0 ? projectOptions[0].name : '');
      setPriority('Medium');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="glass-effect hover:bg-primary/20">
          <PlusCircle className="mr-2 h-4 w-4" /> Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] glass-effect">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Create New Task</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new Jira task.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="summary" className="text-right">
                  Summary
                </Label>
                <Input
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="col-span-3 bg-background/80"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3 bg-background/80 min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project" className="text-right">
                  Project
                </Label>
                <Select value={projectName} onValueChange={setProjectName} disabled={projectOptions.length === 0}>
                  <SelectTrigger className="col-span-3 bg-background/80">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectOptions.map(proj => (
                      <SelectItem key={proj.key} value={proj.name}>{proj.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="col-span-3 bg-background/80">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Highest">Highest</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Lowest">Lowest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Task'}
              </Button>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskModal;
