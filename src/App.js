import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, createHttpLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import './App.css';

import { CreateModel, ModelList, Appbar } from "./components";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const authToken = JSON.parse(localStorage.getItem('User')) || '';
  // const token = authToken !== '' ? authToken.token : '';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // 'x-auth-token': token
      // authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Appbar />
          <Routes>
            <Route path="/" element={<ModelList />} />
            <Route path="/createmodel" element={<CreateModel />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </>

  );
}

export default App;
