export async function hackscript(ns, hostname) {
  const moneyBeforeHack = ns.getServerMoneyAvailable(hostname);
  ns.write("moneybefore.txt", moneyBeforeHack.toString());
  await ns.hack(hostname);
  const moneyAfterHack = ns.getServerMoneyAvailable(hostname);
  ns.write("moneyafter.txt", moneyAfterHack.toString());

  const before = parseFloat(ns.read("moneybefore.txt"));
  const after = parseFloat(ns.read("moneyafter.txt"));
  const hackSuccess = after > before;
  if (hackSuccess) {
    ns.print(`We have gained money from ${hostname}`);
  } else {
    ns.print('Incase of draining the targets money, we will now grow and move on')
    await ns.grow(hostname);
  }
}
