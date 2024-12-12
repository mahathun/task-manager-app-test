import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import TaskDialog from '@/components/task-dialog';
import { TaskStatus } from './types/task';
import TaskList from './components/task-list';
import { Toaster } from "@/components/ui/toaster";
import { Icons } from './components/icons';
import { useTasks } from './hooks/useTasks';
import { Badge } from '@/components/ui/badge';
function App() {
    var _a = useTasks(), tasks = _a.tasks, isLoading = _a.isLoading, addTask = _a.addTask, updateTask = _a.updateTask, deleteTask = _a.deleteTask;
    var _b = useState(false), isDialogOpen = _b[0], setIsDialogOpen = _b[1];
    var _c = useState(null), editingTask = _c[0], setEditingTask = _c[1];
    var openTaskDialog = function () {
        if (isLoading)
            return;
        setIsDialogOpen(true);
    };
    var onSaveTaskHandler = function (task) {
        if (isLoading)
            return;
        setIsDialogOpen(false);
        if (editingTask) {
            updateTask(task);
        }
        else {
            addTask(task);
        }
        setEditingTask(null);
    };
    return (_jsx("div", { className: 'min-h-screen flex', children: _jsxs("div", { className: "container mx-auto p-8 rounded-md m-4 bg-gray-400/50", children: [_jsxs("div", { className: 'flex w-full justify-between mb-4', children: [_jsxs("h1", { className: "text-3xl font-bold mb-4 flex justify-center items-center", children: ["Task Manager ", _jsx(Badge, { variant: 'secondary', className: "ml-2", children: "".concat(tasks.length, " task").concat(tasks.length === 1 ? '' : 's') }), isLoading && _jsx(Icons.spinner, { className: "ml-4 h-6 w-6 animate-spin" })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 }, children: _jsxs(Button, { disabled: isLoading, onClick: function () {
                                    setEditingTask(null);
                                    openTaskDialog();
                                }, className: "mb-4", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), " Add Task"] }) })] }), _jsx(AnimatePresence, { children: _jsx(TaskList, { tasks: tasks, onEdit: function (task) {
                            setEditingTask(task);
                            openTaskDialog();
                        }, onDelete: function (id) {
                            deleteTask(id);
                        } }) }), _jsx(TaskDialog, { isOpen: isDialogOpen, onClose: function () { return setIsDialogOpen(false); }, onSave: onSaveTaskHandler, task: editingTask || { title: '', description: '', status: TaskStatus.PENDING } }), _jsx(Toaster, {})] }) }));
}
export default App;
