import type { DashboardTrip } from '~/index';

const TripCard = ({ trip }: { trip: DashboardTrip }) => {
  return (
    <div className="trip-card">
      <div className="trip-image-container">
        <img src={trip.imageUrls[0]} alt={trip.name} className="trip-image" />
        <div className="price-tag">
          {trip.estimatedPrice}
        </div>
      </div>
      <article className="trip-details">
        <h2>{trip.name}</h2>
        <figure className="location">
          <img src="/assets/icons/location-mark.svg" alt="location" className="location-icon" />
          <figcaption>{trip.itinerary[0].location}</figcaption>
        </figure>
        <div className="trip-tags">
          {trip.tags.map((tag: string, index: number) => (
            <span key={index} className={`trip-tag ${index === 0 ? 'tag-green' : 'tag-purple'}`}>
              {tag}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
};

export default TripCard;
