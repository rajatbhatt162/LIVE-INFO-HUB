

import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({
    country = 'us',          // Set default values directly in the parameters
    pageSize = 8,
    category = 'general',
    apiKey,
    setProgress
}) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // Capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Fetch news data
    // const updateNews = async () => {
    //     setProgress(10); // Update progress bar
    //     const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    //     setLoading(true);
    //     try {
    //         let data = await fetch(url);
    //         setProgress(30); // Update progress
    //         let parsedData = await data.json();
    //         setProgress(70); // Update progress
    //         setArticles(parsedData.articles);
    //         setTotalResults(parsedData.totalResults);
    //         setLoading(false);
    //         setProgress(100); // Finalize progress
    //     } catch (error) {
    //         console.error('Error fetching news:', error);
    //         setProgress(100); // Finalize progress on error
    //         setLoading(false);
    //     }
    // };
    const updateNews = async () => {
        props.setProgress(10); // Update progress bar
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        try {
            let data = await fetch(url);
            props.setProgress(30); // Update progress
            let parsedData = await data.json();
    
            // Log the API response
            console.log('API Response:', parsedData);
    
            // Check if parsedData and articles exist
            if (parsedData && parsedData.articles) {
                props.setProgress(70); // Update progress
                setArticles(parsedData.articles);
                setTotalResults(parsedData.totalResults);
            } else {
                console.error('Error fetching news:', parsedData.message || 'Unknown error');
                // Handle error response
                setArticles([]); // Reset articles in case of an error
            }
            
            setLoading(false);
            props.setProgress(100); // Finalize progress
        } catch (error) {
            console.error('Error fetching news:', error);
            props.setProgress(100); // Finalize progress on error
            setLoading(false);
        }
    };
    

    // Update the document title and fetch news when component mounts or category/page changes
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(category)} - Live-Info-Hub`;
        updateNews();
        // eslint-disable-next-line
    }, [category]);

    // Fetch more news for infinite scroll
    const fetchMoreData = async () => {
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
        setPage(nextPage);
        try {
            let data = await fetch(url);
            let parsedData = await data.json();
            setArticles(articles.concat(parsedData.articles)); // Append new articles to the existing list
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
            {loading && <Spinner />} {/* Display spinner while loading */}
            
            <InfiniteScroll
                dataLength={articles.length} // Number of items currently displayed
                next={fetchMoreData} // Function to call for more data
                hasMore={articles.length !== totalResults} // Check if more items are available to load
                loader={<Spinner />} // Spinner to display while loading more data
            >
                <div className="container">
                    <div className="row">
                        {/* Display news items */}
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

// PropTypes for type-checking
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired, // apiKey is required
    setProgress: PropTypes.func.isRequired, // setProgress is required
};

export default News;
