const WelcomeContent = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-primary w-full">
      <div className="flex flex-col gap-2">
        <img src="./event.svg" alt="logo" className="w-64 h-56" />
        <h1 className="text-orange-500 text-6xl font-semibold">Event Flow</h1>
        <p className="text-gray-200 text-sm">
          Your one stop solution for event bookings and management.
        </p>
      </div>
    </div>
  );
};

export default WelcomeContent;
