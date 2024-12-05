import { EmployeeDirectory } from "./pages/EmployeeList";
import { EmployeeDetail } from "./pages/EmployeeDetail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import { EmployeeCreate } from "./pages/EmployeeCreate";
import EmployeeEdit from "./pages/EmployeeEdit";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EmployeeDirectory />,
      },
      {
        path: "/new",
        element: <EmployeeCreate />,
      },
      {
        path: "/employee/:id/edit",
        element: <EmployeeEdit />,
      },
      {
        path: "/employee/:id",
        element: <EmployeeDetail />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
