import React from "react";

import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import { Flex, Heading, Button, Link } from "@chakra-ui/react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantList: [],
      user_id: "",
      displayName: "",
      recipients: 0,
      words: 0,
      notes: 0,
    };
    this.logOut = this.logOut.bind(this);
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      console.log(user.uid);
      this.setState({ user_id: user.uid, displayName: user.displayName });
      if (user) {
        console.log("Signed In");
        let db = firebase.firestore();
        db.collection("users")
          .doc(this.state.user_id)
          .get()
          .then((data) => {
            this.setState({ recipients: data.data()["recipients_sent"] });
            this.setState({ notes: data.data()["notes_written"] });
            this.setState({ words: data.data()["words_written"] });
            let restaurants = data.data()["restaurants"];

            for (const r of restaurants) {
              db.collection("restaurants")
                .doc(r)
                .get()
                .then((d) => {
                  const data = d.data();
                  const existing_restaurants = this.state.restaurantList;
                  existing_restaurants.push(data);
                  this.setState({ restaurantList: existing_restaurants });
                })
                .catch((e) => console.log("error: " + e));
            }
            const restaurant_elements = restaurants.map((place, index) => (
              <p key={index}> {place} </p>
            ));
            console.log(this.state.restaurantList);
          })
          .catch((e) => console.log("error: " + e));
      } else {
        this.props.history.push("/signup");
      }
    });
  }
  logOut() {
    firebase.auth().signOut();
    this.props.history.push("/");
  }
  render() {
    return (
      <Flex
        flexDirection="column"
        height="100%"
        minHeight="100vh"
        backgroundColor="gray.200"
      >
        <Flex justifyContent="space-between" p="30px">
          <Heading>{this.state.displayName}'s Dashboard</Heading>
          <Flex>
            <Link
              style={{ textDecoration: "none" }}
              href="/businesses"
              marginRight="15px"
            >
              <Button colorScheme="blue" size="lg">
                Businesses
              </Button>
            </Link>
            <Button colorScheme="teal" size="lg" onClick={() => this.logOut()}>
              Log Out
            </Button>
          </Flex>
        </Flex>
        <Flex flexDirection="column" p="30px">
          <Heading size="2xl" color="teal.900">
            <Heading size="3xl">{this.state.words} words written!</Heading>
          </Heading>
          <Heading size="2xl" color="blue.900">
            <Heading size="3xl">{this.state.notes} notes sent! </Heading>
          </Heading>
          <Heading size="2xl" color="cyan.900">
            <Heading size="3xl">{this.state.recipients} businesses thanked!</Heading>
          </Heading>
        </Flex>
        <Flex direction="column" p="30px">
          <Heading>Saved Businesses:</Heading>
          <Flex flexWrap="wrap" justifyContent="center" flexDirection="row">
            {this.state.restaurantList.map((bus, index) => (
              <Flex flexDirection="column" key={index} p="15px" m="20px">
                <Link
                  style={{ textDecoration: "none" }}
                  href={bus["url"]}
                  isExternal
                >
                  <Button
                    colorScheme="teal"
                    size="lg"
                    backgroundColor="teal.300"
                  >
                    {bus["name"]}
                  </Button>
                </Link>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default withRouter(Dashboard);
