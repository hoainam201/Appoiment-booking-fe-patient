import logo from './logo.svg';
import './App.css';
import {NormalRoutes, NotFound} from "./routes/routes";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import Layout from "./layouts/layout";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            {NormalRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
          <Route element={<Layout/>}>
            <Route path={NotFound.path} element={NotFound.element} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
