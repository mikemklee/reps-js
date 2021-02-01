/**
 * Adapted from https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js
 */

function now() {
  return (typeof performance === 'undefined' ? Date : performance).now();
}

export class Clock {
  constructor() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.runningInterval = null;
  }

  async start(callback) {
    console.log('[Clock] Started');

    this.startTime = now();
    this.elapsedTime = 0;

    this.runningInterval = setInterval(() => {
      const newTime = now();
      this.elapsedTime = (newTime - this.startTime) / 1000;
      callback({ elapsed: Math.floor(this.elapsedTime) });
    }, 1000);
  }

  async stop() {
    console.log('[Clock] Stopped');

    clearInterval(this.runningInterval);
    this.runningInterval = null;
    return await this.getElapsedTime();
  }

  async getElapsedTime() {
    return Math.floor(this.elapsedTime);
  }
}

export class Timer {
  constructor() {
    this.runningInterval = null;
  }

  async start(callback) {
    console.log('[Timer] Started');

    this.runningInterval = setInterval(() => {
      callback();
    }, 1000);
  }

  async stop() {
    console.log('[Timer] Stopped');

    clearInterval(this.runningInterval);
    this.runningInterval = null;
  }
}
