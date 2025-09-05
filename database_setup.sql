-- Create Posts table
CREATE TABLE IF NOT EXISTS "Post" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "status" "ContentStatus" DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Create Suggestions table
CREATE TABLE IF NOT EXISTS "Suggestion" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "status" "ContentStatus" DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "Post_authorId_idx" ON "Post"("authorId");
CREATE INDEX IF NOT EXISTS "Post_category_idx" ON "Post"("category");
CREATE INDEX IF NOT EXISTS "Post_createdAt_idx" ON "Post"("createdAt");
CREATE INDEX IF NOT EXISTS "Suggestion_authorId_idx" ON "Suggestion"("authorId");
CREATE INDEX IF NOT EXISTS "Suggestion_category_idx" ON "Suggestion"("category");
CREATE INDEX IF NOT EXISTS "Suggestion_createdAt_idx" ON "Suggestion"("createdAt");

-- Insert some sample data for testing
INSERT INTO "Post" ("id", "title", "content", "category", "authorId", "status", "createdAt", "updatedAt")
SELECT
    gen_random_uuid()::text,
    'Welcome to General Discussion!',
    'Welcome to our community forum! This is the place to discuss all things automotive with fellow enthusiasts.',
    'general',
    "User"."id",
    'PUBLISHED',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "User"
WHERE "User"."role" = 'ADMIN'
LIMIT 1
-- Create Comments table
CREATE TABLE IF NOT EXISTS "Comment" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "content" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "status" "ContentStatus" DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE,
    FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Create indexes for comments
CREATE INDEX IF NOT EXISTS "Comment_postId_idx" ON "Comment"("postId");
CREATE INDEX IF NOT EXISTS "Comment_authorId_idx" ON "Comment"("authorId");
CREATE INDEX IF NOT EXISTS "Comment_createdAt_idx" ON "Comment"("createdAt");