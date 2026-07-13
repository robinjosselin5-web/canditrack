import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { authStore } from "@/store/auth.store";
import { ROUTES } from "@/routes/paths";
import type { ILoginFormValues } from "../types/login.types";
import { loginUser } from "../services";

interface IRedirectLocationState {
  from?: {
    pathname?: string;
  };
}

export function useLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as IRedirectLocationState | null;
  const redirectPath = state?.from?.pathname ?? ROUTES.DASHBOARD;

  return useMutation({
    mutationFn: (values: ILoginFormValues) =>
      loginUser({
        email: values.email,
        password: values.password,
      }),
    onSuccess: (session, values) => {
      authStore.setSession(session, {
        rememberMe: values.rememberMe,
      });
      navigate(redirectPath, { replace: true });
    },
  });
}
