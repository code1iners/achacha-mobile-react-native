import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useWindowDimensions, Image, FlatList } from "react-native";
import * as MediaLibrary from "expo-media-library";
import HeaderRightTextButton from "../../components/headers/HeaderRightTextButton";

const Container = styled.View`
  flex: 1;
`;

const Top = styled.View`
  flex: 1;
`;
const Bottom = styled.View`
  flex: 1;
`;

const ImageContainer = styled.TouchableOpacity``;

const SelectPhotoScreen = ({ route: { params }, navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [cursor, setCursor] = useState();

  const { width: screenWidth } = useWindowDimensions();
  const numColumns = 4;

  const headerRight = () => (
    <HeaderRightTextButton text="Select" onPress={handleHeaderSelectClick} />
  );

  const getPhotos = async () => {
    const { assets, totalCount, endCursor } = await MediaLibrary.getAssetsAsync(
      {
        ...(cursor && { after: cursor }),
      }
    );

    setPhotos((previous) => [...previous, ...assets]);
    if (!selectedPhoto) {
      setSelectedPhoto(assets[0]?.uri);
    }

    setCursor(endCursor);
  };

  const getPermissions = async () => {
    const res = await MediaLibrary.getPermissionsAsync();

    getPhotos();
  };

  // Handlers.
  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo?.uri);
  };

  const handleHeaderSelectClick = () => {
    navigation.navigate("StackNavigators", {
      screen: "ProfileEditScreen",
      params: {
        selectedPhoto,
        ...params,
      },
    });
  };

  // Watch.
  useEffect(() => {
    getPermissions();
    navigation.setOptions({
      headerRight,
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [selectedPhoto]);

  const renderItem = ({ item: photo }) => {
    return (
      <ImageContainer onPress={() => handlePhotoClick(photo)}>
        <Image
          style={{
            width: screenWidth / numColumns,
            height: 100,
          }}
          source={{
            uri: photo?.uri,
          }}
        />
      </ImageContainer>
    );
  };

  return (
    <Container>
      <Top>
        {selectedPhoto ? (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: selectedPhoto }}
          />
        ) : null}
      </Top>

      <Bottom>
        <FlatList
          data={photos}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-${item.id}`}
          numColumns={numColumns}
          onEndReached={getPhotos}
          onEndReachedThreshold={0.9}
        />
      </Bottom>
    </Container>
  );
};

export default SelectPhotoScreen;
