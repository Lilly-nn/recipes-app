export const getUser = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: "Succesfully fetched",
  });
};
