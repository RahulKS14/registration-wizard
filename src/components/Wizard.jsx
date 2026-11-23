import { useState } from "react";
import ProgressBar from "./ProgressBar";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handleSubmit = () => {
    console.log(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card">
        <h2>Success ✅</h2>
        <p>Welcome, {formData.firstName}! Your account is created.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <ProgressBar step={step} total={3} />
      {step === 1 && (
        <StepOne formData={formData} setFormData={setFormData} onNext={next} />
      )}
      {step === 2 && (
        <StepTwo formData={formData} setFormData={setFormData} onNext={next} onBack={back} />
      )}
      {step === 3 && (
        <StepThree formData={formData} onBack={back} onSubmit={handleSubmit} />
      )}
    </div>
  );
}