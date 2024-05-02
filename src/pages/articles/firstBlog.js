import dynamic from 'next/dynamic';
import Footer from '@/components/index/Footer';
import FirstArticle from '@/articles/firstArticle';
import ArticleEx from '@/components/blog/ArticlesEx';

const DynamicNavbar = dynamic(() => import('../../components/index/Navbar'), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function FirstBlog() {
  return (
    <>
      <div className="container-homePrincipal">
        <DynamicNavbar />

        <div style={{ opacity: '0' }}>.</div>
        <FirstArticle />
        <div className="grid-articlesEx">
          <ArticleEx
            title="Why pay for Heroku/Render/Fly.io when you have AWS credits?"
            foto="/netero.jpg"
            author="SpectroGL"
            date="January 04,2024"
            time="5 min read"
          />
          <ArticleEx
            title="Why pay for Heroku/Render/Fly.io when you have AWS credits?"
            foto="/netero.jpg"
            author="SpectroGL"
            date="January 04,2024"
            time="5 min read"
          />
          <ArticleEx
            title="Why pay for Heroku/Render/Fly.io when you have AWS credits?"
            foto="/netero.jpg"
            author="SpectroGL"
            date="January 04,2024"
            time="5 min read"
          />
        </div>

        <Footer />
      </div>
    </>
  );
}
