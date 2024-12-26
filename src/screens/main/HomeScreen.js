import React from "react"
import {View, Text, StyleSheet} from "react-native"
import DataList from "../../components/DataList"

const HomeScreen = () => {
  const renderItem = ({item}) => (
    <View style={styles.cardContainer}>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <DataList
        endpoint="/posts"
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 5,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android elevation
    elevation: 5,
  },
  itemContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: "#666",
  },
})

export default HomeScreen
