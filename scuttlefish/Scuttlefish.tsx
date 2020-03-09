import React from "react";
import { hot } from "react-hot-loader/root";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import NavBar from "./components/NavBar";
import Routes from "./routes";

import "style-loader!css-loader!sass-loader!./base.scss";

const client = new ApolloClient({
  uri: "http://localhost:8058/graphql"
});

export default hot(() => (
  <ApolloProvider client={client}>
    <NavBar />
    <div className="main">
      <Routes />
    </div>
  </ApolloProvider>
));
