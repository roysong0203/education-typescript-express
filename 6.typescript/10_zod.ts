import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
});

interface User {
  name: string;
  age: number;
}

const user: User = JSON.parse(
  '{ "name": "Alice", "age": 1, "extra": "Hello" }'
);
console.log("✅ user before zod:", user);

const parsed = UserSchema.safeParse(user);
const safeUser = parsed.data;
console.log("✅ user after zod:", safeUser);
