import Navbar from "../components/Navbar";

const About = () => {
    return (
        <div className="px-16 py-10 h-screen text-white">
            <Navbar />

            <div>
                <h1 className="text-4xl">CREDITS</h1>
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

        </div>
    );
};

export default About;