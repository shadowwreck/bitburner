/** @param {NS} ns */
import { config } from "cryptnet/config.js";
import { hostnames } from "cryptnet/functions.js";
//let log = config.log
//const logging = ns.write(log)

export async function copy(ns) {
const hostnamesArray = hostnames(ns, config);

    for (const hostname of hostnamesArray) {
        const filesExist = await checkFilesExist(ns, config.filesToCopy, hostname);
        const ramNeeded = ns.getScriptRam(config.mainscript); // This is the script ram
        const availableRam = ns.getServerMaxRam(hostname);
        const maxThreads = Math.floor(availableRam / ramNeeded);

        if (maxThreads >= 1) {
            if (!filesExist) {
                ns.print(`Copying files to ${hostname}`);
                await ns.scp(config.filesToCopy, hostname, "home");
            } else {
                ns.print(`Script is not running on ${hostname}. Executing with max threads (${maxThreads})`);
                await ns.exec(config.mainscript, hostname, maxThreads);

            }
        }
    }
}

async function checkFilesExist(ns,  hostname) {
    const filenames = config.filesToCopy
  for (const files of filenames) {
    if (!(await ns.fileExists(files))) {
        ns.tprint(`File ${files} not found on ${hostname}`);
        return false;
    }
  }
    return true;
}
