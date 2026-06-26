import "./About.css";

export default function About() {
  return (
    <div className="py-16">
      
      {/* Title */}
      <div className="text-center mb-12 About-title">
        <h1 className="text-3xl md:text-4xl font-bold">What Makes Us Unique</h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Student, student and ONLY student. We are dedicated to giving an effortless platform
          where only students RULE.
        </p>
      </div>

      {/* Cards Section */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center p-6 shadow-md rounded-xl bg-white hover:shadow-lg transition">
            <img src="../img/about1.avif" className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-[14px]" alt="" />
            <h3 className="mt-6 text-2xl font-semibold">Make deals within your campus</h3>
            <p className="mt-2 text-gray-600">
              You don't need to go far from your college campus. Ab Campus Me Bikega!
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center p-6 shadow-md rounded-xl bg-white hover:shadow-lg transition">
            <img src="../img/about2.avif" className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-[14px]" alt="" />
            <h3 className="mt-6 text-2xl font-semibold">Make deals within your campus</h3>
            <p className="mt-2 text-gray-600">
              You don't need to go far from your college campus. Ab Campus Me Bikega!
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center p-6 shadow-md rounded-xl bg-white hover:shadow-lg transition">
            <img src="../img/about5.avif" className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-[14px]" alt="" />
            <h3 className="mt-6 text-2xl font-semibold">Make deals within your campus</h3>
            <p className="mt-2 text-gray-600">
              You don't need to go far from your college campus. Ab Campus Me Bikega!
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
