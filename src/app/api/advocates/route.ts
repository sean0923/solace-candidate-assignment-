import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const params = new URLSearchParams(new URL(req.url ?? "").search);
  const searchTerm = params.get("searchTerm") ?? "";
  console.log("searchTerm: ", searchTerm);

  const filteredAdvocates = advocateData.filter((advocate) => {
    return (
      advocate.firstName.toLowerCase().includes(searchTerm) ||
      advocate.lastName.toLowerCase().includes(searchTerm) ||
      advocate.city.toLowerCase().includes(searchTerm) ||
      advocate.degree.toLowerCase().includes(searchTerm) ||
      advocate.specialties.join("").toLowerCase().includes(searchTerm) ||
      advocate.yearsOfExperience.toString().toLowerCase().includes(searchTerm)
    );
  });

  return Response.json({ data: filteredAdvocates });
}
