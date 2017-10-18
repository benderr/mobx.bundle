const profileMapper = (res) => ({
  avatarId: res.data.AvatarId,
  email: res.data.Email,
  firstName: res.data.FirstName,
  gender: res.data.Gender,
  lastName: res.data.LastName,
  middleName: res.data.MiddleName,
  notifications: res.data.Notifications,
  groups: ['admin'],
});

export {
  profileMapper,
};
