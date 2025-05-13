"use client";
import { useEffect } from 'react';

export default function Client({ id }) {
  useEffect(() => {
    console.log("ID param:", id);
  }, [id]);

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>Product ID: {id}</div>
  );
}
