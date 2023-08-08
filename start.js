import { hackscript } from "cryptnet/auto-hack.js";
import { rootscript } from "cryptnet/root.js";
import { copy } from "cryptnet/copy.js"; // Modified import for default export

export async function main(ns) {



  const filename = "hostnames.txt";
  const content = ns.read(filename);
  const hostnames = content.split('\n').map(hostname => hostname.trim()).filter(hostname => hostname !== '');
  const ramneeded = ns.getScriptRam("cryptnet/start.js");

  for (const hostname of hostnames) {
    const myhacklvl = ns.getHackingLevel();
    const targetHackingLevel = ns.getServerRequiredHackingLevel(hostname);
    const isStartScriptRunning = ns.scriptRunning("start.js", hostname);
    const isStartScriptFileExists = ns.fileExists("start.js", hostname);
    
    if (!ns.hasRootAccess(hostname)|| ns.getServerNumPortsRequired(hostname) > 0) {
      await rootscript(ns, hostname);
    }
    
    if (ns.hasRootAccess(hostname)) {
      if (myhacklvl >= targetHackingLevel) {
        await hackscript(ns, hostname);
      }
    }
    
    if (!isStartScriptRunning && !isStartScriptFileExists) {
      const availableram = ns.getServerMaxRam(hostname);
      if (availableram >= ramneeded) {
        await copy(ns, hostname);
      } else {
        ns.print('Not enough available RAM on ${hostname} to copy and execute.');
      }
    } else {
      ns.print('The Script is either running or already exists on host. Moving on:');
    }
  }
}
