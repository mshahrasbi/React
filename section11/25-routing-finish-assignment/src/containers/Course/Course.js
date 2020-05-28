import React, { Component } from 'react';

class Course extends Component {
    state = {
        courseTitle: ''
    }

    parseQueryParams() {
        console.log('[Course] componentDidMount: props: ', this.props);

        const query = new URLSearchParams(this.props.location.search);
        console.log('[Course] componentDidMount: query: ', query);

        for (let param of query.entries()) {
            if (this.state.courseTitle !== param[1]) {
                console.log('[Course] componentDidMount: query.entries : ', param);

                this.setState({
                    courseTitle: param[1]
                });
            }
        }
    }

    componentDidMount() {
        this.parseQueryParams();
    }

    componentDidUpdate() {
        this.parseQueryParams();
    }

    render () {
        return (
            <div>
                {/* <h1>{ this.props.match.params.courseTitle}</h1> */}
                <h1>{ this.state.courseTitle}</h1>
                <p>You selected the Course with ID: { this.props.match.params.courseId }</p>
            </div>
        );
    }
}

export default Course;