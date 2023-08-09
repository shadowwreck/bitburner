export async function hackscript(ns, hostname) {

  const purchased = ns.getPurchasedServers();
  ns.write("purchasedservers.txt", purchased.join('\n'));
  const blacklist = ["home", ...purchased]; // Add "home" and purchased servers to blacklist

  // Check if the hostname is in the blacklist
  if (blacklist.includes(hostname)) {
    ns.print(`Skipping blacklisted server: ${hostname}`);
    return;
  }

  const moneyBeforeHack = ns.getServerMoneyAvailable(hostname);
  ns.write("moneybefore.txt", moneyBeforeHack.toString());
  await ns.hack(hostname);
  const moneyAfterHack = ns.getServerMoneyAvailable(hostname);
  ns.write("moneyafter.txt", moneyAfterHack.toString());

  const before = parseFloat(ns.read("moneybefore.txt"));
  const after = parseFloat(ns.read("moneyafter.txt"));
  const hackSuccess = after < before;
  if (hackSuccess) {
    ns.print(`!We have gained money from: ${hostname}! Growing target`);
    await ns.grow(hostname);
  } else {
    ns.print('!We did not hack, we gained no money. Weaken target!');
    await ns.weaken(hostname);
  }
}
