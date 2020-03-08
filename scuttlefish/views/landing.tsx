import React from "react"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import ReactMarkdown from "react-markdown"
import imageUtils from "../ssb-utils/images"
import ProcessButton from "../components/ProcessButton"

const TIMELINE = gql`
  {
    threads(last: 10) {
      edges {
        node {
          root {
            id
            text
            likesCount
            author {
              name
            }
          }
          replies {
            text
            likesCount
            author {
              name
            }
          }
        }
      }
    }
  }
`

interface Props {}

const Landing: React.FunctionComponent<Props> = () => {
  const { loading, error, data } = useQuery(TIMELINE, { pollInterval: 5000 })
  if (loading) return <p>Loading...</p>
  if (error) {
    console.error(error)
    return <p>Error :(</p>
  }

  http: return (
    <div>
      <ProcessButton />
      {data.threads.edges.map(({ node }) => (
        <div className="post" key={`post-${node.root.id}`}>
          <h1>
            <em>{node.root.author.name}: </em>
          </h1>
          <ReactMarkdown
            source={node.root.text}
            transformImageUri={imageUtils.loadImage}
          />
        </div>
      ))}
    </div>
  )
}

export default Landing
