import Head from 'next/head';

interface MetaTagsProps {
  type: 'homepage' | 'singlePage';
  title?: string;
  description?: string;
  keywords?: string;
}
const MetaTags: React.FC<MetaTagsProps> = ({ type, title, description, keywords }) => {
  const defaultTitles = {
    homepage: 'Muum Codes | Github Project Searching Tool',
    singlePage: 'About Us | Muum Codes',
  };

  const defaultDescriptions = {
    homepage:
      'Muum Codes is a Github project searching tool. You can search for any project on Github and see the details.',
    singlePage:
      'Muum Codes is a Github project searching tool. You can search for any project on Github and see the details.',
  };

  const pageTitle = title || defaultTitles[type];
  const pageDescription = description || defaultDescriptions[type];

  return (
    <Head>
      <title>{pageTitle}</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
    </Head>
  );
};

export default MetaTags;
