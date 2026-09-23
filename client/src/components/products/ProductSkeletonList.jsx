import ProductSkeleton from "./ProductSkeleton";

const ProductSkeletonList = () => {
    return (
        <div className="md:mt-5 flex flex-wrap gap-6 p-5">
            {Array.from({ length: 8 }).map((_, index) => (
                <div
                    key={index}
                    className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
                >
                    <ProductSkeleton />
                </div>
            ))}
        </div>
    );
};

export default ProductSkeletonList;

