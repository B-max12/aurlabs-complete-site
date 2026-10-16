import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

export const content = sqliteTable("content", {
  id: text("id").primaryKey(),
  kind: text("kind").notNull(),
  data: text("data").notNull(),
  published: integer("published").notNull().default(0),
  deleted: integer("deleted").notNull().default(0),
  updatedAt: integer("updated_at").notNull(),
}, t => [index("content_kind_idx").on(t.kind)]);

export const submissions = sqliteTable("submissions", {
  id: text("id").primaryKey(),
  kind: text("kind").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  data: text("data").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: integer("created_at").notNull(),
}, t => [index("submissions_created_idx").on(t.createdAt)]);

export const administrators = sqliteTable("administrators", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  username: text("username").notNull(),
  passwordHash: text("password_hash").notNull(),
  salt: text("salt").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const adminUnlocks = sqliteTable("admin_unlocks", {
  tokenHash: text("token_hash").primaryKey(),
  userId: text("user_id").notNull(),
  expiresAt: integer("expires_at").notNull(),
});

export const rateLimits = sqliteTable("rate_limits", {
  id: text("id").primaryKey(),
  count: integer("count").notNull().default(0),
  expiresAt: integer("expires_at").notNull(),
});

export const auditLog = sqliteTable("audit_log", {
  id: text("id").primaryKey(),
  actor: text("actor").notNull(),
  action: text("action").notNull(),
  target: text("target").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const media = sqliteTable("media", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  mime: text("mime").notNull(),
  size: integer("size").notNull(),
  createdAt: integer("created_at").notNull(),
});
