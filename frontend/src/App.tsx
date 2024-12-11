import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import TaskDialog from '@/components/task-dialog'
import { Task, TaskStatus } from './types/task'
import TaskList from './components/task-list'
import { Toaster } from "@/components/ui/toaster"
import { Icons } from './components/icons'
import { useTasks } from './hooks/useTasks'


function App() {
  const { tasks, isLoading, addTask, updateTask, deleteTask } = useTasks();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const openTaskDialog = () => {
    setIsDialogOpen(true)
  }

  const onSaveTaskHandler = (task: Task) => {
    setIsDialogOpen(false);
    if (editingTask) {
      updateTask(task);
    } else {
      addTask(task);
    }
    setEditingTask(null);
  };

  return (
    <div className='h-screen flex'>
      <div className="container mx-auto p-8 rounded-md m-4 bg-gray-400/50">
        <div className='flex w-full justify-between mb-4'>
          <h1 className="text-3xl font-bold mb-4 flex justify-center items-center">
            Task Manager
            { isLoading && <Icons.spinner className="ml-4 h-6 w-6 animate-spin" />}
          </h1> 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              onClick={() => {
                setEditingTask(null)
                openTaskDialog()
                }} 
              className="mb-4">
                <Plus className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </motion.div>
        </div>
        
        <AnimatePresence>
          <TaskList 
            tasks={tasks} 
            onEdit={(task)=>{
              setEditingTask(task)
              openTaskDialog()
            }} 
            onDelete={(id)=>{            
              deleteTask(id)
            }} 
          />
        </AnimatePresence>

      <TaskDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        onSave={onSaveTaskHandler}
        task={editingTask || { title: '', description: '', status: TaskStatus.PENDING } as Task}
      />
      <Toaster />
      </div>
    </div>
  )
}

export default App
