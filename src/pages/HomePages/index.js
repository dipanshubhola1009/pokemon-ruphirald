import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "reactstrap";
import axios from "axios";
import { capitalizeFirstLetter } from "../../utils/CommonFunction";
import Header from "../../components/Templates/Header";
import Footer from "../../components/Templates/Footer";
import NavigationsTab from "../../components/NavigationsTab";
import PokemonsCard from "../../components/PokemonsCard";
import PokemonsDetail from "../../components/PokemonsDetail";

const styles = {
  container: {
    display: "flex"
  },
  cardContainer: {
    justifyContent: "space-evenly",
    marginBottom: 25
  },
  floatingButton: {
    borderRadius: 1000,
    position: "fixed",
    right: 15,
    bottom: 15
  }
};

function HomePages({ handleChangePages }) {
  const [currentData, setCurrentData] = useState(0);
  const [pokemonData, setPokemonData] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getData();
  }, [currentData]);

  function handleLoadMore(value) {
    setCurrentData(value);
  }

  const handleBackToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  function getData() {
    const offset = currentData;
    const limit = 10;

    setIsFetching(true);

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
      .then(res => {
        setPokemonData([...pokemonData, ...res.data.results]);
        setIsFetching(false);
      });
  }

  function renderPokedexTab() {
    return (
      <Row style={styles.cardContainer}>
        {pokemonData &&
          pokemonData.map((item, index) => {
            const pokemonName = capitalizeFirstLetter(item.name);
            return (
              <PokemonsCard
                index={index + 1}
                pokemonName={pokemonName}
                handleChangePages={handleChangePages}
              />
            );
          })}
      </Row>
    );
  }

  return (
    <Container>
      {/* Render Pokedex */}
      {renderPokedexTab()}

      {/* <PokemonsDetail /> */}

      {/* Load More Button, etc */}
      <Footer
        isFetching={isFetching}
        clickHandle={handleLoadMore}
        dataCount={currentData}
      />

      {/* Floating Button */}
      <Button
        color="success"
        className="button-float"
        onClick={handleBackToTop}
        style={styles.floatingButton}
      >
        <img src={require("../../assets/images/arrow_up.png")} />
      </Button>
    </Container>
  );
}

export default HomePages;