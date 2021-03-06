import dbConnect from "../../../util/dbConnect";
import Account from "../../../models/Account";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const user = await Account.findById(id).select("-password");
        res.status(200).json({ status: "SUCCESS", user });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "POST":
      try {
        const updated = await Account.findByIdAndUpdate(id, {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          img: req.body.img,
        });
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "PUT":
      try {
        const updated = await Account.findByIdAndUpdate(id, {
          location: {
            city: req.body.city,
            county: req.body.county,
          },
          verified: {
            email: true,
            status: "PENDING",
            ic: req.body.ic,
            sent: new Date(),
          },
        });
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    default:
      break;
  }
}
