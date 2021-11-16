/**
 * Generates JWT token, that last about 30 minutes.
 *
 * @author Zablon Dawit <zablon@zetrax.io>
 */

import { sign } from "jsonwebtoken";
import ServerConfig from "@config/server.conf.json";

const GenerateToken = (payload: string) =>
  sign({ user: payload }, ServerConfig.token, { expiresIn: "3600s" });

export default GenerateToken;
