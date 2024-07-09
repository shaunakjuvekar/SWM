# Solid Waste Management System

A ReactJS and Python-Flask web application.


SWEEP (Solid Waste Echelon-Embedded Planner) is a web-based tool for designing a Municipal Solid Waste (MSW) management system. Given potential locations, sizes, and relevant costs for facilities in each echelon, and capacities of vehicles (collection agents such as trucks, tractors, among others), it enables the user to choose the number, sizes, and locations of requisite facilities in each echelon, as well as the number of vehicles and their routes to use for transporting waste among echelons, thereby generating an execution plan. This plan is obtained by solving an underlying “Multi-Echelon Location Routing problem” using an optimal seeking method.

# How I Worked on This Project
- Initial Discussions: Collaborated with Dr. Subhash Sarin and Akshat Kothyari from the ISE department to discuss the project requirements and scope.

- UI Design: Designed and received approval for the UI wireframes.

- Setup: Used the Vite build tool to set up ReactJS and created a virtual environment for Flask.

- Planning: Created a todo sheet listing features to implement and bugs to fix.

- Dockerization: Dockerized the frontend and backend separately for a production build.

- Deployment: Used Virginia Tech's cloud server documentation to deploy the Docker containers on a Kubernetes cluster.

# How to Navigate This Project
- Folder Structure:

- vite-project contains the frontend React code.
swm-backend contains the backend Python code.
Build Steps: Refer to the next section of this README for detailed build steps.

- Routing Logic: The project includes a somewhat complex routing logic, which can be found [here](https://github.com/shaunakjuvekar/SWM/blob/main/vite-project/src/Routes.jsx).

# Why I Built the Project This Way
- ReactJS: Chose ReactJS due to familiarity with the framework and the project's requirement for state management.

- State Management: Used local states and the UseContext API instead of a state management library like Redux, as Redux seemed overkill for this project and the Context API felt more intuitive.

- Flask: Opted for Flask for developing backend APIs and integrating with the Gurobi solver due to its ease of setup and speed.

# Future Improvements
If I had more time, I would:

- Use a better tool for organizing workflow, such as Trello.

- Add unit and end-to-end tests for the frontend.

- Set up continuous integration to run unit tests and ESLint on every pull request.

- Refactor the backend code and implement more robust error handling.

# Frontend Vite/ReactJS Installation

Open terminal in the root directory of the repository.

## Build Setup

```
# install dependencies
npm install
This will install all the frontend dependencies.

# serve with hot reload at localhost:5173
npm run dev
```

# Backend Python Installation

```
Please refer to the README inside swm_backend for build setup.

For Gurobi, you will need an activated license. Please refer to this link for more details:
https://www.gurobi.com/solutions/licensing/
```








