export default function ProgressBar({ step, total }) {
  return (
    <div>
      <p>Step {step} of {total}</p>
      <div className="bar">
        <div className="bar-fill" style={{ width: `${(step / total) * 100}%` }} />
      </div>
    </div>
  );
}