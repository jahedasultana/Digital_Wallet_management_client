const config = {
  baseUrl:
    import.meta.env.VITE_NODE_ENV === "production"
      ? import.meta.env.VITE_BASE_URL_PROD
      : import.meta.env.VITE_BASE_URL,
};

export default config;
