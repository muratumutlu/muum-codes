/* eslint-disable import/order */
import { SinglePageTemplate } from '@/components';
import { fetchGithubReadmeHtml, fetchGithubRepo } from '@/helpers/fetchers';
import { getRepoSignalAssessment } from '@/helpers/repoSignals';
import type {
  RepoSignalAssessment,
  RepoSignalDimension,
} from '@/helpers/repoSignals';
import { beautifyDate } from '@/utils/date';
import {
  Anchor,
  Avatar,
  Badge,
  Button,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconBook,
  IconBrandGithub,
  IconCalendar,
  IconCircleDot,
  IconCode,
  IconExternalLink,
  IconFileText,
  IconGitFork,
  IconStar,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import classes from './repository.module.css';

const getQueryValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const formatNumber = (value: number | undefined) =>
  typeof value === 'number' ? value.toLocaleString('en-US') : '0';

const README_FRAME_MIN_HEIGHT = 420;
const README_FRAME_MAX_HEIGHT = 900;

const buildReadmeDocument = (readmeHtml: string) => `<!doctype html>
<html>
  <head>
    <base target="_blank" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      :root {
        color-scheme: light;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 24px;
        color: #121615;
        background: #fff;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 15px;
        line-height: 1.65;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 28px 0 12px;
        color: #121615;
        font-family: "Avenir Next", "Trebuchet MS", Verdana, sans-serif;
        font-weight: 900;
        line-height: 1.12;
      }

      h1:first-child,
      h2:first-child,
      h3:first-child {
        margin-top: 0;
      }

      h1 {
        font-size: 34px;
      }

      h2 {
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(21, 18, 14, 0.12);
        font-size: 24px;
      }

      h3 {
        font-size: 19px;
      }

      p,
      ul,
      ol,
      pre,
      table,
      blockquote {
        margin: 0 0 16px;
      }

      a {
        color: #00b881;
        font-weight: 800;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      img {
        max-width: 100%;
        height: auto;
        vertical-align: middle;
      }

      pre {
        overflow: auto;
        padding: 14px;
        border: 1px solid rgba(18, 22, 21, 0.11);
        border-radius: 6px;
        background: #f6f8f7;
      }

      code {
        padding: 2px 5px;
        border-radius: 4px;
        background: #f6f8f7;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 0.92em;
      }

      pre code {
        padding: 0;
        background: transparent;
      }

      table {
        display: block;
        width: 100%;
        overflow: auto;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 8px 10px;
        border: 1px solid rgba(21, 18, 14, 0.14);
      }

      blockquote {
        padding-left: 16px;
        border-left: 3px solid #00b881;
        color: #46504d;
      }

      .anchor,
      .octicon {
        display: none;
      }
    </style>
  </head>
  <body>${readmeHtml}</body>
</html>`;

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className={classes.metric}>
      {icon}
      <Text className={classes.metricValue}>{value}</Text>
      <Text className={classes.metricLabel}>{label}</Text>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className={classes.metaRow}>
      <Text className={classes.label}>{label}</Text>
      <div className={classes.metaValue}>{value}</div>
    </div>
  );
}

