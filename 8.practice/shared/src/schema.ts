import { z } from "zod";

const mappingValueSchema = z.object({
  originalUrl: z.string().url(),
  visits: z.number().int().nonnegative(),
});
const mappingTableSchema = z.record(mappingValueSchema);
type IMappingTable = z.infer<typeof mappingTableSchema>;

const apiRequest001 = z.object({
  originalURL: z.string().url(),
});

const apiResponse001 = z.object({
  shortCode: z.string(),
});

const apiResponse002 = mappingTableSchema;

const apiRequest002 = z.object({
  url: z.string().url(),
});

const apiResponse003 = z.object({
  serverTime: z.string().nullable(),
});

export {
  mappingTableSchema,
  IMappingTable,
  apiRequest001,
  apiResponse001,
  apiResponse002,
  apiRequest002,
  apiResponse003,
};
