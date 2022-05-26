import React, { Children, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
// import { withRouter } from "react-router-dom";

interface ScrollType {
  children: any;
}

const ScrollToTop = ({ children }: ScrollType) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location?.pathname]);
  return null;
};

export default ScrollToTop;
