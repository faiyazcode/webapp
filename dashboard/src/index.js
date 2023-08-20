import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM from 'react-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'tailwindcss/tailwind.css'; // This imports the default Tailwind CSS styles.
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
