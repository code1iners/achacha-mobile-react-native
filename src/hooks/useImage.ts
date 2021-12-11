import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";
import {
  launchImageLibrary,
  Asset,
  ImageLibraryOptions,
  Callback,
} from "react-native-image-picker";
// import { CameraOptions, ImageLibraryOptions, Callback, ImagePickerResponse } from './types';

export const GRANTED: string = "granted";
export const DENIED: string = "denied";
export const NEVER_ASK_AGAIN: string = "never_ask_again";

interface UseImageInterface {
  checkPermission: Function;
  selectImage: Function;
  openSetting: Function;
}

/**
 * ### Helper function which getting Image resource in device.
 * @returns [checkPermission, selectImage, openSetting]
 */
const useImage = (): UseImageInterface => {
  /**
   * ### Check device read external storage permission.
   * @returns is granted.
   */
  const checkPermission = async (): Promise<string | null> => {
    try {
      switch (Platform.OS) {
        case "android":
          return PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: "Need Storage Permission",
              message: "Achacha needs access permission to your gallery",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );

        case "ios":
          return GRANTED;

        default:
          return GRANTED;
      }
    } catch (error) {
      console.error("[checkPermission]", error);
      return null;
    }
  };

  /**
   * ### Open device gallery.
   */
  const selectImage = async (
    options: ImageLibraryOptions,
    callback: Callback
  ): Promise<Asset | null> => {
    try {
      const { assets: androidAssets = [] } = await launchImageLibrary(
        options,
        callback
      );
      const [androidAsset] = androidAssets;
      return androidAsset;
    } catch (error) {
      console.error("[openGallery]", error);
      return null;
    }
  };

  /**
   * ### Open app info & setting.
   * @param {Boolean} asking > Need alert.
   */
  const openSetting = (asking: boolean = true): void => {
    if (asking) {
      Alert.alert(
        "Need Permission",
        "Achacha need grant permission by manually.",
        [
          {
            text: "CANCEL",
          },
          {
            text: "GO",
            onPress: Linking.openSettings,
          },
        ]
      );
    } else {
      Linking.openSettings();
    }
  };

  return {
    checkPermission,
    selectImage,
    openSetting,
  };
};

export default useImage;
