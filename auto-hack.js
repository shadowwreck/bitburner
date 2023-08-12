export async function hackscript(ns, hostname) {
    console.log("hackscript - hacking:", hostname);
    await ns.hack(hostname);
    await ns.sleep(1000); // Optional sleep if needed
  }
