import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return styles.bgSecondary;
    case "danger":
      return styles.bgDanger;
    case "success":
      return styles.bgSuccess;
    case "outline":
      return styles.bgOutline;
    default:
      return styles.bgPrimary;
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return styles.textPrimary;
    case "secondary":
      return styles.textSecondary;
    case "danger":
      return styles.textDanger;
    case "success":
      return styles.textSuccess;
    default:
      return styles.textDefault;
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
  onPress={onPress}
  style={[styles.buttonBase, getBgVariantStyle(bgVariant), styles]} 
  {...props}
>
  <View style={styles.buttonContent}>
    {IconLeft && <IconLeft />}
    <Text style={[styles.textBase, getTextVariantStyle(textVariant)]}>
      {title}
    </Text>
    {IconRight && <IconRight />}
  </View>
</TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  buttonBase: {
    width: "100%",
    borderRadius: 9999,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  textBase: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  bgPrimary: {
    backgroundColor: "#85CCCC",
  },
  bgSecondary: {
    backgroundColor: "#6C757D",
  },
  bgDanger: {
    backgroundColor: "#DC3545",
  },
  bgSuccess: {
    backgroundColor: "#28A745",
  },
  bgOutline: {
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: "#D1D1D1",
  },
  textPrimary: {
    color: "#000000",
  },
  textSecondary: {
    color: "#E9ECEF",
  },
  textDanger: {
    color: "#F8D7DA",
  },
  textSuccess: {
    color: "#D4EDDA",
  },
  textDefault: {
    color: "#FFFFFF",
  },
});

export default CustomButton;
