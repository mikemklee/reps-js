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

  async start(callback) {
    console.log('START!!!');

    this.startTime = now();

    this.oldTime = this.startTime;
    this.elapsedTime = 0;
    this.running = true;

    this.runningInterval = setInterval(() => {
      const newTime = now();
      this.elapsedTime = (newTime - this.oldTime) / 1000;
      callback({ elapsed: Math.floor(this.elapsedTime) });
    }, 1000);
  }

  async stop() {
    console.log('STOP!!!');

    this.autoStart = false;

    this.running = false;
    clearInterval(this.runningInterval);
    this.runningInterval = null;
    return await this.getElapsedTime();
  }

  async getElapsedTime() {
    return Math.floor(this.elapsedTime);
  }
}
