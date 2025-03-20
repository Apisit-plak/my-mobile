import { TextInputProps, ImageSourcePropType, StyleProp, TextStyle, ViewStyle, ImageStyle } from "react-native";

export interface InputFieldProps extends TextInputProps {
  label?: string; // ตัวเลือก Label
  icon?: ImageSourcePropType; // สำหรับไอคอน
  secureTextEntry?: boolean; // ความลับของข้อความ
  labelStyle?: StyleProp<TextStyle>; // สไตล์ของ Label
  containerStyle?: StyleProp<ViewStyle>; // สไตล์ของ Container
  inputStyle?: StyleProp<TextStyle>; // สไตล์ของ Input
  iconStyle?: StyleProp<ImageStyle>; // สไตล์ของ Icon
}

import { TouchableOpacityProps } from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  title: string; // ข้อความที่จะแสดงบนปุ่ม
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success"; // สีพื้นหลัง
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success"; // สีข้อความ
  IconLeft?: React.ComponentType<any>; // ไอคอนด้านซ้าย
  IconRight?: React.ComponentType<any>; // ไอคอนด้านขวา
  style?: any; // รองรับสไตล์เพิ่มเติม
  onPress?: () => void; // ฟังก์ชันที่เรียกเมื่อกดปุ่ม
}


  