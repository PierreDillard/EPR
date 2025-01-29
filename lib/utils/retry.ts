export const retry = async <T>(
    fn: () => Promise<T>,
    retries = 3,
    delay = 1000,
    backoff = 2
  ): Promise<T> => {
    try {
      return await fn();
    } catch (error: any) {
      if (retries === 0 || error?.status !== 429) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay * backoff);
    }
  };