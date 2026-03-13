export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return getCookie("token");
}

export function setToken(token: string): void {
  document.cookie = `token=${token}; path=/; max-age=86400`;
}

export function removeToken(): void {
  document.cookie = "token=; path=/; max-age=0";
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return cookieValue || null;
    }
  }
  return null;
}
