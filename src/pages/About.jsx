const About = () => {
    const features = [
        {
            title: "Explore Products",
            description:
                "Browse a collection of products and quickly find the items you are interested in.",
        },
        {
            title: "Search & Filter",
            description:
                "Search by product name, filter by category, and sort products based on different options.",
        },
        {
            title: "Simple Experience",
            description:
                "A clean and responsive interface designed to make product discovery quick and easy.",
        },
    ];

    return (
        <main className="min-h-screen bg-slate-50">
           
            <section className="bg-[#172554] px-4 py-16 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                        About Product Explorer
                    </p>

                    <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                        Discover products without the clutter.
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                        Product Explorer is a simple product browsing
                        application that helps you search, filter, sort, and
                        explore products through a clean interface.
                    </p>
                </div>
            </section>

            
            <section className="px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                        <h2 className="text-2xl font-bold text-slate-800">
                            What is Product Explorer?
                        </h2>

                        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                            Product Explorer is built to provide a straightforward
                            way to browse and discover products. Instead of
                            presenting everything at once, the application
                            provides useful tools such as search, category
                            filtering, sorting, and pagination to make browsing
                            easier.
                        </p>
                    </div>
                </div>
            </section>

            
            <section className="px-4 pb-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-800">
                            What you can do
                        </h2>

                        <p className="mt-2 text-slate-600">
                            Everything you need for a simple product discovery
                            experience.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <h3 className="text-lg font-semibold text-[#172554]">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

           
            <section className="px-4 pb-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl rounded-2xl bg-[#172554] p-8 text-center text-white">
                    <h2 className="text-2xl font-bold">
                        Simple. Useful. Easy to explore.
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100">
                        Product Explorer focuses on keeping product discovery
                        straightforward while providing the features needed
                        for a smooth browsing experience.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default About;