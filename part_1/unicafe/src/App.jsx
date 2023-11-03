import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({
  good,
  neutral,
  bad,
  all,
  avg,
  percentOfPositiveVotes,
}) => {
  if (all != 0)
    return (
      <>
        <table>
          <tbody>
            <StatisticLine text="Good:" value={good} />
            <StatisticLine text="Neutral:" value={neutral} />
            <StatisticLine text="Bad:" value={bad} />
            <StatisticLine text="All Votes:" value={all} />
            <StatisticLine text="Average:" value={avg} />
            <StatisticLine text="Positive" value={percentOfPositiveVotes + "%"} />
          </tbody>
        </table>
      </>
    );
  return <p>No feedback given.</p>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [values, setValues] = useState([]);

  const voteForGood = () => {
    setGood(good + 1);
    setAll(all + 1);
    setValues(values.concat(1));
  };
  const voteForNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    setValues(values.concat(0));
  };
  const voteForBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setValues(values.concat(-1));
  };

  const getAvg = () => {
    if (values.length != 0) {
      let sum = 0;
      values.forEach((value) => {
        sum += value;
      });
      const avg = sum / values.length;
      return avg;
    }
    return 0;
  };

  const getPercentOfPositiveVotes = () => {
    if (good != 0) {
      const positiveVotes = (good / all) * 100;
      return positiveVotes;
    }
    return 0;
  };

  return (
    <>
      <h1>Give feedback</h1>
      <div>
        <Button onClick={voteForGood} text="Good" />
        <Button onClick={voteForNeutral} text="Neutral" />
        <Button onClick={voteForBad} text="Bad" />
      </div>
      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        values={values}
        avg={getAvg()}
        percentOfPositiveVotes={getPercentOfPositiveVotes()}
      />
    </>
  );
};

export default App;
