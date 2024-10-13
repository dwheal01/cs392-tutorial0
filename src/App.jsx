import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDbData } from "./utilities/firebase";

import Banner from './components/Banner'
import CourseList from './components/CourseList';
import EditForm from './components/EditForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const Main = () => {
  const [data, error] = useDbData('/');

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;
    
  return (
    <div className="App">
      <Banner title={data.title} />

      <Router>
        <Routes>
          <Route path="/" element={<CourseList courses={data.courses}/>} />
          <Route path="/course-form" element={<EditForm />} />
        </Routes>
      </Router>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main />
    </div>
  </QueryClientProvider>
);

export default App;
