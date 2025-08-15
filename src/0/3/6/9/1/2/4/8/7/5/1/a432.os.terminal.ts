/**
 * a432.os.terminal.ts — 2432.OS Terminal Control
 *
 * Terminal interface for the 2432.OS operating system.
 * Uses a432.os for all system operations.
 *
 * @module a432.os.terminal
 * @author A432 System
 */

import {
  boot2432OS as osBoot,
  shutdown2432OS as osShutdown,
  getSystemStatus,
  getSystemInfo
} from './a432.os';

// Boot 2432.OS
export function boot2432OS(): string {
  return osBoot();
}

// Shutdown 2432.OS
export function shutdown2432OS(): string {
  return osShutdown();
}

// Get OS status
export function getOSStatus(): string {
  const system = getSystemStatus();
  
  if (!system.isRunning) {
    return `2432.OS Status: OFFLINE
Type 'os.boot' to start the system`;
  }
  
  const kernel = system.kernel;
  const memory = system.memory;
  const network = system.network;
  const uptime = Math.round(kernel.uptime / 1000);
  const runningProcesses = system.processes.filter(p => p.status === 'running').length;
  
  return `2432.OS Status: ONLINE
Uptime: ${uptime}s
Memory: ${memory.used}MB / ${memory.total}MB (${Math.round(memory.used / memory.total * 100)}%)
Network: ${network.interfaces.length} interfaces
Processes: ${runningProcesses}/${system.processes.length} running
Users: ${system.users.length} registered
Current user: ${system.currentUser}`;
}

// Get running processes
export function getOSProcesses(): string {
  const system = getSystemStatus();
  
  if (!system.isRunning) {
    return '2432.OS is not running';
  }
  
  let output = '2432.OS Processes:\n';
  output += 'PID\tStatus\t\tMemory\tCPU\tUser\tPriority\tProcess\n';
  output += '---\t------\t\t------\t---\t----\t--------\t-------\n';
  
  system.processes.forEach(process => {
    const status = process.status.padEnd(8);
    const memory = process.memory.toString().padStart(6);
    const cpu = process.cpu.toString().padStart(3);
    const user = process.user.padEnd(4);
    const priority = process.priority.toString().padStart(8);
    output += `${process.pid}\t${status}\t${memory}\t${cpu}\t${user}\t${priority}\t${process.name}\n`;
  });
  
  return output;
}

// Get memory usage
export function getOSMemory(): string {
  const system = getSystemStatus();
  
  if (!system.isRunning) {
    return '2432.OS is not running';
  }
  
  const { total, used, free, cached, buffers, swapTotal, swapUsed } = system.memory;
  const percentage = Math.round((used / total) * 100);
  const swapPercentage = Math.round((swapUsed / swapTotal) * 100);
  
  return `2432.OS Memory Usage:
Total: ${total}MB
Used:  ${used}MB
Free:  ${free}MB
Cached: ${cached}MB
Buffers: ${buffers}MB
Usage: ${percentage}%

Swap:
Total: ${swapTotal}MB
Used:  ${swapUsed}MB
Usage: ${swapPercentage}%`;
}

// Get network status
export function getOSNetwork(): string {
  const system = getSystemStatus();
  
  if (!system.isRunning) {
    return '2432.OS is not running';
  }
  
  const { interfaces, connections, statistics } = system.network;
  
  let output = `2432.OS Network Status:
Interfaces: ${interfaces.length}
Connections: ${connections.length}

Statistics:
Packets Received: ${statistics.packetsReceived}
Packets Transmitted: ${statistics.packetsTransmitted}
Errors: ${statistics.errors}
Dropped: ${statistics.dropped}
Bandwidth: ${statistics.bandwidth}Mbps

Interfaces:\n`;
  
  interfaces.forEach(iface => {
    output += `${iface.name}: ${iface.status} ${iface.address}/${iface.netmask} MTU:${iface.mtu}\n`;
  });
  
  if (connections.length > 0) {
    output += '\nConnections:\n';
    connections.forEach(conn => {
      output += `${conn.protocol} ${conn.localAddress}:${conn.localPort} ${conn.remoteAddress}:${conn.remotePort} ${conn.status}\n`;
    });
  }
  
  return output;
}

