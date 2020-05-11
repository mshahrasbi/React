import React, { Component } from "react";
import { Route } from 'react-router-dom';

import axios from '../../../axios';

import './Posts.css';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    postSelectedHandler = (id) => {
        //this.setState({selectedPostId: id});
        this.props.history.push({pathname: '/posts/' + id});
        // or
        // this.props.history.push('/posts/' + id);
    }

    componentDidMount () {
        console.log('[Post:componentDidMount] props: ' , this.props);

        axios.get( '/posts' )
            .then( response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                // console.log( response );
            } )
            .catch(error => {
                console.log(error);
                // this.setState({error: true});
            });
    }


    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                        //<Link to={'/posts/' + post.id} key={post.id} >
                            <Post 
                                key={post.id} 
                                title={post.title} 
                                author={post.author}
                                clicked={() => this.postSelectedHandler(post.id)} />
                        //</Link>
                );
            });
        }


        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={ this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;