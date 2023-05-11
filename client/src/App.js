import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/loginForm';
import SearchResources from './pages/searchResources';
import Signup from './components/signupForm';
import Navbar from './components/navbar';
import Messages from './components/messages';
import Calendar from './components/calendar';
import Discussions from './components/discussions';
import Resources from './components/resources';
import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql"
}
  )
  const authLink = setContext((_,{headers}) => {
    const token = localStorage.getItem("id_token")
    return {
      headers:{
        ...headers,
        authorization: token ? `bearer ${token}` : ""
      }

    }
  })
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
    <div>     
      <Navbar/>
    </div>
    <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<SearchResources/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/messages' element={<Messages/>} />
          <Route path='/calendar' element={<Calendar/>} />
          <Route path='discussions' element={<Discussions/>} />
          <Route path='/resources' element={<Resources/>} />
        </Routes>
    </Router>
    </ApolloProvider>
  );
}

export default App;
