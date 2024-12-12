"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const tasks_module_1 = require("./tasks.module");
const uuid_1 = require("uuid");
const helpers_1 = require("../utils/helpers");
let TasksService = class TasksService {
    constructor() {
        this.tasks = [];
    }
    validateTaskTitle(title) {
        if (!title) {
            return false;
        }
        return true;
    }
    validateTaskStatus(status) {
        if ((0, helpers_1.isInStringEnum)(status, tasks_module_1.TaskStatus)) {
            return true;
        }
        return false;
    }
    getAllTasks() {
        return this.tasks;
    }
    createTask(title, description) {
        if (!this.validateTaskTitle(title)) {
            return null;
        }
        const task = {
            id: (0, uuid_1.v4)(),
            title,
            description,
            status: tasks_module_1.TaskStatus.PENDING,
        };
        this.tasks.push(task);
        return task;
    }
    updateTaskStatus(id, updatedFields) {
        const { title, description, status } = updatedFields;
        if (title && !this.validateTaskTitle(title) || status && !this.validateTaskStatus(status)) {
            return null;
        }
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex < 0) {
            return null;
        }
        const task = this.tasks[taskIndex];
        this.tasks[taskIndex] = {
            ...this.tasks[taskIndex],
            title: title ?? task.title,
            description: description ?? task.description,
            status: status ?? task.status
        };
        return this.tasks[taskIndex];
    }
    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex < 0) {
            return false;
        }
        this.tasks.splice(taskIndex, 1);
        return true;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map