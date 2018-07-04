import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';
import { View, Text, ScrollView, Linking, Image } from 'react-native';
import { styles, colorTheme } from '../../common/styles';
import { articles } from '../../data';
import { shuffle } from '../../common';

class MyCarousel extends Component {
  getArticles() {
    const { user } = this.props;
    const filteredArticles = user.personalityType
      ? articles.filter(
          article => article.personality.indexOf(user.personalityType) > -1
        )
      : articles;
    return shuffle(filteredArticles);
  }

  _renderItem({ item, index }) {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        scrollEventThrottle={200}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.slide} onPress={() => Linking.openURL(item.url)}>
        <View style={styles.slidePublisher}>
        <Icon name="description" color={colorTheme.grey.light} size={14}/>
          <Text style={styles.publisherText}>{item.publisher}</Text>
        </View>
          <Text style={styles.slideText}>{item.title}</Text>
          <Text style={styles.viewArticleText} onPress={() => Linking.openURL(item.url)}>View Article</Text>
        </View>
      </ScrollView>
    );
  }

  render() {
    const articles = this.getArticles();
    return (
      <Carousel
        layout={'default'}
        ref={c => {
          this._carousel = c;
        }}
        data={articles}
        containerCustomStyle={{ flexGrow: 0 }}
        renderItem={this._renderItem}
        sliderWidth={400}
        itemHeight={90}
        itemWidth={300}
        inactiveSlideOpacity={0.3}
      />
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(MyCarousel);
