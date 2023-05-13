// Imports from npm packages
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
//Imports from components
import Login from './components/loginForm';
import SearchResources from './pages/searchResources';
import Signup from './components/signupForm';
import Navbar from './components/navbar';
import Messages from './components/messages';
import Calendar from './components/calendar';
import Resources from './components/resources';
import DonationForm from './components/donationForm';
//import CSS
import './App.css';

const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripeKey);

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
    <Elements stripe={stripePromise}>
    <ApolloProvider client={client}>
    <Router>
    <div>     
      <Navbar/>
    </div>
    <Routes>
          <Route path="/" element={<SearchResources/>} />
          <Route path="/login" element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/messages' element={<Messages/>} />
          <Route path='/schedule' element={<Calendar/>} />
          <Route path='/resources' element={<Resources/>} />
        <Route path='/donate' element={<DonationForm/>} />
        </Routes>
    </Router>
    </ApolloProvider>
    </Elements>
  );
}

export default App;
