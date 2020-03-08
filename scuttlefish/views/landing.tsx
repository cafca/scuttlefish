import React from "react"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import ReactMarkdown from "react-markdown"
import imageUtils from "../ssb-utils/images"
import ProcessButton from "../components/ProcessButton"

import "style-loader!css-loader!sass-loader!../base.scss"

const TIMELINE = gql`
  {
    threads(last: 10, privacy: PUBLIC) {
      edges {
        node {
          root {
            id
            text
            likesCount
            assertedTimestamp
            author {
              id
              imageLink
              name
            }
          }
          replies {
            id
            text
            likesCount
            assertedTimestamp
            author {
              id
              imageLink
              name
            }
          }
        }
      }
    }
  }
`

const Post = ({ data }) => {
  const created = new Date(data.assertedTimestamp).toLocaleString()
  return (
    <div className="post" key={`post-${data.id}`}>
      <header>
        <img
          className="avatar"
          src={imageUtils.loadImage(data.author?.imageLink)}
        />
        <div className="main">
          <div>{data.author?.name}</div>
          <div className="meta">{created}</div>
        </div>
        <div className="meta">
          <div className="likes">{data.likesCount} likes</div>
        </div>
      </header>
      <section>
        <ReactMarkdown
          source={data.text}
          transformImageUri={imageUtils.loadImage}
        />
      </section>
    </div>
  )
}

interface Props {}

const Landing: React.FunctionComponent<Props> = () => {
  const { loading, error, data } = useQuery(TIMELINE)
  if (loading) return <p>Loading...</p>
  if (error) {
    console.error(error)
    return <p>Error :(</p>
  }

  return (
    <div>
      <ProcessButton />
      <div className="content">
        {data.threads.edges.map(({ node }) => (
          <div className="edge" key={`edge-${node.root.id}`}>
            <Post data={node.root} />
            <div className="replies">
              {node.replies.map(reply => (
                <Post data={reply} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Landing
