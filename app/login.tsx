import React from "react"
import {View, TouchableOpacity, Text, StyleSheet} from "react-native"
import {Formik, Field} from "formik"
import {useRouter} from "expo-router"
import CustomInput from "../src/components/CustomInput"
import {loginValidationSchema} from "../src/utils/validationSchema"

export default function LoginScreen() {
  const router = useRouter()

  const handleLogin = values => {
    // Here you would typically handle the login API call
    console.log("Login values:", values)
    router.replace("/(tabs)")
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{username: "", password: ""}}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({handleSubmit}) => (
          <View style={styles.form}>
            <Field
              name="username"
              placeholder="Username"
              component={CustomInput}
            />
            <Field
              name="password"
              placeholder="Password"
              component={CustomInput}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  form: {
    width: "100%",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
}) 