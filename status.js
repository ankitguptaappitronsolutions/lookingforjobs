res.status(400).json({
    status: "failed",
    data: null,
    message: "username is already registered",
  });