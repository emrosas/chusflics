import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";

export default function App() {
  const apiKey = "f05a7ee63d28e1d3e397299d7e600a8e";
  const baseUrl = "https://api.themoviedb.org/3";
  const fetchMovies = async () => {
    const response = await fetch(
      `${baseUrl}/trending/all/day?api_key=${apiKey}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
    const data = await response.json();
    setMovies(data.results);
    console.log(data.results[2]);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const [movies, setMovies] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}>Chusflics</Text>
      <ScrollView contentContainerStyle={styles.movieContainer}>
        {movies.map((movie, index) => {
          return (
            <View key={index} style={styles.movieCard}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
                style={styles.movieImage}
              />
              {/* {movie.name && (
                <Text style={styles.movieTitle}>{movie.name}</Text>
              )}
              {movie.title && (
                <Text style={styles.movieTitle}>{movie.title}</Text>
              )} */}
              {movie.title ? (
                <Text style={styles.movieTitle}>{movie.title}</Text>
              ) : (
                <Text style={styles.movieTitle}>{movie.name}</Text>
              )}
              <Text style={styles.movieOverview} numberOfLines={4}>
                {movie.overview}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    backgroundColor: "#000",
    paddingTop: 96,
    paddingHorizontal: 8,
  },
  mainHeading: {
    color: "orangered",
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 24,
  },
  movieContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  movieCard: {
    width: "48%",
    marginBottom: 24,
  },
  movieImage: {
    width: "100%",
    aspectRatio: 9 / 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  movieTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  movieOverview: {
    opacity: 0.7,
    color: "white",
    fontSize: 12,
    // Cut off paragraph at 4 lines
  },
});
