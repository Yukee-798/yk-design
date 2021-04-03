import { useEffect, useRef, useState } from "react";
import searchBtnIcon from '../../assets/icon/searchBtn.svg';



interface ISearchBarProps {
    value?: string;
    placeholder?: string;
    btnName?: string;
    maxLength?: number;
    disabled?: boolean;
    focus?: boolean;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    onChange?: (value: string) => void;
    onSearch?: () => void;
}

const SearchBar: React.FC<ISearchBarProps> = (props) => {

    const inputRef = useRef<HTMLInputElement | null>();



    const {
        btnName,
        disabled,
        maxLength,
        placeholder,
        value,
        focus,
        onBlur,
        onChange,
        onFocus,
        onSearch,
    } = props;

    const [mValue, setMValue] = useState<string>(value as string);
    const [isFocus, setIsFocus] = useState(focus as boolean);

    useEffect(() => {
        if (focus) {
            inputRef.current?.focus();
        } else {
            inputRef.current?.blur();
        }

    }, [focus])


    return (
        <div className='yk-search-bar'>

            <div className='yk-search-bar-input' style={{ width: isFocus ? '70%' : '100%' }}>
                <div className='yk-search-bar-placeholder-warp' style={{ flexGrow: isFocus ? 0 : 1 }}>
                    <div 
                        className='yk-search-bar-placeholder'
                        // style={{margin: isFocus ? '0 0 0 10px' : '0 auto'}}
                    >
                        <img src={searchBtnIcon} style={{ width: '16px' }} />
                        <span className='placeholder-text' style={{ display: isFocus ? 'none' : 'flex' }}>{placeholder}</span>
                    </div>
                    <input
                        disabled={disabled}
                        maxLength={maxLength}
                        ref={(input) => { inputRef.current = input }}
                        value={mValue}
                        onFocus={(e) => {
                            setIsFocus(true);
                            onFocus?.(e);
                        }}
                        onBlur={() => {
                            setIsFocus(false);
                            setMValue('');
                            onBlur?.()
                        }}

                        onChange={(e) => {
                            setMValue(e.target.value);
                            onChange?.(e.target.value);
                        }}

                    />
                </div>
            </div>

            <button
                onClick={() => { onSearch?.() }}
                disabled={disabled}
                style={{ opacity: isFocus ? 1 : 0 }}
            >{btnName}</button>

        </div>
    )
}

SearchBar.defaultProps = {
    btnName: 'search',
    disabled: false,
    maxLength: 50,
    value: '',
    placeholder: 'search',
}


export default SearchBar;