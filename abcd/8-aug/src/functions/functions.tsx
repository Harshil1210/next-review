export const createUserId = async (
  initiationDate: string,
  firstName: string,
  lastName: string
) => {
  let err: string[] = [];
  if (!initiationDate) {
    err.push("Initiation Date Not Provided");
  }
  if (!firstName) {
    err.push("First Name Not Provided");
  }
  if (!lastName) {
    err.push("Last Name Not Provided");
  }
  const lletter = lastName.slice(0, 2);
  const fletter = firstName.slice(0, 2);
  const year = new Date(initiationDate).getFullYear();
  const month = new Date(initiationDate).getMonth() + 1;
  if (err.length > 0) {
    return err;
  }
  return `${year}-${fletter}-${lletter}-${month}`;
};

export const validateInitiationDate = (value: string) => {
  if (!value) {
    return "Value Not Provided";
  }
  if (
    !(
      new Date(value).getDate() &&
      new Date(value).getMonth() &&
      new Date(value).getFullYear()
    )
  ) {
    return "Given Value Is Not Valid Date";
  }
  const currentDate = new Date();
  const inputDate = new Date(value);
  const twoMonthsLater = new Date();
  twoMonthsLater.setMonth(currentDate.getMonth() - 2);

  if (inputDate < twoMonthsLater) {
    return "Initiation Date should be not be less than of last 2 month";
  }
  if (inputDate > currentDate) {
    return "Initiation Date should not be greater than today";
  }
  return true;
};

export const handleSortAsc = (users : any) => {
  const sortedUsers = [...users].sort((a: any, b: any) => {
    if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
    if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
    return 0;
  });
  return sortedUsers
};

export const handleSortDesc = (users : any) => {
   const sortedUsers = [...users].sort((a: any, b: any) => {
     if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return -1;
     if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return 1;
     return 0;
   });
   return sortedUsers;
 };
