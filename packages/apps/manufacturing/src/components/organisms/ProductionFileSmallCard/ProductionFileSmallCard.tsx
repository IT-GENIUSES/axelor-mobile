import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {AOSImage} from '@aos-mobile/core';
import {useThemeColor} from '@aos-mobile/ui';

interface ProductionFileSmallCardProps {
  imageId?: number;
  description: string;
}

function ProductionFileSmallCard({
  imageId,
  description,
}: ProductionFileSmallCardProps) {
  const Colors = useThemeColor();

  const source = {
    html: `${description}`,
  };

  return (
    <View style={styles.container}>
      <AOSImage
        metaFileId={imageId}
        defaultIconSize={Dimensions.get('window').width * 0.25}
        imageSize={styles.imageStyle}
        resizeMode="contain"
      />
      <View style={styles.description}>
        <RenderHTML
          source={source}
          contentWidth={Dimensions.get('window').width * 0.7}
          baseStyle={{color: Colors.text}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  imageStyle: {
    width: Dimensions.get('window').width * 0.25,
    height: Dimensions.get('window').width * 0.25,
  },
  description: {
    padding: 10,
    maxHeight: Dimensions.get('window').height * 0.12,
    maxWidth: Dimensions.get('window').width * 0.7,
  },
});

export default ProductionFileSmallCard;
