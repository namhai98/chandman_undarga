import { createApp } from "./app.js";

const PORT = Number.parseInt(process.env.PORT ?? "3001", 10);
const app = createApp();

app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
});
