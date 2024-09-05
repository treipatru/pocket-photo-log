-- CreateIndex
CREATE INDEX "Post_shot_on_idx" ON "Post"("shot_on");

-- CreateIndex
CREATE INDEX "Post_published_shot_on_idx" ON "Post"("published", "shot_on");
