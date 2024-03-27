export const BACKEND_URL = process.env.NODE_ENV == "development" ? "http://localhost:8000/" : "/";

export const API_URL = BACKEND_URL+ "api/";

export const PAGINATION_COUNT = 10;