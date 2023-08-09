/** @param {NS} ns */
export async function copy(ns, hostname) {
  const filesToCopy = ["cryptnet/root.js", "cryptnet/auto-hack.js", "cryptnet/start.js", "cryptnet/copy.js", "hostnames.txt"];
  const mainscript = "cryptnet/start.js";

  let scriptExists = false;
  // Check if all four files exist
  let existingFilesCount = 0;
  for (const file of filesToCopy) {
    const fileExists = await ns.fileExists(file);
    if (fileExists) {
      existingFilesCount++;
      if (existingFilesCount === 4) {
        scriptExists = true;
        break;
      }
    }
  }

  if (scriptExists) {
    if (!ns.scriptRunning(mainscript, hostname)) {
      const ramNeeded = ns.getScriptRam(mainscript);
      const availableRam = ns.getServerMaxRam(hostname);
      const maxThreads = Math.floor(availableRam / ramNeeded);

      if (maxThreads >= 1) {
        ns.print(`Script is not running on ${hostname}. Executing with max threads (${maxThreads})`);
        ns.scp(filesToCopy, hostname);
        ns.exec(mainscript, hostname, maxThreads);
      }
    }
  } else {
    ns.print("Let us ensure the scripts are copied");
    ns.scp(filesToCopy, hostname);
    ns.print("Scripts copied.");
  }
}
