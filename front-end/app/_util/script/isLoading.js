// app/_util/script/useInitialClient.js
'use client';
import { useState, useEffect } from 'react';

export function IsLoading() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
