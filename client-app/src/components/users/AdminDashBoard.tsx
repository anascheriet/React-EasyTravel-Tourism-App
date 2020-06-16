import React from 'react'
import { Grid } from 'semantic-ui-react'
import AdminsList from './AdminsList'
import { observer } from 'mobx-react-lite'

export const AdminDashBoard: React.FC = () => {
    return (
        <Grid>
            <Grid.Column width={10} >
                <AdminsList />
            </Grid.Column>
        </Grid>
    )
}
export default observer(AdminDashBoard);