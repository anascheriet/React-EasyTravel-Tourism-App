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



  if (!appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <div className="App">
      <ModalContainer />
      <Route exact path="/" component={WelcomePage} />
      <Route path={'/(.+)'}
        render={() => (
          <Fragment>
            <ToastContainer position='bottom-right' />
            <Navbar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/Login" component={LoginForm} />

                {user?.status === "Client" ? (
                  <Route exact path="/cars" component={ClientCar} />) : (<Route exact path="/cars" component={AdminCar} />)}
                {user?.status === "Client" ? (
                  <Route exact path="/hotels" component={ClientHotel} />) : (<Route exact path="/hotels" component={AdminHotel} />)}

                <Route path="/cars/:id" component={CarOffer} />
                <Route path="/hotels/:id" component={HotelOffer} />
                <Route exact path="/admins" component={Admins} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )} />

    </div>
  );
}

export default observer(App);
