import { env } from "./config/env";
import Server from "./server";

const server = new Server().app;

server.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});

export { server };
export default server;
