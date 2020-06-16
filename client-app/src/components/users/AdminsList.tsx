import React, { useContext } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore'
import { Segment, Table, Button, Icon, Header } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RegisterForm } from "./RegisterForm"

const AdminsList: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { adminList } = rootStore.userStore;
    const { openModal } = rootStore.modalStore;

    return (
        <div>

            <Segment clearing>
                <Header as='h2'>
                    <Icon name='users' />
                    <Header.Content>
                        Admins List
                  <Header.Subheader>
                            Manage The Application Admins
                  </Header.Subheader>
                    </Header.Content>
                </Header>

                <Header as='h3' dividing>
                    
  </Header>
                <Table compact celled definition>
                    <Table.Header>

                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell>Display Name</Table.HeaderCell>
                            <Table.HeaderCell>E-mail</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {adminList.map((admin) => {
                            return (
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        <Button content="Delete" negative />
                                    </Table.Cell>
                                    <Table.Cell>{admin.displayName}</Table.Cell>
                                    <Table.Cell>{admin.email}</Table.Cell>
                                    <Table.Cell>{admin.status}</Table.Cell>
                                </Table.Row>)
                        })}

                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='4'>
                                <Button
                                    floated='right'
                                    icon
                                    labelPosition='left'
                                    primary
                                    size='small'
                                    onClick={() => openModal(<RegisterForm />)}
                                >
                                    <Icon name='user' /> Add A New Admin
          </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Segment>
        </div>
    )
}

export default observer(AdminsList);