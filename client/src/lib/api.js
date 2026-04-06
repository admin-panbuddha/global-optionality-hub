const BASE = import.meta.env.VITE_API_URL || "/api";

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...opts.headers },
    ...opts,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || "API error");
  }
  return res.json();
}

export const api = {
  // Health
  health: () => request("/health"),

  // Profiles
  getProfiles: () => request("/profiles"),
  getProfile: (id) => request(`/profiles/${id}`),
  createProfile: (data) => request("/profiles", { method: "POST", body: JSON.stringify(data) }),
  updateProfile: (id, data) => request(`/profiles/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  // Countries
  getCountries: (region) => request(`/countries${region ? `?region=${region}` : ""}`),
  getCountry: (id) => request(`/countries/${id}`),

  // Equities
  getEquities: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/equities${qs ? `?${qs}` : ""}`);
  },
  getEquity: (id) => request(`/equities/${id}`),

  // Watchlist
  getWatchlist: (profileId) => request(`/watchlist/${profileId}`),
  addToWatchlist: (data) => request("/watchlist", { method: "POST", body: JSON.stringify(data) }),
  updateWatchlistItem: (id, data) => request(`/watchlist/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  removeFromWatchlist: (id) => request(`/watchlist/${id}`, { method: "DELETE" }),

  // Themes
  getThemes: () => request("/themes"),
  getTheme: (id) => request(`/themes/${id}`),
};
