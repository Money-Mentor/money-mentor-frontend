const personality = personalityResults => {
  let max = 0;
  let personality = '';

  for (var key in personalityResults) {
    const value = personalityResults[key];

    if (value > max) {
      max = value;
      personality = key;
    } else if (value === max) {
      return "Inconclusive";
    }
  }
  return key;
};

