import { useEffect } from 'react';

const useDocumentEvent = (events) => {
  useEffect(() => {
    events.forEach((event) => {
      document.addEventListener(event.type, event.callback);
    });
    return () =>
      events.forEach((event) => {
        document.removeEventListener(event.type, event.callback);
      });
  }, [events]);
};

export default useDocumentEvent;
