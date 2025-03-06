import '../../styles/about.css';

export default function About() {
    return (
        <>
            <section id="about">
                <div className="container">
                    <h1>ABOUT</h1>
                    <div>
                        <div>
                            <img src="/images/tofe-cover.webp" alt="logo" loading="lazy"/>
                            <h2>Studio Name</h2>
                            <p>Academic paragraphs are usually between 200 and 300 words long (they vary more than this but
                                it is a useful guide). The important thing is that they should be long enough to contain all
                                the above material. Only move onto a new paragraph if you are making a new point.</p>
                        </div>
                        <div>
                            <h2>Name</h2>
                            <p>Description Academic paragraphs are usually between 200 and 300 words long (they vary more
                                than this but it is a useful guide). The important thing is that they should be long enough
                                to contain all the above material. Only move onto a new paragraph if you are making a new
                                point.Academic paragraphs are usually between 200 and 300 words long (they vary more than
                                this but it is a useful guide). The important thing is that they should be long enough to
                                contain all the above material. Only move onto a new paragraph if you are making a new
                                point.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}