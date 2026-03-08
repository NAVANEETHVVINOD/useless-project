const DRAFT_STORAGE_KEY = 'onboarding-draft';
const DRAFT_EXPIRATION_DAYS = 7;

interface Draft {
  data: any;
  timestamp: number;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export class DraftService {
  saveDraft(data: any) {
    if (!isBrowser()) return;
    const draft: Draft = {
      data,
      timestamp: Date.now(),
    };
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // localStorage may be unavailable (incognito, quota exceeded, etc.)
    }
  }

  loadDraft(): any | null {
    if (!isBrowser()) return null;
    try {
      const draftString = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!draftString) {
        return null;
      }

      const draft: Draft = JSON.parse(draftString);
      const now = Date.now();
      const expirationTime = DRAFT_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

      if (now - draft.timestamp > expirationTime) {
        this.deleteDraft();
        return null;
      }

      return draft.data;
    } catch {
      return null;
    }
  }

  deleteDraft() {
    if (!isBrowser()) return;
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // silent
    }
  }
}
