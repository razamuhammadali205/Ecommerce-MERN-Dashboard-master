import Transaction from "../models/Transaction.js";

export const getSales = async (req, res) => {
  try {
    const { page = 0, pageSize = 20, sort, search = "" } = req.query;

    // Parse sort object sent from frontend
    let sortParsed = {};
    if (sort) {
      sortParsed = JSON.parse(sort);
    }

    // Search by userId or other fields
    const query = search
      ? { userId: { $regex: search, $options: "i" } } // case-insensitive
      : {};

    // Fetch transactions with pagination & sorting
    const transactions = await Transaction.find(query)
      .sort(sortParsed)
      .skip(page * pageSize)
      .limit(Number(pageSize));

    // Total count for pagination
    const total = await Transaction.countDocuments(query);

    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
