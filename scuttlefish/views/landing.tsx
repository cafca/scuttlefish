import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import ReactMarkdown from "react-markdown";
import imageUtils from "../ssb-utils/images";
import ProcessButton from "../components/ProcessButton";

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
`;

interface PostProps {
  data: {
    assertedTimestamp: string;
    author?: {
      imageLink?: string;
      name?: string;
    };
    likesCount: number;
    text: string;
  };
}

const Post: React.FunctionComponent<PostProps> = ({ data }: PostProps) => {
  const created = new Date(data.assertedTimestamp).toLocaleString();
  return (
    <div className="post">
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
  );
};

interface Post {
  id: string;
  text: string;
  likesCount: number;
  assertedTimestamp: string;
  author: {
    id: string;
    imageLink?: string;
    name?: string;
  };
}

interface Edge {
  node: {
    root: Post;
    replies: Post[];
  };
}

interface TimelineData {
  threads: {
    edges: Edge[];
  };
}

const Landing: React.FunctionComponent = () => {
  const { loading, error, data } = useQuery<TimelineData>(TIMELINE);
  if (loading) return <p>Loading...</p>;
  if (error != null) {
    console.error(error);
    return <p>Error :(</p>;
  }

  return (
    <div>
      <ProcessButton />
      <div className="content">
        {data.threads.edges.map(({ node }) => {
          const rootId: string = node.root.id;
          return (
            <div className="edge" key={`edge-${rootId}`}>
              <Post data={node.root} />
              <div className="replies">
                {node.replies.map(reply => (
                  <Post data={reply} key={reply.id} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Landing;
