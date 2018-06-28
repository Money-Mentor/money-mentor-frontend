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

export const transactionIconType = {
  'Car Service': 'directions-car',
  Restaurants: 'restaurant',
  'Credit Card': 'credit-card',
  'Gyms and Fitness Centers': 'fitness-center',
  Deposit: 'attach-money',
  'Airlines and Aviation Services': 'flight',
  Bicycles: 'directions-bike',
  Bar: 'local-drink',
};
