import { create } from 'zustand';

interface AuthState {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPasswordConfirm: (passwordConfirm: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setPasswordConfirm: (passwordConfirm) => set({ passwordConfirm }),
}));

export default useAuthStore;
