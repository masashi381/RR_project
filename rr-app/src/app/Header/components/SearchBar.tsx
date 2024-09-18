"use client";
import { Input, TextType } from "@/components/common/Input";
import { ChangeEvent, useContext } from "react";
import { RestaurantContext } from "@/context/RestaurantContext";
export default function SearchBar() {
  console.log("searchBar component");

  const { setSearchValue } = useContext(RestaurantContext);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Input
      textType={TextType.question}
      name="question"
      className="mr-2 mb-0"
      placeholder="Enter restaurant name"
      onChange={handleInputChange}
    />
  );
}
