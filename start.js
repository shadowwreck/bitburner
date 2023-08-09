import { hackscript } from "cryptnet/auto-hack.js";
import { rootscript } from "cryptnet/root.js";
import { copy } from "cryptnet/copy.js"; // Modified import for default export

export async function main(ns) {
  const mainscript = "cryptnet/start.js";
  const filename = "hostnames.txt";
  const content = ns.read(filename);
  const hostnames = content.split('\n').map(hostname => hostname.trim()).filter(hostname => hostname !== '');
  const ramneeded = ns.getScriptRam(mainscript);

  for (const hostname of hostnames) {
    const myhacklvl = ns.getHackingLevel();
    const targetHackingLevel = ns.getServerRequiredHackingLevel(hostname);
    const isStartScriptRunning = ns.scriptRunning(mainscript, hostname);
    const isStartScriptFileExists = ns.fileExists(mainscript, hostname);

    // If we do not have root on the target. Run rootscript to gain root
    if (!ns.hasRootAccess(hostname)) {
      await rootscript(ns, hostname);
    }

    //If we have root on the target, and the required hack level is the same or less then ours. Hack them
    if (ns.hasRootAccess(hostname)) {
      if (myhacklvl >= targetHackingLevel) {
        await hackscript(ns, hostname);
      }
    }
    //If the script is running and/or exists on the target do the following
    if (!isStartScriptRunning && !isStartScriptFileExists) {
      const availableram = ns.getServerMaxRam(hostname);
      if (availableram >= ramneeded) {
        await copy(ns, hostname);
      } else {
        ns.print(`Not enough available RAM on: ${hostname}! to copy and execute`);
      }
    } else {
      ns.print('The Script is either running or already exists on host. Moving on:');
      ns.print('Lets ensure its not running'); 
      // All this does, is double check to make sure nothing was missed when we ran our check
     if (!isStartScriptRunning) {
      const availableram = ns.getServerMaxRam(hostname);
      if (availableram >= ramneeded) {
        await copy(ns, hostname);
      }
      }
    
    }
  }
}
