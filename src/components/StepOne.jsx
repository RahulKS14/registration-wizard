export default function StepOne({ formData, setFormData, onNext }) {
  const { firstName, lastName, dob } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const errors = {};
  if (!firstName.trim()) errors.firstName = "First name is required";
  if (!lastName.trim()) errors.lastName = "Last name is required";
  if (!dob) errors.dob = "Date of birth is required";
  else if (new Date(dob) > new Date()) errors.dob = "DOB cannot be in the future";

  const isValid = Object.keys(errors).length === 0;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2>Personal Info</h2>

      <input
        name="firstName"
        placeholder="First Name"
        value={firstName}
        onChange={handleChange}
      />
      {firstName && errors.firstName && <p className="error">{errors.firstName}</p>}

      <input
        name="lastName"
        placeholder="Last Name"
        value={lastName}
        onChange={handleChange}
      />
      {lastName && errors.lastName && <p className="error">{errors.lastName}</p>}

      <input type="date" name="dob" value={dob} onChange={handleChange} />
      {dob && errors.dob && <p className="error">{errors.dob}</p>}

      <button type="button" disabled={!isValid} onClick={onNext}>
        Next
      </button>
    </form>
  );
}