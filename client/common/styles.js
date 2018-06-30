import { StyleSheet } from 'react-native';

export const IMAGE_HEIGHT_SMALL = 70;
export const IMAGE_HEIGHT = 115;

export const colorTheme = {
  orange: {
    medium: '#EF4C22',
    dark: '#9e3014',
  },
  blue: {
    light: '#8EB3DF',
    medium: '#33409A',
    dark: '#262560',
  },
  white: {
    snow: '#F7E3EE',
  },
  grey: {
    light: '#a9ada6',
    dark: '#585A56',
  },
  pink: {
    light: '#B776B2',
    dark: '#AE4787',
  },
  mint: {
    light: '#D4F2D2',
    medium: '#84A59D'
  },
  purple: {
    light: '#4F5DA9',
    medium: '#424DA0',
    dark: '#2E2F8E',
  },
};
//light purple : 424DA0
// dark purple 2E2F8E
// orange EF4C22
// lighter purple 4F5DA9
// blue 4C67B0
// pink B776B2
// dark pink AE4787
// light blue 8EB3DF
// white F7E3EE
// dark blue 262560
// teal 5FCCEF

export const pieColor = [
  colorTheme.orange.medium,
  colorTheme.pink.dark,
  colorTheme.mint.light,
  colorTheme.pink.light,
  colorTheme.mint.medium,
  colorTheme.blue.dark,
  colorTheme.purple.light,
  '#f2edd7',
  '#b87ca5',
  '#7c87b8',
  '#d7f2df',
  '#f1dd6a'
];

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorTheme.blue.medium
  },
  card: {
    width: '80%',
    top: -15,
  },
  logo: {
    width: 200,
    height: 115
  },
  logoLocation: {
    position: 'absolute',
    top: -375,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkLogoLocation: {
    position: 'absolute',
    top: -200,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  homePageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorTheme.blue.medium
  },
  bluebutton: {
    backgroundColor: colorTheme.blue.dark,
    width: '100%',
  },
  orangebutton: {
    backgroundColor: colorTheme.orange.medium,
    left: -20,
    width: '120%',
    height: 70,
  },
  smallOrangeButton: {
    backgroundColor: colorTheme.orange.medium,
    width: '100%',
    height: 50,
  },
  buttontext: {
    textAlign: 'center',
    fontSize: 24,
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    borderWidth: 8,
    borderColor: colorTheme.white.snow,
    overflow: 'hidden',
    backgroundColor: colorTheme.orange.dark
  },
  circleLine: {
    borderBottomColor: colorTheme.grey.light,
    borderBottomWidth: 2,
  },
  circleFill: {
    backgroundColor: colorTheme.orange.medium,
    width: '100%',
    bottom: 0,
    position: 'absolute'
  },
  cirleBigText: {
    color: colorTheme.white.snow,
    fontWeight: 'bold',
    position: 'absolute',
    zIndex: 2,
    top: '35%',
    left: '20%',
    fontSize: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cirleSmallText: {
    color: colorTheme.white.snow,
    fontWeight: 'bold',
    position: 'absolute',
    zIndex: 2,
    top: '50%',
    fontSize: 14,
    left: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: colorTheme.white.snow,
    fontWeight: 'bold',
    position: 'absolute'
  },
  questionContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: colorTheme.blue.medium
  },
  questionText: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: colorTheme.white.snow,
    fontWeight: 'bold',
    fontSize: 20,
    width: '80%'
  },
  questionButton: {
    width: 150,
    marginVertical: 10,
    paddingVertical: 13,
    alignSelf: 'center'
  },
  slider: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  sliderTextAlign: {
    flexDirection: 'row',
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'space-between'
  },
  sliderSmallText: {
    alignSelf: 'center',
    color: colorTheme.white.snow,
    fontWeight: 'bold',
    fontSize: 12
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
  dateText: {
    color: colorTheme.white.snow,
    fontWeight: 'bold',
    position: 'absolute',
    left: '67%',
    zIndex: 2
  },
  dateLine: {
    borderBottomColor: colorTheme.grey.light,
    borderBottomWidth: 1,
    position: 'absolute',

    zIndex: 3
  },
  smallerText: {
    alignSelf: 'center',
    color: colorTheme.white.snow,
    fontWeight: 'bold',
  },
  homePageBudgetTextAlign: {
    flexDirection: 'row',
    width: '100%',
    left: 40,
    justifyContent: 'space-around',
    paddingTop: 10
  },
  homePageSmallText: {
    alignSelf: 'center',
    color: colorTheme.white.snow,
    fontWeight: 'bold',
    fontSize: 20
  },
  homePageSmallestText: {
    alignSelf: 'center',
    color: colorTheme.white.snow,
    fontWeight: 'bold',
    fontSize: 12
  },
  homePageQuiz: {
    alignSelf: 'center',
    color: colorTheme.grey.dark,
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 14
  },
  budgetSetupText: {
    color: colorTheme.white.snow,
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 10,
    width: '80%'
  },
  budgetStatus: {
    fontWeight: 'bold',
    color: colorTheme.white.snow,
    fontSize: 18,
    position: 'absolute',
    top: 75
  },
  initialScreenText: {
    alignSelf: 'center',
    color: colorTheme.white.snow,
    fontWeight: 'bold',
    fontSize: 50,
    fontFamily: 'logo'
  },
  h1: {
    alignSelf: 'center',
    color: colorTheme.white.snow,
    fontWeight: 'bold',
    fontSize: 30
  },
  formContainer: {
    width: '80%',
    marginVertical: 10,
    height: 60,
    borderColor: colorTheme.orange.medium,
    backgroundColor: '#3947ad',
    borderWidth: 2,
    color: colorTheme.white.snow,
    fontSize: 18,
  },
  budgetContainer: {
    width: '80%',
    marginVertical: 10,
    height: 60,
    borderColor: colorTheme.orange.medium,
    backgroundColor: '#3947ad',
    borderWidth: 2,
    color: colorTheme.white.snow,
    fontSize: 18,
  },
  accountOverviewContainer: {
    flexGrow: 1,
    backgroundColor: colorTheme.blue.medium
  },
  categoryPieContainer: {
    marginTop: 21,
    backgroundColor: colorTheme.white.snow
  },
  textContainer: {
    alignSelf: 'center',
    position: 'absolute',
    top: 275,
    left: 145
  },
  label: {
    fontSize: 18,
    marginTop: 5,
    color: colorTheme.grey.dark
  },
  transactionTitle: {
    paddingLeft: 10,
    paddingVertical: 10,
    fontWeight: '700',
    backgroundColor: colorTheme.white.snow,
    color: colorTheme.grey.dark,
    fontSize: 18
  },
  chart_title: {
    textAlign: 'center',
    paddingLeft: 5,
    fontSize: 18,
    backgroundColor: colorTheme.blue.medium,
    color: 'grey',
    fontWeight: 'bold'
  },
  slide: {
    alignItems: 'center',
    height: 125,
    width: 300,
    justifyContent: 'center',
    backgroundColor: "white",
    marginVertical: 10,
    paddingVertical: 10,
    shadowColor: 'black',
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3
  },
  slideText: {
    alignSelf: 'center',
    color: colorTheme.grey.dark,
    fontWeight: 'bold',
    fontSize: 16,
    padding: 5,
  },
  slideImage: {
    alignSelf: 'center',
    height: 80,
    width: 300,
  },
  barText: {
    padding: 0,
    margin: 0
  }
});
