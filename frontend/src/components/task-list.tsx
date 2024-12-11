import { motion } from 'framer-motion'
import { Task, TaskStatus } from '@/types/task'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash } from 'lucide-react'

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {
        tasks.length === 0 && (<h3>Start adding tasks</h3>)
      }
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          layout
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className='flex justify-between mb-4'>
                <CardTitle>{task.title}</CardTitle>
                <Badge variant={task.status === TaskStatus.PENDING ? 'default' :  'success'}>
                  {task.status}
                </Badge>
              </div>
              
              <CardDescription>{task.description}</CardDescription>
            </CardHeader>
         
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => onEdit(task)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(task.id)}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

