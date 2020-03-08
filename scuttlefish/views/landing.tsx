import React from "react"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import ReactMarkdown from "react-markdown"

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
  const { loading, error, data } = useQuery(TIMELINE)
  if (loading) return <p>Loading...</p>
  if (error) {
    console.error(error)
    return <p>Error :(</p>
  }

  const loadImage = (uri: string) => {
    let result = ""
    const raw = atob(uri.slice(1, 45))
    for (let i = 0; i < raw.length; i++) {
      const hex = raw.charCodeAt(i).toString(16)
      result += hex.length === 2 ? hex : "0" + hex
    }
    const prefix = result.slice(0, 2)
    const suffix = result.slice(2)
    return `/static/${prefix}/${suffix}`
  }

  http: return (
    <div>
      {data.threads.edges.map(({ node }) => (
        <div className="post" key={`post-${node.root.id}`}>
          <h1>
            <em>{node.root.author.name}: </em>
          </h1>
          <ReactMarkdown
            source={node.root.text}
            transformImageUri={loadImage}
          />
        </div>
      ))}
    </div>
  )
}

export default Landing
