import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// custom hook for managing weight units (e.g., displayed values, conversions)
function useWeightConverter() {
  const { displayedWeightUnit } = useSelector((state) => state.auth);
  const [currentUnit, setCurrentUnit] = useState(displayedWeightUnit);

  const computeDisplayedWeight = (kg) => {
    if (currentUnit === 'kg') {
      return kg;
    } else {
      return kg * 2.20462262185;
    }
  };

  useEffect(() => {
    setCurrentUnit(displayedWeightUnit);
  }, [displayedWeightUnit]);
  return { currentUnit, computeDisplayedWeight };
}

export default useWeightConverter;
