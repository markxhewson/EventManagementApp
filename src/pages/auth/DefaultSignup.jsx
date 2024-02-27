
const DefaultSignup = () => {
    return (
        <div className="flex flex-col h-full min-h-screen p-4 gap-32">
            <div className="flex flex-col justify-center items-center h-24 mt-8">
                <h1 className="text-orange-800 text-5xl font-bold">EVENTBLOOM</h1>
                <h3 className="text-slate-200 text-sm">Sign up today to take advantage of one of our many services!</h3>
            </div>
            
            <div className="flex flex-row justify-center items-center gap-16">
                <div className="text-center w-96">
                    <h1 className="text-2xl font-bold text-red-700">LOOKING FOR EVENTS?</h1>
                    <h3 className="text-sm italic text-white">We have plenty of events for you to browse!</h3>
                    <div className="flex flex-col items-center gap-8">
                        <div className="text-orange-500 text-sm mt-8">Take a look at our endless event lists, brought to you by our members that love bringing people together!</div>
                        <div className="text-orange-500 text-sm">We have something for everyone, utilize our search & filter features, and take a dive in!</div>
                        <button className="bg-red-700 text-white rounded-xl p-2 w-48 font-bold">SIGN UP</button>
                    </div>
                </div>
                <div className="border-2 rounded-xl border-slate-900 h-96" />
                <div className="text-center w-96">
                    <h1 className="text-2xl font-bold text-red-700">PLANNING AN EVENT?</h1>
                    <h3 className="text-sm italic text-white">Fancy creating an event? Sign up today!</h3>
                    <div className="flex flex-col items-center gap-8">
                        <div className="text-orange-500 text-sm mt-8">We have a wide range of tools to help you publish events catering to any group of people!</div>
                        <div className="text-orange-500 text-sm">Our platform is designed to help you reach out to the right audience, and make your event a success!</div>
                        <button className="bg-red-700 text-white rounded-xl p-2 w-48 font-bold">SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DefaultSignup;