function ReadmeFrame({ html }: { html: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [frameHeight, setFrameHeight] = useState(README_FRAME_MIN_HEIGHT);
  const srcDoc = useMemo(() => buildReadmeDocument(html), [html]);

  const syncFrameHeight = () => {
    try {
      const scrollHeight = frameRef.current?.contentDocument?.body.scrollHeight;

      if (!scrollHeight) {
        return;
      }

      setFrameHeight(
        Math.min(
          Math.max(scrollHeight + 32, README_FRAME_MIN_HEIGHT),
          README_FRAME_MAX_HEIGHT,
        ),
      );
    } catch {
      setFrameHeight(README_FRAME_MAX_HEIGHT);
    }
  };

  return (
    <iframe
      ref={frameRef}
      className={classes.readmeFrame}
      height={frameHeight}
      onLoad={syncFrameHeight}
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin"
      srcDoc={srcDoc}
      title="Repository README"
    />
  );
}

function SignalBar({ dimension }: { dimension: RepoSignalDimension }) {
  return (
    <div className={classes.signalBarRow}>
      <Group justify="space-between" gap="sm" align="flex-start">
        <div>
          <Text className={classes.signalBarLabel}>{dimension.label}</Text>
          <Text className={classes.signalBarEvidence}>
            {dimension.evidence}
          </Text>
        </div>
        <Text className={classes.signalBarValue}>{dimension.score}</Text>
      </Group>
      <div className={classes.signalBarTrack}>
        <span
          style={{ '--signal-value': `${dimension.score}%` } as CSSProperties}
        />
      </div>
    </div>
  );
}

function SignalDashboard({
  assessment,
  repo,
}: {
  assessment: RepoSignalAssessment;
  repo: {
    created_at?: string;
    pushed_at?: string;
    updated_at?: string;
  };
}) {
  const activityItems = [
    { label: 'Created', value: beautifyDate(repo.created_at ?? null) },
    { label: 'Updated', value: beautifyDate(repo.updated_at ?? null) },
    { label: 'Pushed', value: beautifyDate(repo.pushed_at ?? null) },
  ];

  return (
    <Paper component="section" className={classes.signalPanel}>
      <Grid gutter="lg" align="stretch">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <div className={classes.scoreCard}>
            <Text className={classes.label}>Repo signal score</Text>
            <div
              className={classes.scoreDial}
              style={
                {
                  '--score-fill': `${assessment.score}%`,
                } as CSSProperties
              }
            >
              <span>{assessment.score}</span>
              <em>{assessment.grade}</em>
            </div>
            <Text className={classes.signalSummary}>{assessment.summary}</Text>
            <Text className={classes.signalNote}>
              Proxy score based on public GitHub metadata, README availability,
              freshness, issue load, docs signals, and agent keywords.
            </Text>
          </div>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 5 }}>
          <Stack gap="sm">
            <Text className={classes.label}>Agent readiness dimensions</Text>
            {assessment.dimensions.map((dimension) => (
              <SignalBar key={dimension.key} dimension={dimension} />
            ))}
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <Stack gap="sm" className={classes.timelinePanel}>
            <Text className={classes.label}>Activity timeline</Text>
            {activityItems.map((item) => (
              <div className={classes.timelineItem} key={item.label}>
                <span />
                <div>
                  <Text className={classes.timelineLabel}>{item.label}</Text>
                  <Text className={classes.timelineValue}>{item.value}</Text>
                </div>
              </div>
            ))}
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

export default function RepositoryPage() {
  const router = useRouter();
  const owner = getQueryValue(router.query.owner);
  const name = getQueryValue(router.query.name);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['githubRepo', owner, name],
    queryFn: () => fetchGithubRepo(owner as string, name as string),
    enabled: Boolean(owner && name),
    staleTime: 300000,
  });

  const {
    data: readmeHtml,
    isError: isReadmeError,
    isLoading: isReadmeLoading,
  } = useQuery({
    queryKey: ['githubRepoReadme', owner, name],
    queryFn: () => fetchGithubReadmeHtml(owner as string, name as string),
    enabled: Boolean(owner && name && data),
    staleTime: 300000,
  });

  const signalAssessment = useMemo(
    () =>
      data
        ? getRepoSignalAssessment(data, {
            hasReadme: isReadmeLoading ? undefined : Boolean(readmeHtml),
          })
        : null,
    [data, isReadmeLoading, readmeHtml],
  );

  const pageTitle = data?.full_name
    ? `${data.full_name} | Muum Repo Explorer`
    : 'Repository detail | Muum Repo Explorer';

  if (!owner || !name) {
    return (
      <SinglePageTemplate title={pageTitle}>
        <Paper className={classes.errorPanel}>
          <Stack gap="md">
            <Text className={classes.eyebrow}>Repository detail</Text>
            <Title className={classes.title}>Missing repository target.</Title>
            <Button
              className={classes.backButton}
              leftSection={<IconArrowLeft size={16} />}
              onClick={() => router.push('/')}
              variant="subtle"
            >
              Back to explorer
            </Button>
          </Stack>
        </Paper>
      </SinglePageTemplate>
    );
  }

  return (
    <SinglePageTemplate title={pageTitle}>
      <div className={classes.shell}>
        <Group justify="space-between" gap="md">
          <Button
            className={classes.backButton}
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => router.push('/')}
            variant="subtle"
          >
            Back to explorer
          </Button>
          {data?.html_url && (
            <Button
              component="a"
              href={data.html_url}
              target="_blank"
              rel="noreferrer"
              className={classes.githubButton}
              leftSection={<IconBrandGithub size={16} />}
            >
              Open GitHub
            </Button>
          )}
        </Group>

        <Paper component="section" className={classes.hero}>
          {isLoading && (
            <Stack gap="md">
              <Skeleton height={18} width={220} />
              <Skeleton height={72} width="70%" />
              <Skeleton height={24} width="86%" />
              <Skeleton height={38} width={280} />
            </Stack>
          )}

          {isError && (
            <Stack gap="sm">
              <Text className={classes.eyebrow}>Repository detail</Text>
              <Title className={classes.title}>
                Repository could not load.
              </Title>
              <Text className={classes.description}>
                GitHub did not return details for {owner}/{name}. The repository
                may be private, renamed, deleted, or temporarily rate-limited.
              </Text>
            </Stack>
          )}

          {data && (
            <Stack gap="lg">
              <Group gap="sm">
                <Badge className={classes.topic} variant="outline">
                  Repository detail
                </Badge>
                {data.visibility && (
                  <Badge className={classes.topic} variant="outline">
                    {data.visibility}
                  </Badge>
                )}
              </Group>

              <Group gap="sm" align="center">
                <Avatar
                  src={data.owner?.avatar_url}
                  alt={data.owner?.login}
                  radius="sm"
                  size={42}
                />
                <Text className={classes.owner}>{data.owner?.login}</Text>
              </Group>

              <Title className={classes.title}>{data.full_name}</Title>
              <Text className={classes.description}>
                {data.description ?? 'No repository description provided.'}
              </Text>

              <Group gap="sm">
                {data.homepage && (
                  <Button
                    component="a"
                    href={data.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className={classes.homepageButton}
                    leftSection={<IconExternalLink size={16} />}
                    variant="outline"
                  >
                    Homepage
                  </Button>
                )}
                {data.owner?.html_url && (
                  <Anchor href={data.owner.html_url} target="_blank">
                    Owner profile
                  </Anchor>
                )}
              </Group>
            </Stack>
          )}
        </Paper>

        {data && signalAssessment && (
          <SignalDashboard assessment={signalAssessment} repo={data} />
        )}

        {data && (
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="md">
                <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
                  <Metric
                    icon={<IconStar size={22} />}
                    label="Stars"
                    value={formatNumber(data.stargazers_count)}
                  />
                  <Metric
                    icon={<IconGitFork size={22} />}
                    label="Forks"
                    value={formatNumber(data.forks)}
                  />
                  <Metric
                    icon={<IconCircleDot size={22} />}
                    label="Issues"
                    value={formatNumber(data.open_issues_count)}
                  />
                  <Metric
                    icon={<IconBook size={22} />}
                    label="Watchers"
                    value={formatNumber(data.watchers_count)}
                  />
                </SimpleGrid>

                <Paper className={classes.panel}>
                  <Stack gap="sm">
                    <Text className={classes.label}>Topics</Text>
                    {data.topics?.length ? (
                      <Group gap="xs">
                        {data.topics.map((topic) => (
                          <Badge
                            key={topic}
                            className={classes.topic}
                            variant="outline"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </Group>
                    ) : (
                      <Text className={classes.empty}>
                        No topics published for this repository.
                      </Text>
                    )}
                  </Stack>
                </Paper>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper className={classes.panel}>
                <MetaRow
                  label="Language"
                  value={
                    <Group gap={6} justify="flex-end">
                      <IconCode size={15} />
                      {data.language ?? 'Unknown'}
                    </Group>
                  }
                />
                <MetaRow
                  label="Branch"
                  value={data.default_branch ?? 'Unknown'}
                />
                <MetaRow
                  label="License"
                  value={data.license?.spdx_id ?? data.license?.name ?? 'None'}
                />
                <MetaRow
                  label="Created"
                  value={
                    <Group gap={6} justify="flex-end">
                      <IconCalendar size={15} />
                      {beautifyDate(data.created_at ?? null)}
                    </Group>
                  }
                />
                <MetaRow
                  label="Updated"
                  value={beautifyDate(data.updated_at ?? null)}
                />
                <MetaRow
                  label="Pushed"
                  value={beautifyDate(data.pushed_at ?? null)}
                />
              </Paper>
            </Grid.Col>
          </Grid>
        )}

        {data && (
          <Paper component="section" className={classes.readmePanel}>
            <Stack gap="md">
              <Group gap="sm" align="center">
                <IconFileText size={18} />
                <Text className={classes.label}>README</Text>
              </Group>

              {isReadmeLoading && (
                <Stack gap="sm">
                  <Skeleton height={22} width="36%" />
                  <Skeleton height={18} width="92%" />
                  <Skeleton height={18} width="84%" />
                  <Skeleton height={260} width="100%" />
                </Stack>
              )}

              {isReadmeError && (
                <Text className={classes.empty}>
                  README could not be loaded right now. GitHub may be
                  rate-limited or temporarily unavailable.
                </Text>
              )}

              {!isReadmeLoading && !isReadmeError && !readmeHtml && (
                <Text className={classes.empty}>
                  This repository does not publish a README file.
                </Text>
              )}

              {readmeHtml && <ReadmeFrame html={readmeHtml} />}
            </Stack>
          </Paper>
        )}
      </div>
    </SinglePageTemplate>
  );
}
