import { useState } from "preact/hooks";

const usePageData = (pageData) =>
  useState(() => {
    if (pageData) return pageData;
    if (typeof window !== 'undefined' && window.PAGE_DATA) return window.PAGE_DATA;
    return null;
  });

export default usePageData;
