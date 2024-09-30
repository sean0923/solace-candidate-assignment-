export const formatPhoneNumber = (phoneNumber: number) => {
  const pn = phoneNumber.toString();
  return [pn.slice(0, 3), pn.slice(3, 6), pn.slice(6)].join("-");
};
