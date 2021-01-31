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
    this.runningInterval = null;
  }

  async start() {
    this.startTime = now();

    this.oldTime = this.startTime;
    this.elapsedTime = 0;
    this.running = true;

    this.runningInterval = setInterval(async () => {
      const newTime = now();
      this.elapsedTime = (newTime - this.oldTime) / 1000;
    }, 1000);
  }

  async stop() {
    this.autoStart = false;

    this.running = false;
    clearInterval(this.runningInterval);
    this.runningInterval = null;
    return await this.getElapsedTime();
  }

  async getElapsedTime() {
    return this.elapsedTime;
  }
}
