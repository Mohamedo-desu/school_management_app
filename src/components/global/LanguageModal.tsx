import CustomText from "@/components/global/CustomText";
import { Fonts } from "@/constants/Fonts";
import React from "react";
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native-unistyles";

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
  languages: { code: string; name: string }[];
  onLanguageSelect: (language: { code: string; name: string }) => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  visible,
  onClose,
  languages,
  onLanguageSelect,
}) => {
  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      transparent
      animationType="fade"
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.languageList}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={styles.languageOption}
                  onPress={() => onLanguageSelect(language)}
                >
                  <CustomText
                    fontFamily={Fonts.Regular}
                    style={styles.languageText}
                  >
                    {language.name}{" "}
                    <CustomText style={styles.languageCode}>
                      ({language.code})
                    </CustomText>
                  </CustomText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default LanguageModal;

const styles = StyleSheet.create((theme) => ({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: theme.Colors.background,
    borderRadius: 10,
    width: "80%",
    padding: 20,
    elevation: 5,
    maxHeight: "70%",
  },
  languageList: {
    gap: 15,
  },
  languageOption: {
    paddingVertical: theme.margins.sm,
    alignItems: "center",
  },
  languageText: {
    fontSize: RFValue(14),
    textAlign: "center",
  },
  languageCode: {
    fontSize: RFValue(12),
    color: theme.Colors.primary,
  },
}));
