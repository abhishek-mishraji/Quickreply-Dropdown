
import React, { useState, useEffect, useRef } from 'react';
import { Info, UserCircle } from 'phosphor-react';
import './Dropdown.scss';




export interface DropdownProps {
    onClick?: (selectedIndex: number) => void;
    label: string;
    labelVisibility: 'Visible' | 'Hidden';
    status: 'Unfilled' | 'Filled' | 'Disabled' | 'Error';
    labelIconVisibility: 'Visible' | 'Hidden';
    leftIconVisibility: 'Visible' | 'Hidden';
    helperText: string;
    required: boolean;
    text: string;
    type: 'SingleNoIcon' | 'SingleRadio' | 'Multi';
    activeItemIndex: number;
    items: string[];
}

const Dropdown: React.FC<DropdownProps> = ({
    onClick,
    label,
    labelVisibility,
    status,
    labelIconVisibility,
    leftIconVisibility,
    helperText,
    required,
    text,
    type,
    activeItemIndex,
    items,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(activeItemIndex);
    const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(items.length).fill(false));
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }


        }



        // console.log('abhi Clicked');
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [dropdownRef]);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleItemClick = (index: number) => {
        if (type === 'Multi') {
            const updatedCheckedItems = [...checkedItems];
            updatedCheckedItems[index] = !updatedCheckedItems[index];
            setCheckedItems(updatedCheckedItems);
        } else {
            setSelectedIndex(index);
            setIsOpen(false);
        }
        if (onClick) {
            onClick(index);
        }
        setSelectedIndex(selectedIndex);
    };


    const renderItems = () => {
        return items.map((item, index) => {
            if (type === 'SingleRadio') {
                return (
                    <li key={index} className={index === selectedIndex ? 'active' : ''} >
                        <label>
                            <input
                                type="radio"
                                name="dropdown-radio"
                                checked={index === selectedIndex}
                                onChange={() => handleItemClick(index)}
                            />
                            {item}
                        </label>
                    </li>
                );
            } else if (type === 'Multi') {
                return (
                    <li key={index} className={checkedItems[index] ? 'active' : ''}>
                        <label>
                            <input
                                type="checkbox"
                                checked={checkedItems[index]}
                                onChange={() => handleItemClick(index)}
                            />
                            {item}
                        </label>
                    </li>
                );
            } else {
                return (
                    <li key={index} className={index === selectedIndex ? 'active' : ''} onClick={() => handleItemClick(index)}>
                        {item}
                    </li>
                );
            }
        });
    };




    return (
        <>
            <div className="dropdown-container">
                <div className={`dropdown ${status.toLowerCase()}`} ref={dropdownRef}>
                    {labelVisibility === 'Visible' && (
                        <label className="dropdown-label">
                            {labelIconVisibility === 'Visible' && <Info className="icon" />}
                            {label}
                            {required && <span className="required">*</span>}
                        </label>
                    )}
                    <div className="dropdown-input" onClick={toggleDropdown}>
                        {leftIconVisibility === 'Visible' && <UserCircle className="icon" />}
                        <input type="text" value={text} readOnly />
                    </div>
                    {isOpen && (
                        <ul className="dropdown-menu">
                            {renderItems()}
                        </ul>
                    )}


                </div>
                <div className="dropdown-helper">
                    {helperText && <div className="helper-text">{helperText}</div>}
                </div>
            </div>
        </>
    );
};

export default Dropdown;
