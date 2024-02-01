"use client"

import { MediaCardCollection } from "@uidu/media-card-ui"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function Home() {

  const [status, setStatus] = useState()
  const [arr, setArr] = useState(itemsInitial);

  const [startDate, setStartDate] = useState<Date>();
  const { control, handleSubmit } = useForm({})

  const handleremove = (id: string) => {
    return setArr(arr.filter((i) => i.id !== id))
  }



  return (
    <main className="min-h-screen p-24">
      <div className="h-40 " >
        <MediaCardCollection files={arr} onClickAction={handleremove} />
      </div>
    </main>
  )
}

const itemsInitial = [
  {
    "id": "itemId1",
    "img": "https://picsum.photos/500/300?random=1"
  },
  {
    "id": "itemId2",
    "img": "https://picsum.photos/500/300?random=2"
  },
  {
    "id": "itemId3",
    "img": "https://picsum.photos/500/300?random=3"
  },
  {
    "id": "itemId4",
    "img": "https://picsum.photos/500/300?random=4"
  },
  {
    "id": "itemId6",
    "img": "https://picsum.photos/500/300?random=6"
  },
  {
    "id": "itemId7",
    "img": "https://picsum.photos/500/300?random=7"
  },
  {
    "id": "itemId8",
    "img": "https://picsum.photos/500/300?random=8"
  },
  {
    "id": "itemId9",
    "img": "https://picsum.photos/500/300?random=9"
  },
  {
    "id": "itemId10",
    "img": "https://picsum.photos/500/300?random=10"
  },
  {
    "id": "itemId11",
    "img": "https://picsum.photos/500/300?random=11"
  },
  {
    "id": "itemId12",
    "img": "https://picsum.photos/500/300?random=12"
  },
  {
    "id": "itemId13",
    "img": "https://picsum.photos/500/300?random=13"
  },
  {
    "id": "itemId14",
    "img": "https://picsum.photos/500/300?random=14"
  },
  {
    "id": "itemId15",
    "img": "https://picsum.photos/500/300?random=15"
  },
  {
    "id": "itemId16",
    "img": "https://picsum.photos/500/300?random=16"
  },
  {
    "id": "itemId17",
    "img": "https://picsum.photos/500/300?random=17"
  },
  {
    "id": "itemId18",
    "img": "https://picsum.photos/500/300?random=18"
  },
  {
    "id": "itemId19",
    "img": "https://picsum.photos/500/300?random=19"
  },
  {
    "id": "itemId20",
    "img": "https://picsum.photos/500/300?random=20"
  }
] 