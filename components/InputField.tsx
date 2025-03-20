import {
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    StyleSheet,
    ScrollView,
  } from "react-native";
  
  import { InputFieldProps } from "@/types/type";

  
  const InputField = ({
    label,
    icon,
    secureTextEntry = false,
    labelStyle,
    containerStyle,
    inputStyle,
    iconStyle,
    ...props
  }: InputFieldProps) => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={[styles.wrapper, containerStyle]}>
            {label && (
              <Text style={[styles.label, labelStyle]}>{label}</Text>
            )}
            <View style={[styles.inputContainer, containerStyle]}>
              {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
              <TextInput
                style={[styles.textInput, inputStyle]}
                secureTextEntry={secureTextEntry}
                {...props}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
    keyboardAvoidingView: {
      width: "100%",
      
    },
    wrapper: {
      marginVertical: 8,
      width: "100%",
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 8,
      color: "#333",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F5F5F5",
      borderRadius: 25,
      borderWidth: 1,
      borderColor: "#F5F5F5",
      paddingHorizontal: 16,
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 12,
    },
    textInput: {
      flex: 1,
      fontSize: 15,
      fontWeight: "600",
      paddingVertical: 10,
      color: "#333",
    },
  });
  
  export default InputField;
  