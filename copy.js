/** @param {NS} ns */
export async function copy(ns, hostname) {
  const filesToCopy = ["cryptnet/root.js", "cryptnet/auto-hack.js", "cryptnet/start.js", "cryptnet/copy.js", "hostnames.txt"];
  const mainscript = "cryptnet/start.js";

//    const isStartScriptRunning = ns.scriptRunning(mainscript, hostname);
//    const isStartScriptFileExists = ns.fileExists(mainscript, hostname);


  let scriptExists = false;
  let existingFilesCount = 0;

  // Check if each file exists and copy it individually
  for (const file of filesToCopy) {
    const fileExists = await ns.fileExists(file);
    if (fileExists) {
      existingFilesCount++;
       ns.scp(file, hostname, "home"); // Copy each file individually
      if (existingFilesCount === 5) {
        scriptExists = true;
        break;
      }
    }
  }

  if (!ns.scriptRunning(mainscript, hostname)) {
    if (scriptExists) {
      const ramNeeded = ns.getScriptRam(mainscript);
      const availableRam = ns.getServerMaxRam(hostname);
      const maxThreads = Math.floor(availableRam / ramNeeded);

      if (maxThreads >= 1) {
        ns.print(`Script is not running on ${hostname}. Executing with max threads (${maxThreads})`);
        ns.exec(mainscript, hostname, maxThreads);
      }
    }
  }

  if (!scriptExists) {
    ns.print("Let us ensure the scripts are copied");
    ns.scp(filesToCopy, hostname);
    ns.print("Scripts copied.");
  }
}
