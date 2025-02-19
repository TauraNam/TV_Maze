interface FilterModalProps {
    data: Set<string>,
    selectStyle: 'checkbox' | 'radio',
    styleType: 'genres' | 'status',
    selectedValues: string[],
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
}

const FilterModal: React.FC<FilterModalProps> = ({ data, selectStyle, styleType, selectedValues, setSelectedValues }) => {

    const selectFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        setSelectedValues((prev) =>
            selectStyle === "checkbox"
                ? prev.includes(value)
                    ? prev.filter((selectedValue) => selectedValue !== value)
                    : [...prev, value]
                : [value]
        )
    }

    return (
        <div className={`filter-modal ${styleType === 'genres' ? 'genres-style' : 'status-style'}`} >
            {data && Array.from(data).map((item, index) => (
                <label key={index}>
                    <input type={selectStyle} value={item} name={styleType}
                        checked={selectedValues.includes(item)}
                        onChange={selectFilters} />
                    {item}
                </label>
            ))}
        </div>
    );
}

export default FilterModal;