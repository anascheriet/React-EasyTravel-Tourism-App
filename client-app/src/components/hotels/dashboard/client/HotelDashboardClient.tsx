import React from 'react'
import { observer } from 'mobx-react-lite'
import HotelDashBoardAdmin from '../admin/HotelDashBoardAdmin'
import { Grid } from 'semantic-ui-react'
import HotelListClient from './HotelListClient'

export const HotelDashboardClient = () => {
    return (
        <div>
            <Grid>
                <Grid.Column width={10}>
                    <HotelListClient />
                </Grid.Column>
                <Grid.Column width={6}>
                    <h2>Hotel Filters</h2>
                </Grid.Column>
            </Grid>
        </div>
    )
}
