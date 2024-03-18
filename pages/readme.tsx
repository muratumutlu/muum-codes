// pages/github-repo-directory.js or a similar path
import { Checkbox, Container, Flex, Image, Table, Text } from '@mantine/core';

export default function ReadMe() {
  return (
    <Container size="xl" mt={100}>
      <h1 id="github-repo-directory-project">Github Repo Directory Project</h1>
      <h2 id="managing-the-project-with-sdlc">Managing the Project with SDLC</h2>
      <p>
        While creating that project we wil use SDLC steps to create a managable and scalable
        project. Let&#39;s start
      </p>
      <h2 id="1-requirements-gathering-analysis">1 - Requirements Gathering &amp; Analysis</h2>
      <Flex>
        <Checkbox checked mr="sm" /> Identifying the project&#39;s scope.
      </Flex>
      <Flex>
        <Checkbox checked mr="sm" /> Gathering requirements for the UI toolkit based on project
        needs (performance, customization, ease of use).
      </Flex>
      <Flex>
        <Checkbox checked mr="sm" /> Researching potential users&#39; needs and preferences
        regarding UI/UX.
      </Flex>
      <Flex>
        <Checkbox checked mr="sm" /> Creating github issues for each requirements
      </Flex>
      <h2 id="2-design">2 - Design</h2>

      <Flex>
        <Checkbox checked mr="sm" /> Comparing the possible UI toolkits and libraries based on the
        requirements based on Customizability, Performance, Community support and documentation
      </Flex>
      <Flex>
        <Checkbox checked mr="sm" /> Finalizing the choice of UI toolkit.
      </Flex>
      <Flex>
        <Checkbox checked mr="sm" /> Designing the application architecture.
      </Flex>
      <Flex>
        <Checkbox checked mr="sm" /> Creating wireframes and mockups.
      </Flex>

      <h3 id="ui-toolkit-comparison-mantinw-ui-material-ui-and-chakra-ui">
        UI Toolkit Comparison: Mantinw UI, Material UI, and Chakra UI
      </h3>
      <p>
        The comparison aims to assist in making an informed decision on the most suitable UI
        framework for our development needs.
      </p>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Feature/Criteria</Table.Th>
            <Table.Th>Mantine UI</Table.Th>
            <Table.Th>Material UI</Table.Th>
            <Table.Th>Chakra UI</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Text fw={700}>Customization</Text>
            </Table.Td>
            <Table.Td>High customization with less effort.</Table.Td>
            <Table.Td>Extensive customization but can be more complex.</Table.Td>
            <Table.Td>Easy and flexible customization.</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Text fw={700}>Performance</Text>
            </Table.Td>
            <Table.Td>Optimized for speed and efficiency.</Table.Td>
            <Table.Td>Good, but can be heavy for complex applications.</Table.Td>
            <Table.Td>Balanced performance, good for dynamic UIs.</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Text fw={700}>Ease of Use</Text>
            </Table.Td>
            <Table.Td>Simple API and easy to learn.</Table.Td>
            <Table.Td>Steep learning curve due to comprehensive features.</Table.Td>
            <Table.Td>Intuitive API, easy to use and learn.</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Text fw={700}>Community Support</Text>
            </Table.Td>
            <Table.Td>Growing community, responsive support.</Table.Td>
            <Table.Td>Large community, extensive resources and support.</Table.Td>
            <Table.Td>Strong community, good documentation and support.</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Text fw={700}>Documentation</Text>
            </Table.Td>
            <Table.Td>Well-documented with examples.</Table.Td>
            <Table.Td>Extensive and detailed documentation.</Table.Td>
            <Table.Td>Comprehensive documentation with examples.</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Text fw={700}>Accessibility</Text>
            </Table.Td>
            <Table.Td>Focus on accessibility with ARIA support.</Table.Td>
            <Table.Td>Strong emphasis on accessibility.</Table.Td>
            <Table.Td>Good accessibility features and best practices.</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Text fw={700}>Mobile Responsiveness</Text>
            </Table.Td>
            <Table.Td>Fully responsive components.</Table.Td>
            <Table.Td>Responsive design is a core feature.</Table.Td>
            <Table.Td>Responsive components with mobile-first approach.</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Text fw={700}>Popularity</Text>
            </Table.Td>
            <Table.Td>Increasing popularity, newer in the market.</Table.Td>
            <Table.Td>Most popular, widely adopted.</Table.Td>
            <Table.Td>Rapidly gaining popularity.</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Text fw={700}>Unique Features</Text>
            </Table.Td>
            <Table.Td>Lightweight, modern UI, less boilerplate.</Table.Td>
            <Table.Td>Material Design principles, rich components.</Table.Td>
            <Table.Td>Easy theming, focus on composition and flexibility.</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      <h3 id="ui-toolkit-decision">UI Toolkit Decision</h3>

      <Flex>
        <Text fw={700}>Mantine UI</Text> offers a balance between customization, ease of use, and
        performance, making it a strong candidate for projects prioritizing developer experience and
        speed.
      </Flex>
      <Flex>
        <Text fw={700}>Material UI</Text> is suited for applications that benefit from Material
        Design and require a comprehensive suite of components.
      </Flex>
      <Flex>
        <Text fw={700}>Chakra UI</Text> is ideal for projects that emphasize accessibility,
        simplicity, and ease of theming.
      </Flex>

      <p>
        As I am the only developer in the current project, I will choose the one which can be
        learned easily. So that after inspecting its Table component and other ready-to-go custom
        hooks, <Text fw={700}>Mantine UI</Text> will be my choice.
      </p>
      <h3 id="architecture-of-the-application">Architecture of the Application</h3>
      <Image
        src="https://private-user-images.githubusercontent.com/6642361/313503668-091e3395-b4b8-4107-baf6-89e4c794f5f4.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTA3NjM3NDQsIm5iZiI6MTcxMDc2MzQ0NCwicGF0aCI6Ii82NjQyMzYxLzMxMzUwMzY2OC0wOTFlMzM5NS1iNGI4LTQxMDctYmFmNi04OWU0Yzc5NGY1ZjQucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI0MDMxOCUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDAzMThUMTIwNDA0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9ZDY5MjhlY2JlNDdmNGQ2ZWZlMWExZTNhMTE1M2EwMGU4NjM4ZDQwNWVjMTc4NTQ1NDA2NGNjNTIzZDFiOGU2YSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.-3G72O4wao1leUjEH3ovkFyjSPF05NKyb2-ybKvC1Q8"
        alt="Architecture of the Application"
      />

      <h3 id="wireframe-of-the-application">Wireframe of the Application</h3>
      <Image
        src="https://private-user-images.githubusercontent.com/6642361/313503680-343ebb26-2b61-471d-8bbe-c091be6007f4.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTA3NjM3NDQsIm5iZiI6MTcxMDc2MzQ0NCwicGF0aCI6Ii82NjQyMzYxLzMxMzUwMzY4MC0zNDNlYmIyNi0yYjYxLTQ3MWQtOGJiZS1jMDkxYmU2MDA3ZjQucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI0MDMxOCUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDAzMThUMTIwNDA0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9NWY5MzYwODE5NDgxN2E3ZDU3YTIxNGYwZjNmMjliMDM2YmFlMjY1OTk4YmJiNGYwMDFmYTg0YTYwNjFmMzJkNCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.gf-2z94AjXjcSK_9nF8RS2TXd1PBjlN2XiQemYNNB7k"
        alt="Wireframe of the Application"
      />

      <h2 id="3-implementation">3 - Implementation</h2>

      <Flex>
        <Checkbox checked mr="sm" /> Set upping the project repository.
      </Flex>
      <Flex>
        <Checkbox checked mr="sm" /> Configuring Next.js, TypeScript and the chosen libraries
      </Flex>
      <Flex>
        <Checkbox checked mr="sm" /> Implementing the frontend features according to the design
        mockups.
      </Flex>
      <Flex>
        <Checkbox checked mr="sm" /> Implementing the responsiveness.
      </Flex>

      <h2 id="4-testing">4 - Testing</h2>

      <Flex>
        <Checkbox checked mr="sm" /> Unit test individual components and services.
      </Flex>
      <Flex>
        <Checkbox checked mr="sm" /> Integration test the combined parts of the application.
      </Flex>
      <Flex>
        <Checkbox checked mr="sm" /> Perform user acceptance testing to ensure the app meets
        requirements.
      </Flex>

      <h2 id="5-deployment">5 - Deployment</h2>

      <Flex>
        <Checkbox checked mr="sm" /> Set upping CI/CD pipelines.
      </Flex>
      <Flex>
        <Checkbox checked mr="sm" /> Deploy the application to a staging environment.
      </Flex>
      <Flex>
        <Checkbox checked mr="sm" /> Conducting final pre-launch checks.
      </Flex>
      <Flex>
        <Checkbox checked mr="sm" /> Deploying the application to production.
      </Flex>

      <h2 id="6-maintenance">6 - Maintenance</h2>

      <Flex>[ ] Monitoring the application for issues.</Flex>
      <Flex>[ ] Updating dependencies and the UI toolkit as needed.</Flex>
      <Flex>[ ] Continuously improving the application based on user feedbacks.</Flex>
    </Container>
  );
}
