import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Cabecalho from '../../cabecalho';
import Pesquisa from '../../pesquisa/index.js';
import CardMovies from '../../cardFilmes';
import DATA from '../../../../movies'
import { useState, useEffect } from 'react';

export default function Home() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {

    async function buscarFilmes() {
      const url = 'https://api.themoviedb.org/3/movie/popular?language=pt-br&page=1';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjJkNTA4YjU0Y2E0ZDA5OGI0ZGRkNTYzMGU3NTdlNCIsIm5iZiI6MTc1NTAyMTUyMy45NjYsInN1YiI6IjY4OWI4MGQzMTBlZmM3OTg4ZDhlYjZmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KZnrNWFKoWfzFxi6qN7zd276g518OQ_Lg9mPrrjjEHU'
        }
      };

      fetch(url,options)
       .then(res => res.json())
       .then(json=>{
         let data = json.results
         console.log(data)

          setMovies(data)
        })
    }
    buscarFilmes()

  }, [])

  return (
    <View style={styles.container}>

      <Cabecalho />

      {/* INICIO DO BANNER */}
      <Text style={styles.textBanner}>Em Cartaz</Text>

      <Image style={styles.imageBanner} source={require('../../../../assets/CINEMA.png')} />

      {/* FIM DO BANNER*/}

      <View style={{ width: '90%', marginTop: 15, }}>

      <Text style={styles.textCategoria}> Filmes Mais Populares:</Text>
        <FlatList
          style={styles.containerFlatList} // Aplica o estilo para exibir os itens em linha
          data={movies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardMovies
              imagem={item.poster_path}
              titulo={item.title}
              nota={item.vote_average}
              descricao={item.overview}
            />
          )}
          horizontal={true} // Defina a lista como horizontal
          showsHorizontalScrollIndicator={false} // Remova o indicador de rolagem
        />

      </View >

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#740000',
    alignItems: 'center',
  },


  imageBanner: {
    width: "100%",
    height: 350,
    marginTop: 15,
    borderRadius: 10
  },

  textBanner: {
    fontSize: 30,
    color: "white",
    marginTop: 15,
    fontWeight: "bold"
  },

  textCategoria: {
    fontSize: 25,
    color: "white",
    marginTop: 15,
    marginBottom:9,
    fontWeight: "bold"
  },
});