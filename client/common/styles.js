import { StyleSheet } from 'react-native';

const colorTheme = {
  orange: {
    light: '#f2dfd7',
    medium: '#f19A6A',
    dark: '#c4805a',
  },
  blue: {
    light: '#d8dbe2',
    medium: '#c2d3da',
    dark: '#7ca5b8',
  },
  white: {
    snow: '#f1f3f2',
  },
  grey: {
    dark: '#585A56',
  },
};

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C2D3DA',
  },
  logoLocation: {
    position: 'absolute',
    top: -500,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkLogoLocation: {
    position: 'absolute',
    top: -200,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homePageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorTheme.blue.medium,
  },
  button: {
    backgroundColor: colorTheme.blue.dark,
    borderRadius: 10,
    width: '100%',
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    borderWidth: 8,
    borderColor: colorTheme.white.snow,
    overflow: 'hidden',
    backgroundColor: colorTheme.orange.dark,
  },
  circleLine: {
    borderBottomColor: colorTheme.white.snow,
    borderBottomWidth: 2,
  },
  circleFill: {
    backgroundColor: colorTheme.orange.medium,
    width: '100%',
    bottom: 0,
    position: 'absolute',
  },
  cirleBigText: {
    color: colorTheme.white.snow,
    fontWeight: 'bold',
    position: 'absolute',
    zIndex: 2,
    top: '37%',
    fontSize: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cirleSmallText: {
    color: colorTheme.white.snow,
    fontWeight: 'bold',
    position: 'absolute',
    zIndex: 2,
    top: '43%',
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colorTheme.white.snow,
    fontWeight: 'bold',
    position: 'absolute',
  },
  questionContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#C2D3DA',
  },
  questionText: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#585A56',
    fontWeight: 'bold',
    fontSize: 20,
    width: '80%',
  },
  questionButton: {
    width: 150,
    marginVertical: 10,
    paddingVertical: 13,
    alignSelf: 'center',
  },
  slider: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  sliderTextAlign: {
    flexDirection: 'row',
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'space-between',
  },
  sliderSmallText: {
    alignSelf: 'center',
    color: colorTheme.grey.dark,
    fontWeight: 'bold',
    fontSize: 12,
  },
  dateText: {
    color: colorTheme.grey.dark,
    fontWeight: 'bold',
    position: 'absolute',
  },
  smallerText: {
    alignSelf: 'center',
    color: colorTheme.grey.dark,
    fontWeight: 'bold',
  },
  homePagesmallTextAlign: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-around',
  },
  homePageSmallText: {
    alignSelf: 'center',
    color: colorTheme.grey.dark,
    fontWeight: 'bold',
    fontSize: 18,
  },
  homePageSmallestText: {
    alignSelf: 'center',
    color: colorTheme.grey.dark,
    fontWeight: 'bold',
    fontSize: 12,
  },
  budgetSetupText: {
    color: colorTheme.grey.dark,
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 10,
    width: '80%',
  },
  budgetStatus: {
    fontWeight: 'bold',
    color: colorTheme.grey.dark,
    fontSize: 18,
    position: 'absolute',
    top: 125,
  },
  initialScreenText: {
    alignSelf: 'center',
    color: '#585A56',
    fontWeight: 'bold',
    fontSize: 20,
  },
  formInput: {
    height: 60,
    borderColor: '#92B1BD',
    borderWidth: 2,
    borderRadius: 15,
    width: '100%',
  },
  accountOverviewContainer: {
    flexGrow: 1,
    backgroundColor: '#C2D3DA',
  }
});
