import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillCalendar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { FaCopy, FaWhatsappSquare, FaFacebook } from "react-icons/fa";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!id) return;

    axios.get(`http://localhost:4000/event/${id}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      });
  }, [id]);

  const handleCopyLink = () => {
    const linkToShare = window.location.href;
    navigator.clipboard.writeText(linkToShare).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleWhatsAppShare = () => {
    const linkToShare = window.location.href;
    const whatsappMessage = encodeURIComponent(linkToShare);
    window.open(`whatsapp://send?text=${whatsappMessage}`);
  };

  const handleFacebookShare = () => {
    const linkToShare = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkToShare)}`;
    window.open(facebookShareUrl);
  };

  if (!event) return <div>Loading event details...</div>;

  return (
    <div className="flex flex-col mx-5 xl:mx-32 md:mx-10 mt-5 flex-grow">
      <div>
        {event.image && (
          <img
            src={`http://localhost:4000/${event.image}`}
            alt="Event"
            width="600px"
            className="rounded object-fill"
          />
        )}
      </div>

      <div className="flex justify-between mt-8 mx-2">
        <h1 className="text-3xl md:text-5xl font-extrabold">
          {event.title?.toUpperCase()}
        </h1>
      </div>

      <div className="mx-2 mt-5 text-md md:text-lg">
        {event.description}
      </div>

      <div className="mx-2 mt-5 text-md md:text-xl font-bold text-primarydark">
        Organized By: {event.organizedBy || "Unknown"}
      </div>

      <div className="mx-2 mt-5">
        <h1 className="text-md md:text-xl font-extrabold">When and Where</h1>
        <div className="sm:mx-5 lg:mx-32 mt-6 flex flex-row items-center gap-4">
          <div className="flex items-center gap-4">
            <AiFillCalendar className="w-auto h-5 text-primarydark" />
            <div className="flex flex-col gap-1">
              <h1 className="text-md md:text-lg font-extrabold">
                Date and Time
              </h1>
              <div className="text-sm md:text-lg">
                Date: {event.date || "N/A"} <br />
                Time: {event.time || "N/A"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MdLocationPin className="w-auto h-5 text-primarydark" />
            <div className="flex flex-col gap-1">
              <h1 className="text-md md:text-lg font-extrabold">Location</h1>
              <div className="text-sm md:text-lg">{event.location || "N/A"}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-2 mt-5 text-md md:text-xl font-extrabold">
        Share with friends
        <div className="mt-10 flex gap-5 mx-10 md:mx-32">
          <button onClick={handleCopyLink}>
            <FaCopy className="w-auto h-6" />
          </button>

          <button onClick={handleWhatsAppShare}>
            <FaWhatsappSquare className="w-auto h-6" />
          </button>

          <button onClick={handleFacebookShare}>
            <FaFacebook className="w-auto h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}