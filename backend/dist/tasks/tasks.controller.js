"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const tasks_module_1 = require("./tasks.module");
const helpers_1 = require("../utils/helpers");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }
    createTask(body) {
        const { title, description } = body;
        if (!title) {
            throw new common_1.HttpException('Title is required', common_1.HttpStatus.BAD_REQUEST);
        }
        const task = this.tasksService.createTask(title, description);
        return task;
    }
    updateTaskStatus(updateFields, id) {
        const { title, status } = updateFields;
        if (title === "") {
            throw new common_1.HttpException('Title is required', common_1.HttpStatus.BAD_REQUEST);
        }
        if (status && !(0, helpers_1.isInStringEnum)(status, tasks_module_1.TaskStatus)) {
            throw new common_1.HttpException('Only Pending and Completed status allowed', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.tasksService.updateTaskStatus(id, updateFields);
    }
    deleteTask(id) {
        const hasTaskDeleted = this.tasksService.deleteTask(id);
        if (!hasTaskDeleted) {
            throw new common_1.HttpException('Task not found', common_1.HttpStatus.NOT_FOUND);
        }
        return hasTaskDeleted;
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getAllTasks", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", tasks_module_1.Task)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", tasks_module_1.Task)
], TasksController.prototype, "updateTaskStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Boolean)
], TasksController.prototype, "deleteTask", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map