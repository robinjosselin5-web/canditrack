import { useSyncExternalStore } from "react";
import type { IAuthSession, IAuthState } from "@/types/auth";
import type { IUser } from "@/types/user";

const AUTH_STORAGE_KEY = "candytrack.auth";

type AuthListener = () => void;
type AuthStorageType = "local" | "session";

interface ISetSessionOptions {
  rememberMe?: boolean;
}

const initialAuthState: IAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const listeners = new Set<AuthListener>();

let authState = loadAuthState();

function loadAuthState(): IAuthState {
  if (typeof window === "undefined") {
    return initialAuthState;
  }

  const storedSession =
    window.sessionStorage.getItem(AUTH_STORAGE_KEY) ??
    window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedSession) {
    return initialAuthState;
  }

  try {
    const session = JSON.parse(storedSession) as IAuthSession;

    if (!session.token || !session.user) {
      return initialAuthState;
    }

    return {
      user: session.user,
      token: session.token,
      isAuthenticated: true,
    };
  } catch {
    clearPersistedSession();
    return initialAuthState;
  }
}

function getActiveStorageType(): AuthStorageType {
  if (typeof window === "undefined") {
    return "session";
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) ? "local" : "session";
}

function persistSession(
  session: IAuthSession,
  storageType: AuthStorageType,
): void {
  const serializedSession = JSON.stringify(session);

  clearPersistedSession();

  if (storageType === "local") {
    window.localStorage.setItem(AUTH_STORAGE_KEY, serializedSession);
    return;
  }

  window.sessionStorage.setItem(AUTH_STORAGE_KEY, serializedSession);
}

function clearPersistedSession(): void {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
}

function emitChange(): void {
  listeners.forEach((listener) => listener());
}

function setAuthState(nextState: IAuthState): void {
  authState = nextState;
  emitChange();
}

export const authStore = {
  getState(): IAuthState {
    return authState;
  },

  subscribe(listener: AuthListener): () => void {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },

  setSession(session: IAuthSession, options: ISetSessionOptions = {}): void {
    persistSession(session, options.rememberMe ? "local" : "session");
    setAuthState({
      user: session.user,
      token: session.token,
      isAuthenticated: true,
    });
  },

  updateUser(user: IUser): void {
    if (!authState.token) {
      return;
    }

    persistSession(
      {
        user,
        token: authState.token,
      },
      getActiveStorageType(),
    );

    setAuthState({
      ...authState,
      user,
    });
  },

  clearSession(): void {
    clearPersistedSession();
    setAuthState(initialAuthState);
  },
};

export function getAuthToken(): string | null {
  return authStore.getState().token;
}

export function useAuthStore(): IAuthState {
  return useSyncExternalStore(
    authStore.subscribe,
    authStore.getState,
    authStore.getState,
  );
}
