export default function Entry({ img, title, country, googleMapsLink, dates, text }) {
    return (
        <article className="journal-entry">
            <div className="main-image-container">
                <img 
                    className="main-image"
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                />
            </div>
            <div className="info-container">
                <div className="entry-header">
                    <img 
                        className="marker"
                        src="/marker.svg" 
                        alt=""
                        aria-hidden="true"
                    />
                    <span className="country">{country}</span>
                    <a className="google-link" href={googleMapsLink} target="_blank" rel="noreferrer noopener">
                        View on Google Maps
                    </a>
                </div>
                <h2 className="entry-title">{title}</h2>
                <p className="trip-dates">{dates}</p>
                <p className="entry-text">{text}</p>
            </div>
        </article>
    )
}