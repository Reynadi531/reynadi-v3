import { createDb } from "@reynad-v3/db";

import { ENV } from "./env.server";

export const db = createDb(ENV);
