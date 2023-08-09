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

    if (!ns.hasRootAccess(hostname)) {
      await rootscript(ns, hostname);
    } else {
      const availableram = ns.getServerMaxRam(hostname);
      if (availableram >= ramneeded) {
        await copy(ns, hostname);
        if (myhacklvl >= targetHackingLevel) {
          await hackscript(ns, hostname);
        }
      }
    }
  }
}
