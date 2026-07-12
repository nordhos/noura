"use client";

const AUTH_KEY = "noura_authenticated";

export function login() {
  sessionStorage.setItem(AUTH_KEY, "true");
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  return sessionStorage.getItem(AUTH_KEY) === "true";
}