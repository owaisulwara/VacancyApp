import { StyleSheet,Dimensions } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const { width: viewportWidth } = Dimensions.get('window');


const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  carouselContainer: {
    minHeight: 250,
  },
  carousel: {
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 200,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250,
    borderRadius:50,
  },
});

export default styles;
