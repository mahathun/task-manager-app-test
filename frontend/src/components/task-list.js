import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { TaskStatus } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash } from 'lucide-react';
export default function TaskList(_a) {
    var tasks = _a.tasks, onEdit = _a.onEdit, onDelete = _a.onDelete;
    return (_jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: [tasks.length === 0 && (_jsx("h3", { children: "Start adding tasks" })), tasks.map(function (task) { return (_jsx(motion.div, { layout: true, initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 }, transition: { duration: 0.3 }, children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: 'flex justify-between mb-4', children: [_jsx(CardTitle, { children: task.title }), _jsx(Badge, { variant: task.status === TaskStatus.PENDING ? 'default' : 'success', children: task.status })] }), _jsx(CardDescription, { children: task.description })] }), _jsxs(CardFooter, { className: "flex justify-between", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: function () { return onEdit(task); }, children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), " Edit"] }), _jsxs(Button, { variant: "destructive", size: "sm", onClick: function () { return onDelete(task.id); }, children: [_jsx(Trash, { className: "mr-2 h-4 w-4" }), " Delete"] })] })] }) }, task.id)); })] }));
}
