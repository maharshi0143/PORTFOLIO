import { useCallback } from "react";

const useScrollTo = () => {
  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return scrollTo;
};

export default useScrollTo;
