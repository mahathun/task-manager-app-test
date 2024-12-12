import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskStatus } from '@/types/task';
export default function TaskDialog(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, onSave = _a.onSave, task = _a.task;
    var _b = useState(''), title = _b[0], setTitle = _b[1];
    var _c = useState(''), description = _c[0], setDescription = _c[1];
    var _d = useState(TaskStatus.PENDING), status = _d[0], setStatus = _d[1];
    useEffect(function () {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
        else {
            setTitle('');
            setDescription('');
            setStatus(TaskStatus.PENDING);
        }
    }, [task]);
    var handleSave = function () {
        onSave({
            id: (task === null || task === void 0 ? void 0 : task.id) || Date.now().toString(),
            title: title,
            description: description,
            status: status,
        });
        onClose();
    };
    return (_jsx(AnimatePresence, { children: isOpen && (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsx(DialogContent, { className: 'pb-4', children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, transition: { duration: 0.3 }, children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: task ? 'Edit Task' : 'Create a New Task' }) }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsx(Input, { required: true, placeholder: "Task title", value: title, onChange: function (e) { return setTitle(e.target.value); } }), _jsx(Textarea, { placeholder: "Task description", value: description, onChange: function (e) { return setDescription(e.target.value); } }), _jsxs(Select, { disabled: Boolean(!task.id), value: status, onValueChange: function (value) { return setStatus(value); }, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: TaskStatus.PENDING, children: "Pending" }), _jsx(SelectItem, { value: TaskStatus.COMPLETED, children: "Completed" })] })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: onClose, children: "Cancel" }), _jsx(Button, { disabled: Boolean(!title), onClick: handleSave, children: "Save" })] })] }) }) })) }));
}
