export const getProfile = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: "Succesfully fetched",
  });
};

export const getUserRecipes = async (req, res) => {
  const { id: userId } = req.params;
  console.log(userId);
};
export const getLikedRecipes = () => {};
