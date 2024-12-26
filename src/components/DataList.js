import React, {useState, useEffect} from "react"
import {View, FlatList, Text, StyleSheet} from "react-native"
import {useApiService} from "../services/ApiService"
import Loader from "./Loader"

const DataList = ({endpoint, renderItem, keyExtractor}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const {fetchData} = useApiService()

  useEffect(() => {
    loadData()
  }, [endpoint])

  const loadData = async () => {
    setLoading(true)
    const result = await fetchData(endpoint)

    if (result.success) {
      setData(result.data)
      setError(null)
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
      />
      {loading && <Loader />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
})

export default DataList
