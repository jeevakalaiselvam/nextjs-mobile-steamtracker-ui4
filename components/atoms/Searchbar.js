import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { HiSearch } from "react-icons/hi";

const Container = styled.div`
  display: flex;
  margin: 0.5rem 0 0 0;
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: #9caabe;
  padding: 0.5rem 1rem;
  border-radius: 0px 0px 0px 0px;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & input {
    outline: none;
    padding: 0.5rem;
    width: ${(props) => props.width || "150px"};
    background: rgba(0, 0, 0, 0.5);
    color: #9caabe;
    border: none;
    border-radius: 0px 0px 0px 0px;

    &::placeholder {
      color: #9caabe;
    }
  }
`;

const Searchbar = (props) => {
  const { onSearchObtained, width, searchShow } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchObtained(searchTerm);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const searchTermChanged = (e) => {
    const data = e.target.value;
    setSearchTerm((old) => data);
  };

  useEffect(() => {
    if (searchShow) {
      console.log("REF", inputRef.current);
      inputRef.current.focus();
    }
  }, [searchShow]);

  return (
    <Container>
      <SearchIcon>
        <HiSearch />
      </SearchIcon>
      <SearchInput width={width}>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm ?? ""}
          onChange={searchTermChanged}
          placeholder="Search..."
        />
      </SearchInput>
    </Container>
  );
};

export default Searchbar;
