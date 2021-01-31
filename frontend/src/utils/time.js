const Utils = {
  parseDuration: (durationInSeconds) => {
    // get hours first
    const hours = Math.floor(durationInSeconds / 3600);

    // subtract hours from total time
    // prettier-ignore
    const remainingSeconds = durationInSeconds - (hours * 3600);

    // get minutes from remaining seconds
    const minutes = Math.floor(remainingSeconds / 60);

    // get seconds
    // prettier-ignore
    const seconds = remainingSeconds - (minutes * 60);

    return {
      hours,
      minutes,
      seconds,
    };
  },
};

export default Utils;
