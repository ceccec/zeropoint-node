import { EventEmitter } from 'events';
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
export declare class GitIntegration extends EventEmitter {
    private gitDir;
    private watching;
    private watcher?;
    constructor();
    private startWatching;
    stopWatching(): void;
    private emitGitStatus;
    private emitRecentCommit;
    getLiveGitStatus(): Promise<GitStatus>;
    getRecentCommits(n: number): Promise<GitCommit[]>;
    onGitChange(callback: (event: GitEvent) => void): void;
}
export declare const gitIntegration: GitIntegration;
//# sourceMappingURL=GitIntegration.d.ts.map