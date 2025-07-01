import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    name: "Click the button to begin",
  },
});

export default app;
