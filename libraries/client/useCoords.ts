import { useState, useEffect } from "react";

interface useCoordsProps {
  latitude: number | null;
  longitude: number | null;
}
const useCoords = () => {
  const [coords, setCoords] = useState<useCoordsProps>({
    latitude: null,
    longitude: null,
  });
  const getUserLocationSuccess = ({
    coords: { longitude, latitude },
  }: GeolocationPosition) => {
    setCoords({longitude,latitude})
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getUserLocationSuccess);
  }, []);
  return coords;
};

export default useCoords;
