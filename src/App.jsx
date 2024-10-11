import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import Banner from './components/Banner'
import CourseList from './components/CourseList';
import EditForm from './components/EditForm';
import { useJsonQuery } from './utilities/fetch';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const Main = () => {
  const [data, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!data) return <h1>No course data found</h1>;
    
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
