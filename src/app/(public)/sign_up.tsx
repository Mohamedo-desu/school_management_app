import AuthHeader from "@/components/global/AuthHeader";
import CustomButton from "@/components/global/CustomButton";
import CustomInput from "@/components/global/CustomInput";
import CustomText from "@/components/global/CustomText";
import { showToast } from "@/components/toast/ShowToast";
import BreakerText from "@/components/ui/BreakerText";
import PrivacyTerms from "@/components/ui/PrivacyTerms";
import SocialLogin from "@/components/ui/SocialLogin";
import { Colors } from "@/constants/Colors";
import { saveSecurely } from "@/store/storage";
import { useSignUp } from "@clerk/clerk-expo";
import { Formik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale } from "react-native-size-matters";
import { StyleSheet } from "react-native-unistyles";

import * as Yup from "yup";

const SignUpScreen = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const { t } = useTranslation();
  const { isLoaded, signUp, setActive } = useSignUp();

  const handleSignUpEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      if (!isLoaded) return;
      setLoading(true);

      saveSecurely([
        { key: "email", value: email },
        { key: "password", value: password },
      ]);

      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
    } catch (error: any) {
      //console.error("Sign-up error:", error);
      showToast("error", "Error", error.message || "Sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      if (!isLoaded) return;

      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        showToast("success", "Success", "Email verified successfully!");
        setVerifying(false);
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error: any) {
      //console.error("Verification error:", err);
      showToast("error", "Error", error.message);
    }
  };

  const SignUpValidationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email()
      .required(t("validation.email") + " " + t("validation.required"))
      .label(t("validation.email"))
      .test("email", t("validation.invalidEmail"), (value) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
      }),
    password: Yup.string()
      .trim()
      .min(8)
      .max(35)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        t("validation.passwordRequirement")
      )
      .required(t("validation.password") + " " + t("validation.required"))
      .label(t("validation.password")),
    confirmNewPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref("password")], t("validation.passwordMatch")),
  });

  return (
    <>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.screen}
        contentContainerStyle={styles.contentContainer}
        keyboardDismissMode="on-drag"
      >
        <AuthHeader
          title={t("signUp.title")}
          description={t("signUp.description")}
        />
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmNewPassword: "",
          }}
          validationSchema={SignUpValidationSchema}
          onSubmit={handleSignUpEmail}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formikContainer}>
              <CustomInput
                placeholder={t("signUp.emailPlaceholder")}
                errors={errors.email}
                touched={touched.email}
                value={values.email}
                handleChange={handleChange("email")}
                handleBlur={handleBlur("email")}
                autoComplete="email"
                rightIcon="email"
              />
              <CustomInput
                placeholder={t("signUp.passwordPlaceholder")}
                errors={errors.password}
                touched={touched.password}
                value={values.password}
                handleChange={handleChange("password")}
                handleBlur={handleBlur("password")}
                autoComplete="password"
                secureTextEntry={!showPassword}
                rightIcon={showPassword ? "eye-off" : "eye"}
                onPressRightIcon={() => setShowPassword(!showPassword)}
              />
              <CustomInput
                placeholder={t("signUp.confirmPasswordPlaceholder")}
                errors={errors.confirmNewPassword}
                touched={touched.confirmNewPassword}
                value={values.confirmNewPassword}
                handleChange={handleChange("confirmNewPassword")}
                handleBlur={handleBlur("confirmNewPassword")}
                autoComplete="password"
                secureTextEntry={!showPassword}
                rightIcon={showPassword ? "eye-off" : "eye"}
                onPressRightIcon={() => setShowPassword(!showPassword)}
              />

              <CustomButton
                loading={loading}
                text={t("signUp.signUp")}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>

        <BreakerText text={t("signIn.or")} />
        <SocialLogin />

        <PrivacyTerms />

        {/* Custom Verification Modal */}
      </KeyboardAwareScrollView>
      <Modal visible={verifying} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CustomText style={styles.modalTitle}>Verify Your Email</CustomText>

            <CustomInput
              placeholder="Enter verification code"
              value={code}
              handleChange={setCode}
              keyboardType="numeric"
              rightIcon={"key"}
              style={styles.input}
            />
            <CustomButton
              text="Verify"
              onPress={handleVerify}
              loading={loading}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create((theme) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.Colors.background,
    padding: theme.margins.lg,
  },
  contentContainer: {
    flexGrow: 1,
  },
  formikContainer: {
    width: "100%",
    marginTop: theme.margins.xl,
    gap: 20,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: "90%",
    height: moderateScale(200),
    padding: theme.margins.lg,
    backgroundColor: theme.Colors.background,
    borderRadius: theme.border.md,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  modalTitle: {
    fontSize: RFValue(18),
    fontFamily: theme.fonts.SemiBold,
    color: Colors.primary,
  },

  input: {
    width: "100%",
    marginVertical: 15,
  },
  modal: {},
}));
