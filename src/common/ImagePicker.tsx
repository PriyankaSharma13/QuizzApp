import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import { useTheme } from "../theme/ThemeContext";

interface ImagePickerResponse {
  path: string;
  uri: string;
  type: string;
  mime: string;
  size: number;
}

interface Props {
  onImageSelected: (images: ImagePickerResponse[]) => void;
}

const ImagePickerComponent: React.FC<Props> = ({ onImageSelected }) => {
  const [images, setImages] = useState<ImagePickerResponse[]>([]);
  const maxSizeMB = 2;
  const maxSizeKB = maxSizeMB * 1024;
  const {theme} = useTheme();
  const compressImage = async (image: any) => {
    try {
      const compressedImage = await ImageCropPicker.openCropper({
        path: image.path,
        width: 800,
        height: 600,
        compressImageQuality: 0.6,
        mediaType: "photo",
        cropping: false,
      });
      return compressedImage;
    } catch (error) {
      console.error("Error compressing image: ", error);
      return null;
    }
  };

  const openImagePicker = async () => {
    try {
      const response = await ImageCropPicker.openPicker({
        multiple: true,
        mediaType: "photo",
        cropping: false,
      });

      const validImages: ImagePickerResponse[] = [];

      for (let image of response) {
        let imageSizeKB = image.size / 1024;
        if (imageSizeKB > maxSizeKB) {
          const compressedImage = await compressImage(image);
          if (compressedImage) {
            image = compressedImage;
            imageSizeKB = image.size / 1024;
          } else {
            Alert.alert(
              "Image too large",
              `The image ${image.path.split("/").pop()} is too large and could not be compressed.`,
              [{ text: "OK" }]
            );
            continue;
          }
        }

        if (imageSizeKB <= maxSizeKB) {
          validImages.push({
            path: image.path,
            uri: image.path,
            type: image.mime,
            mime: image.mime,
            size: image.size,
          });
        } else {
          Alert.alert(
            "Image too large",
            `The image ${image.path.split("/").pop()} exceeds the ${maxSizeMB} MB limit.`,
            [{ text: "OK" }]
          );
        }
      }

      setImages(validImages);
      onImageSelected(validImages);
    } catch (error) {
      console.error("Error picking images: ", error);
    }
  };

  return (
    <SafeAreaView  style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.innerContainer}>
        <TouchableOpacity activeOpacity={0.5} onPress={openImagePicker}>
        <Image
            source={
              images.length > 0 ? { uri: images[0].uri } : require("../assets/card/profile.png")
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: "90%",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default ImagePickerComponent;
