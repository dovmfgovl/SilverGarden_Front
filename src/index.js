import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginForm from './pages/login/LoginForm';
import AuthProvider from './pages/login/AuthProvider';
import { Provider } from 'react-redux';
import store from './redux/store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}></PersistGate>
        <Routes>
          <Route path='/' element={<LoginForm/>}></Route> 
          <Route path='/*' element={
            <AuthProvider>
              <App></App>
            </AuthProvider>
          }></Route>
        </Routes>
    </Provider>
  </BrowserRouter>
);