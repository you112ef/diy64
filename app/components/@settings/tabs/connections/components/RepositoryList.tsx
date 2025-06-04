import React, { useContext } from 'react';
import type { GitHubRepoInfo } from '~/types/GitHub';
import { EmptyState, StatusIndicator } from '~/components/ui';
import { RepositoryCard } from './RepositoryCard';
import { RepositoryDialogContext } from './RepositoryDialogContext';

interface RepositoryListProps {
  repos: GitHubRepoInfo[];
  isLoading: boolean;
  onSelect: (repo: GitHubRepoInfo) => void;
  activeTab: string;
}

export function RepositoryList({ repos, isLoading, onSelect, activeTab }: RepositoryListProps) {
  // Access the parent component's setShowAuthDialog function
  const { setShowAuthDialog } = useContext(RepositoryDialogContext);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-bolt-elements-textSecondary dark:text-bolt-elements-textSecondary-dark"> {/* py-8 to py-6 */}
        <StatusIndicator status="loading" pulse={true} size="default" label="Loading repositories..." className="mb-1.5" /> {/* size lg to default, mb-2 to mb-1.5 */}
        <p className="text-xs text-bolt-elements-textTertiary dark:text-bolt-elements-textTertiary-dark">
          This may take a moment
        </p>
      </div>
    );
  }

  if (repos.length === 0) {
    if (activeTab === 'my-repos') {
      return (
        <EmptyState
          icon="i-ph:folder-simple-dashed" // Icon size will be handled by EmptyState if it has props for it, or default
          title="No repositories found" // Title size will be handled by EmptyState
          description="Connect your GitHub account or create a new repository to get started" // Desc size will be handled by EmptyState
          actionLabel="Connect GitHub Account" // Button will be scaled by Button component
          onAction={() => setShowAuthDialog(true)}
        />
      );
    } else {
      return (
        <EmptyState
          icon="i-ph:magnifying-glass"
          title="No repositories found"
          description="Try searching with different keywords or filters"
        />
      );
    }
  }

  return (
    <div className="space-y-2.5"> {/* space-y-3 to space-y-2.5 */}
      {repos.map((repo) => (
        <RepositoryCard key={repo.full_name} repo={repo} onSelect={() => onSelect(repo)} />
      ))}
    </div>
  );
}
