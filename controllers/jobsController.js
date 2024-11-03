export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return next("Please provide all the fields");
  }

  req.body.createdBy = req.user.userId;
  const job = await jobModels.create(req.body);
  res.status(201).json({ job });
};
