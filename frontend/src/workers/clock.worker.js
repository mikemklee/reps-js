/**
 * Adapted from https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js
 */

function now() {
  return (typeof performance === 'undefined' ? Date : performance).now();
}

export class Clock {
  constructor(autoStart = false) {
    this.autoStart = autoStart;

    this.startTime = 0;
    this.oldTime = 0;
    this.elapsedTime = 0;

    this.running = false;
  }

  async start() {
    this.startTime = now();

    this.oldTime = this.startTime;
    this.elapsedTime = 0;
    this.running = true;
  }

  async stop() {
    await this.getElapsedTime();
    this.running = false;
    this.autoStart = false;
  }

  async getElapsedTime() {
    if (this.running) {
      const newTime = now();
      return (newTime - this.oldTime) / 1000;
    }
  }
}
