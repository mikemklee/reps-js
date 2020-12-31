const Utils = {
  getTimeOfDay: () => {
    const today = new Date();
    const hours = today.getHours();

    if (hours < 12) {
      return 'morning';
    } else if (hours < 18) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  },
};

export default Utils;
