export default {
  root: "src",
  server: {
    proxy: {
      "/api": process.env.API_URL,
      "/socket": {
        target: "http://localhost:3000/",
        ws: true,
      },
    },
    port: process.env.PORT,
  },
  test: {
    environment: "jsdom",
    watch: false,
  },
};
