import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
  try {
    const { otheruser } = req.body;

    if (!otheruser) {
      return res.status(400).json({ success: false });
    }

    const room = await Room.create({
      users: [req.user._id, otheruser],
    });

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (err) {
    console.error("ROOM INIT ERROR:", err.message);
    res.status(500).json({ success: false });
  }
};

export const getUserRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ users: req.user._id });

    res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (err) {
    console.error("GET ROOMS ERROR:", err.message);
    res.status(500).json({ success: false });
  }
};
