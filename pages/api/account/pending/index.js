import dbConnect from "../../../../util/dbConnect";
import Account from "../../../../models/Account";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "POST":
      try {
        const { city, county } = req.body;
        const pending = await Account.find({
          "verified.status": "PENDING",
          "location.county": county,
          "location.city": city,
        }).select("-password");
        res.status(200).json({ status: "SUCCESS", count: pending.length });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "PUT":
      try {
        const { city, county } = req.body;
        const pending = await Account.find({
          "verified.status": "PENDING",
          "location.county": county,
          "location.city": city,
        }).select("-password");
        res.status(200).json({ status: "SUCCESS", pending });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;
    default:
      break;
  }
}
