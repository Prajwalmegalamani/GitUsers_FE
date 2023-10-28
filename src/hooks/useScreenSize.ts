import React, { useState, useEffect } from "react";
import constate from "constate";

const useDeviceSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  //based on tailwind constants
  const [mediaQuery, setMediaQuery] = useState<undefined | string>();
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleWindowResize = () => {
    const windowWidth = window.innerWidth;
    setWidth(windowWidth);
    setHeight(window.innerHeight);
    //check width and update the responsive variables
    if (windowWidth > 1538) {
      setMediaQuery("2xl");
      setPerPage(16);
    } else if (windowWidth > 1280) {
      setMediaQuery("xl");
      setPerPage(9);
    } else if (windowWidth > 1024) {
      setMediaQuery("lg");
      setPerPage(9);
    } else if (windowWidth > 786) {
      setMediaQuery("md");
      setPerPage(8);
    } else if (windowWidth > 640) {
      setMediaQuery("sm");
      setPerPage(6);
    } else {
      setMediaQuery("mobile");
      setPerPage(5);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  return {
    perPage,
    mediaQuery,
    currentPage,
    setCurrentPage: setCurrentPage,
    handleNextPage: handleNextPage,
    handlePrevPage: handlePrevPage,
  };
};

export const [ScreenSizeProvider, ScreenContext] = constate(useDeviceSize);
