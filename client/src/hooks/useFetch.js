import { useState, useEffect } from "react";
import axios from "axios";
import { render } from "../host";

const useFetch = (endpoint) => {
  const [resData, setResData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = endpoint.startsWith("http") ? endpoint : `${render}${endpoint}`;
        const response = await axios.get(url);
        if (isMounted) {
          setResData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.response?.data?.message || err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (endpoint) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { resData, loading, error };
};

export default useFetch;
