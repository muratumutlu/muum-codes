/* eslint-disable import/order */
import { Footer } from '@/components';
import { Container } from '@mantine/core';

interface HomeTemplateProps {
  children: React.ReactNode;
}

export default function HomeTemplate({ children }: HomeTemplateProps) {
  return (
    <>
      <Container size="xl">{children}</Container>
      <Footer />
    </>
  );
}
