import "core-js/stable"
import "regenerator-runtime/runtime"
import "react-hot-loader"
import React from "react"
import ReactDOM from "react-dom"
import Routes from "./routes"
import { ApolloProvider } from "@apollo/react-hooks"

import ApolloClient from "apollo-boost"

const client = new ApolloClient({
  uri: "http://localhost:8058/graphql"
})

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById("root"))
