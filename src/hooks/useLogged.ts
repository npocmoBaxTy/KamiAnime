import { useEffect, useState } from "react";

const useLogged = () => {
  const [logged, setLogged] = useState(false);
  useEffect(() => {}, [logged]);

  return { logged, setLogged };
};

export default useLogged;
