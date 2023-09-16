export class EventBus {
  /**
   *  A map of subscribers
   */
  private subscriptions: Map<string, Function[]>;

  constructor() {
    this.subscriptions = new Map();
  }

  /**
   * Subscribe to an event
   *
   * @param eventName - The name of the event to subscribe to
   * @param callback - The callback that will be called when this event is emitted
   */
  on(eventName: string, callback: Function) {
    if (!this.subscriptions.has(eventName)) {
      this.subscriptions.set(eventName, []);
    }
    this.subscriptions.get(eventName)?.push(callback);
  }

  /**
   * Subscribe to an event once
   *
   * @param eventName - The name of the event to subscribe to
   * @param callback - The callback that will be called when this event is emitted
   */
  once(eventName: string, callback: Function) {
    const onceCallback = (...args: unknown[]) => {
      callback(...args);
      this.off(eventName, onceCallback);
    };
    this.on(eventName, onceCallback);
  }

  /**
   * Unsubscribe from an event
   *
   * @param eventName - The name of the event to unsubscribe from
   * @param callback - The callback that is attached to this event
   */
  off(eventName: string, callback?: Function) {
    if (!this.subscriptions.has(eventName)) return;

    const subscribers = this.subscriptions.get(eventName);
    if (callback) {
      const index = subscribers?.indexOf(callback) ?? -1; // Provide a default value of -1
      if (index !== -1 && subscribers) {
        subscribers.splice(index, 1);
      }
    } else {
      this.subscriptions.delete(eventName);
    }
  }

  /**
   * Publish an event with the given arguments
   *
   * @param eventName - The name of the event to emit
   * @param args - Arguments that will be passed to the subscribed callbacks (optional)
   */
  emit(eventName: string, ...args: unknown[]) {
    const subscribers = this.subscriptions.get(eventName);
    if (subscribers) {
      for (const callback of subscribers) {
        callback(...args);
      }
    }
  }
}

export default new EventBus();
