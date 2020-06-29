import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { v4 as uuid } from "uuid";
import { IArticle } from '../../../app/models/Article'
import { RootStoreContext } from '../../../app/stores/rootStore';
import countries from '../../../app/common/Countries_Cities_DropDown/CountryCityData';
import { Segment, Form, Button } from 'semantic-ui-react';

interface IProps {
    article: IArticle;
}

const ArticleForm: React.FC<IProps> = ({
    article: initialFormState,
}) => {
    const rootStore = useContext(RootStoreContext);
    const { createArticle, editArticle, cancelFormOpen } = rootStore.articleStore;

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: "",
                name: "",
                body: "",
                CreatorName: ""
            };
        }
    };

    const [article, setArticle] = useState<IArticle>(initializeForm);

    const handleSubmit = () => {
        if (article.id.length === 0) {
            let newArticle = {
                ...article,
                id: uuid(),
            };
            createArticle(newArticle);
        } else {
            editArticle(article);
        }
    };

    const handleInputChange = (event: any,) => {
        const { name, value } = event.target;
        setArticle({ ...article, [name]: value });
    };


    return (
        <Segment clearing >
            <Form onSubmit={handleSubmit} >
                <Form.Input
                    onChange={handleInputChange}
                    name="name"
                    placeholder="Name"
                    value={article.name}
                />
                <Form.TextArea
                    name="body"
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Body"
                    value={article.body}
                />

                <Button
                    style={{ marginTop: "0.7em" }}
                    floated="right"
                    positive
                    type="submit"
                    content="Submit" />
                <Button
                    style={{ marginTop: "0.7em" }}
                    onClick={cancelFormOpen}
                    floated="right"
                    type="button"
                    content="Cancel"
                />
            </Form>
        </Segment>
    );
};

export default observer(ArticleForm)
