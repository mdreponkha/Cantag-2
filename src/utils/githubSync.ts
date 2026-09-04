// GitHub Direct API Sync & Commit Utility for Can Star Power Tech
// Enables seamless worldwide persistence via GitHub REST API without requiring a custom backend server

export interface GitHubSyncConfig {
  token: string;
  repo: string; // e.g. 'n85711813/canstar-power-tech'
  branch?: string; // default 'main'
  filePath?: string; // default 'data/database.json'
}

/**
 * Commit updated database content directly to GitHub repository.
 * Triggers automatic Vercel deployment and updates GitHub raw CDN worldwide.
 */
export async function commitDatabaseToGitHub(
  data: any,
  config: GitHubSyncConfig,
  customMessage?: string
): Promise<{ success: boolean; sha?: string; commitUrl?: string; message: string }> {
  const { token, repo, branch = 'main', filePath = 'data/database.json' } = config;

  if (!token || !token.trim()) {
    throw new Error('GitHub Personal Access Token is required to commit directly.');
  }

  const cleanRepo = repo.replace(/^https?:\/\/github\.com\//, '').replace(/\.git$/, '').trim();
  if (!cleanRepo || !cleanRepo.includes('/')) {
    throw new Error('Invalid GitHub repository. Format should be: username/repo-name');
  }

  const cleanToken = token.trim();

  // Step 1: Check existing file SHA from GitHub API
  let existingSha: string | undefined;
  const getFileUrl = `https://api.github.com/repos/${cleanRepo}/contents/${filePath}?ref=${branch}`;

  try {
    const checkRes = await fetch(getFileUrl, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (checkRes.ok) {
      const fileMeta = await checkRes.json();
      existingSha = fileMeta.sha;
    } else if (checkRes.status === 401 || checkRes.status === 403) {
      throw new Error('GitHub Token is invalid or does not have "repo" write permissions.');
    }
  } catch (err: any) {
    if (err.message && err.message.includes('permissions')) {
      throw err;
    }
    console.warn('Could not fetch existing SHA, creating fresh or updating without pre-check:', err);
  }

  // Step 2: Format & Base64 encode JSON
  const jsonString = JSON.stringify(data, null, 2);
  const base64Content = btoa(unescape(encodeURIComponent(jsonString)));

  // Step 3: PUT file to GitHub Contents API
  const putUrl = `https://api.github.com/repos/${cleanRepo}/contents/${filePath}`;
  const commitPayload: Record<string, any> = {
    message: customMessage || `chore: update database from Admin Panel [${new Date().toISOString()}]`,
    content: base64Content,
    branch,
  };

  if (existingSha) {
    commitPayload.sha = existingSha;
  }

  const putRes = await fetch(putUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${cleanToken}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commitPayload),
  });

  if (!putRes.ok) {
    const errData = await putRes.json().catch(() => ({}));
    const msg = errData.message || `GitHub HTTP ${putRes.status}`;
    throw new Error(`Failed to commit to GitHub: ${msg}`);
  }

  const result = await putRes.json();
  const commitUrl = result.commit?.html_url || `https://github.com/${cleanRepo}/commit/${result.commit?.sha}`;

  return {
    success: true,
    sha: result.commit?.sha,
    commitUrl,
    message: 'Committed successfully to GitHub! Vercel is now deploying your changes worldwide.',
  };
}

/**
 * Direct browser download of database.json
 */
export function downloadDatabaseJson(data: any, filename = 'database.json') {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Fetch latest database directly from GitHub raw CDN
 */
export async function fetchFromGitHubRaw(repo = 'n85711813/canstar-power-tech', branch = 'main'): Promise<any | null> {
  const cleanRepo = repo.replace(/^https?:\/\/github\.com\//, '').replace(/\.git$/, '').trim();
  const url = `https://raw.githubusercontent.com/${cleanRepo}/${branch}/data/database.json?t=${Date.now()}`;
  try {
    const res = await fetch(url);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Could not fetch from GitHub raw CDN:', e);
  }
  return null;
}
