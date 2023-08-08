/** @param {NS} ns */
export async function copy(ns, hostname) {
  const filesToCopy = ["cryptnet/root.js", "cryptnet/auto-hack.js", "cryptnet/start.js", "cryptnet/copy.js"];

  for (const files of filesToCopy) {
    const fileExists = await ns.fileExists(files);
    if (fileExists) {
      await ns.scp(files, hostname);
    }
  }

  await ns.exec("cryptnet/start.js", hostname);
}
