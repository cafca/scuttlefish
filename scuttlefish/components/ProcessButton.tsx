import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { gql } from "apollo-boost";

const PROCESS = gql`
  mutation process($chunkSize: Int!) {
    process(chunkSize: $chunkSize) {
      chunkSize
      latestSequence
    }
  }
`;

interface ProcessResult {
  data?: { process: { latestSequence: number } };
}

const ProcessButton: React.SFC = () => {
  const [firstSequence, setFirstSequence] = useState<number | undefined>(null);
  const [latestSequence, setLatestSequence] = useState<number | undefined>(
    null
  );
  const [runProcess, { loading, error }] = useMutation(PROCESS);

  const onClick = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    const result: ProcessResult = await runProcess({
      variables: { chunkSize: 1000 }
    });
    const latestSequence = result.data?.process.latestSequence;
    setLatestSequence(latestSequence);
    if (firstSequence == null) setFirstSequence(latestSequence);
  };

  return (
    <div>
      <button onClick={onClick} disabled={loading}>
        Run indexer
      </button>
      {firstSequence != null && (
        <span>processed {latestSequence - firstSequence}</span>
      )}
      {error != null && <span style={{ color: "red" }}>{error.message}</span>}
    </div>
  );
};

export default ProcessButton;
