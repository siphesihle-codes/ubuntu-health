import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function waitingListHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const waitingListCollection = collection(db, "WaitingList");
}
