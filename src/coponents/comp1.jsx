import React from "react";

export default function TravelPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center h-[40vh] text-white px-4"
      style={{ backgroundImage: "url('https://wallpaperaccess.com/full/706923.jpg')" }}
    >
      <div className=" p-6 rounded-2xl shadow-lg text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover, Extraordinaries and Stories</h1>
        <p className="text-lg mb-2">
          Embark on unforgettable journeys and experience the world in a whole new light.
        </p>
        <p className="text-lg mb-6">
          Every destination has a story — let us help you write yours.
        </p>
        <input
          type="text"
          placeholder="Search destinations..."
          className="w-full px-4 py-2 rounded-full text-black focus:outline-none shadow-md"
        />
      </div>
    </div>
  );
}