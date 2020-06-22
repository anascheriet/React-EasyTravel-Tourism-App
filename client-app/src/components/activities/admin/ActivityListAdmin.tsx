import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Segment, Container, Header, Icon, Button, Grid, Input, Item, Label } from 'semantic-ui-react';

const ActivityListAdmin: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { adminActivitiesByPrice, selectActivity, deleteActivity, submitting, target, openCreateForm } = rootStore.activityStore;

    const [citySearchString, setCitySearchString] = useState('');

    const [countrySearchString, setCountrySearchString] = useState("");

    const handleCountryFilterChange = (event: any) => {
        setCountrySearchString(event.target.value);
    }


    const handleCityFilterChange = (event: any) => {
        setCitySearchString(event.target.value);
    }

    var activitiesFilter = adminActivitiesByPrice;

    useEffect(() => {
        setCitySearchString(citySearchString.trim().toLowerCase());
        setCountrySearchString(countrySearchString.trim().toLowerCase());
    }, [citySearchString, countrySearchString])

    if (citySearchString.length > 0 && countrySearchString.length > 0) {
        activitiesFilter = activitiesFilter.filter((x) => {
            return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString);
        });
    }
    else if (citySearchString.length > 0 && countrySearchString.length === 0) {
        activitiesFilter = activitiesFilter.filter((x) => {
            return x.city.toLowerCase().match(citySearchString);
        });
    }
    else if (citySearchString.length === 0 && countrySearchString.length > 0) {
        activitiesFilter = activitiesFilter.filter((x) => {
            return x.country.toLowerCase().match(countrySearchString);
        });
    }

    return (
        <Segment clearing>
            <Container clearing  >
                <Header as='h2' floated="left">
                    <Icon name='ticket' />
                    <Header.Content>
                        Activities List

          <Header.Subheader>
                            Manage Your Application Activities
                  </Header.Subheader>
                    </Header.Content>
                </Header>

                <Header as='h2' floated='right'>
                    <Button
                        icon='ticket'
                        onClick={openCreateForm}
                        positive
                        content="Add Activity"
                        style={{ marginBottom: "0.3em" }}
                    />
                </Header>
            </Container>
            <Container style={{ marginTop: "5em", marginBottom: "1em" }}>
                <Header as='h3' dividing>


                </Header>
            </Container >



            <Container style={{ marginTop: "1.5em", marginBottom: "0.7em" }}>
                <Grid width={16}>
                    <Grid.Column width={5} >
                        <Input type="text" icon='search' fluid
                            value={countrySearchString}
                            onChange={handleCountryFilterChange}
                            placeholder="Search by country ..." />

                    </Grid.Column>

                    <Grid.Column width={5}>
                        <Input type="text" icon="search" fluid
                            value={citySearchString}
                            onChange={handleCityFilterChange}
                            placeholder="Select by city..." />

                    </Grid.Column>
                </Grid>
            </Container>
            <Header as='h3' dividing> </Header>
            <Item.Group divided>
                {activitiesFilter.map((activity) => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as="a">{activity.name}</Item.Header>
                            <Item.Meta>{activity.price}$ per adult</Item.Meta>
                            <Item.Meta>
                                {/* <Flag name={activity.country} /> */}
                                {activity.city}, {activity.country}
                            </Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    onClick={() => selectActivity(activity.id)}
                                    floated="right"
                                    content="View"
                                    color="blue"
                                />
                                <Button
                                    name={activity.id}
                                    loading={target === activity.id && submitting}
                                    onClick={(e) => deleteActivity(e, activity.id)}
                                    floated="right"
                                    content="Delete"
                                    color="red"

                                />
                                <Label basic content={activity.package} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default observer(ActivityListAdmin)