/* eslint-disable import/order */
import { isClerkConfigured } from '@/utils/auth';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Badge, Button, Group, Tooltip } from '@mantine/core';
import { IconLogin2, IconUserPlus } from '@tabler/icons-react';

interface AuthControlsProps {
  compact?: boolean;
}

export default function AuthControls({ compact = false }: AuthControlsProps) {
  if (!isClerkConfigured) {
    return (
      <Tooltip label="Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY">
        <Badge color="gray" variant="light">
          Clerk off
        </Badge>
      </Tooltip>
    );
  }

  return (
    <Group gap="xs" wrap="nowrap">
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            size={compact ? 'xs' : 'sm'}
            variant="subtle"
            leftSection={<IconLogin2 size={16} />}
          >
            Sign in
          </Button>
        </SignInButton>
        {!compact && (
          <SignUpButton mode="modal">
            <Button size="sm" leftSection={<IconUserPlus size={16} />}>
              Join
            </Button>
          </SignUpButton>
        )}
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </Group>
  );
}
