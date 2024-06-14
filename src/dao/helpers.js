export const buildConnString = (protocol, user, pwd, url, db, args) => {
  return `${protocol}://${user}:${pwd}@${url}/${db}?${args}`;
};
