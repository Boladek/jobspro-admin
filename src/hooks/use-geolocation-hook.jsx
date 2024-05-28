import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
    error: null
  });

  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;
    setPosition({
      latitude,
      longitude,
      error: null
    });
  };

  const handleError = (error) => {
    setPosition((prevPosition) => ({
      ...prevPosition,
      error: error.message
    }));
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setPosition((prevPosition) => ({
        ...prevPosition,
        error: "Geolocation is not supported by your browser"
      }));
      return;
    }

    const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError);

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return position;
};

export default useGeolocation;
