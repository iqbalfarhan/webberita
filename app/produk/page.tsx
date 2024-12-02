'use client';
import React, { useEffect, useState } from 'react';

type Produk = {
  title: string;
  description: string;
  category: string;
};

const ProdukPage = () => {
  const [produks, setProduks] = useState<Produk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getProduks() {
      const response = await fetch('https://dummyjson.com/products?delay=4000');
      const data = await response.json();

      setProduks(data.products);
      setLoading(false);
    }

    getProduks();
  }, []);

  return (
    <div>
      <h1>list produk</h1>
      {loading && 'loading'}
      {produks &&
        produks.map((produk: Produk, index: number) => (
          <div key={index}>
            <h1>{produk.title}</h1>
            <p>{produk.description}</p>
            <small>{produk.category}</small>
          </div>
        ))}
    </div>
  );
};

export default ProdukPage;
