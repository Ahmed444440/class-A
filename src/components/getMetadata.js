import { fetchData } from "../../utils/api";

export async function getMetadata() {
    const data = await fetchData(`api/settings`,'ar');
    // console.log('meta:::',locale)
    return data.data || {}

  }
  