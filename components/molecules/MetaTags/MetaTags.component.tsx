import Head from 'next/head';

interface MetaTagsProps {
  type: 'homepage' | 'singlePage';
  title?: string;
  description?: string;
  keywords?: string;
}
const MetaTags: React.FC<MetaTagsProps> = ({
  type,
  title,
  description,
  keywords,
}) => {
  const defaultTitles = {
    homepage: 'Muum Repo Explorer | Open-source repository intelligence',
    singlePage: 'About | Muum Repo Explorer',
  };

  const defaultDescriptions = {
    homepage:
      'Muum Repo Explorer helps developers discover, compare, and triage open-source repositories across the web and macOS.',
    singlePage:
      'Muum Repo Explorer is an open-source repository discovery and maintenance triage tool for web and macOS.',
  };

  const pageTitle = title || defaultTitles[type];
  const pageDescription = description || defaultDescriptions[type];

  return (
    <Head>
      <title>{pageTitle}</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000" />
      <meta name="description" content={pageDescription} />
      <meta name="application-name" content="Muum Repo Explorer" />
      <link rel="canonical" href="https://muum.dev" />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content="https://muum.dev" />
      <meta property="og:site_name" content="Muum Repo Explorer" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
    </Head>
  );
};

export default MetaTags;
