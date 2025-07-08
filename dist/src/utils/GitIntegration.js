"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitIntegration = exports.GitIntegration = void 0;
const events_1 = require("events");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
class GitIntegration extends events_1.EventEmitter {
    constructor() {
        super();
        this.watching = false;
        this.gitDir = '.git';
        this.startWatching();
    }
    startWatching() {
        if (this.watching)
            return;
        try {
            (0, fs_1.watch)(this.gitDir, { recursive: true }, () => {
                this.emitGitStatus();
                this.emitRecentCommit();
            });
            this.watching = true;
        }
        catch (error) {
            console.warn('Git directory not found or not accessible');
        }
    }
    async emitGitStatus() {
        try {
            const status = await this.getLiveGitStatus();
            this.emit('change', { type: 'status', data: status });
        }
        catch (error) {
            // Silently handle errors
        }
    }
    async emitRecentCommit() {
        try {
            const commits = await this.getRecentCommits(1);
            if (commits.length > 0) {
                this.emit('change', { type: 'commit', data: commits[0] });
            }
        }
        catch (error) {
            // Silently handle errors
        }
    }
    async getLiveGitStatus() {
        try {
            const { stdout } = await execAsync('git status --porcelain -b', { cwd: process.cwd() });
            const lines = stdout.trim().split('\n');
            let branch = 'main';
            const staged = [];
            const unstaged = [];
            const untracked = [];
            lines.forEach(line => {
                if (line.startsWith('## ')) {
                    const branchLine = line.replace('## ', '').split('...')[0];
                    if (branchLine) {
                        branch = branchLine;
                    }
                }
                else if (line.trim()) {
                    const status = line.substring(0, 2);
                    const filename = line.substring(3);
                    if (status.startsWith('A') || status.startsWith('M')) {
                        staged.push(filename);
                    }
                    else if (status.startsWith(' M') || status.startsWith(' D')) {
                        unstaged.push(filename);
                    }
                    else if (status.startsWith('??')) {
                        untracked.push(filename);
                    }
                }
            });
            return { branch, staged, unstaged, untracked };
        }
        catch (error) {
            return { branch: 'unknown', staged: [], unstaged: [], untracked: [] };
        }
    }
    async getRecentCommits(n) {
        try {
            const { stdout } = await execAsync(`git log -n ${n} --pretty=format:"%H|%an|%ad|%s" --date=iso`, { cwd: process.cwd() });
            if (!stdout.trim())
                return [];
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
        }
        catch (error) {
            return [];
        }
    }
    onGitChange(callback) {
        this.on('change', callback);
    }
}
exports.GitIntegration = GitIntegration;
// Export singleton instance
exports.gitIntegration = new GitIntegration();
//# sourceMappingURL=GitIntegration.js.map