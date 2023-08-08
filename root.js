/** @param {NS} ns */
export async function rootscript(ns, hostname) {
  await ns.brutessh(hostname);
  await ns.sqlinject(hostname);
  await ns.relaysmtp(hostname);
  await ns.httpworm(hostname);
  await ns.ftpcrack(hostname);
  await ns.nuke(hostname);
    ns.print(`<span style="color: green">We have obtain root on ${hostname}`);
}
