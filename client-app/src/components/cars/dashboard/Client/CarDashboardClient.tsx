import React from 'react'
import { Grid } from 'semantic-ui-react'
import { CarListClient } from './CarListClient'

export const CarDashboardClient = () => {
    return (
        <div>

        <Grid>
          <Grid.Column width={10}>
           <CarListClient />
          </Grid.Column>
          <Grid.Column width={6}>
           <h2>Car Filters</h2>
          </Grid.Column>
        </Grid>
      </div>
    )
}
