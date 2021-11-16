/**
 * Hash passwords using the SHA256 hashing algorithm.
 *
 * @author Zablon Dawit <zablon@zetrax.io>
 */

import { createHash } from "crypto";

const HashPassword = (password: string): string => {
  const sha256 = createHash("sha256");
  sha256.update(password, "utf8");
  return sha256.digest("base64");
};

export default HashPassword;
