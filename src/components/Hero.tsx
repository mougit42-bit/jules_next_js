const Hero = () => {
  return (
    <div
      className="relative h-96 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-image1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">New Arrivals</h1>
          <p className="mt-4 text-lg md:text-2xl">Check out our latest products</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
