import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CONVERSION_MUTLIPLER = 0.62137119;

// custom hook for managing distance units (e.g., displayed values, conversions)
function useDistanceConverter() {
  const { displayedDistanceUnit } = useSelector((state) => state.auth);
  const [currentDistanceUnit, setCurrentDistanceUnit] = useState(
    displayedDistanceUnit
  );

  const computeDisplayedDistance = (km) => {
    if (currentDistanceUnit === 'km') {
      return km;
    } else {
      return km * CONVERSION_MUTLIPLER;
    }
  };

  const getDistanceConversionFactor = (prevUnit, nextUnit) => {
    if (prevUnit === 'mi' && nextUnit === 'km') {
      // convert MI to KM
      return 1 / CONVERSION_MUTLIPLER;
    } else if (prevUnit === 'km' && nextUnit === 'mi') {
      // convert KM to MI
      return CONVERSION_MUTLIPLER;
    } else {
      return 1;
    }
  };

  useEffect(() => {
    setCurrentDistanceUnit(displayedDistanceUnit);
  }, [displayedDistanceUnit]);
  return {
    currentDistanceUnit,
    computeDisplayedDistance,
    getDistanceConversionFactor,
  };
}

export default useDistanceConverter;
