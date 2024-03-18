import { Container } from '@mantine/core';

interface SinglePageTemplateProps {
  children: React.ReactNode;
}

export default function HomeTemplate({ children }: SinglePageTemplateProps) {
  return (
    <Container size="xl" mt="xl">
      {children}
    </Container>
  );
}
