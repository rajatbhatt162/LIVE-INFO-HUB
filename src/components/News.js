import React, { useEffect, useState, useCallback } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({
    country = 'us',
    pageSize = 8,
    category = 'general',
    setProgress
}) => {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY; // Accessing the API key from .env
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updateNews = useCallback(async () => {
        setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        setLoading(true);
        try {
            let data = await fetch(url);
            setProgress(30);
            let parsedData = await data.json();

            console.log('API Response:', parsedData);

            if (parsedData && parsedData.articles) {
                setProgress(70);
                setArticles(parsedData.articles);
                setTotalResults(parsedData.totalResults);
            } else {
                console.error('Error fetching news:', parsedData.message || 'Unknown error');
                setArticles([]); // Reset articles in case of an error
            }

            setLoading(false);
            setProgress(100);
        } catch (error) {
            console.error('Error fetching news:', error);
            setProgress(100);
            setLoading(false);
        }
    }, [country, category, apiKey, page, pageSize, setProgress]);

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(category)} - Live-Info-Hub`;
        updateNews();
    }, [category, updateNews]);

    const fetchMoreData = async () => {
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
        setPage(nextPage);
        try {
            let data = await fetch(url);
            let parsedData = await data.json();
            setArticles(articles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);
        } catch (error) {
            console.error('Error fetching more news:', error);
        }
    };

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
                Live-Info-Hub - Top {capitalizeFirstLetter(category)} Headlines
            </h1>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func.isRequired,
};

export default News;
