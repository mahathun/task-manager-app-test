import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { apiFetchTasks, apiAddTask, apiUpdateTask, apiDeleteTask } from './api'
import TaskDialog from '@/components/task-dialog'
import { Task, TaskStatus } from './types/task'
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
      const response = await apiFetchTasks()
      if(response && response.data) { 
        setTasks(response.data as Task[])
      }
      
      setIsLoading(false)
    }

    loadTasks()
  }, [])


  // Adding a new task
  const addTask = async (task: Task) => {
    setIsLoading(true)
    
    const response = await apiAddTask(task)
    
    if (response && response.data) {
      setTasks([...tasks, response.data as Task]) 
      toast({
        variant: "success",
        title: "Sucess",
        description: `Task '${task.title}' created successfully`,
      })
    }else{
      toast({
        variant: "destructive",
        title: "Failed",
        description: `${response.error}`,
      })
    }

    setIsLoading(false)
  }

  
  // updating an existing task
  const updateTask = async(task: Task) => {
    setIsLoading(true)
    const response = await apiUpdateTask(task)
    if( response && response.data) {
      const updatedTaskIndex = tasks.findIndex((t) => t.id === task.id)
      const currentTasks = [...tasks]

      currentTasks.splice(updatedTaskIndex, 1, response.data as Task) 
      setTasks(currentTasks)
      toast({
        variant: "default",
        title: "Success",
        description: `Task '${task.title}' updated successfully`,
      })
    }else{
      toast({
        variant: "destructive",
        title: `Failed`,
        description: `${response.error}`,
      })
    }

    setIsLoading(false)
  }

  // Deleting a task
  const deleteTask = async (id : Task["id"]) => {
    setIsLoading(true)

    const response = await apiDeleteTask(id)

    const taskToDelete = tasks.find((task) => task.id === id)

    if(response && response.data) {
      const newTasks = tasks.filter((task) => task.id !== id)
      setTasks(newTasks)
      toast({
        variant: "success",
        title: "Successfully Deleted",
        description: `Task '${taskToDelete?.title}' deleted successfully`,
      })
    }else{
      
      console.error('Failed to delete task')

      toast({
        variant: "destructive",
        title: "Failed",
        description: `${response.error}`,
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

    setEditingTask(null)  
  }

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
