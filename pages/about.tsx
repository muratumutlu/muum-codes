/* eslint-disable import/order */
// pages/github-repo-directory.js or a similar path
import { CustomCard, SinglePageTemplate } from '@/components';
import { Checkbox, Divider, Flex, Image, Table, Text, Title } from '@mantine/core';

import pageData from '@/data/pageData.json';

export default function About() {
  const ChecklistItem = ({ children }: { children: React.ReactNode }) => (
    <Flex align="center" my="xs">
      <Checkbox checked readOnly mr="sm" />
      <Text>{children}</Text>
    </Flex>
  );

  return (
    <SinglePageTemplate>
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
          {section.table && (
            <Table>
              <Table.Thead>
                <Table.Tr>
                  {section.table.headers.map((header, headerIndex) => (
                    <Table.Th key={headerIndex}>{header}</Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {section.table.rows.map((row, rowIndex) => (
                  <Table.Tr key={rowIndex}>
                    <Table.Td>
                      <Text fw={700}>{row.criteria}</Text>
                    </Table.Td>
                    <Table.Td>{row['Mantine UI']}</Table.Td>
                    <Table.Td>{row['Material UI']}</Table.Td>
                    <Table.Td>{row['Chakra UI']}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
          {section.decisions &&
            section.decisions.map((decision, decisionIndex) => (
              <Flex key={decisionIndex} my="sm">
                <Text fw={700}>{decision.name}</Text>: <Text ml="sm">{decision.description}</Text>
              </Flex>
            ))}
          {section.conclusion && <Text my="md">{section.conclusion}</Text>}
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
