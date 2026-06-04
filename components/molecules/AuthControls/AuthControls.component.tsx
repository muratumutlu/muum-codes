/* eslint-disable import/order */
import { isClerkConfigured } from '@/utils/auth';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/clerk-react';
import { Badge, Group, Tooltip } from '@mantine/core';
import { IconLogin2, IconUserPlus } from '@tabler/icons-react';
import classes from './AuthControls.module.css';

interface AuthControlsProps {
  compact?: boolean;
}

export default function AuthControls({ compact = false }: AuthControlsProps) {
  if (!isClerkConfigured) {
    return (
      <Tooltip label="Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY">
        <Badge className={classes.offBadge} variant="outline">
          Clerk off
        </Badge>
      </Tooltip>
    );
  }

  return (
    <Group gap="xs" wrap="nowrap">
      <SignedOut>
        <SignInButton mode="modal">
          <button
            type="button"
            className={classes.secondaryButton}
            data-compact={compact || undefined}
          >
            <IconLogin2 size={16} />
            Sign in
          </button>
        </SignInButton>
        {!compact && (
          <SignUpButton mode="modal">
            <button type="button" className={classes.primaryButton}>
              <IconUserPlus size={16} />
              Join
            </button>
          </SignUpButton>
        )}
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </Group>
  );
}
