import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, 
         Route, 
         RouterProvider, 
         createRoutesFromElements
} from "react-router-dom";
import store from './store';
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import HomeScreen from "./screens/HomeScreen";
import Layout from "./components/Layout";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

export function App() {
const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<Layout />}>
      <Route index={true} path="/" element={<HomeScreen/>} />
      <Route path="/login" element={<LoginScreen/>} />
      <Route path="/register" element={<RegisterScreen/>} />
      {/*Private Route */}
      <Route path="" element={<PrivateRoute />}>
      <Route path="/profile" element={<ProfileScreen/>} />
      </Route>
  </Route>
  )
)
  return (
    <>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    </>
     
  
  );
};

export default App;
