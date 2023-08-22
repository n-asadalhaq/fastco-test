db.user.find({ status: "inactive"})

db.user.deleteMany({ status: "inactive" })

db.user.find({ status: "inactive"})
