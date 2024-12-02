import Image from 'next/image';
import React from 'react';

type BeritaType = {
  source: {
    id: number | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content: string;
};

const BeritaPage = async () => {
  const apiEndpoint =
    'https://newsapi.org/v2/everything?q=tesla&from=2024-10-25&sortBy=publishedAt&apiKey=b2a02a7fc48c488e9703b7a4a47a966f';

  const response = await fetch(apiEndpoint);
  const data = await response.json();

  return (
    <div className='grid grid-cols-4 gap-6 p-6'>
      <h1>list berita</h1>
      {data.articles.map((berita: BeritaType, index: number) => (
        <div
          key={index}
          style={{
            backgroundColor: 'purple',
            padding: 20,
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {berita.urlToImage && (
            <Image
              src={berita.urlToImage}
              alt={berita.title}
              width={200}
              height={200}
            />
          )}
          <span className='font-bold'>{berita.title}</span>
          <p>{berita.description}</p>
          <small>{berita.author}</small>
        </div>
      ))}
    </div>
  );
};

export default BeritaPage;
