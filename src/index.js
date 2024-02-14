import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginTest from './LoginTest';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginTest/>}></Route>
      <Route path='/*' element={<App></App>}></Route>
    </Routes>
  </BrowserRouter>
);