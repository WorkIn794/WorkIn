// Configuration file for better-auth.

import { MONGODB_DATABASE } from "astro:env/client";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { createClient } from "./dataBase";
import type { MongoClient, Db } from "mongodb";

const client: Readonly<MongoClient> = createClient();
const db: Readonly<Db> = client.db(MONGODB_DATABASE);

const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true
    }
});

export default auth;