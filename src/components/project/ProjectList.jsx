import {useEffect, useState} from "react";

import ToolBar from "./ToolBar.jsx";
import ProjectItem from "./ProjectItem.jsx";
import ViewMore from "./ViewMore.jsx";
import ErrorProjNoneFound from "../errors/ErrorProjNoneFound.jsx";

import projData from "/public/data/proj-data.json";

export default function ProjectList({ searchParams }) {
    const [filteredData, setFilteredData] = useState(projData);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState([]);
    const [layoutMode, setLayoutMode] = useState('list');
    const [searchResultId, setSearchResultId] = useState(null);

    useEffect(() => {
        const filter = decodeURIComponent(searchParams.get("filter") || "");
        const search = decodeURIComponent(searchParams.get("search") || "");
        if (filter) {
            setActiveFilters([filter]);
        }
        if (search) {
            setSearchQuery(search);
        }
    }, [searchParams]);

    useEffect((projData) => {
        setFilteredData(projData);
    }, []);

    // Filtering logic
    useEffect(() => {
        let filtered = projData;
        if (activeFilters.length > 0) {
            filtered = filtered.filter(item => activeFilters.some(tag => item.tags.includes(tag)));
        }
        if (searchQuery) {
            filtered = filtered.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        setFilteredData(filtered);
    }, [searchQuery, activeFilters]);

    // Handle layout change from ToolBar
    const handleLayoutChange = (mode) => {
        setLayoutMode(mode);
    };

    const [availableFilters, setAvailableFilters] = useState([]);
    useEffect(() => {
        const extractFilters = () => {
            const uniqueFilters = new Set();
            projData.forEach(project => {
                if (Array.isArray(project.tags)) {
                    project.tags.forEach(tag => uniqueFilters.add(tag));
                }
            });
            setAvailableFilters(Array.from(uniqueFilters));
        };
        extractFilters();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === "") {
            setSearchResultId(null);
            return;
        }
        const filteredProjects = projData.filter(project =>
            project.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResultId(filteredProjects.length > 0 ? filteredProjects[0].id : null);
    };

    const [visibleItems, setVisibleItems] = useState(10);

    useEffect(() => {
        setVisibleItems(10);
    }, []);

    const loadMoreItems = () => {
        setVisibleItems((prev) => prev + 10);
    };

    return(
        <div className={`container ${layoutMode}`}>
            <h1>PROJECTS</h1>
            <ToolBar onSearch={handleSearch} onLayoutChange={handleLayoutChange} activeFilters={activeFilters} setActiveFilters={setActiveFilters} availableFilters={availableFilters} searchParams={searchParams} />
            <>
                {filteredData.length === 0 ? (
                    <ErrorProjNoneFound />
                ) : (
                    <>
                        <ul id="project-list" className={layoutMode === 'grid' ? 'layout-grid' : 'layout-list'}>
                            {filteredData.slice(0, visibleItems).map((item) => (
                                <ProjectItem key={item.id} item={item} searchResultId={searchResultId} />
                            ))}
                        </ul>

                        {visibleItems < filteredData.length && <ViewMore onLoadMore={loadMoreItems} loaded={visibleItems} total={filteredData.length}  />}
                    </>
                )}
            </>
        </div>
    );
}