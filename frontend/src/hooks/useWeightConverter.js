import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CONVERSION_MUTLIPLER = 2.20462262185;

// custom hook for managing weight units (e.g., displayed values, conversions)
function useWeightConverter() {
  const { displayedWeightUnit } = useSelector(
    (state) => state.auth.userPreferences
  );
  const [currentWeightUnit, setCurrentWeightUnit] = useState(
    displayedWeightUnit
  );

  const computeDisplayedWeight = (kg) => {
    if (currentWeightUnit === 'kg') {
      return kg;
    } else {
      return kg * CONVERSION_MUTLIPLER;
    }
  };

  const getWeightConversionFactor = (prevUnit, nextUnit) => {
    if (prevUnit === 'lb' && nextUnit === 'kg') {
      // convert LB to KG
      return 1 / CONVERSION_MUTLIPLER;
    } else if (prevUnit === 'kg' && nextUnit === 'lb') {
      // convert KG to LB
      return CONVERSION_MUTLIPLER;
    } else {
      return 1;
    }
  };

  useEffect(() => {
    setCurrentWeightUnit(displayedWeightUnit);
  }, [displayedWeightUnit]);
  return {
    currentWeightUnit,
    computeDisplayedWeight,
    getWeightConversionFactor,
  };
}

export default useWeightConverter;
