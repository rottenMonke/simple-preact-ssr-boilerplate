import { useState } from "preact/hooks";

const usePageData = (pageData) =>
  useState(() => {
    if (pageData) return pageData;
    if (typeof window !== "undefined" && window.PAGE_DATA) {
      const data = window.PAGE_DATA;
      delete window.PAGE_DATA;
      return data;
    }
    return null;
  });

export default usePageData;
