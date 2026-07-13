import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";
import { ROUTES } from "@/routes/paths";
import { authStore } from "@/store/auth.store";
import { logoutUser } from "../services";

export function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
      authStore.clearSession();
      navigate(ROUTES.LOGIN, { replace: true });
    },
  });
}
