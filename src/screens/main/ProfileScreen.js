import React, {useState, useEffect} from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {useNavigation} from "@react-navigation/native"
import * as Notifications from "expo-notifications"

// Set up notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

const ProfileScreen = () => {
  const [image, setImage] = useState(null)
  const navigation = useNavigation()

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  const requestNotificationPermission = async () => {
    const {status} = await Notifications.requestPermissionsAsync()
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Please enable notifications to receive updates"
      )
    }
  }

  const sendTestNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Test Notification! 📬",
          body: "This is a test notification from your app!",
          data: {data: "Some extra data"},
        },
        trigger: null, // null means send immediately
      })
      Alert.alert("Success", "Test notification sent!")
    } catch (error) {
      Alert.alert("Error", "Failed to send notification")
      console.error(error)
    }
  }

  const requestCameraPermission = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Please allow camera access to take profile pictures.",
        [{text: "OK"}]
      )
      return false
    }
    return true
  }

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission()

    if (!hasPermission) return

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      })

      if (!result.canceled) {
        setImage(result.assets[0].uri)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo")
    }
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear()
      // Navigate to Auth/Login screen
      navigation.reset({
        index: 0,
        routes: [{name: "LogOut"}],
      })
    } catch (error) {
      Alert.alert("Error", "Failed to logout")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.imageContainer}>
          <Image
            source={
              image
                ? {uri: image}
                : require("../../../assets/images/splash-icon.png")
            }
            style={styles.profileImage}
          />
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleTakePhoto}>
          <Text style={styles.editButtonText}>Edit Profile Picture</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.notificationButton}
        onPress={sendTestNotification}
      >
        <Text style={styles.notificationButtonText}>
          Send Test Notification
        </Text>
      </TouchableOpacity>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logoutContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 20,
    width: "80%",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  notificationButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  notificationButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default ProfileScreen
