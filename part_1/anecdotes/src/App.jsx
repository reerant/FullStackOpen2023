import { useState } from "react";

const RandomAnecdote = ({ anecdote, votes }) => {
  return (
    <>
      <h1>Anecdote of the Day</h1>
      <div>{anecdote}</div>
      <div>has {votes} votes. </div>
    </>
  );
};
const MostVotes = ({ anecdote, votes }) => {
  if (votes === 0)
    return (
      <>
        <h2>Anecdote with most votes</h2>
        <div>No votes yet.</div>
      </>
    );

  return (
    <>
      <h2>Anecdote with most votes</h2>
      <div>{anecdote}</div>
      <div>has {votes} votes </div>
    </>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const getRandomIndex = () => Math.floor(Math.random() * anecdotes.length);

  const [selected, setSelected] = useState(getRandomIndex);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const getNewAnecdote = () => {
    setSelected(getRandomIndex());
  };

  const giveVote = () => {
    const copyOfVotes = [...votes];
    copyOfVotes[selected] += 1;
    setVotes(copyOfVotes);
  };

  const getIndexOfMostVotes = () => votes.indexOf(Math.max(...votes));

  return (
    <>
      <RandomAnecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={giveVote} text="Vote" />
      <Button onClick={getNewAnecdote} text="Next anecdote" />
      <MostVotes
        anecdote={anecdotes[getIndexOfMostVotes()]}
        votes={votes[getIndexOfMostVotes()]}
      />
    </>
  );
};

export default App;
