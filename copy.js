/** @param {NS} ns */
export async function copy(ns, hostname) {
  const filesToCopy = ["cryptnet/root.js", "cryptnet/auto-hack.js", "cryptnet/start.js", "cryptnet/copy.js"];
  const mainscript = "cryptnet/start.js";

  let scriptExists = false;

  for (const file of filesToCopy) {
    const fileExists = await ns.fileExists(file);
    if (fileExists) {
      scriptExists = true;
      break; // Exit the loop if at least one script exists
    }
  }

  if (scriptExists) {
    ns.print("!Script exists on target. Executing");
    if (!ns.scriptRunning(mainscript, hostname)) {
      ns.print("Script is not running on target. Executing");
      await ns.exec(mainscript, hostname);
    }
  } else {
    ns.print(`Scripts do not exist on target ${hostname}! Copying Scripts`);

    for (const file of filesToCopy) {
      await ns.scp(file, hostname, "home"); // Copy files from home to hostname
    }
    if (!ns.scriptRunning(mainscript, hostname)) {
      ns.print("Script is not running on target. Executing");
      await ns.exec(mainscript, hostname);
    }
  }

  const ramNeeded = ns.getScriptRam(mainscript);
  const availableRam = ns.getServerMaxRam(hostname);
  const maxThreads = Math.floor(availableRam / ramNeeded);

  if (maxThreads >= 1) {
    ns.print(`Running script with max threads (${maxThreads}) on ${hostname}`);
    await ns.exec(mainscript, hostname, maxThreads);
  }
}
