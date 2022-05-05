import { channelsArray } from "../components/ChannelList"

export async function GetAllChannels(): Promise<{channels: channelsArray, status: string}> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3001/channels", {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        res.json().then(jsonArray => {
          resolve({status: "ok", channels: parseChannelsFromJson(jsonArray.channels)})
        })
      } else {
        resolve({channels: [], status: "error"})
      }
    }).catch(error => {
      console.log(error)
      resolve({channels: [], status: "error"})
    })
  })
}

function parseChannelsFromJson(jsonArray: Array<{id: number, createdAt: string, updatedAt: string, name: string}>) {
  const channels: channelsArray = jsonArray.map(channel => {
    return {id: channel.id, name: channel.name, status: "ok"}
  })
  return channels
}
