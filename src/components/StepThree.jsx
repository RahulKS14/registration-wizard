export default function StepThree({ formData, onBack, onSubmit }) {
  return (
    <div>
      <h2>Review & Submit</h2>
      <ul>
        <li>First Name: {formData.firstName}</li>
        <li>Last Name: {formData.lastName}</li>
        <li>DOB: {formData.dob}</li>
        <li>Email: {formData.email}</li>
        <li>Password: {"•".repeat(formData.password.length)}</li>
      </ul>
      <button type="button" onClick={onBack}>Back</button>
      <button type="button" onClick={onSubmit}>Submit</button>
    </div>
  );
}