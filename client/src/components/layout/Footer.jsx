const Footer = () => {
    return (
        <footer className="mt-12 bg-[#172554] text-blue-100">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 font-bold text-[#172554]">
                                P
                            </div>

                            <h2 className="text-lg font-bold text-white">
                                Product Explorer
                            </h2>
                        </div>

                        <p className="max-w-sm text-sm leading-6 text-blue-200">
                            Discover, explore, and manage products with a
                            simple and easy-to-use product experience.
                        </p>
                    </div>




                  
                    <div>
                        <h3 className="mb-4 font-semibold text-white">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-2">
                            <a
                                href="/products"
                                className="group flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-blue-100 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
                            >
                                <span>Products</span>

                                <span className="text-cyan-400 transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </a>

                            <a
                                href="/about"
                                className="group flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-blue-100 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
                            >
                                <span>About</span>

                                <span className="text-cyan-400 transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </a>
                        </div>
                    </div>
                    






                    <div>
                        <h3 className="mb-3 font-semibold text-white">
                            About
                        </h3>

                        <p className="text-sm leading-6 text-blue-200">
                            A practice project focused on building a clean,
                            responsive, and user-friendly product browsing
                            experience.
                        </p>
                    </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-5 text-center text-sm text-blue-300">
                    © {new Date().getFullYear()} Product Explorer. All rights
                    reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

