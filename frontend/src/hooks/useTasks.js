var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect, useState } from 'react';
import { apiFetchTasks, apiAddTask, apiUpdateTask, apiDeleteTask } from '../api';
import { useToast } from '../hooks/useToast';
export var useTasks = function () {
    // State for tasks and loading status
    var _a = useState([]), tasks = _a[0], setTasks = _a[1];
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    // Toast for user feedback
    var toast = useToast().toast;
    useEffect(function () {
        loadTasks();
    }, []);
    // Fetch tasks on initial load or when needed
    var loadTasks = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, apiFetchTasks()];
                case 2:
                    response = _a.sent();
                    if (response && response.data) {
                        setTasks(response.data);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching tasks:', error_1);
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: 'Failed to load tasks. Please try again.',
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Add a new task
    var addTask = function (task) { return __awaiter(void 0, void 0, void 0, function () {
        var response_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    return [4 /*yield*/, apiAddTask(task)];
                case 2:
                    response_1 = _a.sent();
                    if (!(response_1 && response_1.data)) return [3 /*break*/, 4];
                    return [4 /*yield*/, setTasks(function (prevTasks) { return __spreadArray(__spreadArray([], prevTasks, true), [response_1.data], false); })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    toast({
                        variant: 'destructive',
                        title: 'Failed',
                        description: response_1.error || 'An error occurred while adding the task.',
                    });
                    _a.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6:
                    error_2 = _a.sent();
                    console.error('Error adding task:', error_2);
                    toast({
                        variant: 'destructive',
                        title: 'Failed',
                        description: 'An error occurred while adding the task.',
                    });
                    return [3 /*break*/, 8];
                case 7:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    // Update an existing task
    var updateTask = function (task) { return __awaiter(void 0, void 0, void 0, function () {
        var response_2, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, apiUpdateTask(task)];
                case 2:
                    response_2 = _a.sent();
                    if (response_2 && response_2.data) {
                        setTasks(function (prevTasks) {
                            var updatedTaskIndex = prevTasks.findIndex(function (t) { return t.id === task.id; });
                            var currentTasks = __spreadArray([], prevTasks, true);
                            currentTasks.splice(updatedTaskIndex, 1, response_2.data);
                            return currentTasks;
                        });
                        toast({
                            variant: 'success',
                            title: 'Success',
                            description: "Task '".concat(task.title, "' updated successfully."),
                        });
                    }
                    else {
                        toast({
                            variant: 'destructive',
                            title: 'Failed',
                            description: response_2.error || 'An error occurred while updating the task.',
                        });
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error updating task:', error_3);
                    toast({
                        variant: 'destructive',
                        title: 'Failed',
                        description: 'An error occurred while updating the task.',
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Delete a task
    var deleteTask = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var response, taskToDelete, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, apiDeleteTask(id)];
                case 2:
                    response = _a.sent();
                    taskToDelete = tasks.find(function (task) { return task.id === id; });
                    if (response && response.data) {
                        setTasks(function (prevTasks) { return prevTasks.filter(function (task) { return task.id !== id; }); });
                        toast({
                            variant: 'success',
                            title: 'Successfully Deleted',
                            description: "Task '".concat(taskToDelete === null || taskToDelete === void 0 ? void 0 : taskToDelete.title, "' deleted successfully."),
                        });
                    }
                    else {
                        toast({
                            variant: 'destructive',
                            title: 'Failed',
                            description: response.error || 'An error occurred while deleting the task.',
                        });
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_4 = _a.sent();
                    console.error('Error deleting task:', error_4);
                    toast({
                        variant: 'destructive',
                        title: 'Failed',
                        description: 'An error occurred while deleting the task.',
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Return the necessary state and functions
    return {
        tasks: tasks,
        isLoading: isLoading,
        addTask: addTask,
        updateTask: updateTask,
        deleteTask: deleteTask,
    };
};
