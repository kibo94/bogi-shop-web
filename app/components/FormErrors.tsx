import React from "react";
interface FormErrorsProps {
  errors: String[];
}
function FormErrors({ errors }: FormErrorsProps) {
  return (
    <>
      {errors.length > 0
        ? errors.map((err) => <p className="error-message">{err}</p>)
        : null}
    </>
  );
}

export default FormErrors;
