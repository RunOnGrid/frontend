import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ArticleEx = ({ title, foto, author, date, time }) => {
  return (
    <div className="article-container2">
      <Link style={{ margin: 'auto' }} href="/articles/firstBlog">
        <div className="article3">
          <Image alt="" src="/gridCloud2.svg" height={200} width={300} />
        </div>
      </Link>
      <h2> {title}</h2>
      <div className="datos-articulos3">
        <Image alt="" src={foto} width={30} height={30} />
        <h3>{author}</h3>
        <span> {date} </span>
        <span> {time}</span>
      </div>
    </div>
  );
};

export default ArticleEx;
