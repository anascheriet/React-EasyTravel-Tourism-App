import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Segment, Container, Header, Icon, Button, Grid, Input, Item } from 'semantic-ui-react';

const ArticleListAdmin: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { adminArticleList, selectArticle, deleteArticle, submitting, target, openCreateForm } = rootStore.articleStore;

    const [nameSearchString, setNameSearchString] = useState("");
    const handleNameFilterChange = (event: any) => {
        setNameSearchString(event.target.value);
    }

    var articlesFiltered = adminArticleList;

    useEffect(() => {
        setNameSearchString(nameSearchString.toLowerCase());
    }, [nameSearchString])

    if (nameSearchString.length > 0) {
        articlesFiltered = articlesFiltered.filter((x) => {
            return x.name.toLowerCase().match(nameSearchString);
        });
    }

    return (
        <Segment clearing>
        <Container clearing  >
          <Header as='h2' floated="left">
            <Icon name='quote right' />
            <Header.Content>
              Articles List
  
            <Header.Subheader>
                Manage Your Articles
                    </Header.Subheader>
            </Header.Content>
          </Header>
      
          <Header as='h2' floated='right'>
            <Button
              icon='quote right'
              onClick={openCreateForm}
              positive
              content=" Add An Article"
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
                value={nameSearchString}
                onChange={handleNameFilterChange}
                placeholder="Search by name ..." />
  
            </Grid.Column>
  
          </Grid>
        </Container>
        <Header as='h3' dividing> </Header>
        <Item.Group divided>
          {articlesFiltered.map((article) => (
            <Item key={article.id}>
              <Item.Content>
                <Item.Header as="a">{article.name}</Item.Header>
                <Item.Meta>
                <Item.Description>
                   <div>{article.body}</div>
                </Item.Description>
                 
                </Item.Meta>
                <Item.Extra>
                  <Button
                    onClick={() => selectArticle(article.id)}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={article.id}
                    loading={target === article.id && submitting}
                    onClick={(e) => deleteArticle(e, article.id)}
                    floated="right"
                    content="Delete"
                    color="red"
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    )
}

export default observer(ArticleListAdmin)
