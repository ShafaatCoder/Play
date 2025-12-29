import Link from "next/link"
import Image from "next/image"

interface props{
    title:string,
    image:string,
    slug:string,
    location:string,
    date:string,
    time:string
}
const EventCard = ({title, image, slug, location, date, time}:props) => {
  return (
    <Link href={`/event/${slug}`} id="event-card">
        <Image src={image}height={410} width={300} alt={title} className="event-image"/>

        <div className="flex flex-row gap-2">
            <Image src="icons/pin.svg" alt='location' height={14} width={14}/>
            <p>{location}</p>
        </div>
        <p className="title">{title}</p>
        <div className="datetime">
            <div>
                <Image src="icons/calendar.svg" alt='date' height={14} width={14}/>
            <p>{date}</p>
            </div>
            <div>
                <Image src="icons/clock.svg" alt='time' height={14} width={14}/>
            <p>{time}</p>
            </div>

        </div>
        </Link>

)
}

export default EventCard