import { EventEmitter } from 'events';
import { exec } from 'child_process';
import { watch } from 'fs';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface GitStatus {
  branch: string;
  staged: string[];
  unstaged: string[];
  untracked: string[];
}

export interface GitCommit {
  hash: string;
  author: string;
  date: string;
  message: string;
}

export interface GitEvent {
  type: 'commit' | 'status' | 'branch';
  data: any;
}

export class GitIntegration extends EventEmitter {
  private gitDir: string;
  private watching: boolean = false;

  constructor() {
    super();
    this.gitDir = '.git';
    this.startWatching();
  }

  private startWatching(): void {
    if (this.watching) return;
    
    try {
      watch(this.gitDir, { recursive: true }, () => {
        this.emitGitStatus();
        this.emitRecentCommit();
      });
      this.watching = true;
    } catch (error) {
      console.warn('Git directory not found or not accessible');
    }
  }

  private async emitGitStatus(): Promise<void> {
    try {
      const status = await this.getLiveGitStatus();
      this.emit('change', { type: 'status', data: status });
    } catch (error) {
      // Silently handle errors
    }
  }

  private async emitRecentCommit(): Promise<void> {
    try {
      const commits = await this.getRecentCommits(1);
      if (commits.length > 0) {
        this.emit('change', { type: 'commit', data: commits[0] });
      }
    } catch (error) {
      // Silently handle errors
    }
  }

  async getLiveGitStatus(): Promise<GitStatus> {
    try {
      const { stdout } = await execAsync('git status --porcelain -b', { cwd: process.cwd() });
      const lines = stdout.trim().split('\n');
      
      let branch = 'main';
      const staged: string[] = [];
      const unstaged: string[] = [];
      const untracked: string[] = [];

      lines.forEach(line => {
        if (line.startsWith('## ')) {
          const branchLine = line.replace('## ', '').split('...')[0];
          if (branchLine) {
            branch = branchLine;
          }
        } else if (line.trim()) {
          const status = line.substring(0, 2);
          const filename = line.substring(3);
          
          if (status.startsWith('A') || status.startsWith('M')) {
            staged.push(filename);
          } else if (status.startsWith(' M') || status.startsWith(' D')) {
            unstaged.push(filename);
          } else if (status.startsWith('??')) {
            untracked.push(filename);
          }
        }
      });

      return { branch, staged, unstaged, untracked };
    } catch (error) {
      return { branch: 'unknown', staged: [], unstaged: [], untracked: [] };
    }
  }

  async getRecentCommits(n: number): Promise<GitCommit[]> {
    try {
      const { stdout } = await execAsync(`git log -n ${n} --pretty=format:"%H|%an|%ad|%s" --date=iso`, { cwd: process.cwd() });
      
      if (!stdout.trim()) return [];

      const commits = stdout.trim().split('\n').map(line => {
        const [hash, author, date, ...messageParts] = line.split('|');
        const message = messageParts.join('|');
        
        return {
          hash: hash || '',
          author: author || '',
          date: date || '',
          message: message || ''
        };
      });

      return commits.filter(commit => commit.hash && commit.author && commit.date);
    } catch (error) {
      return [];
    }
  }

  onGitChange(callback: (event: GitEvent) => void): void {
    this.on('change', callback);
  }
}

// Export singleton instance
export const gitIntegration = new GitIntegration(); 