// Get file system info
export function getOSFileSystem(): string {
  const system = getSystemStatus();
  
  if (!system.isRunning) {
    return '2432.OS is not running';
  }
  
  const { mounts, files } = system.filesystem;
  
  let output = '2432.OS File System:\n\n';
  
  output += 'Mounts:\n';
  output += 'Device\t\t\tMount Point\tFile System\tTotal\tUsed\tFree\tUse%\n';
  output += '------\t\t\t----------\t-----------\t-----\t----\t----\t----\n';
  
  mounts.forEach(mount => {
    output += `${mount.device}\t${mount.mountPoint}\t${mount.fileSystem}\t${mount.total}MB\t${mount.used}MB\t${mount.free}MB\t${mount.percentage}%\n`;
  });
  
  output += '\nFiles:\n';
  output += 'Permissions\tOwner\tGroup\tSize\tModified\t\t\tName\n';
  output += '-----------\t-----\t-----\t----\t--------\t\t\t----\n';
  
  files.forEach(file => {
    const date = new Date(file.modified).toLocaleString();
    output += `${file.permissions}\t${file.owner}\t${file.group}\t${file.size}\t${date}\t${file.name}\n`;
  });
  
  return output;
}

// Get system logs
export function getOSLogs(limit: number = 20): string {
  const system = getSystemStatus();
  
  if (!system.isRunning) {
    return '2432.OS is not running';
  }
  
  const recentLogs = system.logs.slice(-limit);
  
  let output = `2432.OS System Logs (last ${recentLogs.length} entries):\n`;
  output += 'Timestamp\t\t\tLevel\tFacility\tPID\tUser\tMessage\n';
  output += '---------\t\t\t-----\t--------\t---\t----\t-------\n';
  
  recentLogs.forEach(log => {
    const timestamp = new Date(log.timestamp).toLocaleString();
    const level = log.level.padEnd(5);
    const facility = log.facility.padEnd(8);
    const pid = log.pid.toString().padStart(3);
    const user = log.user.padEnd(4);
    output += `${timestamp}\t${level}\t${facility}\t${pid}\t${user}\t${log.message}\n`;
  });
  
  return output;
}

// Get users
export function getOSUsers(): string {
  const system = getSystemStatus();
  
  if (!system.isRunning) {
    return '2432.OS is not running';
  }
  
  let output = '2432.OS Users:\n';
  output += 'UID\tGID\tUsername\t\tHome\t\t\tShell\t\tGroups\t\tLast Login\n';
  output += '---\t---\t--------\t\t----\t\t\t-----\t\t------\t\t----------\n';
  
  system.users.forEach(user => {
    const uid = user.uid.toString().padStart(3);
    const gid = user.gid.toString().padStart(3);
    const username = user.username.padEnd(12);
    const home = user.home.padEnd(16);
    const shell = user.shell.padEnd(12);
    const groups = user.groups.join(',').padEnd(12);
    const lastLogin = new Date(user.lastLogin).toLocaleString();
    output += `${uid}\t${gid}\t${username}\t${home}\t${shell}\t${groups}\t${lastLogin}\n`;
  });
  
  return output;
}

// Kill process
export function killOSProcess(pid: number): string {
  const system = getSystemStatus();
  
  if (!system.isRunning) {
    return '2432.OS is not running';
  }
  
  const process = system.processes.find(p => p.pid === pid);
  if (!process) {
    return `Process ${pid} not found`;
  }
  
  // In a real implementation, this would actually kill the process
  // For now, we just return a message
  return `Process ${pid} (${process.name}) terminated`;
}

// Execute OS command
export function executeOSCommand(command: string): string {
  const parts = command.split(' ');
  const cmd = parts[0];
  const args = parts.slice(1);
  
  switch (cmd) {
    case 'os.status':
      return getOSStatus();
    case 'os.boot':
      return boot2432OS();
    case 'os.shutdown':
      return shutdown2432OS();
    case 'os.processes':
      return getOSProcesses();
    case 'os.memory':
      return getOSMemory();
    case 'os.network':
      return getOSNetwork();
    case 'os.filesystem':
    case 'os.df':
      return getOSFileSystem();
    case 'os.logs':
      const limit = args[0] ? parseInt(args[0]) : 20;
      return getOSLogs(limit);
    case 'os.users':
      return getOSUsers();
    case 'os.kill':
      if (args[0]) {
        return killOSProcess(parseInt(args[0]));
      }
      return 'Usage: os.kill <pid>';
    default:
      return `Unknown OS command: ${command}`;
  }
} 