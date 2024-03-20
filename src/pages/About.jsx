import Navbar from "../components/Navbar";

const About = () => {
    return (
        <div className="px-16 py-10 h-screen text-white">
            <Navbar />

            <div>
                <h1 className="text-4xl">DEVELOPER CREDITS</h1>
                <table className="w-full mt-8 border-collapse text-white">
                    <thead>
                        <tr className="bg-black">
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Student ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-neutral-700">
                            <td className="px-4 py-2">1</td>
                            <td className="px-4 py-2">Marcus Hewson</td>
                            <td className="px-4 py-2">w21016419</td>
                        </tr>
                        <tr className="bg-neutral-800">
                            <td className="px-4 py-2">2</td>
                            <td className="px-4 py-2">Thura Soe Win</td>
                            <td className="px-4 py-2">w22038942</td>
                        </tr>
                        <tr className="bg-neutral-700">
                            <td className="px-4 py-2">3</td>
                            <td className="px-4 py-2">Drew Lilley</td>
                            <td className="px-4 py-2">w20000697</td>
                        </tr>
                        <tr className="bg-neutral-800">
                            <td className="px-4 py-2">4</td>
                            <td className="px-4 py-2">Janah Almenayes</td>
                            <td className="px-4 py-2">w19026343</td>
                        </tr>
                        <tr className="bg-neutral-700">
                            <td className="px-4 py-2">5</td>
                            <td className="px-4 py-2">Sufyan Alabbas</td>
                            <td className="px-4 py-2">w18016485</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="max-w-4xl mx-auto px-4 pt-8">
      <div className="shadow-lg rounded-md ">
        <div className="p-8">

          <h1 className="text-3xl text-center font-bold mb-8 p-6">About Us</h1>

          <p className=" mb-12 text-center">Welcome to our platform, where individuals gather to promote well-being and participate in diverse events.
            We specialize in event management, focusing on health check-ups and a variety of other engaging activities.
            Whether you're an organization seeking to host an event or an individual interested in participating,
            we're here to ensure seamless connections and meaningful experiences.</p>



          <h2 className="text-xl font-semibold mb-7 text-center">Our Mission</h2>

          <p className="text-gray-500 mb-8">
            Our mission is centered around our commitment to fostering healthier communities through accessible and engaging events.
            We strive to bridge the gap between organizations offering health check-ups, workshops, and various events,
            and individuals seeking opportunities for improving their well-being.</p>

          <h2 className="text-xl  font-semibold  mb-7 text-center">What We Offer</h2>

          <p className=" mb-2"> Platform for Event Hosts: </p>
          <p className="text-gray-500 mb-4"> Organizations dedicated to health awareness, wellness, and community development can leverage our platform to effortlessly showcase their events.
            We provide a space for hosts to reach a diverse audience and make a positive impact. </p>
          <p className=" mb-2">User-Friendly Interface:</p>
          <p className="text-gray-500 mb-4">Our platform ensures a seamless experience for both event hosts and attendees.
            Hosts can easily create and manage event listings, while attendees can effortlessly browse and register for events that align with their interests and schedules. </p>
          <p className=" mb-2">Comprehensive Event Listings:</p>
          <p className="text-gray-500 mb-4"> Explore a wide range of events tailored to diverse interests and preferences. You'll find an array of enriching experiences to enhance your well-being.</p>


          <h2 className="text-xl font-semibold mb-7 text-center">Why Choose Us</h2>

          <p className=" mb-2">Expertise in Health and Event Management:</p>
          <p className="text-gray-500 mb-4">Benefit from our specialized knowledge and experience in both health promotion and event coordination. We understand the unique needs of both hosts and attendees, ensuring a smooth and rewarding experience for all involved. </p>
          <p className=" mb-2">User-Focused Approach: </p>
          <p className="text-gray-500 mb-4">Our platform is designed with your needs in mind. We prioritize user satisfaction and strive to provide a seamless experience for both event hosts and attendees, making it easy to find and participate in events that matter to you. </p>
          <p className=" mb-2">Reliability and Trustworthiness:</p>
          <p className="text-gray-500 mb-4">Count on us to deliver on our promises. With a reputation for reliability, we're committed to making sure that every event you attend or host through our platform exceeds your expectations.</p>
        </div>

      </div>
    </div>

        </div>
    );
};

export default About;