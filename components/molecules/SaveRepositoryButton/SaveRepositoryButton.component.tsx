/* eslint-disable import/order */
import { saveRepositoryToWorkspace } from '@/helpers/cloudflare';
import type { GithubRepository } from '@/types/GithubRepo.types';
import { isClerkConfigured } from '@/utils/auth';
import { SignInButton, useAuth } from '@clerk/clerk-react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import classes from './SaveRepositoryButton.module.css';

interface SaveRepositoryButtonProps {
  repo: GithubRepository;
}

function DisabledSaveRepositoryButton() {
  return (
    <Tooltip label="Clerk is not configured">
      <ActionIcon
        aria-label="Save repository"
        className={classes.saveButton}
        disabled
        variant="subtle"
      >
        <IconBookmark size={18} />
      </ActionIcon>
    </Tooltip>
  );
}

function ClerkSaveRepositoryButton({ repo }: SaveRepositoryButtonProps) {
  const { getToken, isSignedIn } = useAuth();
  const [saved, setSaved] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Sign in required');
      return saveRepositoryToWorkspace(repo, token);
    },
    onSuccess: () => {
      setSaved(true);
    },
  });

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <Tooltip label="Sign in to save">
          <ActionIcon
            aria-label="Sign in to save repository"
            className={classes.saveButton}
            color="gray"
            onClick={(event) => event.stopPropagation()}
            variant="subtle"
          >
            <IconBookmark size={18} />
          </ActionIcon>
        </Tooltip>
      </SignInButton>
    );
  }

  return (
    <Tooltip
      label={
        mutation.isError
          ? mutation.error instanceof Error
            ? mutation.error.message
            : 'Repository could not be saved'
          : saved
            ? 'Saved'
            : 'Save'
      }
    >
      <ActionIcon
        aria-label="Save repository"
        className={saved ? classes.saveButtonActive : classes.saveButton}
        color={mutation.isError ? 'red' : saved ? 'teal' : 'gray'}
        loading={mutation.isPending}
        onClick={(event) => {
          event.stopPropagation();
          mutation.mutate();
        }}
        variant={saved ? 'filled' : 'subtle'}
      >
        {saved ? <IconBookmarkFilled size={18} /> : <IconBookmark size={18} />}
      </ActionIcon>
    </Tooltip>
  );
}

export default function SaveRepositoryButton({
  repo,
}: SaveRepositoryButtonProps) {
  if (!isClerkConfigured) return <DisabledSaveRepositoryButton />;
  return <ClerkSaveRepositoryButton repo={repo} />;
}
