
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { CalendarDays, User, Tag, Layers, AlignLeft, AlertTriangle, CheckCircle2, ArrowRightCircle } from 'lucide-react';

const TaskDetailsModal = ({ task, isOpen, onClose }) => {
  if (!task) return null;

  const priorityColors = {
    'Highest': 'bg-red-600 hover:bg-red-700 text-white',
    'High': 'bg-orange-500 hover:bg-orange-600 text-white',
    'Medium': 'bg-yellow-500 hover:bg-yellow-600 text-black',
    'Low': 'bg-green-500 hover:bg-green-600 text-white',
    'Lowest': 'bg-blue-500 hover:bg-blue-600 text-white',
  };

  const statusColors = {
    'To Do': 'bg-gray-500 hover:bg-gray-600 text-white',
    'In Progress': 'bg-blue-500 hover:bg-blue-600 text-white',
    'Done': 'bg-green-600 hover:bg-green-700 text-white',
    'Blocked': 'bg-red-500 hover:bg-red-600 text-white',
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'To Do': return <ArrowRightCircle className="h-4 w-4 mr-1" />;
      case 'In Progress': return <ArrowRightCircle className="h-4 w-4 mr-1 animate-pulse text-blue-400" />;
      case 'Done': return <CheckCircle2 className="h-4 w-4 mr-1 text-green-400" />;
      case 'Blocked': return <AlertTriangle className="h-4 w-4 mr-1 text-red-400" />;
      default: return null;
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl glass-effect p-0">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <DialogHeader className="p-6 pb-4 border-b border-border">
            <DialogTitle className="text-2xl font-bold flex items-center">
              {task.summary}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Task Key: {task.key}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[70vh]">
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground flex items-center"><Layers className="h-4 w-4 mr-2 text-primary" />Project</Label>
                  <p className="text-sm font-semibold">{task.projectName}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground flex items-center"><Tag className="h-4 w-4 mr-2 text-primary" />Sprint</Label>
                  <p className="text-sm">{task.sprint || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground flex items-center"><User className="h-4 w-4 mr-2 text-primary" />Assignee</Label>
                  <p className="text-sm">{task.assignee || 'Unassigned'}</p>
                </div>
                 <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground flex items-center">{getStatusIcon(task.status)}Status</Label>
                  <Badge className={`text-xs ${statusColors[task.status] || 'bg-gray-400'}`}>{task.status}</Badge>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground flex items-center"><AlertTriangle className="h-4 w-4 mr-2 text-primary" />Priority</Label>
                  <Badge className={`text-xs ${priorityColors[task.priority] || 'bg-gray-400'}`}>{task.priority}</Badge>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium text-muted-foreground flex items-center"><AlignLeft className="h-4 w-4 mr-2 text-primary" />Description</Label>
                <div className="p-3 border rounded-md bg-background/50 min-h-[100px] prose prose-sm dark:prose-invert max-w-none">
                  {task.description ? (
                    <p className="whitespace-pre-wrap">{task.description}</p>
                  ) : (
                    <p className="italic text-muted-foreground">No description provided.</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground flex items-center"><CalendarDays className="h-4 w-4 mr-2 text-primary" />Created</Label>
                  <p className="text-sm">{new Date(task.created).toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground flex items-center"><CalendarDays className="h-4 w-4 mr-2 text-primary" />Last Updated</Label>
                  <p className="text-sm">{new Date(task.updated).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </ScrollArea>
          
          <div className="p-6 pt-4 border-t border-border flex justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline">Close</Button>
            </DialogClose>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsModal;
