CREATE TABLE IF NOT EXISTS saved_repositories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  repo_id INTEGER NOT NULL,
  full_name TEXT NOT NULL,
  html_url TEXT NOT NULL,
  description TEXT,
  language TEXT,
  stars INTEGER NOT NULL DEFAULT 0,
  forks INTEGER NOT NULL DEFAULT 0,
  owner_login TEXT,
  owner_avatar_url TEXT,
  github_updated_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, repo_id)
);

CREATE INDEX IF NOT EXISTS saved_repositories_user_updated_idx
  ON saved_repositories(user_id, updated_at DESC);
