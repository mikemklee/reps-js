import _ from 'lodash';

const Utils = {
  updateObjInMap: (existingMap, obj) => ({
    ...existingMap,
    [obj._id]: obj,
  }),
  deleteObjsFromMap: (existingMap, ids) => {
    const updatedMap = _.omit(existingMap, ids);
    return updatedMap;
  },
  composeObjsMap: (objsArray) => {
    const composedMap = {};
    _.forEach(objsArray, (obj) => {
      composedMap[obj._id] = obj;
    });
    return composedMap;
  },
};

export default Utils;
