import Image from 'next/image'
import React from 'react'

const FirstArticle = () => {
  return (
    <div className='article-only'>
        <h1> Why pay for Heroku/Render/Fly.io when you have AWS credits?</h1>

        <p>AWS, GCP, and Azure throw hundreds of thousands of dollars in cloud credits at early stage startups every year. Yet, so many startups still choose to deploy on another hosting platform like Heroku, Render, and Fly.io and pay for it out of pocket. Why? </p>

        <div className='datos-articulos'>
        <Image alt='' src='/netero.jpg' width={30} height={30}/>
        <h3>SpectroGl</h3>
        <span> January 04,2024 </span>
        <span> 5 min read</span>
        </div>
        <div className='article2'>
            <Image alt='' src='/gridCloud2.svg' height={200} width={400}/>
        </div>
        <div className="container-aboutUs">
      <h1> About Grid Mine + Grid Cloud </h1>
      <div>
        {' '}
        AWS, GCP, and Azure throw hundreds of thousands of dollars in cloud credits at early stage startups every year. Yet, so many startups still choose to deploy on another hosting platform like Heroku, Render, and Fly.io to move fast without worrying about DevOps. An average YC startup has access to a whopping total of 900k in cloud credits across the three cloud providers, but so many of them still deploy on some kind of a PaaS just to move fast.
      </div>

      
   
      <div className='contenedor-parrafos-about'>
        <div className='parrafos-about'>

      <div>
        {' '}
        Why do startups choose to do this? To focus on building product. No early-stage startup should be wasting time on undifferentiated infrastructure work. These platforms all provide a phenomenal developer experience that just works. For just a few hundred bucks, startups are buying the peace of mind that their product will run smoothly and reliably as long as they provide the code.
      </div>

      <div>
        {' '}
        What many startups aren&apos;t aware of or don’t think about, is that many of these platforms still run on AWS (or some kind of public cloud like GCP and CloudFlare) under the hood. At the end of the day, you&apos;re still using AWS, except you&apos;re using someone else&apos;s account and are paying for it with your own money instead of the credits that you already have. Furthermore, most startups that initially deploy on these platforms end up moving to their own cloud infrastructure at some point anyway as they scale and run into constraints.
      </div>

      <div>
        {' '}
        Many people are initially skeptical that developer experience can be equally easy if things are happening in their own AWS account. Once they’ve tried out the platform, however, our users tell us that there is no difference between using Porter vs a traditional PaaS other than the extra 20 minutes it takes to connect your cloud account.
      </div>

      <div>
        {' '}
        Of course, there are more benefits that traditional PaaS&apos;s deliver, other than just the easy developer experience - infra management, workload-specific optimization, better support are some examples just to name a few. Does the platform&apos;s ability to deliver these benefits get compromised in any way if things are running in the user&apos;s own cloud?
      </div>
        </div>
    

      </div>
     
        
      

        <div className='contenedor-flex'> 
    <div className='parrafos-about'>

      <div>
        {' '}
        We strongly believe that the answer to this question is a no. Given the right set of permissions, it is possible to manage the underlying infrastructure and even interact with the public cloud provider on the user’s behalf (e.g. request a quota increase, optimize costs, request support) - if the provided permissions are the same, why does it matter which account the underlying infrastructure is running in?
      </div>

      <div>
        {' '}
        Porter gets you started in your own AWS account from day 1 with the same easy developer experience, so you can use your credits instead of paying out of pocket. Unbeknownst to the user, an added bonus is that we deploy your applications on the same kind of infrastructure that growth-stage companies are running so you&apos;re prepared for the eventual moment that you find PMF and need to scale. And yes, as much as this seems to be a champagne problem that early stage founders shouldn’t care about, this actually does happen in the best case outcome for your startup - and when it does, you need to scale fast.
      </div>

      <div>
        {' '}
        Our intent is to make sure no early stage startup needs to pay for Porter when they are just getting started out. Redeem our startup deal if your startup has less than 5M in funding and use it with your cloud credits.
      </div>

      <div>
        {' '}
        Check out this page if you&apos;re an early stage founder and want to better understand what we&apos;re building.
      </div>

    
    </div>

        </div>
    </div>

    </div>
  )
}

export default FirstArticle