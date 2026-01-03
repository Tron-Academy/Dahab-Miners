import MiningUser from "../../../models/miningApp/MiningUser.js";
import OwnedMiner from "../../../models/miningApp/v2/OwnedMiners.js";

export const getMinerLeaderboard = async (req, res) => {
  try {
    const { userId } = req.user;
    const now = new Date();
    const leaderboard = await OwnedMiner.aggregate([
      //get only active miners
      { $match: { validity: { $gte: now } } },
      //group by user
      {
        $group: {
          _id: "$user",
          totalMiners: { $sum: "$qty" },
          totalRevenue: { $sum: "$minedRevenue" },
        },
      },
      //sort by miners first, then revenue
      { $sort: { totalMiners: -1, totalRevenue: -1 } },
      //join user data
      {
        $lookup: {
          from: "miningusers",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      //final format
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.username",
          profilePic: "$user.profilePic",

          totalMiners: 1,
          totalRevenue: 1,
        },
      },
    ]);
    const myIndex = leaderboard.findIndex(
      (u) => u.userId.toString() === userId.toString()
    );
    res.status(200).json({
      top10: leaderboard.slice(0, 10),
      myRank:
        myIndex !== -1
          ? {
              position: myIndex + 1,
              totalUsers: leaderboard.length,
              totalMiners: leaderboard[myIndex].totalMiners,
              totalRevenue: leaderboard[myIndex].totalRevenue,
            }
          : null,
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || error.msg });
  }
};

export const getHashrateLeaderboard = async (req, res) => {
  try {
    const { userId } = req.user;
    const now = new Date();
    const leaderboard = await OwnedMiner.aggregate([
      //active miners
      { $match: { validity: { $gte: now } } },
      //joining product to get hashrate
      {
        $lookup: {
          from: "miningproducts",
          localField: "itemId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      //calculate hashrate per batch
      {
        $addFields: {
          effectiveHashrate: {
            $multiply: ["$qty", "$product.hashRate"],
          },
        },
      },
      //group by user
      {
        $group: {
          _id: "$user",
          totalHashrate: { $sum: "$effectiveHashrate" },
          totalRevenue: { $sum: "$minedRevenue" },
        },
      },
      // 5️⃣ sort: hashrate first, revenue as tiebreaker
      {
        $sort: {
          totalHashrate: -1,
          totalRevenue: -1,
        },
      },

      // 6️⃣ join user details
      {
        $lookup: {
          from: "miningusers",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      // 7️⃣ final projection
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.username",
          profilePic: "$user.profilePic",
          totalHashrate: 1,
          totalRevenue: 1,
        },
      },
    ]);
    const myIndex = leaderboard.findIndex(
      (u) => u.userId.toString() === userId.toString()
    );

    res.status(200).json({
      top10: leaderboard.slice(0, 10),
      myRank:
        myIndex !== -1
          ? {
              position: myIndex + 1,
              totalUsers: leaderboard.length,
              totalHashrate: leaderboard[myIndex].totalHashrate,
              totalRevenue: leaderboard[myIndex].totalRevenue,
            }
          : null,
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || error.msg });
  }
};

export const getBTCleaderboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    const leaderboard = await MiningUser.aggregate([
      // 1️⃣ only users who own at least one miner
      {
        $match: {
          "ownedMiners.0": { $exists: true },
        },
      },

      // 2️⃣ sort by mined revenue
      {
        $sort: {
          minedRevenue: -1,
        },
      },

      // 3️⃣ select only needed fields
      {
        $project: {
          _id: 1,
          username: 1,
          profilePic: 1,
          minedRevenue: 1,
        },
      },
    ]);

    // 4️⃣ find logged-in user rank
    const myIndex = leaderboard.findIndex(
      (u) => u._id.toString() === userId.toString()
    );

    res.status(200).json({
      top10: leaderboard.slice(0, 10),
      myRank:
        myIndex !== -1
          ? {
              position: myIndex + 1,
              totalUsers: leaderboard.length,
              minedRevenue: leaderboard[myIndex].minedRevenue,
            }
          : null,
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || error.msg });
  }
};
