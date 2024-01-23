import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { storage } from '../configs/firebase';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Upload image to Firebase Storage
      const response = await firebaseImg(result.assets[0]);
      setImage(response);
    }
  };

  const firebaseImg = async (image) => {
    if (image) {
      const imageRef = ref(storage, `images/${image.fileName}`);
      // Upload image to Firebase Storage
      await uploadBytes(imageRef, image);
      // Get the download URL of the image
      const imageUrl = await getDownloadURL(imageRef);
      console.log('Image URL:', imageUrl);
      return imageUrl;
    }
    return null;
  };

  console.log('Image:', image);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
