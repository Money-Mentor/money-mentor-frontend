export const questions = [
  {
    id: 1,
    question: 'I am very generous with the people I love.',
    personality: 'Social Value Spender',
  },
  {
    id: 2,
    question:
      'When it comes to spending money on myself, I do so “because I am worth it”.',
    personality: 'Social Value Spender',
  },
  {
    id: 3,
    question:
      'I buy new outfits for special occasions so that I will be dressed appropriately.',
    personality: 'Social Value Spender',
  },
  {
    id: 4,
    question: 'Having a lot of money is a sign of success.',
    personality: 'Cash Splasher',
  },
  {
    id: 5,
    question: 'I admit that I buy things to impress others.',
    personality: 'Cash Splasher',
  },
  {
    id: 6,
    question: 'You get respect from others when you have lots of money.',
    personality: 'Cash Splasher',
  },
  {
    id: 7,
    question: 'I feel safe and secure if I have a lot of money saved.',
    personality: 'Hoarder',
  },
  {
    id: 8,
    question:
      'I prefer to be safe rather than a gambler when it comes to money.',
    personality: 'Hoarder',
  },
  {
    id: 9,
    question: 'I value having a lot of easy-to-access money in the bank.',
    personality: 'Hoarder',
  },
  {
    id: 10,
    question: 'I dither a lot over money decisions.',
    personality: 'Ostrich',
  },
  {
    id: 11,
    question: 'I really am not interested in money matters.',
    personality: 'Ostrich',
  },
  {
    id: 12,
    question:
      'I prefer to let others I trust make important money decisions for me.',
    personality: 'Ostrich',
  },
];

export const personalityTypes = [
  {
    name: 'Hoarder',
    imageUrl:
      'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2Ff826a4a8-d80a-11e6-944b-e7eb37a6aa8e?source=next&fit=scale-down&width=700',
    description: `For hoarders, money represents security.They abhor risk and may even stockpile cash that they would probably be better off investing — or even spending.
    Everyone needs a rainy day fund, but cash is not a suitable long - term investment(even more so at a time of rising inflation).Find an adviser you feel comfortable with who can discuss the right investment approach — and level of risk — for you.`,
  },
  {
    name: 'Cash Splasher',
    imageUrl:
      'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2Fe663282c-d80a-11e6-944b-e7eb37a6aa8e?source=next&fit=scale-down&width=700',
    description: `A close cousin of the social value spender, the “splasher” is more likely to be male and tends to spend money on others very visibly, Ms Hammond says. For example, they may declare at the beginning of a meal in a restaurant that they are going to cover the bill. The occasion is then “all about them, and how nice and generous they are,” she says, noting this is “entirely different to going up and paying for something quietly.”
    People who recognise these traits should realise that “spending does not make you happier if it is being done to show off”, says Ms Hammond.
    True contentment, she adds, can be achieved by spending money on experiences one intrinsically enjoys — and they do not have to be expensive. Take your children for a picnic, listen to grandma tell her stories, or cook your friends a meal. “The motivation should be the connection with others, and not what doing a certain thing will look like on social media,” she says.`,
  },
  {
    name: 'Social Value Spender',
    imageUrl:
      'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2F588d20f4-d817-11e6-944b-e7eb37a6aa8e?source=next&fit=scale-down&width=700',
    description: ` Does shopping make you happy? Do you frequently buy your loved ones presents “just because” and blow the budget at Christmas and birthdays? You could be a social value spender, which the Money and Mental Health Policy Institute defines as someone who makes purchases (either for themselves or others) to boost their self-esteem.
    With consumer debt at record levels, if you are concerned about your spending and borrowing habits you need to study your bills — perhaps with the support of a close friend. Work out how much you are spending on impulse, and the interest on any debts. Switch to a zero-rate deal and work out how much you need to pay a month to clear the balance within the offer period, then budget accordingly.`,
  },
  {
    name: 'Ostrich',
    imageUrl:
      'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2F0a5e4c5c-d80b-11e6-944b-e7eb37a6aa8e?source=next&fit=scale-down&width=700',
    description: `The Ostrich — someone who would rather bury their head in the sand than organise their finances. Piles of post lie unopened on the doormat, and they seldom open their bank statements. Older birds may have money, but consistently fail to make long-term investment decisions.
    Motivate yourself by putting your saving towards a reward, such as a holiday. As you become more confident, consider approaching a financial planner to discuss longer term investments and pensions.`,
  },
];

