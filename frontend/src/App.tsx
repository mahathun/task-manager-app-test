import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { apiFetchTasks, apiAddTask, apiUpdateTask, apiDeleteTask } from './api'
import TaskDialog from '@/components/task-dialog'
import { Task } from './types/task'
import TaskList from './components/task-list'
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Icons } from './components/icons'


function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false)  
  const [tasks, setTasks] = useState<Task[]>([]) 
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)


  const { toast } = useToast()


  // Fetch tasks on initail load
  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true)
      const data = await apiFetchTasks()
      setTasks(data)
      setIsLoading(false)
    }

    loadTasks()
  }, [])


  // Adding a new task
  const addTask = async (task: Task) => {
    setIsLoading(true)
    
    const newTask = await apiAddTask(task)
    if (newTask) {
      setTasks([...tasks, newTask]) 
      toast({
        variant: "success",
        title: `Task '${task.title}'`,
        description: "Task created successfully",
      })
    }else{
      toast({
        variant: "destructive",
        title: `Failed: '${task.title}'`,
        description: "Failed to create the task.",
      })
    }

    setIsLoading(false)
  }

  
  // updating an existing task
  const updateTask = async(task: Task) => {
    setIsLoading(true)
    const updatedTasks = await apiUpdateTask(task)
    if(updatedTasks) {
      const updatedTaskIndex = tasks.findIndex((t) => t.id === task.id)
      const currentTasks = [...tasks]

      currentTasks.splice(updatedTaskIndex, 1, updatedTasks)
      setTasks(currentTasks)
      toast({
        variant: "default",
        title: `Task '${task.title}'`,
        description: "Task updated successfully",
      })
    }else{
      toast({
        variant: "destructive",
        title: `Failed: '${task.title}'`,
        description: "Failed to update the task.",
      })
    }

    setIsLoading(false)
  }

  // Deleting a task
  const deleteTask = async (id : Task["id"]) => {
    setIsLoading(true)

    const response = await apiDeleteTask(id)

    const taskToDelete = tasks.find((task) => task.id === id)

    if(response) {
      const newTasks = tasks.filter((task) => task.id !== id)
      setTasks(newTasks)
      toast({
        variant: "destructive",
        title: `Deleted '${taskToDelete.title}'`,
        description: `Task deleted successfully`,
      })
    }else{
      
      console.error('Failed to delete task')

      toast({
        variant: "destructive",
        title: "Failed to delete the task",
        description: "Failed to delete the task, Please try again after refreshing the page",
      })

    }

    setIsLoading(false)
  }



  const openTaskDialog = () => {
    setIsDialogOpen(true)
  }

  const onSaveTaskHandler = (task: Task) => {
    // closing the dialog before the async task to have a fluid loading experience
    setIsDialogOpen(false)

    if (editingTask) {
      updateTask(task)
    } else {
      addTask(task)
    }
  }

  return (
    <div className="container mx-auto p-4">
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
        task={editingTask}
      />
      <Toaster />
    </div>
  )
}

export default App
