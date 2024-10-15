import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./modules/login/Login";
import Home from "./modules/home/Home";
import { ActionProvider } from "./modules/home/components/ActionContext";
import { Provider } from "react-redux";
import store from "./store/store";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      {/* <Route index element={<Login />} /> */}
      <Route index element={<Home />} />
      {/* <Route path="login" element={<Login />} /> */}
      {/* <Route path="home" element={<Home />} /> */}
    </Route>,
  ),
);
function App() {
  return (
    <>
      <Provider store={store}>
        <ActionProvider>
          <RouterProvider router={router} />
        </ActionProvider>
      </Provider>
    </>
  );
}

export default App;