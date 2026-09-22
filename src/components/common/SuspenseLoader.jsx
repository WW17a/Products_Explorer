const SuspenseLoader = () => {
    return (
        <main
            className="min-h-[70vh] flex items-center justify-center px-4"
            aria-busy="true"
            aria-live="polite"
        >
            <div className="w-full max-w-4xl space-y-8">
              
                <div className="space-y-3">
                    <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
                    <div className="h-4 w-72 max-w-full animate-pulse rounded bg-gray-200" />
                </div>

                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                        >
                           
                            <div className="h-52 animate-pulse bg-gray-200" />

                            
                            <div className="space-y-4 p-5">
                                <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

                                <div className="space-y-2">
                                    <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
                                    <div className="h-3 w-5/6 animate-pulse rounded bg-gray-200" />
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
                                    <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

               
                <p className="sr-only">Loading content...</p>
            </div>
        </main>
    );
};

export default SuspenseLoader;