# Simple Task Manager

A simple task management application with a frontend built using React (TypeScript) and a backend built using NestJ(TypeScript). This application allows users to create, view, edit, and delete tasks dynamically.

---

## Objective
Build a simple task management application with both a frontend and backend. This test will
evaluate your ability to work with React (using TypeScript) and create APIs in any language (bonus
points for using NestJS).

## Features

### Backend
- RESTful API endpoints:
  - `GET /tasks`: Fetch all tasks
  - `POST /tasks`: Create a new task
  - `PUT /tasks/:id`: Update a task (title, description, or status)
  - `DELETE /tasks/:id`: Delete a task
- In-memory data storage
- Task validation:
  - Title cannot be empty
  - Status must be either `pending` or `completed`

### Frontend
- Task management UI:
  - Display a list of tasks
  - Add new tasks (title, description)
  - Edit existing tasks (title, description, and status)
  - Delete tasks
- Dynamic UI updates for all task operations
- Responsive design with tailwind+shadcn component

---

## Dependencies

### Backend
- [NestJS](https://nestjs.com/)
- [uuid](https://www.npmjs.com/package/uuid) - for generating unique task IDs 

### Frontend
- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- `axios` (for API communication)

---

## Setup and Installation

1. Clone the repository.
    ```bash
    git clone git@github.com:mahathun/task-manager-app-test.git
2. Navigate to the app folder
    ```bash
    cd task-manager-app-test
    ```

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
2. Install dependancies:
    ```bash
    npm install
3. Start the backend server
    ```bash
    npm run start
4.	The backend server will run on [http://localhost:4000](http://localhost:4000)

5. Run the tests
    ```bash
    npm run test
    ```
    or
    ```bash
    npm run test:cov
    ```
    or
    ```bash
    npm run test:watch
    ```



### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd backend
2. Install dependancies:
    ```bash
    npm install
3. Start the frontend application
    ```bash
    npm run dev
    ```
4. The frontend app will run on [http://localhost:5173](http://localhost:5173)
5. Run the tests
    ```bash
    npm run test
    ```
    or
    ```bash
    npm run test:cov
    ```
    or
    ```bash
    npm run test:watch
    ```



## Potential improvements

* **Add an Authentication/Authorisation layer** - Currently the API is open for everyone. 
* **Use FSM(Finite State Machine)s to handle ui intercation** - Using FSM library like xstate will improve the maintainability and stop any unwanted behaviours in the UI
* **Internationalization(i18n) support** - Having intenationalization and localization will make app usable on multiple different languages.
* **Better HTTP errors** - Having better/more https response errors on API will make the developer expereince better.
* **Persistant storage** - Currently all the task are stored in memory. Instead having a persistant storage (e.g. Database) would be better
* **Aumated type generation** - Automate the type genaration from the api onto the front end layer will make things more maintable and testable. (e.g. rover for graphql)
* **More tests** - adding more test will make maintability easier. 
* **Enhanced Validations** - Use a validation library (e.g., class-validator) for stricter validation.
* **Search/Filter** -  Add a search or filter feature for tasks.
* **Real-time Updates** - Use WebSockets or a similar technology for real-time task updates.
* **More Automated code quality/linting checks** - adding more linting guilelines and automated code quality check on commit will make the code more quality in the long run.
* **Data clensing** - in an production environment we would want to cleanup user data a little bit more.
* **Deployment** - Automated deployment