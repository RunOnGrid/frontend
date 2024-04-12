import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Article = ({title,foto,author,date,time}) => {
  return (
    <div className='article-container'>
            <Link style={{margin:'auto'}} href='/articles/firstBlog'>
        <div className='article'>
            <Image alt='' src='/gridCloud2.svg' height={200} width={400}/>
        </div>
            </Link>
        <h2> {title}</h2>
        <div className='datos-articulos'>
        <Image alt='' src={foto} width={30} height={30}/>
        <h3>{author}</h3>
        <span> {date} </span>
        <span> {time}</span>
        </div>


    </div>
  )
}

export default Article