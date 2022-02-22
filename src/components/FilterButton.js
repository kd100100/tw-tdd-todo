import React from "react";

function FilterButton({ filter, active, onClickAction }) {
    return (
        <button
            type="button"
            className="btn toggle-btn"
            aria-pressed={active ? true : false}
            onClick={onClickAction}
            data-testid={`filter-${filter}`}
        >
            <span className="visually-hidden">Show </span>
            <span>{filter}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    );
}

export default FilterButton;
