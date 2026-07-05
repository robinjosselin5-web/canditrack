import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { IRegisterFormValues } from "../types/register.types";
import { registerUser } from "../services";

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: IRegisterFormValues) =>
      registerUser({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
      }),
    onSuccess: (pendingVerification) => {
      navigate(
        `/verify-email?email=${encodeURIComponent(pendingVerification.email)}`,
        {
          replace: true,
        },
      );
    },
  });
}
