import projData from "../../../public/data/proj-data.json";

export default function item1({ projectId }) {
    const project = projData.find((item) => item.id === projectId)

    return (
        <div>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
        </div>
    );
}