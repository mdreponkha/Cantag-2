// Safe browser storage & navigation utilities for sandboxed iframe environments

const memoryFallback: Record<string, string> = {};

export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Sandboxed iframe or cookies disabled
    }
    return memoryFallback[key] ?? null;
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Sandboxed iframe or cookies disabled
    }
    memoryFallback[key] = value;
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Sandboxed iframe or cookies disabled
    }
    delete memoryFallback[key];
  }
};

export const safePushState = (data: any, unused: string, url?: string | URL | null): void => {
  try {
    if (typeof window !== 'undefined' && window.history && typeof window.history.pushState === 'function') {
      window.history.pushState(data, unused, url);
    }
  } catch {
    // Silently ignore in sandboxed iframes
  }
};

export const safeScrollTo = (options?: ScrollToOptions | number, y?: number): void => {
  try {
    if (typeof window !== 'undefined') {
      if (typeof options === 'object') {
        window.scrollTo(options);
      } else {
        window.scrollTo(options ?? 0, y ?? 0);
      }
    }
  } catch {
    try {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    } catch {
      // Ignore
    }
  }
};
