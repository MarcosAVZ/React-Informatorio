import './App.css'
import ListenAlbumToMusic from './components/ListenToMusic/ListenAlbumToMusic'
import CardAlbumMusic from './components/AlbumCards/SquareAlbumCard/SquareAlbumCard'
import RectangleAlbumCard from './components/AlbumCards/RectangleAlbumCard/RectangleAlbumCard'
import LastListenedAlbums from './components/LastListenedAlbums/LastListenedAlbums'
import NavBar from './components/NavBar/NavBar'



function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="banner">
        <LastListenedAlbums>
          <RectangleAlbumCard   
            image="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da849d25907759522a25b86a3033"
            title="Tus Me Gusta"
          />
          <RectangleAlbumCard   
            image="https://i.scdn.co/image/ab6761610000e5ebb3cf4936e79bdd3a28b09aee"
            title="Un Poco de Ruido"
          />
          <RectangleAlbumCard
            image="https://www.fmfederal.com/wp-content/uploads/2021/06/Captura-de-pantalla-2021-06-16-a-las-11.22.00.png"
            title="Las mejores Cumbias.argentinas"
          />
          <RectangleAlbumCard
            image="https://is1-ssl.mzstatic.com/image/thumb/Music117/v4/7a/e2/a3/7ae2a3ec-5710-64e2-5f65-2dd02a934d6e/656291240726.jpg/600x600bf-60.jpg"   
            title="Devorando Intensidad"
          />
          <RectangleAlbumCard
            image="https://i.scdn.co/image/ab67616d0000b27308a404fd7ff6b0ac7febd5bf"
            title="A Contraluz"
          />
          <RectangleAlbumCard
            image="https://i.scdn.co/image/ab67616d0000b2737cbf214a462056895cdac24e"    
            title="Palabra De To's"
          />
          <RectangleAlbumCard
            image="https://i.scdn.co/image/ab67616d0000b273bda2ee5e85f9f1961549a2a2"
            title="Rompiendo el Silencio"
          />
          <RectangleAlbumCard
            image="https://i.scdn.co/image/ab6761610000e5eb5eb33e71c4c337f35c1df5b4"
            title="Mercedes Sosa"
          />
        </LastListenedAlbums>

      <ListenAlbumToMusic  title="Usuario" topTitle="Creado para">
        <CardAlbumMusic 
          image="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84d3c7e071b8d21f513358e99e"
          artists="Tu mix semanal de música nueva y..."
        />
        <CardAlbumMusic 
            image="https://i.scdn.co/image/ab676161000051745914c48d40ee28fe0074d426"
            artists="Soledad, Chaqueño Palavecino, Abel Pintos..."
        />
        <CardAlbumMusic 
            image="https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/artistmix/4VMYDCV2IEDYJArk749S6m/en"
            artists="Daddy Yankee, Anuel AA, Wisin y más"
        />
        <CardAlbumMusic 
            image="https://i.scdn.co/image/ab6761610000e5eb4a12f1e3b5e88f2acb497e81"
            artists="Amar Azul, Los Charros, La Nueva Luna y más"
        />
        <CardAlbumMusic 
            image="https://i.scdn.co/image/ab6761610000e5eb7c3e821249e3b4455323cc6d"
            artists="Geek Music, FLOW, Eve y más"
        />
        <CardAlbumMusic 
            image="https://sm.mashable.com/mashable_in/article/h/how-to-get/how-to-get-the-spotify-ai-dj_qqdw.jpg"
            artists="Todo tipo de música, seleccionada por tu estilo"
        />
        <CardAlbumMusic 
            image="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da845aca77eab3a20c4ef132bd81"
            artists="Escuchá las últimas canciones de artistas..."
        />
      </ListenAlbumToMusic>

      <ListenAlbumToMusic   title="Volver a escuchar">
          <CardAlbumMusic 
            image="https://i.scdn.co/image/ab6761610000e5ebb3cf4936e79bdd3a28b09aee"
            title="Un Poco de Ruido"
            artists="Artista"
            radio={true}
          />
          <CardAlbumMusic 
            image="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84475030aa0f2713f3e103bfcd"
            title="FOLKLORE PARA EL ASADO"
            artists="El mejor Folklore para el Asado. Folklore del..."
          />
          <CardAlbumMusic 
            image="https://i.scdn.co/image/ab67616d00001e027279daf2eeda4517d53121bc"
            artists="Con Los Manseros Santiagueños, Néstor..."
          />
          <CardAlbumMusic 
            image="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8452bc81dac649e2c67e219abe"
            title="REGUETON VIEJO"
            artists="Reguetón Viejito, perreo de antes y los clásicos..."
          />
          <CardAlbumMusic 
            image="https://i.scdn.co/image/ab6761610000e5eb5eb33e71c4c337f35c1df5b4"
            title="Mercedes Sosa"
            artists="Artista"
            radio={true}
          />
          <CardAlbumMusic 
            image="https://www.fmfederal.com/wp-content/uploads/2021/06/Captura-de-pantalla-2021-06-16-a-las-11.22.00.png"
            title="Las mejores Cumbias.argentinas"
            artists="instagram @chino.beats las mejores cumbias..."
          />
          <CardAlbumMusic 
            image="https://i.scdn.co/image/ab67616d0000b2737cbf214a462056895cdac24e"
            title="Palabra De To's"
            artists="Carín León"
          />
        </ListenAlbumToMusic>

        <ListenAlbumToMusic title="Álbumes con canciones que te gustan">
          <CardAlbumMusic 
            image="https://i.scdn.co/image/ab67616d0000b27388618511a51169b87f2f9bd5"
            title="Entrega De Amor"
            artists="Los Ángeles Azules"
          />
          <CardAlbumMusic 
            image="https://i.scdn.co/image/ab67616d0000b27308a404fd7ff6b0ac7febd5bf"
            title="A Contraluz"
            artists="La Vela Puerca"
          />
          <CardAlbumMusic 
            image="https://is1-ssl.mzstatic.com/image/thumb/Music117/v4/7a/e2/a3/7ae2a3ec-5710-64e2-5f65-2dd02a934d6e/656291240726.jpg/600x600bf-60.jpg"
            title="Devorando Intensidad"
            artists="El Plan De La Mariposa"
          />
          <CardAlbumMusic 
            image="https://m.media-amazon.com/images/I/71vZTntGuqL._UF894,1000_QL80_.jpg"
            title="Infest (UK Version)"
            artists="Papa Roach"
          />
          <CardAlbumMusic 
            image="https://i.scdn.co/image/ab67616d0000b273bda2ee5e85f9f1961549a2a2"
            title="Rompiendo el Silencio"
            artists="Nestor En Bloque"
          />
          <CardAlbumMusic 
            image="https://s.mxmcdn.net/images-storage/albums4/5/6/0/8/5/2/47258065_500_500.jpg"
            title="Sortilegio de Arrabal (En Vivo)"
            artists="Los Gardelitos"
          />
          <CardAlbumMusic 
            image="https://i.scdn.co/image/ab67616d0000b27338e72304b620159fb3f153ee"
            title="Escencia"
            artists="Mario Luis"
          />
        </ListenAlbumToMusic>

      </div>
    </div>
  )
}

export default App
