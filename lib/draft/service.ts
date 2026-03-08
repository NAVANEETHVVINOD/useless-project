const DRAFT_STORAGE_KEY = 'onboarding-draft';
const DRAFT_EXPIRATION_DAYS = 7;

interface Draft {
  data: any;
  timestamp: number;
}

export class DraftService {
  saveDraft(data: any) {
    // TODO: Implement encryption
    const draft: Draft = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  }

  loadDraft(): any | null {
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

    // TODO: Implement decryption
    return draft.data;
  }

  deleteDraft() {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  }
}
