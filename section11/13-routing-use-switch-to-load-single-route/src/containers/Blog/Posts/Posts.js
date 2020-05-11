import React, { Component } from "react";
import { Link } from 'react-router-dom';

import axios from '../../../axios';

import './Posts.css';

import Post from '../../../components/Post/Post';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
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
                        <Link to={'/' + post.id} key={post.id} >
                            <Post 
                                title={post.title} 
                                author={post.author}
                                clicked={() => this.postSelectedHandler(post.id)} />
                        </Link>
                );
            });
        }


        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;