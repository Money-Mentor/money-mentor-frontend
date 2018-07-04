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
export const personality = personalityResults => {
  let max = 0;
  let personality = '';

  for (var key in personalityResults) {
    const value = personalityResults[key];

    if (value > max) {
      max = value;
      personality = key;
    } else if (value === max) {
      personality = 'Inconclusive';
    }
  }
  return personality;
};

// Icons for all transaction categories
// prettier-ignore
export const transactionIconType = {
  'Car Service': 'directions-car',
  'Restaurants': 'restaurant',
  'Credit Card': 'credit-card',
  'Gyms and Fitness Centers': 'fitness-center',
  'Deposit': 'attach-money',
  'Airlines and Aviation Services': 'flight',
  'Bicycles': 'directions-bike',
  'Bar': 'local-drink',
  'Supermarkets and Groceries': 'local-grocery-store',
  'Coffee Shop': 'local-cafe',
  'Rent': 'remove-circle-outline',
  'Electric Bill': 'lightbulb-outline',
  'Payroll': 'add-circle-outline',
  'Department Stores': 'add-shopping-cart',
  'Clothing': 'local-mall',
  'Entertainment': 'local-movies',
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

export const getMonthDaysLeft = () => {
  let date = new Date();
  return (
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() -
    date.getDate()
  );
};

export const getDay = () => {
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date();
  return `${month[date.getMonth()]} ${date.getDate()}`;
};

// Budget Based On Personality Type
export const determineBudget = (personality, prevBudget) => {
  if (
    personality === 'Social Value Spender' ||
    personality === 'Cash Splasher'
  ) {
    return {
      ...prevBudget,
      foodAndDrink: 25,
      travel: 10,
      recreation: 10,
      healthcare: 15,
      service: 15,
      community: 15,
      shops: 10,
    };
  } else if (personality === 'Ostrich') {
    return {
      ...prevBudget,
      foodAndDrink: 30,
      travel: 10,
      recreation: 15,
      healthcare: 10,
      service: 10,
      community: 15,
      shops: 10,
    };
  } else if (personality === 'Hoarder' || personality === 'Inconclusive') {
    return {
      ...prevBudget,
      foodAndDrink: 35,
      travel: 10,
      recreation: 15,
      healthcare: 10,
      service: 10,
      community: 10,
      shops: 10,
    };
  }
};

export const MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;

export const DAYS_IN_WEEK = 7;

export const MONTH_LABELS = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

export const formatDate = date => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

export function getBeginningTimeForDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getAllDays(dateArr) {
  let start = new Date(dateArr[0]);
  let end = new Date(dateArr[dateArr.length - 1]);
  const array = [];

  while (start < end) {
    array.push(formatDate(start));
    start = new Date(start.setDate(start.getDate() + 1));
  }

  return array;
}

// obj can be a parseable string, a millisecond timestamp, or a Date object
export function convertToDate(obj) {
  return obj instanceof Date ? obj : new Date(obj);
}

export function getDaysBetween(prevDate, nextDate) {
  let days = (prevDate - nextDate) / MILLISECONDS_IN_ONE_DAY - 1;
  return days;
}

export function bestStreak(arr) {
  let bestStreak = 0;
  let daysBetween;
  for (let i = 0; i < arr.length - 1; i++) {
    daysBetween = getDaysBetween(arr[i + 1], arr[i]);
    if (daysBetween >= 1 && daysBetween > bestStreak) {
      bestStreak = daysBetween;
    }
  }

  return Math.max(bestStreak, currentStreak(arr));
}

export function currentStreak(arr) {
  let today = new Date();
  let lastDate = arr[arr.length - 1];
  let currentStreak = 0;
  let daysBetween = Math.floor(getDaysBetween(today, lastDate));
  if (daysBetween > 0) {
    currentStreak = daysBetween;
  }
  return currentStreak;
}
