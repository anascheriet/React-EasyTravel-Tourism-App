import React, { Fragment, useContext, useEffect } from "react";
import "./styles.css";
import { Navbar } from "../../components/nav/Navbar";
import { Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import WelcomePage from "../../components/Home/WelcomePage";
import { LoginForm } from "../../components/users/LoginForm";
import { ToastContainer } from 'react-toastify'
import NotFound from "./NotFound";
import 'react-toastify/dist/ReactToastify.css';
import { RootStoreContext } from "../stores/rootStore";
import { LoadingComponent } from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import Admins from "../../components/users/Admins";
import AdminCar from "../../components/cars/AdminCar";
import ClientCar from "../../components/cars/ClientCar";
import CarOffer from "../../components/cars/dashboard/Client/CarOffer";
import AdminHotel from "../../components/hotels/AdminHotel";
import HotelOffer from "../../components/hotels/dashboard/client/HotelOffer";
import ClientHotel from "../../components/hotels/ClientHotel";
import AdminFlight from "../../components/flights/AdminFlight";
import ClientFlight from "../../components/flights/ClientFlight";
import AdminActivity from "../../components/activities/AdminActivity";
import ActivityOffer from "../../components/activities/client/ActivityOffer";
import ClientActivity from "../../components/activities/ClientActivity";
import ClientCarBooking from "../../components/cars/ClientCarBooking";
import ClientFlightBooking from "../../components/flights/ClientFlightBooking";
import ClientActivityBookings from "../../components/activities/ClientActivityBookings";
import ClientHotelBooking from "../../components/hotels/ClientHotelBooking";
import AdminRestaurants from "../../components/restaurants/AdminRestaurants";
import ClientRestaurant from "../../components/restaurants/ClientRestaurant";
import RestaurantDashBoardAdmin from "../../components/restaurants/dashboard/admin/RestaurantDashBoardAdmin";
import RestaurantOffer from "../../components/restaurants/dashboard/client/RestaurantOffer";
import ClientRestaurantsBookings from "../../components/restaurants/ClientRestaurantsBookings";
import AdminArticle from "../../components/articles/AdminArticle";
import HomePage from "../../components/Home/HomePage";
import FullArticle from "../../components/articles/client/FullArticle";

function App() {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser, user } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded()
    }
  }, [getUser, setAppLoaded, token])



  if (!appLoaded) return <LoadingComponent content='Loading App...' />

  return (
    <div className="App">
      <ModalContainer />
      <Route exact path="/" component={WelcomePage} />
      {user === null && <Route exact path="/" component={WelcomePage} />}
      <Route path={'/(.+)'}
        render={() => (
          <Fragment>
            <ToastContainer position='bottom-right' />
            <Navbar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/Login" component={LoginForm} />

                {user?.status === "Admin" ? (
                  <Route exact path="/cars" component={AdminCar} />) : (<Route exact path="/cars" component={ClientCar} />)}
                  {user?.status === "Admin" ? (
                  <Route exact path="/restaurants" component={AdminRestaurants} />) : (<Route exact path="/restaurants" component={ClientRestaurant} />)}
                {user?.status === "Admin" ? (
                  <Route exact path="/hotels" component={AdminHotel} />) : (<Route exact path="/hotels" component={ClientHotel} />)}

                {user?.status === "Admin" ? (
                  <Route exact path="/flights" component={AdminFlight} />) : (<Route exact path="/flights" component={ClientFlight} />)}

                {user?.status === "Admin" ? (
                  <Route exact path="/activities" component={AdminActivity} />) : (<Route exact path="/activities" component={ClientActivity} />)}
          
                {user?.status === "Admin" ? (
                  <Route exact path="/CarBookings" component={NotFound} />) : (<Route exact path="/CarBookings" component={ClientCarBooking} />)}
                {user?.status === "Admin" ? (
                  <Route exact path="/ActivityBookings" component={NotFound} />) : (<Route exact path="/ActivityBookings" component={ClientActivityBookings} />)}
                {user?.status === "Admin" ? (
                  <Route exact path="/FlightBookings" component={NotFound} />) : (<Route exact path="/FlightBookings" component={ClientFlightBooking} />)}
                {user?.status === "Admin" ? (
                  <Route exact path="/HotelBookings" component={NotFound} />) : (<Route exact path="/HotelBookings" component={ClientHotelBooking} />)}
                  {user?.status === "Admin" ? (
                  <Route exact path="/RestaurantBookings" component={NotFound} />) : (<Route exact path="/RestaurantBookings" component={ClientRestaurantsBookings} />)}
                   
                   {user != null ? (
                  <Route exact path="/Myarticles" component={AdminArticle} />) : (<Route exact path="/Myarticles" component={NotFound} />)}

                <Route path="/cars/:id" component={CarOffer} />
                <Route path="/hotels/:id" component={HotelOffer} />
                <Route path="/activities/:id" component={ActivityOffer} />
                <Route path="/restaurants/:id" component={RestaurantOffer} />
                <Route path="/articles/:id" component={FullArticle} />


                <Route exact path="/admins" component={Admins} />
                <Route exact path="/Home" component={HomePage} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )} />

    </div>
  );
}

export default observer(App);
