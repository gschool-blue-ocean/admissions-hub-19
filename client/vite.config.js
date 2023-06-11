export default {
  root: "src",
  server: {
    // This may be deleted later depending on where we want to connect
    // our web socket

    // proxy: {
    //   "/api": process.env.API_URL,
    //   "/socket": {
    //     target: "http://127.0.0.1:3175/",
    //     ws: true,
    //   },
    // },
    port: process.env.PORT,
  },
  test: {
    environment: "jsdom",
    watch: false,
  },
};
