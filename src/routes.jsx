import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Customiseres from './Customiseres';
import { LanguageProvider } from './languageContext';
import { TaskProvider } from './TaskProvider';
import Header from './Header';
import App from './App';
import PageNotFound from './PageNotFound';

function Routes1() {
  return ( 
    <BrowserRouter> 
      <LanguageProvider>
        <TaskProvider>
          <Header />
            <Routes>  
              <Route path='/' element={<App />} />
              <Route path='/custom' element={<Customiseres />} />
              <Route path='*' element={<PageNotFound/>}/>
            </Routes>  
        </TaskProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default Routes1;
