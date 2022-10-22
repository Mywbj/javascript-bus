export declare interface JavascriptBus {
  /**
   * Listen for a custom event. The callback will receive all the additional arguments passed into these event-triggering methods.
   */
  on(eventName: string | string[], eventCallback: (...args: any[], pointer?: any) => void): () => void;

  /**
   * Listen for a custom event, but only once. The listener will be removed once it triggers for the first time.
   */
  once(eventName: string | string[], eventCallback: (...args: any[]) => void,  pointer?: any): void;

  off(eventName: string | string[], eventCallback: (...args: any[]) => void): void;

  /**
   * Trigger an event on the current instance. Any additional arguments will be passed into the listener’s callback function.
   */
  emit(eventName: string | string[], ...args: any[]): void;
}