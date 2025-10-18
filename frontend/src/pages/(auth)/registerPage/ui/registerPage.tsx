import { RegisterForm } from "@/entities/auth/ui/registerForm";
import { RegisterRole } from "@/entities/auth/ui/registerRole";
import { AuthWrapper } from "@/entities/auth/ui/authWrapper";
import React, { useCallback, useState } from "react";

const RegisterPage = () => {
  const [registerStep, setRegisterStep] = useState<"role" | "info">("role");

  const handleNextStep = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setRegisterStep(event.currentTarget.value as "role" | "info");
    },
    []
  );

  return (
    <div className="space-y-2 w-full flex flex-col justify-center">
      <AuthWrapper>
        {registerStep === "role" && (
          <RegisterRole onNextStep={handleNextStep} />
        )}
        {registerStep === "info" && <RegisterForm />}
      </AuthWrapper>
    </div>
  );
};

export default RegisterPage;
