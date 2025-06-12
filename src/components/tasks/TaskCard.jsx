
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit2, Check, X, CornerDownLeft, MoreVertical, Trash2, Eye, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { priorityColors, statusColors } from '../../lib/utils';

const TaskCard = ({ task, onEditTask, onViewDetails }) => {
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editableSummary, setEditableSummary] = useState(task.summary);
  const [editableDescription, setEditableDescription] = useState(task.description || '');
  
  const descriptionTextareaRef = useRef(null);

  useEffect(() => {
    if (isEditingDescription && descriptionTextareaRef.current) {
      descriptionTextareaRef.current.focus();
      descriptionTextareaRef.current.select();
    }
  }, [isEditingDescription]);

  // const priorityColors = {
  //   'Highest': 'bg-red-600 hover:bg-red-700 text-white',
  //   'High': 'bg-orange-500 hover:bg-orange-600 text-white',
  //   'Medium': 'bg-yellow-500 hover:bg-yellow-600 text-black dark:text-yellow-900',
  //   'Low': 'bg-green-500 hover:bg-green-600 text-white',
  //   'Lowest': 'bg-blue-500 hover:bg-blue-600 text-white',
  // };

  // const statusColors = {
  //   'To Do': 'bg-gray-500 hover:bg-gray-600 text-white',
  //   'In Progress': 'bg-blue-500 hover:bg-blue-600 text-white',
  //   'Done': 'bg-green-600 hover:bg-green-700 text-white',
  //   'Blocked': 'bg-red-500 hover:bg-red-600 text-white',
  // };

  const handleSummaryEdit = () => setIsEditingSummary(true);
  const handleSummaryCancel = () => {
    setIsEditingSummary(false);
    setEditableSummary(task.summary);
  };
  const handleSummarySave = async () => {
    if (!editableSummary.trim()) {
      toast({ title: "Validation Error", description: "Summary cannot be empty.", variant: "destructive" });
      return;
    }
    await onEditTask(task.key, { summary: editableSummary });
    setIsEditingSummary(false);
  };

  const handleDescriptionDoubleClick = () => setIsEditingDescription(true);
  const handleDescriptionBlur = async () => {
    if (isEditingDescription) { 
      await onEditTask(task.key, { description: editableDescription });
      setIsEditingDescription(false);
    }
  };
  const handleDescriptionKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleDescriptionBlur();
    }
    if (e.key === 'Escape') { 
      setIsEditingDescription(false);
      setEditableDescription(task.description || '');
    }
  };

  const handleQuickStatusChange = async (newStatus) => {
    await onEditTask(task.key, { status: newStatus });
  };

  const handleQuickPriorityChange = async (newPriority) => {
    await onEditTask(task.key, { priority: newPriority });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 12 } }
  };

  return (
    <motion.div variants={cardVariants} className="task-card glass-effect flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          {isEditingSummary ? (
            <div className="flex-grow flex items-center gap-1">
              <Input 
                value={editableSummary} 
                onChange={(e) => setEditableSummary(e.target.value)}
                className="text-lg font-semibold flex-grow bg-background/70 h-9"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleSummarySave()}
              />
              <Button variant="ghost" size="icon" onClick={handleSummarySave} className="h-9 w-9">
                <Check className="h-4 w-4 text-green-500" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSummaryCancel} className="h-9 w-9">
                <X className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ) : (
            <CardTitle 
              className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors line-clamp-2" 
              onDoubleClick={handleSummaryEdit}
              title="Double-click to edit summary"
            >
              {task.summary}
            </CardTitle>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="flex-shrink-0 h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-effect">
              <DropdownMenuItem onClick={handleSummaryEdit}>
                <Edit2 className="mr-2 h-4 w-4" /> Edit Summary
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewDetails(task)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast({title: "🚧 Feature Not Implemented", description: "Deleting tasks isn't implemented yet—but don't worry!! 🚀"})} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="text-xs text-muted-foreground pt-1">{task.key} - {task.projectName}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3 flex-grow">
        <div className="flex items-center justify-between gap-2">
          <div>
            <Label className="text-xs font-medium text-muted-foreground">Status</Label>
            <Select value={task.status} onValueChange={handleQuickStatusChange}>
              <SelectTrigger className="w-auto h-7 px-2 py-1 text-xs bg-transparent border-0 shadow-none focus:ring-0 focus:ring-offset-0 [&>span]:line-clamp-1">
                <SelectValue /> <ChevronDown className="h-3 w-3 opacity-50 ml-1"/>
              </SelectTrigger>
              <SelectContent className="glass-effect">
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
                <SelectItem value="Blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <Badge className={`text-xs font-medium ${statusColors[task.status] || 'bg-gray-400'}`}>{task.status}</Badge>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div>
            <Label className="text-xs font-medium text-muted-foreground">Priority</Label>
             <Select value={task.priority} onValueChange={handleQuickPriorityChange}>
              <SelectTrigger className="w-auto h-7 px-2 py-1 text-xs bg-transparent border-0 shadow-none focus:ring-0 focus:ring-offset-0 [&>span]:line-clamp-1">
                <SelectValue /> <ChevronDown className="h-3 w-3 opacity-50 ml-1"/>
              </SelectTrigger>
              <SelectContent className="glass-effect">
                <SelectItem value="Highest">Highest</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Lowest">Lowest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Badge className={`text-xs font-medium ${priorityColors[task.priority] || 'bg-gray-400'}`}>{task.priority}</Badge>
        </div>

        {task.sprint && (
          <div>
            <Label className="text-xs font-medium text-muted-foreground">Sprint</Label>
            <p className="text-sm line-clamp-1">{task.sprint}</p>
          </div>
        )}
        
        <div>
          <Label className="text-xs font-medium text-muted-foreground">Description</Label>
          {isEditingDescription ? (
            <Textarea
              ref={descriptionTextareaRef}
              value={editableDescription}
              onChange={(e) => setEditableDescription(e.target.value)}
              onBlur={handleDescriptionBlur}
              onKeyDown={handleDescriptionKeyDown}
              className="text-sm bg-background/70 min-h-[60px] mt-1"
              placeholder="Enter task description..."
            />
          ) : (
            <p 
              className="text-sm text-foreground/80 line-clamp-2 cursor-pointer hover:text-foreground transition-colors mt-1 min-h-[40px]" 
              onDoubleClick={handleDescriptionDoubleClick}
              title="Double-click to edit description"
            >
              {task.description || <span className="italic text-muted-foreground">No description. Double-click to add.</span>}
            </p>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="text-xs text-muted-foreground justify-between items-center pt-3 mt-auto">
        <span>Updated: {new Date(task.updated).toLocaleDateString()}</span>
        <Button variant="link" size="sm" className="text-primary p-0 h-auto hover:underline text-xs" onClick={() => onViewDetails(task)}>
          View Details <CornerDownLeft className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </motion.div>
  );
};

export default TaskCard;
