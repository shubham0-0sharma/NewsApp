import React, { Component } from "react";

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, aurthor, date, source } =
            this.props;
        return (
            <div className="my-3">
                <div className="card" style = {{height:"34rem"}}>
                    <div
                        style={{ 
                            display: "flex",
                            justifyContent: "flex-end",
                            position: "absolute",
                            right: "0",
                        }}
                    >
                        <span className=" badge rounded-pill bg-info">
                            {source}
                        </span>
                    </div>

                    <img
                        src={
                            !imageUrl
                                ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"
                                : imageUrl
                        }
                        className="card-img-top" style={{widht: "30rem", height: "15rem"}}
                        alt="..."
                    />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <a
                            rel="noreferrer"
                            href={newsUrl}
                            target="_blank"
                            className="btn btn-sm btn-dark"
                        >
                            Read More
                        </a>
                        <div className="card-footer">
                            <small className="text-muted">
                                by <b>{aurthor ? aurthor : "unknown"}</b> on{" "}
                                {new Date(date).toGMTString()}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;