const personality = [
  'Social Value Spender',
  'Cash Splasher',
  'Ostrich',
  'Hoarder',
];
export const articles = [
  {
    name: '3 Alternative Budgeting Styles: Which One Suits You?',
    url:
      'https://www.investopedia.com/articles/pf/09/alternative-budgeting-styles.asp',
    personality: ['Social Value Spender', 'Cash Splasher', 'Ostrich'],
  },
  {
    name: 'When is it okay to splurge?',
    url:
      'http://money.cnn.com/2018/06/21/pf/how-much-afford-splurge/index.html?iid=SF_LN',
    personality: ['Social Value Spender', 'Cash Splasher'],
  },
  {
    name: 'Money is more stressful than politics for Millennials',
    url:
      'http://money.cnn.com/2018/06/27/pf/money-stress/index.html?iid=ob_article_footer_adblock',
    personality: ['Ostrich'],
  },
  {
    name: 'Should I pay off my debt or save for emergencies first?',
    url:
      'http://money.cnn.com/2018/06/07/pf/pay-off-debt-or-emergency-fund/index.html?iid=ob_article_footer_adblock',
    personality: ['Ostrich', 'Social Value Spender', 'Cash Splasher'],
  },
  {
    name: '5-minute moves to make you feel more financially secure',
    url:
      'http://money.cnn.com/2018/05/08/pf/regain-control-finances/index.html?iid=EL',
    personality: ['Social Value Spender', 'Cash Splasher'],
  },
  {
    name: 'Why You Should Have an Emergency Fund',
    url:
      'https://www.investopedia.com/advisor-network/articles/why-you-should-have-emergency-fund/',
    personality: ['Social Value Spender', 'Cash Splasher'],
  },

  {
    name: '5 Ways to Control Emotional Spending',
    url: 'https://www.investopedia.com/articles/pf/08/emotional-spending.asp',
    personality: ['Social Value Spender', 'Cash Splasher'],
  },
  {
    name: 'Get Organized and Clean Up Your Finances',
    url:
      'https://www.smartaboutmoney.org/Topics/Holidays-and-Money/Save-Money-This-Summer/Get-Organized-and-Clean-Up-Your-Finances',
    personality: ['Ostrich'],
  },
  {
    name: '8 Steps To An Organized Financial Life',
    url:
      'https://www.investopedia.com/articles/pf/10/8-tips-organize-finances.asp',
    personality: ['Ostrich'],
  },
  {
    name: 'Make Financial Wellness Part of Your Life Plan',
    url:
      'https://www.investopedia.com/advisor-network/articles/make-financial-wellness-part-your-life-plan/',
    personality: [
      'Social Value Spender',
      'Cash Splasher',
      'Ostrich',
      'Hoarder',
    ],
  },
  {
    name: 'How to Start Investing: A Guide for Beginners',
    url: 'https://www.nerdwallet.com/blog/investing/how-to-start-investing/',
    personality: ['Hoarder'],
  },
  {
    name: '5 Easy Ways To Start Investing With Little Money',
    url: 'https://www.moneyunder30.com/start-investing-with-little-money',
    personality: ['Social Value Spender', 'Cash Splasher'],
  },
  {
    name: 'How to start investing',
    url:
      'https://www.fidelity.com/viewpoints/personal-finance/how-to-start-investing',
    personality: ['Hoarder'],
  },
  {
    name: 'Why Does Buying Stuff Make Us Feel Better?',
    url:
      'https://www.foxbusiness.com/features/why-does-buying-stuff-make-us-feel-better',
    personality: ['Cash Splasher'],
  },
  {
    name: '8 Reasons Why People Love Spending Money On What They Don’t Need',
    url:
      'https://www.aegisorganization.com/single-post/Reasons-Why-People-Love-Spending-Money-On-What-They-Dont-Need',
    personality: ['Cash Splasher'],
  },
  {
    name: 'Why You Should Stop Spending Money to Impress People',
    url:
      'https://www.thesimpledollar.com/stop-spending-money-to-impress-people/',
    personality: ['Cash Splasher'],
  },
  {
    name: 'The Secret to Happiness? Spend Money on Experiences, Not Things',
    url:
      'https://www.forbes.com/sites/ilyapozin/2016/03/03/the-secret-to-happiness-spend-money-on-experiences-not-things/2/#5e328ea93557',
    personality: ['Cash Splasher'],
  },
  {
    name: '10 Reasons Why People Spend Too Much',
    url:
      'https://www.psychologytoday.com/us/blog/science-choice/201801/10-reasons-why-people-spend-too-much',
    personality: ['Social Value Spender'],
  },
  {
    name: 'Stop Overspending on These 15 Things',
    url:
      'https://www.moneytalksnews.com/10-things-spend-too-much-and-cheaper-alternatives/',
    personality: ['Social Value Spender'],
    imageUrl: 'https://mtn-s3.imgix.net/wp-content/uploads/diamond.jpg?auto=format%2Ccompress%2Cenhance&ixlib=php-1.1.0&w=330&s=7a44f2ea76e22d5038581079e98538e9'
  },
];
