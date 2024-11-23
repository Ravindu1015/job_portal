export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return next("Please provide all the fields");
  }

  req.body.createdBy = req.user.userId;
  const job = await jobModels.create(req.body);
  res.status(201).json({ job });
};

export default getAllJobsController = async (req, res, next) => {
  const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};

//update jobs
export const updateJobController = async (req, res, next) => {
  const { jobId } = req.params;
  const { company, position } = req.body;
  if (!company || !position) {
    return next("Please provide all the fields");
  }

  const job = await jobModels.findByIdAndUpdate(
    jobId,
    { company, position },
    { new: true }
  );
  res.status(200).json({ job });
};
