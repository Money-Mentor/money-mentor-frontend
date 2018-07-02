// Shuffle for Quiz Questions
export const shuffle = arr => {
  let r = [...arr];
  for (let i = 0; i < r.length; i++) {
    const j = i + Math.floor(Math.random() * (r.length - i));
    const temp = r[i];
    r[i] = r[j];
    r[j] = temp;
  }
  return r;
};

// Icons for all transaction categories
export const transactionIconType = {
  'Car Service': 'directions-car',
  Restaurants: 'restaurant',
  'Credit Card': 'credit-card',
  'Gyms and Fitness Centers': 'fitness-center',
  Deposit: 'attach-money',
  'Airlines and Aviation Services': 'flight',
  Bicycles: 'directions-bike',
  Bar: 'local-drink',
  'Supermarkets and Groceries': 'local-grocery-store',
  'Coffee Shop': 'local-cafe',
  Rent: "remove-circle-outline",
  'Electric Bill': 'lightbulb-outline',
  Payroll: "add-circle-outline",
  'Department Stores': 'add-shopping-cart',
  Clothing: 'local-mall',
  Entertainment: 'local-movies',
};

// Start Date String: returns the start of the current month.
// Example: '2018-05-01'
export const startDateString = () => {
  const date = new Date();

  const formatMonth = month => {
    month++;
    return month < 10 ? '0' + month : month;
  };
  let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  return `${startDate.getFullYear()}-${formatMonth(startDate.getMonth())}-01`;
};
