import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ProgressBar from "./ProgressBar";

const emailRule = z
  .string()
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email (must contain @)");

const step1Schema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((v) => new Date(v) <= new Date(), "DOB cannot be in the future"),
});

const step2Fields = z.object({
  email: emailRule,
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
});

const matchCheck = (d) => d.password === d.confirmPassword;
const matchError = {
  message: "Passwords do not match",
  path: ["confirmPassword"],
};

const step2Schema = step2Fields.refine(matchCheck, matchError);
const fullSchema = step1Schema.extend(step2Fields.shape).refine(matchCheck, matchError);

const stepSchemas = { 1: step1Schema, 2: step2Schema };

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fullSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const values = watch();
  const stepValid = step < 3 && stepSchemas[step].safeParse(values).success;
  const type = showPassword ? "text" : "password";

  const onSubmit = (data) => {
    console.log(data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card">
        <h2>Success ✅</h2>
        <p>Welcome, {values.firstName}! Your account is created.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <ProgressBar step={step} total={3} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <>
            <h2>Personal Info</h2>
            <input placeholder="First Name" {...register("firstName")} />
            <p className="error">{errors.firstName?.message}</p>
            <input placeholder="Last Name" {...register("lastName")} />
            <p className="error">{errors.lastName?.message}</p>
            <input type="date" {...register("dob")} />
            <p className="error">{errors.dob?.message}</p>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Account Details</h2>
            <input placeholder="Email" {...register("email")} />
            <p className="error">{errors.email?.message}</p>
            <div className="pw-row">
              <input type={type} placeholder="Password" {...register("password")} />
              <button type="button" onClick={() => setShowPassword((s) => !s)}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <p className="error">{errors.password?.message}</p>
            <input type={type} placeholder="Confirm Password" {...register("confirmPassword")} />
            <p className="error">{errors.confirmPassword?.message}</p>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Review & Submit</h2>
            <ul>
              <li>First Name: {values.firstName}</li>
              <li>Last Name: {values.lastName}</li>
              <li>DOB: {values.dob}</li>
              <li>Email: {values.email}</li>
              <li>Password: {"•".repeat(values.password.length)}</li>
            </ul>
          </>
        )}

        {step > 1 && (
          <button type="button" onClick={() => setStep(step - 1)}>Back</button>
        )}
        {step < 3 && (
          <button type="button" disabled={!stepValid} onClick={() => setStep(step + 1)}>
            Next
          </button>
        )}
        {step === 3 && <button type="submit">Submit</button>}
      </form>
    </div>
  );
}