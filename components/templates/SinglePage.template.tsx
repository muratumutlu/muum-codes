/* eslint-disable import/order */
import { Footer, MetaTags } from '@/components';
import { Container } from '@mantine/core';

interface SinglePageTemplateProps {
  children: React.ReactNode;
  title: string;
}

export default function HomeTemplate({ children, title }: SinglePageTemplateProps) {
  return (
    <>
      <MetaTags type="singlePage" title={title} />
      <Container size="xl" mt={80}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
