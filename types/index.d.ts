export declare interface JavascriptBus {
  /**
   * Listen for a custom event. The callback will receive all the additional arguments passed into these event-triggering methods.
   * Returns an unsubscribe function Call it to stop listening.
   */
  on(eventName: string, eventCallback: (...args: any[]) => void, pointer?: any): () => void;

  /**
   * Listen for a custom event, but only once. The listener will be removed once it triggers for the first time.
   */
  once(eventName: string, eventCallback: (...args: any[]) => void, pointer?: any): void;

  /**
   * The off is used to cancel listening for events. The second parameter, if not passed, removes all events from the eventName.
   * If you don't pass the function, it will delete all events from this subscription.
   */
  off(eventName: string, eventCallback?: (...args: any[]) => void): void;

  /**
   * Fires one or more events on the current instance. Any additional arguments will be passed to the listener's callback function.
   */
  emit(eventName: string | string[], ...args: any[]): void;
}