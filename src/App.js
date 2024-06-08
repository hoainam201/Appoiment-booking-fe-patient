import logo from './logo.svg';
import './App.css';
import {NormalRoutes, NotFound} from "./routes/routes";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastContainer} from 'react-toastify';
import Layout from "./layouts/layout";
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import {IntlProvider} from 'react-intl';
import './utils/i18n'


// Đối tượng intl có thể chứa các thông tin địa phương như ngôn ngữ, quốc gia, v.v.
const locale = navigator.language || 'vn';// Ngôn ngữ và quốc gia cụ thể


function App() {
  const queryClient = new QueryClient();
  return (
    <IntlProvider locale={locale}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer autoClose={1000}/>
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
                <Route path={NotFound.path} element={NotFound.element}/>
              </Route>
            </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </IntlProvider>
  );
}

export default App;
