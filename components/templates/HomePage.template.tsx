/* eslint-disable import/order */
import { Footer, MetaTags } from '@/components';
import { Container } from '@mantine/core';

interface HomeTemplateProps {
  children: React.ReactNode;
}

export default function HomeTemplate({ children }: HomeTemplateProps) {
  return (
    <>
      <MetaTags type="homepage" />
      <Container size="xl">{children}</Container>
      <Footer />
    </>
  );
}
