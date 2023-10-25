import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import EmployeeList from './pages/Employee-list';
import { Provider } from 'react-redux';
import store from './model/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Employee-List" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
