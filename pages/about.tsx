/* eslint-disable import/order */
import { CustomCard, PageTitle, SinglePageTemplate } from '@/components';
import { Checkbox, Divider, Flex, Image, Text, Title } from '@mantine/core';

import pageData from '@/data/pageData.json';

export default function About() {
  const ChecklistItem = ({ children }: { children: React.ReactNode }) => (
    <Flex align="center" my="xs">
      <Checkbox checked readOnly mr="sm" />
      <Text>{children}</Text>
    </Flex>
  );

  return (
    <SinglePageTemplate title="About the Project | Muum Repo Explorer">
      <PageTitle>About the Project</PageTitle>
      {pageData.sections.map((section, index) => (
        <CustomCard key={index}>
          <Title
            order={section.title.startsWith('UI Toolkit') ? 3 : 2}
            id={section.title.replace(/\s+/g, '-').toLowerCase()}
          >
            {section.title}
          </Title>
          <Divider my="sm" />
          {section.content && <Text my="lg">{section.content}</Text>}
          {section.checklistItems &&
            section.checklistItems.map((item, itemIndex) => (
              <ChecklistItem key={itemIndex}>{item}</ChecklistItem>
            ))}
          {section.image && (
            <Image
              src={section.image.src}
              alt={section.image.alt}
              style={{ maxWidth: '100%', marginTop: '20px' }}
            />
          )}
        </CustomCard>
      ))}
    </SinglePageTemplate>
  );
}
