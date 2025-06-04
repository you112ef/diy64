import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { classNames } from '~/utils/classNames';
import type { GitHubRepoInfo } from '~/components/@settings/tabs/connections/types/GitHub';
import { GitBranch } from '@phosphor-icons/react';

interface GitHubBranch {
  name: string;
  default?: boolean;
}

interface CreateBranchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (branchName: string, sourceBranch: string) => void;
  repository: GitHubRepoInfo;
  branches?: GitHubBranch[];
}

export function CreateBranchDialog({ isOpen, onClose, onConfirm, repository, branches }: CreateBranchDialogProps) {
  const [branchName, setBranchName] = useState('');
  const [sourceBranch, setSourceBranch] = useState(branches?.find((b) => b.default)?.name || 'main');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(branchName, sourceBranch);
    setBranchName('');
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/80" />
        <Dialog.Content
          className={classNames(
            'fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]',
            'w-full max-w-md p-4 rounded-xl shadow-lg', // p-6 to p-4
            'bg-white dark:bg-[#0A0A0A]',
            'border border-[#E5E5E5] dark:border-[#1A1A1A]',
          )}
        >
          <Dialog.Title className="text-base font-medium text-bolt-elements-textPrimary mb-3"> {/* text-lg mb-4 to text-base mb-3 */}
            Create New Branch
          </Dialog.Title>

          <form onSubmit={handleSubmit}>
            <div className="space-y-3"> {/* space-y-4 to space-y-3 */}
              <div>
                <label htmlFor="branchName" className="block text-xs font-medium text-bolt-elements-textSecondary mb-1.5"> {/* text-sm mb-2 to text-xs mb-1.5 */}
                  Branch Name
                </label>
                <input
                  id="branchName"
                  type="text"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  placeholder="feature/my-new-branch"
                  className={classNames(
                    'w-full px-2.5 py-1.5 rounded-lg', // px-3 py-2 to px-2.5 py-1.5
                    'bg-[#F5F5F5] dark:bg-[#1A1A1A]',
                    'border border-[#E5E5E5] dark:border-[#1A1A1A]',
                    'text-bolt-elements-textPrimary placeholder:text-bolt-elements-textTertiary',
                    'focus:outline-none focus:ring-2 focus:ring-purple-500/50',
                  )}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="sourceBranch"
                  className="block text-xs font-medium text-bolt-elements-textSecondary mb-1.5" // text-sm mb-2 to text-xs mb-1.5
                >
                  Source Branch
                </label>
                <select
                  id="sourceBranch"
                  value={sourceBranch}
                  onChange={(e) => setSourceBranch(e.target.value)}
                  className={classNames(
                    'w-full px-2.5 py-1.5 rounded-lg', // px-3 py-2 to px-2.5 py-1.5
                    'bg-[#F5F5F5] dark:bg-[#1A1A1A]',
                    'border border-[#E5E5E5] dark:border-[#1A1A1A]',
                    'text-bolt-elements-textPrimary',
                    'focus:outline-none focus:ring-2 focus:ring-purple-500/50',
                  )}
                >
                  {branches?.map((branch) => (
                    <option key={branch.name} value={branch.name}>
                      {branch.name} {branch.default ? '(default)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-3 p-2.5 bg-[#F5F5F5] dark:bg-[#1A1A1A] rounded-lg"> {/* mt-4 p-3 to mt-3 p-2.5 */}
                <h4 className="text-xs font-medium text-bolt-elements-textSecondary mb-1.5">Branch Overview</h4> {/* text-sm mb-2 to text-xs mb-1.5 */}
                <ul className="space-y-1.5 text-xs text-bolt-elements-textSecondary"> {/* space-y-2 text-sm to space-y-1.5 text-xs */}
                  <li className="flex items-center gap-1.5"> {/* gap-2 to gap-1.5 */}
                    <GitBranch className="text-base" /> {/* text-lg to text-base */}
                    Repository: {repository.name}
                  </li>
                  {branchName && (
                    <li className="flex items-center gap-1.5"> {/* gap-2 to gap-1.5 */}
                      <div className="i-ph:check-circle text-green-500" />
                      New branch will be created as: {branchName}
                    </li>
                  )}
                  <li className="flex items-center gap-1.5"> {/* gap-2 to gap-1.5 */}
                    <div className="i-ph:check-circle text-green-500" />
                    Based on: {sourceBranch}
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2"> {/* mt-6 gap-3 to mt-4 gap-2 */}
              <button
                type="button"
                onClick={onClose}
                className={classNames(
                  'px-3 py-1.5 rounded-lg text-xs font-medium', // px-4 py-2 text-sm to px-3 py-1.5 text-xs
                  'text-bolt-elements-textPrimary',
                  'bg-[#F5F5F5] dark:bg-[#1A1A1A]',
                  'hover:bg-purple-500/10 hover:text-purple-500',
                  'dark:hover:bg-purple-500/20 dark:hover:text-purple-500',
                  'transition-colors',
                )}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={classNames(
                  'px-3 py-1.5 rounded-lg text-xs font-medium', // px-4 py-2 text-sm to px-3 py-1.5 text-xs
                  'text-white bg-purple-500',
                  'hover:bg-purple-600',
                  'transition-colors',
                )}
              >
                Create Branch
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
