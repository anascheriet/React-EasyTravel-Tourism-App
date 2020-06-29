import React, { SyntheticEvent } from 'react'
import { RootStore } from './rootStore';
import { observable, action } from 'mobx';
import { IArticle } from '../models/Article';
import agent from '../../components/cars/api/agent';

export default class ArticleStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable adminArticleList: IArticle[] = [];
    @observable allArticleList: IArticle[] = [];
    @observable selectedArticle: IArticle | undefined | null;
    @observable FullArticle: IArticle | undefined = undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';


    @action loadAdminArticles = async (name: string | undefined) => {
        this.loadingInitial = true;
        try {

            const Articles = await agent.Articles.creatorArticles(name);
            Articles.forEach((article) => {
                this.adminArticleList.push(article);
            });
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    };

    @action loadAllArticles = async () => {
        this.loadingInitial = true;
        try {

            const articles = await agent.Articles.list();
            articles.forEach((article) => {
                this.allArticleList.push(article);
            });
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    };

    @action loadFullCar = async (id: string) => {
        let article = this.allArticleList.find(x => x.id === id);
        if (article) {
          this.FullArticle = article;
        }
        else
          try {
            article = await agent.Articles.details(id);
            this.FullArticle = article;
          } catch (error) {
            console.log(error);
          }
    
      }

    @action emptyAdminArticles = () => {
        this.adminArticleList = [];
    }

    @action emptyAllArticles = () => {
        this.allArticleList = [];
    }

    @action createArticle = async (article: IArticle) => {
        this.submitting = true;
        try {
            await agent.Articles.create(article);
            this.adminArticleList.push(article);
            this.editMode = false;
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    };

    @action editArticle = async (article: IArticle) => {
        this.submitting = true;
        try {
            await agent.Articles.update(article);
            this.adminArticleList.splice(this.adminArticleList.findIndex(a => a.id === article.id), 1);
            this.adminArticleList.push(article);
            this.selectedArticle = article;
            this.editMode = false;
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    }

    @action deleteArticle = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Articles.delete(id);
            this.adminArticleList.splice(this.adminArticleList.findIndex(a => a.id === id), 1);
            this.submitting = false;
            this.target = '';
        } catch (error) {
            this.submitting = false;
            this.target = '';
            console.log(error);
        }
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedArticle = undefined;
    };

    @action openEditForm = (id: string) => {
        this.selectedArticle = this.adminArticleList.find(a => a.id === id);
        this.editMode = true;
    }

    @action cancelselectedArticle = () => {
        this.selectedArticle = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action selectArticle = (id: string) => {
        this.selectedArticle = this.adminArticleList.find(a => a.id === id);
        this.editMode = false;
    };
}



