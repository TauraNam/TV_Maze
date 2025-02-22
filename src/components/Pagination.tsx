interface FiltersProps {
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    totalPages: number
}

const Pagination: React.FC<FiltersProps> = ({ currentPage, setCurrentPage, totalPages }) => {

    const getPageNumbers = () => {
        const pages: Set<number> = new Set()

        pages.add(1)
        pages.add(totalPages)

        if (currentPage < 6) {
            for (let i = 2; i < 6 && i < totalPages; i++) {
                pages.add(i)
            }
        }

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 1 && i < totalPages) pages.add(i)
        }

        return [...pages].sort((a, b) => a - b)
    }

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    return (
        <div className="pagination">
            {getPageNumbers().map((page, index, array) => (
                <div key={page}>
                    {index > 0 && page - array[index - 1] > 1 && <span>...</span>}
                    <button
                        className={`page-button ${currentPage === page ? "active" : ""}`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Pagination;