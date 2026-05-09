export default async function handler(req, res) {
  // placeholder sync trigger
  console.log("SIS sync started");

  res.json({
    status: "started"
  });
}
