import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
    static defaultProps = {
        category: "general",
        country: "in",
        pageSize: 10,
    };
    static propsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
    };
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
        };
    }

    async update() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.update();
    }

    styles = {
        margin: "35px 0px",
        marginTop: "90px",
    };

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${
            this.props.country
        }&category=${this.props.category}&apiKey=${this.props.apikey}&page=${
            this.state.page + 1
        }&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
        });
    };

    render() {
        return (
            <>
                <h1 className="text-center" style={this.styles}>
                    Top Headlines
                </h1>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return (
                                    <div className="col-md-4" key={element.url}>
                                        <NewsItem
                                            title={
                                                element.title
                                                    ? element.title
                                                    : ""
                                            }
                                            description={
                                                element.description
                                                    ? element.description.slice(
                                                          0,
                                                          160
                                                      )
                                                    : ""
                                            }
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            date={element.publishedAt}
                                            aurthor={element.author}
                                            source={element.source.name}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        );
    }
}

export default News;
