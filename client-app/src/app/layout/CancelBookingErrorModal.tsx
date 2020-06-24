import React from 'react'
import { Header } from 'semantic-ui-react'

export const CancelBookingErrorModal = () => {
    return (
        <div>
        <Header inverted color='red'>Can't Cancel This Booking</Header>
        <Header.Content  inverted color='red'>
          <p>You Can Only Cancel A Booking When More Than 7 Days Are Left For The Service</p>
        </Header.Content>
      </div>
    )
}
