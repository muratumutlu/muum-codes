/* eslint-disable import/order */
import { Footer } from '@/components';
import { Container } from '@mantine/core';

interface SinglePageTemplateProps {
  children: React.ReactNode;
}

export default function HomeTemplate({ children }: SinglePageTemplateProps) {
  return (
    <>
      <Container size="xl" mt={80}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
