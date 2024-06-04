import React from 'react'


const filters = [
    {
      title: "GIFs",
      value: "gifs",
      background:
        "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
    },
    {
      title: "Stickers",
      value: "stickers",
      background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
    },
    {
      title: "Text",
      value: "text",
      background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
    },
  ];

const FilterGif = ({alignLeft=false, showTrending=false}) => {
  const { filter, setFilter } = GifState();

  return (
    <div>
      
    </div>
  )
}

export default FilterGif
