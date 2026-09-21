const ProductSkeleton = () => {
    return (
        <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

            <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200" />

            <div className="mt-4 flex flex-1 flex-col justify-between">
                <div className="space-y-3">

                    <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                   
                    <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                </div>

                <div className="mt-4 space-y-3">
                   
                    <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />
                    
                    <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;