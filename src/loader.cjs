async function loadApp() {
  // import and connect db
  const db = await import("./config/db.mjs");

  await db.default();

  await import("./server.mjs");
}

loadApp();
