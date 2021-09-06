import { useEffect, useState } from "react";
import apiService from "../services/apiService";

export const getBoards = () => {
  const [localData, setLocalData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        apiService
          .get("/api/dashboard/all")
          .then((response) => {
            console.log(response);
            setLocalData(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (e) {
        //
      }
    })();
  }, []);
  return localData;
};
