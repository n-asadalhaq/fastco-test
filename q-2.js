
/**
 * Given the document is stored in `user` collection
 */
db.user.updateOne(
  {
    _id: ObjectId("64e06ceaf342fbf7f3d14587")
  },
  {
    $set: {
      email: "jane.updated@example.com"
    }
  }
)
