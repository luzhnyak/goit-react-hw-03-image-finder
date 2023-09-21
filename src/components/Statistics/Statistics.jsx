export const Statistics = ({
  good,
  neutral,
  bad,
  total,
  positivePercentage,
}) => {
  return (
    <>
      <p>
        <strong>Good:</strong> {good}
      </p>
      <p>
        <strong>Neutral:</strong> {neutral}
      </p>
      <p>
        <strong>Bad:</strong> {bad}
      </p>
      <p>
        <strong>Total:</strong> {total}
      </p>
      <p>
        <strong>Positive Feedback:</strong> {positivePercentage}%
      </p>
    </>
  );
};
