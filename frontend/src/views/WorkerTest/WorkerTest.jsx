import React, { useState, useEffect } from 'react';
import * as Comlink from 'comlink';

import ClockWorker from 'comlink-loader!../../workers/clock.worker';

const WorkerTest = () => {
  const [checkpoints, setCheckpoints] = useState([new Date().toTimeString()]);

  // start clock
  useEffect(() => {
    let clock;

    const startClock = async () => {
      const clockWorker = new ClockWorker();

      // create a new clock instance
      clock = await new clockWorker.HealthChecker();

      const cb = (payload) => {
        setCheckpoints((prev) => [...prev, payload.timeNow]);
      };

      await clock.start(Comlink.proxy(cb));
    };

    startClock();

    // stop the clock on component unmount
    return async () => {
      if (clock) await clock.stop();
    };
  }, []);

  return (
    <div>
      {checkpoints.map((point, index) => (
        <div key={index}>{point}</div>
      ))}
    </div>
  );
};

export default WorkerTest;
